"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";

// Ported from /legacy-reference/js/scene.js. This is the heavy Three.js
// implementation — always consumed through the next/dynamic(ssr:false)
// wrapper in mascot-scene.tsx, never imported directly by pages. Sizing
// (legacy's .scene-wrap: 300×260) is the consumer's responsibility — this
// component just fills whatever box it's given and resizes with it.

function easeOutCirc(x: number) {
  return Math.sqrt(1 - Math.pow(x - 1, 4));
}

function shadowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(
    size / 2,
    size / 2,
    0,
    size / 2,
    size / 2,
    size / 2,
  );
  g.addColorStop(0, "rgba(0,0,0,0.32)");
  g.addColorStop(0.7, "rgba(0,0,0,0.12)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

const PALETTE = {
  body: 0xf3ece0, // crema, familia del fondo claro del sitio
  face: 0x23262b, // pantalla oscura
  glow: 0x81e6d9, // teal-200: ojos/boca
  accent: 0x319795, // teal-500: brazos/base, color de marca del sitio
  antennaTip: 0xfbd38d, // orange-200: mismo tono que el toggle de tema
  ground: 0xb9ad9c,
};

function rounded(
  w: number,
  h: number,
  d: number,
  radius: number,
  color: number,
  extra: THREE.MeshStandardMaterialParameters = {},
) {
  const geo = new RoundedBoxGeometry(w, h, d, 4, radius);
  const mat = new THREE.MeshStandardMaterial({
    color,
    roughness: 0.45,
    metalness: 0.08,
    ...extra,
  });
  return new THREE.Mesh(geo, mat);
}

function disposeScene(scene: THREE.Scene) {
  scene.traverse((obj) => {
    if (!(obj instanceof THREE.Mesh)) return;
    obj.geometry.dispose();
    const material = obj.material;
    if (Array.isArray(material)) {
      material.forEach((m) => m.dispose());
    } else {
      material.dispose();
    }
  });
}

export function MascotSceneCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf = 0;
    let disposed = false;

    const scW = container.clientWidth;
    const scH = container.clientHeight;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(scW, scH);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    const target = new THREE.Vector3(0, 1.05, 0);
    const initialCameraPosition = new THREE.Vector3(
      9 * Math.sin(0.1 * Math.PI),
      3.6,
      9 * Math.cos(0.1 * Math.PI),
    );

    const scale = scH * 0.0062 + 1.9;
    const camera = new THREE.OrthographicCamera(
      -scale,
      scale,
      scale,
      -scale,
      0.1,
      50,
    );
    camera.position.copy(initialCameraPosition);
    camera.lookAt(target);

    const ambient = new THREE.AmbientLight(0xffffff, 1.1);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(0xffffff, 0.9);
    key.position.set(4, 6, 4);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0x88ccca, 0.35);
    fill.position.set(-5, 2, -4);
    scene.add(fill);

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.autoRotate = !prefersReducedMotion;
    controls.autoRotateSpeed = 1.1;
    controls.target = target;

    // ---- Mascota "robot" genérica: un solo sujeto con silueta clara ----
    const rig = new THREE.Group();
    scene.add(rig);

    const platform = new THREE.Mesh(
      new THREE.CylinderGeometry(1.15, 1.2, 0.16, 40),
      new THREE.MeshStandardMaterial({ color: PALETTE.ground, roughness: 0.9 }),
    );
    platform.position.y = 0.08;
    rig.add(platform);

    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(2.6, 2.6),
      new THREE.MeshBasicMaterial({
        map: shadowTexture(),
        transparent: true,
        depthWrite: false,
      }),
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = 0.161;
    rig.add(shadow);

    // Base flotante ("hover puck") bajo el cuerpo
    const hoverBase = rounded(0.62, 0.22, 0.5, 0.1, PALETTE.accent);
    hoverBase.position.y = 0.48;
    rig.add(hoverBase);

    // Cuerpo principal (torso+cabeza en un solo bloque redondeado)
    const bodyGroup = new THREE.Group();
    rig.add(bodyGroup);

    const body = rounded(0.92, 1.02, 0.68, 0.2, PALETTE.body);
    body.position.y = 1.05;
    bodyGroup.add(body);

    // Placa/pantalla de la cara
    const face = rounded(0.56, 0.4, 0.08, 0.02, PALETTE.face);
    face.position.set(0, 1.1, 0.36);
    bodyGroup.add(face);

    const eyeGeo = new THREE.CircleGeometry(0.045, 24);
    const eyeMat = new THREE.MeshStandardMaterial({
      color: PALETTE.glow,
      emissive: new THREE.Color(PALETTE.glow),
      emissiveIntensity: 1.1,
    });
    const eyeL = new THREE.Mesh(eyeGeo, eyeMat);
    eyeL.position.set(-0.13, 1.16, 0.42);
    bodyGroup.add(eyeL);
    const eyeR = new THREE.Mesh(eyeGeo, eyeMat.clone());
    eyeR.position.set(0.13, 1.16, 0.42);
    bodyGroup.add(eyeR);

    const mouthGeo = new THREE.TorusGeometry(0.09, 0.016, 8, 20, Math.PI);
    const mouth = new THREE.Mesh(mouthGeo, eyeMat.clone());
    mouth.rotation.z = Math.PI;
    mouth.position.set(0, 1.0, 0.42);
    bodyGroup.add(mouth);

    // Antena
    const antennaStem = rounded(0.045, 0.34, 0.045, 0.02, PALETTE.face);
    antennaStem.position.set(0, 1.72, 0);
    bodyGroup.add(antennaStem);
    const antennaTipMat = new THREE.MeshStandardMaterial({
      color: PALETTE.antennaTip,
      emissive: new THREE.Color(PALETTE.antennaTip),
      emissiveIntensity: 1,
    });
    const antennaTip = new THREE.Mesh(
      new THREE.SphereGeometry(0.075, 16, 16),
      antennaTipMat,
    );
    antennaTip.position.set(0, 1.92, 0);
    bodyGroup.add(antennaTip);

    // Brazos (uno saluda)
    function arm(color: number) {
      const g = new THREE.Group();
      const upper = rounded(0.14, 0.42, 0.14, 0.06, color);
      upper.position.y = -0.21;
      g.add(upper);
      return g;
    }

    const armL = arm(PALETTE.accent);
    armL.position.set(-0.52, 1.28, 0.05);
    armL.rotation.z = 0.18;
    bodyGroup.add(armL);

    const armR = arm(PALETTE.accent);
    armR.position.set(0.52, 1.28, 0.05);
    armR.rotation.z = -1.9; // brazo levantado, saludando
    bodyGroup.add(armR);

    function handleResize() {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      const s = h * 0.0062 + 1.9;
      camera.left = -s;
      camera.right = s;
      camera.top = s;
      camera.bottom = -s;
      camera.updateProjectionMatrix();
    }

    // Legacy only listened for window resize; observing the container
    // itself also catches layout-driven size changes (e.g. a flex/grid
    // reflow) that don't fire a window resize event.
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    let frame = prefersReducedMotion ? 101 : 0;
    const startTime = performance.now();

    function animate() {
      raf = requestAnimationFrame(animate);
      frame = frame <= 100 ? frame + 1 : frame;
      const t = (performance.now() - startTime) / 1000;

      // vida propia: flotar suavemente + saludar + antena pulsando
      bodyGroup.position.y = Math.sin(t * 1.4) * 0.045;
      armR.rotation.z = -1.9 + Math.sin(t * 2.6) * 0.22;
      antennaTipMat.emissiveIntensity = 0.7 + Math.sin(t * 3) * 0.4;

      if (frame <= 100) {
        const p = initialCameraPosition;
        const rotSpeed = -easeOutCirc(frame / 120) * Math.PI * 2;
        camera.position.y = initialCameraPosition.y;
        camera.position.x = p.x * Math.cos(rotSpeed) + p.z * Math.sin(rotSpeed);
        camera.position.z = p.z * Math.cos(rotSpeed) - p.x * Math.sin(rotSpeed);
        camera.lookAt(target);
      } else {
        controls.update();
      }
      renderer.render(scene, camera);
    }

    const timeoutId = window.setTimeout(() => {
      if (disposed) return;
      setLoading(false);
      animate();
    }, 300);

    return () => {
      disposed = true;
      window.clearTimeout(timeoutId);
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      container.removeChild(renderer.domElement);
      disposeScene(scene);
    };
  }, []);

  return (
    <div className="relative h-full w-full">
      <div
        ref={containerRef}
        className="h-full w-full cursor-grab active:cursor-grabbing"
      />
      <div
        className={`pointer-events-none absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${
          loading ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="border-border-soft border-t-brand-teal-500 h-7 w-7 animate-spin rounded-full border-[3px]" />
      </div>
    </div>
  );
}
