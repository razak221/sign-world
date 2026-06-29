/**
 * db.ts — Unified Supabase database layer
 * Replaces localStorage-based storage.ts for cross-device, cloud-persisted data.
 *
 * localStorage (storage.ts) is still used ONLY for:
 *  - Auth session  (sw_session)
 *  - Chat session ID (sessionStorage in LiveChat.tsx)
 */
import { supabase } from "./supabase";

// ─── Re-export types used by pages ───────────────────────────────────────────

export interface Message {
  id: string;
  name: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
  read: boolean;
  created_at: string;
}

export interface ChatSession {
  id: string;          // uuid PK from DB
  session_key: string; // browser sessionStorage id
  visitor_name: string;
  started_at: string;
  has_unread: boolean;
}

export interface ChatMessage {
  id: string;
  session_id: string;
  sender: "visitor" | "admin";
  text: string;
  created_at: string;
}

export interface CustomProject {
  id: number;
  title: string;
  category: string;
  description?: string;
  image_url?: string;
  created_at?: string;
}

export interface DefaultEdit {
  default_id: number;
  title?: string;
  description?: string;
  category?: string;
}

export interface TrafficTotals {
  home: number;
  services: number;
  portfolio: number;
  about: number;
  contact: number;
}

// ─── Auth (still localStorage — no server auth needed) ───────────────────────
export const auth = {
  isLoggedIn: () => {
    try { return localStorage.getItem("sw_session") === "true"; } catch { return false; }
  },
  login:  () => { try { localStorage.setItem("sw_session", "true"); } catch {} },
  logout: () => { try { localStorage.removeItem("sw_session"); } catch {} },
};

// ─── Messages ─────────────────────────────────────────────────────────────────
export const messages = {
  getAll: async (): Promise<Message[]> => {
    const { data } = await supabase
      .from("messages")
      .select("*")
      .order("created_at", { ascending: false });
    return data ?? [];
  },

  add: async (m: Omit<Message, "id" | "created_at">): Promise<void> => {
    await supabase.from("messages").insert([{
      name: m.name, email: m.email, phone: m.phone,
      service: m.service, message: m.message, read: false,
    }]);
  },

  markRead: async (id: string): Promise<void> => {
    await supabase.from("messages").update({ read: true }).eq("id", id);
  },

  delete: async (id: string): Promise<void> => {
    await supabase.from("messages").delete().eq("id", id);
  },

  unreadCount: async (): Promise<number> => {
    const { count } = await supabase
      .from("messages")
      .select("*", { count: "exact", head: true })
      .eq("read", false);
    return count ?? 0;
  },
};

// ─── Portfolio ────────────────────────────────────────────────────────────────
export const portfolio = {
  getCustom: async (): Promise<CustomProject[]> => {
    const { data } = await supabase
      .from("portfolio_custom")
      .select("*")
      .order("created_at", { ascending: true });
    return data ?? [];
  },

  uploadImage: async (file: File): Promise<string> => {
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    
    const { error } = await supabase.storage
      .from('portfolio_images')
      .upload(fileName, file);

    if (error) {
      console.error("Upload error:", error);
      throw new Error("Failed to upload image.");
    }

    const { data } = supabase.storage
      .from('portfolio_images')
      .getPublicUrl(fileName);
      
    return data.publicUrl;
  },

  getHiddenIds: async (): Promise<number[]> => {
    const { data } = await supabase.from("portfolio_hidden").select("default_id");
    return (data ?? []).map((r: { default_id: number }) => r.default_id);
  },

  getDefaultEdits: async (): Promise<Record<number, DefaultEdit>> => {
    const { data } = await supabase.from("portfolio_edits").select("*");
    const result: Record<number, DefaultEdit> = {};
    (data ?? []).forEach((r: DefaultEdit) => { result[r.default_id] = r; });
    return result;
  },

  addCustom: async (p: Omit<CustomProject, "id" | "created_at">): Promise<void> => {
    await supabase.from("portfolio_custom").insert([{
      title: p.title, category: p.category,
      description: p.description, image_url: p.image_url,
    }]);
  },

  updateCustom: async (id: number, patch: Partial<CustomProject>): Promise<void> => {
    await supabase.from("portfolio_custom").update({
      title: patch.title, category: patch.category,
      description: patch.description, image_url: patch.image_url,
    }).eq("id", id);
  },

  deleteCustom: async (id: number): Promise<void> => {
    await supabase.from("portfolio_custom").delete().eq("id", id);
  },

  hideDefault: async (id: number): Promise<void> => {
    await supabase.from("portfolio_hidden").upsert([{ default_id: id }]);
  },

  showDefault: async (id: number): Promise<void> => {
    await supabase.from("portfolio_hidden").delete().eq("default_id", id);
  },

  editDefault: async (id: number, patch: Partial<DefaultEdit>): Promise<void> => {
    await supabase.from("portfolio_edits").upsert([{
      default_id: id,
      ...(patch.title !== undefined && { title: patch.title }),
      ...(patch.description !== undefined && { description: patch.description }),
      ...(patch.category !== undefined && { category: patch.category }),
    }]);
  },
};

