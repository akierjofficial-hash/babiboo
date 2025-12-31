// ======= CUSTOMIZE THIS SECTION =======
const CONFIG = {
  theirName: "My Love",

  // LOCAL VIDEO FILE (relative to index.html)
  videoSrc: "videos/chest-pain.mp4",

  songTitle: "Chest Pain",
  songArtist: "Malcolm Todd",
  secretMessage: "secret message: 143 155",

  vaultCode: "1112",

  letter: `Lovey Doveyyy,

I’m incredibly lucky to walk through life with you by my side.
Watching us grow together, smile together, and sharing even the smallest moments with you is a gift I never take for granted.

You make every day feel special just by being in it. I hope the world gives you back even a fraction of the love and joy you bring into mine.
Can't wait to start the new year with you my babibooooo.

Happy New Yearrrr, my loveee.

Love,
`,
  signature: "— your favorite human hehe ♡",

  albums: {
    photobooth: [
      { src: "images/bb1.jpeg", caption: "us ♡" },
      { src: "images/bb2.jpeg", caption: "cute" },
      { src: "images/bb3.jpg", caption: "more us" },
      { src: "images/bb4.jpeg", caption: "smiles" }
    ],
    instams: [
      { src: "images/gorg1.jpeg", caption: "pretty!" },
      { src: "images/gorg2.jpeg", caption: "cutieee!" },
      { src: "images/gorg3.jpeg", caption: "fav" }
    ],
    recent: [
      { src: "images/rec1.jpeg", caption: "recent ♡" },
      { src: "images/rec2.jpg", caption: "hehe" },
      { src: "images/rec3.jpeg", caption: "love this" }
    ],
    grad: [
      { src: "images/g1.jpg", caption: "iloveyouuu" },
      { src: "images/g2.jpeg", caption: "hearthearttt" }
    ]
  },

  flowerBubbles: [
    "You’re my favorite person.",
    "I’m proud of you — always.",
    "Your laugh is my comfort sound.",
    "You make ordinary days feel magical.",
    "I’d pick you in every lifetime.",
    "Thank you for being you."
  ]
};
// =====================================

const screens = Array.from(document.querySelectorAll(".screen"));
const heartsLayer = document.getElementById("hearts");

// ===== Night scene particles =====
const nightScene = document.getElementById("nightScene");
const floatLayer = document.getElementById("floatLayer");
let heartTimer = null;
let sparkTimer = null;

function rand(min, max){ return min + Math.random() * (max - min); }

function replayGrow(){
  if (!nightScene) return;
  nightScene.classList.remove("play");
  void nightScene.offsetWidth;
  nightScene.classList.add("play");
}

function spawnHeart(){
  if (!floatLayer) return;

  const isRing = Math.random() < 0.45;
  const item = document.createElement("div");
  item.className = "float-item " + (isRing ? "float-ring" : "float-heart");

  item.style.setProperty("--x", `${rand(4, 94)}%`);
  item.style.setProperty("--y", `${rand(38, 86)}%`);
  item.style.setProperty("--dx", `${rand(-40, 40)}px`);
  item.style.setProperty("--dur", `${rand(2.3, 4.4)}s`);

  if (isRing){
    const ringSize = rand(34, 58);
    item.style.setProperty("--ring", `${ringSize}px`);
    const span = document.createElement("span");
    span.textContent = "💗";
    item.appendChild(span);
  } else {
    item.style.setProperty("--size", `${rand(16, 30)}px`);
    item.textContent = Math.random() < 0.5 ? "💗" : "💞";
  }

  floatLayer.appendChild(item);
  item.addEventListener("animationend", () => item.remove());
}

function spawnSpark(){
  if (!floatLayer) return;

  const item = document.createElement("div");
  item.className = "float-item spark-dot";

  item.style.setProperty("--x", `${rand(10, 90)}%`);
  item.style.setProperty("--y", `${rand(30, 70)}%`);
  item.style.setProperty("--dx", `${rand(-25, 25)}px`);
  item.style.setProperty("--dur", `${rand(1.3, 2.6)}s`);
  item.style.setProperty("--dot", `${rand(5, 10)}px`);

  floatLayer.appendChild(item);
  item.addEventListener("animationend", () => item.remove());
}

function startNightScene(){
  if (!nightScene) return;

  replayGrow();

  if (!heartTimer){
    heartTimer = setInterval(() => {
      spawnHeart();
      if (Math.random() < 0.8) spawnSpark();
    }, 260);
  }

  if (!sparkTimer){
    sparkTimer = setInterval(spawnSpark, 180);
  }
}

function stopNightScene(){
  if (heartTimer){ clearInterval(heartTimer); heartTimer = null; }
  if (sparkTimer){ clearInterval(sparkTimer); sparkTimer = null; }
  if (floatLayer) floatLayer.innerHTML = "";
}

