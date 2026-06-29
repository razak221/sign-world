import { createBrowserRouter } from "react-router";
import { Home } from "./pages/Home";
import { Services } from "./pages/Services";
import { Portfolio } from "./pages/Portfolio";
import { Contact } from "./pages/Contact";
import { About } from "./pages/About";
import { RootLayout } from "./components/RootLayout";
import { AdminLogin } from "./pages/admin/AdminLogin";
import { AdminLayout } from "./pages/admin/AdminLayout";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminMessages } from "./pages/admin/AdminMessages";
import { AdminPortfolio } from "./pages/admin/AdminPortfolio";
import { AdminTraffic } from "./pages/admin/AdminTraffic";
import { AdminChat } from "./pages/admin/AdminChat";

export const router = createBrowserRouter([
  // ── Public site ───────────────────────────────────────────
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true,           Component: Home },
      { path: "services",      Component: Services },
      { path: "portfolio",     Component: Portfolio },
      { path: "about",         Component: About },
      { path: "contact",       Component: Contact },
    ],
  },
  // ── Admin login ───────────────────────────────────────────
  {
    path: "/admin",
    Component: AdminLogin,
  },
  // ── Admin panel (protected via AdminLayout guard) ─────────
  {
    path: "/admin",
    Component: AdminLayout,
    children: [
      { path: "dashboard", Component: AdminDashboard },
      { path: "messages",  Component: AdminMessages },
      { path: "portfolio", Component: AdminPortfolio },
      { path: "traffic",   Component: AdminTraffic },
      { path: "chat",      Component: AdminChat },
    ],
  },
]);