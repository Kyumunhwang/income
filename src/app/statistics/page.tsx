import { getSheetData } from "@/lib/googleSheets";
import MonthlyChart from "@/components/MonthlyChart";
import { prepareMonthlyData } from "@/lib/chartUtils";

export default async function StatisticsPage() {
  let incomeData = await getSheetData("Income!A2:D");
  let expenseData = await getSheetData("Expense!A2:D");

  incomeData = incomeData || [];
  expenseData = expenseData || [];

  const chartData = prepareMonthlyData(incomeData, expenseData);

  const totalIncome = incomeData.reduce((acc, row) => acc + parseFloat(row[2] || "0"), 0);
  const totalExpense = expenseData.reduce((acc, row) => acc + parseFloat(row[2] || "0"), 0);
  const balance = totalIncome - totalExpense;

  const hasData = incomeData.length > 0 || expenseData.length > 0;

  return (
    <div className="max-w-[1280px] mx-auto">
      <div className="mb-10">
        <h2 className="text-[32px] font-bold font-sans text-on-surface mb-2 tracking-[-0.02em]">Monthly Statistics</h2>
        <p className="text-[16px] font-sans text-outline">Analyze your financial habits</p>
      </div>

      {!hasData ? (
        <div className="bg-surface rounded-xl p-16 flex flex-col items-center justify-center border border-outline-variant/30 text-center shadow-sm">
          <div className="w-20 h-20 bg-[#f0edef] rounded-full flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-[40px] text-outline">leaderboard</span>
          </div>
          <h3 className="text-[20px] font-bold text-on-surface mb-2">No data to analyze</h3>
          <p className="text-[16px] text-outline max-w-md mb-8">
            Add income and expense records to see your monthly statistics and charts.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-surface p-8 rounded-xl shadow-[0_2px_4px_rgba(15,23,42,0.04)] border border-outline-variant/30">
            <h3 className="text-[20px] font-semibold text-on-surface mb-6">Cash Flow Summary</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-[#f6f3f5] rounded-lg">
                <span className="text-[16px] font-bold text-on-surface">Total Income</span>
                <span className="text-[16px] font-bold text-success font-mono">₩{totalIncome.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-[#f6f3f5] rounded-lg">
                <span className="text-[16px] font-bold text-on-surface">Total Expense</span>
                <span className="text-[16px] font-bold text-error font-mono">₩{totalExpense.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-secondary/10 rounded-lg">
                <span className="text-[16px] font-bold text-on-surface">Net Balance</span>
                <span className="text-[18px] font-bold text-primary font-mono">₩{balance.toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="bg-surface p-8 rounded-xl shadow-[0_2px_4px_rgba(15,23,42,0.04)] border border-outline-variant/30 flex flex-col min-h-[300px]">
            <h3 className="text-[20px] font-semibold text-on-surface mb-6">6 Months Trend</h3>
            <div className="flex-grow">
               <MonthlyChart data={chartData} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
