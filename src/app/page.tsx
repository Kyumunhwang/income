import { getSheetData } from "@/lib/googleSheets";
import MonthlyChart from "@/components/MonthlyChart";
import { prepareMonthlyData } from "@/lib/chartUtils";

type Props = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function Dashboard({ searchParams }: Props) {
  const params = await searchParams;
  const q = typeof params.q === 'string' ? params.q.toLowerCase() : '';

  let incomeData = await getSheetData("Income!A2:D");
  let expenseData = await getSheetData("Expense!A2:D");

  incomeData = incomeData || [];
  expenseData = expenseData || [];

  const chartData = prepareMonthlyData(incomeData, expenseData);

  if (q) {
    expenseData = expenseData.filter((row: any) => 
      (row[1] || '').toLowerCase().includes(q) || 
      (row[3] || '').toLowerCase().includes(q)
    );
  }

  const totalIncome = incomeData.reduce((acc, row) => acc + parseFloat(row[2] || "0"), 0);
  const totalExpense = expenseData.reduce((acc, row) => acc + parseFloat(row[2] || "0"), 0);
  const balance = totalIncome - totalExpense;
  const budget = 10000000; // Example budget
  const balancePercentage = Math.max(0, Math.min(100, (balance / budget) * 100));

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="mb-10">
        <h2 className="text-[32px] font-bold font-sans text-on-surface mb-2 tracking-[-0.02em]">Financial Overview</h2>
        <p className="text-[16px] font-sans text-outline">Track your performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-surface p-6 rounded-xl border-l-4 border-success shadow-[0_2px_4px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold tracking-[0.05em] text-outline uppercase">Monthly Total Income</span>
            <div className="bg-success/20 p-2 rounded-lg">
              <span className="material-symbols-outlined text-success">trending_up</span>
            </div>
          </div>
          <p className="text-[32px] font-bold text-success font-mono">₩{totalIncome.toLocaleString()}</p>
        </div>

        <div className="bg-surface p-6 rounded-xl border-l-4 border-error shadow-[0_2px_4px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold tracking-[0.05em] text-outline uppercase">Monthly Total Expense</span>
            <div className="bg-error/20 p-2 rounded-lg">
              <span className="material-symbols-outlined text-error">trending_down</span>
            </div>
          </div>
          <p className="text-[32px] font-bold text-error font-mono">₩{totalExpense.toLocaleString()}</p>
        </div>

        <div className="bg-secondary p-6 rounded-xl shadow-[0_2px_4px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[12px] font-bold tracking-[0.05em] text-white uppercase">Remaining Balance</span>
            <div className="bg-white/20 p-2 rounded-lg">
              <span className="material-symbols-outlined text-white">account_balance_wallet</span>
            </div>
          </div>
          <p className="text-[32px] font-bold text-white font-mono">₩{balance.toLocaleString()}</p>
          <div className="w-full bg-white/20 h-1.5 rounded-full mt-4">
            <div className="bg-white h-full rounded-full" style={{ width: `${balancePercentage}%` }}></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-8 bg-surface p-8 rounded-xl shadow-[0_2px_4px_rgba(15,23,42,0.04)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-[20px] font-semibold text-on-surface">Income vs Expenses</h3>
              <p className="text-[14px] text-outline">Recent Activity</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-success"></span>
                <span className="text-[14px] text-outline">Income</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="text-[14px] text-outline">Expense</span>
              </div>
            </div>
          </div>
          <div className="h-64 border-b border-outline/30 pb-2">
             <MonthlyChart data={chartData} />
          </div>
        </div>
        
        <div className="col-span-12 md:col-span-4 bg-surface p-8 rounded-xl shadow-[0_2px_4px_rgba(15,23,42,0.04)] flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-[20px] font-semibold text-on-surface">Recent Transactions</h3>
          </div>
          <div className="space-y-4 flex-grow overflow-y-auto">
            {expenseData.slice(-5).reverse().map((tx: any, idx: number) => (
              <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f0edef] transition-colors cursor-pointer group">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-error/10 flex items-center justify-center text-error">
                    <span className="material-symbols-outlined">receipt</span>
                  </div>
                  <div>
                    <p className="text-[14px] font-bold text-on-surface">{tx[1]}</p>
                    <p className="text-[12px] font-bold tracking-[0.05em] text-outline">{tx[0]}</p>
                  </div>
                </div>
                <p className="text-[15px] font-bold text-error font-mono">-₩{parseFloat(tx[2]).toLocaleString()}</p>
              </div>
            ))}
            {expenseData.length === 0 && (
              <div className="text-center text-outline py-4">No recent expenses</div>
            )}
          </div>
        </div>
      </div>
      
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-secondary text-white rounded-full shadow-lg flex items-center justify-center hover:scale-110 active:scale-95 transition-transform z-50">
        <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>add</span>
      </button>
    </div>
  );
}
