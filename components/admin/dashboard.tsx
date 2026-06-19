"use client";

import {
  Activity,
  CheckCircle2,
  Clock,
  MessageSquare,
  Users,
} from "lucide-react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const KPIS = [
  { icon: MessageSquare, label: "Messages Today", value: "247", trend: "+12%" },
  { icon: Clock, label: "Avg Response Time", value: "1.1s", trend: "-0.2s" },
  { icon: CheckCircle2, label: "Resolution Rate", value: "91%", trend: "+3%" },
  { icon: Users, label: "Active Users", value: "34", trend: "+8" },
];

const MESSAGES_OVER_TIME = [
  { day: "Mon", messages: 182 },
  { day: "Tue", messages: 210 },
  { day: "Wed", messages: 198 },
  { day: "Thu", messages: 264 },
  { day: "Fri", messages: 312 },
  { day: "Sat", messages: 289 },
  { day: "Sun", messages: 247 },
];

const CATEGORIES = [
  { name: "Products", value: 124 },
  { name: "Shipping", value: 86 },
  { name: "Returns", value: 64 },
  { name: "Payments", value: 41 },
  { name: "Other", value: 29 },
];

interface Conversation {
  time: string;
  number: string;
  message: string;
  status: "Resolved" | "Active" | "Escalated";
}

const CONVERSATIONS: Conversation[] = [
  { time: "10:42", number: "+1-XXX-XXX-4521", message: "Do you have AJ1 in size 10?", status: "Resolved" },
  { time: "10:39", number: "+1-XXX-XXX-8830", message: "What's your return policy?", status: "Resolved" },
  { time: "10:31", number: "+1-XXX-XXX-1107", message: "Is the Yeezy Zebra in stock?", status: "Active" },
  { time: "10:24", number: "+1-XXX-XXX-7745", message: "How long does shipping take?", status: "Resolved" },
  { time: "10:18", number: "+1-XXX-XXX-2093", message: "Do you accept Klarna?", status: "Resolved" },
  { time: "10:05", number: "+1-XXX-XXX-5512", message: "Can I get a refund after 40 days?", status: "Escalated" },
  { time: "09:57", number: "+1-XXX-XXX-3388", message: "Any discount on New Balance?", status: "Resolved" },
  { time: "09:48", number: "+1-XXX-XXX-9001", message: "What are your store hours?", status: "Resolved" },
];

const statusStyles: Record<Conversation["status"], string> = {
  Resolved: "bg-whatsapp/15 text-whatsapp border border-whatsapp/30",
  Active: "bg-blue-500/15 text-blue-300 border border-blue-500/30",
  Escalated: "bg-amber-500/15 text-amber-300 border border-amber-500/30",
};

function ChartTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: { value: number }[];
  label?: string;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-lg">
      <p className="text-muted">{label}</p>
      <p className="font-semibold text-whatsapp">{payload[0]?.value} messages</p>
    </div>
  );
}

export function Dashboard({ onLogout }: { onLogout: () => void }) {
  return (
    <div className="min-h-screen bg-background">
      {/* Top bar */}
      <header className="border-b border-border bg-card/40">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="h-5 w-5 text-whatsapp" />
            <span className="font-semibold">KickVault Admin</span>
            <Badge variant="green" className="ml-2">
              Live
            </Badge>
          </div>
          <button
            onClick={onLogout}
            className="text-sm text-muted transition-colors hover:text-white"
          >
            Sign out
          </button>
        </div>
      </header>

      <div className="container space-y-8 py-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted">
            Overview of your WhatsApp support performance.
          </p>
        </div>

        {/* KPI cards */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {KPIS.map((kpi) => (
            <Card key={kpi.label} className="p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-whatsapp/10">
                  <kpi.icon className="h-4 w-4 text-whatsapp" />
                </span>
                <span className="text-xs font-medium text-whatsapp">
                  {kpi.trend}
                </span>
              </div>
              <p className="mt-4 text-2xl font-bold">{kpi.value}</p>
              <p className="text-sm text-muted">{kpi.label}</p>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="p-6">
            <h2 className="mb-6 text-sm font-semibold">Messages Over Time</h2>
            <ResponsiveContainer width="100%" height={260}>
              <LineChart data={MESSAGES_OVER_TIME}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" />
                <XAxis
                  dataKey="day"
                  stroke="#A0A0A0"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#A0A0A0"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#25D366", strokeOpacity: 0.2 }} />
                <Line
                  type="monotone"
                  dataKey="messages"
                  stroke="#25D366"
                  strokeWidth={2.5}
                  dot={{ fill: "#25D366", r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          <Card className="p-6">
            <h2 className="mb-6 text-sm font-semibold">Top Question Categories</h2>
            <ResponsiveContainer width="100%" height={260}>
              <BarChart data={CATEGORIES}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1F1F1F" vertical={false} />
                <XAxis
                  dataKey="name"
                  stroke="#A0A0A0"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#A0A0A0"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip content={<ChartTooltip />} cursor={{ fill: "rgba(37,211,102,0.08)" }} />
                <Bar dataKey="value" fill="#25D366" radius={[6, 6, 0, 0]} maxBarSize={48} />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Conversations table */}
        <Card className="overflow-hidden">
          <div className="border-b border-border p-6">
            <h2 className="text-sm font-semibold">Recent Conversations</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border text-left text-xs uppercase tracking-wider text-muted">
                  <th className="px-6 py-3 font-medium">Time</th>
                  <th className="px-6 py-3 font-medium">Customer Number</th>
                  <th className="px-6 py-3 font-medium">First Message</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {CONVERSATIONS.map((c, i) => (
                  <tr
                    key={i}
                    className="border-b border-border/50 transition-colors last:border-0 hover:bg-white/[0.02]"
                  >
                    <td className="px-6 py-4 text-muted">{c.time}</td>
                    <td className="px-6 py-4 font-mono text-xs text-white/80">
                      {c.number}
                    </td>
                    <td className="px-6 py-4 text-white/90">{c.message}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}
