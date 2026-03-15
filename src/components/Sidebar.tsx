"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Video,
  Lightbulb,
  Puzzle,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Search,
  Menu,
  X,
  Sparkles,
  Film,
  FolderClosed,
  FolderOpen,
  Plus,
} from "lucide-react";
import { useAuth } from "@/lib/auth";

const navItems = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/meetings", label: "Meetings", icon: Video },
  { href: "/insights", label: "Insights", icon: Lightbulb },
  { href: "/integrations", label: "Integrations", icon: Puzzle },
  { href: "/settings", label: "Settings", icon: Settings },
];

const mockFolders = [
  { id: "1", name: "Sales Calls", count: 12 },
  { id: "2", name: "Product Syncs", count: 8 },
  { id: "3", name: "Customer Interviews", count: 5 },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [foldersExpanded, setFoldersExpanded] = useState(true);

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={() => setMobileOpen(true)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sidebar rounded-lg text-white shadow-lg"
        aria-label="Open navigation menu"
      >
        <Menu className="w-5 h-5" aria-hidden="true" />
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        role="navigation"
        aria-label="Main navigation"
        className={`
          fixed top-0 left-0 h-full bg-sidebar z-50
          flex flex-col transition-all duration-300 ease-in-out
          ${collapsed ? "w-[72px]" : "w-[260px]"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Logo area */}
        <div className="flex items-center justify-between px-5 h-16 border-b border-white/10">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 bg-brand-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-brand-500/20">
              <span className="text-white font-bold text-sm">tv</span>
            </div>
            {!collapsed && (
              <span className="text-white font-bold text-xl tracking-tight">tl;dv</span>
            )}
          </Link>
          <button
            onClick={() => setMobileOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
            aria-label="Close navigation menu"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Ask tl;dv AI */}
        {!collapsed ? (
          <div className="px-3 pt-3 pb-1">
            <button className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-brand-500/30 text-white hover:from-brand-500/30 hover:to-purple-500/30 transition-all group">
              <Sparkles className="w-4 h-4 text-brand-300 group-hover:text-brand-200 flex-shrink-0" />
              <span className="text-sm font-medium text-white/90 group-hover:text-white">Ask tl;dv AI</span>
            </button>
          </div>
        ) : (
          <div className="px-3 pt-3 pb-1 flex justify-center">
            <button
              className="w-10 h-10 rounded-lg bg-gradient-to-r from-brand-500/20 to-purple-500/20 border border-brand-500/30 flex items-center justify-center text-brand-300 hover:text-brand-200 transition-colors"
              title="Ask tl;dv AI"
            >
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Search */}
        {!collapsed && (
          <div className="px-3 py-2">
            <div className="flex items-center gap-2 bg-sidebar-lighter rounded-lg px-3 py-2 text-white/40">
              <Search className="w-4 h-4 flex-shrink-0" />
              <input
                type="text"
                placeholder="Search meetings..."
                aria-label="Search meetings"
                className="bg-transparent text-sm text-white placeholder-white/40 outline-none w-full"
              />
            </div>
          </div>
        )}

        {/* Nav items */}
        <nav className="flex-1 px-3 py-2 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={`
                  flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
                  ${
                    isActive
                      ? "bg-brand-500 text-white shadow-lg shadow-brand-500/25"
                      : "text-white/60 hover:text-white hover:bg-sidebar-light"
                  }
                  ${collapsed ? "justify-center" : ""}
                `}
                title={collapsed ? item.label : undefined}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                {!collapsed && (
                  <span className="text-sm font-medium">{item.label}</span>
                )}
              </Link>
            );
          })}

          {/* Clips & Reels */}
          <Link
            href="/meetings"
            onClick={() => setMobileOpen(false)}
            className={`
              flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200
              text-white/60 hover:text-white hover:bg-sidebar-light
              ${collapsed ? "justify-center" : ""}
            `}
            title={collapsed ? "Clips & Reels" : undefined}
          >
            <Film className="w-5 h-5 flex-shrink-0" />
            {!collapsed && (
              <span className="text-sm font-medium">Clips & Reels</span>
            )}
          </Link>

          {/* Folders section */}
          {!collapsed && (
            <div className="pt-4">
              <button
                onClick={() => setFoldersExpanded(!foldersExpanded)}
                className="flex items-center justify-between w-full px-3 py-1.5 group"
              >
                <span className="text-[11px] font-semibold text-white/40 uppercase tracking-wider">
                  Folders
                </span>
                <div className="flex items-center gap-1">
                  <Plus
                    className="w-3.5 h-3.5 text-white/30 hover:text-white/60 opacity-0 group-hover:opacity-100 transition-opacity"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  />
                  <ChevronDown
                    className={`w-3.5 h-3.5 text-white/30 transition-transform duration-200 ${
                      foldersExpanded ? "" : "-rotate-90"
                    }`}
                  />
                </div>
              </button>
              {foldersExpanded && (
                <div className="mt-1 space-y-0.5">
                  {mockFolders.map((folder) => (
                    <Link
                      key={folder.id}
                      href="/meetings"
                      onClick={() => setMobileOpen(false)}
                      className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-white/50 hover:text-white/80 hover:bg-sidebar-light transition-all group"
                    >
                      <FolderClosed className="w-4 h-4 flex-shrink-0 group-hover:hidden" />
                      <FolderOpen className="w-4 h-4 flex-shrink-0 hidden group-hover:block" />
                      <span className="text-sm truncate flex-1">{folder.name}</span>
                      <span className="text-[10px] text-white/30 bg-white/5 rounded px-1.5 py-0.5">
                        {folder.count}
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
          {collapsed && (
            <button
              className="flex items-center justify-center px-3 py-2.5 rounded-lg text-white/60 hover:text-white hover:bg-sidebar-light transition-all w-full"
              title="Folders"
            >
              <FolderClosed className="w-5 h-5 flex-shrink-0" />
            </button>
          )}
        </nav>

        {/* User section */}
        <div className="border-t border-white/10 p-3">
          <div
            className={`flex items-center gap-3 px-3 py-2 ${collapsed ? "justify-center" : ""}`}
          >
            <div className="w-8 h-8 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
              <span className="text-white text-xs font-semibold">
                {initials}
              </span>
            </div>
            {!collapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-medium truncate">
                  {user?.name || "User"}
                </p>
                <p className="text-white/40 text-xs truncate">
                  {user?.email || "user@example.com"}
                </p>
              </div>
            )}
            {!collapsed && (
              <button
                onClick={logout}
                className="text-white/40 hover:text-white transition-colors"
                title="Sign out"
                aria-label="Sign out"
              >
                <LogOut className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex absolute -right-3 top-20 w-6 h-6 bg-sidebar-lighter border border-white/10 rounded-full items-center justify-center text-white/60 hover:text-white transition-colors"
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? (
            <ChevronRight className="w-3 h-3" />
          ) : (
            <ChevronLeft className="w-3 h-3" />
          )}
        </button>
      </aside>

      {/* Spacer */}
      <div
        className={`hidden lg:block flex-shrink-0 transition-all duration-300 ${collapsed ? "w-[72px]" : "w-[260px]"}`}
      />
    </>
  );
}
