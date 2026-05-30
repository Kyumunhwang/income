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
  let rawKey = process.env.GOOGLE_PRIVATE_KEY || '';
  
  // Extract just the base64 string by removing headers, footers, quotes, and all whitespace/newlines
  let keyContent = rawKey
    .replace(/-----BEGIN PRIVATE KEY-----/g, '')
    .replace(/-----END PRIVATE KEY-----/g, '')
    .replace(/\\n/g, '')
    .replace(/["']/g, '') // Remove any accidental quotes
    .replace(/\s+/g, ''); // Remove all spaces and newlines

  // Rebuild the key into strict 64-character chunks exactly as OpenSSL expects
  const chunks = keyContent.match(/.{1,64}/g) || [];
  const privateKey = `-----BEGIN PRIVATE KEY-----\n${chunks.join('\n')}\n-----END PRIVATE KEY-----\n`;

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key: privateKey,
    },
    scopes: SCOPES,
  });
  return auth;
}

export async function getSheetData(range: string) {
  try {
    const auth = await getAuthToken();
    const sheets = google.sheets({ version: 'v4', auth });
    
    let sheetId = process.env.GOOGLE_SHEET_ID || '';
    if (sheetId.includes('/d/')) {
      sheetId = sheetId.split('/d/')[1].split('/')[0];
    }

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
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

    let sheetId = process.env.GOOGLE_SHEET_ID || '';
    if (sheetId.includes('/d/')) {
      sheetId = sheetId.split('/d/')[1].split('/')[0];
    }

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
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
