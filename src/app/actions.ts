'use server';

import { appendSheetData } from '@/lib/googleSheets';
import { revalidatePath } from 'next/cache';

export async function addIncome(formData: FormData) {
  const date = formData.get('date') as string;
  const description = formData.get('description') as string;
  const amount = formData.get('amount') as string;
  const category = formData.get('category') as string;
  
  if (!date || !description || !amount) return;

  await appendSheetData('Income!A:D', [[date, description, amount, category]]);
  
  revalidatePath('/');
  revalidatePath('/income');
  revalidatePath('/statistics');
}

export async function addExpense(formData: FormData) {
  const date = formData.get('date') as string;
  const description = formData.get('description') as string;
  const amount = formData.get('amount') as string;
  const category = formData.get('category') as string;
  
  if (!date || !description || !amount) return;

  await appendSheetData('Expense!A:D', [[date, description, amount, category]]);
  
  revalidatePath('/');
  revalidatePath('/expense');
  revalidatePath('/statistics');
}
