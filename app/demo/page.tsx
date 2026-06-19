"use client";

import { useState } from "react";
import { ChatInterface, SUGGESTED } from "@/components/demo/chat-interface";
import { Sidebar } from "@/components/demo/sidebar";

export default function DemoPage() {
  const [question, setQuestion] = useState<string | null>(null);

  return (
    <main className="flex h-screen overflow-hidden bg-background">
      <Sidebar onAskQuestion={setQuestion} suggestions={SUGGESTED} />
      <div className="flex-1">
        <div className="mx-auto h-full max-w-3xl md:py-6">
          <ChatInterface
            externalQuestion={question}
            onConsumeQuestion={() => setQuestion(null)}
          />
        </div>
      </div>
    </main>
  );
}
