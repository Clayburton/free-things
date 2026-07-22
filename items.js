/* ==========================================================================
   FREE THINGS — what's on the table
   --------------------------------------------------------------------------
   TO ADD A NEW FREE THING, add one object to ITEMS below. That's it.

     art    square image, any style (drawing, plugin screenshot, photo).
            Put it in assets/art/. 860x860 or larger, jpg or png.
     page   OPTIONAL. If present, clicking the picture opens that page.
            Leave it out and the picture becomes the play button instead —
            this page is the main page for the instruments, so only DEM-Osc
            (which needs the free checkout) sends anyone away.
     song   optional. The demo that plays when you click the picture — the
            same one that was on the old product page. It streams straight
            from clayandkelsy.com, so no audio ships in this repo and the
            page loads with none of it. After adding or changing a song,
            run  tools/waveforms.py  to refresh the drawn shapes.
     story  one or two sentences. This is the charm — say where it came from.
     take   the button. kind:'download' hits a file directly,
            kind:'page' sends them to a page (use this for anything that
            needs the free checkout, like the plugins).

   A { divider:'name' } entry starts a new section on the table.
   Keep the { end:true } entry last — it draws the empty place setting at the
   end of the table, which is the newsletter sign-up.

   Order on the page = order in this list.
   ========================================================================== */

