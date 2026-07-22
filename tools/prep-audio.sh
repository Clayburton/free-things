#!/usr/bin/env bash
# Convert any raw bounces in assets/audio/ into small looping mp3s.
# Originals are left alone; only .mp3 files are written.
#
#   tools/prep-audio.sh            → convert everything that needs it
#   tools/prep-audio.sh agong.wav  → convert just one
#
set -euo pipefail
cd "$(dirname "$0")/.."
DIR="assets/audio"

shopt -s nullglob nocaseglob
FILES=("$@")
if [ ${#FILES[@]} -eq 0 ]; then
  FILES=("$DIR"/*.wav "$DIR"/*.aif "$DIR"/*.aiff "$DIR"/*.m4a "$DIR"/*.flac "$DIR"/*.caf)
fi

[ ${#FILES[@]} -eq 0 ] && { echo "nothing to convert in $DIR"; exit 0; }

for f in "${FILES[@]}"; do
  [ -f "$f" ] || f="$DIR/$f"
  [ -f "$f" ] || { echo "skip: $f not found"; continue; }
  base="$(basename "${f%.*}")"
  out="$DIR/$base.mp3"

  # gentle level match so one clip isn't twice as loud as the next,
  # and a short fade at each end so the loop doesn't click
  ffmpeg -y -loglevel error -i "$f" \
    -af "loudnorm=I=-17:TP=-1.5:LRA=11,afade=t=in:st=0:d=0.02,areverse,afade=t=in:st=0:d=0.02,areverse" \
    -ac 2 -ar 44100 -c:a libmp3lame -q:a 5 "$out"

  printf "%-26s → %s (%s)\n" "$(basename "$f")" "$(basename "$out")" \
    "$(du -h "$out" | cut -f1 | tr -d ' ')"
done

echo
echo "done. filenames must match the audio: lines in items.js"
