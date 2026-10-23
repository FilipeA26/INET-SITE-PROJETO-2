import { useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

/**
 * "Fiber Optic Eye" guiado pela rolagem (padrão vividmotion): a seção fica presa
 * na tela e, conforme o usuário rola, o olho de fibras abre girando, a íris se
 * expande e revela a logo INET. A pupila acompanha o mouse.
 */
const clamp01 = (x: number) => Math.max(0, Math.min(1, x));
const ease = (x: number) => 1 - Math.pow(1 - clamp01(x), 3);
const easeIn = (x: number) => Math.pow(clamp01(x), 3);

// faixas de progresso da rolagem (0..1)
const SEAM = [0, 0.12];
const OPEN = [0.12, 0.45];
const BURST = [0.55, 0.78];
const range = (p: number, [a, b]: number[]) => (p - a) / (b - a);

export default function EyeSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let w = 0, h = 0, raf = 0;
    const look = { x: 0, y: 0, tx: 0, ty: 0 };

    const strands = Array.from({ length: 240 }, (_, i) => ({
      a: (i / 240) * Math.PI * 2 + Math.random() * 0.03,
      len: 0.7 + Math.random() * 0.3,
      twist: 0.25 + Math.random() * 0.35,
      bright: Math.random(),
    }));

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      look.tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      look.ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
    };

    const almond = (cx: number, cy: number, half: number, lid: number) => {
      ctx.beginPath();
      ctx.moveTo(cx - half, cy);
      ctx.quadraticCurveTo(cx, cy - lid * 2, cx + half, cy);
      ctx.quadraticCurveTo(cx, cy + lid * 2, cx - half, cy);
      ctx.closePath();
    };

    const frame = (now: number) => {
      const t = now / 1000;
      const p = reduce ? 0.5 : scrollYProgress.get();
      look.x += (look.tx - look.x) * 0.06;
      look.y += (look.ty - look.y) * 0.06;

      const cx = w / 2, cy = h / 2;
      const half = Math.min(w * 0.42, 420);
      const R = half * 0.5;
      const seam = ease(range(p, SEAM));
      const open = ease(range(p, OPEN));
      const burst = easeIn(range(p, BURST));
      const lid = R * 1.05 * open + burst * Math.max(w, h);
      const rot = t * 0.35 + p * 4; // gira sozinho e acelera com a rolagem
      const scale = 1 + burst * 3;
      const fade = 1 - burst;
      // a íris olha na direção do mouse
      const ix = cx + look.x * R * 0.35 * open * fade;
      const iy = cy + look.y * R * 0.2 * open * fade;

      ctx.clearRect(0, 0, w, h);

      ctx.save();
      almond(cx, cy, half * (1 + burst * 2), lid);
      ctx.clip();
      ctx.globalCompositeOperation = "lighter";
      const pupil = R * (0.28 + burst * 0.6);
      for (const s of strands) {
        const r1 = R * s.len * scale;
        const a0 = s.a + rot, a1 = a0 + s.twist, am = a0 + s.twist * 0.4;
        const x0 = ix + Math.cos(a0) * pupil, y0 = iy + Math.sin(a0) * pupil;
        const xm = ix + Math.cos(am) * (pupil + r1) * 0.5, ym = iy + Math.sin(am) * (pupil + r1) * 0.5;
        const x1 = ix + Math.cos(a1) * r1, y1 = iy + Math.sin(a1) * r1;
        const g = ctx.createLinearGradient(x0, y0, x1, y1);
        g.addColorStop(0, `rgba(112,224,0,${0.9 * fade})`);
        g.addColorStop(0.35, `rgba(0,98,236,${0.55 * fade})`);
        g.addColorStop(1, `rgba(140,180,255,${0.15 * fade})`);
        ctx.strokeStyle = g;
        ctx.lineWidth = s.bright > 0.8 ? 1.6 : 0.8;
        ctx.beginPath();
        ctx.moveTo(x0, y0);
        ctx.quadraticCurveTo(xm, ym, x1, y1);
        ctx.stroke();
        if (s.bright > 0.55) {
          const tr = 2 + s.bright * 3;
          const tg = ctx.createRadialGradient(x1, y1, 0, x1, y1, tr * 3);
          tg.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`);
          tg.addColorStop(0.4, `rgba(112,224,0,${0.4 * fade})`);
          tg.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = tg;
          ctx.fillRect(x1 - tr * 3, y1 - tr * 3, tr * 6, tr * 6);
        }
      }
      const pg = ctx.createRadialGradient(ix, iy, 0, ix, iy, pupil * (1.6 + burst * 1.2));
      pg.addColorStop(0, `rgba(220,255,180,${0.35 - burst * 0.15})`);
      pg.addColorStop(0.5, `rgba(112,224,0,${0.12 - burst * 0.04})`);
      pg.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = pg;
      ctx.fillRect(0, 0, w, h);
      ctx.restore();

      // pálpebras de fibra
      if (fade > 0.01 && seam > 0.001) {
        ctx.save();
        ctx.globalCompositeOperation = "lighter";
        ctx.shadowColor = "#70E000";
        ctx.shadowBlur = 18;
        for (let k = 0; k < 3; k++) {
          ctx.globalAlpha = fade * (k === 0 ? 1 : 0.35);
          ctx.strokeStyle = k === 0 ? "#B6FF6A" : "#70E000";
          ctx.lineWidth = k === 0 ? 2 : 1;
          almond(cx, cy, half * seam * (1 + burst * 2) + k * 10, lid + k * 6);
          ctx.stroke();
        }
        ctx.restore();
      }

      raf = requestAnimationFrame(frame);
    };

    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onMove);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
    };
  }, [scrollYProgress]);

  return (
    <section ref={sectionRef} className="relative h-[320vh] px-3 sm:px-5">
      <div className="sticky top-20 h-[calc(100svh-5.5rem)] overflow-hidden rounded-[2rem] bg-[radial-gradient(ellipse_at_center,#03256C_0%,#020F2E_55%,#010818_100%)] sm:rounded-[2.5rem]">
        <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />

        <Caption progress={scrollYProgress} range={[0.0, 0.08, 0.3, 0.4]} className="top-[10%]">
          <span className="eyebrow">Fibra óptica INET</span>
          <h2 className="mt-3 font-display text-4xl font-extrabold italic text-white sm:text-6xl">Abra os olhos para a internet.</h2>
        </Caption>

        <Caption progress={scrollYProgress} range={[0.32, 0.4, 0.52, 0.6]} className="bottom-[8%]">
          <p className="mx-auto max-w-xl text-lg text-white/80 sm:text-xl">
            Milhares de fios de vidro levando dados na velocidade da luz até a sua casa.
          </p>
        </Caption>

        <LogoReveal progress={scrollYProgress} />
      </div>
    </section>
  );
}

function Caption({
  progress,
  range,
  className,
  children,
}: {
  progress: MotionValue<number>;
  range: [number, number, number, number];
  className: string;
  children: ReactNode;
}) {
  const opacity = useTransform(progress, range, [0, 1, 1, 0]);
  const y = useTransform(progress, range, [30, 0, 0, -30]);
  return (
    <motion.div style={{ opacity, y }} className={`pointer-events-none absolute inset-x-0 px-6 text-center ${className}`}>
      {children}
    </motion.div>
  );
}

function LogoReveal({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0.66, 0.8], [0, 1]);
  const scale = useTransform(progress, [0.66, 0.85], [0.6, 1]);
  const blur = useTransform(progress, [0.66, 0.82], [12, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px) drop-shadow(0 0 40px rgba(112,224,0,0.45))`);
  const textOpacity = useTransform(progress, [0.82, 0.92], [0, 1]);
  return (
    <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center px-6 text-center">
      <motion.img style={{ opacity, scale, filter }} src="/inet-logo-branca.png" alt="INET" className="w-[min(70vw,420px)]" />
      <motion.p style={{ opacity: textOpacity }} className="mt-8 font-display text-2xl font-bold italic text-white sm:text-3xl">
        Internet Fibra Óptica
      </motion.p>
    </div>
  );
}
