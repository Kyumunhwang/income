'use client';

import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { useState, useRef, useEffect } from 'react';

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);
  const settingsRef = useRef<HTMLDivElement>(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setIsNotifOpen(false);
      }
      if (settingsRef.current && !settingsRef.current.contains(event.target as Node)) {
        setIsSettingsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <header className="fixed top-0 right-0 left-64 h-16 bg-surface border-b border-outline-variant shadow-sm flex justify-between items-center px-8 w-[calc(100%-16rem)] z-40">
      <div className="flex items-center bg-[#f0edef] rounded-full px-4 py-1.5 w-96">
        <span className="material-symbols-outlined text-outline text-[14px] mr-2">search</span>
        <input 
          className="bg-transparent border-none focus:outline-none focus:ring-0 text-[14px] w-full placeholder:text-outline" 
          placeholder="Search transactions..." 
          type="text"
          defaultValue={searchParams.get('q') || ''}
          onChange={(e) => {
            handleSearch(e);
          }}
        />
      </div>
      <div className="flex items-center gap-6">
        {/* Notifications */}
        <div className="relative" ref={notifRef}>
          <button 
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative cursor-pointer active:opacity-80 hover:bg-[#eae7e9] p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-outline">notifications</span>
            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full animate-pulse"></span>
          </button>
          
          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 bg-surface rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden z-50">
              <div className="p-4 border-b border-outline-variant/30 flex justify-between items-center">
                <h3 className="font-bold text-[16px] text-on-surface">Notifications</h3>
                <span className="text-[12px] text-secondary cursor-pointer hover:underline">Mark all as read</span>
              </div>
              <div className="p-4 text-center py-8">
                <span className="material-symbols-outlined text-[32px] text-outline mb-2">notifications_paused</span>
                <p className="text-[14px] text-outline">No new notifications</p>
                <p className="text-[12px] text-outline/80 mt-1">You're all caught up!</p>
              </div>
            </div>
          )}
        </div>

        {/* Settings */}
        <div className="relative" ref={settingsRef}>
          <button 
            onClick={() => setIsSettingsOpen(!isSettingsOpen)}
            className="cursor-pointer active:opacity-80 hover:bg-[#eae7e9] p-2 rounded-full transition-colors"
          >
            <span className="material-symbols-outlined text-outline">settings</span>
          </button>

          {isSettingsOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-surface rounded-xl shadow-lg border border-outline-variant/30 overflow-hidden z-50 py-2">
              <button 
                onClick={() => {
                  alert('프로필 설정 기능은 준비 중입니다.');
                  setIsSettingsOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-[14px] text-on-surface hover:bg-[#f0edef] dark:hover:bg-outline-variant/20 flex items-center gap-3 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-outline">account_circle</span>
                Profile Settings
              </button>
              <button 
                onClick={() => {
                  document.documentElement.classList.toggle('dark');
                  setIsSettingsOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-[14px] text-on-surface hover:bg-[#f0edef] dark:hover:bg-outline-variant/20 flex items-center gap-3 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px] text-outline">palette</span>
                Toggle Dark Mode
              </button>
              <div className="h-px bg-outline-variant/30 my-2"></div>
              <button 
                onClick={() => {
                  alert('로그아웃 처리되었습니다.');
                  setIsSettingsOpen(false);
                }}
                className="w-full text-left px-4 py-2.5 text-[14px] text-error hover:bg-[#f0edef] dark:hover:bg-outline-variant/20 flex items-center gap-3 transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">logout</span>
                Sign Out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