const ITEMS = [

  {
    id: 'dem-osc',
    title: 'DEM-Osc',
    kind: 'free plugin · VST3 · AU',
    art: 'assets/art/dem-osc.jpg',
    page: 'https://clayandkelsy.com/dem-osc/',
    tint: '#dbdbdb',
    story: 'She’s free. Now she just plays. Our demo oscillator, given away in full — no strings, no timer, nothing switched off.',
    specs: ['VST3 · AU', 'mac & windows'],
    features: [
      'The whole plugin, free forever',
      'Runs in any DAW that takes VST3 or AU',
      'Grab it with an email at checkout so we can tell you about updates'
    ],
    take: { kind: 'page', href: 'https://clayandkelsy.com/dem-osc/', label: 'get DEM-Osc' },
    links: [
      { label: 'install guide & faq', href: 'https://clayandkelsy.com/install-guide-faq/' }
    ]
  },

  /* When there are enough plugin trials to be worth grouping, uncomment this
     and everything below it gets its own heading on the table:      */
  // { divider: 'kontakt instruments' },

  {
    id: 'gr808',
    title: 'gr808 kick',
    kind: 'kontakt instrument',
    art: 'assets/art/gr808.jpg',
    tint: '#fef4ea',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/gr808.mp3',
    story: 'Our version of the beloved 808 kick — our most used sample, run through the Voice of God. Mix the mid and sides independently: a kick drum bass down low, a beautiful pad up high.',
    specs: ['requires the full version of Kontakt 6+', '127.1 MB installed'],
    features: [
      '808 sample through Voice of God by Little Labs',
      'Independent Mid and Sides control',
      'Convolution reverb — “The 80’s”, “Cloud Grains”, “Spirits”',
      'Bouncy FX — ping-pong delay',
      'Three presets, and a [?] button that randomises everything'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/gr808_CK.zip', size: '74 MB' },
    links: [
      { label: 'on pianobook', href: 'https://www.pianobook.co.uk/packs/gr808-kick/' }
    ]
  },

  {
    id: 'agong',
    title: 'aGong',
    kind: 'kontakt instrument',
    art: 'assets/art/agong.jpg',
    tint: '#fef0fd',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/aGong.mp3',
    story: 'A little gong Clay bought from a market in Den Haag. The first thing we ever made for Kontakt — it goes from a peaceful meditation gong to a hammered EP.',
    specs: ['requires the full version of Kontakt 6+', '59.8 MB installed'],
    features: [
      'Stereo AKG 460B’s into Millennia HV-35’s',
      'Flea 47 into a BAE 1073 MPF',
      'OTO Machines BAM Space Generator',
      'Bouncy FX — ping-pong delay',
      'Three presets, and a [?] button that randomises everything'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/aGong_CK.zip', size: '26 MB' },
    links: [
      { label: 'on pianobook', href: 'https://www.pianobook.co.uk/packs/agong/' }
    ]
  },

  {
    id: 'diddley-ebow',
    title: 'Diddley ebow',
    kind: 'kontakt instrument',
    art: 'assets/art/diddley-ebow.jpg',
    tint: '#f3fff5',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley-ebow.mp3',
    story: 'A one-string cigar box guitar built by Tom Burton at Chatsworth Guitars in Los Angeles, played with an Ebow and a DARK MATTER slide. It comes out a moody chorus pad with notes of acoustic slide guitar.',
    specs: ['requires the full version of Kontakt 6+', '126.1 MB installed'],
    features: [
      'One-string Diddley bow direct into a BAE 1073 MPF',
      'Through the Shallow Waters pedal by Fairfield Circuitry',
      'Convolution reverb — “Gewandhaus”, “The 80’s”, “Digital Hall”, “Airports”',
      'Bouncy FX — ping-pong delay',
      'Three presets, and a [?] button that randomises everything'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley_ebow_CK.zip', size: '100 MB' },
    links: [
      { label: 'on pianobook', href: 'https://www.pianobook.co.uk/packs/diddley-ebow/' }
    ]
  },

  {
    id: 'diddley-plucks',
    title: 'Diddley plucks',
    kind: 'kontakt instrument',
    art: 'assets/art/diddley-plucks.jpg',
    tint: '#eff3ff',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley-Plucks.mp3',
    story: 'The same cigar box guitar, this time plucked with the slide. Cute and folky — the friendlier sibling of the ebow.',
    specs: ['requires the full version of Kontakt 6+', '331.2 MB installed'],
    features: [
      'One-string Diddley bow direct into a BAE 1073 MPF',
      'Through the Shallow Waters pedal by Fairfield Circuitry',
      'Convolution reverb — “Slap Back”, “Musikverein”, “Plate”, “Bouncing Hall”',
      'Bouncy FX — ping-pong delay',
      'Three presets, and a [?] button that randomises everything'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley_plucks_CK.zip', size: '225 MB' },
    links: [
      { label: 'on pianobook', href: 'https://www.pianobook.co.uk/packs/diddley-plucks/' }
    ]
  },

  {
    id: 'wrenches',
    title: 'Wrenches',
    kind: 'kontakt instrument',
    art: 'assets/art/wrenches.jpg',
    tint: '#ffeae9',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/09/Evrial-ish-1_2.mp3',
    story: 'We picked these up in the garage and they rang out — eerie, dissonant, somewhere near church bells. Two mallets made the cut: rubber and copper. Made with love.',
    /* NOTE: your product page says Wrenches needs Kontakt 7 or higher, not 6.
       If it does run in 6, change this line and tell me. */
    specs: ['requires the full version of Kontakt 7+', '520.4 MB installed'],
    features: [
      'Two instruments in one download — Mallet & Copper',
      'Stereo AKG 460B’s into Millennia HV-35’s',
      'Flea 47 into a BAE 1073 MPF',
      'Hard rubber mallets and a copper pipe',
      'Bouncy FX, and three presets on each instrument'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/09/Wrenches_CK.zip', size: '342 MB' },
    links: [
      { label: 'on pianobook', href: 'https://www.pianobook.co.uk/packs/wrenches/' }
    ]
  },

  /* The empty place setting at the end of the table. It's the newsletter
     sign-up — change `label` and `note` as things get closer. */
  {
    divider: 'more soon',
    end: true,
    label: 'sign up for new free goodies',
    href: 'https://clayandkelsy.com/#mailpoet_form_1'
  }

];

/* The line under the empty place setting. */
const END_NOTE = 'More instruments and free trials of the new plugins are on the way. We’ll tell you first.';

window.ITEMS = ITEMS;
window.END_NOTE = END_NOTE;
