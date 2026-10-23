import Reveal from "./Reveal";

// Números provisórios — confirmar com a INET
const stats = [
  ["+10 mil", "clientes conectados"],
  ["99,9%", "de disponibilidade"],
  ["24h", "de suporte técnico"],
  ["100%", "rede em fibra óptica"],
];

export default function Stats() {
  return (
    <section className="container-x py-16">
      <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
        {stats.map(([n, label], i) => (
          <Reveal key={label} delay={i * 0.06} className="border-l-2 border-lime pl-5">
            <p className="font-display text-4xl font-extrabold italic text-navy sm:text-5xl">{n}</p>
            <p className="mt-1 text-sm text-navy/60">{label}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
