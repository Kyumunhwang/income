'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Sidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <aside className="h-screen w-64 fixed left-0 top-0 bg-surface-container-low shadow-sm flex flex-col py-8 px-4 z-50">
      <div className="mb-10 px-4">
        <h1 className="text-[20px] leading-[28px] font-semibold font-sans text-primary">Precision Ledger</h1>
        <p className="text-[14px] leading-[20px] font-sans text-outline">Personal Ledger</p>
      </div>
      <nav className="flex-grow space-y-2">
        <Link
          href="/"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg font-sans text-[16px] transition-colors duration-200 active:scale-95 ${
            isActive('/')
              ? 'text-secondary font-bold border-r-4 border-secondary bg-surface-container-high'
              : 'text-outline hover:text-secondary hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">dashboard</span>
          <span>Dashboard</span>
        </Link>
        <Link
          href="/income"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg font-sans text-[16px] transition-colors duration-200 active:scale-95 ${
            isActive('/income')
              ? 'text-secondary font-bold border-r-4 border-secondary bg-surface-container-high'
              : 'text-outline hover:text-secondary hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">payments</span>
          <span>Income</span>
        </Link>
        <Link
          href="/expense"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg font-sans text-[16px] transition-colors duration-200 active:scale-95 ${
            isActive('/expense')
              ? 'text-secondary font-bold border-r-4 border-secondary bg-surface-container-high'
              : 'text-outline hover:text-secondary hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">receipt_long</span>
          <span>Expenses</span>
        </Link>
        <Link
          href="/statistics"
          className={`flex items-center gap-3 py-3 px-4 rounded-lg font-sans text-[16px] transition-colors duration-200 active:scale-95 ${
            isActive('/statistics')
              ? 'text-secondary font-bold border-r-4 border-secondary bg-surface-container-high'
              : 'text-outline hover:text-secondary hover:bg-surface-container-high'
          }`}
        >
          <span className="material-symbols-outlined">leaderboard</span>
          <span>Statistics</span>
        </Link>
      </nav>
      <div className="mt-auto px-4 flex items-center gap-3 border-t border-outline-variant pt-6">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-surface-container-highest">
          <img
            alt="User Profile Avatar"
            className="w-full h-full object-cover"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBP3lPfyv4NrlMsYo4s2GWyYJvioP5a7SfbRPD6DvH3PWbx0p6anYgWQBIbsU2w-__0StjHkNBoFNjPSMaVq_xnFT9Kjy--TOA4xRrHAjpYAXW5kP_LDiiG80llkv4_oKKCkW-Mw9QuzarzEGSCj8BKgCG5em2TPdt0msClUfmPeMX2Pi7vBFK5-M4_4rHBLa-qkUOs6bNP8StnI992nnnluYiZw5ccd1mTN4reKfK68Ykm5TaRmy1S7Vw4X4PSEvsr8Sf4YFNwUGY"
          />
        </div>
        <div>
          <p className="text-[14px] font-bold font-sans text-on-surface">Alex Rivera</p>
          <p className="text-[12px] font-bold tracking-[0.05em] font-sans text-outline">PRO ACCOUNT</p>
        </div>
      </div>
    </aside>
  );
}
