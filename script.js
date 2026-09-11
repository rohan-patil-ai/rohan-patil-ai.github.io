(() => {
  'use strict';

  const ACCENT = '#ccff00';
  const MUTED = 'rgba(240, 240, 240, 0.35)';
  const GRID = 'rgba(204, 255, 0, 0.12)';

  const projectDetails = {
    hpylori: {
      kicker: 'MASTER\'S THESIS / H.PYLORI DETECTION',
      title: 'Teaching AI to find cancer-causing bacteria in microscope slides.',
      body: 'A deep learning pipeline that detects H. pylori bacteria in whole slide pathology images. The system combines YOLOv8, R-CNN, QuPath, and an active-learning loop that sends uncertain patches back for review. It improved detection accuracy from 30% to 80% and surfaced more than 1,000 missed annotations. Awarded "Most Creative Research" at ICDD 2026.',
      stack: 'Stack: YOLOv8 · R-CNN · QuPath · Active Learning · Python · PyTorch',
      stats: ['30% → 80% accuracy', '1,000+ annotations', 'ICDD 2026 Award'],
      github: 'https://github.com/hxrshx/pylori-bacteria-repo'
    },
    'bmw-cairo': {
      kicker: 'BMW CAIRO HACKATHON / LESSONS LEARNED',
      title: 'An AI that learns from every defect at the plant.',
      body: 'A comprehensive AI-powered platform for capturing, analyzing, and sharing quality issues and lessons learned across BMW\'s manufacturing departments. Built for the BMW CAIRO Hackathon on October 17, 2025. Features incident reporting, AI analysis for lessons learned and preventive actions, multi-source solution search (internal DB, RAG knowledge base, web), department analytics, and trend insights.',
      stack: 'Stack: GPT-4o · SQLite Vector Search · FastAPI · React 18 · TypeScript · shadcn/ui',
      stats: ['GPT-4o', 'SQLite Vector Search', 'FastAPI + React'],
      github: 'https://github.com/rohan-patil-ai/BMW-Incidents-to-Lessons-AI'
    },
    viktor: {
      kicker: 'TUM.AI x VIKTOR.COM / EHL HACKATHON',
      title: 'One question. Right model. Lower cost.',
      body: 'An explainable, offline LLM router built in 24 hours for Viktor.com (backed by a16z cofounder). The router predicts query complexity from semantic TF-IDF features and metadata, then selects the smallest capable language model. The initial system reduced baseline cost by about 40%; the extended evaluation reached more than 60% savings.',
      stack: 'Stack: RouteLLM · TF-IDF · Gradient Boosted Classifier · Python',
      stats: ['−40% baseline cost', '−60%+ extended', '5-person team'],
      github: null
    },
    tunix: {
      kicker: 'GOOGLE TUNIX / REASONING WITH SMALL LMS',
      title: 'Small model. Serious reasoning.',
      body: 'A memory-efficient GRPO fine-tuning pipeline for Gemma 2B on GSM8K math reasoning. Active review keeps new and historical examples balanced, reducing catastrophic forgetting. Consensus voting added an 8–11% lift without more training. Top 3 medal out of 400+ participants.',
      stack: 'Stack: Gemma 2B · GRPO · PEFT · LoRA · PyTorch',
      stats: ['71.3% GSM8K', 'Top 3 / 400+', '8–11% review lift'],
      github: 'https://github.com/rohan-patil-ai/Google-Tunix-Hackathon'
    },
    caira: {
      kicker: 'THWS / ON-PREMISE RAG CHATBOT',
      title: 'AI mentor for incoming university students.',
      body: 'CAIRA is a privacy-first, on-premise RAG chatbot built for THWS international students. Documents stay on campus while a bilingual interface answers questions in English and German. Migrating inference to vLLM and serving through FastAPI reduced latency by 12×, from 60 seconds to under 5 seconds.',
      stack: 'Stack: Qwen 1.5-7B · VLLM · FastAPI · Docker · Nginx',
      stats: ['60s → <5s', '12× faster', 'English + German'],
      github: null
    },
    blackjack: {
      kicker: 'REINFORCEMENT LEARNING / SIDE PROJECT',
      title: 'Teaching an agent to play the odds.',
      body: 'A tabular Q-learning agent learns optimal blackjack policy through simulated hands. It starts with noisy rewards, explores the action space, and gradually converges on a strategy that manages uncertainty one state at a time. Includes Monte Carlo and Double Q-Learning implementations under realistic conditions.',
      stack: 'Stack: Python · NumPy · OpenAI Gym · Matplotlib',
      stats: ['Q-table policy', 'Monte Carlo', 'Double Q-Learning'],
      github: 'https://github.com/rohan-patil-ai/Blackjack21'
    }
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
    context.fillStyle = color;
    context.font = `${size}px "DM Mono", monospace`;
    context.fillText(text, x, y);
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
    const nodes = Array.from({ length: 18 }, (_, index) => ({ x: 0.1 + ((index * 37) % 80) / 100, y: 0.2 + ((index * 53) % 60) / 100, r: index % 4 === 0 ? 6 : 3 }));
    const render = () => {
      context.clearRect(0, 0, width, height); drawGrid(context, width, height);
      const activeNodes = Math.floor(progress * nodes.length);
      context.strokeStyle = 'rgba(204,255,0,.25)'; context.lineWidth = 1;
      nodes.forEach((node, index) => { if (index < activeNodes && index % 2 === 0) { const next = nodes[(index + 3) % nodes.length]; context.beginPath(); context.moveTo(node.x * width, node.y * height); context.lineTo(next.x * width, next.y * height); context.stroke(); } });
      nodes.forEach((node, index) => { const active = index < activeNodes ? 1 : 0; context.globalAlpha = active; context.fillStyle = index % 4 === 0 ? ACCENT : 'rgba(204,255,0,.45)'; context.beginPath(); context.arc(node.x * width, node.y * height, node.r, 0, Math.PI * 2); context.fill(); context.globalAlpha = 1; });
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
      edges.forEach(([from, to], index) => { const a = nodes[from]; const b = nodes[to]; const edgeProgress = Math.min(Math.max(progress * edges.length - index, 0), 1); context.beginPath(); context.moveTo(a.x * width, a.y * height); context.lineTo(a.x * width + (b.x - a.x) * width * edgeProgress, a.y * height + (b.y - a.y) * height * edgeProgress); context.strokeStyle = edgeProgress ? 'rgba(204,255,0,.7)' : MUTED; context.stroke(); });
      nodes.forEach((node, index) => { const active = Math.min(Math.max(progress * nodes.length - index, 0), 1); const x = node.x * width; const y = node.y * height; context.globalAlpha = active; context.fillStyle = 'rgba(204,255,0,.12)'; context.strokeStyle = ACCENT; context.lineWidth = 1.5; context.beginPath(); context.arc(x, y, index === 0 ? 25 : 22, 0, Math.PI * 2); context.fill(); context.stroke(); context.globalAlpha = 1; drawLabel(context, node.label, x - (node.label.length * 3), y + 4, ACCENT, 10); });
      drawLabel(context, 'ROUTE BY COMPLEXITY', 24, height - 14, MUTED); drawLabel(context, '−60% COST', width - 105, height - 14, ACCENT);
      if (progress < 1) { progress = Math.min(progress + 0.014, 1); raf = requestAnimationFrame(render); }
    }; render(); return () => cancelAnimationFrame(raf);
  }

  function drawTunix(canvas) {
    const { context, width, height } = setupCanvas(canvas); let progress = 0; let raf;
    const values = [38, 52, 64, 71.3]; const labels = ['BASE', 'SFT', 'GRPO', 'REVIEW']; const chartBottom = height - 44; const chartTop = 42; const chartHeight = chartBottom - chartTop;
    const render = () => {
      context.clearRect(0, 0, width, height); drawGrid(context, width, height); const barW = Math.min(54, width / 8); const gap = width / 5;
      context.strokeStyle = 'rgba(240,240,240,.2)'; context.beginPath(); context.moveTo(28, chartBottom); context.lineTo(width - 24, chartBottom); context.stroke();
      values.forEach((value, index) => { const active = Math.min(Math.max(progress * values.length - index, 0), 1); const h = chartHeight * (value / 80) * active; const x = gap * (index + 0.7); const y = chartBottom - h; context.fillStyle = index === values.length - 1 ? ACCENT : 'rgba(204,255,0,.35)'; context.fillRect(x, y, barW, h); drawLabel(context, `${value}%`, x + 4, y - 8, index === values.length - 1 ? ACCENT : MUTED); drawLabel(context, labels[index], x + 2, chartBottom + 22, MUTED, 10); });
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

  function setupMotion() {
    const revealItems = document.querySelectorAll('.reveal');
    if (window.gsap && window.ScrollTrigger) {
      gsap.registerPlugin(ScrollTrigger);
      gsap.to('.hero .reveal', { opacity: 1, y: 0, duration: 1, stagger: 0.12, ease: 'power3.out', delay: 0.2 });
      gsap.utils.toArray('.timeline-item').forEach((item) => {
        gsap.to(item, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 82%', once: true, onEnter: () => startDiagram(item.dataset.project) } });
      });
      gsap.utils.toArray('.skills .reveal, .about .reveal, .contact .reveal, .github-section .reveal, .job-card').forEach((item) => {
        gsap.to(item, { opacity: 1, y: 0, duration: 0.75, ease: 'power3.out', scrollTrigger: { trigger: item, start: 'top 86%', once: true } });
      });
      gsap.utils.toArray('.skill-pill').forEach((pill, index) => {
        gsap.fromTo(pill, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: 0.45, delay: index * 0.04, ease: 'power2.out', scrollTrigger: { trigger: '.skill-cloud', start: 'top 82%', once: true } });
      });
    } else {
      revealItems.forEach((item) => { item.style.opacity = '1'; item.style.transform = 'none'; });
      const observer = new IntersectionObserver((entries) => entries.forEach((entry) => { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); if (entry.target.dataset.project) startDiagram(entry.target.dataset.project); } }), { threshold: 0.2 });
      document.querySelectorAll('.timeline-item, .reveal').forEach((item) => observer.observe(item));
    }
  }

  function setupModal() {
    const modal = document.getElementById('project-modal'); const kicker = document.getElementById('modal-kicker'); const title = document.getElementById('modal-title'); const body = document.getElementById('modal-body'); const stats = document.getElementById('modal-stats'); const stack = document.getElementById('modal-stack'); const links = document.getElementById('modal-links'); const image = document.getElementById('modal-image');
    if (!modal) return;
    const close = () => { modal.setAttribute('aria-hidden', 'true'); document.body.style.overflow = ''; };
    const open = (key) => {
      const detail = projectDetails[key]; if (!detail) return;
      kicker.textContent = detail.kicker; title.textContent = detail.title; body.textContent = detail.body;
      stack.textContent = detail.stack;
      stats.innerHTML = detail.stats.map((stat) => `<span>${stat}</span>`).join('');
      if (detail.github) {
        links.innerHTML = `<a href="${detail.github}" target="_blank" rel="noreferrer">View on GitHub ↗</a>`;
      } else {
        links.innerHTML = '';
      }
      image.classList.add('visible');
      modal.setAttribute('aria-hidden', 'false'); document.body.style.overflow = 'hidden'; modal.querySelector('.modal-close').focus();
    };
    document.querySelectorAll('.project').forEach((project) => { const button = project.querySelector('.text-button'); button?.addEventListener('click', (event) => { event.stopPropagation(); open(project.dataset.project); }); project.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') { event.preventDefault(); open(project.dataset.project); } }); });
    modal.querySelectorAll('[data-close-modal]').forEach((element) => element.addEventListener('click', close));
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && modal.getAttribute('aria-hidden') === 'false') close(); });
  }

  function setupResize() { let timer; window.addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(() => window.ScrollTrigger?.refresh(), 150); }); }

  setupMotion(); setupModal(); setupResize();
})();