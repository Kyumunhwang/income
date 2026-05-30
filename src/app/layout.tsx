import type { Metadata } from "next";
import { Inter, Hanken_Grotesk } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const hanken = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });

export const metadata: Metadata = {
  title: "Precision Ledger",
  description: "Personal Income and Expense Ledger",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
        <style>{`
          .material-symbols-outlined {
            font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          }
        `}</style>
      </head>
      <body
        className={`${inter.variable} ${hanken.variable} antialiased bg-background text-foreground`}
      >
        <Sidebar />
        <Suspense fallback={<div className="fixed top-0 right-0 left-64 h-16 bg-surface border-b border-outline-variant shadow-sm z-40"></div>}>
          <Header />
        </Suspense>
        <main className="ml-64 pt-24 pb-12 px-8 min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
