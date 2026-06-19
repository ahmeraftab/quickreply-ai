"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Lock, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dashboard } from "@/components/admin/dashboard";

const PASSWORD = "kickvault2024";
const STORAGE_KEY = "kickvault-admin-auth";

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") setAuthed(true);
    setReady(true);
  }, []);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value === PASSWORD) {
      sessionStorage.setItem(STORAGE_KEY, "1");
      setAuthed(true);
      setError(false);
    } else {
      setError(true);
    }
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setAuthed(false);
    setValue("");
  };

  if (!ready) return null;

  if (authed) return <Dashboard onLogout={logout} />;

  return (
    <main className="flex min-h-screen items-center justify-center bg-green-glow px-6">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex items-center justify-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-whatsapp/15">
            <Zap className="h-5 w-5 fill-whatsapp text-whatsapp" />
          </span>
          <span className="text-lg font-bold tracking-tight">
            Quick<span className="text-whatsapp">Reply</span>
          </span>
        </Link>

        <div className="rounded-2xl border border-border bg-card p-8">
          <div className="mb-6 flex flex-col items-center text-center">
            <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-whatsapp/10">
              <Lock className="h-5 w-5 text-whatsapp" />
            </span>
            <h1 className="text-xl font-semibold">Admin access</h1>
            <p className="mt-1 text-sm text-muted">
              Enter the password to view the dashboard.
            </p>
          </div>

          <form onSubmit={submit} className="space-y-3">
            <Input
              type="password"
              placeholder="Password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              autoFocus
            />
            {error && (
              <p className="text-center text-xs text-red-400">
                Incorrect password. Try again.
              </p>
            )}
            <Button type="submit" className="w-full">
              Unlock dashboard
            </Button>
          </form>

          <p className="mt-6 text-center text-xs text-muted">
            Demo password: <span className="font-mono text-white/70">kickvault2024</span>
          </p>
        </div>
      </div>
    </main>
  );
}
