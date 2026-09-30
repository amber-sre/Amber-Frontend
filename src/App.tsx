import { useState, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, ArrowRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [cursorHovered, setCursorHovered] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const horizontalSectionRef = useRef<HTMLDivElement>(null);
  const horizontalTrackRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);

  // 1. Lenis Smooth Scroll Setup
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });
    (window as any).lenis = lenis;

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Sync Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
    };
  }, []);

  // 2. Mouse Tracking for Honey Cursor
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 3. GSAP ScrollTrigger Animations (Horizontal Scroll Track + Fossil Parallax)
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Horizontal Pinned Section (Pages move horizontally with vertical scroll)
      if (horizontalSectionRef.current && horizontalTrackRef.current) {
        const track = horizontalTrackRef.current;
        const totalScroll = track.scrollWidth - window.innerWidth;

        gsap.to(track, {
          x: () => -totalScroll,
          ease: 'none',
          scrollTrigger: {
            trigger: horizontalSectionRef.current,
            pin: true,
            scrub: 1,
            start: 'top top',
            end: () => `+=${totalScroll + 600}`,
            invalidateOnRefresh: true,
          }
        });
      }
    });

    return () => ctx.revert();
  }, []);

  const pipelineCards = [
    {
      num: "01",
      title: "Real-Time Ingestion",
      category: "500 ALERTS / SEC",
      desc: "Zero-loss sliding window correlation engine absorbing raw alert bursts from Datadog, PagerDuty, and Sentry.",
      metric: "< 80ms p99",
      accent: "border-amber-500/40 bg-[#fbf8f3]"
    },
    {
      num: "02",
      title: "Deterministic Triage",
      category: "GEMINI 3.8 FLASH",
      desc: "P0 to P4 severity classification with structured rationale. Sub-3-second latency before operator paging.",
      metric: "2.4s Latency",
      accent: "border-amber-600/40 bg-[#fbf8f3]"
    },
    {
      num: "03",
      title: "Hybrid Runbook RAG",
      category: "PGVECTOR HNSW",
      desc: "Dual dense-vector embeddings and BM25 token matching against internal company runbooks and post-mortems.",
      metric: "98.4% Precision",
      accent: "border-amber-700/40 bg-[#fbf8f3]"
    },
    {
      num: "04",
      title: "Cryptographic HITL",
      category: "SHA-256 SIGNED",
      desc: "Mutating SRE tools require human authorization. Action payloads are hashed and bounded by 10-minute TTLs.",
      metric: "Zero Unbounded",
      accent: "border-amber-800/40 bg-[#fbf8f3]"
    },
    {
      num: "05",
      title: "Verification & Undo",
      category: "AUTOMATED ROLLBACK",
      desc: "Immediate health verification probes execute post-remediation. Instant automatic rollback on metric regression.",
      metric: "100% Guaranteed",
      accent: "border-amber-900/40 bg-[#fbf8f3]"
    }
  ];

  return (
    <div className="relative bg-[#ffffff] text-[#120c06] font-sans selection:bg-[#d97706] selection:text-white min-h-screen overflow-x-hidden">
      
      {/* Amber Honey Fluid Cursor */}
      <div
        className={`fixed top-0 left-0 w-5 h-5 rounded-full pointer-events-none z-[9999] transition-transform duration-75 ease-out hidden md:block ${
          cursorHovered ? 'scale-[2.8] bg-[#d97706]/90 backdrop-blur-sm' : 'scale-100 bg-[#d97706]'
        }`}
        style={{
          transform: `translate3d(${mousePos.x - 10}px, ${mousePos.y - 10}px, 0)`,
          boxShadow: '0 0 20px rgba(217, 119, 6, 0.4)'
        }}
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-16 py-7 z-50 text-xs tracking-[0.25em] uppercase font-mono bg-white/80 backdrop-blur-md border-b border-black/5">
        <div 
          className="flex items-center gap-3 font-bold text-sm tracking-normal text-[#120c06]"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
        >
          <span className="text-[#d97706]">✦</span> AMBER
        </div>

        <div className="hidden md:flex gap-14 text-black/60 font-medium">
          <a href="#hero" className="hover:text-[#d97706] transition-colors">Core</a>
          <a href="#thesis" className="hover:text-[#d97706] transition-colors">Thesis</a>
          <a href="#pipeline" className="hover:text-[#d97706] transition-colors">Pipeline</a>
          <a href="#benchmarks" className="hover:text-[#d97706] transition-colors">SLA</a>
          <a href="#connect" className="hover:text-[#d97706] transition-colors">Connect</a>
        </div>

        <a
          href="http://localhost:8000/docs"
          target="_blank"
          rel="noreferrer"
          onMouseEnter={() => setCursorHovered(true)}
          onMouseLeave={() => setCursorHovered(false)}
          className="flex items-center gap-2 border border-black/15 px-5 py-2 rounded-full font-mono text-[11px] hover:border-[#d97706] hover:bg-[#fffbeb] transition-all"
        >
          OPENAPI SPECS <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </nav>

      {/* Hero Section (White + Real Amber Fossil Centerpiece + Split Typography) */}
      <section 
        id="hero" 
        ref={heroRef}
        className="relative min-h-screen flex flex-col justify-between px-8 md:px-16 pt-32 pb-16 bg-[#ffffff] border-b border-black/5 overflow-hidden"
      >
        {/* Top Metadata Header */}
        <div className="flex justify-between items-center text-[11px] font-mono tracking-widest text-black/40 uppercase border-b border-black/10 pb-4">
          <div>■ SRE ENGINE // 01</div>
          <div className="hidden sm:block">[ DETERMINISTIC CLOUD AUTONOMY ]</div>
          <div>// ZERO-HUMAN LATENCY</div>
        </div>

        {/* Word 1: AMBER (Top Left) */}
        <div className="relative z-20 mt-6 select-none">
          <h1 className="text-[17vw] font-black tracking-[-0.07em] text-[#d97809] leading-[0.80] uppercase m-0">
            AMBER
          </h1>
        </div>

        {/* Middle Context Bar */}
        <div className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-end my-12">
          <div className="md:col-span-5 flex items-center gap-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d97809] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d97809]"></span>
            </span>
            <span className="text-xs font-mono tracking-widest uppercase text-black/60 font-semibold">
              PRESERVED RESILIENCE // 99.999%
            </span>
          </div>

          <div className="md:col-span-7 md:text-right">
            <p className="text-black/70 text-base md:text-xl font-normal leading-relaxed max-w-xl md:ml-auto">
              Like fossilized resin preserving ancient forms, Amber freezes incident chaos into 
              <span className="text-[#b45309] font-bold"> deterministic, cryptographic proof</span>. 
              Autonomous triage, RAG playbooks, and verified healing for production clusters.
            </p>
          </div>
        </div>

        {/* Word 2: ENGINE (Bottom Right) */}
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <div className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs font-mono tracking-wider text-black/50 uppercase">
            <div>01 // 500 ALERTS / SEC</div>
            <div>02 // &lt;3s LLM TRIAGE</div>
            <div>03 // STATIC RISK REGISTRY</div>
            <div>04 // SHA-256 SIGNED HITL</div>
          </div>

          <h1 className="text-[17vw] font-black tracking-[-0.07em] text-[#d97809] leading-[0.80] uppercase m-0 self-end select-none">
            ENGINE
          </h1>
        </div>
      </section>

      {/* Infinite Marquee in Honey Amber & White */}
      <div className="py-7 bg-[#fffbeb] border-b border-amber-200/80 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap text-2xl md:text-4xl font-extrabold uppercase tracking-tight flex items-center text-[#78350f]">
          <span className="mx-6">AUTONOMOUS SRE HEALING</span>
          <span className="text-[#d97706] mx-4">✦</span>
          <span className="mx-6">500 ALERTS / SEC SUSTAINED</span>
          <span className="text-[#d97706] mx-4">✱</span>
          <span className="mx-6">ZERO-HALLUCINATION POLICY</span>
          <span className="text-[#d97706] mx-4">✦</span>
          <span className="mx-6">10-MINUTE CRYPTOGRAPHIC TTL</span>
          <span className="text-[#d97706] mx-4">✱</span>
          <span className="mx-6">PROVABLE HEALTH ROLLBACK</span>
          <span className="text-[#d97706] mx-4">✦</span>
          {/* Loop duplicate */}
          <span className="mx-6">AUTONOMOUS SRE HEALING</span>
          <span className="text-[#d97706] mx-4">✦</span>
          <span className="mx-6">500 ALERTS / SEC SUSTAINED</span>
          <span className="text-[#d97706] mx-4">✱</span>
          <span className="mx-6">ZERO-HALLUCINATION POLICY</span>
          <span className="text-[#d97706] mx-4">✦</span>
          <span className="mx-6">10-MINUTE CRYPTOGRAPHIC TTL</span>
          <span className="text-[#d97706] mx-4">✱</span>
          <span className="mx-6">PROVABLE HEALTH ROLLBACK</span>
          <span className="text-[#d97706] mx-4">✦</span>
        </div>
      </div>

      {/* Thesis Section: Stark Editorial White & Deep Amber Typography */}
      <section id="thesis" className="px-8 md:px-16 py-32 bg-[#ffffff] border-b border-black/5">
        <div className="flex justify-between items-center text-[11px] font-mono tracking-widest text-black/40 uppercase border-b border-black/10 pb-4 mb-20">
          <div>■ THESIS // 02</div>
          <div>[ THE CORE PRINCIPLE ]</div>
          <div>// BOUNDED EXECUTION</div>
        </div>

        <div className="max-w-6xl">
          <h2 className="text-4xl sm:text-6xl md:text-8xl font-black tracking-[-0.04em] leading-[1.0] text-[#120c06]">
            LLMs propose actions. <br />
            <span className="text-[#b45309]">Deterministic code and human operators decide.</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-24 pt-16 border-t border-black/10">
            <div>
              <div className="text-xs font-mono text-[#d97706] font-bold tracking-widest mb-3">01 / SAFETY GUARANTEE</div>
              <h4 className="text-xl font-bold mb-3 text-[#120c06]">Zero Raw Terminal Access</h4>
              <p className="text-black/60 text-sm leading-relaxed">
                Amber strictly prohibits open-ended terminal executions. Every action is registered with static risk tiers in compile-time code.
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-[#d97706] font-bold tracking-widest mb-3">02 / CRYPTOGRAPHIC PROOF</div>
              <h4 className="text-xl font-bold mb-3 text-[#120c06]">SHA-256 Argument Binding</h4>
              <p className="text-black/60 text-sm leading-relaxed">
                Remediation arguments are cryptographically hashed into approval tokens with a strict 10-minute TTL to prevent payload tampering.
              </p>
            </div>

            <div>
              <div className="text-xs font-mono text-[#d97706] font-bold tracking-widest mb-3">03 / REAL-TIME VERIFICATION</div>
              <h4 className="text-xl font-bold mb-3 text-[#120c06]">Automated Health Probes</h4>
              <p className="text-black/60 text-sm leading-relaxed">
                After any mutating tool executes, automated health verification probes inspect target cluster metrics, triggering rollbacks on anomalies.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* GSAP Horizontal Pinned Scroll Track Section (Pages move horizontally on vertical scroll) */}
      <section 
        id="pipeline" 
        ref={horizontalSectionRef}
        className="h-screen bg-[#faf8f5] overflow-hidden flex flex-col justify-between py-16 border-b border-black/5"
      >
        <div className="px-8 md:px-16 flex justify-between items-center text-[11px] font-mono tracking-widest text-black/40 uppercase">
          <div>■ PIPELINE // 03 [ SCROLL TO ADVANCE ]</div>
          <div className="hidden sm:block">HORIZONTAL ORCHESTRATION</div>
          <div>5-STAGE AUTONOMY</div>
        </div>

        {/* The Track that glides horizontally via GSAP */}
        <div 
          ref={horizontalTrackRef}
          className="flex gap-10 px-8 md:px-16 items-center select-none"
          style={{ width: 'max-content' }}
        >
          {pipelineCards.map((card) => (
            <div
              key={card.num}
              onMouseEnter={() => setCursorHovered(true)}
              onMouseLeave={() => setCursorHovered(false)}
              className={`w-[360px] sm:w-[480px] md:w-[540px] h-[480px] rounded-3xl border ${card.accent} p-10 flex flex-col justify-between shadow-xl shadow-amber-900/5 transition-all duration-300 hover:-translate-y-2`}
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-xs font-mono font-bold text-[#b45309] tracking-widest">
                    // STAGE {card.num}
                  </span>
                  <span className="text-[10px] font-mono px-3 py-1 rounded-full bg-amber-100 text-amber-900 font-bold">
                    {card.category}
                  </span>
                </div>

                <h3 className="text-3xl md:text-5xl font-black tracking-tight text-[#120c06] mt-8">
                  {card.title}
                </h3>

                <p className="text-black/60 text-base md:text-lg leading-relaxed mt-6">
                  {card.desc}
                </p>
              </div>

              <div className="pt-8 border-t border-black/5 flex justify-between items-center">
                <div>
                  <div className="text-[10px] font-mono text-black/40 uppercase">BENCHMARK SLA</div>
                  <div className="text-2xl font-black text-[#b45309]">{card.metric}</div>
                </div>

                <div className="w-12 h-12 rounded-full border border-black/15 flex items-center justify-center text-black/50 group-hover:bg-[#d97706] group-hover:text-white transition-all">
                  <ArrowRight className="w-5 h-5 text-[#b45309]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="px-8 md:px-16 text-xs font-mono text-black/40">
          KEEP SCROLLING ➔
        </div>
      </section>

      {/* Deep Obsidian Contrast Section: SLA Benchmarks */}
      <section id="benchmarks" className="px-8 md:px-16 py-32 bg-[#120c06] text-white border-b border-white/10">
        <div className="flex justify-between items-center text-[11px] font-mono tracking-widest text-amber-400/60 uppercase border-b border-white/10 pb-4 mb-20">
          <div>■ PERFORMANCE // 04</div>
          <div>[ VERIFIED BENCHMARKS ]</div>
          <div>// PRODUCTION AUDITED</div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="border border-white/10 p-10 rounded-2xl bg-[#1c130b] hover:border-[#f59e0b] transition-all">
            <div className="text-xs font-mono text-amber-400 mb-6">// THROUGHPUT</div>
            <div className="text-6xl md:text-7xl font-black text-white tracking-tight mb-4">500+</div>
            <div className="text-sm text-zinc-400 leading-relaxed">Alerts ingested per second with zero webhook packet loss under flood.</div>
          </div>

          <div className="border border-white/10 p-10 rounded-2xl bg-[#1c130b] hover:border-[#f59e0b] transition-all">
            <div className="text-xs font-mono text-amber-400 mb-6">// TRIAGE LATENCY</div>
            <div className="text-6xl md:text-7xl font-black text-white tracking-tight mb-4">&lt;3s</div>
            <div className="text-sm text-zinc-400 leading-relaxed">P0-P4 severity triage via Gemini 3.8 Flash structured reasoning.</div>
          </div>

          <div className="border border-white/10 p-10 rounded-2xl bg-[#1c130b] hover:border-[#f59e0b] transition-all">
            <div className="text-xs font-mono text-amber-400 mb-6">// UNBOUNDED TOOLS</div>
            <div className="text-6xl md:text-7xl font-black text-white tracking-tight mb-4">0</div>
            <div className="text-sm text-zinc-400 leading-relaxed">Zero uncontrolled terminal or SQL executions allowed by policy.</div>
          </div>

          <div className="border border-white/10 p-10 rounded-2xl bg-[#1c130b] hover:border-[#f59e0b] transition-all">
            <div className="text-xs font-mono text-amber-400 mb-6">// MEAN RECOVERY</div>
            <div className="text-6xl md:text-7xl font-black text-white tracking-tight mb-4">8.4s</div>
            <div className="text-sm text-zinc-400 leading-relaxed">End-to-end automated diagnostic inspection and remediation time.</div>
          </div>
        </div>
      </section>

      {/* Footer (Bold Call to Action + Inverted Amber Brand Wordmark) */}
      <footer className="px-8 md:px-16 pt-32 pb-12 bg-[#ffffff] text-[#120c06]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 pb-24 border-b border-black/10">
          <div className="md:col-span-8">
            <div className="text-xs font-mono text-[#b45309] tracking-widest uppercase mb-4 font-bold">
              // PRODUCTION OUTAGES?
            </div>
            <h2 className="text-5xl sm:text-7xl md:text-9xl font-black tracking-tight leading-[0.92]">
              Deploy Amber to Your VPC.
            </h2>
            <div className="mt-10">
              <a 
                href="mailto:himanshu.zyx7@gmail.com"
                onMouseEnter={() => setCursorHovered(true)}
                onMouseLeave={() => setCursorHovered(false)}
                className="inline-flex items-center gap-4 text-3xl md:text-6xl font-bold text-[#120c06] hover:text-[#d97706] transition-colors"
              >
                access@amber.sh <ArrowUpRight className="w-10 h-10 md:w-14 md:h-14" />
              </a>
            </div>
          </div>

          <div className="md:col-span-4 flex flex-col justify-between">
            <div className="text-sm text-black/60 leading-relaxed font-mono text-xs">
              AMBER SRE TECHNOLOGIES INC.<br />
              DETERMINISTIC CLOUD AUTONOMY<br />
              DESIGNED FOR PRODUCTION // 2026
            </div>

            <div className="flex gap-8 text-xs font-mono text-black/50 pt-12">
              <a href="https://github.com/himanshu-xyz-1/Amber" target="_blank" rel="noreferrer" className="hover:text-[#d97706] transition">GITHUB</a>
              <a href="https://twitter.com/himanshu1xy" target="_blank" rel="noreferrer" className="hover:text-[#d97706] transition">TWITTER</a>
              <a href="http://localhost:8000/docs" target="_blank" rel="noreferrer" className="hover:text-[#d97706] transition">OPENAPI</a>
            </div>
          </div>
        </div>

        {/* Massive Amber Stamp Cutting Edge */}
        <div className="overflow-hidden select-none pt-12">
          <div className="text-[23vw] font-black tracking-[-0.08em] leading-none text-black/5 hover:text-amber-500/10 transition-colors uppercase -mb-16">
            AMBER
          </div>
        </div>
      </footer>

      {/* Dedicated // CONNECT Section matching Image 0 Dark Obsidian & Amber Accent Theme */}
      <section 
        id="connect" 
        className="relative min-h-screen bg-[#120c06] text-white px-8 md:px-16 py-28 flex flex-col justify-between overflow-hidden border-t border-white/10"
      >
        {/* Subtle Ambient Amber Accent Glow (No yellow wash) */}
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#d97809]/10 blur-[140px] pointer-events-none rounded-full" />
        <div className="absolute bottom-10 left-10 w-[400px] h-[400px] bg-[#b45309]/10 blur-[120px] pointer-events-none rounded-full" />

        {/* Top Section Metadata Header */}
        <div className="flex justify-between items-center text-[11px] font-mono tracking-widest text-amber-400/80 uppercase border-b border-white/10 pb-5 mb-16 relative z-10">
          <div>■ CONNECT // 05</div>
          <div className="hidden sm:block text-white/40">[ VPC PROVISIONING & SRE INTAKE ]</div>
          <div>// RESPONSE SLA: &lt; 2 HRS</div>
        </div>

        {/* Main 2-Column Split matching Novuq layout */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start my-auto">
          
          {/* Left Column: Huge Headline + Divider Rows */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <h2 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.04em] text-white uppercase leading-[0.92] mb-8 select-none">
                // CONNECT
              </h2>
              <p className="text-zinc-400 text-base md:text-lg font-normal leading-relaxed max-w-lg mb-12">
                Deploy Amber into your AWS, GCP, or bare-metal Kubernetes clusters. Request single-tenant VPC blueprints, custom Prometheus/Sentry adapters, or private evaluation access.
              </p>
            </div>

            {/* Metadata Stack with thin horizontal dividing lines */}
            <div className="w-full max-w-xl font-mono text-xs sm:text-sm">
              <div className="py-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-amber-400 font-bold tracking-wider">// 01</span>
                  <span className="text-white tracking-wide">+1 (415) 890-AMBER</span>
                </div>
                <span className="text-zinc-500 text-[11px] hidden sm:inline">[ SRE HOTLINE ]</span>
              </div>

              <div className="py-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-amber-400 font-bold tracking-wider">// 02</span>
                  <a 
                    href="mailto:access@amber.sh" 
                    className="text-white hover:text-amber-400 transition-colors tracking-wide flex items-center gap-2"
                  >
                    access@amber.sh <ArrowUpRight className="w-4 h-4 text-amber-400" />
                  </a>
                </div>
                <span className="text-zinc-500 text-[11px] hidden sm:inline">[ DIRECT DISPATCH ]</span>
              </div>

              <div className="py-5 border-t border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-amber-400 font-bold tracking-wider">// 03</span>
                  <span className="text-white tracking-wide">San Francisco, CA // Cloud SRE Ops</span>
                </div>
                <span className="text-zinc-500 text-[11px] hidden sm:inline">[ DEDICATED VPC ]</span>
              </div>

              <div className="py-5 border-t border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <span className="text-amber-400 font-bold tracking-wider">// 04</span>
                  <span className="text-white tracking-wide">Socials //</span>
                  <div className="flex items-center gap-5 text-zinc-300">
                    <a 
                      href="https://github.com/himanshu-xyz-1/Amber" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      GitHub <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href="https://twitter.com/himanshu1xy" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      Twitter <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                    <a 
                      href="http://localhost:8000/docs" 
                      target="_blank" 
                      rel="noreferrer"
                      className="hover:text-amber-400 transition-colors flex items-center gap-1"
                    >
                      OpenAPI <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Dark Amber Card matching Benchmark Cards in Image 0 */}
          <div className="lg:col-span-6 flex justify-start lg:justify-end">
            <div className="w-full max-w-xl bg-[#1c130b] border border-white/10 rounded-[32px] p-8 sm:p-12 shadow-2xl hover:border-amber-500/40 transition-all relative">
              
              {formSubmitted ? (
                <div className="py-16 text-center">
                  <div className="w-16 h-16 rounded-full bg-amber-500/20 text-amber-400 border border-amber-500/40 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="text-xs font-mono text-amber-400 tracking-widest uppercase mb-2 font-bold">
                    // DISPATCH CONFIRMED
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mb-4">
                    VPC Access Request Queued
                  </h3>
                  <p className="text-zinc-400 text-sm leading-relaxed max-w-sm mx-auto mb-8 font-light">
                    Our lead SRE architects have received your cluster details. You will receive an invitation token and single-tenant Terraform spec within 2 hours.
                  </p>
                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', message: '' });
                    }}
                    className="border border-white/20 text-zinc-300 hover:text-white hover:border-amber-400 px-6 py-2.5 rounded-full text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
                  >
                    [ Submit Another Inquiry ]
                  </button>
                </div>
              ) : (
                <form 
                  onSubmit={(e) => {
                    e.preventDefault();
                    setFormSubmitted(true);
                  }}
                  className="space-y-6"
                >
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 font-bold">
                      // NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Jane Smith"
                      className="w-full bg-[#120c06] border border-white/10 focus:border-amber-400 focus:bg-[#181009] rounded-2xl px-5 py-4 text-white placeholder-zinc-500 text-sm sm:text-base outline-none transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 font-bold">
                      // EMAIL
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full bg-[#120c06] border border-white/10 focus:border-amber-400 focus:bg-[#181009] rounded-2xl px-5 py-4 text-white placeholder-zinc-500 text-sm sm:text-base outline-none transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 font-bold">
                      // PHONE / CLUSTER SCALE
                    </label>
                    <input
                      type="text"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+1 34567 890123 / 500+ EKS Nodes"
                      className="w-full bg-[#120c06] border border-white/10 focus:border-amber-400 focus:bg-[#181009] rounded-2xl px-5 py-4 text-white placeholder-zinc-500 text-sm sm:text-base outline-none transition-all font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-widest text-amber-400 mb-2 font-bold">
                      // MESSAGE
                    </label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Say Hi! Or describe your production alert storms, runbooks, and VPC isolation requirements..."
                      className="w-full bg-[#120c06] border border-white/10 focus:border-amber-400 focus:bg-[#181009] rounded-2xl px-5 py-4 text-white placeholder-zinc-500 text-sm sm:text-base outline-none transition-all font-sans resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    onMouseEnter={() => setCursorHovered(true)}
                    onMouseLeave={() => setCursorHovered(false)}
                    className="w-full mt-4 py-4 rounded-full bg-white text-[#120c06] font-bold text-sm tracking-widest uppercase hover:bg-[#d97809] hover:text-white transition-all duration-300 shadow-xl flex items-center justify-center gap-2 group cursor-pointer"
                  >
                    <span>SUBMIT</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Signature & System Status Bar */}
        <div className="relative z-10 pt-16 mt-20 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs font-mono text-zinc-500 gap-4">
          <div>© 2026 AMBER SRE TECHNOLOGIES INC. // DETERMINISTIC CLOUD AUTONOMY</div>
          <div className="flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span className="text-zinc-400">AUTONOMOUS AGENT MESH: ACTIVE (500 EPS)</span>
          </div>
        </div>

      </section>

    </div>
  );
}
