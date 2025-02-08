import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FMABordle",
  description: "Daily guess FMAB characters with clues for each try",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased text-foreground`}
      >
        <div className="flex h-screen w-screen overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center blur-[7px] z-0"
            style={{ backgroundImage: "url('/assets/background.jpg')" }}
          />
          <div className="absolute h-full w-full bg-[--background] opacity-60" />
          <div className="static z-10">{children}</div>
        </div>
      </body>
    </html>
  );
}
