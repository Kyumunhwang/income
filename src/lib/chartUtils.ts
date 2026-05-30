export function prepareMonthlyData(incomeData: any[], expenseData: any[]) {
  const monthsMap: Record<string, { income: number; expense: number }> = {};
  
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Helper to parse "YYYY-MM-DD" and get "Mon" (e.g. "2026-05-30" -> "May")
  // Or even better: "May 26"
  const processRow = (row: any[], type: 'income' | 'expense') => {
    if (!row[0] || !row[2]) return;
    const dateStr = row[0]; // e.g. "2026-05-30"
    const amount = parseFloat(row[2]) || 0;
    
    const date = new Date(dateStr);
    if (isNaN(date.getTime())) return;
    
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear().toString().slice(-2);
    const key = `${month} '${year}`;
    
    if (!monthsMap[key]) {
      monthsMap[key] = { income: 0, expense: 0 };
    }
    
    monthsMap[key][type] += amount;
  };

  incomeData.forEach(row => processRow(row, 'income'));
  expenseData.forEach(row => processRow(row, 'expense'));

  // Sort chronologically (assuming keys are somewhat sorted naturally, but better to use real dates)
  // Let's just return the entries mapping to array
  const result = Object.entries(monthsMap).map(([name, data]) => ({
    name,
    income: data.income,
    expense: data.expense
  }));

  // We should sort them properly by parsing the name back to a sortable string
  result.sort((a, b) => {
    const parseSortKey = (name: string) => {
      const [m, y] = name.split(" '"); // ["May", "26"]
      const monthIdx = monthNames.indexOf(m).toString().padStart(2, '0');
      return `${y}${monthIdx}`;
    };
    return parseSortKey(a.name).localeCompare(parseSortKey(b.name));
  });

  // If no data, return some empty placeholders to make the chart look nice
  if (result.length === 0) {
    const currentMonth = new Date().getMonth();
    return [
      { name: monthNames[(currentMonth - 2 + 12) % 12], income: 0, expense: 0 },
      { name: monthNames[(currentMonth - 1 + 12) % 12], income: 0, expense: 0 },
      { name: monthNames[currentMonth], income: 0, expense: 0 },
    ];
  }

  // Return last 6 months max
  return result.slice(-6);
}
