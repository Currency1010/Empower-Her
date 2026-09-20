import type { Metadata } from "next";
import { Playfair_Display, Source_Sans_3 } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import AppChrome from "@/components/AppChrome";
import favico from "@/assets/favico.ico";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const sourceSans = Source_Sans_3({
  subsets: ["latin"],
  variable: "--font-source-sans",
});

// eslint-disable-next-line react-refresh/only-export-components -- Next.js App Router requires named metadata export
export const metadata: Metadata = {
  title: "Empower Her",
  description: "Community empowerment in Kaduna State, Northern Nigeria and Africa through education and skills development.",
  keywords: ["Community", "Jaba", "Rising Lights"],
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: favico.src,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${playfair.variable} ${sourceSans.variable} font-body antialiased min-h-screen flex flex-col`}>
        <Providers>
          <AppChrome>{children}</AppChrome>
          <Toaster />
          <Sonner />
        </Providers>
      </body>
    </html>
  );
}
