"use client"

/**  
 * Sculpture Hero — liquid particle hero  
 * by guglielmogiannattasio.it  
 *  
 * The sculpture is rebuilt from ~100k GPU-simulated particles sampled from  
 * its own pixels. In the hero, it sits in the background as a crisp solid.  
 * On scroll, it cleanly dissolves into a slow, gentle, hypnotic sand river  
 * that drifts down through the page and settles into natural sediment at the footer.  
 */

import * as React from "react"

/* ────────────────────────────────────────────────────────────────────  
   Engine (WebGL2 GPGPU particles)  
   ──────────────────────────────────────────────────────────────────── */

type Rect = { x: number; y: number; w: number; h: number }

interface EngineOptions {  
  interactive: boolean  
  strength: number  
  radius: number  
  density: number  
  dotSize: number  
  spread: number  
  turbulence: number  
  returnSpeed: number  
  streaks: boolean  
  restStyle: "image" | "particles"  
  ambient: boolean  
  ambientIntensity: number  
  speed: number  
  intro: boolean  
  reducedMotion: boolean  
  bg: [number, number, number]  
  /** null = detected from the image corners */  
  imgBg: [number, number, number] | null  
  /** 0 – 2: how much the whole sculpture flows while the cursor is over it */  
  liquid: number  
}

function clamp(v: number, a: number, b: number) {  
  return Math.min(b, Math.max(a, v))  
}

