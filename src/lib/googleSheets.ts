import { google } from 'googleapis';

type Transaction = {
  date: string;
  description: string;
  amount: number;
  category: string;
};

// Validate required environment variables
const checkEnvVars = () => {
  if (!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    console.warn("GOOGLE_SERVICE_ACCOUNT_EMAIL is not set in environment variables");
  }
  if (!process.env.GOOGLE_PRIVATE_KEY) {
    console.warn("GOOGLE_PRIVATE_KEY is not set in environment variables");
  }
  if (!process.env.GOOGLE_SHEET_ID) {
    console.warn("GOOGLE_SHEET_ID is not set in environment variables");
  }
};

checkEnvVars();

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function getAuthToken() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      // Replace escaped newlines if passed through environment variables
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: SCOPES,
  });
  return auth;
}

export async function getSheetData(range: string) {
  try {
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
    });
    return response.data.values;
  } catch (error) {
    console.error('Error fetching sheet data:', error);
    return null;
  }
}

export async function appendSheetData(range: string, values: any[][]) {
  try {
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: process.env.GOOGLE_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error appending sheet data:', error);
    return null;
  }
}
