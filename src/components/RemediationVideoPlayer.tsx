import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ShieldCheck, 
  AlertTriangle, 
  Zap, 
  Activity, 
  Check, 
  Clock, 
  Lock,
  Sparkles,
  Smartphone,
  CheckCheck
} from 'lucide-react';

// Official Brand SVGs
const SlackLogo = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
  </svg>
);

const WhatsAppLogo = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" fill="#25D366"/>
    <path d="M17.51 14.38C17.21 14.23 15.75 13.51 15.48 13.41C15.21 13.31 15.01 13.26 14.81 13.56C14.61 13.86 14.04 14.53 13.87 14.73C13.7 14.93 13.52 14.95 13.23 14.8C12.93 14.65 11.97 14.34 10.84 13.33C9.96 12.54 9.36 11.57 9.19 11.27C9.02 10.97 9.17 10.81 9.32 10.66C9.45 10.53 9.62 10.32 9.77 10.14C9.92 9.97 9.97 9.84 10.07 9.64C10.17 9.45 10.12 9.27 10.04 9.12C9.97 8.97 9.37 7.51 9.13 6.91C8.88 6.33 8.64 6.41 8.46 6.4C8.29 6.39 8.09 6.39 7.89 6.39C7.69 6.39 7.37 6.46 7.1 6.76C6.83 7.06 6.06 7.78 6.06 9.24C6.06 10.7 7.13 12.11 7.27 12.31C7.42 12.51 9.37 15.51 12.35 16.8C13.06 17.11 13.61 17.29 14.04 17.43C14.75 17.65 15.4 17.62 15.91 17.55C16.48 17.46 17.67 16.83 17.92 16.13C18.17 15.44 18.17 14.84 18.09 14.72C18.02 14.6 17.81 14.53 17.51 14.38Z" fill="white"/>
  </svg>
);

const TelegramLogo = () => (
  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#2AABEE"/>
    <path d="M17.89 7.22L15.92 16.5C15.77 17.16 15.38 17.32 14.83 17.01L11.83 14.8L10.38 16.19C10.22 16.35 10.09 16.48 9.78 16.48L9.99 13.43L15.55 8.41C15.79 8.2 15.5 8.08 15.18 8.29L8.31 12.62L5.35 11.69C4.71 11.49 4.69 11.05 5.48 10.74L17.05 6.28C17.59 6.08 18.06 6.41 17.89 7.22Z" fill="white"/>
  </svg>
);

type ChannelType = 'slack' | 'whatsapp' | 'telegram';