function hexToRgb(hex: string, fallback: [number, number, number]): [number, number, number] {  
  if (typeof hex !== "string") return fallback  
  const s = hex.trim()  
  let m = s.match(/^#?([0-9a-f]{3})$/i)  
  if (m) {  
    const [r, g, b] = m[1].split("").map((c) => parseInt(c + c, 16) / 255)  
    return [r, g, b]  
  }  
  m = s.match(/^#?([0-9a-f]{6})([0-9a-f]{2})?$/i)  
  if (m) {  
    const n = parseInt(m[1], 16)  
    return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255]  
  }  
  m = s.match(/^rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i)  
  if (m) return [+m[1] / 255, +m[2] / 255, +m[3] / 255]  
  return fallback  
}

/* ── shaders ─────────────────────────────────────────────────────────── */

const NOISE = `  
float hash(vec2 p){ p = fract(p*vec2(123.34,456.21)); p += dot(p,p+45.32); return fract(p.x*p.y); }  
float vnoise(vec2 p){ vec2 i=floor(p); vec2 f=fract(p); vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);  
  return mix(mix(hash(i),hash(i+vec2(1.0,0.0)),u.x), mix(hash(i+vec2(0.0,1.0)),hash(i+vec2(1.0,1.0)),u.x), u.y); }  
vec2 ambientField(vec2 uv, float t){  
  vec2 q = uv*vec2(3.2,1.7);  
  vec2 a = vec2(vnoise(q+vec2(t*0.11,0.0))-0.5, vnoise(q+vec2(5.2,t*0.08)+3.1)-0.5);  
  vec2 q2 = uv*vec2(7.5,4.0) + vec2(-t*0.19, t*0.13);  
  vec2 b = vec2(vnoise(q2+1.7)-0.5, vnoise(q2+9.3)-0.5);  
  return a + b*0.45;  
}  
`

/* energy of the material at a point: shared by image and particles */
const ENERGY = `  
float energyAt(vec2 pos, vec2 mouse, float radius, float presence, float wakeEnergy){  
  vec2 d = pos - mouse;  
  float f = exp(-dot(d,d)/(radius*radius))*presence;  
  return smoothstep(0.06, 0.5, f*1.15 + wakeEnergy*1.7);  
}  
`

const QUAD_VS = `#version 300 es  
layout(location=0) in vec2 aPos;  
out vec2 vUv;  
void main(){ vUv = aPos*0.5+0.5; gl_Position = vec4(aPos,0.0,1.0); }  
`

/* Flow map (cursor wake). RGBA8: velocity encoded around 128, energy in B. */  
const FLOW_FS = `#version 300 es  
precision highp float;  
in vec2 vUv;  
out vec4 o;  
uniform sampler2D uPrev;  
uniform vec2 uTexel;  
uniform vec2 uMouse;  
uniform vec2 uVel;  
uniform vec2 uSize;  
uniform float uRadius;  
uniform float uPresence;  
uniform float uDecay;  
vec2 decV(vec4 c){ return (c.rg*255.0-128.0)/127.0; }  
void main(){  
  vec2 v0 = decV(texture(uPrev, vUv));  
  vec2 uv = vUv - v0*uTexel*2.5;  
  vec4 c = texture(uPrev, uv)*0.52  
    + 0.12*(texture(uPrev, uv+vec2(uTexel.x,0.0)) + texture(uPrev, uv-vec2(uTexel.x,0.0))  
          + texture(uPrev, uv+vec2(0.0,uTexel.y)) + texture(uPrev, uv-vec2(0.0,uTexel.y)));  
  vec2 v = decV(c);  
  float p = c.b;  
  vec2 d = (vUv-uMouse)*uSize;  
  float f = exp(-dot(d,d)/(uRadius*uRadius))*uPresence;  
  float sp = clamp(length(uVel)*2.5, 0.0, 1.0);  
  v += uVel*f*0.22;  
  p = max(p, f*sp);  
  v *= uDecay;  
  p *= uDecay;  
  v = sign(v)*max(abs(v)-1.2/127.0, 0.0);  
  p = max(p-1.2/255.0, 0.0);  
  v = clamp(v, -1.0, 1.0);  
  o = vec4((v*127.0+128.0)/255.0, p, 1.0);  
}  
`

/* GPGPU step: state = (offset.xy, velocity.xy) in rect CSS px. */  
const SIM_FS = `#version 300 es  
precision highp float;  
out vec4 o;  
uniform sampler2D uState;  
uniform sampler2D uHome;  
uniform sampler2D uFlow;  
uniform vec2 uSize;  
uniform vec4 uRect;  
uniform vec2 uMouse;  
uniform float uRadius;  
uniform float uPresence;  
uniform float uStrength;  
uniform float uSpread;  
uniform float uTurb;  
uniform float uReturn;  
uniform float uTime;  
uniform float uDt;  
uniform float uIntro;  
uniform float uHeroScroll;  
uniform float uTotalScroll;  
uniform float uScrollVel;  
uniform vec2 uCursorVel;  
uniform float uCursorSpeed;  
${NOISE}  
vec2 curl(vec2 p){  
  const float e = 0.35;  
  float a = vnoise(p+vec2(0.0,e)) - vnoise(p-vec2(0.0,e));  
  float b = vnoise(p+vec2(e,0.0)) - vnoise(p-vec2(e,0.0));  
  return vec2(a, -b)/(2.0*e);  
}  
void main(){  
  ivec2 ij = ivec2(gl_FragCoord.xy);  
  vec4 hm = texelFetch(uHome, ij, 0);  
  if(hm.w <= 0.0){ o = vec4(0.0); return; }  
  vec4 st = texelFetch(uState, ij, 0);  
  vec2 off = st.xy;  
  vec2 vel = st.zw;  
  float sd = hm.z;  
  float light = 0.45 + sd*1.1;

  // Exact screen coordinate of this particle in viewport CSS pixels:
  vec2 initPos = uRect.xy + hm.xy * uRect.zw;
  vec2 screenPos = initPos + off;

  vec4 fl = texture(uFlow, clamp(screenPos/uSize, 0.0, 1.0));  
  vec2 wake = (fl.rg*255.0-128.0)/127.0;  
  float pr = fl.b;

  vec2 toM = screenPos - uMouse;  
  float r2 = dot(toM, toM);  
  float f = exp(-r2/(uRadius*uRadius))*uPresence;  
  vec2 n = toM*inversesqrt(r2+1.0);  
  float e = clamp(pr*2.0 + f, 0.0, 1.0);

  vec2 acc = vec2(0.0);  
  // blown outward and swirled around cursor  
  acc += n*f*1.1*uStrength*uSpread*light;  
  acc += vec2(-n.y, n.x)*f*1.3*uStrength*uSpread*(0.4+sd);  
  // carried by liquid wake  
  acc += (wake*36.0*uSpread*light - vel)*e*0.07;  
  // ambient curl noise (calm)  
  vec2 q = screenPos*0.006 + vec2(uTime*0.18, -uTime*0.12);  
  vec2 c = curl(q) + 0.4*curl(q*2.1 + 5.1);  
  acc += c*(e*1.0*uSpread + uIntro*1.2)*uTurb*light*0.6;  

  // ── SCROLL & DUAL-SPEED DRIVEN SAND FLOW ─────────────────────────────
  float scrollFlow = smoothstep(0.015, 0.20, uHeroScroll);
  if(scrollFlow > 0.001){
    float normY = clamp(screenPos.y / max(uSize.y, 1.0), 0.0, 1.0);
    
    // Smooth, natural wind stream across the viewport (not malformed/clamped)
    float windSway = sin(normY * 3.14159 * 1.8 + uTotalScroll * 2.2 + sd * 1.4 + uTime * 0.14);

    // Speed is primarily scroll-triggered; cursor influence is slow & gentle
    float scrollDrive = clamp(abs(uScrollVel) * 0.85, 0.0, 18.0);
    float cursorGentle = clamp(uCursorSpeed * 0.08, 0.0, 3.0);
    float streamY = (3.2 + 4.2 * sd + scrollDrive + cursorGentle) * scrollFlow;
    float streamX = windSway * 3.2 * scrollFlow;
    vec2 streamVel = vec2(streamX, streamY);
    acc += (streamVel - vel) * 0.040 * scrollFlow;

    // Soft fluid wind curl
    vec2 riverNoise = curl(screenPos * 0.003 + vec2(uTime * 0.10, -uTime * 0.12 + uTotalScroll * 1.2));
    acc += riverNoise * (2.2 + 2.8 * sd) * scrollFlow * light;

    // Mid-page stream looping: particles recycle smoothly while reading content
    if(uTotalScroll < 0.65 && screenPos.y > uSize.y + 30.0){
      off.y -= (uSize.y + 60.0);
      off.x += (fract(sd * 19.3 + uTime * 0.05) - 0.5) * 140.0;
      vel.y = 3.0 + sd * 3.5;
    }

    // Sedimentation phase: when approaching footer (uTotalScroll > 0.65)
    float sedimentPhase = smoothstep(0.65, 0.95, uTotalScroll);
    if(sedimentPhase > 0.001){
      float nx = clamp(screenPos.x / max(uSize.x, 1.0), 0.0, 1.0);
      float mountainDist = abs(nx - 0.50);

      // Mountain shape dunes at footer
      // 1. Soaring central mountain peak (nx ~ 0.50, up to 240px elevation)
      float mountainPeak = exp(-pow(mountainDist * 2.7, 1.85)) * 240.0;
      // 2. Mountain shoulders/flanks
      float leftFlank = exp(-pow((nx - 0.28) * 3.6, 2.0)) * 145.0;
      float rightFlank = exp(-pow((nx - 0.72) * 3.6, 2.0)) * 145.0;
      // 3. Rolling foothills baseline
      float baseElevation = 45.0 + 16.0 * cos(nx * 3.14159 * 2.0);

      // 4. Sharp windward mountain ridge line
      float ridge = 20.0 * (1.0 - smoothstep(0.0, 0.28, mountainDist)) * sin(nx * 3.14159 * 3.6 + 1.1);

      // 5. Aeolian wind ripples
      float ripples = sin(screenPos.x * 0.05 + (uSize.y - screenPos.y) * 0.035) * 3.5;

      // 6. Deep volumetric sand thickness (75px depth so particles fill the mountain)
      float depthLayer = sd * 75.0;

      float mountainElevation = (mountainPeak + leftFlank + rightFlank + baseElevation + ridge + ripples) * sedimentPhase;
      float floorMountain = uSize.y - max(mountainElevation - depthLayer, 10.0);

      // Wide horizontal dispersion across full screen width (0.02 .. 0.98 * W)
      float mountainTargetX = uSize.x * (0.02 + 0.96 * fract(sd * 93.17 + hm.x * 4.3 + hm.y * 2.9));
      acc.x += (mountainTargetX - screenPos.x) * (0.035 + 0.045 * sd) * sedimentPhase;

      // Downward settling gravity (smooth and slower/calmer than before)
      float settleGravity = (5.0 + 4.5 * sd + scrollDrive * 0.3) * sedimentPhase;
      acc.y += settleGravity;

      // Ground collision & settling into resting sand grains
      if(screenPos.y >= floorMountain){
        off.y = min(off.y, floorMountain - initPos.y);
        vel.y = 0.0;
        vel.x *= mix(1.0, 0.22, sedimentPhase);
        acc = vec2(0.0);
      }
    }
  }

  // Elastic return home: holds sculpture at top (uHeroScroll == 0), releases cleanly on scroll
  float returnMult = clamp(1.0 - uHeroScroll * 2.5, 0.0, 1.0);
  float k = (0.006 + 0.02*uReturn)*(0.65+sd*0.7)*(1.0 - uIntro*0.75) * returnMult;  
  acc -= off*k;

  vel += acc*uDt;  
  vel *= pow(mix(0.92, 0.945, e), uDt);  
  off += vel*uDt;  
  if(dot(off,off) < 0.0004 && dot(vel,vel) < 0.0004 && uHeroScroll < 0.01){ off = vec2(0.0); vel = vec2(0.0); }  
  o = vec4(off, vel);  
}  
`

/* Particles: one instanced quad per particle, renders as fine round sand grains. */  
const PART_VS = `#version 300 es  
precision highp float;  
layout(location=0) in vec2 aCorner;  
uniform sampler2D uState;  
uniform sampler2D uHome;  
uniform sampler2D uCol;  
uniform sampler2D uFlow;  
uniform int uTexW;  
uniform vec4 uRect;  
uniform vec2 uRes;  
uniform vec2 uMouse;  
uniform float uRadius;  
uniform float uPresence;  
uniform float uDot;  
uniform float uTime;  
uniform float uAmbient;  
uniform float uStreak;  
uniform float uIntroVis;  
uniform float uRest;  
uniform float uHeroScroll;  
uniform float uTotalScroll;  
uniform vec3 uTint;  
out vec2 vLocal;  
out float vHalfLen;  
out float vR;  
out vec3 vCol;  
out float vA;  
${NOISE}  
${ENERGY}  
void main(){  
  int id = gl_InstanceID;  
  ivec2 ij = ivec2(id % uTexW, id / uTexW);  
  vec4 hm = texelFetch(uHome, ij, 0);  
  vec4 st = texelFetch(uState, ij, 0);  
  vec4 cl = texelFetch(uCol, ij, 0);

  vec2 base = uRect.xy + hm.xy*uRect.zw + st.xy;  
  base -= ambientField(hm.xy, uTime)*10.0*uAmbient;

  vec4 fl = texture(uFlow, clamp(base/uRes, 0.0, 1.0));  
  float wakeE = fl.b;  
  float E = energyAt(base, uMouse, uRadius, uPresence, wakeE);  
  float lift = smoothstep(0.35, 2.5, length(st.xy));  
  
  // Particles only activate when stirred or when scroll dissolves the sculpture
  float scrollAlpha = smoothstep(0.01, 0.16, uHeroScroll);  
  float a = max(max(E, lift), max(uRest, max(1.0-uIntroVis, scrollAlpha)));  
  if(a < 0.01 || hm.w <= 0.0){ gl_Position = vec4(2.0,2.0,2.0,1.0); return; }

  vec2 v = st.zw;  
  float sp = length(v);  
  vec2 dir = sp > 0.001 ? v/sp : vec2(1.0,0.0);  
  float r = uDot*hm.w*0.5;  

  // Render as fine discrete sand grains (not elongated streaks)
  float sedimentPhase = smoothstep(0.65, 0.95, uTotalScroll);
  float streakScale = uStreak * clamp(1.0 - scrollAlpha * 0.75, 0.1, 1.0) * (1.0 - sedimentPhase * 0.95);
  float len = min(sp*0.4, 4.0)*streakScale;  
  vec2 lc = aCorner*vec2(r + len*0.5 + 0.8, r + 0.8);  
  vec2 center = base - dir*len*0.5;  
  vec2 world = center + dir*lc.x + vec2(-dir.y, dir.x)*lc.y;

  vec2 clip = world/uRes*2.0-1.0;  
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);  
  vLocal = lc;  
  vHalfLen = len*0.5;  
  vR = r;  
  vec3 col = cl.rgb*uTint;  
  float glint = smoothstep(2.0, 12.0, sp);  
  col = mix(col, min(col*1.15 + vec3(0.06,0.065,0.075), vec3(1.0)), glint*0.4);  

  vCol = col;  
  vA = a;  
}  
`

const PART_FS = `#version 300 es  
precision highp float;  
in vec2 vLocal;  
in float vHalfLen;  
in float vR;  
in vec3 vCol;  
in float vA;  
uniform float uDpr;  
out vec4 o;  
void main(){  
  vec2 q = vec2(max(abs(vLocal.x)-vHalfLen, 0.0), vLocal.y);  
  float d = length(q) - vR;  
  float a = clamp(0.5 - d*uDpr, 0.0, 1.0);  
  float tail = vHalfLen > 0.0 ? clamp(0.5 - vLocal.x/(2.0*(vHalfLen+vR)), 0.0, 1.0) : 0.0;  
  a *= 1.0 - tail*0.55;  
  a *= vA;  
  if(a < 0.004) discard;  
  o = vec4(vCol*a, a);  
}  
`

/* Image pass: the crisp sculpture, gently lensed, fading out cleanly as scroll begins. */  
const IMAGE_FS = `#version 300 es  
precision highp float;  
out vec4 o;  
uniform sampler2D uImg;  
uniform sampler2D uFlow;  
uniform vec2 uRes;  
uniform float uDpr;  
uniform vec4 uRect;  
uniform vec3 uBg;  
uniform vec3 uImgBg;  
uniform vec2 uMouse;  
uniform float uPresence;  
uniform float uRadius;  
uniform float uStrength;  
uniform float uTime;  
uniform float uAmbient;  
uniform float uIntroVis;  
uniform float uRest;  
uniform float uAlphaMode;  
uniform float uHeroScroll;  
${NOISE}  
${ENERGY}  
void main(){  
  vec2 px = vec2(gl_FragCoord.x, uRes.y*uDpr - gl_FragCoord.y)/uDpr;  
  vec2 size = uRect.zw;  
  vec2 uv = (px-uRect.xy)/size;  
  if(uv.x < -0.05 || uv.x > 1.05 || uv.y < -0.12 || uv.y > 1.12){ o = vec4(0.0); return; }  
  vec4 fl = texture(uFlow, clamp(px/uRes, 0.0, 1.0));  
  vec2 vel = (fl.rg*255.0-128.0)/127.0;  
  vec2 toM = px - uMouse;  
  float fall = exp(-dot(toM,toM)/(uRadius*uRadius))*uPresence;  
  vec2 disp = -toM*0.22*uStrength*fall - vel*10.0*uStrength;  
  disp += ambientField(uv, uTime)*10.0*uAmbient;  
  vec2 suv = uv + disp/size;  
  vec4 tx = texture(uImg, suv);  
  vec3 col = tx.rgb;  
  vec2 e = smoothstep(vec2(0.0), vec2(0.05,0.08), suv) * smoothstep(vec2(1.0), vec2(0.95,0.92), suv);  
  float key = uAlphaMode > 0.5 ? tx.a : smoothstep(0.012, 0.06, length(col-uImgBg));  
  float k = key*e.x*e.y;  
  float E = energyAt(px, uMouse, uRadius, uPresence, fl.b);  
  // Dissolve solid sculpture image cleanly as particles lift on scroll (no ghost duplicate)
  float dissolve = 1.0 - smoothstep(0.01, 0.18, uHeroScroll);
  float show = (1.0 - max(E, uRest)) * uIntroVis * dissolve;  
  vec3 mat = uAlphaMode > 0.5 ? col : col*(uBg/max(uImgBg, vec3(0.001)));  
  float A = k*show;  
  o = vec4(mat*A, A);  
}  
`

/* ── helpers ─────────────────────────────────────────────────────────── */

type Prog = { p: WebGLProgram; u: Record<string, WebGLUniformLocation | null> }

function compile(gl: WebGL2RenderingContext, vs: string, fs: string): Prog {  
  const make = (type: number, src: string) => {  
    const sh = gl.createShader(type)!  
    gl.shaderSource(sh, src)  
    gl.compileShader(sh)  
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {  
      const log = gl.getShaderInfoLog(sh)  
      gl.deleteShader(sh)  
      throw new Error("Shader: " + log)  
    }  
    return sh  
  }  
  const p = gl.createProgram()!  
  const v = make(gl.VERTEX_SHADER, vs)  
  const f = make(gl.FRAGMENT_SHADER, fs)  
  gl.attachShader(p, v)  
  gl.attachShader(p, f)  
  gl.bindAttribLocation(p, 0, "aPos")  
  gl.linkProgram(p)  
  gl.deleteShader(v)  
  gl.deleteShader(f)  
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error("Link: " + gl.getProgramInfoLog(p))  
  const u: Record<string, WebGLUniformLocation | null> = {}  
  const n = gl.getProgramParameter(p, gl.ACTIVE_UNIFORMS)  
  for (let i = 0; i < n; i++) {  
    const info = gl.getActiveUniform(p, i)  
    if (info) u[info.name] = gl.getUniformLocation(p, info.name)  
  }  
  return { p, u }  
}

/* ── engine ──────────────────────────────────────────────────────────── */

const TEX_W = 1024  
const SETTLE_FRAMES = 270

class LiquidEngine {  
  lastImage: HTMLImageElement | null = null  
  onFirstFrame: (() => void) | null = null

  private canvas: HTMLCanvasElement  
  private gl: WebGL2RenderingContext  
  private opts: EngineOptions  
  private onFail: () => void  
  private lowPower = false  
  private stateFormat: { internal: number; type: number } = { internal: 0, type: 0 }

  private pFlow!: Prog  
  private pSim!: Prog  
  private pPart!: Prog  
  private pImg!: Prog  
  private vao!: WebGLVertexArrayObject  
  private quad!: WebGLBuffer

  private imgTex: WebGLTexture | null = null  
  private flowTex: WebGLTexture[] = []  
  private flowFb: WebGLFramebuffer[] = []  
  private flowW = 256  
  private flowH = 104  
  private flowIdx = 0  
  private flowDirty = false

  private homeTex: WebGLTexture | null = null  
  private colTex: WebGLTexture | null = null  
  private stateTex: WebGLTexture[] = []  
  private stateFb: WebGLFramebuffer[] = []  
  private stateIdx = 0  
  private texH = 1  
  private n = 0  
  private gridW = 1  
  private stateDirty = false  
  private alphaMode = false  
  private imgBg: [number, number, number] = [0.918, 0.914, 0.906]  
  private flowing = 0

  private aspect = 2.5  
  private rect: Rect = { x: 0, y: 0, w: 1, h: 1 }  
  private cssW = 1  
  private cssH = 1

  private target = { x: -9999, y: -9999 }  
  private mouse = { x: -9999, y: -9999 }  
  private prevMouse = { x: -9999, y: -9999 }  
  private mvel = { x: 0, y: 0 }  
  private cursorSpeed = 0  
  private presence = 0  
  private presenceTarget = 0  
  private burst = 0  
  private lastInput = -1e9  
  private settle = 1e9  
  private touchRelease = 0

  // Scroll dynamics
  private heroScroll = 0  
  private totalScroll = 0  
  private scrollVel = 0  
  private lastScrollY = 0

  private time = 0  
  private introT = 1  
  private raf = 0  
  private running = false  
  private last = 0  
  private visible = true  
  private ready = false  
  private destroyed = false  
  private lost = false

  constructor(canvas: HTMLCanvasElement, opts: EngineOptions, onFail: () => void) {  
    this.canvas = canvas  
    this.opts = opts  
    this.onFail = onFail  
    const gl = canvas.getContext("webgl2", {  
      alpha: true,  
      antialias: false,  
      depth: false,  
      stencil: false,  
      premultipliedAlpha: true,  
      preserveDrawingBuffer: false,  
      powerPreference: "high-performance",  
    }) as WebGL2RenderingContext | null  
    if (!gl) throw new Error("WebGL2 unavailable")  
    this.gl = gl  
    const nav = navigator as Navigator & { deviceMemory?: number }  
    this.lowPower =  
      (nav.hardwareConcurrency || 8) <= 4 ||  
      (nav.deviceMemory || 8) <= 4 ||  
      window.matchMedia("(pointer: coarse)").matches  
    this.initGL()  
    canvas.addEventListener("webglcontextlost", this.onLost, false)  
  }

  private onLost = (e: Event) => {  
    e.preventDefault()  
    this.lost = true  
    this.stop()  
    this.onFail()  
  }

  private initGL() {  
    const gl = this.gl  
    const full = gl.getExtension("EXT_color_buffer_float")  
    const half = full ? null : gl.getExtension("EXT_color_buffer_half_float")  
    if (!full && !half) throw new Error("No float render targets")  
    this.stateFormat = { internal: gl.RGBA16F, type: gl.HALF_FLOAT }

    this.pFlow = compile(gl, QUAD_VS, FLOW_FS)  
    this.pSim = compile(gl, QUAD_VS, SIM_FS)  
    this.pPart = compile(gl, PART_VS, PART_FS)  
    this.pImg = compile(gl, QUAD_VS, IMAGE_FS)

    this.vao = gl.createVertexArray()!  
    gl.bindVertexArray(this.vao)  
    this.quad = gl.createBuffer()!  
    gl.bindBuffer(gl.ARRAY_BUFFER, this.quad)  
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)  
    gl.enableVertexAttribArray(0)  
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0)

    for (let i = 0; i < 2; i++) {  
      const t = this.makeTex(gl.RGBA8, this.flowW, this.flowH, gl.RGBA, gl.UNSIGNED_BYTE, null, gl.LINEAR)  
      const fb = gl.createFramebuffer()!  
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)  
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0)  
      this.flowTex.push(t)  
      this.flowFb.push(fb)  
    }  
    this.clearFlow()  
  }

  private makeTex(  
    internal: number,  
    w: number,  
    h: number,  
    format: number,  
    type: number,  
    data: ArrayBufferView | null,  
    filter: number  
  ) {  
    const gl = this.gl  
    const t = gl.createTexture()!  
    gl.bindTexture(gl.TEXTURE_2D, t)  
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1)  
    gl.texImage2D(gl.TEXTURE_2D, 0, internal, w, h, 0, format, type, data)  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter)  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter)  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)  
    return t  
  }

  private clearFlow() {  
    const gl = this.gl  
    for (const fb of this.flowFb) {  
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)  
      gl.viewport(0, 0, this.flowW, this.flowH)  
      gl.clearColor(128 / 255, 128 / 255, 0, 1)  
      gl.clear(gl.COLOR_BUFFER_BIT)  
    }  
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)  
    this.flowDirty = false  
  }

  private clearState() {  
    const gl = this.gl  
    for (const fb of this.stateFb) {  
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)  
      gl.viewport(0, 0, TEX_W, this.texH)  
      gl.clearColor(0, 0, 0, 0)  
      gl.clear(gl.COLOR_BUFFER_BIT)  
    }  
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)  
    this.stateDirty = false  
  }

  setImage(img: HTMLImageElement) {  
    if (this.destroyed || this.lost) return  
    const gl = this.gl  
    this.lastImage = img  
    this.aspect = img.naturalWidth / img.naturalHeight || 2.5  
    this.flowH = Math.max(32, Math.round(this.flowW / this.aspect))  
    for (const t of this.flowTex) {  
      gl.bindTexture(gl.TEXTURE_2D, t)  
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA8, this.flowW, this.flowH, 0, gl.RGBA, gl.UNSIGNED_BYTE, null)  
    }  
    this.clearFlow()  
    if (this.imgTex) gl.deleteTexture(this.imgTex)  
    this.imgTex = gl.createTexture()  
    gl.bindTexture(gl.TEXTURE_2D, this.imgTex)  
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false)  
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img)  
    gl.generateMipmap(gl.TEXTURE_2D)  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR)  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)  
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)  
    this.buildParticles(img)  
    this.ready = true  
    if (this.opts.intro && !this.opts.reducedMotion) this.startIntro()  
    this.wake()  
  }

  private buildParticles(img: HTMLImageElement) {  
    const gl = this.gl  
    const baseGrid = this.lowPower ? 640 : 1000  
    const gw = Math.round(baseGrid * Math.sqrt(clamp(this.opts.density, 0.15, 2)))  
    const gh = Math.max(1, Math.round(gw / this.aspect))  
    this.gridW = gw  
    let data: Uint8ClampedArray  
    try {  
      const c = document.createElement("canvas")  
      c.width = gw  
      c.height = gh  
      const ctx = c.getContext("2d", { willReadFrequently: true })!  
      ctx.imageSmoothingQuality = "high"  
      ctx.drawImage(img, 0, 0, gw, gh)  
      data = ctx.getImageData(0, 0, gw, gh).data  
    } catch {  
      throw new Error("Image is not CORS-readable")  
    }  
    let transparent = 0  
    for (let i = 3; i < data.length; i += 4 * 7) if (data[i] < 250) transparent++  
    this.alphaMode = transparent > data.length / (4 * 7) / 20  
    if (this.opts.imgBg) this.imgBg = this.opts.imgBg  
    else if (!this.alphaMode) {  
      let r = 0, g = 0, b = 0, n = 0  
      const pw = Math.max(2, Math.round(gw * 0.012))  
      for (const [cx, cy] of [[0, 0], [gw - pw, 0], [0, gh - pw], [gw - pw, gh - pw]]) {  
        for (let y = cy; y < cy + pw; y++)  
          for (let x = cx; x < cx + pw; x++) {  
            const i = (y * gw + x) * 4  
            r += data[i]; g += data[i + 1]; b += data[i + 2]; n++  
          }  
      }  
      this.imgBg = [r / n / 255, g / n / 255, b / n / 255]  
    }  
    const home: number[] = []  
    const col: number[] = []  
    for (let y = 0; y < gh; y++) {  
      for (let x = 0; x < gw; x++) {  
        const i = (y * gw + x) * 4  
        const r = data[i] / 255  
        const g = data[i + 1] / 255  
        const b = data[i + 2] / 255  
        if (this.alphaMode) {  
          const a = data[i + 3] / 255  
          if (a < 0.12) continue  
          if (a < 0.5 && Math.random() > a * 2) continue  
        } else {  
          const dev = Math.hypot(r - this.imgBg[0], g - this.imgBg[1], b - this.imgBg[2])  
          if (dev < 0.03) continue  
          if (dev < 0.07 && Math.random() > (dev - 0.03) / 0.04) continue  
        }  
        const jx = (Math.random() - 0.5) * 0.6  
        const jy = (Math.random() - 0.5) * 0.6  
        home.push((x + 0.5 + jx) / gw, (y + 0.5 + jy) / gh, Math.random(), 0.85 + Math.random() * 0.3)  
        col.push(data[i], data[i + 1], data[i + 2], 255)  
      }  
    }  
    const n = home.length / 4  
    this.n = n  
    this.texH = Math.max(1, Math.ceil(n / TEX_W))  
    const total = TEX_W * this.texH  
    const homeArr = new Float32Array(total * 4)  
    homeArr.set(home)  
    const colArr = new Uint8Array(total * 4)  
    colArr.set(col)

    for (const t of [this.homeTex, this.colTex, ...this.stateTex]) if (t) gl.deleteTexture(t)  
    for (const f of this.stateFb) gl.deleteFramebuffer(f)  
    this.stateTex = []  
    this.stateFb = []  
    this.homeTex = this.makeTex(gl.RGBA32F, TEX_W, this.texH, gl.RGBA, gl.FLOAT, homeArr, gl.NEAREST)  
    this.colTex = this.makeTex(gl.RGBA8, TEX_W, this.texH, gl.RGBA, gl.UNSIGNED_BYTE, colArr, gl.NEAREST)  
    for (let i = 0; i < 2; i++) {  
      const t = this.makeTex(this.stateFormat.internal, TEX_W, this.texH, gl.RGBA, this.stateFormat.type, null, gl.NEAREST)  
      const fb = gl.createFramebuffer()!  
      gl.bindFramebuffer(gl.FRAMEBUFFER, fb)  
      gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, t, 0)  
      if (gl.checkFramebufferStatus(gl.FRAMEBUFFER) !== gl.FRAMEBUFFER_COMPLETE) throw new Error("Float FBO incomplete")  
      this.stateTex.push(t)  
      this.stateFb.push(fb)  
    }  
    gl.bindFramebuffer(gl.FRAMEBUFFER, null)  
    this.homeData = homeArr  
    this.clearState()  
  }

  private homeData: Float32Array | null = null

  private startIntro() {  
    const gl = this.gl  
    const home = this.homeData  
    if (!home) return  
    const w = this.rect.w > 10 ? this.rect.w : 1300  
    const total = TEX_W * this.texH  
    const st = new Float32Array(total * 4)  
    for (let i = 0; i < this.n; i++) {  
      const hx = home[i * 4] - 0.5  
      const hy = home[i * 4 + 1] - 0.5  
      const sd = home[i * 4 + 2]  
      const ang = (Math.random() - 0.5) * 0.9 + (hx > 0 ? 0 : Math.PI)  
      const dist = w * (0.04 + Math.random() * 0.14) * (0.5 + Math.abs(hx) * 1.4)  
      st[i * 4] = Math.cos(ang) * dist + hx * w * 0.25 * sd  
      st[i * 4 + 1] = Math.sin(ang) * dist * 0.55 + hy * 120 * (Math.random() - 0.5)  
    }  
    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx])  
    gl.texImage2D(gl.TEXTURE_2D, 0, this.stateFormat.internal, TEX_W, this.texH, 0, gl.RGBA, gl.FLOAT, st)  
    this.introT = 0  
    this.stateDirty = true  
  }

  setOptions(o: Partial<EngineOptions>) {  
    const rebuild =  
      (o.density !== undefined && o.density !== this.opts.density) ||  
      (o.imgBg !== undefined && String(o.imgBg) !== String(this.opts.imgBg))  
    this.opts = { ...this.opts, ...o }  
    if (rebuild && this.ready && this.lastImage) {  
      try {  
        this.buildParticles(this.lastImage)  
      } catch {  
        this.onFail()  
      }  
    }  
    this.wake()  
  }

  resize(cssW: number, cssH: number, rect: Rect) {  
    this.cssW = Math.max(1, cssW)  
    this.cssH = Math.max(1, cssH)  
    this.rect = rect  
    let dpr = Math.min(window.devicePixelRatio || 1, this.lowPower ? 1.5 : 2)  
    const px = this.cssW * this.cssH * dpr * dpr  
    if (px > 4.5e6) dpr = Math.max(1, Math.sqrt(4.5e6 / (this.cssW * this.cssH)))  
    const w = Math.round(this.cssW * dpr)  
    const h = Math.round(this.cssH * dpr)  
    if (this.canvas.width !== w || this.canvas.height !== h) {  
      this.canvas.width = w  
      this.canvas.height = h  
    }  
    this.draw()  
  }

  setVisible(v: boolean) {  
    this.visible = v  
    if (v) this.wake()  
    else this.stop()  
  }

  pointer(type: "move" | "down" | "up" | "leave", x: number, y: number, touch: boolean) {  
    if (!this.opts.interactive || this.lost) return  
    const now = performance.now()  
    if (type === "leave" || type === "up") {  
      if (touch) this.touchRelease = now + 260  
      else this.presenceTarget = 0  
      this.wake()  
      return  
    }  
    if (this.mouse.x < -9000 || type === "down") {  
      this.mouse.x = this.prevMouse.x = x  
      this.mouse.y = this.prevMouse.y = y  
    }  
    this.target.x = x  
    this.target.y = y  
    this.presenceTarget = 1  
    this.lastInput = now  
    this.settle = 0  
    if (type === "down") {  
      this.burst = 1  
      this.touchRelease = 0  
    }  
    this.wake()  
  }

  wake() {  
    if (!this.ready || this.running || !this.visible || this.destroyed || this.lost) {  
      if (this.ready && !this.running) this.draw()  
      return  
    }  
    this.running = true  
    this.last = performance.now()  
    this.raf = requestAnimationFrame(this.frame)  
  }

  private stop() {  
    this.running = false  
    cancelAnimationFrame(this.raf)  
  }

  private radiusPx() {  
    return this.opts.radius * clamp(this.rect.w / 1400, 0.6, 1.25)  
  }

  private strength() {  
    return this.opts.strength * (this.opts.reducedMotion ? 0.5 : 1)  
  }

  private frame = (now: number) => {  
    if (!this.running) return  
    const rawMs = now - this.last  
    const dt = clamp(rawMs / 16.6667, 0.25, 3)  
    this.last = now  
    const o = this.opts  

    if (this.touchRelease && now > this.touchRelease) {  
      this.presenceTarget = 0  
      this.touchRelease = 0  
    }  
    const ease = 1 - Math.pow(1 - 0.22, dt)  
    this.mouse.x += (this.target.x - this.mouse.x) * ease  
    this.mouse.y += (this.target.y - this.mouse.y) * ease  
    const vx = (this.mouse.x - this.prevMouse.x) / dt  
    const vy = (this.mouse.y - this.prevMouse.y) / dt  
    this.prevMouse.x = this.mouse.x  
    this.prevMouse.y = this.mouse.y  
    this.mvel.x += (clamp(vx, -60, 60) - this.mvel.x) * 0.5  
    this.mvel.y += (clamp(vy, -60, 60) - this.mvel.y) * 0.5  
    const rawCursorSpeed = Math.hypot(this.mvel.x, this.mvel.y)
    this.cursorSpeed += (rawCursorSpeed - this.cursorSpeed) * (1 - Math.pow(1 - 0.25, dt))
    const pk = this.presenceTarget > this.presence ? 0.1 : 0.035  
    this.presence += (this.presenceTarget - this.presence) * (1 - Math.pow(1 - pk, dt))  
    if (this.presence < 0.001 && this.presenceTarget === 0) this.presence = 0  
    const fk = this.presenceTarget > this.flowing ? 0.05 : 0.018  
    this.flowing += (this.presenceTarget - this.flowing) * (1 - Math.pow(1 - fk, dt))  
    if (this.flowing < 0.002 && this.presenceTarget === 0) this.flowing = 0  
    if (this.introT < 1) this.introT = Math.min(1, this.introT + Math.min(rawMs, 100) / 3200)

    // Direct scroll sampling per animation frame
    const sy = typeof window !== "undefined" ? (window.scrollY || window.pageYOffset || document.documentElement.scrollTop || 0) : 0
    const innerH = typeof window !== "undefined" ? window.innerHeight : 800
    const scrollH = typeof document !== "undefined" ? Math.max(innerH + 1, document.documentElement.scrollHeight) : innerH + 1
    const maxScroll = Math.max(1, scrollH - innerH)

    const targetHeroScroll = clamp(sy / Math.max(1, innerH * 0.85), 0, 1)
    const targetTotalScroll = clamp(sy / maxScroll, 0, 1)
    const rawVel = (sy - this.lastScrollY) / dt
    this.lastScrollY = sy

    const scrollEase = 1 - Math.pow(1 - 0.2, dt)
    this.heroScroll += (targetHeroScroll - this.heroScroll) * scrollEase
    this.totalScroll += (targetTotalScroll - this.totalScroll) * scrollEase
    this.scrollVel += (clamp(rawVel, -60, 60) - this.scrollVel) * 0.25
    this.scrollVel *= Math.pow(0.88, dt)

    this.raf = requestAnimationFrame(this.frame)  
    // Calm time progression (gentle, hypnotic)
    this.time += (dt * o.speed * (0.8 + this.flowing * 1.0 + (this.heroScroll > 0.01 ? 0.25 : 0))) / 60  
    this.stepFlow(dt)  
    this.stepSim(dt)  
    this.burst = Math.max(0, this.burst - 0.1 * dt)  
    this.draw()  
    this.firstFrame()  
  }

  private firstFrame() {  
    if (this.onFirstFrame) {  
      const cb = this.onFirstFrame  
      this.onFirstFrame = null  
      requestAnimationFrame(() => cb())  
    }  
  }

  private stepFlow(dt: number) {  
    const gl = this.gl  
    const P = this.pFlow  
    const dst = 1 - this.flowIdx  
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.flowFb[dst])  
    gl.viewport(0, 0, this.flowW, this.flowH)  
    gl.disable(gl.BLEND)  
    gl.useProgram(P.p)  
    gl.bindVertexArray(this.vao)  
    gl.activeTexture(gl.TEXTURE0)  
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx])  
    gl.uniform1i(P.u.uPrev, 0)  
    gl.uniform2f(P.u.uTexel, 1 / this.flowW, 1 / this.flowH)  
    gl.uniform2f(P.u.uMouse, this.mouse.x / this.cssW, this.mouse.y / this.cssH)  
    gl.uniform2f(P.u.uVel, clamp(this.mvel.x / 40, -1, 1), clamp(this.mvel.y / 40, -1, 1))  
    gl.uniform2f(P.u.uSize, this.cssW, this.cssH)  
    gl.uniform1f(P.u.uRadius, this.radiusPx())  
    gl.uniform1f(P.u.uPresence, Math.max(this.presence, this.burst))  
    gl.uniform1f(P.u.uDecay, Math.pow(0.968, dt))  
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)  
    this.flowIdx = dst  
    this.flowDirty = true  
  }

  private stepSim(dt: number) {  
    if (!this.n) return  
    const gl = this.gl  
    const P = this.pSim  
    const o = this.opts  
    const r = this.rect  
    const dst = 1 - this.stateIdx  
    const intro = o.reducedMotion || !o.intro ? 0 : Math.pow(1 - this.introT, 2)  
    gl.bindFramebuffer(gl.FRAMEBUFFER, this.stateFb[dst])  
    gl.viewport(0, 0, TEX_W, this.texH)  
    gl.disable(gl.BLEND)  
    gl.useProgram(P.p)  
    gl.bindVertexArray(this.vao)  
    gl.activeTexture(gl.TEXTURE0)  
    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx])  
    gl.uniform1i(P.u.uState, 0)  
    gl.activeTexture(gl.TEXTURE1)  
    gl.bindTexture(gl.TEXTURE_2D, this.homeTex)  
    gl.uniform1i(P.u.uHome, 1)  
    gl.activeTexture(gl.TEXTURE2)  
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx])  
    gl.uniform1i(P.u.uFlow, 2)  
    gl.uniform2f(P.u.uSize, this.cssW, this.cssH)  
    gl.uniform4f(P.u.uRect, r.x, r.y, r.w, r.h)  
    gl.uniform2f(P.u.uMouse, this.mouse.x, this.mouse.y)  
    gl.uniform1f(P.u.uRadius, this.radiusPx())  
    gl.uniform1f(P.u.uPresence, Math.max(this.presence, this.burst))  
    gl.uniform1f(P.u.uStrength, this.strength() * (1 + this.burst * 1.5))  
    gl.uniform1f(P.u.uSpread, clamp(o.spread, 0, 2))  
    gl.uniform1f(P.u.uTurb, clamp(o.turbulence, 0, 2) * (o.reducedMotion ? 0.3 : 1))  
    gl.uniform1f(P.u.uReturn, clamp(o.returnSpeed, 0, 2))  
    gl.uniform1f(P.u.uTime, this.time)  
    gl.uniform1f(P.u.uDt, dt)  
    gl.uniform1f(P.u.uIntro, intro)  
    gl.uniform1f(P.u.uHeroScroll, this.heroScroll)  
    gl.uniform1f(P.u.uTotalScroll, this.totalScroll)  
    gl.uniform1f(P.u.uScrollVel, this.scrollVel)  
    gl.uniform2f(P.u.uCursorVel, this.mvel.x, this.mvel.y)
    gl.uniform1f(P.u.uCursorSpeed, this.cursorSpeed)
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)  
    this.stateIdx = dst  
    this.stateDirty = true  
  }

  private draw() {  
    if (!this.ready || this.lost || this.destroyed) return  
    const gl = this.gl  
    const o = this.opts  
    const r = this.rect  
    const rm = o.reducedMotion  
    const introVis = rm || !o.intro ? 1 : Math.pow(this.introT, 2.2)  
    const base = o.ambient && !rm ? clamp(o.ambientIntensity, 0, 2) : 0  
    const amb = base + this.flowing * 0.85 * clamp(o.liquid, 0, 2) * (rm ? 0.3 : 1)  
    const rest = o.restStyle === "particles" ? 1 : 0  
    const [br, bg, bb] = o.bg  
    const [ir, ig, ib] = this.imgBg  
    const dpr = this.canvas.width / this.cssW  
    const pres = Math.max(this.presence, this.burst)  
    const mx = this.mouse.x  
    const my = this.mouse.y

    gl.bindFramebuffer(gl.FRAMEBUFFER, null)  
    gl.viewport(0, 0, this.canvas.width, this.canvas.height)  
    gl.bindVertexArray(this.vao)  
    gl.disable(gl.BLEND)

    // Flat 2D image only rendered if restStyle is image AND at absolute rest (scroll = 0)
    // When restStyle is "particles", particles exclusively form the sculpture (no duplicate image)
    if (rest === 0 && this.heroScroll <= 0.001) {
      const I = this.pImg  
      gl.useProgram(I.p)  
      gl.activeTexture(gl.TEXTURE0)  
      gl.bindTexture(gl.TEXTURE_2D, this.imgTex)  
      gl.uniform1i(I.u.uImg, 0)  
      gl.activeTexture(gl.TEXTURE1)  
      gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx])  
      gl.uniform1i(I.u.uFlow, 1)  
      gl.uniform2f(I.u.uRes, this.cssW, this.cssH)  
      gl.uniform1f(I.u.uDpr, dpr)  
      gl.uniform4f(I.u.uRect, r.x, r.y, r.w, r.h)  
      gl.uniform3f(I.u.uBg, br, bg, bb)  
      gl.uniform3f(I.u.uImgBg, ir, ig, ib)  
      gl.uniform2f(I.u.uMouse, mx, my)  
      gl.uniform1f(I.u.uPresence, pres)  
      gl.uniform1f(I.u.uRadius, this.radiusPx())  
      gl.uniform1f(I.u.uStrength, this.strength())  
      gl.uniform1f(I.u.uTime, this.time)  
      gl.uniform1f(I.u.uAmbient, amb)  
      gl.uniform1f(I.u.uIntroVis, introVis)  
      gl.uniform1f(I.u.uRest, rest)  
      gl.uniform1f(I.u.uAlphaMode, this.alphaMode ? 1 : 0)  
      gl.uniform1f(I.u.uHeroScroll, this.heroScroll)  
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
    }

    // Particles draw pass
    if (!this.n) return

    const P = this.pPart  
    gl.useProgram(P.p)  
    gl.enable(gl.BLEND)  
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)  
    gl.activeTexture(gl.TEXTURE0)  
    gl.bindTexture(gl.TEXTURE_2D, this.stateTex[this.stateIdx])  
    gl.uniform1i(P.u.uState, 0)  
    gl.activeTexture(gl.TEXTURE1)  
    gl.bindTexture(gl.TEXTURE_2D, this.homeTex)  
    gl.uniform1i(P.u.uHome, 1)  
    gl.activeTexture(gl.TEXTURE2)  
    gl.bindTexture(gl.TEXTURE_2D, this.colTex)  
    gl.uniform1i(P.u.uCol, 2)  
    gl.activeTexture(gl.TEXTURE3)  
    gl.bindTexture(gl.TEXTURE_2D, this.flowTex[this.flowIdx])  
    gl.uniform1i(P.u.uFlow, 3)  
    gl.uniform1i(P.u.uTexW, TEX_W)  
    gl.uniform4f(P.u.uRect, r.x, r.y, r.w, r.h)  
    gl.uniform2f(P.u.uRes, this.cssW, this.cssH)  
    gl.uniform2f(P.u.uMouse, mx, my)  
    gl.uniform1f(P.u.uRadius, this.radiusPx())  
    gl.uniform1f(P.u.uPresence, pres)  
    const spacing = r.w / this.gridW  
    gl.uniform1f(P.u.uDot, spacing * 1.35 * clamp(o.dotSize, 0.2, 3))  
    gl.uniform1f(P.u.uTime, this.time)  
    gl.uniform1f(P.u.uAmbient, amb)  
    gl.uniform1f(P.u.uStreak, o.streaks ? 1 : 0)  
    gl.uniform1f(P.u.uIntroVis, introVis)  
    gl.uniform1f(P.u.uRest, rest)  
    gl.uniform1f(P.u.uDpr, dpr)  
    gl.uniform1f(P.u.uHeroScroll, this.heroScroll)  
    gl.uniform1f(P.u.uTotalScroll, this.totalScroll)  
    if (this.alphaMode) gl.uniform3f(P.u.uTint, 1, 1, 1)  
    else gl.uniform3f(P.u.uTint, br / Math.max(ir, 0.001), bg / Math.max(ig, 0.001), bb / Math.max(ib, 0.001))  
    gl.drawArraysInstanced(gl.TRIANGLE_STRIP, 0, 4, this.n)  
    gl.disable(gl.BLEND)  
  }

  destroy() {  
    this.destroyed = true  
    this.stop()  
    this.canvas.removeEventListener("webglcontextlost", this.onLost)  
    const gl = this.gl  
    if (!this.lost) {  
      gl.deleteBuffer(this.quad)  
      gl.deleteVertexArray(this.vao)  
      for (const t of [...this.flowTex, ...this.stateTex, this.imgTex, this.homeTex, this.colTex]) if (t) gl.deleteTexture(t)  
      for (const f of [...this.flowFb, ...this.stateFb]) gl.deleteFramebuffer(f)  
      for (const p of [this.pFlow, this.pSim, this.pPart, this.pImg]) if (p) gl.deleteProgram(p.p)  
    }  
    gl.getExtension("WEBGL_lose_context")?.loseContext()  
  }  
}

