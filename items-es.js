/* ==========================================================================
   FREE THINGS — what's on the table
   --------------------------------------------------------------------------
   TO ADD A NEW FREE THING, add one object to ITEMS below. That's it.

     art    square image, any style (drawing, plugin screenshot, photo).
            Put it in assets/art/. 700x700 or larger, jpg or png.
     gui    OPTIONAL second image — what the instrument actually looks like.
            Put it in assets/gui/. Hover the tile on a computer to see it;
            on a phone an arrow appears and you swipe. It is only fetched
            when someone asks for it, so it costs nothing on load.
     cat    OPTIONAL. 'kontakt' or 'plugins' — each category becomes a
            filter pill (with a count) above the table. Leave it out and
            the page guesses: a VST3/AU spec line or a page of its own
            means plugin, everything else is Kontakt.
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
    kind: 'plugin gratis · VST3 · AU',
    art: 'assets/art/dem-osc.jpg',
    gui: 'assets/gui/dem-osc.jpg',
    page: 'https://clayandkelsy.com/dem-osc/',
    tint: '#dbdbdb',
    story: 'Es gratis. Ahora solo toca. Nuestro oscilador de demostración es tuyo para siempre: una descarga directa de nosotros, sin condiciones y sin límite de tiempo, con algunos efectos más profundos esperándote en la Osc Collection.',
    specs: ['VST3 · AU · Mac', 'versión para Kontakt: Mac y Windows'],
    features: [
      'Gratis para siempre, sin límite de tiempo',
      'Funciona en cualquier DAW compatible con VST3 o AU',
      'Consíguelo con tu correo al pagar y te avisamos de las actualizaciones'
    ],
    take: { kind: 'page', href: 'https://clayandkelsy.com/dem-osc/', label: 'consigue DEM-Osc' },
    links: [
      { label: 'guía de instalación y preguntas frecuentes', href: 'https://clayandkelsy.com/install-guide-faq/' }
    ]
  },

  /* When there are enough plugin trials to be worth grouping, uncomment this
     and everything below it gets its own heading on the table:      */
  // { divider: 'kontakt instruments' },

  {
    id: 'gr808',
    title: 'gr808 kick',
    kind: 'instrumento para Kontakt',
    art: 'assets/art/gr808.jpg',
    gui: 'assets/gui/gr808.jpg',
    tint: '#fef4ea',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/gr808.mp3',
    story: 'Nuestra versión del querido bombo 808, nuestra muestra más usada, pasada por el Voice of God. Mezcla el centro y los lados por separado: abajo un bombo con bajo, arriba un pad precioso.',
    specs: ['requiere la versión completa de Kontakt 6 o superior', '127.1 MB installed'],
    features: [
      'Muestra de 808 pasada por el Voice of God de Little Labs',
      'Control independiente de centro y lados',
      'Reverb de convolución: "The 80\'s", "Cloud Grains", "Spirits"',
      'Bouncy FX: delay ping-pong',
      'Tres presets y un botón [?] que lo aleatoriza todo'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/gr808_CK.zip', size: '74 MB' },
    links: []
  },

  {
    id: 'agong',
    title: 'aGong',
    kind: 'instrumento para Kontakt',
    art: 'assets/art/agong.jpg',
    gui: 'assets/gui/agong.jpg',
    tint: '#fef0fd',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/aGong.mp3',
    story: 'Un pequeño gong que Clay compró en un mercado de La Haya. Lo primero que hicimos para Kontakt: va de un gong de meditación tranquilo a un piano eléctrico martillado.',
    specs: ['requiere la versión completa de Kontakt 6 o superior', '59.8 MB installed'],
    features: [
      'AKG 460B en estéreo hacia previos Millennia HV-35',
      'Flea 47 hacia un BAE 1073 MPF',
      'OTO Machines BAM Space Generator',
      'Bouncy FX: delay ping-pong',
      'Tres presets y un botón [?] que lo aleatoriza todo'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/aGong_CK.zip', size: '26 MB' },
    links: []
  },

  {
    id: 'diddley-ebow',
    title: 'Diddley ebow',
    kind: 'instrumento para Kontakt',
    art: 'assets/art/diddley-ebow.jpg',
    gui: 'assets/gui/diddley-ebow.jpg',
    tint: '#f3fff5',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley-ebow.mp3',
    story: 'Una guitarra de caja de puros de una cuerda, construida por Tom Burton en Chatsworth Guitars, en Los Ángeles, tocada con un Ebow y un slide DARK MATTER. Suena como un pad de chorus melancólico con notas de guitarra slide acústica.',
    specs: ['requiere la versión completa de Kontakt 6 o superior', '126.1 MB installed'],
    features: [
      'Diddley bow de una cuerda directo a un BAE 1073 MPF',
      'Pasando por el pedal Shallow Waters de Fairfield Circuitry',
      'Reverb de convolución: "Gewandhaus", "The 80\'s", "Digital Hall", "Airports"',
      'Bouncy FX: delay ping-pong',
      'Tres presets y un botón [?] que lo aleatoriza todo'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley_ebow_CK.zip', size: '100 MB' },
    links: []
  },

  {
    id: 'diddley-plucks',
    title: 'Diddley plucks',
    kind: 'instrumento para Kontakt',
    art: 'assets/art/diddley-plucks.jpg',
    gui: 'assets/gui/diddley-plucks.jpg',
    tint: '#eff3ff',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley-Plucks.mp3',
    story: 'La misma guitarra de caja de puros, esta vez punteada con el slide. Tierna y folk: la hermana más amable del ebow.',
    specs: ['requiere la versión completa de Kontakt 6 o superior', '331.2 MB installed'],
    features: [
      'Diddley bow de una cuerda directo a un BAE 1073 MPF',
      'Pasando por el pedal Shallow Waters de Fairfield Circuitry',
      'Reverb de convolución: "Slap Back", "Musikverein", "Plate", "Bouncing Hall"',
      'Bouncy FX: delay ping-pong',
      'Tres presets y un botón [?] que lo aleatoriza todo'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley_plucks_CK.zip', size: '225 MB' },
    links: []
  },

  {
    id: 'wrenches',
    title: 'Wrenches',
    kind: 'instrumento para Kontakt',
    art: 'assets/art/wrenches.jpg',
    gui: 'assets/gui/wrenches.jpg',
    tint: '#ffeae9',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/09/Evrial-ish-1_2.mp3',
    story: 'Las recogimos en el garaje y sonaron: inquietantes, disonantes, cerca de unas campanas de iglesia. Dos mazos pasaron el corte: goma y cobre. Hecho con amor.',
    /* NOTE: your product page says Wrenches needs Kontakt 7 or higher, not 6.
       If it does run in 6, change this line and tell me. */
    specs: ['requiere la versión completa de Kontakt 7 o superior', '520.4 MB installed'],
    features: [
      'Dos instrumentos en una descarga: Mallet y Copper',
      'AKG 460B en estéreo hacia previos Millennia HV-35',
      'Flea 47 hacia un BAE 1073 MPF',
      'Mazos de goma dura y un tubo de cobre',
      'Bouncy FX y tres presets en cada instrumento'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/09/Wrenches_CK.zip', size: '342 MB' },
    links: []
  },

  /* The empty place setting at the end of the table. It's the newsletter
     sign-up — change `label` and `note` as things get closer. */
  {
    divider: 'pronto, más',
    end: true,
    label: 'suscríbete y recibe cosas gratis nuevas',
    href: 'https://clayandkelsy.com/#mailpoet_form_1'
  }

];

/* The line under the empty place setting. */
const END_NOTE = 'Vienen más instrumentos y pruebas gratis de los nuevos plugins. Te avisaremos primero.';

window.ITEMS = ITEMS;
window.END_NOTE = END_NOTE;
