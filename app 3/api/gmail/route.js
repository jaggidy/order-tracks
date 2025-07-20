import { google } from 'googleapis';
import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';

export async function GET(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  if (!token?.accessToken) {
    return NextResponse.json({ error: 'Not signed in' }, { status: 401 });
  }

  const auth = new google.auth.OAuth2();
  auth.setCredentials({ access_token: token.accessToken });

  const gmail = google.gmail({ version: 'v1', auth });
  const list = await gmail.users.messages.list({
    userId: 'me',
    q: 'subject:(Order confirmation OR Ваш заказ) newer_than:30d',
  });

  const messages = list.data.messages || [];
  const orders = await Promise.all(messages.map(async ({ id }) => {
    const msg = await gmail.users.messages.get({
      userId: 'me',
      id,
      format: 'full',
    });
    const body = Buffer.from(msg.data.payload.body.data || '', 'base64').toString('utf8');
    const orderMatch = body.match(/Order[#\s]+(\w+)/i);
    const items = [...body.matchAll(/<li>([^–<]+) – ([\dA-Z]+)/g)];
    return {
      id,
      orderNumber: orderMatch ? orderMatch[1] : '—',
      products: items.map(m => ({ name: m[1].trim(), tracking: m[2].trim() })),
    };
  }));
  return NextResponse.json(orders);
}
