import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const Hero3DBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch (e) {
      console.warn('WebGL not supported, falling back to static luxury hero background', e);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // Scene setup
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x0b0b0b, 0.035);

    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    // Camera setup - dynamically framed for mobile vertical vs desktop horizontal aspect ratios
    const cameraZ = isMobile ? 18.5 : isTablet ? 16 : 14;
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 80);
    camera.position.set(0, 0, cameraZ);

    // --- 1. PROCEDURAL 3D ARCHITECTURAL RELIEF SURFACE ---
    // Scaled to fill viewport perfectly without clipping on mobile portrait or ultrawide desktop
    const planeWidth = isMobile ? 24 : 34;
    const planeHeight = isMobile ? 34 : 22;
    const gridX = isMobile ? 45 : 85;
    const gridY = isMobile ? 45 : 60;
    const reliefGeometry = new THREE.PlaneGeometry(planeWidth, planeHeight, gridX, gridY);

    const positionAttribute = reliefGeometry.attributes.position;
    const baseZ = new Float32Array(positionAttribute.count);

    // Sculpt natural bas-relief undulations into vertex z-coordinates
    for (let i = 0; i < positionAttribute.count; i++) {
      const x = positionAttribute.getX(i);
      const y = positionAttribute.getY(i);

      // Multi-frequency architectural wave equation (mimicking hand-troweled stucco & 3D fluting)
      const wave1 = Math.sin(x * 0.28 + y * 0.18) * 1.15;
      const wave2 = Math.cos(x * 0.55 - y * 0.32) * 0.65;
      const fineGroove = Math.sin(x * 1.4 + y * 0.7) * 0.22;
      const cornerFalloff = 1 - Math.min((x * x + y * y) / 320, 0.75);

      const z = (wave1 + wave2 + fineGroove) * cornerFalloff;
      positionAttribute.setZ(i, z);
      baseZ[i] = z;
    }
    reliefGeometry.computeVertexNormals();

    // Procedural Gold Vein Canvas Texture for Realistic Specular Highlights
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.fillStyle = '#141210';
      ctx.fillRect(0, 0, 512, 512);

      // Fine stucco granular noise
      for (let i = 0; i < 18000; i++) {
        const nx = Math.random() * 512;
        const ny = Math.random() * 512;
        const radius = Math.random() * 1.2;
        ctx.fillStyle = Math.random() > 0.4 ? 'rgba(201, 162, 75, 0.08)' : 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.arc(nx, ny, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Elegant gold veining threads
      ctx.strokeStyle = 'rgba(201, 162, 75, 0.25)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(0, 180);
      ctx.bezierCurveTo(150, 220, 320, 120, 512, 280);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(229, 195, 120, 0.35)';
      ctx.lineWidth = 1.0;
      ctx.beginPath();
      ctx.moveTo(80, 0);
      ctx.bezierCurveTo(200, 200, 360, 320, 480, 512);
      ctx.stroke();
    }

    const surfaceTexture = new THREE.CanvasTexture(canvas);
    surfaceTexture.colorSpace = THREE.SRGBColorSpace;
    surfaceTexture.wrapS = THREE.RepeatWrapping;
    surfaceTexture.wrapT = THREE.RepeatWrapping;
    surfaceTexture.repeat.set(3, 2);

    // Luxury Dark Bronze-Gold Metallic PBR Material
    const reliefMaterial = new THREE.MeshStandardMaterial({
      map: surfaceTexture,
      color: 0x1a1612,
      roughness: 0.38,
      metalness: 0.62,
      flatShading: false,
    });

    const reliefMesh = new THREE.Mesh(reliefGeometry, reliefMaterial);
    reliefMesh.position.set(0, 0, -2);
    scene.add(reliefMesh);

    // --- 2. FLOATING 3D GOLD DUST PARTICLES ---
    // 120 delicate gold foil particles floating in 3D volume
    const particleCount = 120;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    const particleScales = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      particlePositions[i * 3] = (Math.random() - 0.5) * 26;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 16;
      particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 10 + 2;
      particleScales[i] = Math.random() * 0.8 + 0.3;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));

    // Particle Canvas Texture (Soft glowing gold diamond dot)
    const pCanvas = document.createElement('canvas');
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext('2d');
    if (pCtx) {
      const grad = pCtx.createRadialGradient(32, 32, 0, 32, 32, 32);
      grad.addColorStop(0, 'rgba(255, 241, 202, 1)');
      grad.addColorStop(0.3, 'rgba(201, 162, 75, 0.85)');
      grad.addColorStop(0.7, 'rgba(201, 162, 75, 0.2)');
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      pCtx.fillStyle = grad;
      pCtx.fillRect(0, 0, 64, 64);
    }
    const particleTexture = new THREE.CanvasTexture(pCanvas);

    const particleMaterial = new THREE.PointsMaterial({
      map: particleTexture,
      size: 0.45,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // --- 3. DYNAMIC ARCHITECTURAL LIGHTING RIG ---
    // Warm Ambient
    const ambientLight = new THREE.AmbientLight(0x282015, 0.85);
    scene.add(ambientLight);

    // Interactive Golden Spotlight (Follows mouse cursor with smooth damping)
    const cursorLight = new THREE.PointLight(0xffdf88, 4.2, 32, 1.1);
    cursorLight.position.set(0, 1.5, 5);
    scene.add(cursorLight);

    // Secondary Warm Gold Cove Fill Light (From bottom left)
    const coveLight = new THREE.PointLight(0xc9a24b, 2.4, 28, 1.2);
    coveLight.position.set(-8, -5, 3.5);
    scene.add(coveLight);

    // Subtle Cool Blue-Grey Rim Light (From top right for architectural contrast)
    const rimLight = new THREE.DirectionalLight(0x405565, 0.9);
    rimLight.position.set(10, 8, 4);
    scene.add(rimLight);

    // Mouse Tracking for Interactive 3D Parallax & Lighting Follow
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouse.targetX = (clientX / rect.width - 0.5) * 2;
      mouse.targetY = -(clientY / rect.height - 0.5) * 2;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const rect = container.getBoundingClientRect();
        const clientX = e.touches[0].clientX - rect.left;
        const clientY = e.touches[0].clientY - rect.top;
        mouse.targetX = (clientX / rect.width - 0.5) * 2;
        mouse.targetY = -(clientY / rect.height - 0.5) * 2;
      }
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    // Handle Window Resize
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // --- 4. SMOOTH ANIMATION LOOP ---
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      // Exponential damping for silky smooth mouse reaction
      mouse.x += (mouse.targetX - mouse.x) * (delta * 2.8);
      mouse.y += (mouse.targetY - mouse.y) * (delta * 2.8);

      // Interactive 3D Camera Parallax
      camera.position.x = mouse.x * 1.6;
      camera.position.y = mouse.y * 1.2;
      camera.lookAt(0, 0, -1);

      // Dynamic Gold Light follow
      cursorLight.position.x = mouse.x * 8 + Math.sin(time * 0.8) * 1.2;
      cursorLight.position.y = mouse.y * 6 + Math.cos(time * 0.6) * 1.0;
      cursorLight.position.z = 4.5 + Math.sin(time * 1.2) * 0.5;

      // Subtle breathing motion on 3D sculpted wall vertices
      const pos = reliefGeometry.attributes.position;
      const breathingWave = Math.sin(time * 0.7) * 0.12;
      for (let i = 0; i < pos.count; i += 4) {
        const x = pos.getX(i);
        const y = pos.getY(i);
        const dynamicZ = baseZ[i] + Math.sin(time * 0.9 + x * 0.3 + y * 0.2) * 0.14 + breathingWave;
        pos.setZ(i, dynamicZ);
      }
      pos.needsUpdate = true;

      // Floating gold dust drift
      particles.rotation.y = time * 0.02 + mouse.x * 0.1;
      particles.rotation.x = time * 0.015 - mouse.y * 0.08;

      renderer.render(scene, camera);
    };

    animate();

    // Clean up WebGL resources on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('resize', handleResize);

      reliefGeometry.dispose();
      reliefMaterial.dispose();
      surfaceTexture.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      particleTexture.dispose();
      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-hidden"
      style={{ opacity: 0.88 }}
    />
  );
};
