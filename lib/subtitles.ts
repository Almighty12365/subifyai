export interface SubtitleItem {
  id: number;
  start: string;
  end: string;
  text: string;
}

function formatTime(seconds: number) {
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);
  const ms = Math.floor((seconds - Math.floor(seconds)) * 1000);

  return `${String(hrs).padStart(2, "0")}:${String(mins).padStart(
    2,
    "0"
  )}:${String(secs).padStart(2, "0")},${String(ms).padStart(3, "0")}`;
}

export function generateSRT(text: string) {
  const lines = text
    .split(/[.!?]\s+/)
    .filter((line) => line.trim().length > 0);

  let currentTime = 0;

  const items: SubtitleItem[] = [];

  const srt = lines
    .map((line, index) => {
      const start = currentTime;
      const end = currentTime + 3;

      currentTime += 3;

      const subtitle = {
        id: index + 1,
        start: formatTime(start),
        end: formatTime(end),
        text: line.trim(),
      };

      items.push(subtitle);

      return `${subtitle.id}
${subtitle.start} --> ${subtitle.end}
${subtitle.text}

`;
    })
    .join("");

  return {
    srt,
    items,
  };
}