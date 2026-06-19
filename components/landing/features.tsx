import { BarChart3, Brain, Zap } from "lucide-react";
import { Reveal } from "@/components/landing/reveal";

const FEATURES = [
  {
    icon: Zap,
    title: "Instant Responses",
    desc: "Replies in under 2 seconds using RAG — no hallucinations, only answers from your knowledge base.",
  },
  {
    icon: Brain,
    title: "Trained on Your Business",
    desc: "Upload your FAQs, product catalog, and policies. The AI learns your business in minutes.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track conversations, popular questions, and response accuracy from a clean dashboard.",
  },
];

export function Features() {
  return (
    <section id="features" className="border-t border-white/5 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Everything your support team wishes it had
          </h2>
          <p className="mt-4 text-muted">
            Built for businesses that want to delight customers without scaling
            headcount.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.1}>
              <div className="group h-full rounded-2xl border border-border bg-card p-8 transition-all hover:-translate-y-1 hover:border-whatsapp/40 hover:shadow-[0_20px_60px_-20px_rgba(37,211,102,0.3)]">
                <f.icon
                  className="mb-6 h-8 w-8 text-whatsapp"
                  strokeWidth={1.75}
                />
                <h3 className="text-xl font-semibold">{f.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {f.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
