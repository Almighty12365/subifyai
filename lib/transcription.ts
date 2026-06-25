import fs from "fs";
import { groq } from "./groq";

export async function transcribeAudio(
  audioPath: string
) {
  const provider =
    process.env.TRANSCRIPTION_PROVIDER || "groq";

  switch (provider) {
    case "groq":
      return await groq.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: "whisper-large-v3",
      });

    default:
      throw new Error(
        `Unknown transcription provider: ${provider}`
      );
  }
}