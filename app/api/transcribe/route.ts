import { NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";
import fsNative from "fs";

import { extractAudio } from "../../../lib/extractAudio";
import { burnSubtitles } from "../../../lib/burnSubtitles";
import { groq } from "../../../lib/groq";
import { generateSRT } from "../../../lib/subtitles";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "uploads");

    await fs.ensureDir(uploadDir);

    const videoPath = path.join(
      uploadDir,
      `${Date.now()}-${file.name}`
    );


    await fs.writeFile(videoPath, buffer);

    const audioPath = path.join(
      uploadDir,
      `${Date.now()}.mp3`
    );

    await extractAudio(videoPath, audioPath);

    const transcription =
      await groq.audio.transcriptions.create({
        file: fsNative.createReadStream(audioPath),
        model: "whisper-large-v3",
      });

    const srt = generateSRT(transcription.text);

    const srtPath = "C:\\temp\\subtitle.srt";

await fs.ensureDir("C:\\temp");
await fs.writeFile(srtPath, srt);

   const outputVideoPath =
  "C:\\temp\\subtitled.mp4";

    await burnSubtitles(
      videoPath,
      srtPath,
      outputVideoPath
    );

    return NextResponse.json({
      success: true,
      transcript: transcription.text,
      subtitles: srt,
      srtFile: srtPath,
      videoFile: outputVideoPath,
    });
  } catch (error: any) {
    console.error(error);

    return NextResponse.json(
      {
        error: error.message || "Unknown Error",
      },
      { status: 500 }
    );
  }
}