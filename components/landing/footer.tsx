import Link from "next/link";
import { Zap } from "lucide-react";

export function Footer() {
  return (
    <footer id="docs" className="border-t border-white/5 bg-card/30">
      <div className="container py-16">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-whatsapp/15">
                <Zap className="h-5 w-5 fill-whatsapp text-whatsapp" />
              </span>
              <span className="text-lg font-bold tracking-tight">
                Quick<span className="text-whatsapp">Reply</span>
              </span>
            </Link>
            <p className="mt-4 max-w-sm text-sm text-muted">
              AI-powered WhatsApp support that answers customer questions 24/7,
              trained on your business knowledge in minutes.
            </p>
          </div>

          <div className="flex flex-col gap-3 md:items-end">
            <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
              <a
                href="https://github.com/ahmeraftab/quickreply-ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-white"
              >
                GitHub
              </a>
              <Link
                href="/demo"
                className="text-muted transition-colors hover:text-white"
              >
                Live Demo
              </Link>
              <a
                href="mailto:support@kickvault.com"
                className="text-muted transition-colors hover:text-white"
              >
                Contact
              </a>
            </div>
            <p className="mt-2 text-sm text-muted">
              Built by{" "}
              <a
                href="https://www.upwork.com/freelancers/ahmeraftab"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-whatsapp hover:underline"
              >
                Ahmer Aftab
              </a>
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-white/5 pt-6 text-center text-xs text-muted">
          © 2025 QuickReply AI. Built as a portfolio project.
        </div>
      </div>
    </footer>
  );
}
