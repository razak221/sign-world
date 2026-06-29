import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  Inbox, Trash2, Mail, MailOpen, ChevronDown, ChevronUp,
  Phone, User, Tag, Calendar, Search,
} from "lucide-react";
import { messages as msgDB } from "../../../lib/db";
import type { Message } from "../../../lib/db";

export function AdminMessages() {
  const [msgs, setMsgs] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "unread" | "read">("all");

  const reload = async () => {
    const data = await msgDB.getAll();
    setMsgs(data);
    setLoading(false);
  };

  useEffect(() => { reload(); }, []);

  const filtered = msgs
    .filter(m => filter === "all" ? true : filter === "unread" ? !m.read : m.read)
    .filter(m =>
      !search ||
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      (m.service ?? "").toLowerCase().includes(search.toLowerCase())
    );

  const markRead  = async (id: string) => { await msgDB.markRead(id); reload(); };
  const deleteMsg = async (id: string) => { await msgDB.delete(id); reload(); if (expanded === id) setExpanded(null); };
  const toggleExpand = (id: string) => { setExpanded(prev => prev === id ? null : id); markRead(id); };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white font-outfit mb-1">Messages</h1>
        <p className="text-gray-400 text-sm">{msgs.filter(m => !m.read).length} unread · {msgs.length} total</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input type="text" placeholder="Search by name, email, or service..." value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 transition-colors" />
        </div>
        <div className="flex rounded-xl overflow-hidden border border-white/10 text-sm">
          {(["all", "unread", "read"] as const).map(f => (
            <button key={f} onClick={() => setFilter(f)}
              className={`px-4 py-2.5 capitalize font-medium transition-colors ${filter === f ? "bg-primary text-black" : "text-gray-400 hover:text-white bg-white/5"}`}>
              {f}
            </button>
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <Inbox className="w-12 h-12 text-gray-700 mb-4" />
          <p className="text-gray-500 text-sm">No messages found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map(m => (
            <motion.div key={m.id} layout initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${!m.read ? "bg-primary/5 border-primary/20" : "bg-black/40 border-white/8 hover:border-white/15"}`}>
              <button onClick={() => toggleExpand(m.id)} className="w-full text-left px-6 py-4 flex items-center gap-4 group">
                <div className={`flex-shrink-0 ${!m.read ? "text-primary" : "text-gray-600"}`}>
                  {!m.read ? <Mail className="w-4 h-4" /> : <MailOpen className="w-4 h-4" />}
                </div>
                <div className="flex-1 min-w-0 grid grid-cols-3 gap-4">
                  <div className="min-w-0">
                    <p className={`text-sm font-semibold truncate ${!m.read ? "text-white" : "text-gray-300"}`}>{m.name}</p>
                    <p className="text-xs text-gray-500 truncate">{m.email}</p>
                  </div>
                  <div className="min-w-0">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-xs text-gray-400">{m.service || "—"}</span>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">{new Date(m.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}</p>
                    <p className="text-xs text-gray-600">{new Date(m.created_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button onClick={e => { e.stopPropagation(); deleteMsg(m.id); }} className="p-1.5 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  {expanded === m.id ? <ChevronUp className="w-4 h-4 text-gray-500" /> : <ChevronDown className="w-4 h-4 text-gray-500" />}
                </div>
              </button>

              <AnimatePresence>
                {expanded === m.id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }} className="overflow-hidden">
                    <div className="px-6 pb-6 space-y-4 border-t border-white/5 pt-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div className="flex items-center gap-2 text-sm"><User className="w-3.5 h-3.5 text-primary" /><span className="text-gray-400">{m.name}</span></div>
                        <div className="flex items-center gap-2 text-sm"><Mail className="w-3.5 h-3.5 text-primary" /><a href={`mailto:${m.email}`} className="text-gray-400 hover:text-primary transition-colors">{m.email}</a></div>
                        {m.phone && <div className="flex items-center gap-2 text-sm"><Phone className="w-3.5 h-3.5 text-primary" /><a href={`tel:${m.phone}`} className="text-gray-400 hover:text-primary transition-colors">{m.phone}</a></div>}
                        <div className="flex items-center gap-2 text-sm"><Tag className="w-3.5 h-3.5 text-primary" /><span className="text-gray-400">{m.service || "Not specified"}</span></div>
                        <div className="flex items-center gap-2 text-sm"><Calendar className="w-3.5 h-3.5 text-primary" /><span className="text-gray-400">{new Date(m.created_at).toLocaleString("en-IN")}</span></div>
                      </div>
                      <div className="bg-white/5 border border-white/5 rounded-xl p-4">
                        <p className="text-xs text-gray-500 uppercase tracking-widest mb-2 font-medium">Message</p>
                        <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{m.message}</p>
                      </div>
                      <div className="flex gap-3">
                        <a href={`mailto:${m.email}?subject=Re: ${m.service} Inquiry — Sign World Prints`} className="px-4 py-2 bg-primary text-black text-xs font-bold rounded-lg hover:bg-amber-400 transition-colors">Reply via Email</a>
                        {m.phone && <a href={`https://wa.me/${m.phone.replace(/\D/g, "")}?text=Hi ${encodeURIComponent(m.name)}, this is Sign World Prints regarding your inquiry.`} target="_blank" rel="noopener noreferrer" className="px-4 py-2 text-xs font-bold rounded-lg transition-colors text-white" style={{ background: "linear-gradient(135deg,#25d366,#128c4c)" }}>Reply on WhatsApp</a>}
                        <button onClick={() => deleteMsg(m.id)} className="px-4 py-2 bg-red-500/10 text-red-400 text-xs font-bold rounded-lg hover:bg-red-500/20 transition-colors border border-red-500/20">Delete</button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
