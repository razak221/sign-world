// ─── Types ───────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  timestamp: string;
  read: boolean;
}

export interface ChatMsg {
  id: string;
  from: "visitor" | "admin";
  text: string;
  timestamp: string;
}

export interface ChatSession {
  sessionId: string;
  visitorName: string;
  startedAt: string;
  messages: ChatMsg[];
  hasUnread: boolean; // unread by admin
  lastAdminReply?: string; // last admin reply text (polled by widget)
}

export interface CustomProject {
  id: number;       // ids >= 1000 are custom
  title: string;
  category: string;
  description: string;
  image: string;    // URL string
  isCustom: true;
}

export interface DefaultEdit {
  title?: string;
  description?: string;
  category?: string;
}

export interface PageViewEntry {
  page: string;
  timestamp: string;
}

export interface TrafficTotals {
  home: number;
  services: number;
  portfolio: number;
  about: number;
  contact: number;
}

// ─── Keys ────────────────────────────────────────────────────────────────────
const KEYS = {
  session:        "sw_session",
  messages:       "sw_messages",
  customProjects: "sw_custom_projects",
  hiddenIds:      "sw_hidden_ids",
  defaultEdits:   "sw_default_edits",
  trafficLog:     "sw_traffic_log",
  trafficTotals:  "sw_traffic_totals",
  chatSessions:   "sw_chat_sessions",
};

// ─── Generic helpers ──────────────────────────────────────────────────────────
function get<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch { return fallback; }
}
function set<T>(key: string, value: T) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch {}
}

// ─── Auth ────────────────────────────────────────────────────────────────────
export const auth = {
  isLoggedIn: () => get<boolean>(KEYS.session, false),
  login: ()   => set(KEYS.session, true),
  logout: ()  => localStorage.removeItem(KEYS.session),
};

// ─── Messages ─────────────────────────────────────────────────────────────────
export const messages = {
  getAll: ()          => get<Message[]>(KEYS.messages, []),
  add: (m: Message)   => set(KEYS.messages, [m, ...messages.getAll()]),
  markRead: (id: string) => set(KEYS.messages, messages.getAll().map(m => m.id === id ? { ...m, read: true } : m)),
  delete: (id: string)   => set(KEYS.messages, messages.getAll().filter(m => m.id !== id)),
  unreadCount: ()        => messages.getAll().filter(m => !m.read).length,
};

// ─── Portfolio ────────────────────────────────────────────────────────────────
export const portfolio = {
  getCustom:     ()          => get<CustomProject[]>(KEYS.customProjects, []),
  getHiddenIds:  ()          => get<number[]>(KEYS.hiddenIds, []),
  getDefaultEdits: ()        => get<Record<number, DefaultEdit>>(KEYS.defaultEdits, {}),

  addCustom: (p: CustomProject) =>
    set(KEYS.customProjects, [...portfolio.getCustom(), p]),

  updateCustom: (id: number, patch: Partial<CustomProject>) =>
    set(KEYS.customProjects, portfolio.getCustom().map(p => p.id === id ? { ...p, ...patch } : p)),

  deleteCustom: (id: number) =>
    set(KEYS.customProjects, portfolio.getCustom().filter(p => p.id !== id)),

  hideDefault: (id: number) =>
    set(KEYS.hiddenIds, [...new Set([...portfolio.getHiddenIds(), id])]),

  showDefault: (id: number) =>
    set(KEYS.hiddenIds, portfolio.getHiddenIds().filter(i => i !== id)),

  editDefault: (id: number, patch: DefaultEdit) =>
    set(KEYS.defaultEdits, { ...portfolio.getDefaultEdits(), [id]: { ...portfolio.getDefaultEdits()[id], ...patch } }),
};

// ─── Traffic ──────────────────────────────────────────────────────────────────
export const traffic = {
  getTotals: () => get<TrafficTotals>(KEYS.trafficTotals, { home: 0, services: 0, portfolio: 0, about: 0, contact: 0 }),
  getLog:    () => get<PageViewEntry[]>(KEYS.trafficLog, []),

  recordView: (page: keyof TrafficTotals) => {
    const totals = traffic.getTotals();
    set(KEYS.trafficTotals, { ...totals, [page]: (totals[page] || 0) + 1 });
    const entry: PageViewEntry = { page, timestamp: new Date().toISOString() };
    const log = [entry, ...traffic.getLog()].slice(0, 200); // keep last 200
    set(KEYS.trafficLog, log);
  },

  clearLog: () => {
    set(KEYS.trafficTotals, { home: 0, services: 0, portfolio: 0, about: 0, contact: 0 });
    set(KEYS.trafficLog, []);
  },
};

// ─── Chat ─────────────────────────────────────────────────────────────────────
export const chat = {
  getAllSessions: () => get<ChatSession[]>(KEYS.chatSessions, []),

  getSession: (sessionId: string) =>
    chat.getAllSessions().find(s => s.sessionId === sessionId) ?? null,

  createSession: (sessionId: string, visitorName: string): ChatSession => {
    const welcome: ChatMsg = {
      id: `msg_${Date.now()}`,
      from: "admin",
      text: "👋 Hi! Welcome to Sign World Prints! We're here to help with all your printing and signage needs.",
      timestamp: new Date().toISOString(),
    };
    const prompt: ChatMsg = {
      id: `msg_${Date.now() + 1}`,
      from: "admin",
      text: "💬 Choose an option below or type your message:",
      timestamp: new Date().toISOString(),
    };
    const session: ChatSession = {
      sessionId,
      visitorName,
      startedAt: new Date().toISOString(),
      messages: [welcome, prompt],
      hasUnread: false,
    };
    set(KEYS.chatSessions, [session, ...chat.getAllSessions()]);
    return session;
  },

  sendVisitorMsg: (sessionId: string, text: string) => {
    const sessions = chat.getAllSessions();
    const idx = sessions.findIndex(s => s.sessionId === sessionId);
    if (idx === -1) return;
    const msg: ChatMsg = {
      id: `msg_${Date.now()}`,
      from: "visitor",
      text,
      timestamp: new Date().toISOString(),
    };
    sessions[idx] = { ...sessions[idx], messages: [...sessions[idx].messages, msg], hasUnread: true };
    set(KEYS.chatSessions, sessions);
  },

  sendAdminMsg: (sessionId: string, text: string) => {
    const sessions = chat.getAllSessions();
    const idx = sessions.findIndex(s => s.sessionId === sessionId);
    if (idx === -1) return;
    const msg: ChatMsg = {
      id: `msg_${Date.now()}`,
      from: "admin",
      text,
      timestamp: new Date().toISOString(),
    };
    sessions[idx] = {
      ...sessions[idx],
      messages: [...sessions[idx].messages, msg],
      lastAdminReply: text,
    };
    set(KEYS.chatSessions, sessions);
  },

  markRead: (sessionId: string) => {
    const sessions = chat.getAllSessions();
    const idx = sessions.findIndex(s => s.sessionId === sessionId);
    if (idx === -1) return;
    sessions[idx] = { ...sessions[idx], hasUnread: false };
    set(KEYS.chatSessions, sessions);
  },

  unreadCount: () => chat.getAllSessions().filter(s => s.hasUnread).length,

  deleteSession: (sessionId: string) =>
    set(KEYS.chatSessions, chat.getAllSessions().filter(s => s.sessionId !== sessionId)),
};
