'use client';

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

type MonthlyData = {
  name: string;
  income: number;
  expense: number;
};

export default function MonthlyChart({ data }: { data: MonthlyData[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e4e2e4" />
        <XAxis 
          dataKey="name" 
          axisLine={false} 
          tickLine={false} 
          tick={{ fontSize: 12, fill: '#76777d', fontWeight: 700 }} 
          dy={10}
        />
        <YAxis 
          hide 
        />
        <Tooltip 
          cursor={{ fill: '#f6f3f5' }}
          contentStyle={{ borderRadius: '8px', border: '1px solid #c6c6cd', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
          formatter={(value: number) => [`₩${value.toLocaleString()}`, '']}
        />
        <Bar dataKey="income" name="Income" fill="#16a34a" radius={[4, 4, 0, 0]} barSize={16} />
        <Bar dataKey="expense" name="Expense" fill="#ba1a1a" radius={[4, 4, 0, 0]} barSize={16} />
      </BarChart>
    </ResponsiveContainer>
  );
}
