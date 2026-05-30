'use client';

import { useState } from 'react';
import { addIncome } from '@/app/actions';

export default function NewIncomeButton({ isFirst }: { isFirst?: boolean }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isPending, setIsPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPending(true);
    const formData = new FormData(e.currentTarget);
    await addIncome(formData);
    setIsPending(false);
    setIsOpen(false);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className={isFirst 
          ? "bg-secondary text-secondary-foreground px-6 py-2.5 rounded-lg font-bold hover:opacity-90 flex items-center gap-2 transition-opacity"
          : "bg-primary text-primary-foreground px-6 py-2.5 rounded-lg font-bold hover:opacity-90 flex items-center gap-2 transition-opacity"
        }
      >
        <span className="material-symbols-outlined text-[20px]">add</span>
        {isFirst ? 'Add First Income' : 'New Income'}
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-surface p-8 rounded-xl w-full max-w-md shadow-lg border border-outline-variant/30 text-on-surface">
            <h3 className="text-[24px] font-bold mb-6">Add New Income</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-[14px] font-semibold mb-1 text-outline">Date</label>
                <input type="date" name="date" required defaultValue={new Date().toISOString().split('T')[0]} className="w-full p-2 border border-outline-variant rounded-lg bg-surface text-on-surface" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold mb-1 text-outline">Description</label>
                <input type="text" name="description" required placeholder="e.g. Monthly Salary" className="w-full p-2 border border-outline-variant rounded-lg bg-surface text-on-surface" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold mb-1 text-outline">Amount (₩)</label>
                <input type="number" name="amount" required placeholder="5000000" className="w-full p-2 border border-outline-variant rounded-lg bg-surface text-on-surface" />
              </div>
              <div>
                <label className="block text-[14px] font-semibold mb-1 text-outline">Category</label>
                <input type="text" name="category" placeholder="e.g. Salary" className="w-full p-2 border border-outline-variant rounded-lg bg-surface text-on-surface" />
              </div>
              
              <div className="flex gap-4 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsOpen(false)}
                  className="flex-1 py-2.5 border border-outline-variant rounded-lg text-outline font-bold hover:bg-[#f0edef] transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  disabled={isPending}
                  className="flex-1 py-2.5 bg-success text-white rounded-lg font-bold hover:opacity-90 transition-opacity disabled:opacity-50"
                >
                  {isPending ? 'Saving...' : 'Save Income'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
