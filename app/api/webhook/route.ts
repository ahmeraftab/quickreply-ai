import { type NextRequest, NextResponse } from "next/server";
import { generateRagResponse } from "@/lib/rag";
import {
  isTwilioConfigured,
  sendWhatsAppMessage,
  verifyTwilioSignature,
} from "@/lib/twilio";

export const runtime = "nodejs";
export const maxDuration = 30;

/**
 * Twilio WhatsApp inbound webhook.
 *
 * Twilio POSTs form-encoded data. We verify the signature, run the RAG
 * pipeline against the KickVault knowledge base, and send the reply back over
 * WhatsApp via the Twilio API.
 */
export async function POST(req: NextRequest) {
  if (!isTwilioConfigured()) {
    return NextResponse.json(
      { error: "Twilio is not configured on this deployment." },
      { status: 503 },
    );
  }

  const formData = await req.formData();
  const params: Record<string, string> = {};
  formData.forEach((value, key) => {
    params[key] = typeof value === "string" ? value : "";
  });

  // Verify the request actually came from Twilio.
  const signature = req.headers.get("x-twilio-signature");
  const url =
    (process.env.PUBLIC_BASE_URL?.replace(/\/$/, "") ?? "") + "/api/webhook";

  if (!verifyTwilioSignature(signature, url, params)) {
    return NextResponse.json({ error: "Invalid signature." }, { status: 403 });
  }

  const from = params["From"];
  const incoming = params["Body"]?.trim();

  if (!from || !incoming) {
    return NextResponse.json({ error: "Missing From/Body." }, { status: 400 });
  }

  try {
    const reply = await generateRagResponse(incoming);
    await sendWhatsAppMessage(from, reply);
  } catch (err) {
    const detail = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json(
      { error: `Failed to process message: ${detail}` },
      { status: 500 },
    );
  }

  // Empty TwiML response — we send the reply via the REST API above.
  return new NextResponse(
    '<?xml version="1.0" encoding="UTF-8"?><Response></Response>',
    { status: 200, headers: { "Content-Type": "text/xml" } },
  );
}