/* ────────────────────────────────────────────────────────────────────  
   Public API  
   ──────────────────────────────────────────────────────────────────── */

export interface SculptureHeroLink {  
  label: string  
  href: string  
}

export interface SculptureHeroProps {  
  children?: React.ReactNode
  behindText?: boolean
  src?: string  
  darkSrc?: string  
  mobileSrc?: string  
  mobileDarkSrc?: string  
  imageAlt?: string  
  imageBackground?: string

  brand?: string  
  navLinks?: SculptureHeroLink[]  
  navCta?: SculptureHeroLink  
  showNav?: boolean

  eyebrow?: string  
  headline?: string  
  headlineAccent?: string  
  body?: string  
  primaryCta?: SculptureHeroLink  
  secondaryCta?: SculptureHeroLink  
  onPrimaryClick?: () => void
  onSecondaryClick?: () => void
  hint?: string
  hintTouch?: string
  themeToggle?: boolean

  background?: string  
  darkBackground?: string  
  theme?: "light" | "dark"  
  textColor?: string  
  accentColor?: string  
  headingFont?: string  
  accentFont?: string  
  bodyFont?: string  

  sculptureScale?: number  
  mobileSculptureScale?: number  
  sculptureX?: number  
  sculptureY?: number

  interactive?: boolean  
  strength?: number  
  radius?: number  
  particleDensity?: number  
  dotSize?: number  
  particleSpread?: number  
  turbulence?: number  
  liquid?: number  
  streaks?: boolean  
  restStyle?: "image" | "particles"  
  returnSpeed?: number  
  ambient?: boolean  
  ambientIntensity?: number  
  speed?: number  
  intro?: boolean

