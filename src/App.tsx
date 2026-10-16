import { useState, useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  Cpu, 
  Copy, 
  Check, 
  Sparkles,
  RotateCcw,
  Star
} from 'lucide-react';
import { SpotlightCard } from './components/SpotlightCard';
import { AnimatedCounter } from './components/AnimatedCounter';
import { RemediationVideoPlayer } from './components/RemediationVideoPlayer';
import { BlogView } from './components/BlogView';
import { HowItWorks } from './components/HowItWorks';
import { FaqSection } from './components/FaqSection';
import { LegalView, LegalDocType } from './components/LegalView';
import { PlatformCapabilities } from './components/PlatformCapabilities';
import { CommunityView } from './components/CommunityView';
import { PageTransition } from './components/PageTransition';
import { CalculatorView } from './components/CalculatorView';
import { ExecutiveAuditShowcase } from './components/ExecutiveAuditShowcase';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'blog' | 'legal' | 'community' | 'calculator'>('landing');
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isSplitting, setIsSplitting] = useState<boolean>(false);

  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [selectedInfra, setSelectedInfra] = useState<string>('AWS');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [pricingAudience, setPricingAudience] = useState<'companies' | 'agencies'>('companies');
  const [selectedPlan, setSelectedPlan] = useState<string>('Autonomous');
  const [legalDoc, setLegalDoc] = useState<LegalDocType>('privacy');

  const transitionTo = (action: () => void) => {
    setIsTransitioning(true);
    setIsSplitting(false);
    setTimeout(() => {
      action();
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(0, { immediate: true });
      } else {
        window.scrollTo({ top: 0, behavior: 'instant' });
      }
      setIsSplitting(true);
      setTimeout(() => {
        setIsTransitioning(false);
        setIsSplitting(false);
      }, 700);
    }, 280);
  };

  const openLegal = (doc: LegalDocType) => {
    if (currentView === 'legal' && legalDoc === doc) return;
    transitionTo(() => {
      setLegalDoc(doc);
      setCurrentView('legal');
      if (window.location.pathname !== `/${doc}`) {
        window.history.pushState(null, '', `/${doc}`);
      }
    });
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    clusterScale: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const smoothScrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if ((window as any).lenis) {
      (window as any).lenis.scrollTo(el, { duration: 1.4 });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Helper to dynamically update on-page SEO meta tags per route
  const updatePageSEO = (title: string, description: string, canonicalPath: string) => {
    document.title = title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', description);
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', title);
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute('content', description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) canonical.setAttribute('href', `https://ambersre.xyz${canonicalPath}`);
  };

  // HTML5 History & URL route synchronization (clean URLs, never trailing /#)
  useEffect(() => {
    const handleRoute = () => {
      const rawHash = window.location.hash;
      const cleanHash = rawHash.replace(/^#\/?/, '').toLowerCase();
      const pathname = window.location.pathname.toLowerCase();
      const cleanPath = pathname.replace(/^\/|\/$/g, '');

      // Immediately purge unsightly /# or # from the browser URL bar
      if (window.location.href.includes('#') && (!rawHash || rawHash === '#' || rawHash === '#/')) {
        window.history.replaceState(null, '', window.location.pathname || '/');
      }

      // Check Blog route
      if (cleanPath === 'blog' || cleanHash === 'blog') {
        setCurrentView('blog');
        updatePageSEO(
          'Amber Engineering Blog — Deterministic Incident Remediation & SRE Architecture',
          'Technical deep dives into autonomous incident remediation, deterministic guardrails, and cryptographic human-in-the-loop approvals.',
          '/blog'
        );
        if (window.location.pathname !== '/blog') {
          window.history.replaceState(null, '', '/blog');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // Check Community route (/community)
      if (cleanPath === 'community' || cleanHash === 'community') {
        setCurrentView('community');
        updatePageSEO(
          'Amber Community Edition — Free Self-Hosted In-VPC SRE Engine (3 Nodes)',
          'Deploy the source-available Amber Community Edition inside your VPC. Free forever up to 3 nodes and 5 services with zero license key required.',
          '/community'
        );
        if (window.location.pathname !== '/community') {
          window.history.replaceState(null, '', '/community');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // Check Custom Calculator route (/calculator)
      if (cleanPath === 'calculator' || cleanHash === 'calculator') {
        setCurrentView('calculator');
        updatePageSEO(
          'Amber ROI & Infrastructure Downtime Calculator — Autonomous SRE Savings',
          'Calculate engineering hours saved and MTTR reduction with autonomous incident remediation.',
          '/calculator'
        );
        if (window.location.pathname !== '/calculator') {
          window.history.replaceState(null, '', '/calculator');
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // Check Legal docs routes (/privacy, /terms, /dpa, /subprocessors, /security, /copyright)
      const legalDocs: LegalDocType[] = ['privacy', 'terms', 'dpa', 'subprocessors', 'security', 'copyright'];
      const matchedDoc = legalDocs.find((d) => d === cleanPath || d === cleanHash);
      if (matchedDoc) {
        setLegalDoc(matchedDoc);
        setCurrentView('legal');
        updatePageSEO(
          `Amber ${matchedDoc.toUpperCase()} — Security, SLA & Compliance Documentation`,
          'Official compliance, zero-egress data boundary, and terms of service for the Amber SRE platform.',
          `/${matchedDoc}`
        );
        if (window.location.pathname !== `/${matchedDoc}`) {
          window.history.replaceState(null, '', `/${matchedDoc}`);
        }
        window.scrollTo({ top: 0, behavior: 'instant' });
        return;
      }

      // Default: Landing view
      setCurrentView('landing');
      updatePageSEO(
        'Amber — Autonomous Incident Remediation & SRE Engine',
        'Amber is an autonomous SRE remediation engine that triages alerts in <3s, runs bounded diagnostics, and executes cryptographically signed HITL fixes inside your VPC.',
        '/'
      );
      if (cleanHash === 'contact' || cleanHash === 'connect' || cleanPath === 'contact' || cleanPath === 'connect') {
        setTimeout(() => {
          smoothScrollTo('connect');
        }, 400);
      }
    };

    handleRoute();
    window.addEventListener('hashchange', handleRoute);
    window.addEventListener('popstate', handleRoute);
    return () => {
      window.removeEventListener('hashchange', handleRoute);
      window.removeEventListener('popstate', handleRoute);
    };
  }, []);

  const navigateToCalculator = () => {
    if (currentView === 'calculator') return;
    transitionTo(() => {
      if (window.location.pathname !== '/calculator') {
        window.history.pushState(null, '', '/calculator');
      }
      setCurrentView('calculator');
    });
  };

  const navigateToBlog = () => {
    if (currentView === 'blog') return;
    transitionTo(() => {
      if (window.location.pathname !== '/blog') {
        window.history.pushState(null, '', '/blog');
      }
      setCurrentView('blog');
    });
  };

  const navigateToCommunity = () => {
    if (currentView === 'community') return;
    transitionTo(() => {
      if (window.location.pathname !== '/community') {
        window.history.pushState(null, '', '/community');
      }
      setCurrentView('community');
    });
  };

  const navigateToLanding = () => {
    if (currentView === 'landing') return;
    transitionTo(() => {
      if (window.location.pathname !== '/' || window.location.hash) {
        window.history.pushState(null, '', '/');
      }
      setCurrentView('landing');
    });
  };

  const navigateToContactFromBlog = () => {
    transitionTo(() => {
      setCurrentView('landing');
      if (window.location.pathname !== '/' || window.location.hash) {
        window.history.pushState(null, '', '/');
      }
      setTimeout(() => {
        smoothScrollTo('connect');
      }, 50);
    });
  };

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const [formError, setFormError] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          selectedPlan,
          selectedInfra,
          clusterScale: formData.clusterScale,
          message: formData.message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to dispatch notification');
      }

      setFormSubmitted(true);
    } catch (err: any) {
      console.error('Contact form submission error:', err);
      setFormError(err.message || 'Unable to submit directly. Please email team@ambersre.xyz.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  const handleSelectPlan = (planName: string) => {
    setSelectedPlan(planName);
    smoothScrollTo('connect');
  };

  return (
    <>
      <PageTransition isActive={isTransitioning} isSplitting={isSplitting} />

      {currentView === 'blog' && (
        <BlogView 
          onBack={navigateToLanding} 
          onNavigateToContact={navigateToContactFromBlog} 
        />
      )}

      {currentView === 'legal' && (
        <LegalView 
          initialDoc={legalDoc}
          onBack={navigateToLanding} 
          onNavigateToContact={navigateToContactFromBlog} 
        />
      )}

      {currentView === 'community' && (
        <CommunityView 
          onBack={navigateToLanding} 
          onNavigateToContact={navigateToContactFromBlog} 
        />
      )}

      {currentView === 'calculator' && (
        <CalculatorView 
          onBack={navigateToLanding} 
          onNavigateToContact={(quoteNote) => {
            navigateToLanding();
            if (quoteNote) {
              setFormData((prev) => ({
                ...prev,
                message: quoteNote,
                clusterScale: 'Custom Enterprise Cluster',
              }));
              setSelectedPlan('Custom Enterprise Plan');
              setSelectedInfra('Custom');
            }
            setTimeout(() => {
              smoothScrollTo('connect');
            }, 300);
          }} 
        />
      )}

      {currentView === 'landing' && (
        <div className="relative bg-[#ffffff] text-[#0a0a0a] font-sans selection:bg-[#d97706] selection:text-white min-h-screen overflow-x-hidden">
      
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full flex justify-between items-center px-8 md:px-16 py-6 z-50 bg-white/90 backdrop-blur-md border-b border-black/5">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          onClick={(e) => scrollToSection(e as any, 'hero')}
          className="flex items-center gap-2.5 font-bold text-sm tracking-normal text-[#0a0a0a] cursor-pointer group"
        >
          <img 
            src="/assets/amber-symbol.svg" 
            alt="Amber Symbol" 
            className="w-7 h-9 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform duration-200" 
          />
          <span className="tracking-tight text-lg font-black text-[#0a0a0a]">AMBER</span>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="hidden md:flex gap-5 lg:gap-8 text-black/70 font-sans text-xs tracking-wider uppercase font-semibold ml-6 items-center"
        >
          <a href="#how-it-works" onClick={(e) => scrollToSection(e, 'how-it-works')} className="hover:text-[#d97706] text-black font-bold transition-colors cursor-pointer">How It Works</a>
          <a href="#platform" onClick={(e) => scrollToSection(e, 'platform')} className="hover:text-black transition-colors cursor-pointer">Platform</a>
          <a href="#thesis" onClick={(e) => scrollToSection(e, 'thesis')} className="hover:text-black transition-colors cursor-pointer">Architecture</a>
          <a href="#live-engine" onClick={(e) => scrollToSection(e, 'live-engine')} className="hover:text-black transition-colors cursor-pointer">Simulator</a>
          <a href="#benchmarks" onClick={(e) => scrollToSection(e, 'benchmarks')} className="hover:text-black transition-colors cursor-pointer">Benchmarks</a>
          <a href="#executive-audits" onClick={(e) => scrollToSection(e, 'executive-audits')} className="hover:text-black transition-colors cursor-pointer">Audits</a>
          <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-black transition-colors cursor-pointer">Pricing</a>
          <a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="hover:text-black transition-colors cursor-pointer">FAQ</a>
          <a href="#connect" onClick={(e) => scrollToSection(e, 'connect')} className="hover:text-black transition-colors cursor-pointer">Contact</a>
          <button 
            type="button" 
            onClick={navigateToBlog} 
            className="hover:text-[#d97706] text-black/85 font-bold transition-colors cursor-pointer uppercase tracking-wider flex items-center gap-1.5"
          >
            <span>Blog</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#d97706] animate-pulse" />
          </button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center"
        >
          <a
            href="#connect"
            onClick={(e) => scrollToSection(e, 'connect')}
            className="flex items-center gap-2 bg-[#d97706] hover:bg-black text-white px-5 py-2.5 rounded-full font-sans font-bold text-xs tracking-wider uppercase shadow-md shadow-[#d97706]/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
          >
            <span>Schedule a Call</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </a>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section 
        id="hero" 
        className="relative min-h-screen flex flex-col justify-between px-8 md:px-16 pt-32 pb-16 bg-[#ffffff] border-b border-black/5 overflow-hidden"
      >
        {/* Top Metadata Header — Clean Editorial Sans */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-between items-center text-xs font-sans font-medium tracking-wider text-black/50 uppercase border-b border-black/10 pb-4 relative z-10"
        >
          <div>SRE Engine</div>
          <div className="hidden sm:block">Deterministic Cloud Autonomy</div>
          <div className="text-black font-bold">Sub-Second Automated Triage</div>
        </motion.div>

        {/* Word 1: AMBER (Top Left) */}
        <div className="relative z-20 mt-6 select-none overflow-hidden">
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="text-[17vw] font-black tracking-[-0.07em] text-[#d97809] leading-[0.80] uppercase m-0 hover:tracking-[-0.065em] transition-all duration-300"
          >
            AMBER
          </motion.h1>
        </div>

        {/* Middle Context Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative z-20 grid grid-cols-1 md:grid-cols-12 gap-6 items-start my-12"
        >
          <div className="md:col-span-5 flex flex-col items-start gap-3.5">
            <div className="flex items-center gap-3">
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#d97809] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-[#d97809]"></span>
              </span>
              <span className="text-xs font-sans tracking-wider uppercase text-black/70 font-semibold">
                Deterministic Incident Convergence
              </span>
            </div>

            <div className="flex flex-col items-start gap-2.5 pt-1">
              <button
                type="button"
                onClick={navigateToCommunity}
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#d97809] hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider shadow-md shadow-[#d97809]/20 hover:shadow-lg hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
              >
                <span>Try Now</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="https://github.com/himanshu-xyz-1/Amber-Backend"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-white hover:bg-[#d97809] border-2 border-[#d97809] text-[#d97809] hover:text-white font-sans font-bold text-xs uppercase tracking-wider shadow-sm hover:shadow-md hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer group"
              >
                <Star className="w-3.5 h-3.5 fill-[#d97809] group-hover:fill-white text-[#d97809] group-hover:text-white transition-colors" />
                <span>Star us on GitHub</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-7 md:text-right space-y-2.5">
            <p className="text-black/80 text-base md:text-xl font-medium leading-relaxed max-w-xl md:ml-auto">
              When production catches fire, Amber brings the system <span className="text-[#d97809] font-bold">back to calm</span>.
            </p>
            <p className="text-black/65 text-sm md:text-lg font-normal leading-relaxed max-w-xl md:ml-auto">
              Autonomous incident detection, causal diagnosis, and <span className="text-[#d97809] font-bold">verified remediation</span>. Protect your engineering team from 3:00 AM alert burnout and stop revenue loss from preventable downtime.
            </p>
          </div>
        </motion.div>

        {/* Word 2: ENGINE (Bottom Right) */}
        <div className="relative z-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-10 overflow-hidden">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="grid grid-cols-2 gap-x-12 gap-y-3 text-xs font-sans font-medium text-black/60 uppercase"
          >
            <div className="flex items-center gap-2">
              <span className="text-[#d97809] font-bold">01</span>
              <span>500 alerts / sec throughput</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d97809] font-bold">02</span>
              <span>&lt;3s triage latency</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d97809] font-bold">03</span>
              <span>Static risk registry</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[#d97809] font-bold">04</span>
              <span>SHA-256 signed approval</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="text-[17vw] font-black tracking-[-0.07em] text-[#d97809] leading-[0.80] uppercase m-0 self-end select-none hover:tracking-[-0.065em] transition-all duration-300"
          >
            ENGINE
          </motion.h1>
        </div>
      </section>

      {/* Infinite Marquee in Pure Obsidian & Crisp White with Gold Accents */}
      <div className="py-6 bg-[#09090b] border-y border-white/10 overflow-hidden select-none">
        <div className="animate-marquee whitespace-nowrap text-2xl md:text-3xl font-extrabold uppercase tracking-tight flex items-center text-white">
          <span className="mx-6">Autonomous SRE Healing</span>
          <span className="text-[#facc15] mx-4">✦</span>
          <span className="mx-6">High-Throughput Redis Event Stream</span>
          <span className="text-[#facc15] mx-4">✱</span>
          <span className="mx-6">Deterministic Guardrails & Allowlist</span>
          <span className="text-[#facc15] mx-4">✦</span>
          <span className="mx-6">10-Minute Cryptographic TTL</span>
          <span className="text-[#facc15] mx-4">✱</span>
          <span className="mx-6">Provable Health Rollback</span>
          <span className="text-[#facc15] mx-4">✦</span>
          {/* Loop duplicate */}
          <span className="mx-6">Autonomous SRE Healing</span>
          <span className="text-[#facc15] mx-4">✦</span>
          <span className="mx-6">High-Throughput Redis Event Stream</span>
          <span className="text-[#facc15] mx-4">✱</span>
          <span className="mx-6">Deterministic Guardrails & Allowlist</span>
          <span className="text-[#facc15] mx-4">✦</span>
          <span className="mx-6">10-Minute Cryptographic TTL</span>
          <span className="text-[#facc15] mx-4">✱</span>
          <span className="mx-6">Provable Health Rollback</span>
          <span className="text-[#facc15] mx-4">✦</span>
        </div>
      </div>

      {/* How It Works — Incident Remediation Loop */}
      <HowItWorks />

      {/* Thesis Section */}
      <section id="thesis" className="px-8 md:px-16 py-32 bg-[#ffffff] border-b border-black/5">
        <div className="flex justify-between items-center text-xs font-sans font-medium tracking-wider text-black/50 uppercase border-b border-black/10 pb-4 mb-20">
          <div>Architecture Thesis</div>
          <div>Core Operating Principle</div>
          <div>Bounded Execution</div>
        </div>

        <div className="max-w-6xl">
          <motion.h2 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-6xl md:text-8xl font-black tracking-[-0.04em] leading-[1.0] text-[#0a0a0a]"
          >
            LLMs propose actions. <br />
            <span className="text-black font-black">Deterministic code and human operators decide.</span>
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mt-24 pt-16 border-t border-black/10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="text-xs font-sans text-black font-bold tracking-wider mb-3">01 Safety Architecture</div>
              <h4 className="text-xl font-bold mb-3 text-[#0a0a0a]">Zero Raw Terminal Access</h4>
              <p className="text-black/60 text-sm leading-relaxed">
                Amber strictly prohibits open-ended terminal executions. Every action is registered with static risk tiers in compile-time code.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-xs font-sans text-black font-bold tracking-wider mb-3">02 Cryptographic Proof</div>
              <h4 className="text-xl font-bold mb-3 text-[#0a0a0a]">SHA-256 Argument Binding</h4>
              <p className="text-black/60 text-sm leading-relaxed">
                Remediation arguments are cryptographically hashed into approval tokens with a strict 10-minute TTL to prevent payload tampering.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-xs font-sans text-black font-bold tracking-wider mb-3">03 Real-Time Verification</div>
              <h4 className="text-xl font-bold mb-3 text-[#0a0a0a]">Automated Health Probes</h4>
              <p className="text-black/60 text-sm leading-relaxed">
                After any mutating tool executes, automated health verification probes inspect target cluster metrics, triggering rollbacks on anomalies.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Interactive Live Telemetry Engine Section (Pure Obsidian & Radiant Gold) */}
      <section id="live-engine" className="px-8 md:px-16 py-28 bg-[#050505] text-white border-b border-white/10 relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto relative z-10">
          <RemediationVideoPlayer />
        </div>
      </section>

      {/* Platform & Capabilities Section */}
      <div id="pipeline" className="scroll-mt-24" />
      <PlatformCapabilities />

      {/* Deep Midnight Obsidian Section: Production Performance Benchmarks */}
      <section id="benchmarks" className="px-8 md:px-16 py-32 bg-[#050505] text-white border-b border-white/10 relative overflow-hidden">
        
        <div className="flex justify-between items-center text-xs font-sans font-semibold tracking-wider text-[#facc15] uppercase border-b border-white/10 pb-5 mb-16 relative z-10">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#facc15] animate-ping" />
            <span className="text-white">Production Performance Benchmarks</span>
          </div>
          <div className="hidden sm:block text-zinc-400 font-sans font-medium text-[11px]">Stress-Tested on Synthetic & Live Ingestion Streams</div>
          <div className="text-[#facc15] font-bold drop-shadow-[0_0_12px_rgba(250,204,21,0.6)]">Zero Dropped Webhooks</div>
        </div>

        {/* 4 Interactive Spotlight Cards with Clean High-Contrast Numbers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          
          {/* Card 1: 500+ Throughput */}
          <SpotlightCard className="bg-[#0b0b0b] border border-white/10 p-8 sm:p-10 flex flex-col justify-between h-[360px] shadow-2xl shadow-black/80">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-sans font-bold tracking-wider text-white uppercase">
                  Throughput Capacity
                </span>
                <span className="flex items-center gap-1.5 text-[10px] font-sans font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> LIVE
                </span>
              </div>

              <div className="text-6xl md:text-7xl font-black tracking-tight mb-4 flex items-baseline font-sans text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                <AnimatedCounter target={500} suffix="+" duration={1.8} liveJitter={true} jitterRange={18} />
              </div>

              {/* Animated Mini Waveform Bars in Crisp Gold */}
              <div className="flex items-end gap-1.5 h-5 mb-4">
                {[40, 75, 55, 90, 65, 85, 50, 95, 70, 80].map((h, i) => (
                  <motion.div
                    key={i}
                    animate={{ height: [`${h}%`, `${Math.max(20, (h + 35) % 100)}%`, `${h}%`] }}
                    transition={{ duration: 1.2 + (i % 3) * 0.4, repeat: Infinity, ease: 'easeInOut' }}
                    className="w-1.5 bg-gradient-to-t from-[#facc15] to-white rounded-full shadow-[0_0_8px_rgba(250,204,21,0.4)]"
                  />
                ))}
              </div>

              <div className="text-sm text-zinc-300 leading-relaxed font-normal font-sans">
                Benchmarked at 500+ alerts/sec under synthetic stress tests using Redis Streams without dropping webhooks.
              </div>
            </div>

            <div className="text-xs font-sans font-medium text-zinc-500 pt-4 border-t border-white/5 flex justify-between">
              <span>Redis Stream Buffer</span>
              <span className="text-[#facc15] font-bold">0.00% Loss</span>
            </div>
          </SpotlightCard>

          {/* Card 2: <3s Incident Triage */}
          <SpotlightCard className="bg-[#0b0b0b] border border-white/10 p-8 sm:p-10 flex flex-col justify-between h-[360px] shadow-2xl shadow-black/80">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-sans font-bold tracking-wider text-white uppercase">
                  Incident Triage
                </span>
                <span className="text-[10px] font-sans font-bold text-zinc-200 bg-white/10 border border-white/20 px-2 py-0.5 rounded-md">
                  LANGGRAPH
                </span>
              </div>

              <div className="text-6xl md:text-7xl font-black tracking-tight mb-4 font-sans text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                <AnimatedCounter target={2.8} prefix="<" suffix="s" decimals={1} duration={1.4} />
              </div>

              {/* Triage latency breakdown micro-bar */}
              <div className="w-full bg-white/10 rounded-full h-1.5 overflow-hidden flex mb-4">
                <div className="bg-white w-[20%]" title="Triage 80ms" />
                <div className="bg-[#facc15] w-[35%]" title="RAG 410ms" />
                <div className="bg-zinc-600 w-[45%]" title="Diagnostics 1.8s" />
              </div>

              <div className="text-sm text-zinc-300 leading-relaxed font-normal font-sans">
                Identifies failing microservices, error logs, and severity in under 3 seconds using fast local/cloud LLM inference and structured output.
              </div>
            </div>

            <div className="text-xs font-sans font-medium text-zinc-500 pt-4 border-t border-white/5 flex justify-between">
              <span>Deterministic Guardrails</span>
              <span className="text-[#facc15] font-bold">P0 - P4 Mesh</span>
            </div>
          </SpotlightCard>

          {/* Card 3: 0 Blocked Commands */}
          <SpotlightCard className="bg-[#0b0b0b] border border-white/10 p-8 sm:p-10 flex flex-col justify-between h-[360px] shadow-2xl shadow-black/80">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-sans font-bold tracking-wider text-white uppercase">
                  Blocked Commands
                </span>
                <span className="flex items-center gap-1 text-[10px] font-sans font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 rounded-md">
                  <ShieldCheck className="w-3 h-3 text-emerald-400" /> STRICT
                </span>
              </div>

              <div className="text-6xl md:text-7xl font-black tracking-tight mb-4 flex items-center gap-3 font-sans text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                <span>0</span>
                <span className="text-xs font-sans text-emerald-400 font-bold px-2.5 py-1 rounded bg-emerald-500/10 border border-emerald-500/30">
                  Allowlist Only
                </span>
              </div>

              <div className="text-sm text-zinc-300 leading-relaxed font-normal font-sans mt-7">
                Zero unvetted terminal or raw database commands. Every remediation tool is strictly allowlisted in static compile-time code.
              </div>
            </div>

            <div className="text-xs font-sans font-medium text-zinc-500 pt-4 border-t border-white/5 flex justify-between">
              <span>Static Registry</span>
              <span className="text-emerald-400 font-bold">Cryptographically Validated</span>
            </div>
          </SpotlightCard>

          {/* Card 4: 8.4s Recovery Time */}
          <SpotlightCard className="bg-[#0b0b0b] border border-white/10 p-8 sm:p-10 flex flex-col justify-between h-[360px] shadow-2xl shadow-black/80">
            <div>
              <div className="flex items-center justify-between mb-5">
                <span className="text-xs font-sans font-bold tracking-wider text-white uppercase">
                  Recovery Time
                </span>
                <span className="text-[10px] font-sans font-bold text-blue-300 bg-blue-500/15 border border-blue-500/30 px-2 py-0.5 rounded-md">
                  AUTO-ROLLBACK
                </span>
              </div>

              <div className="text-6xl md:text-7xl font-black tracking-tight mb-4 font-sans text-white drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                <AnimatedCounter target={8.4} suffix="s" decimals={1} duration={1.6} />
              </div>

              {/* Sparkline Recovery Curve */}
              <div className="mb-4">
                <svg className="w-full h-4 overflow-visible" viewBox="0 0 100 20">
                  <path
                    d="M 0 5 Q 30 18 50 16 T 70 4 T 100 2"
                    fill="none"
                    stroke="#facc15"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    className="drop-shadow-[0_0_8px_rgba(250,204,21,0.8)]"
                  />
                </svg>
              </div>

              <div className="text-sm text-zinc-300 leading-relaxed font-normal font-sans">
                Average benchmarked time in automated test suites from alert ingestion to triage, simulated human approval, and verified rollback.
              </div>
            </div>

            <div className="text-xs font-sans font-medium text-zinc-500 pt-4 border-t border-white/5 flex justify-between">
              <span>Health Verified</span>
              <span className="text-[#facc15] font-bold">&lt; 10s Target Recovery</span>
            </div>
          </SpotlightCard>

        </div>
      </section>

      {/* Executive Reliability Engine & Incident Audits Section */}
      <ExecutiveAuditShowcase />

      {/* PRICING Section — Light Warm Amber Canvas & Editorial Typography */}
      <section 
        id="pricing" 
        className="relative bg-[#FAF8F5] text-[#0c0a09] px-8 md:px-16 py-32 overflow-hidden border-t border-stone-200/80 scroll-mt-20"
      >
        {/* Subtle Warm Amber Dot Grid & Soft Ambient Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(217,119,6,0.10)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-[#fef3c7]/60 via-[#fde68a]/30 to-transparent blur-[120px] pointer-events-none" />

        {/* Top Eyebrow & Editorial Header */}
        <div className="relative z-10 max-w-4xl mx-auto text-center mb-16 sm:mb-20">
          <h2 className="text-4xl sm:text-6xl font-black tracking-tight text-[#0c0a09] leading-[1.05] mb-6">
            Predictable Economics for <br className="hidden sm:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d97706] via-[#b45309] to-[#92400e]">Mission-Critical Autonomy.</span>
          </h2>
          <p className="text-stone-600 text-base sm:text-lg max-w-2xl mx-auto font-normal leading-relaxed">
            Zero per-seat taxes. Zero unpredictable LLM token billing. Choose the governance and automation depth that fits your team's operational readiness.
          </p>

          {/* Dual Stacked Controls: Audience Segment (Top) + Billing Cycle (Bottom) */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3.5">
            {/* Top Control: Audience Segment */}
            <div className="inline-flex items-center p-1 rounded-xl bg-stone-200/90 border border-stone-300/90 backdrop-blur-xl shadow-inner">
              <button
                type="button"
                onClick={() => setPricingAudience('companies')}
                className={`px-5 py-2 rounded-lg text-xs font-sans font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  pricingAudience === 'companies'
                    ? 'bg-[#1c1917] text-white shadow-md'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                For Companies
              </button>
              <button
                type="button"
                onClick={() => setPricingAudience('agencies')}
                className={`px-5 py-2 rounded-lg text-xs font-sans font-bold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  pricingAudience === 'agencies'
                    ? 'bg-[#d97706] text-white shadow-md shadow-[#d97706]/30'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>For Agencies &amp; MSPs</span>
                <span className={`text-[9px] font-sans font-bold uppercase px-1.5 py-0.5 rounded ${
                  pricingAudience === 'agencies' ? 'bg-black/20 text-white' : 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                }`}>
                  White-Label
                </span>
              </button>
            </div>

            {/* Bottom Control: Monthly vs Annual Billing Toggle */}
            <div className="inline-flex items-center p-1 rounded-xl bg-stone-200/70 border border-stone-300/80 backdrop-blur-xl shadow-inner">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`px-5 py-2 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-stone-900 shadow-md font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                Monthly Billing
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`px-5 py-2 rounded-lg text-xs font-sans font-semibold tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-[#d97706] text-white shadow-md shadow-[#d97706]/30 font-bold'
                    : 'text-stone-600 hover:text-stone-900'
                }`}
              >
                <span>Annual Commitment</span>
                <span className={`text-[9px] font-sans font-bold uppercase px-1.5 py-0.5 rounded ${
                  billingCycle === 'annual'
                    ? 'bg-black/20 text-white'
                    : 'bg-[#fef3c7] text-[#92400e] border border-[#fde68a]'
                }`}>
                  Save ~18%
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Pricing Cards: Companies vs Agencies & MSPs */}
        {pricingAudience === 'companies' ? (
          <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          
          {/* Card 1: Community (Free Forever) */}
          <div className="bg-[#ffffff] border border-stone-200 hover:border-emerald-500/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1.5 shadow-[0_20px_40px_-15px_rgba(16,185,129,0.08)]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-sans font-bold uppercase tracking-wider text-emerald-700">
                  Incident Intelligence
                </span>
                <span className="text-[10px] font-sans px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                  FREE FOREVER
                </span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0c0a09] mb-1 font-sans tracking-tight">
                Community
              </h3>
              <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-4 font-normal min-h-[36px]">
                For individual engineers &amp; single clusters wanting automated on-call triage and deterministic root-cause analysis with zero data egress.
              </p>

              {/* Price Display */}
              <div className="pt-3 pb-3 border-y border-stone-200/80 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0c0a09] tracking-tight">
                    $0
                  </span>
                  <span className="text-stone-500 text-[11px] font-sans font-semibold uppercase tracking-wider">
                    / month
                  </span>
                </div>
                <div className="text-[11px] font-sans text-emerald-700 mt-0.5 font-bold">
                  Free forever • 100% self-hosted compute ($0 cloud bill)
                </div>
              </div>

              {/* Clean Capacity Highlight */}
              <div className="py-2.5 px-3.5 rounded-xl bg-stone-100/90 border border-stone-200/90 text-xs font-sans text-stone-700 flex items-center justify-between mb-5">
                <span className="font-bold text-stone-900">Up to 3 Nodes</span>
                <span className="text-stone-300">•</span>
                <span className="font-bold text-stone-900">5 Microservices</span>
                <span className="text-stone-300">•</span>
                <span className="text-emerald-700 font-bold">Sovereign Auto-Healing</span>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-700 font-sans">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>3 Nodes &amp; 5 Services:</strong> Ingest up to 1,000 alerts/mo</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Alert Storm Deduplication:</strong> 500 alerts grouped into 1 incident in &lt; 80ms</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Deterministic Root Cause:</strong> Exact file path, line number &amp; diagnostic proof</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>1-Click Guardrail Approvals:</strong> 10 verified HITL auto-actions/mo with HMAC-SHA256 tokens</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Sentinel 24/7 Daemon:</strong> Zero-webhook in-VPC Kubernetes &amp; Docker health probes</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Self-Hosted via Ollama:</strong> 100% local compute, zero telemetry leaves VPC</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>50+ Day-1 Production Playbooks:</strong> Built-in for Postgres, Kubernetes, Redis, Ingress</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span><strong>Telegram &amp; Slack Alert Routing:</strong> Automated incident markdown post-mortems</span>
                </li>
                <li className="flex items-start gap-2 text-stone-500">
                  <span className="w-3.5 h-3.5 flex items-center justify-center font-bold text-xs text-stone-400 shrink-0 mt-0.5">🔒</span>
                  <span className="text-[11px]"><strong>Executive Risk Audits &amp; Disaster Simulator:</strong> Reserved for Autonomous &amp; Response tiers</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-200/80">
              <button
                type="button"
                onClick={navigateToCommunity}
                className="w-full py-3 px-4 rounded-xl bg-stone-900 hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-stone-900/10 hover:shadow-lg group/btn"
              >
                <span>Use Community Tier for Free Forever</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400 group-hover/btn:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>

          {/* Card 2: Autonomous (Most Popular) */}
          <div className="bg-[#ffffff] border-2 border-[#d97706] ring-4 ring-[#d97706]/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative shadow-[0_25px_50px_-12px_rgba(217,119,6,0.22)] scale-[1.01] hover:-translate-y-1.5">
            {/* Top Popular Floating Badge */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-md bg-[#d97706] text-white font-sans font-bold text-[9px] uppercase tracking-widest shadow-md shadow-[#d97706]/30 flex items-center gap-1.5">
              <Sparkles className="w-3 h-3 fill-white" />
              MOST POPULAR
            </div>

            <div>
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#d97706] mb-2 flex items-center gap-2">
                <span>Autonomous Remediation</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0c0a09] mb-1 font-sans tracking-tight">
                Autonomous
              </h3>
              <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-4 font-normal min-h-[36px]">
                For fast-growing engineering teams needing automated 3:00 AM on-call triage, verified low-risk auto-remediations, and instant rollbacks.
              </p>

              {/* Price Display */}
              <div className="pt-3 pb-3 border-y border-stone-200/80 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0c0a09] tracking-tight">
                    {billingCycle === 'annual' ? '$2,299' : '$2,499'}
                  </span>
                  <span className="text-stone-500 text-[11px] font-sans font-semibold uppercase tracking-wider">
                    / month
                  </span>
                </div>
                <div className="text-[11px] font-sans text-[#b45309] mt-0.5 font-bold">
                  {billingCycle === 'annual' ? '$27,588 billed annually (Save $2,400)' : 'Billed monthly, cancel anytime'}
                </div>
              </div>

              {/* Clean Capacity Highlight */}
              <div className="py-2.5 px-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans text-amber-950 flex items-center justify-between mb-5">
                <span className="font-bold text-stone-900">Up to 100 Nodes</span>
                <span className="text-amber-500/40">•</span>
                <span className="font-bold text-stone-900">35 Services</span>
                <span className="text-amber-500/40">•</span>
                <span className="text-[#b45309] font-bold">100 Auto-Actions / mo</span>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-800 font-sans">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Everything in Community</strong> with unlimited alert ingestion</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>100 Verified Autonomous Remediations / mo</strong> (pod restart, connection drain, cache flush)</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>1-Click Human-in-the-Loop Approvals</strong> via interactive Slack &amp; Telegram cards</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Cryptographic Safety Guardrails:</strong> SHA-256 HMAC payload binding &amp; 10m TTL window</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Automated Post-Fix Health Probes:</strong> 12 automated checks &amp; instant rollback</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>5 Custom Microservice Runbooks</strong> authored &amp; tuned by Amber for your stack</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Slack &amp; Telegram Multi-Channel Pairing:</strong> Zero app switching required</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-200/80">
              <button
                type="button"
                onClick={() => handleSelectPlan('Autonomous')}
                className="w-full py-3 px-5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans font-black text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>Deploy Autonomous</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card 3: Response */}
          <div className="bg-[#ffffff] border border-stone-200 hover:border-[#d97706]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1.5 shadow-[0_20px_40px_-15px_rgba(217,119,6,0.08)]">
            <div>
              <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500 mb-2">
                Enterprise Incident Escalation
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-[#0c0a09] mb-1 font-sans tracking-tight">
                Response
              </h3>
              <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-4 font-normal min-h-[36px]">
                High-volume autonomous remediation backed by a dedicated Principal SRE joining your live incident war room.
              </p>

              {/* Price Display */}
              <div className="pt-3 pb-3 border-y border-stone-200/80 mb-4">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl sm:text-4xl font-black text-[#0c0a09] tracking-tight">
                    {billingCycle === 'annual' ? '$4,299' : '$4,499'}
                  </span>
                  <span className="text-stone-500 text-[11px] font-sans font-semibold uppercase tracking-wider">
                    / month
                  </span>
                </div>
                <div className="text-[11px] font-sans text-stone-500 mt-0.5">
                  {billingCycle === 'annual' ? '$51,588 billed annually (Save $2,400)' : 'Billed monthly, cancel anytime'}
                </div>
              </div>

              {/* Clean Capacity Highlight */}
              <div className="py-2.5 px-3.5 rounded-xl bg-stone-100/90 border border-stone-200/90 text-xs font-sans text-stone-700 flex items-center justify-between mb-5">
                <span className="font-bold text-stone-900">Up to 500 Nodes</span>
                <span className="text-stone-300">•</span>
                <span className="font-bold text-stone-900">Enterprise Scale</span>
                <span className="text-stone-300">•</span>
                <span className="text-stone-900 font-bold">Priority SRE Escalation</span>
              </div>

              {/* Features List */}
              <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-700 font-sans">
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Everything in Autonomous tier</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Priority Incident Bridge Escalation:</strong> Dedicated forward-deployed SRE support &amp; priority bridge during critical P0 outages</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>500 High-Volume Automated Remediations</strong> included monthly</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Air-Gapped Local LLM Runtime Option:</strong> Zero external API egress</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>White-Glove Custom Runbook Engineering:</strong> Staging dry-runs calibrated with your team</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Dedicated Private Slack Connect &amp; Emergency Escalation Channel</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                  <span><strong>Single-Tenant VPC Deployment:</strong> Strict SOC 2 &amp; HIPAA data sovereignty</span>
                </li>
              </ul>
            </div>

            <div className="pt-5 mt-5 border-t border-stone-200/80">
              <button
                type="button"
                onClick={() => handleSelectPlan('Response')}
                className="w-full py-3 px-5 rounded-xl bg-[#1c1917] hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-stone-900/10 hover:shadow-lg"
              >
                <span>Deploy Response</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
        ) : (
          /* Agencies & MSPs Grid */
          <div className="relative z-10 max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 items-stretch">
            
            {/* Card 1: Agency Partner (Option A - Main Requested Plan) */}
            {/* Card 1: Agency Partner (Option A - Main Requested Plan) */}
            <div className="bg-[#ffffff] border-2 border-[#d97706] ring-4 ring-[#d97706]/15 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative shadow-[0_25px_50px_-12px_rgba(217,119,6,0.22)] scale-[1.01] hover:-translate-y-1.5">
              {/* Top Floating Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-md bg-[#d97706] text-white font-sans font-bold text-[9px] uppercase tracking-widest shadow-md shadow-[#d97706]/30 flex items-center gap-1.5">
                <Sparkles className="w-3 h-3 fill-white" />
                MOST POPULAR
              </div>

              <div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-[#d97706] mb-2 flex items-center gap-2">
                  <span>White-Label MSP • 10 Workspaces</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0c0a09] mb-1 font-sans tracking-tight">
                  Agency Partner
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-4 font-normal min-h-[36px]">
                  Deliver automated 24/7 AI-SRE under your agency brand &amp; custom domain. Eliminate overnight on-call shifts across your client portfolio.
                </p>

                {/* Price Display */}
                <div className="pt-3 pb-3 border-y border-stone-200/80 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#0c0a09] tracking-tight">
                      {billingCycle === 'annual' ? '$4,999' : '$5,999'}
                    </span>
                    <span className="text-stone-500 text-[11px] font-sans font-semibold uppercase tracking-wider">
                      / month
                    </span>
                  </div>
                  <div className="text-[11px] font-sans text-[#b45309] mt-0.5 font-bold">
                    {billingCycle === 'annual' ? '$59,988 billed annually (Save $12,000)' : 'Billed monthly, cancel anytime'}
                  </div>
                </div>

                {/* Clean Capacity Highlight */}
                <div className="py-2.5 px-3.5 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs font-sans text-amber-950 flex items-center justify-between mb-5">
                  <span className="font-bold text-stone-900">10 Client Workspaces</span>
                  <span className="text-amber-500/40">•</span>
                  <span className="font-bold text-stone-900">500 Nodes</span>
                  <span className="text-amber-500/40">•</span>
                  <span className="text-[#b45309] font-bold">100% White-Label</span>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-800 font-sans">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>10 Isolated Client Workspaces:</strong> Zero cross-client alert mixing or data leakage</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Custom CNAME &amp; White-Labeling:</strong> Your domain (<code>ops.youragency.com</code>) &amp; logo</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Branded Bot Tokens:</strong> Custom Slack App &amp; Telegram Bot (<code>@YourAgencyOpsBot</code>)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>500 Automated Remediations / mo</strong> across all client clusters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Sub-License Key Generator:</strong> Provision client license keys from your master portal</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Priority SRE War Room Bridge:</strong> Direct incident escalation with Amber Principal SRE</span>
                  </li>
                </ul>

                {/* Agency Profit Margin Highlight Callout */}
                <div className="mt-4 p-3 rounded-xl bg-[#f5f5f4] border border-[#e7e5e4] text-stone-700 text-xs leading-relaxed font-sans">
                  <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Agency Margin Economics:</span>
                  </div>
                  Charge 10 clients $2,000/mo ($20,000 total). Pay Amber $5,999/mo. Keep <strong className="text-emerald-700 font-bold">$14,000+ monthly net margin</strong> with zero night shifts.
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-200/80">
                <button
                  type="button"
                  onClick={() => handleSelectPlan('Agency MSP Partner')}
                  className="w-full py-3 px-5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans font-black text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span>Deploy Agency Partner</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Card 2: Agency Scale (Unlimited Enterprise) */}
            <div className="bg-[#ffffff] border border-stone-200 hover:border-[#d97706]/40 rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative group hover:-translate-y-1.5 shadow-[0_20px_40px_-15px_rgba(217,119,6,0.08)]">
              {/* Top Floating Badge */}
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-md bg-[#1c1917] text-white font-sans font-bold text-[9px] uppercase tracking-widest shadow-md flex items-center gap-1.5 border border-stone-700">
                <ShieldCheck className="w-3 h-3 text-[#d97706]" />
                ENTERPRISE DEDICATED
              </div>

              <div>
                <div className="text-[11px] font-sans font-bold uppercase tracking-wider text-stone-500 mb-2">
                  White-Label Enterprise • 25+ Workspaces
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-[#0c0a09] mb-1 font-sans tracking-tight">
                  Agency Scale
                </h3>
                <p className="text-stone-600 text-xs sm:text-[13px] leading-relaxed mb-4 font-normal min-h-[36px]">
                  For global MSPs and high-volume DevOps consultancies managing 25+ client environments with custom compliance.
                </p>

                {/* Price Display */}
                <div className="pt-3 pb-3 border-y border-stone-200/80 mb-4">
                  <div className="flex items-baseline gap-2">
                    <span className="text-3xl sm:text-4xl font-black text-[#0c0a09] tracking-tight">
                      {billingCycle === 'annual' ? '$8,499' : '$9,999'}
                    </span>
                    <span className="text-stone-500 text-[11px] font-sans font-semibold uppercase tracking-wider">
                      / month
                    </span>
                  </div>
                  <div className="text-[11px] font-sans text-stone-500 mt-0.5">
                    {billingCycle === 'annual' ? '$101,988 billed annually (Save $18,000)' : 'Billed monthly, cancel anytime'}
                  </div>
                </div>

                {/* Clean Capacity Highlight */}
                <div className="py-2.5 px-3.5 rounded-xl bg-stone-100/90 border border-stone-200/90 text-xs font-sans text-stone-700 flex items-center justify-between mb-5">
                  <span className="font-bold text-stone-900">25 Client Workspaces</span>
                  <span className="text-stone-300">•</span>
                  <span className="font-bold text-stone-900">2,000 Nodes</span>
                  <span className="text-stone-300">•</span>
                  <span className="text-stone-900 font-bold">Air-Gapped VPC</span>
                </div>

                {/* Features List */}
                <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-700 font-sans">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Everything in Agency Partner tier</strong> (White-Label, Custom CNAME &amp; Portal)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Air-Gapped Private LLM Runtime:</strong> Deployed in your VPC (Zero external telemetry)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Unlimited Verified Automated Remediations</strong> across all client clusters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Custom Runbook Engineering:</strong> Amber SRE team authors bespoke client runbooks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>Enterprise Multi-Tenant SSO &amp; RBAC:</strong> SAML/Okta with per-client engineer permissions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-[#d97706] shrink-0 mt-0.5" />
                    <span><strong>White-Labeled PDF Uptime Reports:</strong> Monthly reliability &amp; MTTR summaries for clients</span>
                  </li>
                </ul>

                {/* Agency Scale Profit Margin Highlight Callout */}
                <div className="mt-4 p-3 rounded-xl bg-[#f5f5f4] border border-[#e7e5e4] text-stone-700 text-xs leading-relaxed font-sans">
                  <div className="font-bold text-stone-900 mb-0.5 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Enterprise MSP Margin Economics:</span>
                  </div>
                  Managing 25 clients at $2,000/mo = $50,000/mo billings. Amber cost: $9,999/mo. Keep <strong className="text-emerald-700 font-bold">$40,000+ monthly net margin</strong> ($480k ARR margin).
                </div>
              </div>

              <div className="pt-5 mt-5 border-t border-stone-200/80">
                <button
                  type="button"
                  onClick={() => handleSelectPlan('Agency Scale')}
                  className="w-full py-3 px-5 rounded-xl bg-[#1c1917] hover:bg-black text-white font-sans font-bold text-xs uppercase tracking-wider transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-stone-900/10 hover:shadow-lg"
                >
                  <span>Deploy Agency Scale</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

          </div>
        )}

        {/* Dedicated Enterprise Custom Plan Banner */}
        <div className="relative z-10 max-w-7xl mx-auto mt-8">
          <div className="bg-white border border-stone-200 hover:border-amber-400/60 rounded-3xl p-6 sm:p-8 shadow-sm transition-all duration-300 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-2 max-w-2xl">
              <h4 className="text-xl sm:text-2xl font-black text-[#0c0a09] tracking-tight">
                Need a Custom Infrastructure Scope?
              </h4>
              <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
                From seed-stage startups (4+ nodes) to hyperscale fleets. Model transparent pricing for your exact Kubernetes worker nodes, engineering team scale, and auto-remediation quotas on our dedicated calculator.
              </p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">Zero per-seat taxes</span>
                <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">Zero LLM token overages</span>
                <span className="text-[11px] font-sans font-semibold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-200">100% In-VPC Single-Tenant</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-2 w-full lg:w-auto shrink-0">
              <button
                type="button"
                onClick={navigateToCalculator}
                className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-stone-900 hover:bg-black text-white text-xs sm:text-sm font-sans font-bold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer group"
              >
                <span>Open Custom Calculator</span>
                <ArrowRight className="w-4 h-4 text-amber-400 group-hover:translate-x-1 transition-transform" />
              </button>
              <span className="text-[11px] text-stone-400 text-center lg:text-right">
                Instant server-calculated dynamic quote
              </span>
            </div>
          </div>
        </div>

        {/* Enterprise Safety & Policy Confidence Row */}
        <div className="relative z-10 max-w-7xl mx-auto mt-16 pt-12 border-t border-stone-200/80 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
          <div className="flex gap-4 items-start bg-white/70 border border-stone-200/80 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0 text-[#d97706]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0c0a09] mb-1 font-sans">Deterministic Safe Execution</div>
              <div className="text-xs text-stone-600 leading-relaxed font-normal">
                Compiled code allowlist. If confidence score is below 85%, Amber halts immediately without state mutation.
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-white/70 border border-stone-200/80 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0 text-[#d97706]">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0c0a09] mb-1 font-sans">Enterprise Privacy: Zero Training on Telemetry</div>
              <div className="text-xs text-stone-600 leading-relaxed font-normal">
                Customer telemetry, stack traces, and runbooks never leave your perimeter and never train public AI models.
              </div>
            </div>
          </div>

          <div className="flex gap-4 items-start bg-white/70 border border-stone-200/80 rounded-2xl p-6 shadow-sm">
            <div className="w-10 h-10 rounded-2xl bg-[#fef3c7] border border-[#fde68a] flex items-center justify-center shrink-0 text-[#d97706]">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-[#0c0a09] mb-1 font-sans">CTO Emergency Kill-Switch</div>
              <div className="text-xs text-stone-600 leading-relaxed font-normal">
                One-click API trigger instantly downgrades all worker nodes to read-only observation mode in &le; 250 ms.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <FaqSection onNavigateToContact={() => smoothScrollTo('connect')} />

      {/* CONNECT Section — Pure Luxury Obsidian Black & Crisp White */}
      <section 
        id="connect" 
        className="relative min-h-screen bg-[#050505] text-white px-8 md:px-16 py-32 flex flex-col justify-between overflow-hidden border-t border-white/10"
      >
        <div id="contact" className="absolute -top-24 pointer-events-none" />
        {/* Clean Subtle White Star Grid Background */}
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px] pointer-events-none" />

        {/* Top Header — Clean Editorial */}
        <div className="flex justify-between items-center text-xs font-sans font-medium tracking-wider text-zinc-400 uppercase border-b border-white/10 pb-6 mb-20 relative z-10">
          <div className="flex items-center gap-2.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white font-semibold">Direct Intake</span>
          </div>
          <div className="hidden sm:block text-zinc-400 font-sans text-xs">Replies within 24 hours</div>
        </div>

        {/* Main 2-Column Split */}
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start my-auto">
          
          {/* Left Column: Clean Massive Heading + Calm Content */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-[-0.05em] uppercase leading-[0.90] mb-8 select-none text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.2)]"
              >
                CONNECT
              </motion.h2>

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="space-y-4 mb-16"
              >
                <p className="text-white text-2xl sm:text-3xl font-medium tracking-tight">
                  Tell us what you're building. <br />
                  <span className="text-zinc-400 font-normal">We'll figure out the infrastructure.</span>
                </p>
                <p className="text-zinc-400 text-base leading-relaxed max-w-lg font-sans">
                  Deploy Amber into your AWS, GCP, or bare-metal Kubernetes clusters. Request single-tenant VPC blueprints, custom telemetry adapters, or private evaluation access.
                </p>
              </motion.div>
            </div>

            {/* Clean Contact Metadata Rows */}
            <div className="w-full max-w-md space-y-6 pt-8 border-t border-white/10 font-sans">
              
              {/* Phone */}
              <div 
                onClick={() => copyToClipboard('+919625404565', 'phone')}
                className="group flex justify-between items-baseline cursor-pointer"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Phone
                  </div>
                  <div className="text-lg text-zinc-100 group-hover:text-white font-medium transition-colors">
                    +91 96254 04565
                  </div>
                </div>
                <div className="text-xs text-zinc-500 group-hover:text-white flex items-center gap-1.5 transition-colors">
                  {copiedField === 'phone' ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <>Copy <Copy className="w-3.5 h-3.5" /></>
                  )}
                </div>
              </div>

              {/* Email */}
              <div 
                onClick={() => copyToClipboard('team@ambersre.xyz', 'email')}
                className="group flex justify-between items-baseline cursor-pointer pt-6 border-t border-white/10"
              >
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                    Direct Email
                  </div>
                  <div className="text-lg text-zinc-100 group-hover:text-white font-medium transition-colors flex items-center gap-2">
                    team@ambersre.xyz <ArrowUpRight className="w-4 h-4 text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </div>
                </div>
                <div className="text-xs text-zinc-500 group-hover:text-white flex items-center gap-1.5 transition-colors">
                  {copiedField === 'email' ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Copied
                    </span>
                  ) : (
                    <>Copy <Copy className="w-3.5 h-3.5" /></>
                  )}
                </div>
              </div>

              {/* Availability */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-1">
                  Availability
                </div>
                <div className="text-lg text-zinc-100 font-medium">
                  24/7 · On-Call Standby
                </div>
              </div>

              {/* Social Channels */}
              <div className="pt-6 border-t border-white/10">
                <div className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2">
                  Channels
                </div>
                <div className="flex items-center gap-5 text-sm text-zinc-300">
                  <a 
                    href="https://github.com/himanshu-xyz-1/Amber-Backend" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                  <span className="text-zinc-600">·</span>
                  <a 
                    href="https://twitter.com/himanshu1xy" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white transition-colors"
                  >
                    Twitter
                  </a>
                  <span className="text-zinc-600">·</span>
                  <a 
                    href="https://github.com/himanshu-xyz-1/Amber-Backend" 
                    target="_blank" 
                    rel="noreferrer" 
                    className="hover:text-white transition-colors"
                  >
                    API Docs
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Clean Enterprise Form */}
          <div className="lg:col-span-7 flex justify-start lg:justify-end w-full">
            <div className="w-full max-w-xl bg-[#0b0b0b] border border-white/15 rounded-3xl p-8 sm:p-12 shadow-2xl relative backdrop-blur-2xl ring-1 ring-white/10">
              
              {formSubmitted ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="py-6 text-center font-sans"
                >
                  <div className="w-14 h-14 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/5">
                    <CheckCircle2 className="w-7 h-7" />
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">
                    Message received.
                  </h3>

                  <p className="text-zinc-300 text-sm leading-relaxed max-w-md mx-auto mb-6">
                    Thanks for reaching out{formData.name ? `, ${formData.name}` : ''}. We've received your note and will review your setup {formData.email ? <>for <span className="text-white font-semibold">{formData.email}</span></> : 'promptly'}.
                  </p>

                  {/* Summary of what happens next — honest & clear */}
                  <div className="bg-[#050505] border border-white/10 rounded-2xl p-5 mb-6 text-left text-xs text-zinc-300 space-y-2.5">
                    <div className="text-[11px] font-semibold text-zinc-400 uppercase tracking-wider">
                      What happens next
                    </div>
                    <p className="text-zinc-300 leading-relaxed">
                      We'll review your {selectedInfra} environment details ({selectedPlan} tier) and write back directly within 24 hours to schedule a 15-minute walkthrough.
                    </p>
                    {formData.phone && (
                      <p className="text-zinc-400 text-[11px]">
                        Phone noted: <span className="text-zinc-200">{formData.phone}</span>
                      </p>
                    )}
                  </div>

                  {/* Direct Contact Option if Urgent */}
                  <div className="text-xs text-zinc-400 mb-6 border-t border-white/10 pt-4">
                    Need immediate incident assistance?
                    <a 
                      href="https://wa.me/919625404565" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-white font-medium underline underline-offset-4 hover:text-[#facc15] ml-1.5 transition-colors"
                    >
                    </a>
                  </div>

                  <button
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', clusterScale: '', message: '' });
                    }}
                    className="border border-white/15 text-zinc-400 hover:text-white hover:border-white px-5 py-2 rounded-full text-xs transition-all cursor-pointer"
                  >
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2 font-sans tracking-tight">
                    Tell us about your infrastructure
                  </h3>
                  <p className="text-zinc-400 text-sm mb-6 font-sans">
                    Share your stack and incident bottlenecks. We'll review your setup and get back to you directly.
                  </p>

                  <form onSubmit={handleFormSubmit} className="space-y-4 font-sans">
                    
                    {/* Field 1: Name */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="Jane Smith"
                        className="w-full bg-[#060606] border border-white/10 focus:border-white focus:ring-2 focus:ring-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-sm outline-none transition-all"
                      />
                    </div>

                    {/* Field 2 & 3: Work Email and Contact Number */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                          Work Email
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jane@company.com"
                          className="w-full bg-[#060606] border border-white/10 focus:border-white focus:ring-2 focus:ring-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-sm outline-none transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                          Contact Number
                        </label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="+1 (555) 000-0000"
                          className="w-full bg-[#060606] border border-white/10 focus:border-white focus:ring-2 focus:ring-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Field: Selected Architectural Tier */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300">
                          Selected Tier
                        </label>
                        <span className="text-[11px] font-sans font-semibold text-[#facc15]">
                          {billingCycle === 'annual' ? 'Annual Plan (Save ~18%)' : 'Monthly Plan'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                        {['Autonomous', 'Response', 'Agency Partner', 'Community Edition'].map((plan) => {
                          const isSelected = selectedPlan === plan || (plan === 'Agency Partner' && selectedPlan.includes('Agency'));
                          return (
                            <button
                              type="button"
                              key={plan}
                              onClick={() => setSelectedPlan(plan)}
                              className={`py-2.5 px-2 rounded-xl text-xs font-semibold border text-center transition-all cursor-pointer ${
                                isSelected
                                  ? 'bg-[#facc15] text-black font-bold border-[#facc15] shadow-[0_0_20px_rgba(250,204,21,0.3)]'
                                  : 'bg-[#060606] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                              }`}
                            >
                              {plan}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Field 3: Infrastructure Selector & Scale */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                          Infrastructure
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          {['AWS', 'GCP', 'Bare Metal', 'Multi-Cloud'].map((infra) => {
                            const isSelected = selectedInfra === infra;
                            return (
                              <button
                                type="button"
                                key={infra}
                                onClick={() => setSelectedInfra(infra)}
                                className={`py-2.5 px-3 rounded-xl text-xs font-medium border text-center transition-all cursor-pointer ${
                                  isSelected
                                    ? 'bg-white text-black font-bold border-white shadow-[0_0_20px_rgba(255,255,255,0.3)]'
                                    : 'bg-[#060606] text-zinc-400 border-white/10 hover:border-white/20 hover:text-white'
                                }`}
                              >
                                {infra}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                          Cluster Scale
                        </label>
                        <input
                          type="text"
                          value={formData.clusterScale}
                          onChange={(e) => setFormData({ ...formData, clusterScale: e.target.value })}
                          placeholder="e.g. 500+ nodes"
                          className="w-full bg-[#060606] border border-white/10 focus:border-white focus:ring-2 focus:ring-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl px-4 py-3.5 text-white placeholder-zinc-500 text-sm outline-none transition-all"
                        />
                      </div>
                    </div>

                    {/* Field 4: What are you trying to solve? */}
                    <div>
                      <label className="block text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-2">
                        What are you trying to solve?
                      </label>
                      <textarea
                        rows={3}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about your production alert storms, runbooks, or SLA requirements..."
                        className="w-full bg-[#060606] border border-white/10 focus:border-white focus:ring-2 focus:ring-white/20 focus:shadow-[0_0_20px_rgba(255,255,255,0.15)] rounded-xl px-4 py-3 text-white placeholder-zinc-500 text-sm outline-none transition-all resize-none"
                      />
                    </div>

                    {/* Error Feedback with Direct Fallback Options */}
                    {formError && (
                      <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-200 text-xs leading-relaxed space-y-2">
                        <div className="font-semibold text-white">{formError}</div>
                        <div className="flex flex-wrap gap-4 pt-1">
                          <a 
                            href="mailto:team@ambersre.xyz" 
                            className="text-[#facc15] font-bold underline hover:text-white"
                          >
                            Email Directly →
                          </a>
                          <a 
                            href="https://wa.me/919625404565" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-emerald-400 font-bold underline hover:text-white"
                          >
                          </a>
                        </div>
                      </div>
                    )}

                    {/* Submit Button in Clean Crisp Gold */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 rounded-full bg-[#facc15] hover:bg-white text-black font-bold text-sm tracking-wide shadow-[0_0_30px_rgba(250,204,21,0.4)] hover:shadow-[0_0_40px_rgba(255,255,255,0.8)] hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 flex items-center justify-center gap-2 group cursor-pointer disabled:opacity-75 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2 font-medium">
                          <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                          <span>Dispatching...</span>
                        </span>
                      ) : (
                        <>
                          <span>Send Request</span>
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                        </>
                      )}
                    </button>
                  </form>
                </div>
              )}
            </div>
          </div>

        </div>

        {/* Bottom Signature & System Status Bar */}
        <div className="relative z-10 pt-16 mt-20 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-xs font-sans text-zinc-500 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>© 2026 Amber Technologies Inc. · All rights reserved.</span>
            <span className="hidden sm:inline text-zinc-600">·</span>
            <button 
              type="button" 
              onClick={() => openLegal('copyright')} 
              className="text-zinc-400 hover:text-white underline cursor-pointer"
            >
              Copyright & IP Notices
            </button>
          </div>
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-zinc-300 font-medium">Remote — Built for SRE teams worldwide</span>
          </div>
        </div>

      </section>

      {/* Footer */}
      <footer className="px-8 md:px-16 pt-24 pb-12 bg-[#ffffff] text-[#0a0a0a]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-black/10">
          
          {/* Column 1: Brand & Autonomous Purpose */}
          <div className="md:col-span-4">
            <div 
              className="flex items-center gap-2.5 mb-4 cursor-pointer" 
              onClick={(e) => scrollToSection(e as any, 'hero')}
            >
              <img src="/assets/amber-symbol.svg" alt="Amber" className="w-6 h-8 object-contain" />
              <span className="font-black text-black tracking-tight text-xl">AMBER</span>
            </div>
            <p className="text-black font-bold text-base leading-snug">
              Autonomous Incident Remediation for production engineering teams.
            </p>
            <p className="text-black/50 text-xs mt-3 leading-relaxed font-sans">
              Freezes incident chaos into deterministic cryptographic proof. Self-hosted VPC agents and cloud gateways for modern Kubernetes and cloud infrastructure.
            </p>
          </div>

          {/* Column 2: Platform Capabilities */}
          <div className="md:col-span-3">
            <div className="text-xs font-sans text-black font-bold uppercase tracking-wider mb-4">
              Platform
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-black/70">
              <li>
                <a href="#platform" onClick={(e) => scrollToSection(e, 'platform')} className="hover:text-[#d97706] transition">
                  Incident Triage
                </a>
              </li>
              <li>
                <a href="#platform" onClick={(e) => scrollToSection(e, 'platform')} className="hover:text-[#d97706] transition">
                  AI Investigation
                </a>
              </li>
              <li>
                <a href="#platform" onClick={(e) => scrollToSection(e, 'platform')} className="hover:text-[#d97706] transition">
                  Runbook Automation
                </a>
              </li>
              <li>
                <a href="#platform" onClick={(e) => scrollToSection(e, 'platform')} className="hover:text-[#d97706] transition">
                  Verified Remediation
                </a>
              </li>
              <li>
                <a href="#platform" onClick={(e) => scrollToSection(e, 'platform')} className="hover:text-[#d97706] transition">
                  Action Control
                </a>
              </li>
              <li>
                <a href="#platform" onClick={(e) => scrollToSection(e, 'platform')} className="hover:text-[#d97706] transition">
                  Recovery Verification
                </a>
              </li>
              <li>
                <a href="#platform" onClick={(e) => scrollToSection(e, 'platform')} className="hover:text-[#d97706] transition">
                  Postmortems & Intelligence
                </a>
              </li>
              <li>
                <a href="#executive-audits" onClick={(e) => scrollToSection(e, 'executive-audits')} className="hover:text-[#d97706] transition">
                  Executive Audits & Digests
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Security & Governance */}
          <div className="md:col-span-3">
            <div className="text-xs font-sans text-black font-bold uppercase tracking-wider mb-4">
              Security & Legal
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-black/70">
              <li>
                <button type="button" onClick={() => openLegal('privacy')} className="hover:text-[#d97706] transition cursor-pointer text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLegal('terms')} className="hover:text-[#d97706] transition cursor-pointer text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLegal('security')} className="hover:text-[#d97706] transition cursor-pointer text-left">
                  Security Architecture
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLegal('dpa')} className="hover:text-[#d97706] transition cursor-pointer text-left">
                  Data Processing Agreement (DPA)
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLegal('subprocessors')} className="hover:text-[#d97706] transition cursor-pointer text-left">
                  Subprocessor Directory
                </button>
              </li>
              <li>
                <button type="button" onClick={() => openLegal('copyright')} className="hover:text-[#d97706] transition cursor-pointer text-left">
                  Copyright & IP Notice
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Resources & Links */}
          <div className="md:col-span-2">
            <div className="text-xs font-sans text-black font-bold uppercase tracking-wider mb-4">
              Resources
            </div>
            <ul className="space-y-2.5 text-xs font-sans text-black/70">
              <li>
                <button type="button" onClick={navigateToCommunity} className="hover:text-[#d97706] transition cursor-pointer text-left flex items-center gap-1.5 font-semibold text-black">
                  <span>Community Edition</span>
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-sans font-bold leading-none">FREE</span>
                </button>
              </li>
              <li>
                <button type="button" onClick={navigateToBlog} className="hover:text-[#d97706] transition cursor-pointer text-left">
                  Technical Blog
                </button>
              </li>
              <li>
                <a href="#pricing" onClick={(e) => scrollToSection(e, 'pricing')} className="hover:text-[#d97706] transition">
                  Pricing & Tiers
                </a>
              </li>
              <li>
                <button type="button" onClick={navigateToCalculator} className="hover:text-[#d97706] transition cursor-pointer text-left">
                  Quote Calculator
                </button>
              </li>
              <li>
                <a href="https://github.com/himanshu-xyz-1/Amber-Backend" target="_blank" rel="noreferrer" className="hover:text-[#d97706] transition">
                  GitHub Repository
                </a>
              </li>
              <li>
                <a href="https://twitter.com/himanshu1xy" target="_blank" rel="noreferrer" className="hover:text-[#d97706] transition">
                  Engineering Twitter
                </a>
              </li>
              <li>
                <a href="#connect" onClick={(e) => scrollToSection(e, 'connect')} className="hover:text-[#d97706] transition">
                  Contact & Support
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Legal Copyright Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-stone-500 font-medium">
          <div>
            © 2026 Amber SRE. All rights reserved.
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <button type="button" onClick={() => openLegal('privacy')} className="hover:text-black transition cursor-pointer">Privacy Policy</button>
            <span>·</span>
            <button type="button" onClick={() => openLegal('terms')} className="hover:text-black transition cursor-pointer">Terms of Service</button>
            <span>·</span>
            <button type="button" onClick={() => openLegal('security')} className="hover:text-black transition cursor-pointer">Security</button>
            <span>·</span>
            <button type="button" onClick={() => openLegal('dpa')} className="hover:text-black transition cursor-pointer">DPA</button>
            <span>·</span>
            <button type="button" onClick={() => openLegal('subprocessors')} className="hover:text-black transition cursor-pointer">Subprocessors</button>
            <span>·</span>
            <button type="button" onClick={() => openLegal('copyright')} className="hover:text-black transition cursor-pointer">Copyright</button>
          </div>
        </div>

        {/* Massive Amber Stamp Watermark */}
        <div className="overflow-hidden select-none pt-12 flex justify-center">
          <div className="text-[19vw] font-black tracking-[0.06em] leading-none text-black/5 hover:text-black/10 transition-colors uppercase -mb-6 select-none pointer-events-none">
            AMBER
          </div>
        </div>
      </footer>

        </div>
      )}
    </>
  );
}
