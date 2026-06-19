"use client";

import Link from "next/link";
import { ArrowLeft, Boxes, Clock, Sparkles } from "lucide-react";

interface SidebarProps {
  onAskQuestion: (q: string) => void;
  suggestions: string[];
}

const STATS = [
  { icon: Clock, label: "Avg response", value: "1.1s" },
  { icon: Boxes, label: "Knowledge chunks", value: "20" },
  { icon: Sparkles, label: "Model", value: "Gemini 2.5 Flash" },
];

export function Sidebar({ onAskQuestion, suggestions }: SidebarProps) {
  return (
    <aside className="hidden w-80 shrink-0 flex-col border-r border-border bg-card/40 p-6 lg:flex">
      <Link
        href="/"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-white"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to site
      </Link>

      {/* Brand */}
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-whatsapp text-lg font-bold text-black">
          KV
        </div>
        <div>
          <p className="text-lg font-bold tracking-tight">KickVault</p>
          <p className="flex items-center gap-1.5 text-xs text-whatsapp">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-whatsapp opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-whatsapp" />
            </span>
            AI Support Assistant
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-8 space-y-3">
        {STATS.map((s) => (
          <div
            key={s.label}
            className="flex items-center gap-3 rounded-xl border border-border bg-background/60 px-4 py-3"
          >
            <s.icon className="h-4 w-4 text-whatsapp" />
            <div className="flex flex-1 items-center justify-between">
              <span className="text-xs text-muted">{s.label}</span>
              <span className="text-sm font-semibold">{s.value}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Suggested questions */}
      <div className="mt-8">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted">
          Try asking
        </p>
        <div className="space-y-2">
          {suggestions.map((q) => (
            <button
              key={q}
              onClick={() => onAskQuestion(q)}
              className="w-full rounded-xl border border-border bg-background/60 px-4 py-2.5 text-left text-sm text-white/90 transition-all hover:border-whatsapp/40 hover:bg-whatsapp/5"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      <p className="mt-auto pt-8 text-xs text-muted">
        Demo knowledge base: a fictional NYC sneaker store. Responses are
        generated live via RAG.
      </p>
    </aside>
  );
}
