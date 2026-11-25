'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

interface InteractiveRobot3DProps {
  className?: string;
}

/**
 * Builds a dark obsidian studio environment map with discrete softbox panels
 * so glossy black armor stays deep obsidian instead of washing out to silver.
 */
function createDarkObsidianEnv(renderer: THREE.WebGLRenderer): THREE.Texture {
  const pmrem = new THREE.PMREMGenerator(renderer);
  pmrem.compileEquirectangularShader();

  const envScene = new THREE.Scene();
  envScene.background = new THREE.Color(0x040508);

  const panelGeo = new THREE.PlaneGeometry(1, 1);
  const mats: THREE.Material[] = [];

  const addPanel = (
    color: number,
    intensity: number,
    scale: [number, number],
    pos: [number, number, number],
    lookAt: [number, number, number]
  ) => {
    const mat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(color).multiplyScalar(intensity),
      side: THREE.DoubleSide,
    });
    mats.push(mat);
    const mesh = new THREE.Mesh(panelGeo, mat);
    mesh.scale.set(scale[0], scale[1], 1);
    mesh.position.set(...pos);
    mesh.lookAt(...lookAt);
    envScene.add(mesh);
  };

  // Overhead studio softbox (creates crisp top-chest & helmet specular highlight)
  addPanel(0xf8fafc, 3.2, [3.6, 1.8], [0.4, 4.2, 1.6], [0, 1.2, 0]);
  // Left cool rim strip (traces silhouette cleanly)
  addPanel(0xc7d2fe, 2.2, [1.0, 3.8], [-3.8, 1.8, -1.2], [0, 1.2, 0]);
  // Right subtle indigo accent strip
  addPanel(0x818cf8, 1.5, [0.9, 3.2], [3.8, 1.6, -1.4], [0, 1.2, 0]);
  // Subtle front-low fill for visor horizon gradient
  addPanel(0x94a3b8, 0.75, [4.5, 1.2], [0, -1.8, 3.2], [0, 1.2, 0]);

  const rt = pmrem.fromScene(envScene, 0.045);

  panelGeo.dispose();
  mats.forEach((m) => m.dispose());
  pmrem.dispose();

  return rt.texture;
}

