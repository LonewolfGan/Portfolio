import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

export const BackgroundScene: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const materialRef = useRef<THREE.PointsMaterial | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
    if (!gl) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, canvas });
    } catch {
      return;
    }

    rendererRef.current = renderer;
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const count = 2500;
    const positions = new Float32Array(count * 3);

    for (let i = 0; i < count * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 20;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      sizeAttenuation: true,
      color: theme === 'dark' ? '#4ade80' : '#10b981',
      transparent: true,
      opacity: theme === 'dark' ? 0.4 : 0.18,
      blending: theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending,
    });
    materialRef.current = particlesMaterial;

    const particles = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particles);

    camera.position.z = 5;

    let mouseX = 0;
    let mouseY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (event.clientY / window.innerHeight - 0.5) * 2;
    };

    window.addEventListener('mousemove', onMouseMove);

    let animationId: number;
    let elapsed = 0;
    let lastTime = performance.now();

    const animate = (timestamp: number) => {
      const delta = (timestamp - lastTime) / 1000;
      lastTime = timestamp;
      elapsed += delta;

      particles.rotation.y = elapsed * 0.05;
      particles.rotation.x = elapsed * 0.02;

      particles.position.x += (mouseX * 0.5 - particles.position.x) * 0.05;
      particles.position.y += (-mouseY * 0.5 - particles.position.y) * 0.05;

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
      rendererRef.current = null;
      const el = containerRef.current;
      if (el && renderer.domElement.parentNode === el) {
        el.removeChild(renderer.domElement);
      }
    };
  }, []);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.color.set(theme === 'dark' ? '#4ade80' : '#10b981');
      materialRef.current.opacity = theme === 'dark' ? 0.4 : 0.18;
      materialRef.current.blending = theme === 'dark' ? THREE.AdditiveBlending : THREE.NormalBlending;
      materialRef.current.needsUpdate = true;
    }
  }, [theme]);

  return <div ref={containerRef} className="fixed inset-0 -z-10 pointer-events-none" />;
};
