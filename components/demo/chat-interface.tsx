"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCheck, Paperclip, Send, Smile } from "lucide-react";
import type { ChatMessage } from "@/lib/rag";

interface DisplayMessage extends ChatMessage {
  id: string;
  time: string;
  pending?: boolean;
}

const SUGGESTED = [
  "Do you have Nike Air Max 90 in size 9?",
  "What's your return policy?",
  "How long does shipping take?",
  "What payment methods do you accept?",
  "Are there any current discounts?",
];

function now(): string {
  return new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

let idCounter = 0;
const nextId = () => `m${idCounter++}`;

interface ChatInterfaceProps {
  externalQuestion?: string | null;
  onConsumeQuestion?: () => void;
}

export function ChatInterface({
  externalQuestion,
  onConsumeQuestion,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<DisplayMessage[]>([
    {
      id: nextId(),
      role: "assistant",
      content:
        "Hey there! 👋 Welcome to KickVault Support. Ask me about our sneakers, sizing, shipping, returns, or store hours — I'm here 24/7!",
      time: now(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  };

  useEffect(scrollToBottom, [messages, isTyping]);

  const send = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const history: ChatMessage[] = messages
      .filter((m) => !m.pending)
      .map((m) => ({ role: m.role, content: m.content }));

    const userMsg: DisplayMessage = {
      id: nextId(),
      role: "user",
      content: trimmed,
      time: now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    const botId = nextId();

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history }),
      });

      if (!res.ok || !res.body) {
        const data = (await res.json().catch(() => null)) as {
          error?: string;
        } | null;
        throw new Error(data?.error ?? "Request failed");
      }

      // First token arrived — swap typing indicator for a streaming bubble.
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { id: botId, role: "assistant", content: "", time: now() },
      ]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let acc = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        acc += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === botId ? { ...m, content: acc } : m)),
        );
      }
    } catch (err) {
      setIsTyping(false);
      const detail = err instanceof Error ? err.message : "Something went wrong";
      setMessages((prev) => [
        ...prev,
        {
          id: botId,
          role: "assistant",
          content:
            `⚠️ ${detail}. ` +
            "If you're running this locally, make sure GEMINI_API_KEY is set in your environment.",
          time: now(),
        },
      ]);
    }
  };

  // Handle a question clicked in the sidebar.
  useEffect(() => {
    if (externalQuestion) {
      void send(externalQuestion);
      onConsumeQuestion?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [externalQuestion]);

  const showSuggestions = messages.length <= 1 && !isTyping;

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-none md:rounded-2xl md:border md:border-border">
      {/* Header */}
      <div className="flex items-center gap-3 bg-[#075E54] px-4 py-3 text-white">
        <div className="relative">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-sm font-bold text-black">
            KV
          </div>
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54] bg-whatsapp" />
        </div>
        <div className="flex-1 leading-tight">
          <p className="text-sm font-semibold">KickVault Support</p>
          <p className="flex items-center gap-1.5 text-[11px] text-whatsapp">
            <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" />
            online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="whatsapp-wallpaper scrollbar-thin flex-1 space-y-2 overflow-y-auto px-4 py-4"
      >
        <div className="mx-auto mb-2 w-fit rounded-md bg-[#182229] px-3 py-1.5 text-center text-[10px] text-white/50">
          🔒 This is a demo. Messages are answered by AI from the KickVault
          knowledge base.
        </div>

        {messages.map((msg) => (
          <motion.div
            key={msg.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`relative max-w-[78%] whitespace-pre-wrap rounded-lg px-2.5 py-1.5 text-[13.5px] leading-relaxed shadow-sm ${
                msg.role === "user"
                  ? "rounded-tr-none bg-[#005C4B] text-white"
                  : "rounded-tl-none bg-[#202C33] text-white"
              }`}
            >
              <p className="pr-12">
                {msg.content || (
                  <span className="text-white/40">…</span>
                )}
              </p>
              <span className="absolute bottom-1 right-2 flex items-center gap-0.5 text-[10px] text-white/50">
                {msg.time}
                {msg.role === "user" && (
                  <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
                )}
              </span>
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        <AnimatePresence>
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex justify-start"
            >
              <div className="flex items-center gap-1 rounded-lg rounded-tl-none bg-[#202C33] px-3 py-2.5">
                <span className="mr-1 text-[10px] text-white/50">typing</span>
                {[0, 1, 2].map((d) => (
                  <span
                    key={d}
                    className="h-1.5 w-1.5 rounded-full bg-white/60 animate-typing-dot"
                    style={{ animationDelay: `${d * 0.2}s` }}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggested questions */}
        {showSuggestions && (
          <div className="flex flex-col items-end gap-2 pt-2">
            {SUGGESTED.map((q) => (
              <button
                key={q}
                onClick={() => void send(q)}
                className="rounded-full border border-whatsapp/40 bg-[#005C4B]/30 px-3 py-1.5 text-right text-xs text-white transition-colors hover:bg-[#005C4B]/60"
              >
                {q}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Input bar */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void send(input);
        }}
        className="flex items-center gap-2 bg-[#0B141A] px-2 py-2"
      >
        <div className="flex flex-1 items-center gap-2 rounded-full bg-[#202C33] px-3 py-2">
          <button
            type="button"
            disabled
            className="cursor-not-allowed text-white/40"
            aria-label="Emoji (disabled in demo)"
          >
            <Smile className="h-5 w-5" strokeWidth={1.8} />
          </button>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message"
            className="flex-1 bg-transparent text-[13.5px] text-white placeholder:text-white/40 focus:outline-none"
          />
          <button
            type="button"
            disabled
            className="cursor-not-allowed text-white/40"
            aria-label="Attach (disabled in demo)"
          >
            <Paperclip className="h-5 w-5" strokeWidth={1.8} />
          </button>
        </div>
        <button
          type="submit"
          disabled={!input.trim() || isTyping}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp transition-opacity disabled:opacity-50"
          aria-label="Send"
        >
          <Send className="h-5 w-5 text-black" strokeWidth={2} />
        </button>
      </form>
    </div>
  );
}

export { SUGGESTED };
