"use client";

import { useEffect, useRef, useCallback } from "react";

const CONFIG = {
  // Node density based on screen area
  nodeDensity: 0.00007,
  minNodes: 50,
  maxNodes: 120,

  // Node appearance
  nodeMinRadius: 1.5,
  nodeMaxRadius: 3,

  // Connections
  connectionDistance: 160,
  lineWidth: 1,

  // Colors - theme-aware (dark mode / light mode)
  primaryColor: "37, 99, 235",
  secondaryColorDark: "255, 255, 255", // White nodes for dark mode
  secondaryColorLight: "51, 65, 85", // Slate-700 nodes for light mode
  nodeOpacity: 0.35,
  lineOpacity: 0.12,

  // Animation
  noiseScale: 0.002,
  noiseAmplitude: 50,
  timeSpeed: 0.012,

  // Energy system
  initialEnergy: 1.0,
  minEnergy: 0.02,
  energyDecayRate: 0.004,
  energyRecoveryRate: 0.08,
  stabilizationTime: 5000,

  // Mouse interaction
  mouseRadius: 180,
  mouseAttraction: 0.06,

  // Scroll
  scrollFadeEnd: 0.75,
} as const;

// Perlin-like noise
class SimpleNoise {
  private perm: number[];

  constructor(seed = Math.random() * 10000) {
    const p = Array.from({ length: 256 }, (_, i) => i);
    let s = seed;
    for (let i = 255; i > 0; i--) {
      s = (s * 16807) % 2147483647;
      const j = s % (i + 1);
      [p[i], p[j]] = [p[j], p[i]];
    }
    this.perm = [...p, ...p];
  }

  private fade = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);
  private lerp = (a: number, b: number, t: number) => a + t * (b - a);
  private grad(hash: number, x: number, y: number) {
    const h = hash & 3;
    return ((h & 1) ? -x : x) + ((h & 2) ? -y : y);
  }

  noise2D(x: number, y: number): number {
    const X = Math.floor(x) & 255, Y = Math.floor(y) & 255;
    x -= Math.floor(x); y -= Math.floor(y);
    const u = this.fade(x), v = this.fade(y);
    const A = this.perm[X] + Y, B = this.perm[X + 1] + Y;
    return this.lerp(
      this.lerp(this.grad(this.perm[A], x, y), this.grad(this.perm[B], x - 1, y), u),
      this.lerp(this.grad(this.perm[A + 1], x, y - 1), this.grad(this.perm[B + 1], x - 1, y - 1), u),
      v
    ) * 0.5 + 0.5;
  }
}

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  frozenX: number;
  frozenY: number;
  radius: number;
  phase: number;
  isWhite: boolean;
}

/**
 * Get current theme from DOM class list.
 * Falls back to "dark" if no class is present.
 */
function getCurrentTheme(): "dark" | "light" {
  if (typeof document === "undefined") return "dark";
  return document.documentElement.classList.contains("light") ? "light" : "dark";
}

