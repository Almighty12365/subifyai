import ffmpeg from "./ffmpeg";

export function extractAudio(
  inputPath: string,
  outputPath: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    ffmpeg(inputPath)
      .output(outputPath)
      .audioCodec("libmp3lame")
      .format("mp3")
      .on("end", () => {
        console.log("AUDIO EXTRACTED");
        resolve();
      })
      .on("error", (err) => {
        console.error("FFMPEG ERROR =", err);
        reject(err);
      })
      .run();
  });
}