  height?: string  
  backdropText?: string  
  showCredit?: boolean
  className?: string  
  style?: React.CSSProperties  
}

const DEFAULTS = {  
  src: "/sculpture.webp",  
  darkSrc: "/sculpture-dark.webp",  
  mobileSrc: "/sculpture.webp",  
  mobileDarkSrc: "/sculpture-dark.webp",  
  imageAlt: "MacSolid high precision CAD engine sculpture",  
  imageBackground: "#EAE9E7",  
  brand: "MacSolid",  
  navLinks: [],  
  eyebrow: "INDEPENDENT CAD ENGINE",  
  headline: "Every component.\nAccounted for.",  
  headlineAccent: "Accounted for.",  
  body: "Instant multi-threaded Bill of Materials extraction, exact raw stock calculations, and ERP-ready spreadsheets.",  
  primaryCta: { label: "Contact for Trial", href: "#trial" },  
  secondaryCta: { label: "Explore 3D Stage", href: "#stage-experience" },  
  background: "#EBE9E5",  
  darkBackground: "#111110",  
  textColor: "#151514",  
  accentColor: "#151514",  
  headingFont: "'Geist', 'Plus Jakarta Sans', sans-serif",  
  accentFont: "'Instrument Serif', 'Times New Roman', serif",  
  bodyFont: "'Geist', 'Plus Jakarta Sans', sans-serif",  
}

