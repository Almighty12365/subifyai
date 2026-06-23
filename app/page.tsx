export default function Home() {
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
          SubifyAI automatically generates stylish captions, subtitles and SRT files for YouTube Shorts, Instagram Reels and TikTok.
        </p>

        <button className="mt-8 bg-blue-600 px-8 py-4 rounded-xl text-lg">
          Upload Video
        </button>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="border-2 border-dashed border-gray-700 rounded-2xl p-16 text-center">
          <h2 className="text-2xl font-bold">
            Drag & Drop Video Here
          </h2>
          <p className="text-gray-400 mt-4">
            MP4, MOV, AVI Supported
          </p>
        </div>
      </section>

      <section className="max-w-6xl mx-auto grid md:grid-cols-3 gap-6 px-6 py-16">
        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">Auto Captions</h3>
          <p className="text-gray-400">
            Generate subtitles automatically.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">SRT Export</h3>
          <p className="text-gray-400">
            Export subtitles in SRT format.
          </p>
        </div>

        <div className="bg-zinc-900 p-6 rounded-xl">
          <h3 className="text-xl font-bold mb-2">4K Export</h3>
          <p className="text-gray-400">
            Download high quality videos.
          </p>
        </div>
      </section>
    </main>
  );
}