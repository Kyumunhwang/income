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
  let privateKey = process.env.GOOGLE_PRIVATE_KEY || '';
  let clientEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL || '';

  // 1. If the user accidentally pasted the ENTIRE JSON file into GOOGLE_PRIVATE_KEY
  if (privateKey.trim().startsWith('{')) {
    try {
      const parsed = JSON.parse(privateKey);
      if (parsed.private_key) privateKey = parsed.private_key;
      if (parsed.client_email && !clientEmail) clientEmail = parsed.client_email;
    } catch (e) {
      console.warn("Failed to parse GOOGLE_PRIVATE_KEY as JSON.");
    }
  }

  // 2. Remove surrounding quotes if accidentally included
  privateKey = privateKey.replace(/^["']|["']$/g, '');

  // 3. Handle literal \n strings (very common in Vercel env vars)
  // This replaces literal backslash+n with an actual newline character
  privateKey = privateKey.split('\\n').join('\n');

  // 4. If the key STILL doesn't have real newlines, it's completely mangled (spaces instead of newlines)
  if (privateKey && !privateKey.includes('\n')) {
    let keyContent = privateKey
      .replace(/-----BEGIN PRIVATE KEY-----/g, '')
      .replace(/-----END PRIVATE KEY-----/g, '')
      .replace(/\s+/g, '');
    const chunks = keyContent.match(/.{1,64}/g) || [];
    privateKey = `-----BEGIN PRIVATE KEY-----\n${chunks.join('\n')}\n-----END PRIVATE KEY-----\n`;
  }

  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: clientEmail,
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
