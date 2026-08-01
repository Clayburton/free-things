#!/usr/bin/env bash
# Rebuild every web image from the originals in tools/originals/.
#
#   tools/images.sh
#
# Writes BOTH a .webp and a .jpg for each one. The page asks for .webp and
# falls back to .jpg by itself, so nobody on an older machine sees a blank
# tile — a browser only ever downloads one of the two.
#
# Sizes are set by what the page actually renders, not by what came in:
#   art  640px — the tile is at most ~320px, so this is 2x for a retina screen
#   gui  760px — the interface goes full row width on a phone (~350px), 2x
#
# Needs cwebp (brew install webp) and ffmpeg.
set -euo pipefail
cd "$(dirname "$0")/.."

command -v cwebp >/dev/null || { echo "need cwebp — brew install webp"; exit 1; }

shrink () {                      # shrink <src> <outdir> <name> <width> <q>
  local src="$1" dir="$2" name="$3" w="$4" q="$5" tmp
  tmp="$(mktemp -t ckimg).png"
  ffmpeg -y -loglevel error -i "$src" -vf "scale=${w}:-2:flags=lanczos" "$tmp"
  cwebp -quiet -m 6 -q "$q" "$tmp" -o "$dir/$name.webp"
  ffmpeg -y -loglevel error -i "$tmp" -q:v 5 "$dir/$name.jpg"
  rm -f "$tmp"
  printf "  %-18s %6.1f KB webp   %6.1f KB jpg\n" "$name" \
    "$(echo "$(stat -f%z "$dir/$name.webp")/1024" | bc -l)" \
    "$(echo "$(stat -f%z "$dir/$name.jpg")/1024" | bc -l)"
}

echo "artwork (640px, q80):"
for f in tools/originals/art/*; do
  [ -e "$f" ] || continue
  shrink "$f" assets/art "$(basename "${f%.*}")" 640 80
done

echo
echo "interfaces (760px, q85):"
for f in tools/originals/gui/*; do
  [ -e "$f" ] || continue
  shrink "$f" assets/gui "$(basename "${f%.*}")" 760 85
done

echo
echo "on load:  $(du -ch assets/art/*.webp | tail -1 | cut -f1) of webp artwork"
echo "on hover: $(du -ch assets/gui/*.webp | tail -1 | cut -f1) of interfaces"