/* ────────────────────────────────────────────────────────────────────  
   Layout  
   ──────────────────────────────────────────────────────────────────── */

function computeRect(  
  w: number,  
  h: number,  
  aspect: number,  
  band: { top: number; bottom: number },  
  p: { scale: number; mobileScale: number; x: number; y: number }  
): Rect {  
  const bandH = Math.max(80, band.bottom - band.top)  
  let rw: number  
  let maxH: number  
  if (w >= 1024) {  
    rw = w * 1.05 * p.scale  
    maxH = Math.max(bandH * 1.15 * p.scale, 480 * p.scale)  
  } else if (w >= 640) {  
    rw = w * 1.3 * p.scale  
    maxH = Math.max(bandH * 1.2 * p.scale, 420 * p.scale)  
  } else if (aspect < 1.3) {  
    rw = w * 1.0 * p.mobileScale  
    maxH = Math.max(bandH * 1.0 * p.mobileScale, 360 * p.mobileScale)  
  } else {  
    rw = w * 1.9 * p.mobileScale  
    maxH = Math.max(bandH * 1.2 * p.mobileScale, 360 * p.mobileScale)  
  }  
  if (rw / aspect > maxH) rw = maxH * aspect  
  const rh = rw / aspect  
  const cx = w * (0.5 + p.x / 100)  
  const cy = (band.top + band.bottom) / 2 + h * (p.y / 100)  
  return { x: cx - rw / 2, y: cy - rh / 2, w: rw, h: rh }  
}

