'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface InteractiveRobot3DProps {
  className?: string;
}

interface RobotClip {
  text: string;
  src: string;
  dur: number;
  curve: number[];
}

const ROBOT_CLIPS: Record<'id' | 'en', RobotClip[]> = {
  id: [
    {
      text: 'Halo! Aku unit 3D interaktif milik Dhitya. Senang bertemu denganmu!',
      src: '/audio/robot-id-1.wav',
      dur: 5.04,
      curve: [0, 0.096, 0.188, 0.192, 0.192, 0.217, 0.305, 0.386, 0.455, 0.495, 0.575, 0.615, 0.636, 0.675, 0.714, 0.763, 0.796, 0.825, 0.825, 0.825, 0.864, 0.913, 0.949, 0.989, 1],
    },
    {
      text: 'Coba gerakkan kursor. Kepalaku otomatis mengikuti arah pandanganmu.',
      src: '/audio/robot-id-2.wav',
      dur: 4.4,
      curve: [0, 0.084, 0.19, 0.256, 0.314, 0.381, 0.388, 0.388, 0.388, 0.426, 0.471, 0.509, 0.562, 0.596, 0.639, 0.683, 0.729, 0.751, 0.772, 0.814, 0.856, 0.878, 0.947, 0.986, 1],
    },
    {
      text: 'Dhitya menggabungkan Blender 3D, Three.js, dan Next.js menjadi pengalaman web yang nyata.',
      src: '/audio/robot-id-3.wav',
      dur: 6.3,
      curve: [0, 0.054, 0.161, 0.237, 0.295, 0.36, 0.384, 0.435, 0.484, 0.485, 0.509, 0.565, 0.588, 0.611, 0.639, 0.662, 0.702, 0.703, 0.793, 0.83, 0.885, 0.941, 0.973, 0.994, 1],
    },
    {
      text: 'Scroll ke bawah untuk melihat enam karya Blender Showcase dan proyek pilihannya!',
      src: '/audio/robot-id-4.wav',
      dur: 4.54,
      curve: [0, 0.01, 0.102, 0.163, 0.246, 0.26, 0.293, 0.336, 0.385, 0.426, 0.483, 0.511, 0.582, 0.629, 0.666, 0.693, 0.751, 0.772, 0.772, 0.826, 0.85, 0.942, 0.961, 0.992, 1],
    },
    {
      text: 'Klik aku lagi kapan saja kalau mau mengobrol. Sampai jumpa di bagian bawah!',
      src: '/audio/robot-id-5.wav',
      dur: 3.88,
      curve: [0, 0.048, 0.08, 0.189, 0.246, 0.322, 0.413, 0.471, 0.503, 0.572, 0.622, 0.664, 0.684, 0.687, 0.687, 0.687, 0.692, 0.733, 0.773, 0.824, 0.892, 0.925, 0.951, 0.982, 1],
    },
  ],
  en: [
    {
      text: "Hey there! I'm Dhitya's interactive 3D unit. Nice to meet you!",
      src: '/audio/robot-en-1.wav',
      dur: 4.56,
      curve: [0, 0.062, 0.158, 0.167, 0.167, 0.183, 0.268, 0.318, 0.347, 0.434, 0.474, 0.522, 0.61, 0.641, 0.678, 0.708, 0.76, 0.808, 0.838, 0.841, 0.841, 0.885, 0.922, 0.969, 1],
    },
    {
      text: 'Move your cursor around. My head tracks your movement in real time.',
      src: '/audio/robot-en-2.wav',
      dur: 3.86,
      curve: [0, 0.003, 0.022, 0.104, 0.15, 0.226, 0.289, 0.359, 0.384, 0.386, 0.386, 0.421, 0.486, 0.537, 0.581, 0.617, 0.671, 0.763, 0.798, 0.809, 0.834, 0.876, 0.916, 0.984, 1],
    },
    {
      text: 'Dhitya blends Blender 3D, Three.js, and Next.js into production web experiences.',
      src: '/audio/robot-en-3.wav',
      dur: 6.76,
      curve: [0, 0.003, 0.089, 0.153, 0.193, 0.264, 0.311, 0.36, 0.36, 0.41, 0.511, 0.581, 0.593, 0.657, 0.698, 0.746, 0.778, 0.806, 0.818, 0.863, 0.9, 0.946, 0.966, 0.984, 1],
    },
    {
      text: 'Scroll down to explore the six featured Blender renders and case studies!',
      src: '/audio/robot-en-4.wav',
      dur: 4.06,
      curve: [0, 0.003, 0.006, 0.104, 0.197, 0.276, 0.313, 0.323, 0.413, 0.449, 0.478, 0.492, 0.529, 0.553, 0.587, 0.641, 0.706, 0.773, 0.828, 0.886, 0.909, 0.947, 0.974, 0.988, 1],
    },
    {
      text: 'Click me anytime to chat. Enjoy exploring the portfolio!',
      src: '/audio/robot-en-5.wav',
      dur: 3.2,
      curve: [0, 0.051, 0.063, 0.145, 0.217, 0.242, 0.317, 0.343, 0.39, 0.414, 0.414, 0.414, 0.414, 0.417, 0.451, 0.556, 0.604, 0.616, 0.72, 0.781, 0.827, 0.857, 0.922, 0.978, 1],
    },
  ],
};

