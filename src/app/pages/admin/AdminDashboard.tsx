import { useEffect, useState } from "react";
import { Link } from "react-router";
import { motion } from "motion/react";
import {
  MessageSquare, Image, BarChart2, TrendingUp,
  Mail, Eye, ArrowRight, Users, Globe, Inbox,
} from "lucide-react";
import { messages, portfolio, traffic } from "../../../lib/db";
import type { Message } from "../../../lib/db";

function StatCard({ icon: Icon, label, value, sub, color }: {
  icon: React.ElementType; label: string; value: number | string;
  sub?: string; color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      className="bg-black/40 backdrop-blur-xl border border-white/8 rounded-2xl p-6 group hover:border-primary/30 transition-all duration-300"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>
      <div className="text-3xl font-bold text-white font-outfit mb-1">{value}</div>
      <div className="text-sm text-gray-400 font-medium">{label}</div>
      {sub && <div className="text-xs text-gray-600 mt-1">{sub}</div>}
    </motion.div>
  );
}

export function AdminDashboard() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [totals, setTotals] = useState({ home: 0, services: 0, portfolio: 0, about: 0, contact: 0 });
  const [customCount, setCustomCount] = useState(0);
  const [hiddenCount, setHiddenCount] = useState(0);
  const [logCount, setLogCount] = useState(0);

  useEffect(() => {
    (async () => {
      const [m, t, custom, hidden, log] = await Promise.all([
        messages.getAll(),
        traffic.getTotals(),
        portfolio.getCustom(),
        portfolio.getHiddenIds(),
        traffic.getLog(200),
      ]);
      setMsgs(m); setTotals(t);
      setCustomCount(custom.length);
      setHiddenCount(hidden.length);
      setLogCount(log.length);
    })();
  }, []);

  const totalViews = Object.values(totals).reduce((a, b) => a + b, 0);
  const unread = msgs.filter(m => !m.read).length;
  const totalPortfolio = 18 - hiddenCount + customCount;

  const recentMsgs = msgs.slice(0, 5);

  const quickLinks = [
    { to: "/admin/messages",  icon: Mail,      label: "View All Messages",  desc: `${unread} unread` },
    { to: "/admin/portfolio", icon: Image,     label: "Manage Portfolio",   desc: `${totalPortfolio} items` },
    { to: "/admin/traffic",   icon: BarChart2, label: "Traffic Analytics",  desc: `${totalViews} total views` },
    { to: "/",                icon: Globe,     label: "View Public Site",    desc: "Open in same tab" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white font-outfit mb-1">Dashboard</h1>
        <p className="text-gray-400 text-sm">Welcome back, Admin. Here's your site overview.</p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-5">
        <StatCard icon={Inbox}       label="Total Messages"  value={msgs.length}   sub={`${unread} unread`}    color="bg-blue-500/15 text-blue-400 border border-blue-500/20" />
        <StatCard icon={TrendingUp}   label="Page Views"     value={totalViews}    sub="All devices"           color="bg-green-500/15 text-green-400 border border-green-500/20" />
        <StatCard icon={Image}        label="Portfolio Items" value={totalPortfolio} sub={`${customCount} custom`} color="bg-primary/15 text-primary border border-primary/20" />
        <StatCard icon={Users}        label="Logged Visits"  value={logCount}      sub="All browsers"          color="bg-purple-500/15 text-purple-400 border border-purple-500/20" />
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Messages */}
        <div className="bg-black/40 backdrop-blur-xl border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" />
              <h2 className="text-sm font-semibold text-white">Recent Messages</h2>
            </div>
            <Link to="/admin/messages" className="text-xs text-primary hover:text-amber-300 transition-colors flex items-center gap-1">
              View all <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
          {recentMsgs.length === 0 ? (
            <div className="px-6 py-10 text-center text-gray-600 text-sm">No messages yet</div>
          ) : (
            <div className="divide-y divide-white/5">
              {recentMsgs.map(m => (
                <div key={m.id} className={`px-6 py-4 hover:bg-white/3 transition-colors ${!m.read ? "bg-primary/3" : ""}`}>
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        {!m.read && <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />}
                        <span className="text-sm font-medium text-white truncate">{m.name}</span>
                      </div>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{m.service} · {m.email}</p>
                      <p className="text-xs text-gray-600 truncate mt-1">{m.message}</p>
                    </div>
                    <span className="text-xs text-gray-600 flex-shrink-0 whitespace-nowrap">
                        {new Date(m.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Links */}
        <div className="space-y-3">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-widest px-1">Quick Actions</h2>
          {quickLinks.map(({ to, icon: Icon, label, desc }) => (
            <Link key={to} to={to} target={to === "/" ? "_blank" : undefined}>
              <motion.div
                whileHover={{ x: 4 }}
                className="flex items-center gap-4 p-4 bg-black/40 backdrop-blur-xl border border-white/8 rounded-xl hover:border-primary/30 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-primary/10 border border-primary/20 rounded-xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Icon className="w-5 h-5 text-primary" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-white">{label}</p>
                  <p className="text-xs text-gray-500">{desc}</p>
                </div>
                <ArrowRight className="w-4 h-4 text-gray-600 group-hover:text-primary transition-colors" />
              </motion.div>
            </Link>
          ))}
        </div>
      </div>

      {/* Traffic by page */}
      <div className="bg-black/40 backdrop-blur-xl border border-white/8 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <Eye className="w-4 h-4 text-primary" />
          <h2 className="text-sm font-semibold text-white">Page Views Breakdown</h2>
        </div>
        <div className="space-y-3">
          {Object.entries(totals).map(([page, count]) => {
            const pct = totalViews ? Math.round((count / totalViews) * 100) : 0;
            return (
              <div key={page} className="flex items-center gap-4">
                <span className="text-sm text-gray-400 w-24 capitalize">{page}</span>
                <div className="flex-1 h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="h-full bg-gradient-to-r from-primary to-amber-300 rounded-full"
                  />
                </div>
                <span className="text-sm text-gray-500 w-12 text-right">{count}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
