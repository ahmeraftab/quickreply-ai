"use client";

import { motion } from "framer-motion";
import { CheckCheck, Mic, Paperclip, Phone, Smile, Video } from "lucide-react";

interface MockMessage {
  from: "customer" | "bot";
  text: string;
  time: string;
}

const CONVERSATION: MockMessage[] = [
  {
    from: "customer",
    text: "Hi, do you have the Air Jordan 1 in size 10?",
    time: "10:24",
  },
  {
    from: "bot",
    text: "Hey! 👋 Yes, we have the Air Jordan 1 Retro High OG in size 10 in Chicago, Shadow, and Royal colorways. All priced at $180. Want me to check stock or help you place an order?",
    time: "10:24",
  },
  {
    from: "customer",
    text: "What's your return policy?",
    time: "10:25",
  },
  {
    from: "bot",
    text: "We offer free 30-day returns on all unworn shoes 👟 Just initiate a return from your order confirmation email and we'll send a prepaid label.",
    time: "10:25",
  },
];

export function ChatMockup() {
  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      {/* Soft green radial glow behind the phone */}
      <div
        aria-hidden
        className="pointer-events-none absolute -inset-16 -z-10 blur-2xl"
        style={{
          background:
            "radial-gradient(closest-side, rgba(37,211,102,0.28), rgba(18,140,126,0.12) 55%, transparent 75%)",
        }}
      />

      {/* Phone frame */}
      <div className="overflow-hidden rounded-[2.5rem] border-[10px] border-[#1c1c1e] bg-black shadow-2xl shadow-black/60 ring-1 ring-white/10">
        {/* Notch */}
        <div className="relative flex h-6 items-center justify-center bg-[#075E54]">
          <div className="absolute top-0 h-5 w-32 rounded-b-2xl bg-black" />
        </div>

        {/* WhatsApp header */}
        <div className="flex items-center gap-3 bg-[#075E54] px-3 pb-2.5 pt-1.5 text-white">
          <div className="relative">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-whatsapp text-sm font-bold text-black">
              KV
            </div>
            <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-[#075E54] bg-whatsapp" />
          </div>
          <div className="flex-1 leading-tight">
            <p className="text-sm font-semibold">KickVault Support</p>
            <p className="text-[11px] text-whatsapp">online</p>
          </div>
          <Video className="h-5 w-5 opacity-90" strokeWidth={1.8} />
          <Phone className="h-5 w-5 opacity-90" strokeWidth={1.8} />
        </div>

        {/* Chat area */}
        <div className="whatsapp-wallpaper flex flex-col gap-2 px-3 py-4 min-h-[420px]">
          <div className="mx-auto mb-1 rounded-md bg-[#1f2c33] px-3 py-1 text-[10px] text-white/60">
            TODAY
          </div>
          <div className="mx-auto mb-2 max-w-[80%] rounded-md bg-[#182229] px-3 py-1.5 text-center text-[10px] text-white/50">
            🔒 Messages are end-to-end encrypted
          </div>

          {CONVERSATION.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: 0.6 + i * 0.9,
                duration: 0.4,
                ease: "easeOut",
              }}
              className={`flex ${
                msg.from === "customer" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`relative max-w-[80%] rounded-lg px-2.5 py-1.5 text-[13px] leading-relaxed shadow-sm ${
                  msg.from === "customer"
                    ? "rounded-tr-none bg-[#005C4B] text-white"
                    : "rounded-tl-none bg-[#202C33] text-white"
                }`}
              >
                <p className="pr-12">{msg.text}</p>
                <span className="absolute bottom-1 right-2 flex items-center gap-0.5 text-[10px] text-white/50">
                  {msg.time}
                  {msg.from === "customer" && (
                    <CheckCheck className="h-3.5 w-3.5 text-[#53bdeb]" />
                  )}
                </span>
              </div>
            </motion.div>
          ))}

          {/* Typing indicator that resolves into nothing (atmosphere) */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 1, 0] }}
            transition={{ delay: 0.6 + CONVERSATION.length * 0.9, duration: 1.2 }}
            className="flex justify-start"
          >
            <div className="flex items-center gap-1 rounded-lg rounded-tl-none bg-[#202C33] px-3 py-2.5">
              {[0, 1, 2].map((d) => (
                <span
                  key={d}
                  className="h-1.5 w-1.5 rounded-full bg-white/60 animate-typing-dot"
                  style={{ animationDelay: `${d * 0.2}s` }}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Input bar */}
        <div className="flex items-center gap-2 bg-[#0B141A] px-2 py-2">
          <div className="flex flex-1 items-center gap-2 rounded-full bg-[#202C33] px-3 py-2">
            <Smile className="h-5 w-5 text-white/50" strokeWidth={1.8} />
            <span className="flex-1 text-[13px] text-white/40">
              Type a message
            </span>
            <Paperclip className="h-5 w-5 text-white/50" strokeWidth={1.8} />
          </div>
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-whatsapp">
            <Mic className="h-5 w-5 text-black" strokeWidth={2} />
          </div>
        </div>
      </div>
    </div>
  );
}
