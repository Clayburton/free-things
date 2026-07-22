# Drop the demo clips here

One short clip per free thing. The page loads a clip only when you land on that
sleeve, so nothing downloads until someone wants to hear it.

## What to give me

| file | for |
|---|---|
| `agong.mp3` | aGong |
| `gr808.mp3` | gr808 kick |
| `diddley-ebow.mp3` | Diddley ebow |
| `diddley-plucks.mp3` | Diddley plucks |
| `wrenches.mp3` | Wrenches |
| `dem-osc.mp3` | DEM-Osc |

The filename has to match the `audio:` line in `items.js` — that's the only wiring.

Until a file exists, that thing has no play button and its tile can't be
clicked. Drop the mp3 in and it lights up by itself — no code change, no
redeploy of anything but the file.

## What makes a good clip

- **8–20 seconds.** It loops seamlessly, so start and end on something that can
  meet itself. A held pad or a repeating figure loops better than a one-shot.
- **Just the instrument.** No drums under it, no other parts. The point is
  "this is what the thing sounds like."
- **Show the range** the copy promises — aGong's blurb says meditation gong to
  hammered EP, so let it do both if it fits in the time.
- Mono or stereo, any sample rate. Anything you can bounce is fine.

## Encoding

Drop raw bounces (wav/aiff/m4a — anything) into this folder and run:

```
tools/prep-audio.sh
```

It converts everything to a small mp3 at the right level and leaves the
originals alone. Or just drop finished mp3s in and skip the script.

The waveform under each title is measured from the clip itself in the browser —
there is no build step to run and nothing to regenerate.
