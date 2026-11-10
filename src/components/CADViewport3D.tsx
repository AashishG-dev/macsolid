import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export type CADModelType = 'hero_spindle' | 'mould_assembly' | 'hydraulic_manifold';

interface CADViewport3DProps {
  modelType?: CADModelType;
  explodeProgress?: number; // 0 to 1
  cutProgress?: number; // -1 to 1
  cutAxis?: 'x' | 'y' | 'z';
  enableClipping?: boolean;
  interactive?: boolean;
  className?: string;
}

export const CADViewport3D: React.FC<CADViewport3DProps> = ({
  modelType = 'hero_spindle',
  explodeProgress = 0,
  cutProgress = 0,
  cutAxis = 'y',
  enableClipping = false,
  interactive = true,
  className = '',
}) => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  // References for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const partsGroupRef = useRef<THREE.Group | null>(null);
  const clipPlaneRef = useRef<THREE.Plane | null>(null);
  const localPlaneRef = useRef<THREE.Plane>(new THREE.Plane(new THREE.Vector3(0, -1, 0), 0));
  const capMeshRef = useRef<THREE.Mesh | null>(null);
  const capEdgesRef = useRef<THREE.LineSegments | null>(null);

  const partsListRef = useRef<
    {
      mesh: THREE.Mesh | THREE.Group;
      basePos: THREE.Vector3;
      explodeDir: THREE.Vector3;
      explodeDist: number;
      name: string;
      materialName: string;
    }[]
  >([]);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Adaptive Camera Setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);

    const alignCamera = (cam: THREE.PerspectiveCamera, w: number, h: number) => {
      const asp = Math.max(0.1, w / h);
      // On narrow/mobile screens (asp < 1.15), pull camera back proportionally so model is never clipped
      const distFactor = asp < 0.75 ? 1.55 : asp < 1.0 ? 1.35 : asp < 1.25 ? 1.18 : 1.0;

      if (modelType === 'mould_assembly') {
        cam.position.set(240 * distFactor, 200 * distFactor, 280 * distFactor);
      } else if (modelType === 'hydraulic_manifold') {
        cam.position.set(200 * distFactor, 160 * distFactor, 240 * distFactor);
      } else {
        cam.position.set(210 * distFactor, 170 * distFactor, 250 * distFactor);
      }
      cam.lookAt(0, 0, 0);
    };

    alignCamera(camera, width, height);

    // 2. High-Performance WebGL Renderer (DPR capped for mobile battery & thermal efficiency)
    const isMobile = window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches;
    const renderer = new THREE.WebGLRenderer({
      antialias: !isMobile,
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.75));
    renderer.localClippingEnabled = true;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.replaceChildren(renderer.domElement);

    // 3. Studio Lighting Rig
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.15);
    keyLight.position.set(180, 280, 180);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xcfd8dc, 0.6);
    fillLight.position.set(-180, 80, -120);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0x93c5fd, 0.45);
    rimLight.position.set(0, -160, 180);
    scene.add(rimLight);

    // 4. Clip Plane Setup (World representation driven by local plane)
    const clipPlane = new THREE.Plane(new THREE.Vector3(0, -1, 0), 100);
    clipPlaneRef.current = clipPlane;

    // 5. Materials Factory with DoubleSide & Line Clipping Support
    const createCadMat = (
      colorHex: number,
      metalness = 0.35,
      roughness = 0.28
    ) => {
      return new THREE.MeshStandardMaterial({
        color: colorHex,
        metalness,
        roughness,
        side: THREE.DoubleSide, // Render interior cavity walls when sectioned
        clippingPlanes: enableClipping ? [clipPlane] : [],
        clipShadows: true,
      });
    };

    const addEdges = (mesh: THREE.Mesh | THREE.Group, threshold = 24) => {
      const lineMat = new THREE.LineBasicMaterial({
        color: 0x0f172a,
        linewidth: 1,
        transparent: true,
        opacity: 0.85,
        clippingPlanes: enableClipping ? [clipPlane] : [],
      });

      if ((mesh as THREE.Mesh).geometry) {
        const edges = new THREE.LineSegments(
          new THREE.EdgesGeometry((mesh as THREE.Mesh).geometry, threshold),
          lineMat
        );
        mesh.add(edges);
      }
    };

    const partsGroup = new THREE.Group();
    partsGroupRef.current = partsGroup;
    scene.add(partsGroup);

    partsListRef.current = [];
    capMeshRef.current = null;
    capEdgesRef.current = null;

    // ──────────────────────────────────────────────────────────────────────────
    // MODEL BUILDERS
    // ──────────────────────────────────────────────────────────────────────────

    if (modelType === 'hero_spindle') {
      // MODEL 1: HIGH-PRECISION CNC ROTARY COLLET & PLANETARY SPINDLE
      const housingGeo = new THREE.CylinderGeometry(52, 58, 64, 32);
      const housingMat = createCadMat(0xf1f5f9, 0.2, 0.35);
      const housingMesh = new THREE.Mesh(housingGeo, housingMat);
      addEdges(housingMesh);
      housingMesh.position.set(0, -10, 0);
      partsGroup.add(housingMesh);

      const rotorGeo = new THREE.CylinderGeometry(24, 28, 120, 32);
      const rotorMat = createCadMat(0x2563eb, 0.5, 0.2);
      const rotorMesh = new THREE.Mesh(rotorGeo, rotorMat);
      addEdges(rotorMesh);
      rotorMesh.position.set(0, 5, 0);
      partsGroup.add(rotorMesh);

      const colletGeo = new THREE.CylinderGeometry(36, 40, 22, 32);
      const colletMat = createCadMat(0x0284c7, 0.45, 0.22);
      const colletMesh = new THREE.Mesh(colletGeo, colletMat);
      addEdges(colletMesh);
      colletMesh.position.set(0, 48, 0);
      partsGroup.add(colletMesh);

      const pinionsGroup = new THREE.Group();
      const pinionGeo = new THREE.CylinderGeometry(8, 8, 32, 20);
      const pinionMat = createCadMat(0xd97706, 0.65, 0.22);
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const p = new THREE.Mesh(pinionGeo, pinionMat);
        p.position.set(Math.cos(angle) * 38, -12, Math.sin(angle) * 38);
        addEdges(p);
        pinionsGroup.add(p);
      }
      partsGroup.add(pinionsGroup);

      const bearingGeo = new THREE.TorusGeometry(38, 7, 16, 32);
      const bearingMat = createCadMat(0x475569, 0.8, 0.15);
      const bearingMesh = new THREE.Mesh(bearingGeo, bearingMat);
      bearingMesh.rotation.x = Math.PI / 2;
      bearingMesh.position.set(0, -48, 0);
      partsGroup.add(bearingMesh);

      const flangeGeo = new THREE.CylinderGeometry(68, 72, 14, 32);
      const flangeMat = createCadMat(0x94a3b8, 0.35, 0.3);
      const flangeMesh = new THREE.Mesh(flangeGeo, flangeMat);
      addEdges(flangeMesh);
      flangeMesh.position.set(0, -60, 0);
      partsGroup.add(flangeMesh);

      partsListRef.current = [
        {
          mesh: colletMesh,
          basePos: new THREE.Vector3(0, 48, 0),
          explodeDir: new THREE.Vector3(0, 1.2, 0),
          explodeDist: 60,
          name: 'COLLET-CHUCK-RETAINER',
          materialName: 'Laser Anodized 7075-T6',
        },
        {
          mesh: rotorMesh,
          basePos: new THREE.Vector3(0, 5, 0),
          explodeDir: new THREE.Vector3(0, 0.6, 0),
          explodeDist: 35,
          name: 'CENTRAL-SPINDLE-ROTOR',
          materialName: 'Case Hardened 42CrMo4',
        },
        {
          mesh: housingMesh,
          basePos: new THREE.Vector3(0, -10, 0),
          explodeDir: new THREE.Vector3(0, 0, 0),
          explodeDist: 0,
          name: 'FLANGED-OUTER-HOUSING',
          materialName: 'Porcelain Titanium Composite',
        },
        {
          mesh: pinionsGroup,
          basePos: new THREE.Vector3(0, -12, 0),
          explodeDir: new THREE.Vector3(0, 0, 0),
          explodeDist: 0,
          name: 'PLANETARY-PINION-SET',
          materialName: 'CuSn8 Phosphor Bronze',
        },
        {
          mesh: bearingMesh,
          basePos: new THREE.Vector3(0, -48, 0),
          explodeDir: new THREE.Vector3(0, -0.9, 0),
          explodeDist: 45,
          name: 'THRUST-BEARING-RACE',
          materialName: '100Cr6 Hardened Chrome',
        },
        {
          mesh: flangeMesh,
          basePos: new THREE.Vector3(0, -60, 0),
          explodeDir: new THREE.Vector3(0, -1.3, 0),
          explodeDist: 65,
          name: 'MOUNTING-BASE-FLANGE',
          materialName: 'Structural Cast Alloy',
        },
      ];
    } else if (modelType === 'mould_assembly') {
      // MODEL 2: MULTI-TIER INJECTION MOULD & PROGRESSIVE DIE TOOLING
      const topPlateGeo = new THREE.BoxGeometry(130, 16, 110);
      const topPlateMat = createCadMat(0x1e293b, 0.35, 0.3);
      const topPlateMesh = new THREE.Mesh(topPlateGeo, topPlateMat);
      addEdges(topPlateMesh);
      topPlateMesh.position.set(0, 52, 0);
      partsGroup.add(topPlateMesh);

      const cavityGeo = new THREE.BoxGeometry(100, 24, 85);
      const cavityMat = createCadMat(0x2563eb, 0.45, 0.22);
      const cavityMesh = new THREE.Mesh(cavityGeo, cavityMat);
      addEdges(cavityMesh);
      cavityMesh.position.set(0, 28, 0);
      partsGroup.add(cavityMesh);

      const coreGeo = new THREE.BoxGeometry(100, 24, 85);
      const coreMat = createCadMat(0xf8fafc, 0.2, 0.25);
      const coreMesh = new THREE.Mesh(coreGeo, coreMat);
      addEdges(coreMesh);
      coreMesh.position.set(0, 0, 0);
      partsGroup.add(coreMesh);

      const pillarsGroup = new THREE.Group();
      const pillarGeo = new THREE.CylinderGeometry(6, 6, 95, 20);
      const pillarMat = createCadMat(0xe2e8f0, 0.85, 0.15);
      [
        [-52, -42],
        [52, -42],
        [-52, 42],
        [52, 42],
      ].forEach(([px, pz]) => {
        const pMesh = new THREE.Mesh(pillarGeo, pillarMat);
        addEdges(pMesh);
        pMesh.position.set(px, 15, pz);
        pillarsGroup.add(pMesh);
      });
      partsGroup.add(pillarsGroup);

      const ejectorPlateGeo = new THREE.BoxGeometry(90, 12, 75);
      const ejectorMat = createCadMat(0xd97706, 0.65, 0.22);
      const ejectorMesh = new THREE.Mesh(ejectorPlateGeo, ejectorMat);
      addEdges(ejectorMesh);
      ejectorMesh.position.set(0, -24, 0);

      const pinGeo = new THREE.CylinderGeometry(2.5, 2.5, 38, 16);
      [
        [-25, -20],
        [25, -20],
        [-25, 20],
        [25, 20],
      ].forEach(([pinX, pinZ]) => {
        const pin = new THREE.Mesh(pinGeo, ejectorMat);
        pin.position.set(pinX, 22, pinZ);
        addEdges(pin);
        ejectorMesh.add(pin);
      });
      partsGroup.add(ejectorMesh);

      const riserGeo = new THREE.BoxGeometry(22, 34, 110);
      const riserMat = createCadMat(0x0284c7, 0.4, 0.25);

      const riserL = new THREE.Mesh(riserGeo, riserMat);
      addEdges(riserL);
      riserL.position.set(-54, -48, 0);
      partsGroup.add(riserL);

      const riserR = new THREE.Mesh(riserGeo, riserMat);
      addEdges(riserR);
      riserR.position.set(54, -48, 0);
      partsGroup.add(riserR);

      const bottomPlateGeo = new THREE.BoxGeometry(140, 16, 120);
      const bottomPlateMat = createCadMat(0x64748b, 0.35, 0.3);
      const bottomPlateMesh = new THREE.Mesh(bottomPlateGeo, bottomPlateMat);
      addEdges(bottomPlateMesh);
      bottomPlateMesh.position.set(0, -72, 0);
      partsGroup.add(bottomPlateMesh);

      partsListRef.current = [
        {
          mesh: topPlateMesh,
          basePos: new THREE.Vector3(0, 52, 0),
          explodeDir: new THREE.Vector3(0, 1.3, 0),
          explodeDist: 70,
          name: 'TOP-CLAMPING-PLATE',
          materialName: '1.2311 Tool Steel (Hardened)',
        },
        {
          mesh: cavityMesh,
          basePos: new THREE.Vector3(0, 28, 0),
          explodeDir: new THREE.Vector3(0, 0.8, 0),
          explodeDist: 50,
          name: 'CAVITY-DIE-INSERT',
          materialName: 'Bohler M333 Isoplast High-Polish',
        },
        {
          mesh: coreMesh,
          basePos: new THREE.Vector3(0, 0, 0),
          explodeDir: new THREE.Vector3(0, 0, 0),
          explodeDist: 0,
          name: 'CORE-DIE-BLOCK',
          materialName: 'Corrax PH Stainless Steel',
        },
        {
          mesh: pillarsGroup,
          basePos: new THREE.Vector3(0, 15, 0),
          explodeDir: new THREE.Vector3(0, 0.4, 0),
          explodeDist: 25,
          name: 'GUIDE-PILLAR-BUSHING-SET',
          materialName: '420 Stainless High-Polish',
        },
        {
          mesh: ejectorMesh,
          basePos: new THREE.Vector3(0, -24, 0),
          explodeDir: new THREE.Vector3(0, -0.8, 0),
          explodeDist: 45,
          name: 'EJECTOR-SYSTEM-ASSEMBLY',
          materialName: 'CuAl10Fe3 Aluminum Bronze',
        },
        {
          mesh: riserL,
          basePos: new THREE.Vector3(-54, -48, 0),
          explodeDir: new THREE.Vector3(-1.1, -0.4, 0),
          explodeDist: 50,
          name: 'RISER-BLOCK-LEFT',
          materialName: '7075-T651 Anodized Cyan',
        },
        {
          mesh: riserR,
          basePos: new THREE.Vector3(54, -48, 0),
          explodeDir: new THREE.Vector3(1.1, -0.4, 0),
          explodeDist: 50,
          name: 'RISER-BLOCK-RIGHT',
          materialName: '7075-T651 Anodized Cyan',
        },
        {
          mesh: bottomPlateMesh,
          basePos: new THREE.Vector3(0, -72, 0),
          explodeDir: new THREE.Vector3(0, -1.4, 0),
          explodeDist: 75,
          name: 'BOTTOM-BED-PLATE',
          materialName: 'S50C Normalized Carbon Steel',
        },
      ];
    } else {
      // ════════════════════════════════════════════════════════════════════════
      // MODEL 3: AEROSPACE HYDRAULIC VALVE MANIFOLD (REAL CAD SECTION VIEW)
      // ════════════════════════════════════════════════════════════════════════

      // Part 1: Main Manifold Solid Block (Deep Sapphire Blue)
      const blockGeo = new THREE.BoxGeometry(110, 80, 75);
      const blockMat = createCadMat(0x1d4ed8, 0.45, 0.25);
      const blockMesh = new THREE.Mesh(blockGeo, blockMat);
      addEdges(blockMesh);
      blockMesh.position.set(0, 0, 0);
      partsGroup.add(blockMesh);

      // Part 2: Internal Bored Chamber Wall (Dark Honed Steel Bore)
      const boreGeo = new THREE.CylinderGeometry(15, 15, 112, 32);
      const boreMat = createCadMat(0x0f172a, 0.4, 0.35);
      const boreMesh = new THREE.Mesh(boreGeo, boreMat);
      boreMesh.rotation.z = Math.PI / 2;
      boreMesh.position.set(0, 4, 0);
      addEdges(boreMesh);
      partsGroup.add(boreMesh);

      // Part 3: Internal Precision Servo Spool Valve
      const spoolGroup = new THREE.Group();
      spoolGroup.position.set(0, 4, 0);

      // Central Chrome Stem
      const stemGeo = new THREE.CylinderGeometry(7, 7, 138, 32);
      const stemMat = createCadMat(0xf8fafc, 0.92, 0.1);
      const stemMesh = new THREE.Mesh(stemGeo, stemMat);
      stemMesh.rotation.z = Math.PI / 2;
      addEdges(stemMesh);
      spoolGroup.add(stemMesh);

      // 3x Precision Metering Lands (Cylindrical Piston Plugs)
      const landGeo = new THREE.CylinderGeometry(14.2, 14.2, 18, 32);
      const landMat = createCadMat(0xe2e8f0, 0.85, 0.15);
      const sealMat = createCadMat(0x0284c7, 0.5, 0.2);

      [-32, 0, 32].forEach((lx) => {
        const land = new THREE.Mesh(landGeo, landMat);
        land.rotation.z = Math.PI / 2;
        land.position.set(lx, 0, 0);
        addEdges(land);
        spoolGroup.add(land);

        const sealGeo = new THREE.CylinderGeometry(14.6, 14.6, 4, 32);
        const seal = new THREE.Mesh(sealGeo, sealMat);
        seal.rotation.z = Math.PI / 2;
        seal.position.set(lx, 0, 0);
        addEdges(seal);
        spoolGroup.add(seal);
      });

      // 2x Bronze End Bushings
      const bushGeo = new THREE.CylinderGeometry(13.5, 13.5, 10, 24);
      const bushMat = createCadMat(0xd97706, 0.65, 0.22);
      [-52, 52].forEach((bx) => {
        const bush = new THREE.Mesh(bushGeo, bushMat);
        bush.rotation.z = Math.PI / 2;
        bush.position.set(bx, 0, 0);
        addEdges(bush);
        spoolGroup.add(bush);
      });

      partsGroup.add(spoolGroup);

      // Part 4: 2x Internal Cross-Drilled Oil Galleries
      const galleryGeo = new THREE.CylinderGeometry(7, 7, 34, 20);
      const galleryMat = createCadMat(0x0f172a, 0.35, 0.4);
      [-30, 30].forEach((gx) => {
        const gallery = new THREE.Mesh(galleryGeo, galleryMat);
        gallery.position.set(gx, 21, 0);
        addEdges(gallery);
        partsGroup.add(gallery);
      });

      // Part 5: Dual Flanged End-Caps (Matte Titanium Slate)
      const capGeo = new THREE.CylinderGeometry(24, 24, 16, 24);
      const capMat = createCadMat(0x475569, 0.45, 0.3);

      const capL = new THREE.Mesh(capGeo, capMat);
      capL.rotation.z = Math.PI / 2;
      capL.position.set(-64, 4, 0);
      addEdges(capL);
      partsGroup.add(capL);

      const capR = new THREE.Mesh(capGeo, capMat);
      capR.rotation.z = Math.PI / 2;
      capR.position.set(64, 4, 0);
      addEdges(capR);
      partsGroup.add(capR);

      // Part 6: 4x Top SAE Fluid Ports (Golden Brass Fittings)
      const portGeo = new THREE.CylinderGeometry(11, 14, 20, 20);
      const portMat = createCadMat(0xf59e0b, 0.7, 0.22);

      const portCoords = [
        [-30, 48, -18],
        [30, 48, -18],
        [-30, 48, 18],
        [30, 48, 18],
      ];
      portCoords.forEach(([px, py, pz]) => {
        const port = new THREE.Mesh(portGeo, portMat);
        port.position.set(px, py, pz);
        addEdges(port);
        partsGroup.add(port);
      });

      // Part 7: Front Diagnostic Transducer Cartridge (Laser Cyan)
      const diagGeo = new THREE.CylinderGeometry(9, 9, 32, 20);
      const diagMat = createCadMat(0x06b6d4, 0.5, 0.2);
      const diagMesh = new THREE.Mesh(diagGeo, diagMat);
      diagMesh.rotation.x = Math.PI / 2;
      diagMesh.position.set(0, -22, 45);
      addEdges(diagMesh);
      partsGroup.add(diagMesh);

      // ────────────────────────────────────────────────────────────────────────
      // SOLID SECTION CAP (Cuts exactly at the cut plane, moves with the part)
      // ────────────────────────────────────────────────────────────────────────
      const sectionCapMat = new THREE.MeshStandardMaterial({
        color: 0x1e3a8a, // Solid milled aerospace sapphire cross-section face
        metalness: 0.45,
        roughness: 0.2,
        side: THREE.DoubleSide,
      });

      const sectionCapMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(109.8, 74.8),
        sectionCapMat
      );
      sectionCapMesh.visible = false;
      partsGroup.add(sectionCapMesh);
      capMeshRef.current = sectionCapMesh;

      const capEdgeMat = new THREE.LineBasicMaterial({
        color: 0x93c5fd, // Crisp CAD section border highlight
        linewidth: 1.5,
      });
      const sectionCapEdges = new THREE.LineSegments(
        new THREE.EdgesGeometry(sectionCapMesh.geometry),
        capEdgeMat
      );
      sectionCapEdges.visible = false;
      partsGroup.add(sectionCapEdges);
      capEdgesRef.current = sectionCapEdges;

      partsListRef.current = [
        {
          mesh: blockMesh,
          basePos: new THREE.Vector3(0, 0, 0),
          explodeDir: new THREE.Vector3(0, 0, 0),
          explodeDist: 0,
          name: 'MANIFOLD-BODY-BLOCK',
          materialName: 'Al 6061-T6 (Hardcoat Anodized)',
        },
        {
          mesh: spoolGroup,
          basePos: new THREE.Vector3(0, 4, 0),
          explodeDir: new THREE.Vector3(1, 0, 0),
          explodeDist: 50,
          name: 'SERVO-SPOOL-VALVE-ASSEMBLY',
          materialName: '440C Stainless Ground + Bronze Bushings',
        },
        {
          mesh: capL,
          basePos: new THREE.Vector3(-64, 4, 0),
          explodeDir: new THREE.Vector3(-1.2, 0, 0),
          explodeDist: 55,
          name: 'END-FLANGE-CAP-L',
          materialName: 'Grade 5 Titanium (Ti-6Al-4V)',
        },
        {
          mesh: capR,
          basePos: new THREE.Vector3(64, 4, 0),
          explodeDir: new THREE.Vector3(1.2, 0, 0),
          explodeDist: 55,
          name: 'END-FLANGE-CAP-R',
          materialName: 'Grade 5 Titanium (Ti-6Al-4V)',
        },
        {
          mesh: diagMesh,
          basePos: new THREE.Vector3(0, -22, 45),
          explodeDir: new THREE.Vector3(0, 0, 1.3),
          explodeDist: 55,
          name: 'PRESSURE-TELEMETRY-CARTRIDGE',
          materialName: 'Micro-Machined Piezoelectric Node',
        },
      ];
    }

    // 7. Unified Pointer & Touch Orbit Interaction
    container.style.touchAction = 'pan-y'; // Allows vertical page scrolling while horizontal swipe orbits the 3D model
    let isDragging = false;
    let prevPointerPos = { x: 0, y: 0 };
    const rotationSpeed = 0.0035;
    let targetRotationY = 0.45;
    let targetRotationX = 0.22;

    const onPointerDown = (e: PointerEvent) => {
      if (!interactive) return;
      isDragging = true;
      prevPointerPos = { x: e.clientX, y: e.clientY };
      try {
        container.setPointerCapture(e.pointerId);
      } catch {
        // Fallback
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging || !interactive) return;
      const deltaX = e.clientX - prevPointerPos.x;
      const deltaY = e.clientY - prevPointerPos.y;

      targetRotationY += deltaX * rotationSpeed;
      targetRotationX += deltaY * rotationSpeed;
      targetRotationX = Math.max(-0.85, Math.min(0.85, targetRotationX));

      prevPointerPos = { x: e.clientX, y: e.clientY };
    };

    const onPointerUp = (e: PointerEvent) => {
      isDragging = false;
      try {
        if (container.hasPointerCapture(e.pointerId)) {
          container.releasePointerCapture(e.pointerId);
        }
      } catch {
        // Fallback
      }
    };

    container.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    // 8. Viewport Visibility Culling (Stops RAF when scrolled out of view to save 100% GPU/CPU on mobile)
    let animId: number = 0;
    let isRunning = false;
    const clock = new THREE.Clock();

    const animate = () => {
      if (!isRunning) return;
      const delta = clock.getDelta();

      if (!isDragging) {
        targetRotationY += 0.1 * delta;
      }

      if (partsGroupRef.current) {
        partsGroupRef.current.rotation.y +=
          (targetRotationY - partsGroupRef.current.rotation.y) * 0.08;
        partsGroupRef.current.rotation.x +=
          (targetRotationX - partsGroupRef.current.rotation.x) * 0.08;

        // Keep local matrix updated
        partsGroupRef.current.updateMatrixWorld(true);

        // LOCK CLIPPING PLANE RIGIDLY TO MODEL SPACE:
        // As partsGroup rotates, transform local cutting plane to world space in real-time
        if (enableClipping && clipPlaneRef.current && localPlaneRef.current) {
          clipPlaneRef.current
            .copy(localPlaneRef.current)
            .applyMatrix4(partsGroupRef.current.matrixWorld);
        }
      }

      renderer.render(scene, camera);
      animId = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (isRunning) return;
      isRunning = true;
      clock.start();
      animId = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      isRunning = false;
      cancelAnimationFrame(animId);
    };

    // Pause Three.js completely when out of viewport
    const io = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    io.observe(container);

    // Responsive Container Observer for dynamic framing on mobile / orientation changes
    const ro = new ResizeObserver(() => {
      if (!container || !rendererRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      alignCamera(camera, w, h);
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    });
    ro.observe(container);

    return () => {
      stopLoop();
      io.disconnect();
      ro.disconnect();
      container.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);

      // Deep GPU resource disposal to eliminate memory leaks
      partsGroup.traverse((child) => {
        const mesh = child as THREE.Mesh;
        if (mesh.geometry) mesh.geometry.dispose();
        if (mesh.material) {
          const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
          mats.forEach((m) => m.dispose());
        }
      });

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [modelType]);

  // Update Explosion Progress
  useEffect(() => {
    partsListRef.current.forEach((item) => {
      const targetPos = item.basePos
        .clone()
        .add(item.explodeDir.clone().multiplyScalar(item.explodeDist * explodeProgress));
      item.mesh.position.lerp(targetPos, 0.25);
    });
  }, [explodeProgress]);

  // Update Clipping Plane Position and Axis in MODEL LOCAL SPACE
  useEffect(() => {
    if (!clipPlaneRef.current || !rendererRef.current || !partsGroupRef.current) return;

    rendererRef.current.localClippingEnabled = enableClipping;

    // Define normal and constant in LOCAL MODEL COORDINATES
    let localNormal = new THREE.Vector3(0, -1, 0);
    let localConst = cutProgress * 38;

    if (cutAxis === 'x') {
      localNormal = new THREE.Vector3(-1, 0, 0);
      localConst = cutProgress * 52;
    } else if (cutAxis === 'z') {
      localNormal = new THREE.Vector3(0, 0, -1);
      localConst = cutProgress * 36;
    }

    localPlaneRef.current.set(localNormal, localConst);

    // Apply immediate transform so there is zero frame lag
    partsGroupRef.current.updateMatrixWorld(true);
    clipPlaneRef.current
      .copy(localPlaneRef.current)
      .applyMatrix4(partsGroupRef.current.matrixWorld);

    // Update Solid Section Cap position and orientation
    if (capMeshRef.current && capEdgesRef.current) {
      const showCap = enableClipping && modelType === 'hydraulic_manifold';
      capMeshRef.current.visible = showCap;
      capEdgesRef.current.visible = showCap;

      if (showCap) {
        capMeshRef.current.geometry.dispose();
        capEdgesRef.current.geometry.dispose();

        if (cutAxis === 'y') {
          capMeshRef.current.geometry = new THREE.PlaneGeometry(109.6, 74.6);
          capMeshRef.current.rotation.set(-Math.PI / 2, 0, 0);
          capMeshRef.current.position.set(0, localConst - 0.05, 0);
        } else if (cutAxis === 'x') {
          capMeshRef.current.geometry = new THREE.PlaneGeometry(74.6, 79.6);
          capMeshRef.current.rotation.set(0, Math.PI / 2, 0);
          capMeshRef.current.position.set(localConst - 0.05, 0, 0);
        } else {
          capMeshRef.current.geometry = new THREE.PlaneGeometry(109.6, 79.6);
          capMeshRef.current.rotation.set(0, 0, 0);
          capMeshRef.current.position.set(0, 0, localConst - 0.05);
        }

        capEdgesRef.current.geometry = new THREE.EdgesGeometry(capMeshRef.current.geometry);
        capEdgesRef.current.rotation.copy(capMeshRef.current.rotation);
        capEdgesRef.current.position.copy(capMeshRef.current.position);
      }
    }

    // Traverse ALL objects and LineSegments in partsGroup to apply hardware clipping
    // (This guarantees the top edges, wireframes, and ports cleanly disappear)
    partsGroupRef.current.traverse((child: THREE.Object3D) => {
      // The solid section cap itself must NOT be clipped away
      if (child === capMeshRef.current || child === capEdgesRef.current) return;

      const anyObj = child as any;
      if (anyObj.material) {
        const mats = Array.isArray(anyObj.material) ? anyObj.material : [anyObj.material];
        mats.forEach((m: any) => {
          m.clippingPlanes = enableClipping ? [clipPlaneRef.current!] : [];
          m.clipShadows = true;
          m.needsUpdate = true;
        });
      }
    });
  }, [cutProgress, cutAxis, enableClipping, modelType]);

  return (
    <div className={`relative w-full h-full select-none ${className}`}>
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />
    </div>
  );
};