if (nightScene){
  nightScene.addEventListener("click", () => {
    for (let i=0; i<10; i++) spawnHeart();
    for (let i=0; i<10; i++) spawnSpark();
  });
}

function showScreen(id){
  screens.forEach(s => s.classList.toggle("active", s.id === id));
  heartBurst(8);

  if (id === "screen-flowers") {
    startNightScene();
    makeBubbles();
  } else {
    stopNightScene();
  }
}

document.addEventListener("click", (e) => {
  const go = e.target.closest("[data-go]")?.getAttribute("data-go");
  if (go) showScreen(go);
});

// Intro personalization
const theirNameEl = document.getElementById("theirName");
if (theirNameEl) theirNameEl.textContent = CONFIG.theirName;

// ===== Song setup (LOCAL VIDEO) =====
const videoEl = document.getElementById("localVideo");
const videoSource = document.getElementById("videoSource");

if (videoSource) {
  videoSource.src = CONFIG.videoSrc;
  if (videoEl) videoEl.load();
}

const songTitleEl = document.getElementById("songTitle");
if (songTitleEl) songTitleEl.textContent = CONFIG.songTitle;

const songArtistEl = document.getElementById("songArtist");
if (songArtistEl) songArtistEl.textContent = `— ${CONFIG.songArtist}`;

const secretMsgEl = document.getElementById("secretMsg");
if (secretMsgEl) secretMsgEl.textContent = CONFIG.secretMessage;

// Letter setup
const letterBodyEl = document.getElementById("letterBody");
if (letterBodyEl) letterBodyEl.textContent = CONFIG.letter;

const letterSigEl = document.getElementById("letterSig");
if (letterSigEl) letterSigEl.textContent = CONFIG.signature;

// YES/NO logic
const btnYes = document.getElementById("btnYes");
const btnNo  = document.getElementById("btnNo");
const noHint = document.getElementById("noHint");
let noCount = 0;

if (btnYes) btnYes.addEventListener("click", () => showScreen("screen-menu"));

function dodgeNo(){
  if (!btnNo) return;

  noCount++;
  const app = document.querySelector(".app");
  const rect = app.getBoundingClientRect();

  const maxX = Math.min(240, rect.width * 0.35);
  const maxY = Math.min(180, rect.height * 0.22);
  const x = (Math.random() * 2 - 1) * maxX;
  const y = (Math.random() * 2 - 1) * maxY;

  btnNo.style.transform = `translate(${x}px, ${y}px)`;

  const msgs = [
    "hmm… are you sure? 😌",
    "nope, try again 😂",
    "be niceeee 💗",
    "okay now you’re just playing",
    "press YES 😤"
  ];
  if (noHint) noHint.textContent = msgs[Math.min(noCount - 1, msgs.length - 1)];

  if (noCount >= 6){
    btnNo.textContent = "OKAY FINE";
    btnNo.classList.add("primary");
    btnNo.classList.remove("ghost");
  }

  heartBurst(5);
}

if (btnNo){
  btnNo.addEventListener("mouseenter", dodgeNo);
  btnNo.addEventListener("click", () => {
    if (noCount >= 6){
      showScreen("screen-menu");
      return;
    }
    dodgeNo();
  });
}

// Floating hearts
function heartBurst(n=10){
  if (!heartsLayer) return;
  for (let i=0; i<n; i++){
    const span = document.createElement("span");
    span.className = "heart";
    span.textContent = Math.random() > 0.5 ? "💗" : "💞";
    const x = 30 + Math.random() * 80;
    const y = 70 + Math.random() * 20;
    span.style.left = `${x}%`;
    span.style.top  = `${y}%`;
    span.style.animationDelay = `${Math.random() * 0.12}s`;
    heartsLayer.appendChild(span);
    span.addEventListener("animationend", () => span.remove());
  }
}

// ----- PHOTOS (draggable polaroids) -----
const stage = document.getElementById("polaroidStage");
let zTop = 10;

function clearStage(){
  if (stage) stage.innerHTML = "";
}

function loadAlbum(key){
  if (!stage) return;

  clearStage();
  const photos = CONFIG.albums[key] || [];
  const stageRect = stage.getBoundingClientRect();

  photos.forEach((p, idx) => {
    const el = document.createElement("div");
    el.className = "polaroid";
    el.style.left = `${20 + (idx * 22) % Math.max(1, (stageRect.width - 180))}px`;
    el.style.top  = `${20 + (idx * 26) % Math.max(1, (stageRect.height - 210))}px`;
    const rot = (Math.random() * 14) - 7;
    el.style.transform = `rotate(${rot}deg)`;
    el.style.zIndex = `${zTop++}`;

    const photo = document.createElement("div");
    photo.className = "photo";
    if (p.src) photo.style.backgroundImage = `url('${p.src}')`;

    const cap = document.createElement("div");
    cap.className = "cap";
    cap.textContent = p.caption || "";

    el.appendChild(photo);
    el.appendChild(cap);

    makeDraggable(el);
    stage.appendChild(el);
  });

  heartBurst(10);
}

