import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/landing/reveal";

export function DemoCta() {
  return (
    <section className="py-12">
      <div className="container">
        <Reveal>
          <div className="gradient-border relative overflow-hidden rounded-3xl px-8 py-16 text-center md:px-16">
            <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-whatsapp/10 blur-3xl" />
            <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-whatsapp-dark/10 blur-3xl" />

            <div className="relative">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                See it working right now
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-muted">
                Try the KickVault demo — ask about products, shipping, returns,
                or store hours and watch the AI answer in real time.
              </p>
              <div className="mt-8">
                <Button asChild size="lg">
                  <Link href="/demo">
                    Open Live Demo
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
