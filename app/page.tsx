"use client";

import { useState } from "react";
import SubtitleEditor from "../components/SubtitleEditor";

export default function Home() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [videoFile, setVideoFile] = useState("");
  const [subtitleItems, setSubtitleItems] = useState([]);

  const generateSubtitles = async () => {
    try {
      if (!file) {
        setResult("Please select a file first");
        return;
      }

      setLoading(true);
      setResult("Uploading and generating subtitles...");

      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/transcribe", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setVideoFile(data.videoFile);
      setSubtitleItems(data.subtitleItems || []);

      if (data.error) {
        setLoading(false);
        setResult(data.error);
        return;
      }

      if (data.subtitles) {
        const blob = new Blob([data.subtitles], {
          type: "text/plain",
        });

        const url = URL.createObjectURL(blob);

        const a = document.createElement("a");
        a.href = url;
        a.download = "subtitles.srt";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }

      setLoading(false);

      setResult(
        data.transcript ||
          "Transcript generated successfully"
      );
    } catch (err) {
      console.error(err);
      setLoading(false);
      setResult("Error generating subtitles");
    }
  };

  return (
    <main className="min-h-screen bg-[#0b0b0b] text-white">

      {/* Navbar */}

      <nav className="border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

          <h1 className="text-2xl font-bold">
            SubifyAI
          </h1>

          <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-lg">
            Login
          </button>

        </div>
      </nav>

      {/* Hero */}

      <section className="text-center py-20 px-6">

        <h1 className="text-6xl font-black leading-tight">

          Create Viral AI
          <br />

          <span className="text-orange-500">
            Captions Instantly
          </span>

        </h1>

        <p className="text-zinc-400 mt-8 max-w-2xl mx-auto text-lg">

          Generate subtitles, captions and SRT files
          for YouTube Shorts, Instagram Reels,
          TikTok and Podcasts using AI.

        </p>

      </section>

      {/* Upload */}

      <section className="max-w-6xl mx-auto px-6 pb-20">

        <div className="grid lg:grid-cols-2 gap-8">

          {/* Left */}

          <div className="bg-zinc-900 rounded-3xl p-8 border border-zinc-800">

            <h2 className="text-2xl font-bold">
              Upload Video
            </h2>

            <p className="text-zinc-400 mt-2">
              MP4, MOV, AVI Supported
            </p>

            <input
              type="file"
              accept="video/*,audio/*"
              className="mt-6 w-full bg-zinc-950 border border-zinc-700 rounded-xl p-4"
              onChange={(e) => {

                const selected =
                  e.target.files?.[0];

                if (!selected) return;

                setFile(selected);

                setPreviewUrl(
                  URL.createObjectURL(selected)
                );

              }}
            />

            <button
              onClick={generateSubtitles}
              disabled={loading}
              className="mt-6 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 py-4 rounded-xl font-bold transition"
            >
              {loading
                ? "Generating..."
                : "Generate Subtitles"}
            </button>
          </div>

          {/* Right */}

          <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800">

            <h2 className="text-2xl font-bold mb-5">
              Video Preview
            </h2>

            {previewUrl ? (
              <video
                src={previewUrl}
                controls
                className="rounded-2xl w-full"
              />
            ) : (
              <div className="h-[420px] rounded-2xl bg-zinc-950 border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500">

                Upload a video to preview

              </div>
            )}

          </div>

        </div>
                {/* Transcript */}

        <div className="mt-10 bg-zinc-900 rounded-3xl border border-zinc-800 p-8">

          <div className="flex items-center justify-between">

            <h2 className="text-2xl font-bold">
              Transcript
            </h2>

            {loading && (
              <span className="text-orange-400 animate-pulse">
                Processing...
              </span>
            )}

          </div>

          {!result ? (

            <div className="mt-6 h-64 rounded-2xl border border-dashed border-zinc-700 flex items-center justify-center text-zinc-500">

              Your transcript will appear here...

            </div>

          ) : (

            <div className="mt-6 bg-zinc-950 rounded-2xl border border-zinc-800 p-6 max-h-[500px] overflow-y-auto">

              <pre className="whitespace-pre-wrap text-zinc-300 leading-8 font-sans">
                {result}
              </pre>
              {videoFile && (
  <a
    href={`/api/download?file=${encodeURIComponent(videoFile)}`}
    className="inline-block mt-6 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-bold"
  >
    Download Video
  </a>
)}
{subtitleItems.length > 0 && (
  <div className="mt-10">
    <SubtitleEditor
      subtitles={subtitleItems}
      setSubtitles={setSubtitleItems}
    />
  </div>
)}

            </div>

          )}

        </div>

        {/* Features */}

        <div className="grid md:grid-cols-3 gap-6 mt-12">

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold">
              ⚡ Fast AI
            </h3>

            <p className="text-zinc-400 mt-3">
              Generate subtitles in seconds using AI.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold">
              🎬 Video Preview
            </h3>

            <p className="text-zinc-400 mt-3">
              Preview your uploaded video instantly.
            </p>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="text-lg font-bold">
              📄 Export SRT
            </h3>

            <p className="text-zinc-400 mt-3">
              Download subtitle files with one click.
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}