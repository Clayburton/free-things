# free-things — the table

Everything we give away, laid out on one lit surface, for
[clayandkelsy.com/freethings/](https://clayandkelsy.com/freethings/) (page-id **658**).

All of it visible at once — no carousel, no digging. Each thing sits on the
table with its story under it; touch one and it plays; take whatever you want.
An empty place setting at the end marks where the next thing goes.

Plain DOM and CSS. No canvas, no libraries, no CDN. **31 KB of code** plus
446 KB of artwork.

---

## Adding a new free thing

Open `items.js` and add one object. Nothing else in the project changes.

```js
{
  id:    'collide-trial',
  title: 'COLLIDE trial',
  art:   'assets/art/collide.jpg',       // any square image
  tint:  '#e8e2ee',                      // its background colour
  audio: 'assets/audio/collide.mp3',     // optional
  story: 'A sentence or two. Say where it came from — that\'s the charm.',
  specs: ['VST3 · AU', '30 days'],
  take:  { kind: 'page', href: 'https://clayandkelsy.com/collide-trial/' },
  links: [{ label: 'the full story', href: '…' }]
}
```

Put it **before** `{ divider:'more soon', end:true }` so the empty place
setting stays last.

**The artwork can be anything** — a drawing, a screenshot of the plugin, a
photo. Square, 860 px or larger, jpg or png. The table gives every image the
same light, the same edge, the same shadow and the same faint hand-placed tilt,
so wildly different pictures still read as one set. There is no style to match.

`take.kind`:
- `'download'` — hits the file directly. Add `size: '74 MB'` and it shows on the
  button. This is what the Kontakt instruments use.
- `'page'` — sends them to a page instead. Use this for anything that goes
  through the free checkout, like the plugins.

When there are enough plugin trials to be worth grouping, uncomment the
`{ divider: 'plugins' }` line in `items.js` and they get their own heading.

## Audio

See `assets/audio/README.md`. Short answer: drop `<id>.mp3` in that folder,
8–20 seconds, instrument alone, something that loops.

The waveform under each name is measured from the clip in the browser — nothing
to build, nothing to regenerate. Until a clip exists that tile has **no play
button and can't be clicked** (the page checks with one `HEAD` request before
offering anything), and the rule under the name stays a plain hairline. It all
lights up on its own the moment the files land.

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
