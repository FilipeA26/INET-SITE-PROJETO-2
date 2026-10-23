import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, Home, Building2 } from "lucide-react";
import Reveal from "./Reveal";
import { waLink } from "../lib";

// Valores provisórios — trocar pelos planos reais da INET
const catalog = {
  residencial: [
    { speed: "400", unit: "Mega", price: "89,90", perks: ["Wi-Fi 6", "Instalação grátis", "Sem franquia"] },
    { speed: "600", unit: "Mega", price: "109,90", perks: ["Wi-Fi 6", "Instalação grátis", "Sem franquia", "Streaming incluso"], featured: true },
    { speed: "1", unit: "Giga", price: "149,90", perks: ["Wi-Fi 6 mesh", "Instalação grátis", "Sem franquia", "Suporte VIP"] },
  ],
  empresarial: [
    { speed: "500", unit: "Mega", price: "149,90", perks: ["IP fixo", "SLA de atendimento", "Wi-Fi 6"] },
    { speed: "800", unit: "Mega", price: "199,90", perks: ["IP fixo", "SLA prioritário", "Wi-Fi 6 mesh", "Link redundante"], featured: true },
    { speed: "1", unit: "Giga", price: "299,90", perks: ["IP fixo", "SLA 4h", "Link dedicado", "Gerente de conta"] },
  ],
};
type Kind = keyof typeof catalog;

export default function Plans() {
  const [kind, setKind] = useState<Kind>("residencial");

  return (
    <section id="planos" className="bg-[#F4F7FC] py-24">
      <div className="container-x">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Planos</p>
            <h2 className="section-title mt-3 max-w-xl">O plano certo para cada conexão.</h2>
          </div>
          <div className="inline-flex rounded-full bg-white p-1 shadow-sm" role="tablist">
            {([["residencial", Home, "Residencial"], ["empresarial", Building2, "Empresarial"]] as const).map(([k, Icon, label]) => (
              <button
                key={k}
                role="tab"
                aria-selected={kind === k}
                onClick={() => setKind(k)}
                className={`inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition ${kind === k ? "bg-navy text-white" : "text-navy/70 hover:text-navy"}`}
              >
                <Icon size={16} /> {label}
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence mode="wait">
          <motion.div
            key={kind}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.35 }}
            className="mt-12 grid gap-6 md:grid-cols-3"
          >
            {catalog[kind].map((p) => (
              <article
                key={p.speed + p.unit}
                className={`relative flex flex-col overflow-hidden rounded-3xl p-8 transition hover:-translate-y-1 ${
                  p.featured ? "bg-navy text-white shadow-[0_30px_60px_-25px_rgba(3,37,108,0.8)]" : "card"
                }`}
              >
                {p.featured && (
                  <>
                    <span className="absolute right-6 top-6 rounded-full bg-lime px-3 py-1 text-xs font-bold text-navy">Mais escolhido</span>
                    <div className="pointer-events-none absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-electric/40 blur-3xl" />
                  </>
                )}
                <p className="font-display text-6xl font-extrabold italic leading-none">
                  {p.speed}
                  <span className={`ml-1 text-2xl ${p.featured ? "text-lime" : "text-leaf"}`}>{p.unit}</span>
                </p>
                <p className={`mt-8 text-sm ${p.featured ? "text-white/60" : "text-navy/50"}`}>a partir de</p>
                <p className="font-display text-4xl font-bold">
                  R$ {p.price}
                  <span className={`text-base font-normal ${p.featured ? "text-white/60" : "text-navy/50"}`}>/mês</span>
                </p>
                <ul className="relative mt-8 flex-1 space-y-3 text-sm">
                  {p.perks.map((perk) => (
                    <li key={perk} className="flex items-center gap-3">
                      <span className={`flex h-5 w-5 items-center justify-center rounded-full ${p.featured ? "bg-lime text-navy" : "bg-lime/20 text-forest"}`}>
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {perk}
                    </li>
                  ))}
                </ul>
                <a
                  href={waLink(`Olá! Quero o plano ${kind} de ${p.speed} ${p.unit} da INET.`)}
                  target="_blank"
                  rel="noreferrer"
                  className={`relative mt-10 ${p.featured ? "btn-primary" : "btn-navy"}`}
                >
                  Quero esse
                </a>
              </article>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
