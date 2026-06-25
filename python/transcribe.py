from faster_whisper import WhisperModel
import sys
import json

audio_path = sys.argv[1]

model = WhisperModel(
    "small",
    device="cpu",
    compute_type="int8"
)

segments, info = model.transcribe(
    audio_path,
    beam_size=5,
    vad_filter=True,
    vad_parameters=dict(
        min_silence_duration_ms=500
    )
)

result = {
    "text": "",
    "segments": []
}

for segment in segments:
    result["text"] += segment.text.strip() + " "

    result["segments"].append({
        "start": segment.start,
        "end": segment.end,
        "text": segment.text.strip()
    })

print(json.dumps(result))