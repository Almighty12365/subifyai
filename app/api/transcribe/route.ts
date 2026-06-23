import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: "Say hello from SubifyAI",
    });

    return NextResponse.json({
      text: response.text,
    });
  } catch (error: any) {
    console.error("Gemini Error:", error);

    return NextResponse.json(
      {
        error: error?.message || "Unknown Error",
      },
      { status: 500 }
    );
  }
}