// ─── Traffic ──────────────────────────────────────────────────────────────────
export const traffic = {
  recordView: async (page: string): Promise<void> => {
    await supabase.from("page_views").insert([{ page }]);
  },

  getTotals: async (): Promise<TrafficTotals> => {
    const { data } = await supabase.from("page_views").select("page");
    const totals: TrafficTotals = { home: 0, services: 0, portfolio: 0, about: 0, contact: 0 };
    (data ?? []).forEach((r: { page: string }) => {
      const p = r.page as keyof TrafficTotals;
      if (p in totals) totals[p]++;
    });
    return totals;
  },

  getLog: async (limit = 200) => {
    const { data } = await supabase
      .from("page_views")
      .select("page, created_at")
      .order("created_at", { ascending: false })
      .limit(limit);
    return data ?? [];
  },

  clearLog: async (): Promise<void> => {
    await supabase.from("page_views").delete().neq("id", 0);
  },
};

// ─── Chat ─────────────────────────────────────────────────────────────────────
export const chat = {
  // ── Session management ────────────────────────────────────
  getOrCreateSession: async (sessionKey: string): Promise<ChatSession> => {
    const { data: existing } = await supabase
      .from("chat_sessions")
      .select("*")
      .eq("session_key", sessionKey)
      .single();

    if (existing) return existing as ChatSession;

    // Create new session
    const { data: created } = await supabase
      .from("chat_sessions")
      .insert([{ session_key: sessionKey, visitor_name: "Visitor" }])
      .select("*")
      .single();

    // Insert welcome messages
    if (created) {
      await supabase.from("chat_messages").insert([
        {
          session_id: created.id,
          sender: "admin",
          text: "👋 Hi! Welcome to Sign World Prints! We're here to help with all your printing and signage needs.",
        },
        {
          session_id: created.id,
          sender: "admin",
          text: "💬 Choose an option below or type your message:",
        },
      ]);
    }

    return created as ChatSession;
  },

  getAllSessions: async (): Promise<ChatSession[]> => {
    const { data } = await supabase
      .from("chat_sessions")
      .select("*")
      .order("started_at", { ascending: false });
    return (data ?? []) as ChatSession[];
  },

  getMessages: async (sessionId: string): Promise<ChatMessage[]> => {
    const { data } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("session_id", sessionId)
      .order("created_at", { ascending: true });
    return (data ?? []) as ChatMessage[];
  },

  sendVisitorMsg: async (sessionId: string, text: string): Promise<void> => {
    await supabase.from("chat_messages").insert([{
      session_id: sessionId, sender: "visitor", text,
    }]);
    await supabase.from("chat_sessions")
      .update({ has_unread: true })
      .eq("id", sessionId);
  },

  sendAdminMsg: async (sessionId: string, text: string): Promise<void> => {
    await supabase.from("chat_messages").insert([{
      session_id: sessionId, sender: "admin", text,
    }]);
  },

  markRead: async (sessionId: string): Promise<void> => {
    await supabase.from("chat_sessions")
      .update({ has_unread: false })
      .eq("id", sessionId);
  },

  unreadCount: async (): Promise<number> => {
    const { count } = await supabase
      .from("chat_sessions")
      .select("*", { count: "exact", head: true })
      .eq("has_unread", true);
    return count ?? 0;
  },

  deleteSession: async (sessionId: string): Promise<void> => {
    await supabase.from("chat_sessions").delete().eq("id", sessionId);
  },

  // ── Realtime subscriptions ────────────────────────────────
  subscribeToMessages: (
    sessionId: string,
    callback: (msg: ChatMessage) => void
  ) => {
    return supabase
      .channel(`chat_messages:${sessionId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "chat_messages",
          filter: `session_id=eq.${sessionId}`,
        },
        (payload) => callback(payload.new as ChatMessage)
      )
      .subscribe();
  },

  subscribeToSessions: (callback: () => void) => {
    return supabase
      .channel("chat_sessions_all")
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "chat_sessions" },
        callback
      )
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "chat_messages" },
        callback
      )
      .subscribe();
  },

  subscribeToNewMessages: (callback: () => void) => {
    return supabase
      .channel("admin_messages_inbox")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        callback
      )
      .subscribe();
  },
};
