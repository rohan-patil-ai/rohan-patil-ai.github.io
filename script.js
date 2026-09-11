(() => {
  'use strict';

  const ACCENT = '#ccff00';
  const MUTED = 'rgba(240, 240, 240, 0.35)';
  const GRID = 'rgba(204, 255, 0, 0.12)';

  const skills = ['Python', 'PyTorch', 'RAG', 'Neo4j', 'LLM Routing', 'Active Learning', 'GRPO', 'vLLM', 'FastAPI', 'Kubernetes', 'Docker', 'React', 'FAISS', 'Computer Vision', 'SQL'];

  const projectDetails = {
    hpylori: { kicker: 'MASTER\'S PROJECT / H.PYLORI DETECTION', title: 'Teaching AI to find cancer-causing bacteria in microscope slides.', body: 'Deep learning pipeline detecting H. pylori in whole slide pathology images. YOLOv8, R-CNN, QuPath with active learning loop. Accuracy improved from 30% to 80%, surfaced 1,000+ missed annotations. Awarded "Most Creative Research" at ICDD 2026.', stack: 'Stack: YOLOv8 · R-CNN · QuPath · Active Learning · Python · PyTorch', stats: ['30% → 80% accuracy', '1,000+ annotations', 'ICDD 2026 Award'], github: 'https://github.com/hxrshx/pylori-bacteria-repo', image: 'preview/hpylori.svg' },
    'bmw-cairo': { kicker: 'BMW CAIRO HACKATHON / LESSONS LEARNED', title: 'AI that learns from every defect at the plant.', body: 'Hybrid RAG capturing quality incidents and generating AI insights. Incident reporting, multi-source solution search, department analytics. Built for the BMW CAIRO Hackathon on October 17, 2025.', stack: 'Stack: GPT-4o · SQLite Vector Search · FastAPI · React 18', stats: ['GPT-4o', 'SQLite Vector Search', 'FastAPI + React'], github: 'https://github.com/rohan-patil-ai/BMW-Incidents-to-Lessons-AI', image: 'preview/bmw-cairo.png' },
    viktor: { kicker: 'TUM.AI x VIKTOR.COM / EHL HACKATHON', title: 'One question. Right model. Lower cost.', body: 'Explainable LLM router for Viktor.com. Predicts query complexity, routes to smallest capable model. 60%+ cost savings.', stack: 'Stack: RouteLLM · TF-IDF · Gradient Boosted Classifier', stats: ['−40% baseline', '−60%+ extended', '24h build'], github: 'https://github.com/rohan-patil-ai', image: 'preview/viktor.svg' },
    tunix: { kicker: 'GOOGLE TUNIX / TOP 3 MEDAL', title: 'Small model. Serious reasoning.', body: 'GRPO fine-tuning for Gemma 2B on GSM8K math. Active review reduces catastrophic forgetting. Top 3 / 400+.', stack: 'Stack: Gemma 2B · GRPO · PEFT · LoRA', stats: ['71.3% GSM8K', 'Top 3 / 400+', '8–11% lift'], github: 'https://github.com/rohan-patil-ai/Google-Tunix-Hackathon', image: 'preview/tunix.png' },
    caira: { kicker: 'THWS / ON-PREMISE RAG', title: 'AI mentor for incoming students.', body: 'Privacy-first RAG chatbot for THWS international students. Bilingual, on-premise, 12× faster inference.', stack: 'Stack: Qwen 1.5-7B · vLLM · FastAPI · Docker', stats: ['12× faster', 'EN + DE', 'On-premise'], github: 'https://github.com/rohan-patil-ai', image: 'preview/caira.svg' },
    blackjack: { kicker: 'REINFORCEMENT LEARNING', title: 'Teaching an agent to play the odds.', body: 'Q-learning agent learns optimal blackjack policy. Monte Carlo, Double Q-Learning under realistic conditions.', stack: 'Stack: Python · NumPy · OpenAI Gym', stats: ['Q-table policy', 'Monte Carlo', 'Double Q'], github: 'https://github.com/rohan-patil-ai/Blackjack21', image: 'preview/blackjack.svg' }
  };

  function setupCanvas(canvas) {
    const context = canvas.getContext('2d');
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.clientWidth || canvas.width;
    const height = canvas.clientHeight || canvas.height;
    canvas.width = width * ratio;
    canvas.height = height * ratio;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    return { context, width, height };
  }

  function drawGrid(context, width, height) {
    context.strokeStyle = GRID;
    context.lineWidth = 1;
    for (let x = 0; x <= width; x += 36) {
      context.beginPath(); context.moveTo(x, 0); context.lineTo(x, height); context.stroke();
    }
    for (let y = 0; y <= height; y += 36) {
      context.beginPath(); context.moveTo(0, y); context.lineTo(width, y); context.stroke();
    }
  }

  function drawLabel(context, text, x, y, color = MUTED, size = 11) {
    context.fillStyle = color; context.font = `${size}px "DM Mono", monospace`; context.fillText(text, x, y);
  }

  function drawHpylori(canvas) {
    const { context, width, height } = setupCanvas(canvas);
    let progress = 0; let raf;
    const padding = 34;
    const targets = [[0.22, 0.34, 12], [0.55, 0.25, 8], [0.71, 0.55, 10], [0.38, 0.72, 7], [0.81, 0.76, 9], [0.16, 0.68, 7], [0.62, 0.78, 8]];
    const render = () => {
      context.clearRect(0, 0, width, height); drawGrid(context, width, height);
      const imageW = width - padding * 2; const imageH = height - padding * 2;
      context.strokeStyle = 'rgba(240,240,240,.22)'; context.strokeRect(padding, padding, imageW, imageH);
      context.save(); context.beginPath(); context.rect(padding, padding, imageW * Math.min(progress * 1.2, 1), imageH); context.clip();
      targets.forEach(([tx, ty, radius], index) => {
        const x = padding + tx * imageW; const y = padding + ty * imageH;
        const active = Math.min(Math.max(progress * targets.length - index, 0), 1);
        context.globalAlpha = active;
        context.strokeStyle = ACCENT; context.lineWidth = 1.5; context.strokeRect(x - 15, y - 15, 30, 30);
        context.fillStyle = 'rgba(204,255,0,.14)'; context.fillRect(x - 15, y - 15, 30, 30);
        context.beginPath(); context.arc(x, y, radius * (0.75 + active * 0.25), 0, Math.PI * 2); context.fillStyle = ACCENT; context.fill();
      });
      context.restore(); context.globalAlpha = 1;
      drawLabel(context, 'PATCH SCAN', padding, height - 14, MUTED);
      drawLabel(context, `${Math.round(30 + progress * 50)}% DETECTION`, width - 128, height - 14, ACCENT);
      if (progress < 1) { progress = Math.min(progress + 0.012, 1); raf = requestAnimationFrame(render); }
    };
    render(); return () => cancelAnimationFrame(raf);
  }

  function drawBmwCairo(canvas) {
    const { context, width, height } = setupCanvas(canvas);
    let progress = 0; let raf;
    const nodes = Array.from({ length: 18 }, (_, i) => ({ x: 0.1 + ((i * 37) % 80) / 100, y: 0.2 + ((i * 53) % 60) / 100, r: i % 4 === 0 ? 6 : 3 }));
    const render = () => {
      context.clearRect(0, 0, width, height); drawGrid(context, width, height);
      const activeNodes = Math.floor(progress * nodes.length);
      context.strokeStyle = 'rgba(204,255,0,.25)'; context.lineWidth = 1;
      nodes.forEach((n, i) => { if (i < activeNodes && i % 2 === 0) { const next = nodes[(i + 3) % nodes.length]; context.beginPath(); context.moveTo(n.x * width, n.y * height); context.lineTo(next.x * width, next.y * height); context.stroke(); } });
      nodes.forEach((n, i) => { context.globalAlpha = i < activeNodes ? 1 : 0; context.fillStyle = i % 4 === 0 ? ACCENT : 'rgba(204,255,0,.45)'; context.beginPath(); context.arc(n.x * width, n.y * height, n.r, 0, Math.PI * 2); context.fill(); context.globalAlpha = 1; });
      drawLabel(context, 'INCIDENT CAPTURE', 24, height - 14, MUTED); drawLabel(context, 'RAG INSIGHTS', width - 100, height - 14, ACCENT);
      if (progress < 1) { progress = Math.min(progress + 0.01, 1); raf = requestAnimationFrame(render); }
    };
    render(); return () => cancelAnimationFrame(raf);
  }

  function drawViktor(canvas) {
    const { context, width, height } = setupCanvas(canvas); let progress = 0; let raf;
    const nodes = [{ x: .12, y: .5, label: 'QUERY' }, { x: .43, y: .25, label: 'FAST' }, { x: .43, y: .75, label: 'DEEP' }, { x: .78, y: .25, label: '7B' }, { x: .78, y: .75, label: '70B' }];
    const edges = [[0, 1], [0, 2], [1, 3], [2, 4]];
    const render = () => {
      context.clearRect(0, 0, width, height); drawGrid(context, width, height);
      edges.forEach(([from, to], index) => { const a = nodes[from]; const b = nodes[to]; const ep = Math.min(Math.max(progress * edges.length - index, 0), 1); context.beginPath(); context.moveTo(a.x * width, a.y * height); context.lineTo(a.x * width + (b.x - a.x) * width * ep, a.y * height + (b.y - a.y) * height * ep); context.strokeStyle = ep ? 'rgba(204,255,0,.7)' : MUTED; context.stroke(); });
      nodes.forEach((node, index) => { const active = Math.min(Math.max(progress * nodes.length - index, 0), 1); const x = node.x * width; const y = node.y * height; context.globalAlpha = active; context.fillStyle = 'rgba(204,255,0,.12)'; context.strokeStyle = ACCENT; context.lineWidth = 1.5; context.beginPath(); context.arc(x, y, index === 0 ? 25 : 22, 0, Math.PI * 2); context.fill(); context.stroke(); context.globalAlpha = 1; drawLabel(context, node.label, x - (node.label.length * 3), y + 4, ACCENT, 10); });
      drawLabel(context, 'ROUTE BY COMPLEXITY', 24, height - 14, MUTED); drawLabel(context, '−60% COST', width - 105, height - 14, ACCENT);
      if (progress < 1) { progress = Math.min(progress + 0.014, 1); raf = requestAnimationFrame(render); }
    }; render(); return () => cancelAnimationFrame(raf);
  }

  function drawTunix(canvas) {
    const { context, width, height } = setupCanvas(canvas); let progress = 0; let raf;
    const values = [38, 52, 64, 71.3]; const labels = ['BASE', 'SFT', 'GRPO', 'REVIEW']; const cb = height - 44; const ct = 42; const ch = cb - ct;
    const render = () => {
      context.clearRect(0, 0, width, height); drawGrid(context, width, height); const bw = Math.min(54, width / 8); const gap = width / 5;
      context.strokeStyle = 'rgba(240,240,240,.2)'; context.beginPath(); context.moveTo(28, cb); context.lineTo(width - 24, cb); context.stroke();
      values.forEach((value, index) => { const active = Math.min(Math.max(progress * values.length - index, 0), 1); const h = ch * (value / 80) * active; const x = gap * (index + 0.7); const y = cb - h; context.fillStyle = index === values.length - 1 ? ACCENT : 'rgba(204,255,0,.35)'; context.fillRect(x, y, bw, h); drawLabel(context, `${value}%`, x + 4, y - 8, index === values.length - 1 ? ACCENT : MUTED); drawLabel(context, labels[index], x + 2, cb + 22, MUTED, 10); });
      drawLabel(context, 'GSM8K / GEMMA 2B', 24, 22, MUTED); if (progress < 1) { progress = Math.min(progress + 0.012, 1); raf = requestAnimationFrame(render); }
    }; render(); return () => cancelAnimationFrame(raf);
  }

  function drawCaira(canvas) {
    const { context, width, height } = setupCanvas(canvas); let progress = 0; let raf;
    const points = [60, 48, 35, 22, 13, 7, 4.8]; const left = 42; const right = width - 30; const top = 46; const bottom = height - 48; const xStep = (right - left) / (points.length - 1);
    const render = () => {
      context.clearRect(0, 0, width, height); drawGrid(context, width, height); context.strokeStyle = 'rgba(240,240,240,.2)'; context.beginPath(); context.moveTo(left, bottom); context.lineTo(right, bottom); context.stroke();
      context.beginPath(); points.forEach((value, index) => { const active = Math.min(Math.max(progress * points.length - index, 0), 1); const x = left + xStep * index; const y = bottom - (bottom - top) * (value / 65) * active; index === 0 ? context.moveTo(x, y) : context.lineTo(x, y); }); context.strokeStyle = ACCENT; context.lineWidth = 2; context.stroke();
      points.forEach((value, index) => { const active = Math.min(Math.max(progress * points.length - index, 0), 1); const x = left + xStep * index; const y = bottom - (bottom - top) * (value / 65) * active; context.globalAlpha = active; context.fillStyle = ACCENT; context.beginPath(); context.arc(x, y, 4, 0, Math.PI * 2); context.fill(); context.globalAlpha = 1; if (index === 0 || index === points.length - 1) drawLabel(context, `${value}s`, x - 10, y - 12, ACCENT); });
      drawLabel(context, 'INFERENCE LATENCY', 24, 22, MUTED); drawLabel(context, '12× FASTER', width - 100, height - 14, ACCENT); if (progress < 1) { progress = Math.min(progress + 0.012, 1); raf = requestAnimationFrame(render); }
    }; render(); return () => cancelAnimationFrame(raf);
  }

  function drawBlackjack(canvas) {
    const { context, width, height } = setupCanvas(canvas); let progress = 0; let raf;
    const left = 34; const right = width - 30; const top = 38; const bottom = height - 48; const samples = 42;
    const render = () => {
      context.clearRect(0, 0, width, height); drawGrid(context, width, height); context.strokeStyle = 'rgba(240,240,240,.2)'; context.beginPath(); context.moveTo(left, bottom); context.lineTo(right, bottom); context.stroke(); context.beginPath();
      for (let i = 0; i < samples; i++) { const x = left + (right - left) * i / (samples - 1); const stable = 0.66 + 0.05 * Math.sin(i * 0.8); const noisy = 0.18 * Math.sin(i * 3.7) * Math.max(0, 1 - i / 22); const value = Math.max(0.1, stable + noisy); const active = Math.min(Math.max(progress * samples - i, 0), 1); const y = bottom - (bottom - top) * value * active; i === 0 ? context.moveTo(x, y) : context.lineTo(x, y); }
      context.strokeStyle = ACCENT; context.lineWidth = 2; context.stroke(); drawLabel(context, 'AVERAGE REWARD', 24, 22, MUTED); drawLabel(context, 'POLICY CONVERGED', width - 138, height - 14, ACCENT);
      if (progress < 1) { progress = Math.min(progress + 0.009, 1); raf = requestAnimationFrame(render); }
    }; render(); return () => cancelAnimationFrame(raf);
  }

  const drawers = { hpylori: drawHpylori, 'bmw-cairo': drawBmwCairo, viktor: drawViktor, tunix: drawTunix, caira: drawCaira, blackjack: drawBlackjack };
  const started = new Set();

  function startDiagram(key) {
    if (started.has(key)) return;
    const canvas = document.getElementById(`canvas-${key}`);
    if (!canvas || !drawers[key]) return;
    started.add(key); drawers[key](canvas);
  }

  function setupSkillsBubbles() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    const canvas = document.getElementById('skills-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth; const h = 400;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const cols = Math.max(3, Math.floor(w / 120));
    const rows = Math.ceil(skills.length / cols);
    const bubbles = skills.map((skill, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const baseX = (w / (cols + 1)) * (col + 1);
      const baseY = (h / (rows + 1)) * (row + 1);
      return { label: skill, x: baseX, y: baseY, baseX, baseY, r: 28, hover: false, dragging: false };
    });
    let dragging = null; let mouseX = 0; let mouseY = 0;
    function draw() {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.6)'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = GRID; ctx.lineWidth = 0.5;
      for (let x = 0; x <= w; x += 36) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y <= h; y += 36) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      bubbles.forEach((b) => {
        if (dragging !== b && Math.abs(b.x - b.baseX) < 0.5 && Math.abs(b.y - b.baseY) < 0.5) { b.x = b.baseX; b.y = b.baseY; }
        ctx.fillStyle = b.hover ? ACCENT : 'rgba(204,255,0,.2)';
        ctx.strokeStyle = b.hover ? ACCENT : 'rgba(204,255,0,.4)';
        ctx.lineWidth = b.hover ? 2 : 1.5;
        ctx.beginPath(); ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = b.hover ? '#050505' : 'rgba(240,240,240,.85)';
        ctx.font = 'bold 12px "DM Mono"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(b.label, b.x, b.y);
      });
      requestAnimationFrame(draw);
    }
    draw();
    canvas.addEventListener('mousedown', (e) => {
      const rect = canvas.getBoundingClientRect(); mouseX = e.clientX - rect.left; mouseY = e.clientY - rect.top;
      bubbles.forEach((b) => { const d = Math.hypot(mouseX - b.x, mouseY - b.y); if (d < b.r) dragging = b; });
    });
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect(); mouseX = e.clientX - rect.left; mouseY = e.clientY - rect.top;
      bubbles.forEach((b) => { const d = Math.hypot(mouseX - b.x, mouseY - b.y); b.hover = d < b.r; });
      if (dragging) { dragging.x = Math.max(dragging.r, Math.min(w - dragging.r, mouseX)); dragging.y = Math.max(dragging.r, Math.min(h - dragging.r, mouseY)); }
    });
    canvas.addEventListener('mouseup', () => { dragging = null; });
    canvas.addEventListener('mouseleave', () => { dragging = null; bubbles.forEach((b) => b.hover = false); });
  }

  function setupMotion() {
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('.hero .reveal', { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.to(item, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 82%', once: true, onEnter: () => startDiagram(item.dataset.project) } });
      });
      gsap.utils.toArray('.work .reveal, .skills .reveal, .about .reveal, .contact .reveal, .job-card, .github-cta').forEach((item) => {
        gsap.to(item, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 86%', once: true } });
      });
    } else {
      document.querySelectorAll('.reveal').forEach((item) => { item.style.opacity = '1'; item.style.transform = 'none'; });
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { if (entry.target.dataset.project) startDiagram(entry.target.dataset.project); } }), { threshold: 0.2 });
      document.querySelectorAll('.timeline-item, .reveal').forEach((item) => observer.observe(item));
    }
  }

  function setupModal() {
    const modal = document.getElementById('project-modal');
    if (!modal) return;
    const kicker = document.getElementById('modal-kicker');
    const title = document.getElementById('modal-title');
    const body = document.getElementById('modal-body');
    const stats = document.getElementById('modal-stats');
    const stack = document.getElementById('modal-stack');
    const links = document.getElementById('modal-links');
    const imgEl = document.getElementById('modal-img');
    const imgPlaceholder = document.getElementById('img-placeholder');
    const close = () => { modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    const open = (key) => {
      const detail = projectDetails[key];
      if (!detail) return;
      kicker.textContent = detail.kicker;
      title.textContent = detail.title;
      body.textContent = detail.body;
      stack.textContent = detail.stack;
      stats.innerHTML = detail.stats.map((s) => `<span>${s}</span>`).join('');
      links.innerHTML = detail.github ? `<a href="${detail.github}" target="_blank" rel="noreferrer">View on GitHub ↗</a>` : '';
      if (detail.image) { imgEl.src = detail.image; imgEl.style.display = 'block'; imgPlaceholder.style.display = 'none'; } else { imgEl.style.display = 'none'; imgPlaceholder.style.display = 'flex'; }
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      modal.querySelector('.modal-close').focus();
    };
    document.querySelectorAll('.project').forEach((project) => {
      const button = project.querySelector('.text-button');
      button?.addEventListener('click', (event) => { event.stopPropagation(); open(project.dataset.project); });
      project.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(project.dataset.project); } });
    });
    modal.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', close));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') close(); });
  }

  function setupResize() {
    let timer;
    window.addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(() => { window.ScrollTrigger?.refresh(); setupSkillsBubbles(); }, 150); });
  }

  setupMotion();
  setupModal();
  setupSkillsBubbles();
  setupResize();
})();