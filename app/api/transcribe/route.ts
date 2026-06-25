import { NextResponse } from "next/server";
import fs from "fs-extra";
import path from "path";

import { transcribeAudio } from "../../../lib/transcription";
import { extractAudio } from "../../../lib/extractAudio";
import { burnSubtitles } from "../../../lib/burnSubtitles";
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

    const uploadRoot = path.join(process.cwd(), "uploads");
await fs.ensureDir(uploadRoot);

const projectId = Date.now().toString();

const projectDir = path.join(uploadRoot, projectId);
await fs.ensureDir(projectDir);

const videoPath = path.join(projectDir, "input.mp4");
await fs.writeFile(videoPath, buffer);

const audioPath = path.join(projectDir, "audio.mp3");

const srtPath = path.join(projectDir, "subtitles.srt");

const outputVideoPath = path.join(projectDir, "output.mp4");

const transcriptPath = path.join(projectDir, "transcript.json");

    await extractAudio(videoPath, audioPath);

    const transcription =
  await transcribeAudio(audioPath);

    const subtitleData = generateSRT(transcription.segments);

    await fs.writeFile(srtPath, subtitleData.srt);
    await fs.writeJson(transcriptPath, transcription, {
  spaces: 2,
});
    await burnSubtitles(
      videoPath,
      srtPath,
      outputVideoPath
    );

   return NextResponse.json({
  success: true,
  projectId,
  transcript: transcription.text,
  subtitles: subtitleData.srt,
  subtitleItems: subtitleData.items,
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