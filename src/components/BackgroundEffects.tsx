import React, { useEffect, useRef } from 'react';
import { CustomThemeSettings } from '../types';

interface BackgroundEffectsProps {
  settings: CustomThemeSettings;
}

export const BackgroundEffects: React.FC<BackgroundEffectsProps> = ({ settings }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Background color mapping
  const bgColors: Record<string, string> = {
    'oled': '#020408',
    'cyber-navy': '#070b12',
    'obsidian-slate': '#090d16',
    'midnight-coal': '#0c0c10',
    'custom': settings.customBgColor || '#070b12',
  };

  const activeBg = bgColors[settings.backgroundColor] || '#070b12';

  // Accent color hex
  const accentHex =
    settings.colorPalette === 'custom'
      ? settings.customAccentColor
      : settings.colorPalette === 'emerald'
      ? '#10b981'
      : settings.colorPalette === 'amber'
      ? '#f59e0b'
      : settings.colorPalette === 'violet'
      ? '#a855f7'
      : settings.colorPalette === 'rose'
      ? '#f43f5e'
      : settings.colorPalette === 'sky'
      ? '#38bdf8'
      : '#00f2fe';

  // Canvas animations for Motion: 'particles' | 'matrix-rain' | 'ambient-glow' | 'static' | 'custom-video'
  useEffect(() => {
    if (settings.motion === 'static' || settings.motion === 'custom-video') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const mouse = { x: -1000, y: -1000, active: false };
    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };
    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.x = -1000;
      mouse.y = -1000;
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    if (settings.motion === 'neural-synapse') {
      // Interactive AI Synapse & Latent Vector Field (Subtle, High-End AI Engineer Aesthetic)
      const numNeurons = Math.min(Math.floor(width / 26), 50);
      const neurons: {
        x: number;
        y: number;
        vx: number;
        vy: number;
        radius: number;
        pulsePhase: number;
        isHub: boolean;
      }[] = [];

      for (let i = 0; i < numNeurons; i++) {
        neurons.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.32,
          vy: (Math.random() - 0.5) * 0.32,
          radius: Math.random() < 0.2 ? Math.random() * 1.8 + 2.2 : Math.random() * 1.2 + 1.0,
          pulsePhase: Math.random() * Math.PI * 2,
          isHub: i % 7 === 0,
        });
      }

      // Synaptic impulse signals traveling along active axons
      const impulses: {
        from: number;
        to: number;
        progress: number;
        speed: number;
        color: string;
      }[] = [];

      // Subtle AI / ML latent tokens floating in background
      const latentTokens = [
        'dim: 1536',
        'Softmax(QKᵀ / √d)',
        '∇θ L(θ)',
        'Embed(x) ∈ ℝⁿ',
        'RAG Top-K: 5',
        'Conv2D(3x3)',
        'IoU > 0.85',
        'FastAPI 200 OK',
        'YOLOv8 Detection',
        'Cosine_Sim(v₁, v₂)',
        'TensorFlow // PyTorch',
      ];

      const floatingTokens: {
        text: string;
        x: number;
        y: number;
        alpha: number;
        alphaSpeed: number;
        vy: number;
      }[] = [];

      for (let i = 0; i < 8; i++) {
        floatingTokens.push({
          text: latentTokens[i % latentTokens.length],
          x: Math.random() * (width - 150) + 40,
          y: Math.random() * (height - 60) + 30,
          alpha: Math.random() * 0.12 + 0.04,
          alphaSpeed: (Math.random() * 0.002 + 0.001) * (Math.random() < 0.5 ? 1 : -1),
          vy: -0.12 - Math.random() * 0.15,
        });
      }

      let frame = 0;
      const drawSynapse = () => {
        ctx.clearRect(0, 0, width, height);
        frame++;

        // 1. Render subtle floating AI tokens
        ctx.font = '10px monospace';
        for (const token of floatingTokens) {
          token.y += token.vy;
          token.alpha += token.alphaSpeed;
          if (token.alpha > 0.15) token.alphaSpeed = -Math.abs(token.alphaSpeed);
          if (token.alpha < 0.03) token.alphaSpeed = Math.abs(token.alphaSpeed);

          if (token.y < 0) {
            token.y = height + 10;
            token.x = Math.random() * (width - 150) + 40;
            token.text = latentTokens[Math.floor(Math.random() * latentTokens.length)];
          }

          ctx.fillStyle = accentHex;
          ctx.globalAlpha = token.alpha;
          ctx.fillText(token.text, token.x, token.y);
        }

        // 2. Spawn periodic synaptic signal pulses
        if (frame % 45 === 0 && impulses.length < 10) {
          const fromIdx = Math.floor(Math.random() * neurons.length);
          for (let j = 0; j < neurons.length; j++) {
            if (fromIdx !== j) {
              const dist = Math.hypot(neurons[fromIdx].x - neurons[j].x, neurons[fromIdx].y - neurons[j].y);
              if (dist < 130 && dist > 20) {
                impulses.push({
                  from: fromIdx,
                  to: j,
                  progress: 0,
                  speed: 0.016 + Math.random() * 0.014,
                  color: Math.random() < 0.6 ? accentHex : '#38bdf8',
                });
                break;
              }
            }
          }
        }

        // 3. Update & render neurons and axonal connections
        for (let i = 0; i < neurons.length; i++) {
          const n = neurons[i];
          n.x += n.vx;
          n.y += n.vy;
          n.pulsePhase += 0.02;

          // Mouse interaction (gentle cursor attraction / interaction)
          if (mouse.active) {
            const mDist = Math.hypot(n.x - mouse.x, n.y - mouse.y);
            if (mDist < 130 && mDist > 0) {
              const force = (130 - mDist) / 130;
              n.x += ((n.x - mouse.x) / mDist) * force * 0.6;
              n.y += ((n.y - mouse.y) / mDist) * force * 0.6;

              // Draw connection to cursor
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(mouse.x, mouse.y);
              ctx.strokeStyle = accentHex;
              ctx.globalAlpha = 0.22 * (1 - mDist / 130);
              ctx.lineWidth = 0.7;
              ctx.stroke();
            }
          }

          // Screen wrap
          if (n.x < 0) n.x = width;
          if (n.x > width) n.x = 0;
          if (n.y < 0) n.y = height;
          if (n.y > height) n.y = 0;

          // Connections between neurons
          for (let j = i + 1; j < neurons.length; j++) {
            const n2 = neurons[j];
            const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
            if (dist < 125) {
              ctx.beginPath();
              ctx.moveTo(n.x, n.y);
              ctx.lineTo(n2.x, n2.y);
              ctx.strokeStyle = accentHex;
              const connAlpha = (1 - dist / 125) * (n.isHub || n2.isHub ? 0.2 : 0.1);
              ctx.globalAlpha = connAlpha;
              ctx.lineWidth = n.isHub || n2.isHub ? 0.8 : 0.5;
              ctx.stroke();
            }
          }

          // Draw neuron body
          const pulse = Math.sin(n.pulsePhase) * 0.35 + 1;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.radius * pulse, 0, Math.PI * 2);
          ctx.fillStyle = n.isHub ? '#ffffff' : accentHex;
          ctx.globalAlpha = n.isHub ? 0.7 : 0.4;
          ctx.fill();

          // Subtle outer halo for hub neurons
          if (n.isHub) {
            ctx.beginPath();
            ctx.arc(n.x, n.y, n.radius * 2.4, 0, Math.PI * 2);
            ctx.fillStyle = accentHex;
            ctx.globalAlpha = 0.1;
            ctx.fill();
          }
        }

        // 4. Render traveling synaptic pulses
        for (let k = impulses.length - 1; k >= 0; k--) {
          const imp = impulses[k];
          imp.progress += imp.speed;
          if (imp.progress >= 1) {
            impulses.splice(k, 1);
            continue;
          }

          const nFrom = neurons[imp.from];
          const nTo = neurons[imp.to];
          if (!nFrom || !nTo) continue;

          const px = nFrom.x + (nTo.x - nFrom.x) * imp.progress;
          const py = nFrom.y + (nTo.y - nFrom.y) * imp.progress;

          ctx.beginPath();
          ctx.arc(px, py, 2.0, 0, Math.PI * 2);
          ctx.fillStyle = '#ffffff';
          ctx.globalAlpha = 0.8;
          ctx.fill();

          // Glow around signal packet
          ctx.beginPath();
          ctx.arc(px, py, 4.5, 0, Math.PI * 2);
          ctx.fillStyle = imp.color;
          ctx.globalAlpha = 0.3;
          ctx.fill();
        }

        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(drawSynapse);
      };
      drawSynapse();
    } else if (settings.motion === 'particles') {
      // Interactive floating particle network
      const numParticles = Math.min(Math.floor(width / 22), 55);
      const particles: { x: number; y: number; vx: number; vy: number; radius: number }[] = [];

      for (let i = 0; i < numParticles; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.45,
          vy: (Math.random() - 0.5) * 0.45,
          radius: Math.random() * 1.5 + 0.8,
        });
      }

      const drawParticles = () => {
        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = accentHex;
          ctx.globalAlpha = 0.4;
          ctx.fill();

          for (let j = i + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dist = Math.hypot(p.x - p2.x, p.y - p2.y);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = accentHex;
              ctx.globalAlpha = 0.12 * (1 - dist / 110);
              ctx.lineWidth = 0.6;
              ctx.stroke();
            }
          }
        }
        ctx.globalAlpha = 1;
        animationId = requestAnimationFrame(drawParticles);
      };
      drawParticles();
    } else if (settings.motion === 'matrix-rain') {
      // Digital terminal glyph rain
      const fontSize = 13;
      const columns = Math.floor(width / fontSize);
      const drops: number[] = new Array(columns).fill(1);
      const characters = '01AI∑∏λΩθδπµ≠≈<>{}[]/\\+=*BARATHRAJ';

      let frame = 0;
      const drawMatrix = () => {
        frame++;
        if (frame % 2 === 0) {
          ctx.fillStyle = 'rgba(7, 11, 18, 0.15)';
          ctx.fillRect(0, 0, width, height);

          ctx.fillStyle = accentHex;
          ctx.font = `${fontSize}px monospace`;

          for (let i = 0; i < drops.length; i++) {
            const text = characters.charAt(Math.floor(Math.random() * characters.length));
            ctx.globalAlpha = 0.35;
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);

            if (drops[i] * fontSize > height && Math.random() > 0.975) {
              drops[i] = 0;
            }
            drops[i]++;
          }
          ctx.globalAlpha = 1;
        }
        animationId = requestAnimationFrame(drawMatrix);
      };
      drawMatrix();
    } else if (settings.motion === 'ambient-glow') {
      // Pulsating ambient blurred gradients
      let t = 0;
      const drawGlow = () => {
        ctx.clearRect(0, 0, width, height);
        t += 0.008;

        const x1 = width * 0.3 + Math.sin(t) * 90;
        const y1 = height * 0.25 + Math.cos(t) * 60;
        const grad1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, width * 0.35);
        grad1.addColorStop(0, `${accentHex}1a`);
        grad1.addColorStop(1, 'transparent');

        ctx.fillStyle = grad1;
        ctx.fillRect(0, 0, width, height);

        const x2 = width * 0.7 + Math.cos(t * 0.8) * 80;
        const y2 = height * 0.65 + Math.sin(t * 0.8) * 70;
        const grad2 = ctx.createRadialGradient(x2, y2, 10, x2, y2, width * 0.3);
        grad2.addColorStop(0, '#6366f115');
        grad2.addColorStop(1, 'transparent');

        ctx.fillStyle = grad2;
        ctx.fillRect(0, 0, width, height);

        animationId = requestAnimationFrame(drawGlow);
      };
      drawGlow();
    } else if (settings.motion === 'cyber-tunnel') {
      // 3D Neon Portal Corridor Tunnel (Infinite Flight, Cyan & Magenta Rectangular Portals)
      let zOffset = 0;
      const speed = 2.6;
      const numGates = 18;
      const gateSpacing = 130;
      const maxZ = numGates * gateSpacing;
      const focalLength = 340;

      // Dynamic side wall light streaks (motion blur lines)
      const streaks: { xPct: number; yPct: number; length: number; speed: number; color: string }[] = [];
      for (let i = 0; i < 32; i++) {
        const isLeft = Math.random() < 0.5;
        streaks.push({
          xPct: isLeft ? Math.random() * 0.28 : 0.72 + Math.random() * 0.28,
          yPct: 0.12 + Math.random() * 0.76,
          length: 50 + Math.random() * 140,
          speed: 5 + Math.random() * 10,
          color: Math.random() < 0.5 ? '#00f2fe' : '#e024c3',
        });
      }

      const drawTunnel = () => {
        ctx.clearRect(0, 0, width, height);

        const cx = width / 2;
        const cy = height / 2;
        zOffset += speed;

        // 1. Perspective Corridor Rails (Vanishing Center to 4 Corners and Midpoints)
        ctx.save();
        ctx.lineWidth = 1;
        ctx.strokeStyle = 'rgba(0, 242, 254, 0.16)';

        const rails = [
          [0, 0],
          [width, 0],
          [0, height],
          [width, height],
          [0, cy * 0.55],
          [width, cy * 0.55],
          [0, cy * 1.45],
          [width, cy * 1.45],
          [cx * 0.5, 0],
          [cx * 1.5, 0],
          [cx * 0.5, height],
          [cx * 1.5, height],
        ];

        ctx.beginPath();
        for (const [rx, ry] of rails) {
          ctx.moveTo(cx, cy);
          ctx.lineTo(rx, ry);
        }
        ctx.stroke();

        // 2. High-Speed Velocity Streaks
        for (const s of streaks) {
          s.length += s.speed * 0.35;
          const sx = s.xPct * width;
          const sy = s.yPct * height;
          const angle = Math.atan2(sy - cy, sx - cx);
          const ex = sx + Math.cos(angle) * s.length;
          const ey = sy + Math.sin(angle) * s.length;

          ctx.strokeStyle = s.color;
          ctx.globalAlpha = 0.28;
          ctx.lineWidth = 1.3;
          ctx.beginPath();
          ctx.moveTo(sx, sy);
          ctx.lineTo(ex, ey);
          ctx.stroke();

          s.xPct += Math.cos(angle) * 0.005;
          s.yPct += Math.sin(angle) * 0.005;
          if (s.xPct < 0 || s.xPct > 1 || s.yPct < 0 || s.yPct > 1) {
            s.xPct = Math.random() < 0.5 ? Math.random() * 0.28 : 0.72 + Math.random() * 0.28;
            s.yPct = 0.15 + Math.random() * 0.7;
            s.length = 30 + Math.random() * 50;
          }
        }

        // 3. Render 3D Rectangular Neon Portals (Sorted Far to Near)
        // Alternating Electric Cyan and Neon Magenta / Purple frames matching the video
        for (let i = numGates - 1; i >= 0; i--) {
          const currentZ = ((i * gateSpacing - (zOffset % gateSpacing)) + maxZ) % maxZ;
          if (currentZ < 10) continue;

          const scale = focalLength / (focalLength + currentZ);
          const alpha = Math.min(1, Math.max(0, 1 - currentZ / maxZ)) * 0.95;

          const baseW = Math.min(width * 0.78, 1200);
          const baseH = Math.min(height * 0.84, 900);
          const w = baseW * scale;
          const h = baseH * scale;
          const x = cx - w / 2;
          const y = cy - h / 2;

          const isCyan = i % 2 === 0;
          const mainColor = isCyan ? '#00f2fe' : '#e024c3';

          // Outer Neon Bloom
          ctx.shadowColor = mainColor;
          ctx.shadowBlur = Math.min(26 * scale, 36);
          ctx.strokeStyle = mainColor;
          ctx.globalAlpha = alpha;
          ctx.lineWidth = Math.max(1.8, 3.8 * scale);

          // Draw main rectangular portal
          ctx.strokeRect(x, y, w, h);

          // Inner white neon core (creates tangible high-intensity tube glow)
          if (scale > 0.2) {
            ctx.shadowBlur = 0;
            ctx.lineWidth = Math.max(1, 1.8 * scale);
            ctx.strokeStyle = '#ffffff';
            ctx.globalAlpha = alpha * 0.75;
            ctx.strokeRect(x + 2 * scale, y + 2 * scale, Math.max(0, w - 4 * scale), Math.max(0, h - 4 * scale));

            // Outer soft aura
            ctx.strokeStyle = mainColor;
            ctx.globalAlpha = alpha * 0.25;
            ctx.strokeRect(x - 6 * scale, y - 6 * scale, w + 12 * scale, h + 12 * scale);
          }
        }

        // 4. Center Radiant Portal Horizon Glow (infinite vanishing point)
        const horizonRadius = Math.min(width, height) * 0.2;
        const horizonGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, horizonRadius);
        horizonGrad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        horizonGrad.addColorStop(0.2, 'rgba(0, 242, 254, 0.8)');
        horizonGrad.addColorStop(0.5, 'rgba(224, 36, 195, 0.45)');
        horizonGrad.addColorStop(1, 'transparent');

        ctx.shadowBlur = 45;
        ctx.shadowColor = '#00f2fe';
        ctx.fillStyle = horizonGrad;
        ctx.globalAlpha = 0.8;
        ctx.beginPath();
        ctx.arc(cx, cy, horizonRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.restore();
        animationId = requestAnimationFrame(drawTunnel);
      };
      drawTunnel();
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [settings.motion, accentHex]);

  return (
    <div
      className="fixed inset-0 pointer-events-none -z-20 transition-colors duration-500 overflow-hidden"
      style={{ backgroundColor: activeBg }}
    >
      {/* Wallpaper Layer */}
      {settings.wallpaper === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `linear-gradient(to right, ${accentHex} 1px, transparent 1px), linear-gradient(to bottom, ${accentHex} 1px, transparent 1px)`,
            backgroundSize: '36px 36px',
          }}
        />
      )}

      {settings.wallpaper === 'dots' && (
        <div
          className="absolute inset-0 opacity-[0.2]"
          style={{
            backgroundImage: `radial-gradient(${accentHex} 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      )}

      {settings.wallpaper === 'circuit' && (
        <div
          className="absolute inset-0 opacity-[0.12]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 50% 50%, ${accentHex} 1px, transparent 1px),
              linear-gradient(to right, ${accentHex} 1px, transparent 1px),
              linear-gradient(to bottom, ${accentHex} 1px, transparent 1px)
            `,
            backgroundSize: '64px 64px, 64px 64px, 64px 64px',
          }}
        />
      )}

      {settings.wallpaper === 'starfield' && (
        <div
          className="absolute inset-0 opacity-[0.25]"
          style={{
            backgroundImage: `
              radial-gradient(1px 1px at 20px 30px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(1.5px 1.5px at 100px 150px, ${accentHex}, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 220px 80px, #ffffff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 300px 240px, ${accentHex}, rgba(0,0,0,0))
            `,
            backgroundSize: '350px 350px',
          }}
        />
      )}

      {settings.wallpaper === 'mesh' && (
        <div
          className="absolute inset-0 opacity-[0.18]"
          style={{
            background: `radial-gradient(circle at 15% 20%, ${accentHex}30 0%, transparent 40%), radial-gradient(circle at 85% 80%, #6366f125 0%, transparent 45%)`,
          }}
        />
      )}

      {/* Custom Uploaded Animated Video / GIF Loop Canvas */}
      {settings.motion === 'custom-video' && settings.customVideoUrl && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {settings.customVideoUrl.endsWith('.gif') || settings.customVideoName?.toLowerCase().endsWith('.gif') ? (
            <img
              src={settings.customVideoUrl}
              alt="Uploaded Motion Canvas"
              className={`w-full h-full ${settings.videoFit === 'contain' ? 'object-contain' : 'object-cover'} transition-all duration-500`}
              style={{
                opacity: settings.videoOpacity ?? 0.28,
                transform: settings.removeWatermark !== false ? 'scale(1.09)' : 'scale(1)',
                filter: settings.blur === 'subtle' ? 'blur(3px)' : settings.blur === 'medium' ? 'blur(6px)' : settings.blur === 'ultra' ? 'blur(12px)' : 'none',
              }}
            />
          ) : (
            <video
              key={settings.customVideoUrl}
              src={settings.customVideoUrl}
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full ${settings.videoFit === 'contain' ? 'object-contain' : 'object-cover'} transition-all duration-500`}
              style={{
                opacity: settings.videoOpacity ?? 0.28,
                transform: settings.removeWatermark !== false ? 'scale(1.09)' : 'scale(1)',
                filter: settings.blur === 'subtle' ? 'blur(3px)' : settings.blur === 'medium' ? 'blur(6px)' : settings.blur === 'ultra' ? 'blur(12px)' : 'none',
              }}
            />
          )}

          {/* Center Watermark Concealer & Portal Horizon Blend */}
          {settings.removeWatermark !== false && (
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `
                  radial-gradient(ellipse 260px 130px at center, rgba(0, 242, 254, 0.45) 0%, rgba(224, 36, 195, 0.35) 45%, transparent 75%),
                  radial-gradient(circle 80px at center, rgba(255, 255, 255, 0.6) 0%, transparent 80%)
                `,
                mixBlendMode: 'screen',
              }}
            />
          )}

          {/* Subtle contrast grading overlay to keep text 100% readable */}
          <div
            className="absolute inset-0"
            style={{
              background: `radial-gradient(ellipse at center, transparent 25%, ${activeBg} 92%)`,
            }}
          />
        </div>
      )}

      {/* Dynamic Animated Motion Canvas (for canvas based particles, matrix rain, ambient glow) */}
      {settings.motion !== 'static' && settings.motion !== 'custom-video' && (
        <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
      )}
    </div>
  );
};