function makeDraggable(el){
  if (!stage) return;

  let startX=0, startY=0, originLeft=0, originTop=0;

  el.addEventListener("pointerdown", (e) => {
    el.setPointerCapture(e.pointerId);
    el.style.zIndex = `${zTop++}`;
    const rect = el.getBoundingClientRect();
    startX = e.clientX;
    startY = e.clientY;

    const stageRect = stage.getBoundingClientRect();
    originLeft = rect.left - stageRect.left;
    originTop  = rect.top - stageRect.top;

    el.style.transform = "rotate(0deg)";
  });

  el.addEventListener("pointermove", (e) => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;
    el.style.left = `${originLeft + dx}px`;
    el.style.top  = `${originTop + dy}px`;
  });

  el.addEventListener("pointerup", (e) => {
    if (!el.hasPointerCapture(e.pointerId)) return;
    el.releasePointerCapture(e.pointerId);

    const rot = (Math.random() * 12) - 6;
    el.style.transform = `rotate(${rot}deg)`;
  });
}

document.querySelectorAll(".album").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelectorAll(".album").forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    loadAlbum(btn.dataset.album);
  });
});

loadAlbum("photobooth");

// ----- FLOWERS (bubbles) -----
const bubbleLayer = document.getElementById("bubbleLayer");

function clamp(v, min, max){ return Math.max(min, Math.min(max, v)); }

function makeBubbles(){
  if (!bubbleLayer) return;

  bubbleLayer.innerHTML = "";
  const rect = bubbleLayer.getBoundingClientRect();
  const W = rect.width;
  const H = rect.height || 300;

  const PAD = 14;
  const placed = [];

  CONFIG.flowerBubbles.forEach((text, i) => {
    const b = document.createElement("div");
    b.className = "bubble";
    b.textContent = text;

    // measure size safely
    b.style.visibility = "hidden";
    b.style.left = "0px";
    b.style.top = "0px";
    bubbleLayer.appendChild(b);

    const bw = b.offsetWidth || 220;
    const bh = b.offsetHeight || 70;

    // try a few times to avoid heavy overlap
    let x = 0, y = 0;
    let ok = false;

    for (let tries = 0; tries < 30; tries++){
      // place around the center-ish area (prettier than far edges)
      const cx = W * 0.5 + rand(-W * 0.22, W * 0.22);
      const cy = H * 0.45 + rand(-H * 0.20, H * 0.25);

      x = clamp(cx - bw/2, PAD, W - bw - PAD);
      y = clamp(cy - bh/2, PAD, H - bh - PAD);

      const box = { x, y, w: bw, h: bh };
      ok = placed.every(p => {
        const gap = 10; // spacing
        return (
          box.x + box.w + gap < p.x ||
          p.x + p.w + gap < box.x ||
          box.y + box.h + gap < p.y ||
          p.y + p.h + gap < box.y
        );
      });

      if (ok){
        placed.push(box);
        break;
      }
    }

    b.style.left = `${x}px`;
    b.style.top  = `${y}px`;
    b.style.visibility = "visible";
    b.style.animationDelay = `${i * 0.06}s`;

    b.addEventListener("click", () => {
      b.classList.add("popped");
      setTimeout(() => b.remove(), 220);
      heartBurst(4);
    });
  });
}

makeBubbles();
window.addEventListener("resize", () => {
  // reflow bubbles on resize (nice for mobile)
  makeBubbles();
});

// ----- VAULT -----
const vaultInput = document.getElementById("vaultInput");
const vaultBtn = document.getElementById("vaultBtn");
const vaultHint = document.getElementById("vaultHint");
const vaultReward = document.getElementById("vaultReward");

if (vaultBtn){
  vaultBtn.addEventListener("click", () => {
    const val = (vaultInput?.value || "").trim();
    if (!val){
      if (vaultHint) vaultHint.textContent = "Type a code first 😌";
      return;
    }
    if (val === CONFIG.vaultCode){
      if (vaultHint) vaultHint.textContent = "Unlocked 💗";
      vaultReward?.classList.remove("hidden");
      heartBurst(18);
    } else {
      if (vaultHint) vaultHint.textContent = "Not quite… try an important date 👀";
      vaultReward?.classList.add("hidden");
      heartBurst(6);
    }
  });
}
