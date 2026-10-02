import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  Activity, 
  Lock, 
  RotateCcw,
  Paperclip,
  Smile,
  Mic,
  MoreVertical,
  ChevronLeft,
  Search,
  Wifi,
  Battery,
  Sparkles
} from 'lucide-react';

// Official Brand SVGs
const SlackLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52zM6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z" fill="#E01E5A"/>
    <path d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834zM8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z" fill="#36C5F0"/>
    <path d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834zM17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z" fill="#2EB67D"/>
    <path d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52zM15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z" fill="#ECB22E"/>
  </svg>
);

const WhatsAppLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91C2.13 13.66 2.59 15.36 3.45 16.86L2.05 22L7.3 20.62C8.75 21.41 10.38 21.83 12.04 21.83C17.5 21.83 21.95 17.38 21.95 11.92C21.95 9.27 20.92 6.78 19.05 4.91C17.18 3.03 14.69 2 12.04 2Z" fill="#25D366"/>
    <path d="M17.51 14.38C17.21 14.23 15.75 13.51 15.48 13.41C15.21 13.31 15.01 13.26 14.81 13.56C14.61 13.86 14.04 14.53 13.87 14.73C13.7 14.93 13.52 14.95 13.23 14.8C12.93 14.65 11.97 14.34 10.84 13.33C9.96 12.54 9.36 11.57 9.19 11.27C9.02 10.97 9.17 10.81 9.32 10.66C9.45 10.53 9.62 10.32 9.77 10.14C9.92 9.97 9.97 9.84 10.07 9.64C10.17 9.45 10.12 9.27 10.04 9.12C9.97 8.97 9.37 7.51 9.13 6.91C8.88 6.33 8.64 6.41 8.46 6.4C8.29 6.39 8.09 6.39 7.89 6.39C7.69 6.39 7.37 6.46 7.1 6.76C6.83 7.06 6.06 7.78 6.06 9.24C6.06 10.7 7.13 12.11 7.27 12.31C7.42 12.51 9.37 15.51 12.35 16.8C13.06 17.11 13.61 17.29 14.04 17.43C14.75 17.65 15.4 17.62 15.91 17.55C16.48 17.46 17.67 16.83 17.92 16.13C18.17 15.44 18.17 14.84 18.09 14.72C18.02 14.6 17.81 14.53 17.51 14.38Z" fill="white"/>
  </svg>
);

