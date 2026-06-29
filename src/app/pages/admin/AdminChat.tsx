import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, Send, Trash2, Search, User, Circle } from "lucide-react";
import { chat as chatDB } from "../../../lib/db";
import type { ChatSession, ChatMessage } from "../../../lib/db";

export function AdminChat() {
  const [sessions, setSessions] = useState<ChatSession[]>([]);
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null);
  const [msgs, setMsgs] = useState<ChatMessage[]>([]);
  const [replyText, setReplyText] = useState("");
  const [search, setSearch] = useState("");
  const [unreadTotal, setUnreadTotal] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Load sessions + subscribe to realtime session changes
  useEffect(() => {
    const loadSessions = async () => {
      const all = await chatDB.getAllSessions();
      setSessions(all);
      const uc = await chatDB.unreadCount();
      setUnreadTotal(uc);
    };
    loadSessions();

    const channel = chatDB.subscribeToSessions(loadSessions);
    return () => { channel.unsubscribe(); };
  }, []);

  // Load messages when active session changes + subscribe
  useEffect(() => {
    if (!activeSession) return;
    let msgChannel: ReturnType<typeof chatDB.subscribeToMessages>;

    const loadMsgs = async () => {
      const all = await chatDB.getMessages(activeSession.id);
      setMsgs(all);
      chatDB.markRead(activeSession.id);
    };
    loadMsgs();

    msgChannel = chatDB.subscribeToMessages(activeSession.id, (newMsg) => {
      setMsgs(prev => [...prev, newMsg]);
    });

    return () => { msgChannel?.unsubscribe(); };
  }, [activeSession?.id]);

  // Auto-scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [msgs]);

  const openSession = async (s: ChatSession) => {
    setActiveSession(s);
    setMsgs([]);
  };

  const sendReply = async () => {
    if (!replyText.trim() || !activeSession) return;
    const text = replyText.trim();
    setReplyText("");
    await chatDB.sendAdminMsg(activeSession.id, text);
    // Realtime will push it to both admin and visitor
  };

  const deleteSession = async (id: string) => {
    if (confirm("Delete this chat session?")) {
      await chatDB.deleteSession(id);
      if (activeSession?.id === id) { setActiveSession(null); setMsgs([]); }
    }
  };

  const filtered = sessions.filter(s =>
    !search || s.visitor_name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6 h-full">
      <div>
        <h1 className="text-2xl font-bold text-white font-outfit mb-1">Live Chat</h1>
        <p className="text-gray-400 text-sm">
          {sessions.length} session{sessions.length !== 1 ? "s" : ""} · {unreadTotal} unread · real-time via Supabase
        </p>
      </div>

      <div className="flex gap-4 h-[calc(100vh-220px)] min-h-[500px]">
        {/* Sessions list */}
        <div className="w-72 flex-shrink-0 flex flex-col bg-black/40 border border-white/8 rounded-2xl overflow-hidden">
          <div className="p-3 border-b border-white/5">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500" />
              <input type="text" placeholder="Search..." value={search} onChange={e => setSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs placeholder-gray-600 focus:outline-none focus:border-primary/50" />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <MessageCircle className="w-8 h-8 text-gray-700 mb-3" />
                <p className="text-gray-600 text-xs">No chat sessions yet.<br />Visitors who open the chat widget will appear here instantly.</p>
              </div>
            ) : filtered.map(s => {
              const isActive = s.id === activeSession?.id;
              return (
                <button key={s.id} onClick={() => openSession(s)}
                  className={`w-full text-left px-4 py-3 hover:bg-white/5 transition-colors ${isActive ? "bg-primary/8 border-l-2 border-primary" : ""}`}>
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white flex-shrink-0">
                      <User className="w-4 h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs font-medium text-white">Visitor</span>
                        {s.has_unread && <Circle className="w-2 h-2 text-primary fill-primary flex-shrink-0" />}
                      </div>
                      <p className="text-xs text-gray-500">
                        {new Date(s.started_at).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                      </p>
                    </div>
                    {s.has_unread && (
                      <div className="w-4 h-4 bg-primary rounded-full flex items-center justify-center text-[9px] font-bold text-black">●</div>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Chat panel */}
        <div className="flex-1 flex flex-col bg-black/40 border border-white/8 rounded-2xl overflow-hidden">
          {!activeSession ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
              <MessageCircle className="w-16 h-16 text-gray-700 mb-4" />
              <p className="text-gray-500 text-sm">Select a session to start replying</p>
              <p className="text-gray-700 text-xs mt-2">New messages appear instantly • powered by Supabase Realtime</p>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="px-6 py-4 border-b border-white/5 flex items-center justify-between bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-white">Visitor Chat</p>
                    <p className="text-xs text-gray-500">Started {new Date(activeSession.started_at).toLocaleString("en-IN")}</p>
                  </div>
                </div>
                <button onClick={() => deleteSession(activeSession.id)}
                  className="p-2 rounded-lg text-gray-600 hover:text-red-400 hover:bg-red-500/10 transition-all">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                <AnimatePresence initial={false}>
                  {msgs.map((msg, i) => (
                    <motion.div key={msg.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-3 ${msg.sender === "admin" ? "" : "flex-row-reverse"}`}>
                      <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs font-bold ${
                        msg.sender === "admin" ? "bg-primary text-black" : "bg-gradient-to-br from-blue-600 to-purple-600 text-white"
                      }`}>
                        {msg.sender === "admin" ? "A" : "V"}
                      </div>
                      <div className={`max-w-[70%] px-4 py-3 rounded-2xl ${
                        msg.sender === "admin"
                          ? "bg-primary/15 border border-primary/20 text-white rounded-tl-none"
                          : "bg-white/10 border border-white/10 text-gray-200 rounded-tr-none"
                      }`}>
                        <p className="text-sm leading-relaxed">{msg.text}</p>
                        <p className="text-xs text-gray-500 mt-1">
                          {new Date(msg.created_at || new Date()).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
                <div ref={bottomRef} />
              </div>

              {/* Reply input */}
              <div className="p-4 border-t border-white/5 bg-black/20">
                <div className="flex gap-3 items-end">
                  <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                    onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendReply(); } }}
                    placeholder="Type your reply… (Enter to send)" rows={2}
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:border-primary/50 resize-none" />
                  <motion.button onClick={sendReply} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    disabled={!replyText.trim()}
                    className="w-11 h-11 bg-primary text-black rounded-xl flex items-center justify-center hover:bg-amber-400 transition-all disabled:opacity-40 flex-shrink-0">
                    <Send className="w-4 h-4" />
                  </motion.button>
                </div>
                <p className="text-xs text-gray-600 mt-2">Replies are instant via Supabase Realtime WebSocket.</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