/* ────────────────────────────────────────────────────────────────────  
   Styles  
   ──────────────────────────────────────────────────────────────────── */

const CSS = `  
.sh-root{position:relative;width:100%;height:var(--sh-h);overflow:visible;container-type:inline-size;transition:background-color .6s ease,color .6s ease;  
  background:transparent;color:var(--sh-fg);font-family:var(--sh-body);-webkit-font-smoothing:antialiased;  
  touch-action:pan-y;display:flex;flex-direction:column;box-sizing:border-box}  
.sh-root *,.sh-root *::before,.sh-root *::after{box-sizing:border-box}  
.sh-stage{position:absolute;inset:0;z-index:0;pointer-events:none}  
.sh-canvas{position:fixed;inset:0;width:100vw;height:100vh;display:block;opacity:1;pointer-events:none;z-index:1}  
.sh-fallback{position:absolute;display:block;max-width:none;user-select:none;-webkit-user-drag:none;opacity:0;pointer-events:none}  
.sh-backdrop{position:absolute;left:50%;z-index:0;transform:translate(-50%,-50%);white-space:nowrap;pointer-events:none;user-select:none;  
  font-family:var(--sh-head);font-weight:600;letter-spacing:-.06em;line-height:.8;color:color-mix(in srgb,var(--sh-fg) 5%,transparent)}  
.sh-spacer{flex:1 1 auto;min-height:0}  
.sh-content{position:relative;z-index:20;display:grid;grid-template-columns:minmax(0,1.7fr) minmax(0,1fr);align-items:end;  
  gap:clamp(24px,4cqw,72px);padding:0 clamp(20px,3.2cqw,48px) clamp(28px,3.4cqw,52px)}  
.sh-eyebrow{font-size:12px;letter-spacing:.12em;text-transform:uppercase;opacity:.62;margin:0 0 clamp(14px,1.6cqw,22px);  
  display:flex;align-items:center;gap:12px}  
.sh-eyebrow::before{content:"";width:28px;height:1px;background:currentColor;opacity:.7}  
.sh-h1{font-family:var(--sh-head);font-weight:500;font-size:clamp(40px,min(6.6cqw,11.5cqh),124px);line-height:.92;letter-spacing:-.045em;margin:0;  
  text-wrap:balance}  
.sh-h1 .sh-line{display:block}  
.sh-accent{font-family:var(--sh-accent);font-style:italic;font-weight:400;letter-spacing:-.02em;color:var(--sh-acc)}  
.sh-aside{max-width:400px;justify-self:end;padding-bottom:.6em}  
.sh-body{font-size:clamp(15px,1.1cqw,17px);line-height:1.5;letter-spacing:-.01em;margin:0 0 26px;opacity:.78;text-wrap:pretty}  
.sh-ctas{display:flex;flex-wrap:wrap;align-items:center;gap:22px}  
.sh-btn{display:inline-flex;align-items:center;gap:10px;height:46px;padding:0 22px;border-radius:999px;background:var(--sh-fg);  
  color:var(--sh-bg);text-decoration:none;font-size:14.5px;font-weight:500;letter-spacing:-.01em;transition:transform .3s cubic-bezier(.2,.7,.2,1),opacity .2s}  
.sh-btn:hover{transform:translateY(-1px)}  
.sh-btn svg,.sh-txt svg{transition:transform .3s cubic-bezier(.2,.7,.2,1)}  
.sh-btn:hover svg,.sh-txt:hover svg{transform:translateX(3px)}  
.sh-txt{display:inline-flex;align-items:center;gap:8px;color:inherit;text-decoration:none;font-size:14.5px;font-weight:500;  
  letter-spacing:-.01em;padding:4px 0;border-bottom:1px solid color-mix(in srgb,var(--sh-fg) 30%,transparent)}  
.sh-root a:focus-visible{outline:2px solid var(--sh-fg);outline-offset:4px}  
@container (max-width:1023px){  
  .sh-content{grid-template-columns:1fr;gap:28px}  
  .sh-aside{justify-self:start;max-width:520px;padding-bottom:0}  
  .sh-h1{font-size:clamp(40px,min(9.5cqw,9cqh),96px)}  
}  
@container (max-width:639px){  
  .sh-h1{font-size:clamp(36px,min(12.5cqw,7.2cqh),60px);line-height:.94}  
  .sh-body{font-size:15px;margin-bottom:20px}  
  .sh-eyebrow{font-size:11px}  
  .sh-ctas{gap:18px}  
  .sh-btn{height:48px}  
  .sh-content{padding-bottom:40px}  
}  
@media (prefers-reduced-motion:reduce){  
  .sh-btn,.sh-btn svg,.sh-txt svg{transition:none}  
}  
`

