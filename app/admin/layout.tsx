"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  Bell,
  CalendarDays,
  HandCoins,
  LayoutDashboard,
  BriefcaseBusiness,
  LogOut,
  Megaphone,
  Newspaper,
  Image as GalleryIcon,
  PanelLeftClose,
  PanelLeftOpen,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import ConfirmActionDialog from "@/components/admin/ConfirmActionDialog";

const navigationItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/admin" },
  { label: "Donations", icon: HandCoins, href: "/admin/donations" },
  { label: "Volunteers", icon: Users, href: "/admin/volunteers" },
  { label: "Users", icon: Users, href: "/admin/users" },
  { label: "Programs", icon: BriefcaseBusiness, href: "/admin/programs" },
  { label: "Marquee", icon: Megaphone, href: "/admin/marquee" },
  { label: "Events", icon: CalendarDays, href: "/admin/events" },
  { label: "News", icon: Newspaper, href: "/admin/news" },
  { label: "News & Updates", icon: Newspaper, href: "/admin/gallery" },
  { label: "Gallery", icon: GalleryIcon, href: "/admin/media" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [isDesktopSidebarVisible, setIsDesktopSidebarVisible] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const loggedInUserName = "Grace Samuel";
  const sidebarContent = (
    <>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 -top-10 h-44 w-44 rounded-full bg-secondary/25 blur-2xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -left-16 h-52 w-52 rounded-full bg-white/10 blur-3xl"
      />

      <div className="relative flex h-full flex-col px-5 py-6">
        <div className="rounded-2xl border border-white/15 bg-white/10 p-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-full bg-white p-1.5">
              <Image src={logo} alt="Rising Lights logo" width={42} height={42} />
            </div>
                <div className="flex items-center">
              <p className="font-body text-[11px] uppercase tracking-[0.28em] text-white/70">
                Admin Dashboard
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-7 space-y-2">
          {navigationItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setIsMobileSidebarOpen(false)}
                className={cn(
                  "group relative flex items-center gap-3 overflow-hidden rounded-xl border px-4 py-3 text-sm font-semibold transition",
                  isActive
                    ? "border-secondary/90 bg-secondary text-primary shadow-[0_8px_22px_-8px_rgba(248,174,31,0.6)]"
                    : "border-white/10 bg-white/[0.06] text-slate-100 hover:border-white/30 hover:bg-white/[0.14]"
                )}
              >
                <span
                  className={cn(
                    "absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full transition",
                    isActive ? "bg-primary" : "bg-transparent group-hover:bg-white/60"
                  )}
                />
                <item.icon
                  className={cn(
                    "h-4 w-4 transition",
                    isActive ? "text-primary" : "text-secondary group-hover:text-white"
                  )}
                />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => setIsLogoutDialogOpen(true)}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/[0.1] px-3 py-2.5 text-sm font-semibold text-white transition hover:border-secondary/80 hover:bg-secondary hover:text-primary"
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </div>
    </>
  );

  return (
    <section className="bg-slate-100/70">
      {isMobileSidebarOpen ? (
        <>
          <button
            type="button"
            onClick={() => setIsMobileSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-slate-950/35 lg:hidden"
            aria-label="Close sidebar overlay"
          />
          <aside className="fixed inset-y-0 left-0 z-50 w-[280px] overflow-hidden border-r border-slate-200 bg-primary text-white shadow-xl lg:hidden">
            {sidebarContent}
          </aside>
        </>
      ) : null}

      <div
        className={cn(
          "grid min-h-screen w-full grid-cols-1",
          isDesktopSidebarVisible ? "lg:grid-cols-[280px_1fr]" : "lg:grid-cols-1"
        )}
      >
        <aside
          className={cn(
            "hidden overflow-hidden border-r border-slate-200 bg-primary text-white lg:order-none lg:sticky lg:top-0 lg:z-auto lg:h-screen",
            isDesktopSidebarVisible ? "lg:block" : "lg:hidden",
          )}
        >
          {sidebarContent}
        </aside>

        <div className="order-1 min-w-0 lg:order-none">
          <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/95 px-4 py-4 backdrop-blur sm:px-8">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setIsMobileSidebarOpen((prev) => !prev)}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm transition hover:border-secondary hover:text-secondary lg:hidden"
                  aria-label={isMobileSidebarOpen ? "Hide sidebar" : "Show sidebar"}
                >
                  {isMobileSidebarOpen ? (
                    <PanelLeftClose className="h-5 w-5" />
                  ) : (
                    <PanelLeftOpen className="h-5 w-5" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDesktopSidebarVisible((prev) => !prev)}
                  className="hidden h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm transition hover:border-secondary hover:text-secondary lg:inline-flex"
                  aria-label={isDesktopSidebarVisible ? "Hide sidebar" : "Show sidebar"}
                >
                  {isDesktopSidebarVisible ? (
                    <PanelLeftClose className="h-5 w-5" />
                  ) : (
                    <PanelLeftOpen className="h-5 w-5" />
                  )}
                </button>
                <div className="hidden items-center gap-3 sm:flex">
                  <div className="text-left">
                    <p className="text-[11px] uppercase tracking-[0.28em] text-slate-500">
                      Welcome Back
                    </p>
                    <p className="font-heading text-xl font-bold text-primary">Admin Dashboard</p>
                  </div>
                  <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 shadow-sm">
                    <div className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">
                      {loggedInUserName
                        .split(" ")
                        .map((part) => part[0])
                        .join("")
                        .slice(0, 2)}
                    </div>
                    <p className="text-sm font-semibold text-slate-700">{loggedInUserName}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-primary shadow-sm transition hover:border-secondary hover:text-secondary"
                  aria-label="Open notifications"
                >
                  <Bell className="h-5 w-5" />
                </button>
              </div>
            </div>
          </header>

          <div className="px-4 py-8 sm:px-8 sm:py-10">{children}</div>
        </div>
      </div>

      <ConfirmActionDialog
        open={isLogoutDialogOpen}
        onOpenChange={setIsLogoutDialogOpen}
        title="Confirm Logout"
        description="Are you sure you want to log out of the admin workspace?"
        confirmLabel="Logout"
        onConfirm={() => {
          setIsLogoutDialogOpen(false);
          router.push("/login");
        }}
        tone="danger"
      />
    </section>
  );
}
