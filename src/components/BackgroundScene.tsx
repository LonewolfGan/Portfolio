import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// Reduce particle count based on device capability
const getParticleCount = () => {
  if (typeof window === 'undefined') return 1000;
  const memory = (navigator as any).deviceMemory || 4;
  const cores = navigator.hardwareConcurrency || 4;
  // Reduce particles on low-end devices
  if (memory < 4 || cores < 4) return 800;
  return 1500; // Reduced from 2500
};

const BackgroundScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const [shouldRender, setShouldRender] = useState(false);

  // Only render when visible and after initial paint
  useEffect(() => {
    // Delay Three.js initialization until after critical rendering
    const timer = setTimeout(() => {
      setShouldRender(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldRender || !containerRef.current) return;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: false, // Disabled for performance
      alpha: true, 
      canvas,
      powerPreference: 'low-power' // Request low power mode
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Cap at 1.5x
    
    containerRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = getParticleCount();
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      color: theme === 'dark' ? '#4ade80' : '#059669',
      transparent: true,
      opacity: theme === 'dark' ? 0.4 : 0.45,
      blending: THREE.AdditiveBlending,
    });
    materialRef.current = particlesMaterial;

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    // Throttled mouse tracking
    let mouseX = 0;
    let mouseY = 0;
    let rafId: number;
    let lastMouseUpdate = 0;

    const onMouseMove = (event: MouseEvent) => {
      const now = performance.now();
      if (now - lastMouseUpdate < 50) return; // Throttle to 20fps
      lastMouseUpdate = now;
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });

    let elapsed = 0;
    let lastTime = performance.now();
    let frameCount = 0;

    const animate = (timestamp: number) => {
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      elapsed += delta;

      // Skip every other frame on low-end devices
      frameCount++;
      if (frameCount % 2 !== 0) {
        rafId = requestAnimationFrame(animate);
        return;
      }

      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.02;

      particles.position.x += (mouseX * 0.5 - particles.position.x) * 0.05;
      particles.position.y += (-mouseY * 0.5 - particles.position.y) * 0.05;

      renderer.render(scene, camera);
      rafId = requestAnimationFrame(animate);
    };

    rafId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize, { passive: true });

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      const el = containerRef.current;
      if (el && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, [shouldRender]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(theme === 'dark' ? '#4ade80' : '#059669');
      materialRef.current.opacity = theme === 'dark' ? 0.4 : 0.45;
      materialRef.current.needsUpdate = true;
    }
  }, [theme]);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};

export default BackgroundScene;
