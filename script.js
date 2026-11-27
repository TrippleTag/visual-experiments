// --- CONTROLES GLOBALES (01, 04, 06) ---
const orb = document.getElementById('orb');
const customCursor = document.getElementById('customCursor');
const flashlightOverlay = document.getElementById('flashlightOverlay');
const toggleFlashlight = document.getElementById('toggleFlashlight');
const toggleParticles = document.getElementById('toggleParticles');

let particlesEnabled = true;
let lastParticleTime = 0;

toggleFlashlight.addEventListener('click', () => {
  const active = flashlightOverlay.classList.toggle('active');
  toggleFlashlight.textContent = `🔦 Modo Linterna: ${active ? 'ON' : 'OFF'}`;
  toggleFlashlight.classList.toggle('active', active);
});

toggleParticles.addEventListener('click', () => {
  particlesEnabled = !particlesEnabled;
  toggleParticles.textContent = `✨ Estela Cursor: ${particlesEnabled ? 'ON' : 'OFF'}`;
  toggleParticles.classList.toggle('active', particlesEnabled);
});

document.addEventListener('mousemove', (e) => {
  orb.style.left = `${e.clientX}px`;
  orb.style.top = `${e.clientY}px`;
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
  flashlightOverlay.style.setProperty('--mx', `${e.clientX}px`);
  flashlightOverlay.style.setProperty('--my', `${e.clientY}px`);

  // 01. Estela de partículas
  const now = Date.now();
  if (particlesEnabled && now - lastParticleTime > 35) {
    lastParticleTime = now;
    const p = document.createElement('div');
    p.className = 'trail-particle';
    p.style.left = `${e.clientX}px`;
    p.style.top = `${e.clientY}px`;
    p.style.background = Math.random() > 0.5 ? '#00f5d4' : '#ff007f';
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 700);
  }
});

// --- 46. TILT 3D EN TODAS LAS TARJETAS ---
document.querySelectorAll('.tilt-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `perspective(700px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg)';
  });
});

// --- 02. EFECTO LUPA ---
const exp2 = document.getElementById('exp2');
const magLens = document.getElementById('magLens');
exp2.addEventListener('mousemove', (e) => {
  const r = exp2.getBoundingClientRect();
  magLens.style.left = `${e.clientX - r.left}px`;
  magLens.style.top = `${e.clientY - r.top}px`;
});

// --- 03. RIPPLE AL CLIC ---
const exp3 = document.getElementById('exp3');
exp3.addEventListener('click', (e) => {
  const r = exp3.getBoundingClientRect();
  const circle = document.createElement('span');
  circle.className = 'ripple-circle';
  circle.style.left = `${e.clientX - r.left}px`;
  circle.style.top = `${e.clientY - r.top}px`;
  exp3.appendChild(circle);
  setTimeout(() => circle.remove(), 800);
});

// --- 05. GRAVEDAD REPULSIVA ---
const exp5 = document.getElementById('exp5');
const gravDots = [];
for (let i = 0; i < 24; i++) {
  const d = document.createElement('div');
  d.className = 'grav-dot';
  exp5.appendChild(d);
  gravDots.push(d);
}
exp5.addEventListener('mousemove', (e) => {
  gravDots.forEach(dot => {
    const r = dot.getBoundingClientRect();
    const dx = (r.left + 7) - e.clientX;
    const dy = (r.top + 7) - e.clientY;
    const dist = Math.hypot(dx, dy);
    if (dist < 70) {
      const force = (70 - dist) / 2;
      dot.style.transform = `translate(${(dx / dist) * force}px, ${(dy / dist) * force}px)`;
    } else {
      dot.style.transform = 'translate(0, 0)';
    }
  });
});
exp5.addEventListener('mouseleave', () => gravDots.forEach(d => d.style.transform = 'translate(0,0)'));

// --- 08. FLUIDO / PINTURA ---
const exp8 = document.getElementById('exp8');
exp8.addEventListener('mousemove', (e) => {
  const r = exp8.getBoundingClientRect();
  const drop = document.createElement('div');
  drop.className = 'fluid-dot';
  drop.style.left = `${e.clientX - r.left}px`;
  drop.style.top = `${e.clientY - r.top}px`;
  exp8.appendChild(drop);
  setTimeout(() => drop.remove(), 1000);
});

