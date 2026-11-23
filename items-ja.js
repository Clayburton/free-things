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
    kind: '無料プラグイン · VST3 · AU',
    art: 'assets/art/dem-osc.jpg',
    gui: 'assets/gui/dem-osc.jpg',
    page: 'https://clayandkelsy.com/dem-osc/',
    tint: '#dbdbdb',
    story: '彼女は無料。あとは弾くだけ。私たちのデモ・オシレーターはずっとあなたのものです。私たちから直接ダウンロードでき、条件もタイマーもありません。もっと奥深いエフェクトは Osc Collection で待っています。',
    specs: ['VST3 · AU · Mac', 'Kontakt 版：Mac と Windows'],
    features: [
      'ずっと無料、タイマーなし',
      'VST3 または AU に対応したどの DAW でも動きます',
      'チェックアウトでメールアドレスを入れて入手してください。アップデートをお知らせします'
    ],
    take: { kind: 'page', href: 'https://clayandkelsy.com/dem-osc/', label: 'DEM-Osc を入手' },
    links: [
      { label: 'インストールガイドと FAQ', href: 'https://clayandkelsy.com/install-guide-faq/' }
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
    story: '私たちなりの、みんなが大好きな 808 キック。いちばんよく使うサンプルを Voice of God に通しました。ミッドとサイドを別々にミックスできます。低域にはベースのようなキック、高域には美しいパッド。',
    specs: ['Kontakt 6 以降の製品版が必要です', '127.1 MB installed'],
    features: [
      '808 サンプルを Little Labs の Voice of God に通して',
      'ミッドとサイドを個別にコントロール',
      'コンボリューション・リバーブ：「The 80\'s」「Cloud Grains」「Spirits」',
      'Bouncy FX：ピンポン・ディレイ',
      'プリセット3つと、すべてをランダムにする [?] ボタン'
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
    story: 'Clay がデン・ハーグの市場で買った小さなゴング。私たちが初めて Kontakt 用に作ったもので、穏やかな瞑想のゴングから、叩きつけるようなエレピまで変化します。',
    specs: ['Kontakt 6 以降の製品版が必要です', '59.8 MB installed'],
    features: [
      'ステレオの AKG 460B から Millennia HV-35 へ',
      'Flea 47 から BAE 1073 MPF へ',
      'OTO Machines BAM Space Generator',
      'Bouncy FX：ピンポン・ディレイ',
      'プリセット3つと、すべてをランダムにする [?] ボタン'
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
    story: 'ロサンゼルスの Chatsworth Guitars で Tom Burton が作った一弦のシガーボックス・ギターを、Ebow と DARK MATTER のスライドで弾きました。アコースティック・スライドギターの香りがする、ムーディーなコーラス・パッドになります。',
    specs: ['Kontakt 6 以降の製品版が必要です', '126.1 MB installed'],
    features: [
      '一弦のディドリー・ボウを BAE 1073 MPF に直接',
      'Fairfield Circuitry の Shallow Waters ペダルを通して',
      'コンボリューション・リバーブ：「Gewandhaus」「The 80\'s」「Digital Hall」「Airports」',
      'Bouncy FX：ピンポン・ディレイ',
      'プリセット3つと、すべてをランダムにする [?] ボタン'
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
    story: '同じシガーボックス・ギターを、今度はスライドではじいて。かわいくてフォークな、Ebow 版の人なつっこいきょうだいです。',
    specs: ['Kontakt 6 以降の製品版が必要です', '331.2 MB installed'],
    features: [
      '一弦のディドリー・ボウを BAE 1073 MPF に直接',
      'Fairfield Circuitry の Shallow Waters ペダルを通して',
      'コンボリューション・リバーブ：「Slap Back」「Musikverein」「Plate」「Bouncing Hall」',
      'Bouncy FX：ピンポン・ディレイ',
      'プリセット3つと、すべてをランダムにする [?] ボタン'
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
    story: 'ガレージで手に取ったら、鳴り響きました。不気味で不協和で、どこか教会の鐘に近い音。残ったマレットは2つ、ゴムと銅。愛を込めて作りました。',
    /* NOTE: your product page says Wrenches needs Kontakt 7 or higher, not 6.
       If it does run in 6, change this line and tell me. */
    specs: ['Kontakt 7 以降の製品版が必要です', '520.4 MB installed'],
    features: [
      '1回のダウンロードで2つの音源：Mallet と Copper',
      'ステレオの AKG 460B から Millennia HV-35 へ',
      'Flea 47 から BAE 1073 MPF へ',
      '硬いゴムのマレットと銅パイプ',
      'Bouncy FX と、各音源にプリセット3つ'
    ],
    take: { kind: 'download', href: 'https://clayandkelsy.com/wp-content/uploads/2023/09/Wrenches_CK.zip', size: '342 MB' },
    links: []
  },

  /* The empty place setting at the end of the table. It's the newsletter
     sign-up — change `label` and `note` as things get closer. */
  {
    divider: '近日追加',
    end: true,
    label: '登録して新しい無料のものを受け取る',
    href: 'https://clayandkelsy.com/#mailpoet_form_1'
  }

];

/* The line under the empty place setting. */
const END_NOTE = '新しい音源や、新しいプラグインの無料体験版を準備中です。いちばんにお知らせします。';

window.ITEMS = ITEMS;
window.END_NOTE = END_NOTE;
