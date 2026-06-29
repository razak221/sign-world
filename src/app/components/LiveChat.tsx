import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, Phone, Mail } from "lucide-react";
import { chat as chatDB } from "../../lib/db";
import type { ChatSession, ChatMessage } from "../../lib/db";

// Stable session key for this browser tab
function getSessionKey() {
  let key = sessionStorage.getItem("sw_chat_key");
  if (!key) {
    key = `v_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
    sessionStorage.setItem("sw_chat_key", key);
  }
  return key;
}

export function LiveChat() {
  const [isOpen, setIsOpen]       = useState(false);
  const [inputText, setInputText] = useState("");
  const [showWelcome, setShowWelcome] = useState(false);
  const [session, setSession]     = useState<ChatSession | null>(null);
  const [msgs, setMsgs]           = useState<ChatMessage[]>([]);
  const [unreadAdmin, setUnreadAdmin] = useState(0);
  const sessionKey = useRef(getSessionKey()).current;
  const bottomRef  = useRef<HTMLDivElement>(null);

  // Init session + load messages
  useEffect(() => {
    let channel: ReturnType<typeof chatDB.subscribeToMessages> | null = null;

    (async () => {
      const sess = await chatDB.getOrCreateSession(sessionKey);
      setSession(sess);
      const history = await chatDB.getMessages(sess.id);
      setMsgs(history);

      // Realtime: new messages in this session
      channel = chatDB.subscribeToMessages(sess.id, (newMsg) => {
        setMsgs(prev => [...prev, newMsg]);
        if (newMsg.sender === "admin" && !isOpen) {
          setUnreadAdmin(u => u + 1);
        }
      });
    })();

    return () => { channel?.unsubscribe(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionKey]);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, [msgs, isOpen]);

  // Clear admin unread badge when opened
  useEffect(() => { if (isOpen) setUnreadAdmin(0); }, [isOpen]);

  // Auto popup after 5 s
  useEffect(() => {
    const t = setTimeout(() => setShowWelcome(true), 5000);
    return () => clearTimeout(t);
  }, []);
  useEffect(() => {
    if (showWelcome && !isOpen) {
      const t = setTimeout(() => setShowWelcome(false), 8000);
      return () => clearTimeout(t);
    }
  }, [showWelcome, isOpen]);

  const sendMessage = async () => {
    if (!inputText.trim() || !session) return;
    const text = inputText.trim();
    setInputText("");
    await chatDB.sendVisitorMsg(session.id, text);
    // Realtime will append the message automatically
  };

  const quickActions = [
    { icon: Phone,         label: "Call Us Now",     gradient: "from-green-500 to-emerald-500", action: () => window.location.href = "tel:+917899634299" },
    { icon: MessageCircle, label: "WhatsApp Chat",   gradient: "from-blue-500 to-cyan-500",     action: () => window.open("https://wa.me/917899634299?text=Hi! I'm interested in your printing services.", "_blank") },
    { icon: Mail,          label: "Email Us",        gradient: "from-purple-500 to-pink-500",   action: () => window.location.href = "mailto:info@signworldprints.com" },
  ];

  return (
    <>
      {/* Welcome pop-up */}
      <AnimatePresence>
        {showWelcome && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 left-8 z-40 w-80 bg-white rounded-2xl shadow-2xl overflow-hidden border-2 border-blue-200"
          >
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white relative">
              <button onClick={() => setShowWelcome(false)}
                className="absolute top-2 right-2 w-6 h-6 hover:bg-white/20 rounded-full flex items-center justify-center transition">
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center gap-3">
                <motion.div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                  <MessageCircle className="w-6 h-6" />
                </motion.div>
                <div>
                  <h3 className="font-bold text-lg">Need Help?</h3>
                  <div className="flex items-center gap-1.5 text-xs">
                    <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <span>We're online!</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 bg-gradient-to-br from-blue-50 to-purple-50">
              <p className="text-sm text-gray-700 mb-3">👋 <strong>Welcome to Sign World Prints!</strong></p>
              <p className="text-sm text-gray-600 mb-4">Get instant quotes for printing & signage. Chat with our experts now!</p>
              <button onClick={() => { setShowWelcome(false); setIsOpen(true); }}
                className="w-full py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all">
                Start Chat 💬
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white rounded-full shadow-2xl flex items-center justify-center"
        whileHover={{ scale: 1.1, rotate: 5 }} whileTap={{ scale: 0.9 }}
        animate={{ boxShadow: isOpen ? "0 20px 25px -5px rgba(0,0,0,0.1)" : ["0 20px 25px -5px rgba(59,130,246,0.5)","0 20px 25px -5px rgba(168,85,247,0.5)","0 20px 25px -5px rgba(59,130,246,0.5)"] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.3 }}>
          {isOpen ? <X className="w-7 h-7" /> : <MessageCircle className="w-7 h-7" />}
        </motion.div>
        {!isOpen && (
          <motion.div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold"
            animate={{ scale: [1, 1.3, 1] }} transition={{ repeat: Infinity, duration: unreadAdmin > 0 ? 1 : 2 }}>
            {unreadAdmin > 0 ? unreadAdmin : "!"}
          </motion.div>
        )}
      </motion.button>

      {/* Chat window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }} transition={{ type: "spring", bounce: 0.3 }}
            className="fixed bottom-28 left-8 z-50 w-96 bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 p-4 text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Sign World Prints</h3>
                  <div className="flex items-center gap-1.5 text-xs">
                    <motion.div className="w-2 h-2 bg-green-400 rounded-full" animate={{ scale: [1, 1.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                    <span>Online · Instant replies</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="p-4 h-72 overflow-y-auto bg-gradient-to-br from-gray-50 to-blue-50 space-y-3">
              {msgs.map((msg, i) => (
                <motion.div key={msg.id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.sender === "visitor" ? "flex-row-reverse" : ""}`}>
                  {msg.sender === "admin" && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">SW</div>
                  )}
                  <div className={`px-3 py-2 rounded-2xl shadow-sm max-w-[75%] ${
                    msg.sender === "visitor"
                      ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-tr-none"
                      : "bg-white text-gray-800 rounded-tl-none"
                  }`}>
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.sender === "visitor" ? "text-blue-100" : "text-gray-400"}`}>
                      {new Date(msg.created_at || new Date()).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Quick Actions */}
            <div className="px-4 py-3 bg-white border-t border-gray-200">
              <p className="text-xs text-gray-600 mb-2 font-medium">Quick Actions:</p>
              <div className="grid grid-cols-3 gap-2">
                {quickActions.map((qa, i) => {
                  const Icon = qa.icon;
                  return (
                    <motion.button key={i} onClick={qa.action} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                      className={`flex flex-col items-center gap-1 p-2 bg-gradient-to-br ${qa.gradient} text-white rounded-lg text-xs font-medium hover:shadow-lg transition-all`}>
                      <Icon className="w-4 h-4" />
                      <span className="text-[10px] leading-tight text-center">{qa.label}</span>
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex gap-2">
                <input type="text" value={inputText} onChange={e => setInputText(e.target.value)}
                  onKeyDown={e => e.key === "Enter" && sendMessage()}
                  placeholder="Type your message..."
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm" />
                <motion.button onClick={sendMessage} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                  className="w-11 h-11 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg flex items-center justify-center hover:shadow-lg transition-all">
                  <Send className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}