export function InteractiveRobot3D({ className = '' }: InteractiveRobot3DProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isSoftwareGl = (() => {
      try {
        const probeCanvas = document.createElement('canvas');
        const gl = probeCanvas.getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      container.textContent = '3D WebGL Viewport';
      return;
    }

    const width = container.clientWidth || 520;
    const height = container.clientHeight || 500;
    // Cap DPR at 1.5 for crisp visuals with much higher framerate on HiDPI displays
    const dpr = isSoftwareGl ? 1 : Math.min(window.devicePixelRatio || 1, 1.5);

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setPixelRatio(dpr);
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = false;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.pointerEvents = 'none';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const darkEnvTexture = createDarkObsidianEnv(renderer);
    scene.environment = darkEnvTexture;

    const camera = new THREE.PerspectiveCamera(29, width / height, 0.08, 45);
    camera.position.set(0, 1.38, 2.05);
    camera.lookAt(0, 1.32, 0);

    // Dark Studio Lighting (deep obsidian contrast + subtle indigo edge rim)
    const keyLight = new THREE.DirectionalLight(0xf8fafc, 1.9);
    keyLight.position.set(2.2, 4.0, 2.8);
    scene.add(keyLight);

    const hemiFill = new THREE.HemisphereLight(0x94a3b8, 0x050608, 0.32);
    scene.add(hemiFill);

    const rimLightLeft = new THREE.DirectionalLight(0xc7d2fe, 1.65);
    rimLightLeft.position.set(-2.6, 2.5, -2.5);
    scene.add(rimLightLeft);

    const accentRimRight = new THREE.DirectionalLight(0x6366f1, 1.1);
    accentRimRight.position.set(2.6, 1.6, -2.2);
    scene.add(accentRimRight);

    let loadedRoot: THREE.Object3D | null = null;
    let headObj: THREE.Object3D | null = null;
    let torsoObj: THREE.Object3D | null = null;
    let baseTorsoY = 0;

    const loader = new GLTFLoader();
    loader.load(
      '/models/obsidian_humanoid_robot.glb',
      (gltf) => {
        if (disposed) return;
        loadedRoot = gltf.scene;

        // Deepen armor material response slightly to match dark studio look
        loadedRoot.traverse((obj) => {
          if (obj instanceof THREE.Mesh && obj.material instanceof THREE.MeshStandardMaterial) {
            if (obj.name.toLowerCase().includes('visor')) {
              obj.material.envMapIntensity = 1.65;
            } else {
              obj.material.envMapIntensity = 1.05;
            }
          }
        });

        const box = new THREE.Box3().setFromObject(loadedRoot);
        const size = new THREE.Vector3();
        const center = new THREE.Vector3();
        box.getSize(size);
        box.getCenter(center);

        loadedRoot.position.x -= center.x;
        loadedRoot.position.z -= center.z;

        // Bold, larger half-body framing with safe headroom above helmet (never clipped)
        const focusY = box.min.y + size.y * 0.725;
        camera.position.set(0, focusY + size.y * 0.025, size.y * 1.12);
        camera.lookAt(0, focusY, 0);

        headObj = loadedRoot.getObjectByName('Head') || null;
        torsoObj = loadedRoot.getObjectByName('Torso') || null;
        if (torsoObj) {
          baseTorsoY = torsoObj.position.y;
        }

        scene.add(loadedRoot);
      },
      undefined,
      (err) => {
        console.error('Failed to load GLB robot:', err);
        if (!disposed && container) {
          container.textContent = '3D Model Unavailable';
        }
      }
    );

    // Mouse / Pointer tracking (locked forward, zero orbit)
    const pointer = { x: 0, y: 0, proximity: 0 };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.4;
      pointer.x = THREE.MathUtils.clamp((e.clientX - centerX) / (window.innerWidth * 0.42), -1, 1);
      pointer.y = THREE.MathUtils.clamp((e.clientY - centerY) / (window.innerHeight * 0.42), -1, 1);

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      pointer.proximity = THREE.MathUtils.clamp(1 - dist / (window.innerWidth * 0.55), 0, 1);
    };

    const handlePointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
      pointer.proximity = 0;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);

    let isVisible = true;
    let rafId = 0;
    let disposed = false;

    const ro = new ResizeObserver(() => {
      if (disposed || !container) return;
      const w = container.clientWidth || 520;
      const h = container.clientHeight || 500;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    });
    ro.observe(container);

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !rafId && !disposed) {
        rafId = requestAnimationFrame(animate);
      }
    });
    io.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafId);
        rafId = 0;
      } else if (isVisible && !rafId && !disposed) {
        rafId = requestAnimationFrame(animate);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Use performance.now() directly (zero deprecation warnings like THREE.Clock)
    const startTimeMs = performance.now();
    let smoothedProximity = 0;

    const animate = () => {
      if (disposed || !isVisible) {
        rafId = 0;
        return;
      }

      const t = (performance.now() - startTimeMs) * 0.001;

      // Smoothly track cursor with Head & subtle Torso lean
      if (headObj) {
        const targetHeadYaw = pointer.x * 0.58;
        const targetHeadPitch = pointer.y * 0.28;
        headObj.rotation.y = THREE.MathUtils.lerp(headObj.rotation.y, targetHeadYaw, 0.09);
        headObj.rotation.x = THREE.MathUtils.lerp(headObj.rotation.x, targetHeadPitch, 0.09);
      }

      if (torsoObj) {
        const targetTorsoYaw = pointer.x * 0.2;
        const targetTorsoPitch = pointer.y * 0.09;
        torsoObj.rotation.y = THREE.MathUtils.lerp(torsoObj.rotation.y, targetTorsoYaw, 0.06);
        torsoObj.rotation.x = THREE.MathUtils.lerp(torsoObj.rotation.x, targetTorsoPitch, 0.06);
        torsoObj.position.y = baseTorsoY + Math.sin(t * 1.7) * 0.008;
      }

      // Subtle living rim-light pulse + reactive indigo aura when cursor approaches
      smoothedProximity = THREE.MathUtils.lerp(smoothedProximity, pointer.proximity, 0.05);
      accentRimRight.intensity = 1.0 + Math.sin(t * 1.4) * 0.22 + smoothedProximity * 0.85;
      rimLightLeft.intensity = 1.55 + Math.cos(t * 1.1) * 0.15 + smoothedProximity * 0.35;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    return () => {
      disposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerleave', handlePointerLeave);

      if (loadedRoot) {
        loadedRoot.traverse((obj) => {
          if (obj instanceof THREE.Mesh) {
            obj.geometry?.dispose();
            const mats = Array.isArray(obj.material) ? obj.material : [obj.material];
            mats.forEach((m) => m?.dispose());
          }
        });
      }

      darkEnvTexture.dispose();
      renderer.dispose();

      if (renderer.domElement.parentElement === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-label="Interactive 3D Humanoid Robot"
      style={{
        maskImage: 'linear-gradient(to bottom, black 56%, rgba(0, 0, 0, 0.65) 80%, transparent 98%)',
        WebkitMaskImage:
          'linear-gradient(to bottom, black 56%, rgba(0, 0, 0, 0.65) 80%, transparent 98%)',
      }}
      className={`relative w-full h-full flex items-center justify-center text-xs font-mono text-muted select-none pointer-events-none ${className}`}
    />
  );
}
