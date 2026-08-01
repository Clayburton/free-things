# free-things — the table

Everything we give away, laid out on one lit surface, for
[clayandkelsy.com/freethings/](https://clayandkelsy.com/freethings/) (page-id **658**).

All of it visible at once — no carousel, no digging. Each thing sits on the
table with its story under it; touch one and it plays; take whatever you want.
An empty place setting at the end marks where the next thing goes.

Plain DOM and CSS. No canvas, no libraries, no CDN. **~33 KB of code plus
282 KB of artwork — and zero bytes of audio until someone asks for it.**

---

## Adding a new free thing

Open `items.js` and add one object. Nothing else in the project changes.

```js
{
  id:    'collide-trial',
  title: 'COLLIDE trial',
  art:   'assets/art/collide.jpg',       // any square image
  page:  'https://clayandkelsy.com/collide-trial/',   // optional — see below
  tint:  '#e8e2ee',                      // its background colour
  song:  'https://clayandkelsy.com/wp-content/uploads/…/collide.mp3',  // optional
  story: 'A sentence or two. Say where it came from — that\'s the charm.',
  specs: ['VST3 · AU', '30 days'],
  take:  { kind: 'page', href: 'https://clayandkelsy.com/collide-trial/' },
  links: [{ label: 'the full story', href: '…' }]
}
```

**The order on the page is the order in this list.** Put a new thing **before**
`{ divider:'more soon', end:true }` so the empty place setting stays last.

**The artwork can be anything** — a drawing, a screenshot of the plugin, a
photo. Square, 700 px or larger, jpg or png. The table gives every image the
same light, the same edge, the same shadow and the same faint hand-placed tilt,
so wildly different pictures still read as one set. There is no style to match.

`take.kind`:
- `'download'` — hits the file directly. Add `size: '74 MB'` and it shows on the
  button. This is what the Kontakt instruments use.
- `'page'` — sends them to a page instead. Use this for anything that goes
  through the free checkout, like the plugins.

**`page` is optional, and usually you don't want it.** This page *is* the main
page for the instruments — the old per-instrument pages said less than these
cards do, so nothing links out to them any more. Only DEM-Osc has a `page`,
because getting it genuinely requires the free checkout. With no `page`, the
picture becomes the play button instead: a big, obvious target.

When there are enough plugin trials to be worth grouping, uncomment the
`{ divider: 'plugins' }` line in `items.js` and they get their own heading.

## Seeing the interface

Every thing has a second image in `assets/gui/` — what the instrument actually
looks like. On a computer you hover the tile and it opens beside it, wider than
the tile, because these are landscape screenshots and squeezing one into a
square makes it too small to read. On a phone there is no hover, so an arrow
sits on the tile: tap it, or swipe the tile sideways, and the interface takes
the tile's place at full row width.

None of them are fetched until someone asks — a cold load pulls zero of the six.

They came from Clay's own Pianobook pack pages (`pianobook.co.uk/packs/<slug>/`)
except DEM-Osc, which is on her own uploads. Encoded at 1100px wide, JPEG q5 —
about 60 KB each, and the thin UI lines stay crisp at that setting.

A nice accident: each interface contains the same hand-drawn object as its
tile, so the hover reads as the drawing revealing the instrument built around
it rather than a swap to something unrelated.

## Audio

Clicking a picture plays that instrument's demo — **the same piece that was on
its old product page**, streamed straight from `clayandkelsy.com/wp-content/
uploads/`. No audio is copied into this repo.

Three things make that fast:

- `preload="none"` and no `<audio>` element is even created until the first
  click, so the page costs nothing to load.
- It **streams** rather than decoding. A `decodeAudioData` on a 1 MB file means
  waiting for the whole download first; streaming starts in about 300 ms.
- The shape drawn under each name comes from `waveforms.js` — roughly 200 bytes
  per song, measured up front by `tools/waveforms.py`. So every song shows its
  real waveform the instant the page loads, without downloading a note.

There is no analyser: the playhead comes from `audio.currentTime` and the bead
breathes on the song's own measured shape. That works the same however the
audio is served, and needs no AudioContext.

**After adding or changing a `song:` URL, run `tools/waveforms.py`.** It reads
the URLs out of `items.js` itself, so there's nothing to keep in sync.
Never hand-edit `waveforms.js`.

## Running it

```
preview: launch config "free-things", port 8857
```

**Bump `?v=N` on the script and link tags in `index.html` after every edit** or
the browser serves the old files.

## Shipping

1. `git init` · `gh repo create Clayburton/free-things --source=. --push`
2. Make the repo **public**, then Settings → Pages → branch `main` `/root`
3. Live at `https://clayburton.github.io/free-things/`
4. Paste `wordpress-embed.html` into a Custom HTML block on `/freethings/`,
   replacing the old six-tile image grid.

The embed grows the iframe to the page's real height over `postMessage`, so it
never scrolls inside itself and never leaves a gap underneath.

## Notes to self

- **No `vh`/`dvh`/`svh` in this project's CSS.** The embed sets the iframe
  height from the content height; using viewport units inside would be a
  resize loop. `vw` is fine.
- Stories are different lengths, so `.meta` is a flex column with `.do` pushed
  down by `margin-top:auto` — that's what keeps every "take it" in a row on the
  same line.
- The tilt on each object is a fixed function of its position, never random, so
  it doesn't reshuffle on every render.
- One grid, no section headings, while there are only seven things — headings
  on a 5+2 split left a tile stranded alone in a row. The divider mechanism is
  still there for when the trials arrive.
- Two different MB numbers on one card reads as a contradiction: the button
  carries the **download** size, the spec line says **installed**.
- A previous version of this page was a record crate you dragged through. It's
  in git history. Clay's note: the snapping felt strange, and digging is work —
  a giveaway shouldn't make you work.
- The demos live on Clay's WordPress uploads and are served with
  `access-control-allow-origin: *` and `accept-ranges: bytes`. If those files
  are ever moved or renamed, playback breaks — the old product pages point at
  the same URLs, so they should stay put.
- Artwork is 700px for a tile that renders ~330px at most; the first row is
  `fetchpriority="high"`, everything below is `loading="lazy"`.
- The GUI image must live INSIDE the `.obj` element, not beside it — as a
  sibling it escapes `.obj .gui` positioning and renders inline at its full
  1100px, which throws the whole page out.
- On a phone the tile is only 116px, so the interface has to break out to full
  row width or it is unreadable. That changes the page height, so `setView`
  re-posts it to the host.
- `touch-action:pan-y` on `.objwrap` is what lets a sideways drag be the swipe
  while an up-down one still scrolls the page.
