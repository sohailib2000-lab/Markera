"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030305, 0.002);

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    // Camera is slightly closer in imascending, let's use 3 as they did
    camera.position.z = 3;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // ── Particle system ──
    const COUNT = 4000;
    const positions = new Float32Array(COUNT * 3);
    const colors = new Float32Array(COUNT * 3);

    const gold = new THREE.Color("#c9a87c");
    const purple = new THREE.Color("#6366f1");
    const white = new THREE.Color("#ffffff");

    for (let i = 0; i < COUNT; i++) {
       // Spread particles similar to imascending
      const x = (Math.random() - 0.5) * 15;
      const y = (Math.random() - 0.5) * 15;
      const z = (Math.random() - 0.5) * 15;
      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      const t = Math.random();
      const col = t < 0.5 ? gold.clone().lerp(white, t * 0.5) : purple.clone().lerp(white, (t - 0.5) * 0.4);
      colors[i * 3] = col.r;
      colors[i * 3 + 1] = col.g;
      colors[i * 3 + 2] = col.b;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const mat = new THREE.PointsMaterial({
      size: 0.015,
      vertexColors: true,
      transparent: true,
      opacity: 0.8,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });

    const mesh = new THREE.Points(geo, mat);
    scene.add(mesh);

    // ── Mouse tracking ──
    let mouseX = 0, mouseY = 0;
    const onMouse = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth) * 2 - 1;
      mouseY = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouse);

    // ── Resize ──
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    // ── Animation loop ──
    const clock = new THREE.Clock();
    let reqId: number;

    // Smooth lerping for mouse tracking
    let targetX = 0;
    let targetY = 0;

    const tick = () => {
      const t = clock.getElapsedTime();
      
      // Gentle, continuous global drift (imascending style)
      mesh.rotation.y = t * 0.03;
      mesh.rotation.x = -t * 0.01;
      
      // Smooth out the target camera position
      targetX += (mouseX * 0.6 - targetX) * 0.05;
      targetY += (mouseY * 0.6 - targetY) * 0.05;

      // Apply camera parallax
      camera.position.x = targetX;
      camera.position.y = targetY;

      // Keep it looking at center
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
      reqId = requestAnimationFrame(tick);
    };
    tick();

    return () => {
      cancelAnimationFrame(reqId);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
      }}
    />
  );
}
