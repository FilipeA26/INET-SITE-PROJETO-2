import { motion } from "framer-motion";
import { ArrowRight, Gauge, ArrowDown, ArrowUp } from "lucide-react";
import FiberTrail from "./FiberTrail";
import Orbit from "./Orbit";

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay },
});

export default function Hero() {
  return (
    <section id="inicio" className="px-3 pt-2 sm:px-5">
      <div className="relative isolate overflow-hidden rounded-[2rem] bg-navy-ink sm:rounded-[2.5rem]">
        {/* foto das fibras + gradientes da marca */}
        <img src="/fibras.png" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-navy via-navy/85 to-navy/20" />
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-gradient-to-t from-navy/90 to-transparent" />
        <FiberTrail className="absolute inset-0 h-full w-full" />

        <div className="pointer-events-none relative grid min-h-[calc(100svh-6rem)] items-center gap-12 px-6 py-20 sm:px-12 lg:grid-cols-[1.2fr_0.8fr] lg:px-16">
          <div>
            <motion.span {...rise(0)} className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white backdrop-blur">
              <span className="h-2 w-2 animate-pulse rounded-full bg-lime" /> Internet 100% fibra óptica
            </motion.span>
            <motion.h1 {...rise(0.1)} className="mt-6 max-w-3xl text-5xl font-extrabold italic leading-[0.95] text-white sm:text-7xl">
              A velocidade da luz chegou à sua casa.
            </motion.h1>
            <motion.p {...rise(0.25)} className="mt-6 max-w-lg text-lg text-white/75">
              Conexão estável para trabalhar, estudar, jogar e assistir — com o suporte de quem está pertinho de você.
            </motion.p>
            <motion.div {...rise(0.4)} className="pointer-events-auto mt-10 flex flex-wrap gap-4">
              <a href="#planos" className="btn-primary">
                Conheça os planos <ArrowRight size={18} />
              </a>
              <a href="#duvidas" className="btn-outline-light">
                Tirar dúvidas
              </a>
            </motion.div>
          </div>

          {/* cartão "medidor" */}
          <motion.div {...rise(0.55)} className="pointer-events-auto relative mx-auto w-full max-w-sm">
            <Orbit className="absolute -left-16 -top-16 w-[140%] opacity-80" />
            <div className="relative rounded-3xl border border-white/15 bg-white/10 p-7 text-white backdrop-blur-xl">
              <div className="flex items-center justify-between text-sm text-white/70">
                <span className="inline-flex items-center gap-2"><Gauge size={16} className="text-lime" /> Seu plano INET</span>
                <span className="rounded-full bg-lime/20 px-2 py-0.5 text-xs font-semibold text-lime">online</span>
              </div>
              <p className="mt-6 font-display text-7xl font-extrabold italic leading-none">
                1<span className="ml-1 text-3xl text-lime">Giga</span>
              </p>
              <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                <motion.div initial={{ width: 0 }} animate={{ width: "92%" }} transition={{ duration: 2, delay: 0.8, ease: "easeOut" }} className="h-full rounded-full bg-gradient-to-r from-electric to-lime" />
              </div>
              <div className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="inline-flex items-center gap-1 text-white/60"><ArrowDown size={14} /> Download</p>
                  <p className="mt-1 font-display text-2xl font-bold">940 Mb</p>
                </div>
                <div className="rounded-2xl bg-white/10 p-4">
                  <p className="inline-flex items-center gap-1 text-white/60"><ArrowUp size={14} /> Upload</p>
                  <p className="mt-1 font-display text-2xl font-bold">480 Mb</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
