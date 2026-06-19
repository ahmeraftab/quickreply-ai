/**
 * Twilio WhatsApp helpers — sending replies and verifying inbound webhooks.
 *
 * These are only used by /api/webhook for the real WhatsApp integration. The
 * browser demo and admin dashboard do not require Twilio credentials.
 */

import twilio from "twilio";

export function isTwilioConfigured(): boolean {
  return Boolean(
    process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_WHATSAPP_NUMBER,
  );
}

/** Send a WhatsApp message back to a customer via Twilio. */
export async function sendWhatsAppMessage(
  to: string,
  body: string,
): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_WHATSAPP_NUMBER;

  if (!accountSid || !authToken || !from) {
    throw new Error("Twilio is not configured.");
  }

  const client = twilio(accountSid, authToken);
  await client.messages.create({ from, to, body });
}

/**
 * Verify that an inbound request genuinely came from Twilio using the
 * X-Twilio-Signature header. Returns true when verification passes (or when
 * verification is intentionally skipped because no auth token is set).
 */
export function verifyTwilioSignature(
  signature: string | null,
  url: string,
  params: Record<string, string>,
): boolean {
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  if (!authToken) return false;
  if (!signature) return false;

  return twilio.validateRequest(authToken, signature, url, params);
}
