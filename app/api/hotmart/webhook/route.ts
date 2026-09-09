import { createHash, timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

export const runtime = 'nodejs';

const PRODUCT_ID = 8397901;
const TRACKED_EVENTS = new Set([
  'PURCHASE_APPROVED',
  'PURCHASE_COMPLETE',
  'PURCHASE_REFUNDED',
  'PURCHASE_CHARGEBACK',
]);

type UnknownRecord = Record<string, unknown>;

function asRecord(value: unknown): UnknownRecord {
  return value !== null && typeof value === 'object' ? (value as UnknownRecord) : {};
}

function asString(value: unknown): string | undefined {
  return typeof value === 'string' && value.trim() ? value.trim() : undefined;
}

function asNumber(value: unknown): number | undefined {
  return typeof value === 'number' && Number.isFinite(value) ? value : undefined;
}

function sameSecret(received: string, expected: string): boolean {
  const left = Buffer.from(received);
  const right = Buffer.from(expected);
  return left.length === right.length && timingSafeEqual(left, right);
}

function eventName(hotmartEvent: string): string {
  if (hotmartEvent === 'PURCHASE_REFUNDED') return 'refund';
  if (hotmartEvent === 'PURCHASE_CHARGEBACK') return 'chargeback';
  return 'purchase';
}

export async function GET() {
  return NextResponse.json({ ok: true, service: 'hotmart-webhook' });
}

export async function POST(request: Request) {
  const expectedHottok = process.env.HOTMART_HOTTOK;
  const receivedHottok = request.headers.get('x-hotmart-hottok') ?? '';

  if (!expectedHottok) {
    return NextResponse.json({ ok: false, error: 'Webhook not configured' }, { status: 503 });
  }

  if (!receivedHottok || !sameSecret(receivedHottok, expectedHottok)) {
    return NextResponse.json({ ok: false, error: 'Unauthorized' }, { status: 401 });
  }

  let payload: UnknownRecord;
  try {
    payload = asRecord(await request.json());
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 });
  }

  const hotmartEvent = asString(payload.event);
  if (!hotmartEvent || !TRACKED_EVENTS.has(hotmartEvent)) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const data = asRecord(payload.data);
  const product = asRecord(data.product);
  const purchase = asRecord(data.purchase);
  const offer = asRecord(purchase.offer);
  const price = asRecord(purchase.price);
  const productId = asNumber(product.id);

  if (productId !== PRODUCT_ID) {
    return NextResponse.json({ ok: true, ignored: true });
  }

  const transactionId = asString(purchase.transaction) ?? asString(payload.id);
  const measurementId = process.env.GA4_MEASUREMENT_ID;
  const apiSecret = process.env.GA4_API_SECRET;

  if (!transactionId || !measurementId || !apiSecret) {
    return NextResponse.json({ ok: false, error: 'Analytics not configured' }, { status: 503 });
  }

  const value = asNumber(price.value);
  const currency = asString(price.currency_value) ?? asString(price.currency_code) ?? 'USD';
  const offerCode = asString(offer.code) ?? 'unknown';
  const clientId = `${createHash('sha256').update(transactionId).digest('hex').slice(0, 20)}.1`;

  const analyticsResponse = await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
    {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        timestamp_micros: Date.now() * 1000,
        events: [
          {
            name: eventName(hotmartEvent),
            params: {
              transaction_id: transactionId,
              currency,
              ...(value === undefined ? {} : { value }),
              hotmart_event: hotmartEvent,
              offer_code: offerCode,
              items: [{ item_id: String(PRODUCT_ID), item_name: 'Lazos Lucrativos' }],
            },
          },
        ],
      }),
    },
  );

  if (!analyticsResponse.ok) {
    return NextResponse.json({ ok: false, error: 'Analytics delivery failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
