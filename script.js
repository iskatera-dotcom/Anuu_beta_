const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];
const ambient = $('#ambient');
const toast = $('#toast');
let toastTimer;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 2600);
}
function floatBits(count=18, symbols=['♡','♥','✦','✧']) {
  for (let i=0; i<count; i++) {
    const el = document.createElement('span');
    el.className = 'floaty';
    el.textContent = symbols[Math.floor(Math.random()*symbols.length)];
    el.style.left = Math.random()*100 + '%';
    el.style.fontSize = (12 + Math.random()*24) + 'px';
    el.style.animationDuration = (4 + Math.random()*5) + 's';
    el.style.animationDelay = (Math.random()*.8) + 's';
    ambient.appendChild(el);
    setTimeout(() => el.remove(), 10500);
  }
}
setInterval(() => { if (!document.hidden) floatBits(2, ['♡','♥','✧']); }, 1400);
floatBits(14);

$('#envelope').addEventListener('click', () => {
  $('#envelope').classList.toggle('open');
  if ($('#envelope').classList.contains('open')) {
    floatBits(22, ['♥','♡','💗','✦']);
    showToast('A little love, delivered just for you 💌');
    setTimeout(() => $('#letter').scrollIntoView({behavior:'smooth'}), 850);
  }
});
$('#sprinkleBtn').addEventListener('click', () => {
  floatBits(36, ['🦋','♡','✦','🌸','♥']);
  showToast('Butterflies? Nah, those are just my feelings. 🦋');
});
$('#psBtn').addEventListener('click', () => {
  const secret = $('#letterSecret');
  secret.hidden = !secret.hidden;
  $('#psBtn').textContent = secret.hidden ? "P.S. there's one more thing… 👀" : 'Okay, that is enough emotional damage 💗';
  if (!secret.hidden) floatBits(12);
});

const shayaris = [
  'Teri hansi se din mera roshan sa ho jaaye,<br>tera ek message aaye toh dil bachcha sa ho jaaye.<br>Itna bhi mat muskuraaya kar, jaan-e-ada,<br>kahin tera yeh fan phir se tera deewana ho jaaye. 💗',
  'Na koi din chahiye, na koi bahaana,<br>bas tera saath ho aur dil ka muskurana.<br>Tu paas ho toh har pal khaas lagta hai,<br>warna kya hi hai is duniya mein suhaana. 🌷',
  'Thodi si cute, thodi si nakhrewaali,<br>meri Anuu sabse pyaari, sabse niraali.<br>Haan maanta hoon, main thoda filmy hoon,<br>par tu hi toh hai meri favourite kahaani. 🎀',
  'Chaand se kaha, zara kam chamka kar,<br>meri Anuu ko dekh, thoda sharma kar.<br>Woh hansi toh saari raat roshan ho gayi,<br>ab chaand bhi bole, “mujhe bhi sikha kar.” 🌙'
];
let shayariIndex = 0;
$('#newShayari').addEventListener('click', () => {
  shayariIndex = (shayariIndex + 1) % shayaris.length;
  const p = $('#shayariText');
  p.animate([{opacity:0,transform:'translateY(8px)'},{opacity:1,transform:'translateY(0)'}], {duration:450});
  p.innerHTML = shayaris[shayariIndex];
  floatBits(8, ['♡','✧','🌸']);
});

const gameResponses = {
  mad: ['🥰', 'Correct answer. You win one (1) very clingy Himanshu and unlimited hugs. Redeem whenever. 💗'],
  lots: ['🙈', '“Bahut saara” noted. I shall now be smiling at my phone like an idiot. Thanks, madam. 😌💕'],
  secret: ['😈', 'Secret? Fine. I’ll just assume the answer is “madly” until you submit an official correction. 😂💘']
};
$$('.answer').forEach(btn => btn.addEventListener('click', () => {
  const [emoji, response] = gameResponses[btn.dataset.a];
  $('#gameFace').textContent = emoji;
  $('#gameResult').textContent = response;
  $('#gameQuestion').textContent = 'Official result: Himanshu is blushing now.';
  $('#answers').hidden = true;
  $('#again').hidden = false;
  floatBits(16, ['💗','♥','♡','✨']);
}));
$('#again').addEventListener('click', () => {
  $('#gameFace').textContent = '🥺';
  $('#gameQuestion').textContent = 'How much do you like your Himanshu?';
  $('#gameResult').textContent = 'Choose your answer, miss heart-stealer.';
  $('#answers').hidden = false;
  $('#again').hidden = true;
});

$('#finalBtn').addEventListener('click', () => {
  $('#finalReveal').hidden = false;
  $('#finalBtn').textContent = 'Surprise opened 💗';
  floatBits(65, ['♥','♡','💗','✨','🌸']);
  confetti();
});
function confetti() {
  const colors = ['#f4a3c1','#c84d82','#ffe0eb','#d8c5ff','#ffd66e','#ffffff'];
  for(let i=0;i<70;i++){
    const piece=document.createElement('i');
    piece.style.cssText=`position:fixed;z-index:90;top:-15px;left:${Math.random()*100}vw;width:${5+Math.random()*7}px;height:${8+Math.random()*10}px;background:${colors[Math.floor(Math.random()*colors.length)]};border-radius:${Math.random()>.5?'50%':'2px'};pointer-events:none;animation:confettiFall ${2+Math.random()*3}s linear forwards;`;
    document.body.appendChild(piece);
    setTimeout(()=>piece.remove(),5200);
  }
}
$$('.photo-card').forEach(card => card.addEventListener('click', () => {
  $('#lightboxImg').src = card.dataset.photo;
  $('#lightbox').hidden = false;
  document.body.style.overflow = 'hidden';
}));
function closeLightbox(){ $('#lightbox').hidden = true; document.body.style.overflow = ''; }
$('#closeLightbox').addEventListener('click', closeLightbox);
$('#lightbox').addEventListener('click', e => { if(e.target.id === 'lightbox') closeLightbox(); });
document.addEventListener('keydown', e => { if(e.key === 'Escape') closeLightbox(); });

$('#menu').addEventListener('click', () => {
  const nav = $('#nav');
  nav.classList.toggle('open');
  $('#menu').setAttribute('aria-expanded', nav.classList.contains('open'));
});
$$('#nav a').forEach(a => a.addEventListener('click', () => $('#nav').classList.remove('open')));

const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if(entry.isIntersecting){ entry.target.classList.add('visible'); observer.unobserve(entry.target); }
}), {threshold:.12});
$$('.reveal').forEach(el => observer.observe(el));

window.addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - window.innerHeight;
  $('#progress').style.width = (max > 0 ? window.scrollY/max*100 : 0) + '%';
});

// Browsers require a user gesture for audio. Add your own licensed MP3 as assets/soft-romantic.mp3.
const music = $('#music');
const musicBtn = $('#musicBtn');
const musicLabel = $('#musicLabel');
let musicReady = false;
musicBtn.addEventListener('click', async () => {
  if (!musicReady) {
    music.src = 'assets/soft-romantic.mp3';
    musicReady = true;
  }
  if (music.paused) {
    try {
      await music.play();
      musicLabel.textContent = 'Pause';
      showToast('Music on. Main character energy activated 🎶');
    } catch {
      showToast('Add your MP3 as assets/soft-romantic.mp3 to enable music 🎵');
    }
  } else {
    music.pause();
    musicLabel.textContent = 'Music';
  }
});

$('#finalBtn').addEventListener('pointerdown', () => {});
