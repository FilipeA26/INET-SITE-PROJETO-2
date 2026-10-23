import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import FiberTrail from "./FiberTrail";

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

        <div className="pointer-events-none relative flex min-h-[calc(100svh-6rem)] items-center px-6 py-20 sm:px-12 lg:px-16">
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
        </div>
      </div>
    </section>
  );
}
