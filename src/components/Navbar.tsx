"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/assets/logo.png";
import MarqueeStrip from "@/components/MarqueeStrip";
import useMarqueeItems from "@/hooks/useMarqueeItems";

const navLinks = [
  { label: "Home", path: "/" },
  { label: "About", path: "/about" },
  { label: "Programs", path: "/programs" },
  { label: "Gallery", path: "/gallery" },
  { label: "News & Updates", path: "/news" },
  { label: "Get in touch", path: "/donate" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { items: marqueeItems, enabled: marqueeEnabled } = useMarqueeItems();

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  return (
    <nav className="fixed left-0 right-0 top-0 z-50 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
      {marqueeEnabled ? (
        <div className="border-b border-slate-200 bg-white/90 px-4 py-2 sm:px-6 lg:px-8">
          <MarqueeStrip items={marqueeItems} itemClassName="text-primary" speed="normal" />
        </div>
      ) : null}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex shrink-0 items-center gap-3">
            <div className="rounded-full border border-slate-200 bg-white p-1 shadow-sm">
              <Image src={logo} alt="Rising Lights logo" width={46} height={46} />
            </div>
            <div className="block">
              <p className="font-heading text-lg font-bold leading-none text-primary">Empower Her And</p>
              <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                Youthrise Initiative
              </p>
            </div>
          </Link>

          <div className="hidden flex-1 items-center justify-center md:flex">
            <div className="inline-flex items-center gap-1 rounded-full border border-slate-200 bg-white p-1 shadow-sm">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                  className={cn(
                    "rounded-full px-4 py-2 text-sm font-semibold tracking-wide transition",
                    pathname === link.path
                      ? "bg-primary text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-100 hover:text-primary"
                  )}
              >
                {link.label}
              </Link>
            ))}
            </div>
          </div>

          <div className="hidden shrink-0 md:flex">
            <Link href="https://paystack.shop/pay/ehyi-donation">
              <Button className="rounded-full bg-secondary px-6 py-5 text-sm font-semibold uppercase tracking-wide text-primary transition-all duration-300 hover:bg-secondary/90">
                Donate Now
              </Button>
            </Link>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 transition hover:border-primary hover:text-primary md:hidden"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="absolute w-full border-b border-slate-200 bg-white/95 shadow-lg backdrop-blur-md md:hidden">
          <div className="space-y-2 px-4 pb-6 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={cn(
                  "block rounded-xl px-4 py-3 text-base font-semibold tracking-wide transition",
                  pathname === link.path
                    ? "bg-primary text-white"
                    : "text-slate-700 hover:bg-slate-100 hover:text-primary"
                )}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-1 pt-4">
              <Link href="/donate">
                <Button className="w-full rounded-xl bg-secondary py-6 text-sm font-semibold uppercase tracking-wide text-primary hover:bg-secondary/90">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