// --- 09. POLVO ESTELAR 3D ---
const exp9 = document.getElementById('exp9');
const stars = [];
for (let i = 0; i < 35; i++) {
  const s = document.createElement('div');
  s.className = 'star-dot';
  const size = Math.random() * 3 + 1;
  s.style.width = `${size}px`;
  s.style.height = `${size}px`;
  s.style.left = `${Math.random() * 100}%`;
  s.style.top = `${Math.random() * 100}%`;
  s.dataset.depth = size;
  exp9.appendChild(s);
  stars.push(s);
}
exp9.addEventListener('mousemove', (e) => {
  const r = exp9.getBoundingClientRect();
  const cx = (e.clientX - r.left) / r.width - 0.5;
  const cy = (e.clientY - r.top) / r.height - 0.5;
  stars.forEach(s => {
    const d = parseFloat(s.dataset.depth) * 12;
    s.style.transform = `translate(${-cx * d}px, ${-cy * d}px)`;
  });
});

// --- 10. ARRASTRE ELÁSTICO ---
const exp10 = document.getElementById('exp10');
let dragging10 = false, startX10 = 0, startY10 = 0;
exp10.addEventListener('mousedown', (e) => {
  dragging10 = true;
  startX10 = e.clientX;
  startY10 = e.clientY;
  exp10.style.transition = 'none';
});
window.addEventListener('mousemove', (e) => {
  if (!dragging10) return;
  const dx = Math.max(-70, Math.min(70, e.clientX - startX10));
  const dy = Math.max(-50, Math.min(50, e.clientY - startY10));
  exp10.style.transform = `translate(${dx}px, ${dy}px) scale(${1 + Math.abs(dx)*0.003}, ${1 - Math.abs(dx)*0.002})`;
});
window.addEventListener('mouseup', () => {
  if (!dragging10) return;
  dragging10 = false;
  exp10.style.transition = 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)';
  exp10.style.transform = 'translate(0, 0) scale(1, 1)';
});

// --- 11. CURVAS DE LISSAJOUS ---
const c11 = document.getElementById('canvas11').getContext('2d');
let t11 = 0;
function drawLissajous() {
  c11.fillStyle = 'rgba(14, 14, 19, 0.15)';
  c11.fillRect(0, 0, 280, 200);
  c11.strokeStyle = '#00f5d4';
  c11.lineWidth = 2;
  c11.beginPath();
  for (let i = 0; i < 200; i++) {
    const a = i * 0.035;
    const x = 140 + Math.sin(3 * a + t11) * 100;
    const y = 100 + Math.sin(4 * a) * 70;
    i === 0 ? c11.moveTo(x, y) : c11.lineTo(x, y);
  }
  c11.stroke();
  t11 += 0.03;
  requestAnimationFrame(drawLissajous);
}
drawLissajous();

// --- 12. TRIÁNGULO DE SIERPINSKI ---
const c12 = document.getElementById('canvas12').getContext('2d');
const depthSlider = document.getElementById('sierpinskiDepth');
function drawTriangle(x, y, size, depth) {
  if (depth === 0) {
    c12.beginPath();
    c12.moveTo(x, y);
    c12.lineTo(x + size / 2, y + size * 0.86);
    c12.lineTo(x - size / 2, y + size * 0.86);
    c12.closePath();
    c12.fillStyle = '#ff007f';
    c12.fill();
    return;
  }
  const half = size / 2;
  drawTriangle(x, y, half, depth - 1);
  drawTriangle(x - half / 2, y + half * 0.86, half, depth - 1);
  drawTriangle(x + half / 2, y + half * 0.86, half, depth - 1);
}
function renderFractal() {
  c12.clearRect(0, 0, 240, 170);
  drawTriangle(120, 10, 170, parseInt(depthSlider.value));
}
depthSlider.addEventListener('input', renderFractal);
renderFractal();

// --- 13. ONDAS SENOIDALES ---
const c13 = document.getElementById('canvas13').getContext('2d');
let phase13 = 0;
function drawSine() {
  c13.clearRect(0, 0, 280, 200);
  ['#00f5d4', '#ff007f', '#7b2cbf'].forEach((col, idx) => {
    c13.strokeStyle = col;
    c13.lineWidth = 2;
    c13.beginPath();
    for (let x = 0; x < 280; x += 4) {
      const y = 100 + Math.sin(x * 0.03 + phase13 + idx) * (35 - idx * 8);
      x === 0 ? c13.moveTo(x, y) : c13.lineTo(x, y);
    }
    c13.stroke();
  });
  phase13 += 0.05;
  requestAnimationFrame(drawSine);
}
drawSine();

