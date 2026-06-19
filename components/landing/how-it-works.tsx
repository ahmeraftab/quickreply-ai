import { Reveal } from "@/components/landing/reveal";

const STEPS = [
  {
    n: "1",
    title: "Connect WhatsApp",
    desc: "Connect your WhatsApp Business number via Twilio in a few clicks.",
  },
  {
    n: "2",
    title: "Upload your knowledge",
    desc: "Upload your business knowledge base — FAQs, catalog, and policies.",
  },
  {
    n: "3",
    title: "Go live",
    desc: "Your AI assistant goes live — customers get instant, accurate answers.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="border-t border-white/5 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Live in three steps
          </h2>
          <p className="mt-4 text-muted">
            No engineering team required. Go from zero to an always-on assistant
            in an afternoon.
          </p>
        </Reveal>

        <div className="relative mt-16">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-whatsapp/40 to-transparent md:block" />

          <div className="grid gap-10 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Reveal key={step.n} delay={i * 0.12} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-whatsapp/40 bg-background text-xl font-bold text-whatsapp shadow-[0_0_30px_-5px_rgba(37,211,102,0.5)]">
                    {step.n}
                  </div>
                  <h3 className="mt-6 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 max-w-xs text-sm text-muted">{step.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
