"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/lib/api";

const tabs = [
  { name: "Agendas", href: "/admin/agendas" },
  { name: "Products", href: "/admin/products" },
  { name: "News", href: "/admin/news" },
  { name: "Videos", href: "/admin/videos" },
  { name: "User Management", href: "/admin/users" },
];

export default function AdminNav() {
  const pathname = usePathname() || "/";
  const [busy, setBusy] = useState(false);

  async function handleLogout() {
    if (!confirm("Are you sure you want to logout?")) return;

    setBusy(true);
    try {
      await logout();  // clear session server-side (or mock)
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      setBusy(false);
      window.location.href = "/admin/login"; // hard redirect clears all state
    }
  }

  return (
    <div style={{ display: "flex", width: "100%", alignItems: "center" }}>
      <nav className="admin-nav" aria-label="Admin navigation" style={{ flexGrow: 1 }}>
        {tabs.map((t) => (
          <Link key={t.href} href={t.href} className={pathname === t.href ? "active" : ""}>
            {t.name}
          </Link>
        ))}
      </nav>

      <button
        onClick={handleLogout}
        disabled={busy}
        className="btn"
        style={{
          background: "rgba(255,255,255,0.95)",
          color: "#c22053",
          border: "1px solid rgba(194,32,83,0.12)",
          padding: "8px 14px",
          borderRadius: "8px",
          marginLeft: "10px",
          cursor: busy ? "wait" : "pointer",
          fontWeight: 700,
        }}
      >
        {busy ? "Logging out…" : "Logout"}
      </button>
    </div>
  );
}
