import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Import raw shaders via vite-plugin-glsl
import vertexShader from '../shaders/vertex.glsl';
import fragmentShader from '../shaders/fragment.glsl';

export const NeuralWallpaper: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene Setup
    const scene = new THREE.Scene();
    
    // Orthographic camera is perfect for 2D full-screen shaders
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Cap pixel ratio for performance
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 2. Uniforms for Shader
    const uniforms = {
      u_time: { value: 0.0 },
      u_mouse: { value: new THREE.Vector2(0.5, 0.5) },
      u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    };

    // 3. Geometry & Material (Full screen quad)
    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // 4. Mouse Interaction with Lerp
    const targetMouse = { x: 0.5, y: 0.5 };
    const handleMouseMove = (e: MouseEvent) => {
      targetMouse.x = e.clientX / window.innerWidth;
      // Invert Y for WebGL coordinates
      targetMouse.y = 1.0 - (e.clientY / window.innerHeight);
    };
    window.addEventListener('mousemove', handleMouseMove);

    // 5. Handle Resize
    const handleResize = () => {
      renderer.setSize(window.innerWidth, window.innerHeight);
      uniforms.u_resolution.value.set(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    // 6. Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const render = () => {
      // Smoothly interpolate mouse position (premium feel)
      uniforms.u_mouse.value.x += (targetMouse.x - uniforms.u_mouse.value.x) * 0.05;
      uniforms.u_mouse.value.y += (targetMouse.y - uniforms.u_mouse.value.y) * 0.05;
      
      uniforms.u_time.value = clock.getElapsedTime();
      
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // 7. Strict Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={mountRef} 
      className="absolute inset-0 z-0 pointer-events-none"
    />
  );
};