export function HeroBackgroundCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const noiseRef = useRef<SimpleNoise | null>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const scrollOpacityRef = useRef(1);
  const timeRef = useRef(0);
  const isMobileRef = useRef(false);
  const energyRef = useRef<number>(CONFIG.initialEnergy);
  const startTimeRef = useRef<number>(Date.now());
  const lastInteractionRef = useRef<number>(0);
  const dimensionsRef = useRef({ width: 0, height: 0 });

  const getNodeCount = (w: number, h: number) => {
    const count = Math.round(w * h * CONFIG.nodeDensity);
    return Math.max(CONFIG.minNodes, Math.min(CONFIG.maxNodes, count));
  };

  const createNodes = useCallback((width: number, height: number): Node[] => {
    const count = getNodeCount(width, height);
    const nodes: Node[] = [];
    const cx = width / 2, cy = height / 2;

    for (let i = 0; i < count; i++) {
      // Gaussian-ish distribution toward center
      const u1 = Math.random(), u2 = Math.random();
      const r = Math.sqrt(-2 * Math.log(Math.max(u1, 0.001))) * 0.38;
      const theta = Math.PI * 2 * u2;

      const x = cx + r * Math.cos(theta) * width;
      const y = cy + r * Math.sin(theta) * height;

      nodes.push({
        x, y,
        baseX: x,
        baseY: y,
        frozenX: x,
        frozenY: y,
        radius: CONFIG.nodeMinRadius + Math.random() * (CONFIG.nodeMaxRadius - CONFIG.nodeMinRadius),
        phase: Math.random() * Math.PI * 2,
        isWhite: Math.random() > 0.55,
      });
    }
    return nodes;
  }, []);

  const handleResize = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    canvas.style.width = `${rect.width}px`;
    canvas.style.height = `${rect.height}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    dimensionsRef.current = { width: rect.width, height: rect.height };
    isMobileRef.current = window.matchMedia("(hover: none)").matches;
    nodesRef.current = createNodes(rect.width, rect.height);
    energyRef.current = CONFIG.initialEnergy;
    startTimeRef.current = Date.now();
  }, [createNodes]);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (isMobileRef.current) return;
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    };
    lastInteractionRef.current = Date.now();
    energyRef.current = Math.min(1, energyRef.current + CONFIG.energyRecoveryRate);
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current.active = false;
  }, []);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const progress = Math.max(0, -rect.top / rect.height);
    scrollOpacityRef.current = Math.max(0, 1 - progress / CONFIG.scrollFadeEnd);
  }, []);

  const render = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    const noise = noiseRef.current;
    const { width, height } = dimensionsRef.current;

    if (!canvas || !ctx || !noise || !width) {
      animationRef.current = requestAnimationFrame(render);
      return;
    }

    const nodes = nodesRef.current;
    const time = timeRef.current;
    const mouse = mouseRef.current;
    const scrollOpacity = scrollOpacityRef.current;

    if (scrollOpacity <= 0) {
      animationRef.current = requestAnimationFrame(render);
      timeRef.current += CONFIG.timeSpeed;
      return;
    }

    // Energy decay
    const now = Date.now();
    const elapsed = now - startTimeRef.current;
    const sinceMouse = now - lastInteractionRef.current;

    if (elapsed > CONFIG.stabilizationTime && sinceMouse > 600) {
      energyRef.current = Math.max(CONFIG.minEnergy, energyRef.current - CONFIG.energyDecayRate);
    }
    if (mouse.active) {
      energyRef.current = Math.min(1, energyRef.current + 0.002);
    }

    const energy = energyRef.current;

    // Freeze position when energy is minimal
    if (energy <= CONFIG.minEnergy + 0.005) {
      for (const node of nodes) {
        node.frozenX = node.x;
        node.frozenY = node.y;
      }
    }

    ctx.clearRect(0, 0, width, height);

    // Update positions
    for (const node of nodes) {
      const nx = noise.noise2D(node.baseX * CONFIG.noiseScale + time, node.phase);
      const ny = noise.noise2D(node.baseY * CONFIG.noiseScale + time + 50, node.phase + 50);

      const animX = node.baseX + (nx - 0.5) * CONFIG.noiseAmplitude;
      const animY = node.baseY + (ny - 0.5) * CONFIG.noiseAmplitude;

      // Blend frozen ↔ animated based on energy
      let targetX = node.frozenX + (animX - node.frozenX) * energy;
      let targetY = node.frozenY + (animY - node.frozenY) * energy;

      // Mouse attraction
      if (mouse.active && !isMobileRef.current) {
        const dx = mouse.x - node.x;
        const dy = mouse.y - node.y;
        const dist = Math.hypot(dx, dy);

        if (dist < CONFIG.mouseRadius && dist > 1) {
          const pull = (1 - dist / CONFIG.mouseRadius) * CONFIG.mouseAttraction;
          targetX += dx * pull;
          targetY += dy * pull;
        }
      }

      node.x += (targetX - node.x) * 0.08;
      node.y += (targetY - node.y) * 0.08;
    }

    // Draw connections
    ctx.lineCap = "round";

    for (let i = 0; i < nodes.length; i++) {
      const a = nodes[i];
      for (let j = i + 1; j < nodes.length; j++) {
        const b = nodes[j];
        const dist = Math.hypot(b.x - a.x, b.y - a.y);

        if (dist < CONFIG.connectionDistance) {
          const alpha = (1 - dist / CONFIG.connectionDistance) * CONFIG.lineOpacity * scrollOpacity;
          ctx.strokeStyle = `rgba(${CONFIG.primaryColor}, ${alpha})`;
          ctx.lineWidth = CONFIG.lineWidth;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }

    // Draw nodes - read theme from DOM for reactive updates
    const secondaryColor = getCurrentTheme() === "light"
      ? CONFIG.secondaryColorLight
      : CONFIG.secondaryColorDark;

    for (const node of nodes) {
      const color = node.isWhite ? secondaryColor : CONFIG.primaryColor;
      ctx.fillStyle = `rgba(${color}, ${CONFIG.nodeOpacity * scrollOpacity})`;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
      ctx.fill();
    }

    if (energy > CONFIG.minEnergy) {
      timeRef.current += CONFIG.timeSpeed * energy;
    }

    animationRef.current = requestAnimationFrame(render);
  }, []);

  useEffect(() => {
    noiseRef.current = new SimpleNoise();
    handleResize();
    handleScroll();
    animationRef.current = requestAnimationFrame(render);

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    const container = containerRef.current;
    container?.addEventListener("mousemove", handleMouseMove);
    container?.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
      container?.removeEventListener("mousemove", handleMouseMove);
      container?.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [handleResize, handleScroll, handleMouseMove, handleMouseLeave, render]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 overflow-hidden pointer-events-none"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />
    </div>
  );
}