function sampleCurve(curve: number[], progress: number): number {
  const clamped = Math.max(0, Math.min(1, progress));
  const scaled = clamped * (curve.length - 1);
  const lo = Math.floor(scaled);
  const hi = Math.min(curve.length - 1, lo + 1);
  const frac = scaled - lo;
  return curve[lo] + (curve[hi] - curve[lo]) * frac;
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
  const { language } = useLanguage();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const isTalkingRef = useRef(false);
  const talkStartMsRef = useRef(0);

  const [bubbleOpen, setBubbleOpen] = useState(false);
  const [isTalking, setIsTalking] = useState(false);
  const [isHoveringRobot, setIsHoveringRobot] = useState(false);
  const [fullText, setFullText] = useState('');
  const [typedText, setTypedText] = useState('');
  const lineIndexRef = useRef(0);
  const activeClipIdxRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const typeTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const preloadedAudioRef = useRef<Map<string, HTMLAudioElement>>(new Map());
  const syncRafRef = useRef<number>(0);

  // Preload audio clips for the active language so first click has 0ms latency
  useEffect(() => {
    const clips = language === 'id' ? ROBOT_CLIPS.id : ROBOT_CLIPS.en;
    clips.forEach((clip) => {
      if (!preloadedAudioRef.current.has(clip.src)) {
        const a = new Audio(clip.src);
        a.preload = 'auto';
        a.load();
        preloadedAudioRef.current.set(clip.src, a);
      }
    });
  }, [language]);

  const stopSpeechPlayback = useCallback(() => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
    if (typeTimerRef.current) {
      clearInterval(typeTimerRef.current);
      typeTimerRef.current = null;
    }
    if (syncRafRef.current) {
      cancelAnimationFrame(syncRafRef.current);
      syncRafRef.current = 0;
    }
    if (audioRef.current) {
      audioRef.current.onended = null;
      audioRef.current.onerror = null;
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      audioRef.current = null;
    }
  }, []);

  const triggerSpeak = useCallback(() => {
    const clips = language === 'id' ? ROBOT_CLIPS.id : ROBOT_CLIPS.en;
    const clipIdx = lineIndexRef.current % clips.length;
    const clip = clips[clipIdx];
    activeClipIdxRef.current = clipIdx;
    lineIndexRef.current += 1;

    stopSpeechPlayback();

    setBubbleOpen(true);
    setFullText(clip.text);
    setTypedText('');
    setIsTalking(true);
    isTalkingRef.current = true;
    talkStartMsRef.current = performance.now();

    const finishSpeech = () => {
      if (syncRafRef.current) {
        cancelAnimationFrame(syncRafRef.current);
        syncRafRef.current = 0;
      }
      setTypedText(clip.text);
      setIsTalking(false);
      isTalkingRef.current = false;
      hideTimerRef.current = setTimeout(() => {
        setBubbleOpen(false);
      }, 1000);
    };

    const audio = preloadedAudioRef.current.get(clip.src) ?? new Audio(clip.src);
    audio.currentTime = 0;
    audioRef.current = audio;

    const syncFrame = () => {
      if (!audioRef.current || audioRef.current !== audio) return;
      const totalDur =
        Number.isFinite(audio.duration) && audio.duration > 0 ? audio.duration : clip.dur;
      // 140ms lead compensation eliminates perceptual lag on initial words & trailing fade
      const progress = Math.min(
        1,
        (audio.currentTime + 0.14) / Math.max(0.1, totalDur - 0.18)
      );
      const curved = sampleCurve(clip.curve, progress);
      const charCount = Math.min(clip.text.length, Math.ceil(curved * clip.text.length));
      setTypedText(clip.text.slice(0, charCount));

      if (!audio.ended && !audio.paused) {
        syncRafRef.current = requestAnimationFrame(syncFrame);
      }
    };

    audio.onended = finishSpeech;
    audio.onerror = () => {
      // Fallback timer sync if audio playback is blocked
      let charIdx = 0;
      const stepMs = Math.max(16, Math.floor((clip.dur * 1000) / clip.text.length));
      typeTimerRef.current = setInterval(() => {
        charIdx += 1;
        setTypedText(clip.text.slice(0, charIdx));
        if (charIdx >= clip.text.length) {
          if (typeTimerRef.current) {
            clearInterval(typeTimerRef.current);
            typeTimerRef.current = null;
          }
          finishSpeech();
        }
      }, stepMs);
    };

    audio
      .play()
      .then(() => {
        syncRafRef.current = requestAnimationFrame(syncFrame);
      })
      .catch(() => {
        audio.onerror?.(new Event('error'));
      });
  }, [language, stopSpeechPlayback]);

  const triggerSpeakRef = useRef(triggerSpeak);
  useEffect(() => {
    triggerSpeakRef.current = triggerSpeak;
  }, [triggerSpeak]);

  useEffect(() => {
    return () => {
      stopSpeechPlayback();
    };
  }, [stopSpeechPlayback]);

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
    let visorMat: THREE.MeshStandardMaterial | null = null;
    let baseTorsoY = 0;

    // Rigged arm, hand, and finger bones
    let shoulderL: THREE.Object3D | null = null;
    let upperArmL: THREE.Object3D | null = null;
    let forearmL: THREE.Object3D | null = null;
    let handL: THREE.Object3D | null = null;
    let shoulderR: THREE.Object3D | null = null;
    let upperArmR: THREE.Object3D | null = null;
    let forearmR: THREE.Object3D | null = null;
    let handR: THREE.Object3D | null = null;
    let fingersL: THREE.Object3D[] = [];
    let fingersR: THREE.Object3D[] = [];

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
              visorMat = obj.material;
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

        // Balanced half-body framing with generous horizontal room for arm/hand gestures
        const focusY = box.min.y + size.y * 0.725;
        camera.position.set(0, focusY + size.y * 0.02, size.y * 1.24);
        camera.lookAt(0, focusY, 0);

        headObj = loadedRoot.getObjectByName('Head') || null;
        torsoObj = loadedRoot.getObjectByName('Torso') || null;
        if (torsoObj) {
          baseTorsoY = torsoObj.position.y;
        }

        shoulderL = loadedRoot.getObjectByName('Shoulder_L') || null;
        upperArmL = loadedRoot.getObjectByName('UpperArm_L') || null;
        forearmL = loadedRoot.getObjectByName('Forearm_L') || null;
        handL = loadedRoot.getObjectByName('Hand_L') || null;

        shoulderR = loadedRoot.getObjectByName('Shoulder_R') || null;
        upperArmR = loadedRoot.getObjectByName('UpperArm_R') || null;
        forearmR = loadedRoot.getObjectByName('Forearm_R') || null;
        handR = loadedRoot.getObjectByName('Hand_R') || null;

        const fingerNamesL = [
          'Index_01_L', 'Index_02_L', 'Index_03_L',
          'Middle_01_L', 'Middle_02_L', 'Middle_03_L',
          'Ring_01_L', 'Ring_02_L', 'Ring_03_L',
          'Pinky_01_L', 'Pinky_02_L', 'Pinky_03_L',
        ];
        const fingerNamesR = [
          'Index_01_R', 'Index_02_R', 'Index_03_R',
          'Middle_01_R', 'Middle_02_R', 'Middle_03_R',
          'Ring_01_R', 'Ring_02_R', 'Ring_03_R',
          'Pinky_01_R', 'Pinky_02_R', 'Pinky_03_R',
        ];
        fingersL = fingerNamesL
          .map((n) => loadedRoot?.getObjectByName(n))
          .filter((o): o is THREE.Object3D => Boolean(o));
        fingersR = fingerNamesR
          .map((n) => loadedRoot?.getObjectByName(n))
          .filter((o): o is THREE.Object3D => Boolean(o));

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

    // Mouse / Pointer tracking + exact 3D Raycaster hitbox on robot mesh
    const pointer = { x: 0, y: 0, proximity: 0 };
    const raycaster = new THREE.Raycaster();
    const ndcPointer = new THREE.Vector2();

    const hitTestRobot = (clientX: number, clientY: number): boolean => {
      if (!loadedRoot) return false;
      const rect = container.getBoundingClientRect();
      if (
        clientX < rect.left ||
        clientX > rect.right ||
        clientY < rect.top ||
        clientY > rect.bottom
      ) {
        return false;
      }
      ndcPointer.x = ((clientX - rect.left) / rect.width) * 2 - 1;
      ndcPointer.y = -((clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(ndcPointer, camera);
      return raycaster.intersectObject(loadedRoot, true).length > 0;
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width * 0.5;
      const centerY = rect.top + rect.height * 0.4;
      pointer.x = THREE.MathUtils.clamp((e.clientX - centerX) / (window.innerWidth * 0.42), -1, 1);
      pointer.y = THREE.MathUtils.clamp((e.clientY - centerY) / (window.innerHeight * 0.42), -1, 1);

      const dist = Math.hypot(e.clientX - centerX, e.clientY - centerY);
      pointer.proximity = THREE.MathUtils.clamp(1 - dist / (window.innerWidth * 0.55), 0, 1);

      setIsHoveringRobot(hitTestRobot(e.clientX, e.clientY));
    };

    const handleContainerClick = (e: MouseEvent) => {
      if (hitTestRobot(e.clientX, e.clientY)) {
        triggerSpeakRef.current();
      }
    };

    const handlePointerLeave = () => {
      pointer.x = 0;
      pointer.y = 0;
      pointer.proximity = 0;
      setIsHoveringRobot(false);
    };

    const wrapperEl = container.parentElement;
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('pointerleave', handlePointerLeave);
    wrapperEl?.addEventListener('click', handleContainerClick);

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
    let lastFrameMs = startTimeMs;
    let smoothedProximity = 0;
    let talkBlend = 0;

    const animate = () => {
      if (disposed || !isVisible) {
        rafId = 0;
        return;
      }

      const nowMs = performance.now();
      const dt = Math.min(0.05, (nowMs - lastFrameMs) * 0.001);
      lastFrameMs = nowMs;
      const t = (nowMs - startTimeMs) * 0.001;

      // Smooth 3D Animator envelope: ~0.45s attack, ~1.25s graceful ease-out back to idle
      const talking = isTalkingRef.current;
      const targetBlend = talking ? 1 : 0;
      const blendRate = talking ? dt / 0.45 : dt / 1.25;
      if (talkBlend < targetBlend) {
        talkBlend = Math.min(1, talkBlend + blendRate);
      } else if (talkBlend > targetBlend) {
        talkBlend = Math.max(0, talkBlend - blendRate);
      }
      // Smoothstep S-curve for natural acceleration/deceleration (zero abrupt snap)
      const easeBlend = talkBlend * talkBlend * (3 - 2 * talkBlend);
      const talkElapsed = talkBlend > 0.001 ? (nowMs - talkStartMsRef.current) * 0.001 : 0;

      if (headObj) {
        // Single smooth greeting nod during the first 0.7s of speaking
        const nodPhase = talking && talkElapsed < 0.7 ? Math.sin((talkElapsed / 0.7) * Math.PI) : 0;
        const talkPitch = nodPhase * 0.12 + Math.sin(talkElapsed * 1.7) * 0.015 * easeBlend;
        const talkRoll = (0.05 + Math.sin(talkElapsed * 1.25) * 0.014) * easeBlend;
        const talkYaw = 0.065 * easeBlend;

        const targetHeadYaw = pointer.x * 0.58 + talkYaw;
        const targetHeadPitch = pointer.y * 0.28 + talkPitch;

        headObj.rotation.y = THREE.MathUtils.lerp(headObj.rotation.y, targetHeadYaw, 0.075);
        headObj.rotation.x = THREE.MathUtils.lerp(headObj.rotation.x, targetHeadPitch, 0.075);
        headObj.rotation.z = THREE.MathUtils.lerp(headObj.rotation.z, talkRoll, 0.06);
      }

      if (torsoObj) {
        const talkTorsoPitch = 0.032 * easeBlend;
        const talkTorsoYaw = (0.022 + Math.sin(talkElapsed * 1.1) * 0.012) * easeBlend;

        const targetTorsoYaw = pointer.x * 0.2 + talkTorsoYaw;
        const targetTorsoPitch = pointer.y * 0.09 + talkTorsoPitch;

        torsoObj.rotation.y = THREE.MathUtils.lerp(torsoObj.rotation.y, targetTorsoYaw, 0.05);
        torsoObj.rotation.x = THREE.MathUtils.lerp(torsoObj.rotation.x, targetTorsoPitch, 0.05);
        torsoObj.rotation.z = THREE.MathUtils.lerp(torsoObj.rotation.z, 0, 0.05);
        torsoObj.position.y = baseTorsoY + Math.sin(t * 1.55) * 0.007;
      }

      // Subtle living rim-light pulse + calm indigo visor glow while speaking
      smoothedProximity = THREE.MathUtils.lerp(smoothedProximity, pointer.proximity, 0.05);
      const talkGlow = (0.45 + Math.sin(t * 4.5) * 0.15) * easeBlend;
      accentRimRight.intensity = 1.0 + Math.sin(t * 1.4) * 0.22 + smoothedProximity * 0.85 + talkGlow;
      rimLightLeft.intensity = 1.55 + Math.cos(t * 1.1) * 0.15 + smoothedProximity * 0.35 + talkGlow * 0.3;

      if (visorMat) {
        visorMat.envMapIntensity = THREE.MathUtils.lerp(
          visorMat.envMapIntensity,
          1.65 + easeBlend * (0.6 + Math.sin(t * 5.0) * 0.2),
          0.07
        );
      }

      // Natural Idle Pose (relaxed arms, slight inward elbow angle, organic breathing)
      const idleUpLX = -0.05 + Math.sin(t * 1.35) * 0.022;
      const idleUpLZ = 0.075;
      const idleUpLY = 0.04;
      const idleForeLX = -0.17 + Math.sin(t * 1.35 - 0.5) * 0.02;
      const idleHandLY = 0.08;
      const idleFingerL = 0.28 + Math.sin(t * 1.25) * 0.035;

      const idleUpRX = -0.05 + Math.sin(t * 1.35 + 0.45) * 0.022;
      const idleUpRZ = -0.075;
      const idleUpRY = -0.04;
      const idleForeRX = -0.17 + Math.sin(t * 1.35 - 0.1) * 0.02;
      const idleHandRY = -0.08;
      const idleFingerR = 0.28 + Math.sin(t * 1.25 + 0.3) * 0.035;

      // Active Speaking Gesture Pose (smoothly blended by easeBlend so return is never abrupt)
      const clipIdx = activeClipIdxRef.current;
      const wave = Math.sin(talkElapsed * 2.2);
      const waveAlt = Math.cos(talkElapsed * 1.9);

      let spUpLX = idleUpLX;
      let spUpLZ = idleUpLZ;
      let spUpLY = idleUpLY;
      let spForeLX = idleForeLX;
      let spHandLX = 0;
      let spHandLY = idleHandLY;
      const spHandLZ = 0;

      let spUpRX = idleUpRX;
      let spUpRZ = idleUpRZ;
      let spUpRY = idleUpRY;
      let spForeRX = idleForeRX;
      let spHandRX = 0;
      let spHandRY = idleHandRY;
      let spHandRZ = 0;

      let spFingerL = 0.16;
      let spFingerR = 0.16;

      if (easeBlend > 0.001) {
        if (clipIdx === 0) {
          // Friendly Welcome: Right arm lifts smoothly in front of chest/shoulder (never clipped at left edge)
          const greetWave = Math.max(0, 1 - Math.max(0, talkElapsed - 2.1) / 1.1);
          spUpRX = -0.44 - greetWave * 0.16 + wave * 0.04;
          spUpRZ = -0.14 - greetWave * 0.06;
          spUpRY = 0.08;
          spForeRX = -0.88 - greetWave * 0.24;
          spHandRY = -0.28;
          spHandRX = -0.08;
          spHandRZ = greetWave * Math.sin(talkElapsed * 4.6) * 0.14;
          spFingerR = 0.09;

          spUpLX = -0.2 + waveAlt * 0.035;
          spUpLZ = 0.1;
          spUpLY = -0.04;
          spForeLX = -0.44 + waveAlt * 0.05;
          spHandLY = 0.24;
          spFingerL = 0.18;
        } else if (clipIdx === 1) {
          // Attentive Two-Hand Conversational Framing (natural inward forearm angle)
          spUpLX = -0.32 + wave * 0.06;
          spUpLZ = 0.14;
          spUpLY = 0.12;
          spForeLX = -0.78 + waveAlt * 0.08;
          spHandLY = 0.38;
          spHandLX = -0.08;
          spFingerL = 0.13;

          spUpRX = -0.32 - wave * 0.06;
          spUpRZ = -0.14;
          spUpRY = -0.12;
          spForeRX = -0.78 - waveAlt * 0.08;
          spHandRY = -0.38;
          spHandRX = -0.08;
          spFingerR = 0.13;
        } else if (clipIdx === 2) {
          // Builder Emphasis: Alternating Left & Right explanatory cadence
          const phase = Math.sin(talkElapsed * 1.8);
          const lWeight = Math.max(0, phase);
          const rWeight = Math.max(0, -phase);

          spUpLX = -0.34 - lWeight * 0.15;
          spUpLZ = 0.13;
          spUpLY = 0.1;
          spForeLX = -0.82 - lWeight * 0.16;
          spHandLY = 0.34;
          spHandLX = -0.06;
          spFingerL = 0.11 + (1 - lWeight) * 0.1;

          spUpRX = -0.34 - rWeight * 0.15;
          spUpRZ = -0.13;
          spUpRY = -0.1;
          spForeRX = -0.82 - rWeight * 0.16;
          spHandRY = -0.34;
          spHandRX = -0.06;
          spFingerR = 0.11 + (1 - rWeight) * 0.1;
        } else if (clipIdx === 3) {
          // Invitational Downward Gesture ("Scroll down to explore...")
          spUpLX = -0.24 + wave * 0.045;
          spUpLZ = 0.13;
          spUpLY = 0.08;
          spForeLX = -0.48 + wave * 0.07;
          spHandLX = 0.2;
          spHandLY = 0.26;
          spFingerL = 0.12;

          spUpRX = -0.24 + wave * 0.045;
          spUpRZ = -0.13;
          spUpRY = -0.08;
          spForeRX = -0.48 + wave * 0.07;
          spHandRX = 0.2;
          spHandRY = -0.26;
          spFingerR = 0.12;
        } else {
          // Warm Closing Gesture
          spUpRX = -0.38 + wave * 0.05;
          spUpRZ = -0.16;
          spUpRY = -0.1;
          spForeRX = -0.82 + waveAlt * 0.07;
          spHandRY = -0.32;
          spFingerR = 0.12;

          spUpLX = -0.16 + waveAlt * 0.035;
          spUpLZ = 0.09;
          spUpLY = 0.06;
          spForeLX = -0.34;
          spFingerL = 0.2;
        }
      }

      // Blend idle <-> speaking via smoothstep easeBlend, with layered follow-through lag
      const tUpLX = THREE.MathUtils.lerp(idleUpLX, spUpLX, easeBlend);
      const tUpLZ = THREE.MathUtils.lerp(idleUpLZ, spUpLZ, easeBlend);
      const tUpLY = THREE.MathUtils.lerp(idleUpLY, spUpLY, easeBlend);
      const tForeLX = THREE.MathUtils.lerp(idleForeLX, spForeLX, easeBlend);
      const tHandLX = THREE.MathUtils.lerp(0, spHandLX, easeBlend);
      const tHandLY = THREE.MathUtils.lerp(idleHandLY, spHandLY, easeBlend);
      const tHandLZ = THREE.MathUtils.lerp(0, spHandLZ, easeBlend);

      const tUpRX = THREE.MathUtils.lerp(idleUpRX, spUpRX, easeBlend);
      const tUpRZ = THREE.MathUtils.lerp(idleUpRZ, spUpRZ, easeBlend);
      const tUpRY = THREE.MathUtils.lerp(idleUpRY, spUpRY, easeBlend);
      const tForeRX = THREE.MathUtils.lerp(idleForeRX, spForeRX, easeBlend);
      const tHandRX = THREE.MathUtils.lerp(0, spHandRX, easeBlend);
      const tHandRY = THREE.MathUtils.lerp(idleHandRY, spHandRY, easeBlend);
      const tHandRZ = THREE.MathUtils.lerp(0, spHandRZ, easeBlend);

      const tFingerCurlL = THREE.MathUtils.lerp(idleFingerL, spFingerL, easeBlend);
      const tFingerCurlR = THREE.MathUtils.lerp(idleFingerR, spFingerR, easeBlend);

      // Overlapping action: Shoulder/UpperArm leads -> Forearm follows -> Hand & Fingers settle last
      const upLerp = talking ? 0.075 : 0.038;
      const foreLerp = talking ? 0.068 : 0.032;
      const handLerp = talking ? 0.062 : 0.026;

      if (shoulderL) {
        shoulderL.rotation.z = THREE.MathUtils.lerp(shoulderL.rotation.z, 0.015 + 0.028 * easeBlend, upLerp);
      }
      if (shoulderR) {
        shoulderR.rotation.z = THREE.MathUtils.lerp(shoulderR.rotation.z, -0.015 - 0.028 * easeBlend, upLerp);
      }
      if (upperArmL) {
        upperArmL.rotation.x = THREE.MathUtils.lerp(upperArmL.rotation.x, tUpLX, upLerp);
        upperArmL.rotation.y = THREE.MathUtils.lerp(upperArmL.rotation.y, tUpLY, upLerp);
        upperArmL.rotation.z = THREE.MathUtils.lerp(upperArmL.rotation.z, tUpLZ, upLerp);
      }
      if (forearmL) {
        forearmL.rotation.x = THREE.MathUtils.lerp(forearmL.rotation.x, tForeLX, foreLerp);
      }
      if (handL) {
        handL.rotation.x = THREE.MathUtils.lerp(handL.rotation.x, tHandLX, handLerp);
        handL.rotation.y = THREE.MathUtils.lerp(handL.rotation.y, tHandLY, handLerp);
        handL.rotation.z = THREE.MathUtils.lerp(handL.rotation.z, tHandLZ, handLerp);
      }

      if (upperArmR) {
        upperArmR.rotation.x = THREE.MathUtils.lerp(upperArmR.rotation.x, tUpRX, upLerp);
        upperArmR.rotation.y = THREE.MathUtils.lerp(upperArmR.rotation.y, tUpRY, upLerp);
        upperArmR.rotation.z = THREE.MathUtils.lerp(upperArmR.rotation.z, tUpRZ, upLerp);
      }
      if (forearmR) {
        forearmR.rotation.x = THREE.MathUtils.lerp(forearmR.rotation.x, tForeRX, foreLerp);
      }
      if (handR) {
        handR.rotation.x = THREE.MathUtils.lerp(handR.rotation.x, tHandRX, handLerp);
        handR.rotation.y = THREE.MathUtils.lerp(handR.rotation.y, tHandRY, handLerp);
        handR.rotation.z = THREE.MathUtils.lerp(handR.rotation.z, tHandRZ, handLerp);
      }

      // Natural finger cascade (index slightly straighter, pinky slightly more curled)
      fingersL.forEach((f, idx) => {
        const fingerGroup = Math.floor(idx / 3); // 0=Index, 1=Middle, 2=Ring, 3=Pinky
        const cascadeOffset = fingerGroup * 0.045;
        f.rotation.x = THREE.MathUtils.lerp(f.rotation.x, tFingerCurlL + cascadeOffset, handLerp);
      });
      fingersR.forEach((f, idx) => {
        const fingerGroup = Math.floor(idx / 3);
        const cascadeOffset = fingerGroup * 0.045;
        f.rotation.x = THREE.MathUtils.lerp(f.rotation.x, tFingerCurlR + cascadeOffset, handLerp);
      });

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
      wrapperEl?.removeEventListener('click', handleContainerClick);

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
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          triggerSpeak();
        }
      }}
      aria-label={
        language === 'id'
          ? 'Klik robot 3D untuk berbicara'
          : 'Click 3D robot to talk'
      }
      className={`relative w-full h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 rounded-2xl ${
        isHoveringRobot ? 'cursor-pointer' : 'cursor-default'
      } ${className}`}
    >
      {/* 3D WebGL Canvas Stage (extended horizontally so outstretched arms never clip) */}
      <div
        ref={containerRef}
        style={{
          maskImage: 'linear-gradient(to bottom, black 56%, rgba(0, 0, 0, 0.65) 80%, transparent 98%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, black 56%, rgba(0, 0, 0, 0.65) 80%, transparent 98%)',
        }}
        className="relative -inset-x-6 sm:-inset-x-8 w-[calc(100%+3rem)] sm:w-[calc(100%+4rem)] h-full flex items-center justify-center text-xs font-mono text-muted select-none pointer-events-none"
      />

      {/* Speech Bubble on the Right Side of the Robot */}
      <AnimatePresence>
        {bubbleOpen && (
          <motion.div
            key={fullText}
            initial={{ opacity: 0, x: -12, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -8, scale: 0.94 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            aria-live="polite"
            className="pointer-events-none absolute top-4 sm:top-10 right-1 sm:right-2 lg:-right-6 z-20 w-[210px] sm:w-[250px]"
          >
            <div className="relative liquid-glass-modal rounded-2xl p-3.5 sm:p-4 border border-indigo-500/35 shadow-[0_16px_42px_rgba(0,0,0,0.55)]">
              {/* Left-pointing Speech Tail toward Robot's Head */}
              <span
                aria-hidden="true"
                className="hidden sm:block absolute top-6 -left-2 w-3.5 h-3.5 rotate-45 bg-[rgba(13,14,21,0.88)] border-l border-b border-indigo-500/35"
              />

              {/* Status Header + Voice Wave Bars */}
              <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/10">
                <div className="flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-cyan-400" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-indigo-400">
                    Obsidian Unit
                  </span>
                </div>

                {/* Equalizer Bars (animated while typing/speaking) */}
                <div className="flex items-end gap-0.5 h-3" aria-hidden="true">
                  {[0, 1, 2, 3].map((bar) => (
                    <motion.span
                      key={bar}
                      animate={
                        isTalking
                          ? { height: ['4px', `${8 + ((bar * 5) % 6)}px`, '4px'] }
                          : { height: '4px' }
                      }
                      transition={
                        isTalking
                          ? {
                              duration: 0.42 + bar * 0.08,
                              repeat: Infinity,
                              ease: 'easeInOut',
                            }
                          : { duration: 0.2 }
                      }
                      className="w-0.5 rounded-full bg-cyan-400"
                    />
                  ))}
                </div>
              </div>

              {/* Crisp Typewriter Dialogue Text */}
              <p className="text-xs sm:text-[13px] leading-relaxed font-medium text-[var(--text-primary)]">
                {typedText}
                {isTalking && (
                  <span className="inline-block w-1.5 h-3.5 ml-0.5 align-middle bg-cyan-400 animate-pulse rounded-xs" />
                )}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
