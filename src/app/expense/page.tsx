import { getSheetData } from "@/lib/googleSheets";
import NewExpenseButton from "@/components/NewExpenseButton";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function ExpensePage({ searchParams }: Props) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.toLowerCase() : '';

  let expenseData = await getSheetData("Expense!A2:D");
  expenseData = expenseData || [];

  if (q) {
    expenseData = expenseData.filter((row: any) => 
      (row[1] || '').toLowerCase().includes(q) || 
      (row[3] || '').toLowerCase().includes(q)
    );
  }

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="mb-10 flex justify-between items-end">
        <div>
          <h2 className="text-[32px] font-bold font-sans text-on-surface mb-2 tracking-[-0.02em]">Expense Management</h2>
          <p className="text-[16px] font-sans text-outline">Track your spending</p>
        </div>
        <NewExpenseButton />
      </div>

      {expenseData.length === 0 ? (
        <div className="bg-surface rounded-xl p-16 flex flex-col items-center justify-center border border-outline-variant/30 text-center shadow-sm">
          <div className="w-20 h-20 bg-[#f0edef] rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[40px] text-outline">receipt_long</span>
          </div>
          <h3 className="text-[20px] font-bold text-on-surface mb-2">No expense records found</h3>
          <p className="text-[16px] text-outline max-w-md mb-8">
            You haven't recorded any expenses yet. Add your first expense to start tracking your budget.
          </p>
          <NewExpenseButton isFirst={true} />
        </div>
      ) : (
        <div className="bg-surface rounded-xl shadow-sm overflow-hidden border border-outline-variant/30">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#f0edef] text-outline text-[12px] font-bold tracking-[0.05em] uppercase border-b border-outline-variant/50">
                <th className="py-4 px-6 font-semibold">Date</th>
                <th className="py-4 px-6 font-semibold">Description</th>
                <th className="py-4 px-6 font-semibold">Category</th>
                <th className="py-4 px-6 font-semibold text-right">Amount</th>
                <th className="py-4 px-6 font-semibold w-16"></th>
              </tr>
            </thead>
            <tbody>
              {expenseData.map((row: any, index: number) => (
                <tr key={index} className="border-b border-outline-variant/30 hover:bg-[#f6f3f5] transition-colors">
                  <td className="py-4 px-6 text-[14px] text-on-surface">{row[0]}</td>
                  <td className="py-4 px-6 text-[14px] font-bold text-on-surface">{row[1]}</td>
                  <td className="py-4 px-6">
                    <span className="bg-[#f0edef] text-outline text-[12px] px-2.5 py-1 rounded-full font-semibold">
                      {row[3] || 'Uncategorized'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-[15px] font-bold text-error font-mono text-right">
                    -₩{parseFloat(row[2]).toLocaleString()}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <button className="text-outline hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-[20px]">more_vert</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