// --- 14. GEOMETRÍA SAGRADA ---
const exp14 = document.getElementById('exp14');
for (let i = 1; i <= 5; i++) {
  const ring = document.createElement('div');
  ring.className = 'sacred-ring';
  ring.style.width = `${i * 32}px`;
  ring.style.height = `${i * 32}px`;
  ring.style.animationDuration = `${6 + i * 2}s`;
  exp14.appendChild(ring);
}

// --- 15. CUBO 3D INTERACTIVO ---
const cube3d = document.getElementById('cube3d');
let rotX = -20, rotY = 30, dragCube = false, lastCX = 0, lastCY = 0;
cube3d.parentElement.addEventListener('mousedown', (e) => { dragCube = true; lastCX = e.clientX; lastCY = e.clientY; });
window.addEventListener('mousemove', (e) => {
  if (!dragCube) return;
  rotY += (e.clientX - lastCX) * 0.8;
  rotX -= (e.clientY - lastCY) * 0.8;
  cube3d.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  lastCX = e.clientX; lastCY = e.clientY;
});
window.addEventListener('mouseup', () => dragCube = false);

// --- 16. ESFERA DE NODOS 3D ---
const c16 = document.getElementById('canvas16').getContext('2d');
let angle16 = 0;
const pts16 = [];
for (let i = 0; i < 60; i++) {
  const phi = Math.acos(-1 + (2 * i) / 60);
  const theta = Math.sqrt(60 * Math.PI) * phi;
  pts16.push({ x: Math.cos(theta) * Math.sin(phi), y: Math.sin(theta) * Math.sin(phi), z: Math.cos(phi) });
}
function drawSphere() {
  c16.clearRect(0, 0, 280, 200);
  pts16.forEach(p => {
    const x = p.x * Math.cos(angle16) - p.z * Math.sin(angle16);
    const z = p.z * Math.cos(angle16) + p.x * Math.sin(angle16);
    const scale = 200 / (200 + z * 65);
    c16.fillStyle = z > 0 ? '#00f5d4' : '#ff007f';
    c16.beginPath();
    c16.arc(140 + x * 65 * scale, 100 + p.y * 65 * scale, 2.5 * scale, 0, Math.PI * 2);
    c16.fill();
  });
  angle16 += 0.02;
  requestAnimationFrame(drawSphere);
}
drawSphere();

// --- 18. LABERINTO PROCEDURAL ---
const canvas18 = document.getElementById('canvas18');
const c18 = canvas18.getContext('2d');
function drawMaze() {
  c18.clearRect(0, 0, 260, 190);
  c18.strokeStyle = '#00f5d4';
  c18.lineWidth = 2;
  const step = 18;
  for (let x = 0; x < 260; x += step) {
    for (let y = 0; y < 190; y += step) {
      c18.beginPath();
      if (Math.random() > 0.5) {
        c18.moveTo(x, y); c18.lineTo(x + step, y + step);
      } else {
        c18.moveTo(x + step, y); c18.lineTo(x, y + step);
      }
      c18.stroke();
    }
  }
}
canvas18.addEventListener('click', drawMaze);
drawMaze();

// --- 19. TESELACIÓN HEXAGONAL ---
const exp19 = document.getElementById('exp19');
for (let i = 0; i < 24; i++) {
  const h = document.createElement('div');
  h.className = 'hex-cell';
  exp19.appendChild(h);
}

// --- 20. MATRIZ BINARIA PASTEL ---
const c20 = document.getElementById('canvas20').getContext('2d');
const drops20 = Array(28).fill(1);
setInterval(() => {
  c20.fillStyle = 'rgba(14, 14, 19, 0.18)';
  c20.fillRect(0, 0, 280, 200);
  c20.fillStyle = '#a0c4ff';
  c20.font = '12px monospace';
  drops20.forEach((y, i) => {
    const txt = Math.random() > 0.5 ? '1' : '0';
    c20.fillText(txt, i * 10, y * 14);
    if (y * 14 > 200 && Math.random() > 0.95) drops20[i] = 0;
    drops20[i]++;
  });
}, 60);

