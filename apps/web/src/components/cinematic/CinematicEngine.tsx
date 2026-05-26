'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { useRiskStore } from '@/store/useRiskStore';

gsap.registerPlugin(ScrollTrigger);

interface CinematicEngineProps {
  frameCount: number;
}

export default function CinematicEngine({ frameCount }: CinematicEngineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { setLoadProgress } = useRiskStore();

  // Refs for Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.OrthographicCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const planeRef = useRef<THREE.Mesh | null>(null);
  const texturesRef = useRef<Map<number, THREE.Texture>>(new Map());

  // Animation state
  const targetFrame = useRef(0);
  const currentFrame = useRef(0);

  // Device state
  const isMobile = useRef(false);

  // 1. Initial Setup
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    // Detection
    isMobile.current = window.matchMedia('(max-width: 768px)').matches;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup (Orthographic for perfect 2D fit)
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      antialias: false, // Better for pixels/images
      alpha: true,
      powerPreference: 'high-performance',
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    rendererRef.current = renderer;

    // Plane setup
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.6,
    });
    const plane = new THREE.Mesh(geometry, material);
    scene.add(plane);
    planeRef.current = plane;

    // Resize handler
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      isMobile.current = window.matchMedia('(max-width: 768px)').matches;
    };
    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationId: number;
    const render = () => {
      // Lerp for smoothness
      const lerpFactor = isMobile.current ? 0.08 : 0.15;
      currentFrame.current += (targetFrame.current - currentFrame.current) * lerpFactor;

      const frameIndex = Math.round(currentFrame.current);
      const texture = texturesRef.current.get(frameIndex);

      if (texture && plane.material instanceof THREE.MeshBasicMaterial) {
        plane.material.map = texture;
        plane.material.needsUpdate = true;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(render);
    };
    render();

    const texturesLocal = texturesRef.current;

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      texturesLocal.forEach(t => t.dispose());
    };
  }, []);

  // 2. Asset Loading (Hybrid Strategy)
  useEffect(() => {
    const loadInitialFrames = async () => {
      const initialLimit = 60;
      let loadedCount = 0;

      for (let i = 1; i <= frameCount; i++) {
        // We load headers for all but only blobs for the first 60 immediately
        const frameIndex = i.toString().padStart(3, '0');
        const url = `/frames_webp/frame-${frameIndex}.webp`;

        // If it's one of the first 60, load it now
        if (i <= initialLimit) {
          const texture = await new THREE.TextureLoader().loadAsync(url);
          texture.minFilter = THREE.LinearFilter;
          texturesRef.current.set(i - 1, texture);
          loadedCount++;
          setLoadProgress((loadedCount / initialLimit) * 100);
        } else {
          // Lazy load strategy: Fetch on demand or in background chunks
          // For simplicity in this version, we will background fetch remaining
          setTimeout(() => {
            new THREE.TextureLoader().load(url, (t) => {
              t.minFilter = THREE.LinearFilter;
              texturesRef.current.set(i - 1, t);
            });
          }, i * 10); // Throttle
        }
      }
    };

    loadInitialFrames();
  }, [frameCount, setLoadProgress]);

  // 3. Unified Interaction (GSAP)
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: 'body',
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.5, // Reduced from 1 to make it feel lighter/faster
        onUpdate: (self) => {
          targetFrame.current = self.progress * (frameCount - 1);
        },
      });
    });

    return () => ctx.revert();
  }, [frameCount]);

  return (
    <div ref={containerRef} className="fixed inset-0 w-full h-full z-0 overflow-hidden bg-black pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full object-cover"
      />
      {/* Background Vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background pointer-events-none opacity-40" />
    </div>
  );
}
//EOF