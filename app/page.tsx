"use client";

import { useState } from "react";

export default function Home() {
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");

  const generateSubtitles = async () => {
  try {
    setResult("Loading...");

    const res = await fetch("/api/transcribe");

    console.log("Status:", res.status);

    const data = await res.json();

    console.log("Data:", data);

    setResult(data.text || "No text received");
  } catch (error) {
    console.error(error);
    setResult("Error generating subtitles");
  }
};

  return (
    <main className="min-h-screen bg-black text-white">
      <nav className="flex justify-between items-center p-6 border-b border-gray-800">
        <h1 className="text-2xl font-bold">SubifyAI</h1>

        <button className="bg-white text-black px-4 py-2 rounded-lg">
          Login
        </button>
      </nav>

      <section className="text-center py-20 px-6">
        <h1 className="text-5xl font-bold mb-6">
          Create Viral Captions & Subtitles in Seconds
        </h1>

        <p className="text-gray-400 text-lg max-w-2xl mx-auto">
          SubifyAI automatically generates stylish captions, subtitles and SRT
          files for YouTube Shorts, Instagram Reels and TikTok.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border-2 border-dashed border-gray-700 rounded-2xl p-16 text-center">
          <h2 className="text-2xl font-bold">
            Drag & Drop Video Here
          </h2>

          <p className="text-gray-400 mt-4">
            MP4, MOV, AVI Supported
          </p>

          <div className="max-w-2xl mx-auto mt-8">
            <input
              type="file"
              accept="video/*,audio/*"
              className="w-full border border-gray-700 p-4 rounded-xl bg-zinc-900"
              onChange={(e) =>
                setFileName(e.target.files?.[0]?.name || "")
              }
            />

            {fileName && (
              <p className="mt-4 text-green-400">
                Selected: {fileName}
              </p>
            )}

            <button
              onClick={generateSubtitles}
              className="mt-4 bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-xl font-bold"
            >
              Generate Subtitles
            </button>

            {result && (
  <div className="mt-6 p-4 bg-zinc-900 rounded-xl border border-zinc-700">
    <h3 className="font-bold mb-2">Result</h3>
    <p className="whitespace-pre-wrap">{result}</p>
  </div>
)}
          </div>
        </div>
      </section>
    </main>
  );
}