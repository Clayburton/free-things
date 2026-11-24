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
    kind: '免费插件 · VST3 · AU',
    art: 'assets/art/dem-osc.jpg',
    gui: 'assets/gui/dem-osc.jpg',
    page: 'https://clayandkelsy.com/dem-osc/',
    tint: '#dbdbdb',
    story: '它免费了，你只管弹。我们的演示振荡器永久归你：直接从我们这里下载，毫无套路，也没有时间限制，还有几款更深入的效果在 Osc Collection 里等着你。',
    specs: ['VST3 · AU · Mac', 'Kontakt 版：Mac 和 Windows'],
    features: [
      '永久免费，没有时间限制',
      '可在任何支持 VST3 或 AU 的 DAW 中运行',
      '结账时留下邮箱即可获取，我们会通知你更新'
    ],
    take: { kind: 'page', href: 'https://clayandkelsy.com/dem-osc/', label: '获取 DEM-Osc' },
    links: [
      { label: '安装指南与常见问题', href: 'https://clayandkelsy.com/install-guide-faq/' }
    ]
  },

  /* When there are enough plugin trials to be worth grouping, uncomment this
     and everything below it gets its own heading on the table:      */
  // { divider: 'kontakt instruments' },

  {
    id: 'gr808',
    title: 'gr808 kick',
    kind: 'Kontakt 音源',
    art: 'assets/art/gr808.jpg',
    gui: 'assets/gui/gr808.jpg',
    tint: '#fef4ea',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/gr808.mp3',
    story: '我们版本的经典 808 底鼓，也是我们最常用的采样，过了一遍 Voice of God。中间和两侧可以分开混：低处是底鼓贝斯，高处是漂亮的铺底音色。',
    specs: ['需要 Kontakt 6 及以上完整版', '127.1 MB installed'],
    features: [
      '808 采样经过 Little Labs 的 Voice of God',
      '中间与两侧独立控制',
      '卷积混响：“The 80\'s”、“Cloud Grains”、“Spirits”',
      'Bouncy FX：乒乓延迟',
      '三个预置音色，外加一个随机化一切的 [?] 按钮'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/gr808_CK.zip', size: '74 MB' },
    links: []
  },

  {
    id: 'agong',
    title: 'aGong',
    kind: 'Kontakt 音源',
    art: 'assets/art/agong.jpg',
    gui: 'assets/gui/agong.jpg',
    tint: '#fef0fd',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/aGong.mp3',
    story: 'Clay 在海牙的一个集市上买的小锣。这是我们为 Kontakt 做的第一件作品，可以从平静的冥想锣声，一路变成敲击感十足的电钢琴。',
    specs: ['需要 Kontakt 6 及以上完整版', '59.8 MB installed'],
    features: [
      '立体声 AKG 460B 接入 Millennia HV-35',
      'Flea 47 接入 BAE 1073 MPF',
      'OTO Machines BAM Space Generator',
      'Bouncy FX：乒乓延迟',
      '三个预置音色，外加一个随机化一切的 [?] 按钮'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/aGong_CK.zip', size: '26 MB' },
    links: []
  },

  {
    id: 'diddley-ebow',
    title: 'Diddley ebow',
    kind: 'Kontakt 音源',
    art: 'assets/art/diddley-ebow.jpg',
    gui: 'assets/gui/diddley-ebow.jpg',
    tint: '#f3fff5',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley-ebow.mp3',
    story: '一把单弦雪茄盒吉他，由 Tom Burton 在洛杉矶的 Chatsworth Guitars 制作，用 Ebow 和 DARK MATTER 滑棒演奏。出来的是带着原声滑棒吉他味道的忧郁合唱铺底。',
    specs: ['需要 Kontakt 6 及以上完整版', '126.1 MB installed'],
    features: [
      '单弦 Diddley bow 直接接入 BAE 1073 MPF',
      '经过 Fairfield Circuitry 的 Shallow Waters 效果器',
      '卷积混响：“Gewandhaus”、“The 80\'s”、“Digital Hall”、“Airports”',
      'Bouncy FX：乒乓延迟',
      '三个预置音色，外加一个随机化一切的 [?] 按钮'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley_ebow_CK.zip', size: '100 MB' },
    links: []
  },

  {
    id: 'diddley-plucks',
    title: 'Diddley plucks',
    kind: 'Kontakt 音源',
    art: 'assets/art/diddley-plucks.jpg',
    gui: 'assets/gui/diddley-plucks.jpg',
    tint: '#eff3ff',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley-Plucks.mp3',
    story: '还是那把雪茄盒吉他，这次用滑棒拨弦。可爱又有民谣味，是 Ebow 版更亲切的兄弟姐妹。',
    specs: ['需要 Kontakt 6 及以上完整版', '331.2 MB installed'],
    features: [
      '单弦 Diddley bow 直接接入 BAE 1073 MPF',
      '经过 Fairfield Circuitry 的 Shallow Waters 效果器',
      '卷积混响：“Slap Back”、“Musikverein”、“Plate”、“Bouncing Hall”',
      'Bouncy FX：乒乓延迟',
      '三个预置音色，外加一个随机化一切的 [?] 按钮'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/07/Diddley_plucks_CK.zip', size: '225 MB' },
    links: []
  },

  {
    id: 'wrenches',
    title: 'Wrenches',
    kind: 'Kontakt 音源',
    art: 'assets/art/wrenches.jpg',
    gui: 'assets/gui/wrenches.jpg',
    tint: '#ffeae9',
    song: 'https://clayandkelsy.com/wp-content/uploads/2023/09/Evrial-ish-1_2.mp3',
    story: '我们在车库里把它们拿起来，它们就响了：诡异、不协和，有点像教堂的钟声。最后留下两种槌：橡胶和铜。用心制作。',
    /* NOTE: your product page says Wrenches needs Kontakt 7 or higher, not 6.
       If it does run in 6, change this line and tell me. */
    specs: ['需要 Kontakt 7 及以上完整版', '520.4 MB installed'],
    features: [
      '一次下载两个音源：Mallet 和 Copper',
      '立体声 AKG 460B 接入 Millennia HV-35',
      'Flea 47 接入 BAE 1073 MPF',
      '硬橡胶槌和一根铜管',
      'Bouncy FX，每个音源三个预置音色'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/09/Wrenches_CK.zip', size: '342 MB' },
    links: []
  },

  /* The empty place setting at the end of the table. It's the newsletter
     sign-up — change `label` and `note` as things get closer. */
  {
    divider: '即将推出',
    end: true,
    label: '订阅新的免费好物',
    href: 'https://clayandkelsy.com/#mailpoet_form_1'
  }

];

/* The line under the empty place setting. */
const END_NOTE = '更多音源和新插件的免费试用版正在路上。我们会第一时间告诉你。';

window.ITEMS = ITEMS;
window.END_NOTE = END_NOTE;
