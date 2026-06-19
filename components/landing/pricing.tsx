import Link from "next/link";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";
import { cn } from "@/lib/utils";

const PLANS = [
  {
    name: "Starter",
    price: "$29",
    period: "/mo",
    desc: "For small shops getting started.",
    features: [
      "1 WhatsApp number",
      "Up to 1,000 messages/mo",
      "RAG knowledge base (50 docs)",
      "Browser demo widget",
      "Email support",
    ],
    cta: "Start free trial",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$79",
    period: "/mo",
    desc: "For growing teams that need scale.",
    features: [
      "3 WhatsApp numbers",
      "Up to 10,000 messages/mo",
      "Unlimited knowledge documents",
      "Analytics dashboard",
      "Priority support",
    ],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    period: "",
    desc: "For high-volume and custom needs.",
    features: [
      "Unlimited WhatsApp numbers",
      "Unlimited messages",
      "Custom model fine-tuning",
      "SSO & audit logs",
      "Dedicated success manager",
    ],
    cta: "Contact sales",
    highlighted: false,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="border-t border-white/5 py-24">
      <div className="container">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted">
            Start free. Scale when you&apos;re ready. Cancel anytime.
          </p>
        </Reveal>

        <div className="mt-16 grid items-stretch gap-6 lg:grid-cols-3">
          {PLANS.map((plan, i) => (
            <Reveal key={plan.name} delay={i * 0.1} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-card p-8 transition-all",
                  plan.highlighted
                    ? "border-whatsapp shadow-[0_0_50px_-12px_rgba(37,211,102,0.4)]"
                    : "border-border hover:border-white/20",
                )}
              >
                {plan.highlighted && (
                  <Badge
                    variant="green"
                    className="absolute -top-3 left-1/2 -translate-x-1/2 bg-whatsapp text-black"
                  >
                    Most Popular
                  </Badge>
                )}

                <h3 className="text-lg font-semibold">{plan.name}</h3>
                <p className="mt-1 text-sm text-muted">{plan.desc}</p>

                <div className="mt-6 flex items-end gap-1">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="mb-1 text-muted">{plan.period}</span>
                </div>

                <ul className="mt-8 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 text-sm">
                      <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-whatsapp/15">
                        <Check className="h-3 w-3 text-whatsapp" />
                      </span>
                      <span className="text-white/90">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  className="mt-8 w-full"
                  variant={plan.highlighted ? "primary" : "dark"}
                >
                  <Link href="/demo">{plan.cta}</Link>
                </Button>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