const Arrow = () => (  
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">  
    <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />  
  </svg>  
)

function renderHeadline(text: string, accent: string) {  
  const lines = text.split("\n")  
  return lines.map((line, li) => {  
    let content: React.ReactNode = line  
    const a = accent && accent.trim()  
    if (a) {  
      const idx = line.indexOf(a)  
      if (idx >= 0) {  
        content = (  
          <>  
            {line.slice(0, idx)}  
            <span className="sh-accent">{a}</span>  
            {line.slice(idx + a.length)}  
          </>  
        )  
      }  
    }  
    return (  
      <span className="sh-line" key={li}>  
        {content}  
      </span>  
    )  
  })  
}

export default function SculptureHero(props: SculptureHeroProps) {  
  const {  
    children,
    behindText = false,
    src = DEFAULTS.src,  
    darkSrc = DEFAULTS.darkSrc,  
    mobileSrc = DEFAULTS.mobileSrc,  
    mobileDarkSrc = DEFAULTS.mobileDarkSrc,  
    imageAlt = DEFAULTS.imageAlt,  
    imageBackground,  
    eyebrow = DEFAULTS.eyebrow,  
    headline = DEFAULTS.headline,  
    headlineAccent = DEFAULTS.headlineAccent,  
    body = DEFAULTS.body,  
    primaryCta = DEFAULTS.primaryCta,  
    secondaryCta = DEFAULTS.secondaryCta,  
    onPrimaryClick,
    onSecondaryClick,
    background: lightBackground = DEFAULTS.background,  
    darkBackground = DEFAULTS.darkBackground,  
    theme = "light",  
    textColor,  
    accentColor,  
    headingFont = DEFAULTS.headingFont,  
    accentFont = DEFAULTS.accentFont,  
    bodyFont = DEFAULTS.bodyFont,  
    sculptureScale = 1,  
    mobileSculptureScale = 1,  
    sculptureX = 0,  
    sculptureY = 0,  
    interactive = true,  
    strength = 1,  
    radius = 80,  
    particleDensity = 1,  
    particleSpread = 1,  
    dotSize = 1,  
    turbulence = 0.5,  
    liquid = 0.9,  
    streaks = true,  
    restStyle = "particles",  
    returnSpeed = 1,  
    ambient = true,  
    ambientIntensity = 0.7,  
    speed = 0.7,  
    intro = false,  
    height = "100svh",  
    backdropText = "macsolid",  
    className,  
    style,  
  } = props

  const rootRef = React.useRef<HTMLElement>(null)  
  const stageRef = React.useRef<HTMLDivElement>(null)  
  const imgRef = React.useRef<HTMLImageElement>(null)  
  const contentRef = React.useRef<HTMLDivElement>(null)  
  const backdropRef = React.useRef<HTMLDivElement>(null)  
  const engineRef = React.useRef<LiquidEngine | null>(null)  
  const aspectRef = React.useRef(1983 / 793)  

  const layout = React.useRef({ scale: sculptureScale, mobileScale: mobileSculptureScale, x: sculptureX, y: sculptureY })  
  layout.current = {  
    scale: clamp(sculptureScale, 0.3, 3),  
    mobileScale: clamp(mobileSculptureScale, 0.3, 3),  
    x: sculptureX,  
    y: sculptureY,  
  }

  const [mode] = React.useState<"light" | "dark">(theme)  
  const background = mode === "dark" ? darkBackground : lightBackground  
  const bgRgb = React.useMemo(() => hexToRgb(background, [0.92, 0.91, 0.9]), [background])  
  const darkBg = bgRgb[0] * 0.2126 + bgRgb[1] * 0.7152 + bgRgb[2] * 0.0722 < 0.45  
  const fg = textColor || (darkBg ? "#F1EFEA" : DEFAULTS.textColor)  
  const acc = accentColor || fg  
  const imgBgRgb = React.useMemo(  
    () => (imageBackground ? hexToRgb(imageBackground, [0.918, 0.914, 0.906]) : null),  
    [imageBackground]  
  )  
  const [isMobile, setIsMobile] = React.useState(false)  
  const mobileRef = React.useRef(false)  
  const activeSrc =  
    (isMobile && mode === "dark" && (mobileDarkSrc || darkSrc)) ||  
    (isMobile && mode === "light" && mobileSrc) ||  
    (mode === "dark" && darkSrc) ||  
    src

  const engineOpts = (rm: boolean): EngineOptions => ({  
    interactive,  
    strength: clamp(strength, 0, 2),  
    radius: clamp(radius, 40, 600),  
    density: clamp(particleDensity, 0.15, 2),  
    dotSize: clamp(dotSize, 0.2, 3),  
    spread: clamp(particleSpread, 0, 2),  
    turbulence: clamp(turbulence, 0, 2),  
    liquid: clamp(liquid, 0, 2),  
    streaks,  
    restStyle,  
    returnSpeed: clamp(returnSpeed, 0, 2),  
    ambient: true,  
    ambientIntensity: clamp(ambientIntensity, 0, 2),  
    speed: clamp(speed, 0.25, 3),  
    intro,  
    reducedMotion: rm,  
    bg: bgRgb,  
    imgBg: imgBgRgb,  
  })  
  const optsRef = React.useRef(engineOpts)  
  optsRef.current = engineOpts

  const relayout = React.useCallback(() => {  
    const root = rootRef.current  
    if (!root) return  
    const w = window.innerWidth  
    const h = window.innerHeight  
    const mob = w < 640  
    if (mob !== mobileRef.current) {  
      mobileRef.current = mob  
      setIsMobile(mob)  
    }  
    const content = contentRef.current  
    let band: { top: number; bottom: number }
    if (behindText) {
      band = {
        top: 0,
        bottom: h,
      }
    } else {
      band = {  
        top: 24,  
        bottom: content ? content.offsetTop - 8 : h * 0.78,  
      }  
      if (mob && aspectRef.current < 1.3 && content) band.bottom += content.offsetHeight * 0.3  
    }
    const rect = computeRect(w, h, aspectRef.current, band, layout.current)  
    const bd = backdropRef.current  
    if (bd) {  
      const chars = Math.max(1, (bd.textContent || "").length)  
      bd.style.fontSize = Math.min((band.bottom - band.top) * 0.95, (w * 0.92) / (chars * 0.56)) + "px"  
      bd.style.top = (band.top + band.bottom) / 2 + "px"  
    }  
    engineRef.current?.resize(w, h, rect)  
  }, [behindText])

  // engine lifecycle: mount fixed full-screen WebGL canvas to body in background (z-index: 1)
  React.useEffect(() => {  
    const root = rootRef.current  
    if (!root) return  
    
    // Fixed full-viewport canvas in background (z-index: 1)
    // Behind content & hero text (z-20), above canvas grid (z-0)
    const canvas = document.createElement("canvas")  
    canvas.className = "sh-canvas"  
    canvas.style.position = "fixed"
    canvas.style.top = "0"
    canvas.style.left = "0"
    canvas.style.width = "100vw"
    canvas.style.height = "100vh"
    canvas.style.pointerEvents = "none"
    canvas.style.zIndex = "1"
    canvas.style.opacity = "1"
    canvas.style.display = "block"
    document.body.appendChild(canvas)

    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")  
    let engine: LiquidEngine | null = null  
    const fail = () => {  
      canvas.style.opacity = "0"  
      root.dataset.gl = "off"  
    }  
    try {  
      engine = new LiquidEngine(canvas, optsRef.current(mq.matches), fail)  
      engineRef.current = engine  
    } catch {  
      fail()  
    }

    const ro = new ResizeObserver(() => relayout())  
    ro.observe(document.body)  
    if (contentRef.current) ro.observe(contentRef.current)  

    const onVis = () => engine?.setVisible(!document.hidden)  
    document.addEventListener("visibilitychange", onVis)  
    const onMq = () => engine?.setOptions({ reducedMotion: mq.matches })  
    mq.addEventListener?.("change", onMq)

    const onMove = (e: PointerEvent) => {  
      const touch = e.pointerType === "touch"  
      if (touch && e.buttons === 0 && e.pressure === 0) return  
      engine?.pointer("move", e.clientX, e.clientY, touch)  
    }  
    const onDown = (e: PointerEvent) => {  
      engine?.pointer("down", e.clientX, e.clientY, e.pointerType === "touch")  
    }  
    const onUp = (e: PointerEvent) => {  
      engine?.pointer("up", e.clientX, e.clientY, e.pointerType === "touch")  
    }  
    const onLeave = (e: PointerEvent) => {  
      engine?.pointer("leave", e.clientX, e.clientY, e.pointerType === "touch")  
    }  
    const onScroll = () => {
      engine?.wake()
    }

    window.addEventListener("pointermove", onMove, { passive: true })  
    window.addEventListener("pointerdown", onDown, { passive: true })  
    window.addEventListener("pointerup", onUp, { passive: true })  
    window.addEventListener("pointercancel", onUp, { passive: true })  
    window.addEventListener("pointerleave", onLeave, { passive: true })
    window.addEventListener("scroll", onScroll, { passive: true })

    return () => {  
      ro.disconnect()  
      document.removeEventListener("visibilitychange", onVis)  
      mq.removeEventListener?.("change", onMq)  
      window.removeEventListener("pointermove", onMove)  
      window.removeEventListener("pointerdown", onDown)  
      window.removeEventListener("pointerup", onUp)  
      window.removeEventListener("pointercancel", onUp)  
      window.removeEventListener("pointerleave", onLeave)  
      window.removeEventListener("scroll", onScroll)
      engine?.destroy()  
      engineRef.current = null  
      canvas.remove()  
      delete root.dataset.gl  
    }  
  }, [relayout])

  // load sculpture texture and initialize particles
  React.useEffect(() => {  
    const root = rootRef.current  
    const engine = engineRef.current  
    if (!root) return  
    let cancelled = false  
    const image = new Image()  
    image.crossOrigin = "anonymous"  
    image.decoding = "async"  
    image.onload = () => {  
      if (cancelled) return  
      aspectRef.current = image.naturalWidth / image.naturalHeight || aspectRef.current  
      relayout()  
      if (engine && root.dataset.gl !== "off") {  
        try {  
          engine.onFirstFrame = () => {  
            if (cancelled) return  
            root.dataset.gl = "on"  
          }  
          engine.setImage(image)  
          relayout()  
        } catch {  
          root.dataset.gl = "off"  
        }  
      }  
    }  
    const t = window.setTimeout(() => (image.src = activeSrc), 0)  
    return () => {  
      cancelled = true  
      window.clearTimeout(t)  
      image.onload = null  
      image.onerror = null  
    }  
  }, [activeSrc, relayout])

  React.useEffect(() => {  
    const e = engineRef.current  
    if (!e) return  
    const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches  
    e.setOptions(optsRef.current(rm))  
  }, [interactive, strength, radius, particleDensity, dotSize, particleSpread, turbulence, liquid, streaks, restStyle, returnSpeed, ambient, ambientIntensity, speed, intro, bgRgb, imgBgRgb])

  React.useEffect(() => {  
    relayout()  
  }, [sculptureScale, mobileSculptureScale, sculptureX, sculptureY, relayout])

  const vars = {  
    "--sh-bg": background,  
    "--sh-fg": fg,  
    "--sh-acc": acc,  
    "--sh-head": headingFont,  
    "--sh-accent": accentFont,  
    "--sh-body": bodyFont,  
    "--sh-h": height,  
  } as React.CSSProperties

  return (  
    <section ref={rootRef} className={"sh-root" + (className ? " " + className : "")} style={{ ...vars, ...style }}>  
      <style>{CSS}</style>  
      {backdropText ? (  
        <div ref={backdropRef} className="sh-backdrop" aria-hidden="true">  
          {backdropText}  
        </div>  
      ) : null}  
      <div ref={stageRef} className="sh-stage" aria-hidden="true">  
        <img ref={imgRef} className="sh-fallback opacity-0 pointer-events-none" src={activeSrc} alt="" crossOrigin="anonymous" draggable={false} />  
      </div>  
      <span style={{ position: "absolute", width: 1, height: 1, overflow: "hidden", clip: "rect(0 0 0 0)" }}>{imageAlt}</span>

      {children ? (
        <div ref={contentRef} className="relative z-20 w-full flex flex-col items-center justify-center">
          {children}
        </div>
      ) : (
        <>
          <div className="sh-spacer" />
          <div ref={contentRef} className="sh-content">  
            <div>  
              {eyebrow ? <p className="sh-eyebrow">{eyebrow}</p> : null}  
              <h1 className="sh-h1">{renderHeadline(headline, headlineAccent)}</h1>  
            </div>  
            <div className="sh-aside">  
              {body ? <p className="sh-body">{body}</p> : null}  
              <div className="sh-ctas">  
                {primaryCta && primaryCta.label ? (  
                  onPrimaryClick ? (
                    <button type="button" onClick={onPrimaryClick} className="sh-btn cursor-pointer">
                      {primaryCta.label}
                      <Arrow />
                    </button>
                  ) : (
                    <a className="sh-btn" href={primaryCta.href}>  
                      {primaryCta.label}  
                      <Arrow />  
                    </a>  
                  )
                ) : null}  
                {secondaryCta && secondaryCta.label ? (  
                  onSecondaryClick ? (
                    <button type="button" onClick={onSecondaryClick} className="sh-txt cursor-pointer">
                      {secondaryCta.label}
                      <Arrow />
                    </button>
                  ) : (
                    <a className="sh-txt" href={secondaryCta.href}>  
                      {secondaryCta.label}  
                      <Arrow />  
                    </a>  
                  )
                ) : null}  
              </div>  
            </div>  
          </div>
        </>
      )}
    </section>  
  )  
}
