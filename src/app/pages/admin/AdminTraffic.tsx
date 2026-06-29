import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { BarChart2, TrendingUp, Eye, RefreshCw, Trash2, Globe } from "lucide-react";
import { traffic as trafficDB } from "../../../lib/db";
import type { TrafficTotals } from "../../../lib/db";

const PAGE_LABELS: Record<string, string> = { home: "🏠 Home", services: "🛠 Services", portfolio: "🖼 Portfolio", about: "👥 About", contact: "📞 Contact" };
const PAGE_COLORS: Record<string, string> = { home: "from-primary to-amber-300", services: "from-blue-400 to-cyan-400", portfolio: "from-purple-400 to-pink-400", about: "from-green-400 to-emerald-400", contact: "from-orange-400 to-red-400" };

type LogEntry = { page: string; created_at: string };

export function AdminTraffic() {
  const [totals, setTotals] = useState<TrafficTotals>({ home: 0, services: 0, portfolio: 0, about: 0, contact: 0 });
  const [log, setLog] = useState<LogEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastRefresh, setLastRefresh] = useState(new Date());

  const reload = async () => {
    const [t, l] = await Promise.all([trafficDB.getTotals(), trafficDB.getLog()]);
    setTotals(t);
    setLog(l as LogEntry[]);
    setLastRefresh(new Date());
    setLoading(false);
  };

  useEffect(() => {
    reload();
    const timer = setInterval(reload, 30_000);
    return () => clearInterval(timer);
  }, []);

  const handleClear = async () => {
    if (confirm("Clear all traffic data? This cannot be undone.")) { await trafficDB.clearLog(); reload(); }
  };

  const totalViews = Object.values(totals).reduce((a, b) => a + b, 0);
  const topPage = Object.entries(totals).sort((a, b) => b[1] - a[1])[0];

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-outfit mb-1">Traffic Monitor</h1>
          <p className="text-gray-400 text-sm">All devices · Cloud data · Auto-refreshes every 30s · Last: {lastRefresh.toLocaleTimeString("en-IN")}</p>
        </div>
        <div className="flex gap-2">
          <button onClick={reload} className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm text-gray-300 hover:text-white hover:border-white/20 transition-all">
            <RefreshCw className="w-3.5 h-3.5" /> Refresh
          </button>
          <button onClick={handleClear} className="flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 hover:bg-red-500/20 transition-all">
            <Trash2 className="w-3.5 h-3.5" /> Clear
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-5">
        <div className="bg-black/40 border border-white/8 rounded-2xl p-5"><Globe className="w-5 h-5 text-primary mb-3" /><div className="text-3xl font-bold text-white font-outfit">{totalViews}</div><p className="text-gray-400 text-sm mt-1">Total Page Views</p></div>
        <div className="bg-black/40 border border-white/8 rounded-2xl p-5"><Eye className="w-5 h-5 text-blue-400 mb-3" /><div className="text-3xl font-bold text-white font-outfit">{log.length}</div><p className="text-gray-400 text-sm mt-1">Logged Sessions</p></div>
        <div className="bg-black/40 border border-white/8 rounded-2xl p-5"><TrendingUp className="w-5 h-5 text-green-400 mb-3" /><div className="text-3xl font-bold text-white font-outfit capitalize">{topPage?.[0] ?? "—"}</div><p className="text-gray-400 text-sm mt-1">Most Visited Page</p></div>
      </div>

      <div className="bg-black/40 border border-white/8 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6"><BarChart2 className="w-4 h-4 text-primary" /><h2 className="text-sm font-semibold text-white">Views Per Page</h2></div>
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>
        ) : (
          <div className="space-y-4">
            {Object.entries(totals).sort((a, b) => b[1] - a[1]).map(([page, count]) => {
              const pct = totalViews ? Math.round((count / totalViews) * 100) : 0;
              return (
                <div key={page} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-300">{PAGE_LABELS[page] || page}</span>
                    <span className="text-gray-500">{count} views ({pct}%)</span>
                  </div>
                  <div className="h-3 bg-white/5 rounded-full overflow-hidden">
                    <motion.div initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ duration: 0.8, ease: "easeOut" }}
                      className={`h-full bg-gradient-to-r ${PAGE_COLORS[page] ?? "from-gray-400 to-gray-600"} rounded-full`} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-black/40 border border-white/8 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-white/5">
          <h2 className="text-sm font-semibold text-white">Recent Activity Log</h2>
          <p className="text-xs text-gray-500 mt-0.5">Last {Math.min(log.length, 200)} visits from ALL devices</p>
        </div>
        {log.length === 0 ? (
          <div className="py-12 text-center text-gray-600 text-sm">No activity recorded yet.</div>
        ) : (
          <div className="divide-y divide-white/5 max-h-96 overflow-y-auto">
            {log.map((entry, i) => (
              <div key={i} className="flex items-center justify-between px-6 py-3 hover:bg-white/3 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-base">{PAGE_LABELS[entry.page]?.split(" ")[0] || "🌐"}</span>
                  <span className="text-sm text-gray-300 capitalize">{entry.page}</span>
                </div>
                <span className="text-xs text-gray-500">{new Date(entry.created_at).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
