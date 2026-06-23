import ffmpeg from "./ffmpeg";

export function burnSubtitles(
  videoPath: string,
  srtPath: string,
  outputPath: string
): Promise<void> {
  console.log("VIDEO =", videoPath);
  console.log("SRT =", srtPath);
  console.log("OUTPUT =", outputPath);

  const escapedSrt = srtPath
    .replace(/\\/g, "/")
    .replace(/:/g, "\\:");

  console.log("ESCAPED SRT =", escapedSrt);

  return new Promise((resolve, reject) => {
    ffmpeg(videoPath)
      .videoFilters(`subtitles='${escapedSrt}'`)
      .on("start", (commandLine) => {
        console.log("FFMPEG CMD =", commandLine);
      })
      .on("end", () => {
        console.log("SUBTITLES BURNED");
        resolve();
      })
      .on("error", (err) => {
        console.log("FFMPEG ERROR =", err);
        reject(err);
      })
      .save(outputPath);
  });
}