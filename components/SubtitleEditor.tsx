"use client";

interface SubtitleItem {
  id: number;
  start: string;
  end: string;
  text: string;
}

interface Props {
  subtitles: SubtitleItem[];
  setSubtitles: React.Dispatch<React.SetStateAction<SubtitleItem[]>>;
}

export default function SubtitleEditor({
  subtitles,
  setSubtitles,
}: Props) {
  const updateText = (id: number, value: string) => {
    setSubtitles((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, text: value }
          : item
      )
    );
  };

  return (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800">
      <h2 className="text-2xl font-bold mb-6">
        Subtitle Editor
      </h2>

      <div className="space-y-4 max-h-[600px] overflow-y-auto">

        {subtitles.map((item) => (

          <div
            key={item.id}
            className="bg-zinc-950 rounded-xl p-4 border border-zinc-800"
          >

           <div className="grid grid-cols-2 gap-3 mb-3">

  <div>
    <label className="text-xs text-zinc-400">
      Start
    </label>

    <input
      value={item.start}
      onChange={(e) =>
        setSubtitles((prev) =>
          prev.map((sub) =>
            sub.id === item.id
              ? {
                  ...sub,
                  start: e.target.value,
                }
              : sub
          )
        )
      }
      className="w-full mt-1 bg-zinc-900 rounded-lg px-3 py-2 text-sm"
    />
  </div>

  <div>
    <label className="text-xs text-zinc-400">
      End
    </label>

    <input
      value={item.end}
      onChange={(e) =>
        setSubtitles((prev) =>
          prev.map((sub) =>
            sub.id === item.id
              ? {
                  ...sub,
                  end: e.target.value,
                }
              : sub
          )
        )
      }
      className="w-full mt-1 bg-zinc-900 rounded-lg px-3 py-2 text-sm"
    />
  </div>

</div>

            <textarea
              value={item.text}
              onChange={(e) =>
                updateText(item.id, e.target.value)
              }
              className="w-full bg-transparent outline-none resize-none text-white"
              rows={2}
            />

          </div>

        ))}

      </div>
    </div>
  );
}