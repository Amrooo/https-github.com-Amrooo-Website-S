import React, { useEffect, useRef } from 'react';

interface AnimatedNetworkBackgroundProps {
  isDark?: boolean;
}

type NodeColorType = 'green' | 'red' | 'offwhite';

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  pulsePhase: number;
  colorType: NodeColorType;
}

interface Pulse {
  sourceIdx: number;
  targetIdx: number;
  progress: number;
  speed: number;
  colorType: NodeColorType;
}

export const AnimatedNetworkBackground: React.FC<AnimatedNetworkBackgroundProps> = ({ isDark = false }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initNodes();
    };

    window.addEventListener('resize', handleResize);

    // Number of interconnected constellation nodes
    const nodeCount = Math.min(Math.floor((width * height) / 22000), 70);
    let nodes: Node[] = [];
    let pulses: Pulse[] = [];

    const colorTypes: NodeColorType[] = ['green', 'red', 'offwhite'];

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < nodeCount; i++) {
        const radius = Math.random() * 2 + 2;
        // Balanced mix: 40% green, 35% red, 25% light offwhite
        const rand = Math.random();
        const colorType: NodeColorType = rand < 0.4 ? 'green' : rand < 0.75 ? 'red' : 'offwhite';

        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius,
          baseRadius: radius,
          pulsePhase: Math.random() * Math.PI * 2,
          colorType
        });
      }
    };

    initNodes();

    // Periodically spawn data pulses along network links
    const pulseInterval = setInterval(() => {
      if (nodes.length < 2) return;
      if (pulses.length > 22) return;

      const sourceIdx = Math.floor(Math.random() * nodes.length);
      const src = nodes[sourceIdx];
      let bestDist = 190;
      let targetIdx = -1;

      for (let j = 0; j < nodes.length; j++) {
        if (j === sourceIdx) continue;
        const dx = nodes[j].x - src.x;
        const dy = nodes[j].y - src.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < bestDist) {
          bestDist = dist;
          targetIdx = j;
        }
      }

      if (targetIdx !== -1) {
        pulses.push({
          sourceIdx,
          targetIdx,
          progress: 0,
          speed: 0.007 + Math.random() * 0.011,
          colorType: src.colorType
        });
      }
    }, 400);

    // Color definitions for green, red, and light off-white
    const getPalette = (type: NodeColorType) => {
      if (type === 'green') {
        return {
          rgb: isDark ? '52, 211, 153' : '16, 185, 129',
          hex: isDark ? '#34d399' : '#10b981',
          nodeCore: isDark ? 'rgba(52, 211, 153, 0.85)' : 'rgba(16, 185, 129, 0.75)',
          nodeGlow: isDark ? 'rgba(52, 211, 153, 0.25)' : 'rgba(16, 185, 129, 0.18)'
        };
      } else if (type === 'red') {
        return {
          rgb: isDark ? '248, 113, 113' : '239, 68, 68',
          hex: isDark ? '#f87171' : '#ef4444',
          nodeCore: isDark ? 'rgba(248, 113, 113, 0.85)' : 'rgba(239, 68, 68, 0.75)',
          nodeGlow: isDark ? 'rgba(248, 113, 113, 0.25)' : 'rgba(239, 68, 68, 0.18)'
        };
      } else {
        // Light off-white / pearl
        return {
          rgb: isDark ? '248, 250, 252' : '148, 163, 184',
          hex: isDark ? '#f8fafc' : '#94a3b8',
          nodeCore: isDark ? 'rgba(248, 250, 252, 0.9)' : 'rgba(148, 163, 184, 0.75)',
          nodeGlow: isDark ? 'rgba(248, 250, 252, 0.28)' : 'rgba(203, 213, 225, 0.22)'
        };
      }
    };

    // Render loop
    const maxConnectionDistance = 165;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Update and draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Bounce at boundaries with slight buffer
        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        node.pulsePhase += 0.03;
        node.radius = node.baseRadius + Math.sin(node.pulsePhase) * 0.75;

        const pal = getPalette(node.colorType);

        // Draw soft outer aura
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = pal.nodeGlow;
        ctx.fill();

        // Draw core node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = pal.nodeCore;
        ctx.fill();
      }

      // Draw connecting synaptic network lines with gradient between node colors
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const alpha = (1 - dist / maxConnectionDistance) * (isDark ? 0.26 : 0.20);
            const pal1 = getPalette(nodes[i].colorType);
            const pal2 = getPalette(nodes[j].colorType);

            const grad = ctx.createLinearGradient(nodes[i].x, nodes[i].y, nodes[j].x, nodes[j].y);
            grad.addColorStop(0, `rgba(${pal1.rgb}, ${alpha})`);
            grad.addColorStop(1, `rgba(${pal2.rgb}, ${alpha})`);

            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = grad;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }
      }

      // Update and draw traveling data pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const src = nodes[p.sourceIdx];
        const tgt = nodes[p.targetIdx];
        if (!src || !tgt) {
          pulses.splice(i, 1);
          continue;
        }

        const px = src.x + (tgt.x - src.x) * p.progress;
        const py = src.y + (tgt.y - src.y) * p.progress;
        const pal = getPalette(p.colorType);

        ctx.beginPath();
        ctx.arc(px, py, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = pal.hex;
        ctx.shadowColor = pal.hex;
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0; // reset
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(pulseInterval);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isDark]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-50 w-full h-full opacity-35 dark:opacity-25 transition-opacity duration-700"
    />
  );
};
