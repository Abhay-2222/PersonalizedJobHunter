import { NextResponse } from "next/server"

const TELEGRAM_BOT_TOKEN = "8122429509:AAFNODFBkt6O8QA5WBvUGVHA6duRotwURCE"
const TELEGRAM_CHAT_ID = "6023472840"

export async function POST() {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`
    const payload = {
      chat_id: TELEGRAM_CHAT_ID,
      text: "🤖 <b>Job Alert Bot Test</b>\n\nTelegram connection is working perfectly! ✅",
      parse_mode: "HTML",
    }

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })

    if (response.ok) {
      return NextResponse.json({ success: true, message: "Telegram test successful" })
    } else {
      return NextResponse.json({ success: false, message: "Telegram API error" })
    }
  } catch (error) {
    return NextResponse.json({ success: false, message: "Connection error" })
  }
}