const TelegramLogo: React.FC<{ className?: string }> = ({ className = "w-4 h-4 shrink-0" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="12" fill="#2AABEE"/>
    <path d="M17.89 7.22L15.92 16.5C15.77 17.16 15.38 17.32 14.83 17.01L11.83 14.8L10.38 16.19C10.22 16.35 10.09 16.48 9.78 16.48L9.99 13.43L15.55 8.41C15.79 8.2 15.5 8.08 15.18 8.29L8.31 12.62L5.35 11.69C4.71 11.49 4.69 11.05 5.48 10.74L17.05 6.28C17.59 6.08 18.06 6.41 17.89 7.22Z" fill="white"/>
  </svg>
);

type ActiveViewMode = 'dual' | 'slack' | 'telegram' | 'whatsapp';

export const RemediationVideoPlayer: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ActiveViewMode>('dual');
  const [isResolved, setIsResolved] = useState<boolean>(true);
  const [isRemediating, setIsRemediating] = useState<boolean>(false);

  const handleApprove = () => {
    setIsRemediating(true);
    setTimeout(() => {
      setIsRemediating(false);
      setIsResolved(true);
    }, 1100);
  };

  const handleReplay = () => {
    setIsResolved(false);
  };

  return (
    <div className="w-full text-left">
      {/* ── Section Header Row: Title & Modern Device Selector Tabs ── */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6 mb-12 border-b border-white/10 pb-8">
        <div>
          <div className="text-xs font-sans tracking-wider text-[#facc15] uppercase font-bold mb-2.5 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Autonomous Remediation Demo</span>
          </div>
          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black tracking-tight text-white font-sans">
            Experience Amber In Action.
          </h2>
          <p className="text-stone-400 text-sm sm:text-base mt-2 max-w-2xl font-sans">
            Deterministic, Human-In-The-Loop incident remediation across your team&apos;s desktop Slack and mobile Telegram channels.
          </p>
        </div>

        {/* Tab Switcher: Dual Studio View | PC Slack | Mobile Telegram | Mobile WhatsApp */}
        <div className="inline-flex items-center p-1.5 rounded-full bg-stone-900/90 border border-stone-800 shadow-2xl backdrop-blur-xl">
          <button
            type="button"
            onClick={() => setActiveTab('dual')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'dual'
                ? 'bg-amber-400 text-black font-bold shadow-md shadow-amber-400/20 scale-[1.02]'
                : 'text-stone-400 hover:text-white hover:bg-white/5 font-semibold'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Studio</span> Dual View
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('slack')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'slack'
                ? 'bg-white text-black font-bold shadow-md shadow-white/20 scale-[1.02]'
                : 'text-stone-400 hover:text-white hover:bg-white/5 font-semibold'
            }`}
          >
            <SlackLogo className="w-3.5 h-3.5" />
            <span>Slack (PC)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('telegram')}
            className={`px-4 sm:px-5 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer ${
              activeTab === 'telegram'
                ? 'bg-white text-black font-bold shadow-md shadow-white/20 scale-[1.02]'
                : 'text-stone-400 hover:text-white hover:bg-white/5 font-semibold'
            }`}
          >
            <TelegramLogo className="w-3.5 h-3.5" />
            <span>Telegram (Phone)</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('whatsapp')}
            className={`px-3 sm:px-4 py-2 rounded-full text-xs font-sans tracking-wider uppercase transition-all duration-200 hidden md:flex items-center gap-2 cursor-pointer ${
              activeTab === 'whatsapp'
                ? 'bg-white text-black font-bold shadow-md shadow-white/20 scale-[1.02]'
                : 'text-stone-400 hover:text-white hover:bg-white/5 font-semibold'
            }`}
          >
            <WhatsAppLogo className="w-3.5 h-3.5" />
            <span>WhatsApp</span>
          </button>
        </div>
      </div>

      {/* ── Main Showcase Container ── */}
      <div className="w-full relative select-none">
        
        {/* Ambient Glows */}
        <div className="absolute -top-10 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-1/2 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-[100px] pointer-events-none" />

        {/* Dynamic Multi-Device Layout */}
        <div className="flex flex-col lg:flex-row items-center justify-center gap-8 xl:gap-12 relative z-10">
          
          {/* ════════════════════════════════════════════════════════════
              1. THE PC MONITOR (Slack Desktop Workplace)
             ════════════════════════════════════════════════════════════ */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'dual' || activeTab === 'slack') && (
              <motion.div
                key="pc-monitor"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                className={`flex-1 w-full flex flex-col items-center ${
                  activeTab === 'slack' ? 'max-w-5xl' : 'max-w-3xl xl:max-w-4xl'
                }`}
              >
                {/* Outer Monitor Frame / Bezel */}
                <div className="w-full bg-[#18181b] border-2 border-stone-700/80 rounded-[24px] p-2.5 sm:p-3.5 shadow-[0_30px_90px_-15px_rgba(0,0,0,0.95),0_0_50px_rgba(217,119,6,0.12)] relative">
                  
                  {/* Top Monitor Bezel Webcam Lens Dot */}
                  <div className="absolute top-1.5 left-1/2 -translate-x-1/2 flex items-center gap-1.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-stone-900 border border-stone-700" />
                    <div className="w-1 h-1 rounded-full bg-emerald-500/60" />
                  </div>

                  {/* Inner Monitor Display Surface */}
                  <div className="w-full bg-[#1a1d21] rounded-[16px] overflow-hidden border border-white/10 flex flex-col">
                    
                    {/* macOS / Slack App Titlebar */}
                    <div className="bg-[#121517] px-4 py-2.5 flex items-center justify-between border-b border-white/5 select-none">
                      {/* Window Controls */}
                      <div className="flex items-center gap-2">
                        <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block shadow-sm" />
                        <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block shadow-sm" />
                        <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block shadow-sm" />
                      </div>

                      {/* Slack Channel Indicator Bar */}
                      <div className="flex items-center gap-2 bg-[#1f2328] px-3.5 py-1 rounded-md text-[11px] text-stone-300 font-sans border border-white/5 shadow-inner">
                        <SlackLogo className="w-3 h-3" />
                        <span className="font-bold text-white">#all-himanshu</span>
                        <span className="text-stone-500">•</span>
                        <span className="text-stone-400">Amber SRE Gateway</span>
                      </div>

                      {/* Right Workspace Icons */}
                      <div className="flex items-center gap-2 text-stone-500 text-xs">
                        <div className="hidden sm:inline-flex items-center gap-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded text-[10px] font-bold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                          <span>Connected</span>
                        </div>
                      </div>
                    </div>

                    {/* Slack Main Canvas: Real Uploaded Screenshot with Interactive Overlay */}
                    <div className="relative w-full bg-white overflow-hidden group">
                      <img 
                        src="/assets/slack-alert.png" 
                        alt="Amber SRE Slack Alert in #all-himanshu" 
                        className="w-full h-auto object-cover block select-none pointer-events-none"
                      />

                      {/* Interactive Clickable Hotspot directly overlaying the "1-Click Approve (Web)" button */}
                      <div 
                        className="absolute bottom-[20%] left-[4.8%] sm:bottom-[20.5%] sm:left-[4.8%] z-20 cursor-pointer"
                        title="Click to trigger autonomous 1-click remediation"
                        onClick={handleApprove}
                      >
                        {!isResolved ? (
                          <div className="relative group/hotspot">
                            <span className="absolute -inset-1 rounded bg-amber-400 animate-ping opacity-60 pointer-events-none" />
                            <button
                              type="button"
                              className="relative px-3 sm:px-4 py-1.5 sm:py-2 rounded bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-[11px] sm:text-xs shadow-lg transition-transform active:scale-95 flex items-center gap-1.5 cursor-pointer"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                              <span>1-Click Approve (Web)</span>
                            </button>
                          </div>
                        ) : null}
                      </div>

                      {/* Live Remediated Confirmation Banner when Resolved */}
                      <AnimatePresence>
                        {isResolved && (
                          <motion.div
                            initial={{ opacity: 0, y: 25 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 25 }}
                            transition={{ duration: 0.35, ease: "easeOut" }}
                            className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-6 bg-stone-950/95 backdrop-blur-md border border-emerald-500/40 rounded-xl p-3.5 sm:p-4 text-white shadow-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-3 z-30"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center shrink-0">
                                <Check className="w-4 h-4 font-bold" />
                              </div>
                              <div>
                                <div className="text-xs font-bold text-emerald-400 font-sans flex items-center gap-1.5">
                                  <span>AUTONOMOUS EXECUTION VERIFIED</span>
                                  <span className="text-stone-500">•</span>
                                  <span className="text-white font-mono">2.4s MTTR</span>
                                </div>
                                <div className="text-xs text-stone-300 font-sans mt-0.5">
                                  Terminated 4 idle connections on <code className="text-amber-300 font-mono">payment-db-prod</code>. Cluster restored.
                                </div>
                              </div>
                            </div>

                            <button
                              type="button"
                              onClick={handleReplay}
                              className="self-end sm:self-auto px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-stone-200 text-xs font-sans font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
                            >
                              <RotateCcw className="w-3 h-3" />
                              <span>Replay Alert</span>
                            </button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Bottom Status Ticker Bar */}
                    <div className="bg-[#121517] px-4 py-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-stone-400">
                      <div className="flex items-center gap-2">
                        <Lock className="w-3 h-3 text-amber-400" />
                        <span className="text-stone-300">SHA-256 HMAC:</span>
                        <span className="text-amber-300">abcdef1234567890...</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-stone-500">TTL: 10m Guardrail</span>
                        <span className="text-stone-500">•</span>
                        <span className="text-emerald-400 font-bold">100% In-VPC</span>
                      </div>
                    </div>

                  </div>
                </div>

                {/* PC Monitor Realistic Metallic Stand Neck & Base */}
                <div className="flex flex-col items-center pointer-events-none select-none">
                  {/* Stand Neck */}
                  <div className="w-20 sm:w-24 h-8 sm:h-10 bg-gradient-to-b from-[#2a2a2e] to-[#1a1a1c] border-x border-stone-600/40 shadow-inner" />
                  {/* Stand Oval Base */}
                  <div className="w-56 sm:w-72 h-3 sm:h-3.5 bg-gradient-to-r from-stone-800 via-stone-700 to-stone-800 rounded-full shadow-[0_20px_35px_rgba(0,0,0,0.9)] border-t border-stone-500/40" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>


          {/* ════════════════════════════════════════════════════════════
              2. THE SMARTPHONE (Telegram / WhatsApp Mobile Workplace)
             ════════════════════════════════════════════════════════════ */}
          <AnimatePresence mode="popLayout">
            {(activeTab === 'dual' || activeTab === 'telegram' || activeTab === 'whatsapp') && (
              <motion.div
                key="smartphone-container"
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: -20 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1], delay: activeTab === 'dual' ? 0.1 : 0 }}
                className={`w-full flex justify-center ${
                  activeTab === 'dual' ? 'lg:w-[360px] xl:w-[380px] shrink-0' : 'max-w-sm'
                }`}
              >
                {/* Smartphone Realistic Titanium Frame */}
                <div className="w-[320px] sm:w-[340px] bg-[#1a1a1c] rounded-[50px] p-3 border-[6px] border-[#2d2d30] shadow-[0_30px_90px_rgba(0,0,0,0.95),0_0_50px_rgba(42,171,238,0.18)] relative select-none">
                  
                  {/* Volume Buttons (Left Edge) */}
                  <div className="absolute -left-[9px] top-28 w-[3px] h-8 bg-stone-700 rounded-l-sm" />
                  <div className="absolute -left-[9px] top-40 w-[3px] h-10 bg-stone-700 rounded-l-sm" />
                  
                  {/* Power Button (Right Edge) */}
                  <div className="absolute -right-[9px] top-32 w-[3px] h-12 bg-stone-700 rounded-r-sm" />

                  {/* Inner OLED Glass Screen */}
                  <div className="w-full h-[580px] rounded-[42px] overflow-hidden bg-[#0e1621] relative flex flex-col border border-white/5 shadow-inner">
                    
                    {/* iPhone Dynamic Island */}
                    <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-28 h-6 bg-black rounded-full z-40 flex items-center justify-between px-2.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-stone-900 border border-stone-800" />
                      <div className="w-2 h-2 rounded-full bg-amber-500/80 animate-pulse" />
                    </div>

                    {/* iOS Top Status Bar */}
                    <div className="pt-3 px-6 pb-2 flex justify-between items-center text-[10px] text-white/80 font-sans z-30 select-none">
                      <span className="font-semibold">9:41</span>
                      <div className="flex items-center gap-1.5">
                        <Wifi className="w-3 h-3" />
                        <Battery className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* ── Conditional App Header: Telegram or WhatsApp ── */}
                    {activeTab === 'whatsapp' ? (
                      // WhatsApp Green Header
                      <div className="bg-[#1f2c34] px-4 py-2.5 flex items-center justify-between border-b border-black/40 z-20 shadow-md">
                        <div className="flex items-center gap-2.5">
                          <ChevronLeft className="w-5 h-5 text-[#00a884]" />
                          <div className="w-8 h-8 rounded-full bg-[#00a884] text-white flex items-center justify-center font-bold text-xs shadow">
                            AM
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white font-sans">Amber SRE Alert</div>
                            <div className="text-[10px] text-[#00a884] font-sans">online • Verified Bot</div>
                          </div>
                        </div>
                        <MoreVertical className="w-4 h-4 text-stone-400" />
                      </div>
                    ) : (
                      // Telegram Dark Blue Header
                      <div className="bg-[#17212b] px-4 py-2.5 flex items-center justify-between border-b border-black/40 z-20 shadow-md">
                        <div className="flex items-center gap-2.5">
                          <ChevronLeft className="w-5 h-5 text-[#2AABEE]" />
                          <div className="w-8 h-8 rounded-full bg-[#2AABEE] text-white flex items-center justify-center font-bold text-xs shadow">
                            <Zap className="w-4 h-4 text-white fill-white" />
                          </div>
                          <div>
                            <div className="text-xs font-bold text-white font-sans flex items-center gap-1">
                              <span>Amber SRE Bot</span>
                              <span className="text-[9px] bg-sky-500/20 text-[#2AABEE] px-1 py-0.2 rounded font-mono font-bold">BOT</span>
                            </div>
                            <div className="text-[10px] text-[#2AABEE] font-sans">online</div>
                          </div>
                        </div>
                        <Search className="w-4 h-4 text-stone-400" />
                      </div>
                    )}

                    {/* Chat Stream Body */}
                    <div className="flex-1 p-3.5 overflow-y-auto space-y-3 font-sans text-xs">
                      
                      {/* Date Badge */}
                      <div className="text-center my-1">
                        <span className="px-2.5 py-0.5 rounded-full bg-black/40 text-stone-400 text-[10px] font-medium border border-white/5">
                          Today, 3:43 AM
                        </span>
                      </div>

                      {/* Telegram Message Bubble */}
                      <div className="bg-[#182533] text-white p-3.5 rounded-2xl rounded-tl-sm border border-white/5 shadow-lg space-y-2.5">
                        
                        {/* Alert Headline */}
                        <div>
                          <div className="text-amber-400 font-bold text-xs flex items-center gap-1.5">
                            <span>🚨 [P0 - CATASTROPHIC OUTAGE]</span>
                          </div>
                          <div className="text-white font-bold text-sm tracking-tight mt-0.5">
                            Postgres Pool Exhausted (98%)
                          </div>
                        </div>

                        {/* Metadata Rows */}
                        <div className="space-y-1 text-[11px] text-stone-300 font-mono bg-black/30 p-2.5 rounded-lg border border-white/5">
                          <div className="flex justify-between">
                            <span className="text-stone-400">Service:</span>
                            <span className="text-rose-400 font-bold">billing-db</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-400">Status:</span>
                            <span className="text-amber-400 font-bold">TRIGGERED</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-400">Incident:</span>
                            <span className="text-stone-200">inc-test-123</span>
                          </div>
                        </div>

                        {/* AI Root Cause */}
                        <div className="border-l-2 border-amber-400 pl-2 text-[11px] text-stone-200">
                          <strong className="text-white">🔍 AI Diagnosis:</strong> 10 hanging idle-in-transaction queries blocking Postgres pool.
                        </div>

                        {/* Proposed Action */}
                        <div className="text-[11px] text-stone-300 pt-1">
                          <div className="font-semibold text-white mb-0.5 flex items-center gap-1">
                            <Zap className="w-3 h-3 text-amber-400" />
                            <span>Proposed Mutating Action:</span>
                          </div>
                          <code className="text-amber-300 font-mono bg-black/40 px-1.5 py-0.5 rounded text-[10px] block">
                            kill_db_connections(pids=[101, 102])
                          </code>
                        </div>

                        {/* Inline Keyboard Action Buttons */}
                        <div className="pt-2 space-y-1.5">
                          <button
                            type="button"
                            onClick={handleApprove}
                            disabled={isRemediating}
                            className={`w-full py-2.5 px-3 rounded-xl font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-md ${
                              isResolved
                                ? 'bg-emerald-600 text-white'
                                : 'bg-[#2AABEE] hover:bg-[#229ed9] text-white active:scale-95'
                            }`}
                          >
                            {isRemediating ? (
                              <>
                                <Activity className="w-3.5 h-3.5 animate-spin" />
                                <span>Verifying...</span>
                              </>
                            ) : isResolved ? (
                              <>
                                <Check className="w-3.5 h-3.5" />
                                <span>Approved (2.4s MTTR)</span>
                              </>
                            ) : (
                              <>
                                <CheckCircle2 className="w-3.5 h-3.5" />
                                <span>1-Click Approve</span>
                              </>
                            )}
                          </button>

                          <div className="grid grid-cols-2 gap-1.5">
                            <button
                              type="button"
                              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-[10px] font-semibold border border-white/5"
                            >
                              🔍 View Proof
                            </button>
                            <button
                              type="button"
                              onClick={handleReplay}
                              className="py-1.5 px-2 rounded-lg bg-white/5 hover:bg-white/10 text-stone-300 text-[10px] font-semibold border border-white/5"
                            >
                              ✕ Reject / Reset
                            </button>
                          </div>
                        </div>

                        {/* Message Timestamp */}
                        <div className="text-right text-[9px] text-stone-400 pt-0.5">
                          3:43 AM · ✓✓
                        </div>
                      </div>

                      {/* Follow-up Bot Confirmation Message when Resolved */}
                      <AnimatePresence>
                        {isResolved && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="bg-[#182533] text-white p-3 rounded-2xl rounded-tl-sm border border-emerald-500/30 space-y-1 shadow-md"
                          >
                            <div className="text-emerald-400 font-bold text-[11px] flex items-center gap-1.5">
                              <Check className="w-3 h-3 text-emerald-400 font-bold" />
                              <span>Remediation Complete (2.4s MTTR)</span>
                            </div>
                            <p className="text-[10px] text-stone-300 leading-relaxed">
                              Terminated 4 idle connections. Database health probes verified: <strong className="text-white">12/12 PASSED</strong>. Headroom restored to 86%.
                            </p>
                            <div className="text-right text-[9px] text-stone-400">
                              3:43:02 AM · ✓✓
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>

                    </div>

                    {/* Telegram Bottom Chat Input Mockup */}
                    <div className="bg-[#17212b] p-2.5 border-t border-black/30 flex items-center gap-2">
                      <Paperclip className="w-4 h-4 text-stone-400" />
                      <div className="flex-1 bg-[#242f3d] rounded-full px-3 py-1.5 text-[11px] text-stone-400 flex items-center justify-between">
                        <span>Message...</span>
                        <Smile className="w-3.5 h-3.5 text-stone-400" />
                      </div>
                      <div className="w-7 h-7 rounded-full bg-[#2AABEE] text-white flex items-center justify-center shadow">
                        <Mic className="w-3.5 h-3.5" />
                      </div>
                    </div>

                    {/* iOS Home Indicator Bar */}
                    <div className="py-1 flex justify-center bg-[#17212b]">
                      <div className="w-28 h-1 bg-white/30 rounded-full" />
                    </div>

                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>

        {/* ════════════════════════════════════════════════════════════
            3. REAL-TIME TELEMETRY & AUDIT HUD (Below Devices)
           ════════════════════════════════════════════════════════════ */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 bg-stone-900/90 border border-stone-800 rounded-3xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl"
        >
          {/* Top Bar: Cluster Health Summary + 1-Click Test Flow Reset */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div className="flex items-center gap-3">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-sans font-bold text-white text-sm sm:text-base tracking-tight">
                Live Single-Tenant Telemetry Verification
              </span>
              <span className="text-stone-500 hidden sm:inline">|</span>
              <span className="text-xs font-mono text-stone-400 hidden sm:inline">
                AWS RDS Postgres 15 (us-east-1)
              </span>
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleReplay}
                className="px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-black font-sans font-bold text-xs tracking-wider uppercase transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-md hover:scale-105 active:scale-95"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay Incident Flow</span>
              </button>
            </div>
          </div>

          {/* 3 Real Telemetry Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6">
            
            {/* Metric 1 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Pool Utilization
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {isResolved ? 'Restored' : 'Saturated'}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-sans my-1 tracking-tight">
                {isResolved ? '98% → 14%' : '98% (Exhausted)'}
              </div>
              <p className="text-xs text-stone-400 leading-relaxed mt-1">
                {isResolved 
                  ? 'Terminated 4 idle queries. Active pool restored to normal operating headroom.'
                  : '482 alert signals correlated. 10 idle connections blocking pool capacity.'}
              </p>
            </div>

            {/* Metric 2 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  P99 HTTP Latency
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  {isResolved ? 'Verified' : 'Degraded'}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-sans my-1 tracking-tight">
                {isResolved ? '48ms' : '8,400ms Spike'}
              </div>
              <p className="text-xs text-stone-400 leading-relaxed mt-1">
                {isResolved 
                  ? 'Recovered from gateway timeout spikes. 12 health verification probes confirmed.'
                  : 'Upstream services experiencing gateway timeouts due to exhausted pool.'}
              </p>
            </div>

            {/* Metric 3 */}
            <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col justify-between">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                  Recovery Time (MTTR)
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/30">
                  {isResolved ? 'Sub-3s Verified' : 'Awaiting Approval'}
                </span>
              </div>
              <div className="text-3xl sm:text-4xl font-black text-white font-sans my-1 tracking-tight">
                {isResolved ? '2.4s MTTR' : '1-Click Pending'}
              </div>
              <p className="text-xs text-stone-400 leading-relaxed mt-1">
                {isResolved 
                  ? 'Zero dropped transactions. Rollback safeguards safely disarmed.'
                  : 'Action bound with SHA-256 HMAC payload hash and 10-minute TTL window.'}
              </p>
            </div>

          </div>

          {/* Bottom Channel Sync Proof Bar */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-sans text-stone-400">
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> Synced in real-time:
              </span>
              <span className="inline-flex items-center gap-1 text-stone-300"><SlackLogo className="w-3.5 h-3.5" /> #all-himanshu</span>
              <span className="text-stone-600">•</span>
              <span className="inline-flex items-center gap-1 text-stone-300"><TelegramLogo className="w-3.5 h-3.5" /> @AmberSREBot</span>
              <span className="text-stone-600">•</span>
              <span className="inline-flex items-center gap-1 text-stone-300"><WhatsAppLogo className="w-3.5 h-3.5" /> WhatsApp SRE</span>
            </div>

            <div className="flex items-center gap-2 font-mono text-[11px] text-stone-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Zero Data Exfiltration • In-VPC Cluster Sovereign</span>
            </div>
          </div>

        </motion.div>

      </div>
    </div>
  );
};