export const RemediationVideoPlayer: React.FC = () => {
  const [selectedChannel, setSelectedChannel] = useState<ChannelType>('slack');
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [clickedByHuman, setClickedByHuman] = useState<boolean>(false);
  const requestRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [buttonTarget, setButtonTarget] = useState<{ x: number; y: number }>({ x: 55, y: 78 });

  const TOTAL_DURATION = 8.5; // seconds per cycle

  // Channels list
  const CHANNELS: { id: ChannelType; name: string; handle: string; color: string; icon: React.FC }[] = [
    { id: 'slack', name: 'Slack', handle: '#sre-critical', color: 'hover:border-purple-400/40', icon: SlackLogo },
    { id: 'whatsapp', name: 'WhatsApp', handle: '+91 96254 04565', color: 'hover:border-emerald-400/40', icon: WhatsAppLogo },
    { id: 'telegram', name: 'Telegram', handle: '@AmberSREBot', color: 'hover:border-sky-400/40', icon: TelegramLogo },
  ];

  // Dynamic button target locator
  useEffect(() => {
    const updateTarget = () => {
      if (canvasRef.current && buttonRef.current) {
        const cRect = canvasRef.current.getBoundingClientRect();
        const bRect = buttonRef.current.getBoundingClientRect();
        if (cRect.width > 0 && cRect.height > 0) {
          const x = ((bRect.left + bRect.width * 0.5 - cRect.left) / cRect.width) * 100;
          const y = ((bRect.top + bRect.height * 0.45 - cRect.top) / cRect.height) * 100;
          setButtonTarget({ x, y });
        }
      }
    };
    updateTarget();
    const timer = setTimeout(updateTarget, 100);
    window.addEventListener('resize', updateTarget);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateTarget);
    };
  }, [currentTime, selectedChannel]);

  // High-framerate 60 FPS Animation Loop
  useEffect(() => {
    const animate = (time: number) => {
      if (lastTimeRef.current !== null) {
        const delta = (time - lastTimeRef.current) / 1000;
        setCurrentTime((prev) => {
          const next = prev + delta;
          if (next >= TOTAL_DURATION) {
            setClickedByHuman(false);
            // Optionally auto-cycle channels on loop completion
            setSelectedChannel((curr) => {
              if (curr === 'slack') return 'whatsapp';
              if (curr === 'whatsapp') return 'telegram';
              return 'slack';
            });
            return 0;
          }
          return next;
        });
      }
      lastTimeRef.current = time;
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);
    return () => {
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  // Stage thresholds
  const isResolving = currentTime >= 4.4 && currentTime < 5.0;
  const isResolved = currentTime >= 5.0 || (clickedByHuman && currentTime >= 4.4);

  // 60 FPS Smooth Cursor Coordinates
  const getCursorCoordinates = () => {
    const targetX = buttonTarget.x || 55;
    const targetY = buttonTarget.y || 78;

    if (currentTime < 1.2) {
      return { x: 82, y: 15, clicking: false, hovering: false, visible: false };
    }
    if (currentTime >= 1.2 && currentTime < 4.2) {
      const progress = (currentTime - 1.2) / 3.0;
      // Spring cubic ease-out
      const ease = 1 - Math.pow(1 - progress, 3);
      const startX = 82;
      const startY = 15;
      return {
        x: startX + (targetX - startX) * ease,
        y: startY + (targetY - startY) * ease,
        clicking: false,
        hovering: progress > 0.88,
        visible: true
      };
    }
    if (currentTime >= 4.2 && currentTime < 4.8) {
      return { x: targetX, y: targetY, clicking: true, hovering: true, visible: true };
    }
    // After click, gently fade
    return {
      x: targetX,
      y: targetY,
      clicking: false,
      hovering: false,
      visible: currentTime < 5.6
    };
  };

  const cursorState = getCursorCoordinates();

  const handleManualClick = () => {
    setClickedByHuman(true);
    setCurrentTime(4.4);
  };

  return (
    <div className="w-full bg-[#050505] border border-white/10 rounded-3xl overflow-hidden shadow-[0_20px_80px_-20px_rgba(0,0,0,0.9)] relative select-none">
      
      {/* ── Top Multi-Channel Hub Bar (Slack, WhatsApp, Telegram) ── */}
      <div className="px-6 py-4 bg-[#0a0a0a] border-b border-white/10 flex flex-wrap items-center justify-between gap-4">
        
        {/* Left: Window Dots & Omni-channel Label */}
        <div className="flex items-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
            <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
            <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
          </div>
          <span className="text-xs font-sans text-white font-semibold ml-2 flex items-center gap-2">
            <span>Omni-Channel Incident Mesh</span>
            <span className="text-zinc-600">·</span>
            <span className="text-zinc-400 font-normal hidden sm:inline">1-Click Approvals Anywhere</span>
          </span>
        </div>

        {/* Center/Right: Interactive Channel Switchers with Live Badges */}
        <div className="flex items-center gap-2 p-1 rounded-2xl bg-white/[0.04] border border-white/10">
          {CHANNELS.map((ch) => {
            const Icon = ch.icon;
            const isSelected = selectedChannel === ch.id;
            return (
              <button
                key={ch.id}
                type="button"
                onClick={() => {
                  setSelectedChannel(ch.id);
                  setCurrentTime(0);
                  setClickedByHuman(false);
                }}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-sans font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-white text-black shadow-lg shadow-white/10 font-bold scale-[1.02]'
                    : 'text-zinc-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon />
                <span>{ch.name}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-amber-500 animate-ping' : 'bg-zinc-600'}`} />
              </button>
            );
          })}
        </div>

        {/* Right: Live Sync Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-zinc-400">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>REAL-TIME DISPATCH</span>
        </div>
      </div>

      {/* ── Main Dynamic Stage Canvas (White Glass & Crisp Obsidian) ── */}
      <div 
        ref={canvasRef}
        className="relative min-h-[480px] p-6 sm:p-12 bg-gradient-to-b from-[#080808] via-[#050505] to-[#030303] overflow-hidden flex items-center justify-center"
      >
        {/* Subtle Platform-True Ambient Rim Light (Crisp White/Platform colors, Zero Brown) */}
        <div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[750px] h-[360px] blur-[150px] pointer-events-none rounded-full transition-all duration-700 ${
            isResolved 
              ? 'bg-emerald-500/15' 
              : selectedChannel === 'whatsapp'
              ? 'bg-emerald-500/12'
              : selectedChannel === 'telegram'
              ? 'bg-sky-500/12'
              : 'bg-purple-500/10'
          }`} 
        />

        {/* ── Channel Alert Card (Morphs based on Slack vs WhatsApp vs Telegram) ── */}
        <div className="relative z-20 w-full max-w-xl">
          <AnimatePresence mode="wait">
            {!isResolved ? (
              // ── Active Alert State ──
              <motion.div
                key={`alert-${selectedChannel}`}
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="bg-[#0e0e0e]/95 border border-white/15 rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95)] backdrop-blur-2xl text-left"
              >
                {/* 1. Header (Platform-specific branding) */}
                {selectedChannel === 'slack' && (
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/15 flex items-center justify-center">
                        <SlackLogo />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-sm text-white">Amber SRE Bot</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-white/10 text-white font-semibold">
                            SLACK APP
                          </span>
                          <span className="text-[11px] text-zinc-500 font-mono">#sre-critical · 2:14 AM</span>
                        </div>
                        <span className="text-xs text-zinc-400 font-sans">Automated Incident Triage Gate</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-rose-400 font-bold bg-rose-500/10 px-2.5 py-1 rounded-full border border-rose-500/20">
                      P0 CRITICAL
                    </span>
                  </div>
                )}

                {selectedChannel === 'whatsapp' && (
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center">
                        <WhatsAppLogo />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-sm text-white">Amber Incident Hotline</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-sans bg-[#25D366]/20 text-[#25D366] font-bold">
                            VERIFIED BIZ
                          </span>
                        </div>
                        <span className="text-xs text-zinc-400 font-sans">+91 96254 04565 · WhatsApp Dispatch</span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
                      <CheckCheck className="w-3.5 h-3.5 text-emerald-400" /> DELIVERED
                    </span>
                  </div>
                )}

                {selectedChannel === 'telegram' && (
                  <div className="flex items-center justify-between pb-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-2xl bg-[#2AABEE]/15 border border-[#2AABEE]/30 flex items-center justify-center">
                        <TelegramLogo />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-sm text-white">Amber Incident Bot</span>
                          <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-[#2AABEE]/20 text-[#2AABEE] font-bold">
                            BOT
                          </span>
                        </div>
                        <span className="text-xs text-zinc-400 font-sans">@AmberIncidentBot · Instant Notification</span>
                      </div>
                    </div>
                    <span className="text-[11px] font-mono text-sky-400 font-bold bg-sky-500/10 px-2.5 py-1 rounded-full border border-sky-500/20">
                      TELEGRAM PING
                    </span>
                  </div>
                )}

                {/* 2. Incident Summary & Root Cause */}
                <div className="mt-5 space-y-4">
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-white flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                      <span>Database Connection Pool Exhausted (98%)</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1.5 leading-relaxed">
                      Amber clustered <span className="text-white font-semibold">482 alert signals</span> and diagnosed root cause: <span className="text-amber-300 font-medium">4 idle-in-transaction queries</span> blocking <code className="text-white bg-white/10 px-1.5 py-0.5 rounded text-xs font-mono">payment-db-prod</code>.
                    </p>
                  </div>

                  {/* 3. Action Block */}
                  <div className="bg-[#050505] border border-white/10 rounded-2xl p-4 font-mono text-xs">
                    <div className="flex justify-between items-center text-zinc-400 text-[11px] mb-1.5">
                      <span className="flex items-center gap-1.5 text-white font-bold">
                        <Zap className="w-3.5 h-3.5 text-amber-400" /> PROPOSED SAFE ACTION
                      </span>
                      <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> TTL: 09:48
                      </span>
                    </div>

                    <code className="text-amber-300 font-semibold block text-xs sm:text-sm">
                      kill_db_connections(pids=[412, 415, 419, 428])
                    </code>

                    <div className="text-[10px] text-zinc-400 mt-2.5 flex items-center gap-2 pt-2 border-t border-white/10">
                      <Lock className="w-3 h-3 text-emerald-400" />
                      <span>SHA-256: 7f83b165...</span>
                      <span className="text-zinc-600">·</span>
                      <span className="text-white font-medium">Synced across Slack, WhatsApp & Telegram</span>
                    </div>
                  </div>

                  {/* 4. Interactive Action Buttons */}
                  <div className="pt-2 flex gap-3">
                    <button 
                      type="button"
                      disabled
                      className="px-5 py-3 rounded-2xl border border-white/10 text-zinc-500 text-xs font-sans font-semibold uppercase tracking-wider bg-white/5 opacity-50"
                    >
                      Reject
                    </button>

                    <button 
                      ref={buttonRef}
                      onClick={handleManualClick}
                      className={`flex-1 py-3.5 px-6 rounded-2xl font-sans font-bold text-xs sm:text-sm uppercase tracking-wider flex items-center justify-center gap-2.5 transition-all duration-200 cursor-pointer relative overflow-hidden ${
                        cursorState.hovering || clickedByHuman
                          ? 'bg-white text-black shadow-[0_0_40px_rgba(255,255,255,0.9)] scale-[1.02]'
                          : 'bg-[#facc15] hover:bg-white text-black shadow-[0_0_25px_rgba(250,204,21,0.5)]'
                      }`}
                    >
                      {cursorState.clicking && (
                        <span className="absolute inset-0 bg-white/70 animate-ping rounded-2xl pointer-events-none" />
                      )}

                      {isResolving ? (
                        <>
                          <Activity className="w-4 h-4 animate-spin text-black" />
                          <span>Remediating in VPC...</span>
                        </>
                      ) : (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-black fill-black/10" />
                          <span>
                            {selectedChannel === 'whatsapp' ? 'Tap to Approve (WhatsApp)' : selectedChannel === 'telegram' ? 'Approve via Telegram' : '1-Click Approve (Slack)'}
                          </span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ) : (
              // ── Phase 2: Omnichannel Resolved Card ──
              <motion.div
                key="resolved-card"
                initial={{ opacity: 0, scale: 0.94, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="bg-[#09130d] border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.95),0_0_60px_rgba(16,185,129,0.2)] backdrop-blur-2xl text-left"
              >
                {/* Header */}
                <div className="flex items-center justify-between pb-4 border-b border-emerald-500/20">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 font-black text-base shadow-md">
                      ✓
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-sans font-bold text-sm text-white">Amber Incident Engine</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-400/20 text-emerald-300 font-bold">
                          REMEDIATED
                        </span>
                      </div>
                      <span className="text-xs text-emerald-400 font-sans">Multi-Channel Health Check Verified</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-bold">
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span>MTTR: 2.4s</span>
                  </div>
                </div>

                {/* Body */}
                <div className="mt-5 space-y-4">
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-emerald-400" />
                      <span>INCIDENT AUTO-RESOLVED</span>
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-300 font-sans mt-1">
                      Engineer confirmed via {selectedChannel.toUpperCase()}. Amber terminated 4 idle connections and restored healthy traffic flow.
                    </p>
                  </div>

                  {/* 3 Metrics Cards */}
                  <div className="grid grid-cols-3 gap-3 pt-2">
                    <div className="bg-[#050a06] border border-emerald-500/20 rounded-2xl p-3.5">
                      <div className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider">Pool Utilization</div>
                      <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">98% ➔ 14%</div>
                      <div className="text-[10px] text-emerald-500/80 font-mono">Normal Capacity</div>
                    </div>

                    <div className="bg-[#050a06] border border-emerald-500/20 rounded-2xl p-3.5">
                      <div className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider">HTTP Latency</div>
                      <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">48ms</div>
                      <div className="text-[10px] text-emerald-500/80 font-mono">p99 Healthy</div>
                    </div>

                    <div className="bg-[#050a06] border border-emerald-500/20 rounded-2xl p-3.5">
                      <div className="text-[10px] font-sans text-zinc-400 uppercase tracking-wider">Data Loss</div>
                      <div className="text-lg font-black text-emerald-400 font-mono mt-0.5">0.00%</div>
                      <div className="text-[10px] text-emerald-500/80 font-mono">Rollback Disarmed</div>
                    </div>
                  </div>

                  {/* Synced Channels Status */}
                  <div className="flex flex-wrap items-center justify-between gap-2 px-4 py-3 rounded-2xl bg-white/[0.04] border border-white/10 text-xs font-sans">
                    <div className="flex items-center gap-2 text-zinc-300">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span>Synchronized confirmation sent across all channels:</span>
                    </div>

                    <div className="flex items-center gap-3 text-[11px] font-mono font-medium">
                      <span className="flex items-center gap-1 text-purple-300"><SlackLogo /> Slack ✓</span>
                      <span className="flex items-center gap-1 text-emerald-300"><WhatsAppLogo /> WhatsApp ✓</span>
                      <span className="flex items-center gap-1 text-sky-300"><TelegramLogo /> Telegram ✓</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── 60 FPS Virtual Smooth Cursor ── */}
        {!clickedByHuman && cursorState.visible && (
          <motion.div
            className="absolute pointer-events-none z-50 transition-transform duration-75"
            style={{
              left: `${cursorState.x}%`,
              top: `${cursorState.y}%`,
            }}
          >
            <div className={`relative transition-transform duration-100 ${cursorState.clicking ? 'scale-75' : 'scale-100'}`}>
              <svg 
                className="w-7 h-7 drop-shadow-[0_4px_14px_rgba(0,0,0,0.95)] fill-white stroke-black stroke-[1.5]" 
                viewBox="0 0 24 24"
              >
                <path d="M4.5 3l13 13-5.5 1-2.5 5-2.5-1 2.5-5-5-0.5z" />
              </svg>

              {cursorState.clicking && (
                <span className="absolute -top-2 -left-2 w-10 h-10 rounded-full border-2 border-white bg-white/40 animate-ping pointer-events-none" />
              )}
            </div>
          </motion.div>
        )}

      </div>

      {/* ── Subtitle Ribbon: Omni-Channel Dispatch Guarantee ── */}
      <div className="px-6 py-3 bg-[#0a0a0a] border-t border-white/10 flex flex-wrap items-center justify-between text-xs font-sans text-zinc-400 gap-3">
        <div className="flex items-center gap-2">
          <Smartphone className="w-4 h-4 text-amber-400" />
          <span>Approve incidents from any device: <strong className="text-white font-semibold">Slack, WhatsApp, Telegram, or Webhook API</strong></span>
        </div>

        <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>ZERO LAPTOP REQUIRED</span>
        </div>
      </div>

    </div>
  );
};
