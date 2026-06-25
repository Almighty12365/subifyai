import { spawn } from "child_process";
import path from "path";

export function transcribeAudio(audioPath: string): Promise<any> {
  return new Promise((resolve, reject) => {
    const script = path.join(
      process.cwd(),
      "python",
      "transcribe.py"
    );

    const python = spawn("python", [
      script,
      audioPath,
    ]);

    let output = "";
    let error = "";

    python.stdout.on("data", (data) => {
      output += data.toString();
    });

    python.stderr.on("data", (data) => {
      error += data.toString();
    });

    python.on("close", (code) => {
      if (code !== 0) {
        reject(new Error(error));
        return;
      }

      try {
        resolve(JSON.parse(output));
      } catch (e) {
        reject(e);
      }
    });
  });
}