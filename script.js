(() => {
  'use strict';

  const ACCENT = '#ccff00';
  const MUTED = 'rgba(240, 240, 240, 0.35)';
  const GRID = 'rgba(204, 255, 0, 0.12)';

  const skills = ['Python', 'PyTorch', 'RAG', 'Neo4j', 'LLM Routing', 'Active Learning', 'GRPO', 'vLLM', 'FastAPI', 'Kubernetes', 'Docker', 'React', 'FAISS', 'Computer Vision', 'SQL'];
  const skillConnections = [
    ['Python', 'PyTorch'], ['Python', 'RAG'], ['Python', 'Computer Vision'],
    ['PyTorch', 'Active Learning'], ['RAG', 'Neo4j'], ['RAG', 'FastAPI'],
    ['Neo4j', 'Kubernetes'], ['LLM Routing', 'FastAPI'], ['GRPO', 'PyTorch'],
    ['vLLM', 'FastAPI'], ['FastAPI', 'Docker'], ['Kubernetes', 'Docker'],
    ['Computer Vision', 'Active Learning'], ['FAISS', 'RAG'], ['SQL', 'Neo4j']
  ];

  const projectDetails = {
    hpylori: { kicker: 'MASTER\'S PROJECT / H.PYLORI DETECTION', title: 'Teaching AI to find cancer-causing bacteria in microscope slides.', summary: 'Deep learning pipeline with active learning loop.', body: 'Engineered hierarchical detection pipeline for H. pylori bacteria in whole slide pathology (WSI) images — detecting 5×5 pixel bacteria in 150K×60K pixel scans. YOLOv8 for initial detection, R-CNN for refinement, QuPath for annotation management. Implemented active learning loop: system flags uncertain patches, human reviews them, loop converges on high-confidence detections. Accuracy rose from 30% baseline (noisy initial labels) to 80% after active learning. Discovered and surfaced 1,000+ annotations missed by pathologists in original dataset. Published and awarded "Most Creative Research" at ICDD 2026.', stack: 'Stack: YOLOv8 · R-CNN · QuPath · Active Learning · Python · PyTorch', stats: ['30% → 80% accuracy', '1,000+ annotations', 'ICDD 2026 Award'], github: 'https://github.com/hxrshx/pylori-bacteria-repo', image: 'preview/hpylori.svg' },
    'bmw-cairo': { kicker: 'BMW CAIRO HACKATHON / LESSONS LEARNED', title: 'AI that learns from every defect at the plant.', summary: 'Hybrid RAG for quality incidents and root causes.', body: 'Full-stack hybrid RAG platform built for BMW CAIRO Hackathon (October 17, 2025) to automate incident-to-insight pipeline. Manufacturing defects reported into system → GPT-4o analyzes incident data → generates structured lessons learned, preventive actions, and identifies root causes. Multi-source retrieval: internal SQLite vector search over historical incidents + department knowledge base + live web search for similar external cases. React 18 frontend with TypeScript, shadcn/ui for incident entry and analytics dashboard. Result: defect knowledge captured and searchable by all departments, reducing repeat failures and accelerating root-cause identification. Incident reporting → lessons learned insights in minutes instead of manual cross-team meetings.', stack: 'Stack: GPT-4o · SQLite Vector Search · FastAPI · React 18 · TypeScript · shadcn/ui', stats: ['GPT-4o', 'SQLite Vector Search', 'FastAPI + React'], github: 'https://github.com/rohan-patil-ai/BMW-Incidents-to-Lessons-AI', image: 'preview/bmw-cairo.png' },
    viktor: { kicker: 'TUM.AI x VIKTOR.COM / EHL HACKATHON', title: 'One question. Right model. Lower cost.', summary: 'Explainable LLM router for cost-aware inference.', body: 'Offline LLM router built in 24 hours as part of TUM.ai team competing in European Hackathon League (EHL), solving challenge set by Viktor.com co-founder. System learns to route queries to smallest capable model without sacrificing quality. Semantic features: TF-IDF embeddings of query text capture complexity signal. Metadata features: token count, entity types, task type. Gradient Boosted Classifier trained on held-out routing decisions. Baseline approach (always use 70B model): $1.00 per query. Router-guided approach: $0.60 per query (−40% cost). Extended post-hackathon evaluation with better feature engineering: −60%+ cost savings while maintaining accuracy. Explainability: model outputs feature importance so operators understand why a query routes to a smaller model.', stack: 'Stack: RouteLLM · TF-IDF · Gradient Boosted Classifier · Python', stats: ['−40% baseline', '−60%+ extended', '24h build'], github: 'https://github.com/rohan-patil-ai', image: 'preview/viktor.svg' },
    tunix: { kicker: 'GOOGLE TUNIX / TOP 3 MEDAL', title: 'Small model. Serious reasoning.', summary: 'Memory-efficient fine-tuning for small reasoning models.', body: 'Competed in Google Tunix Hackathon: "Reasoning with Small Language Models" among 400+ teams. Task: improve Gemma 2B performance on GSM8K math reasoning benchmark. Approach: GRPO (Group Relative Policy Optimization) fine-tuning to avoid catastrophic forgetting. Designed active review mechanism: maintain 1:1 ratio of new examples to historical examples during training — prevents model from overfitting to recent data and losing earlier learned reasoning patterns. Applied consensus voting post-training: ensemble predictions from 5 checkpoints → majority vote → 8–11% accuracy lift without additional training compute. Result: 71.3% accuracy on GSM8K (baseline Gemma 2B: ~38%). Top 3 medal out of 400+ competing teams. Key insight: small models benefit significantly from careful training discipline (active review) and ensemble methods (consensus voting), not just scale.', stack: 'Stack: Gemma 2B · GRPO · PEFT · LoRA · PyTorch', stats: ['71.3% GSM8K', 'Top 3 / 400+', '8–11% lift'], github: 'https://github.com/rohan-patil-ai/Google-Tunix-Hackathon', image: 'preview/tunix.png' },
    caira: { kicker: 'THWS / ON-PREMISE RAG', title: 'AI mentor for incoming students.', summary: 'Privacy-first bilingual chatbot for international students.', body: 'CAIRA: on-premise RAG chatbot for Technische Hochschule Würzburg-Schweinfurt (THWS) international students. Requirement: documents remain on-campus, never sent to cloud services (privacy + compliance). Bilingual interface: English and German. System processes university administrative documents (admission requirements, course catalogs, housing, visa procedures) via FAISS vector index. Query → semantic search over docs → Qwen 1.5-7B generates contextual answer in student\'s language. Initial deployment: 60-second latency per query (inference bottleneck). Optimization: migrated to vLLM (vector LLM serving) for batched inference, wrapped behind FastAPI with Nginx reverse proxy. Result: <5 second latency (12× improvement). Bilingual support critical for growing international cohort; on-premise deployment ensures compliance with German data protection laws.', stack: 'Stack: Qwen 1.5-7B · vLLM · FastAPI · Docker · Nginx', stats: ['12× faster', 'EN + DE', 'On-premise'], github: 'https://github.com/rohan-patil-ai', image: 'preview/caira.svg' },
    blackjack: { kicker: 'REINFORCEMENT LEARNING', title: 'Teaching an agent to play the odds.', summary: 'Tabular Q-learning and policy exploration in Blackjack.', body: 'Tabular reinforcement learning agent learns optimal Blackjack strategy through millions of simulated hands. State space: (player sum, dealer card showing, usable ace). Q-table learns value of each action (hit/stand) in each state. Three approaches implemented: (1) Monte Carlo: collect full episode trajectories, update values after episode ends — stable but slow. (2) Q-learning: online updates, bootstrap from next state — faster convergence. (3) Double Q-Learning: avoid overestimation bias in value updates by decoupling action selection from value evaluation. Agent converges on strategy that matches textbook Blackjack optimal play (hit on 12 vs dealer 3, stand on 17, etc.). Demonstrates exploration-exploitation tradeoff: early training includes epsilon-greedy exploration; later stages exploit learned policy. Key learning: even simple tabular methods reach near-optimal policies when state/action spaces are manageable.', stack: 'Stack: Python · NumPy · OpenAI Gym · Matplotlib', stats: ['Q-table policy', 'Monte Carlo', 'Double Q'], github: 'https://github.com/rohan-patil-ai/Blackjack21', image: 'preview/blackjack.svg' }
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

  function setupSkillsGraph() {
    const container = document.getElementById('skills-container');
    if (!container) return;
    const canvas = document.getElementById('skills-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const w = container.clientWidth; const h = 400;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const nodes = skills.map((label, i) => {
      const angle = (i / skills.length) * Math.PI * 2;
      const r = Math.min(w, h) / 2.8;
      return { label, x: w / 2 + r * Math.cos(angle), y: h / 2 + r * Math.sin(angle), r: 28, hover: false, cx: w / 2 + r * Math.cos(angle), cy: h / 2 + r * Math.sin(angle) };
    });
    let hover = null;
    function draw() {
      ctx.fillStyle = 'rgba(5, 5, 5, 0.6)'; ctx.fillRect(0, 0, w, h);
      ctx.strokeStyle = GRID; ctx.lineWidth = 0.5;
      for (let x = 0; x <= w; x += 36) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
      for (let y = 0; y <= h; y += 36) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }
      skillConnections.forEach(([s1, s2]) => {
        const n1 = nodes.find(n => n.label === s1);
        const n2 = nodes.find(n => n.label === s2);
        if (n1 && n2) {
          ctx.strokeStyle = hover && (hover.label === s1 || hover.label === s2) ? ACCENT : 'rgba(204,255,0,.15)';
          ctx.lineWidth = hover && (hover.label === s1 || hover.label === s2) ? 2 : 1;
          ctx.beginPath(); ctx.moveTo(n1.x, n1.y); ctx.lineTo(n2.x, n2.y); ctx.stroke();
        }
      });
      nodes.forEach((n) => {
        ctx.fillStyle = n.hover ? ACCENT : 'rgba(204,255,0,.2)';
        ctx.strokeStyle = n.hover ? ACCENT : 'rgba(204,255,0,.4)';
        ctx.lineWidth = n.hover ? 2.5 : 1.5;
        ctx.beginPath(); ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
        ctx.fillStyle = n.hover ? '#050505' : 'rgba(240,240,240,.85)';
        ctx.font = 'bold 11px "DM Mono"'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(n.label, n.x, n.y);
      });
      requestAnimationFrame(draw);
    }
    draw();
    canvas.addEventListener('mousemove', (e) => {
      const rect = canvas.getBoundingClientRect(); const mx = e.clientX - rect.left; const my = e.clientY - rect.top;
      hover = null;
      nodes.forEach((n) => { const d = Math.hypot(mx - n.x, my - n.y); n.hover = d < n.r; if (n.hover) hover = n; });
    });
    canvas.addEventListener('mouseleave', () => { nodes.forEach((n) => n.hover = false); hover = null; });
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
    window.addEventListener('resize', () => { clearTimeout(timer); timer = setTimeout(() => { window.ScrollTrigger?.refresh(); setupSkillsGraph(); }, 150); });
  }

  setupMotion();
  setupModal();
  setupSkillsGraph();
  setupResize();
})();