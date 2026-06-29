import { useState, useEffect } from "react";
import { Outlet, Link, useLocation, useNavigate, Navigate } from "react-router";
import { motion } from "motion/react";
import {
  LayoutDashboard,
  MessageSquare,
  Image,
  BarChart2,
  LogOut,
  Sparkles,
  ChevronRight,
  Bell,
  MessageCircle,
} from "lucide-react";
import { auth, messages, chat as chatStore } from "../../../lib/db";

const NAV = [
  { path: "/admin/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { path: "/admin/messages",  icon: MessageSquare,   label: "Messages" },
  { path: "/admin/chat",      icon: MessageCircle,   label: "Live Chat" },
  { path: "/admin/portfolio", icon: Image,           label: "Portfolio" },
  { path: "/admin/traffic",   icon: BarChart2,       label: "Traffic" },
];

export function AdminLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const [unread, setUnread] = useState(0);
  const [chatUnread, setChatUnread] = useState(0);

  const isLoggedIn = auth.isLoggedIn();

  useEffect(() => {
    if (!isLoggedIn) return;
    const fetchCounts = async () => {
      const [u, c] = await Promise.all([messages.unreadCount(), chatStore.unreadCount()]);
      setUnread(u); setChatUnread(c);
    };
    fetchCounts();
    const t = setInterval(fetchCounts, 10_000);
    return () => clearInterval(t);
  }, [location.pathname, isLoggedIn]);

  if (!isLoggedIn) return <Navigate to="/admin" replace />;

  const handleLogout = () => {
    auth.logout();
    navigate("/admin");
  };

  return (
    <div className="min-h-screen bg-[#030305] flex font-jakarta">
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside className="w-64 flex-shrink-0 bg-black/50 backdrop-blur-xl border-r border-white/5 flex flex-col fixed top-0 left-0 h-full z-50">
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary/10 border border-primary/30 rounded-xl flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-white text-sm font-outfit">Sign World</p>
              <p className="text-[10px] text-primary uppercase tracking-widest">Admin Panel</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV.map(({ path, icon: Icon, label }) => {
            const active = location.pathname === path;
            return (
              <Link key={path} to={path}>
                <motion.div
                  whileHover={{ x: 3 }}
                  transition={{ duration: 0.15 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                    active
                      ? "bg-primary/15 text-primary border border-primary/25 shadow-[0_0_12px_rgba(212,175,55,0.1)]"
                      : "text-gray-400 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="flex-1">{label}</span>
                  {label === "Messages" && unread > 0 && (
                    <span className="px-1.5 py-0.5 bg-primary text-black text-xs font-bold rounded-full">{unread}</span>
                  )}
                  {label === "Live Chat" && chatUnread > 0 && (
                    <span className="px-1.5 py-0.5 bg-blue-500 text-white text-xs font-bold rounded-full">{chatUnread}</span>
                  )}
                  {active && <ChevronRight className="w-3 h-3 opacity-60" />}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar footer */}
        <div className="p-4 border-t border-white/5 space-y-2">
          <a href="/" target="_blank" rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-all">
            <ChevronRight className="w-4 h-4 rotate-180" />
            View Public Site
          </a>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* ── Main Content ────────────────────────────────── */}
      <div className="flex-1 ml-64 min-h-screen flex flex-col">
        {/* Top bar */}
        <header className="h-16 bg-black/30 backdrop-blur-xl border-b border-white/5 flex items-center justify-between px-8 sticky top-0 z-40">
          <div className="flex items-center gap-2 text-gray-400 text-sm">
            <span className="text-gray-600">Admin</span>
            <ChevronRight className="w-3 h-3" />
            <span className="text-white capitalize">
              {location.pathname.replace("/admin/", "") || "panel"}
            </span>
          </div>
          <div className="flex items-center gap-4">
            {unread > 0 && (
              <Link to="/admin/messages" className="relative">
                <Bell className="w-5 h-5 text-gray-400 hover:text-primary transition-colors" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-black text-[9px] font-bold rounded-full flex items-center justify-center">{unread}</span>
              </Link>
            )}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-300 font-medium">admin</span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
