import ffmpeg from "fluent-ffmpeg";

ffmpeg.setFfmpegPath(
  "C:\\Users\\AMAN UPADHYAY\\AppData\\Local\\Microsoft\\WinGet\\Packages\\Gyan.FFmpeg_Microsoft.Winget.Source_8wekyb3d8bbwe\\ffmpeg-8.1.1-full_build\\bin\\ffmpeg.exe"
);

console.log("USING GYAN FFMPEG");

export default ffmpeg;