// --- 21. TEXTO DEFORMADO ---
const exp21 = document.getElementById('exp21');
const word21 = exp21.textContent;
exp21.textContent = '';
word21.split('').forEach(ch => {
  const span = document.createElement('span');
  span.className = 'warp-char';
  span.textContent = ch;
  exp21.appendChild(span);
});
exp21.parentElement.addEventListener('mousemove', (e) => {
  exp21.querySelectorAll('.warp-char').forEach(span => {
    const r = span.getBoundingClientRect();
    const dist = Math.abs((r.left + r.width / 2) - e.clientX);
    const scale = Math.max(1, 1.7 - dist / 70);
    span.style.transform = `scale(${scale}) translateY(${-(scale - 1) * 12}px)`;
    span.style.color = scale > 1.2 ? '#00f5d4' : '#fff';
  });
});
exp21.parentElement.addEventListener('mouseleave', () => {
  exp21.querySelectorAll('.warp-char').forEach(s => { s.style.transform = 'scale(1)'; s.style.color = '#fff'; });
});

// --- 25. REVELACIÓN POR MÁSCARA ---
const exp25 = document.getElementById('exp25');
exp25.addEventListener('mousemove', (e) => {
  const r = exp25.getBoundingClientRect();
  exp25.style.setProperty('--rx', `${e.clientX - r.left}px`);
  exp25.style.setProperty('--ry', `${e.clientY - r.top}px`);
});

// --- 30. SOMBRA DINÁMICA ---
const exp30 = document.getElementById('exp30');
const dynShadowText = document.getElementById('dynShadowText');
exp30.addEventListener('mousemove', (e) => {
  const r = exp30.getBoundingClientRect();
  const dx = ((r.left + r.width / 2) - e.clientX) * 0.25;
  const dy = ((r.top + r.height / 2) - e.clientY) * 0.25;
  dynShadowText.style.textShadow = `${dx}px ${dy}px 12px #ff007f`;
});

// --- 32. FASE LUNAR ---
const moonSlider = document.getElementById('moonSlider');
const moonShadow = document.getElementById('moonShadow');
moonSlider.addEventListener('input', () => {
  moonShadow.style.transform = `translateX(${moonSlider.value}%)`;
});

// --- 33. LLUVIA DE NEÓN ---
const exp33 = document.getElementById('exp33');
for (let i = 0; i < 25; i++) {
  const drop = document.createElement('div');
  drop.className = 'rain-drop';
  drop.style.left = `${Math.random() * 100}%`;
  drop.style.animationDuration = `${0.6 + Math.random() * 0.8}s`;
  drop.style.animationDelay = `${Math.random() * 2}s`;
  exp33.appendChild(drop);
}

// --- 44. MENÚ RADIAL ---
const radialBtn = document.getElementById('radialBtn');
radialBtn.addEventListener('click', () => radialBtn.parentElement.classList.toggle('open'));

// --- 45. CONTADOR RODANTE ---
let odoVal = 482;
const odoDisplay = document.getElementById('odoDisplay');
document.getElementById('odoBtn').addEventListener('click', () => {
  const target = odoVal + 125;
  const step = setInterval(() => {
    odoVal += 5;
    odoDisplay.textContent = String(odoVal).padStart(4, '0');
    if (odoVal >= target) clearInterval(step);
  }, 20);
});

// --- 48. TOOLTIP MAGNÉTICO ---
const exp48 = document.getElementById('exp48');
const magTip = document.getElementById('magTip');
exp48.addEventListener('mousemove', (e) => {
  const r = exp48.getBoundingClientRect();
  const offset = (e.clientX - (r.left + r.width / 2)) * 0.4;
  magTip.style.transform = `translateX(calc(-50% + ${offset}px))`;
});

// --- 50. VISUALIZADOR DE AUDIO ---
const exp50 = document.getElementById('exp50');
const eqBars = [];
for (let i = 0; i < 16; i++) {
  const b = document.createElement('div');
  b.className = 'eq-bar';
  b.style.height = '20px';
  exp50.appendChild(b);
  eqBars.push(b);
}
setInterval(() => {
  eqBars.forEach((b, i) => {
    const h = 15 + Math.abs(Math.sin(Date.now() * 0.005 + i * 0.6)) * 95 * Math.random();
    b.style.height = `${h}px`;
    b.style.background = h > 65 ? '#ff007f' : '#00f5d4';
  });
}, 140);
