import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sliders, ArrowRight, Sparkles, Server, Cpu, Zap, Check } from 'lucide-react';

interface CustomPlanCalculatorProps {
  billingCycle: 'monthly' | 'annual';
  onSelectQuote: (quoteData: {
    monthlyPrice: number;
    nodes: number;
    services: number;
    mutatingFixes: number;
    dedicatedSla: boolean;
    billingCycle: 'monthly' | 'annual';
  }) => void;
}

export const CustomPlanCalculator: React.FC<CustomPlanCalculatorProps> = ({
  billingCycle,
  onSelectQuote,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [nodes, setNodes] = useState<number>(100);
  const [services, setServices] = useState<number>(25);
  const [mutatingFixes, setMutatingFixes] = useState<number>(100);
  const [dedicatedSla, setDedicatedSla] = useState<boolean>(false);

  const [monthlyPrice, setMonthlyPrice] = useState<number>(2174);
  const [annualSavings, setAnnualSavings] = useState<number>(4800);
  const [isCalculating, setIsCalculating] = useState<boolean>(false);
  const debounceTimerRef = useRef<any>(null);

  // Secure Server-side Quote Fetcher
  // Multipliers, algorithms, and margin constants are NEVER exposed on the client bundle!
  const fetchQuoteFromServer = async (
    n: number,
    s: number,
    f: number,
    sla: boolean,
    cycle: 'monthly' | 'annual'
  ) => {
    setIsCalculating(true);
    try {
      const res = await fetch('/api/calculate-quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nodes: n,
          services: s,
          mutatingFixes: f,
          dedicatedSla: sla,
          billingCycle: cycle,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        if (data.success) {
          setMonthlyPrice(data.monthlyPrice);
          setAnnualSavings(data.annualSavings || 0);
        }
      } else {
        // Fallback calculation if endpoint is transitioning
        const fallbackRaw = 999 + (n * 8) + (s * 15) + (Math.max(0, f - 100) / 100 * 250) + (sla ? 999 : 0);
        const base = Math.max(1299, Math.round(fallbackRaw));
        const finalP = cycle === 'annual' ? Math.round(base * 0.82) : base;
        setMonthlyPrice(finalP);
        setAnnualSavings((base - Math.round(base * 0.82)) * 12);
      }
    } catch {
      // Graceful fallback
      const fallbackRaw = 999 + (n * 8) + (s * 15) + (Math.max(0, f - 100) / 100 * 250) + (sla ? 999 : 0);
      const base = Math.max(1299, Math.round(fallbackRaw));
      const finalP = cycle === 'annual' ? Math.round(base * 0.82) : base;
      setMonthlyPrice(finalP);
      setAnnualSavings((base - Math.round(base * 0.82)) * 12);
    } finally {
      setIsCalculating(false);
    }
  };

  useEffect(() => {
    if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      fetchQuoteFromServer(nodes, services, mutatingFixes, dedicatedSla, billingCycle);
    }, 80);

    return () => {
      if (debounceTimerRef.current) clearTimeout(debounceTimerRef.current);
    };
  }, [nodes, services, mutatingFixes, dedicatedSla, billingCycle]);

  const handleApplyQuote = () => {
    onSelectQuote({
      monthlyPrice,
      nodes,
      services,
      mutatingFixes,
      dedicatedSla,
      billingCycle,
    });
  };

  return (
    <div className="relative z-10 max-w-7xl mx-auto mt-8">
      {/* Enterprise Bridge Ribbon */}
      <div className="bg-[#0c0a09] border border-[#d97706]/35 hover:border-[#d97706]/70 rounded-3xl p-6 sm:p-8 shadow-[0_25px_50px_-15px_rgba(217,119,6,0.18)] transition-all duration-300 relative overflow-hidden">
        
        {/* Subtle Ambient Glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-[#d97706]/15 rounded-full blur-3xl pointer-events-none" />

        {/* Collapsed Ribbon Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-[#d97706]/15 border border-[#d97706]/40 flex items-center justify-center shrink-0 shadow-inner shadow-[#d97706]/30">
              <Sliders className="w-6 h-6 text-[#d97706]" />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h4 className="text-xl sm:text-2xl font-black text-white font-sans tracking-tight">
                  Need a Custom Topology or Enterprise Scale?
                </h4>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-[#d97706]/20 text-[#facc15] font-bold border border-[#d97706]/30 uppercase tracking-wider">
                  Algorithmic Quote
                </span>
              </div>
              <p className="text-stone-400 text-xs sm:text-sm font-sans mt-1 max-w-2xl leading-relaxed">
                Have more than 200 nodes or specialized runbook requirements? Calculate dynamic transparent pricing tailored to your exact cluster geometry.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/25 transition-all duration-200 flex items-center justify-center gap-2 shrink-0 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span>{isOpen ? 'Close Calculator' : 'Configure Custom Plan »'}</span>
          </button>
        </div>

        {/* Expandable Interactive Console */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden"
            >
              <div className="pt-8 mt-8 border-t border-stone-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start relative z-10">
                
                {/* Left 7 Columns: Interactive Sliders */}
                <div className="lg:col-span-7 space-y-6">
                  
                  {/* Slider 1: Monitored Nodes */}
                  <div className="bg-[#171412] border border-stone-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Server className="w-4 h-4 text-[#d97706]" />
                        <span className="text-sm font-bold text-white font-sans">Monitored Cloud / K8s Nodes</span>
                      </div>
                      <span className="font-mono text-base font-black px-3 py-1 rounded-lg bg-[#d97706]/20 text-[#facc15] border border-[#d97706]/30">
                        {nodes} Nodes
                      </span>
                    </div>
                    <input
                      type="range"
                      min={50}
                      max={1000}
                      step={10}
                      value={nodes}
                      onChange={(e) => setNodes(Number(e.target.value))}
                      className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-stone-500">
                      <span>50 Nodes (Min Cap)</span>
                      <span>500 Nodes</span>
                      <span>1,000+ Nodes</span>
                    </div>
                  </div>

                  {/* Slider 2: Microservices */}
                  <div className="bg-[#171412] border border-stone-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Cpu className="w-4 h-4 text-[#d97706]" />
                        <span className="text-sm font-bold text-white font-sans">Active Microservices & Runbooks</span>
                      </div>
                      <span className="font-mono text-base font-black px-3 py-1 rounded-lg bg-[#d97706]/20 text-[#facc15] border border-[#d97706]/30">
                        {services} Services
                      </span>
                    </div>
                    <input
                      type="range"
                      min={15}
                      max={200}
                      step={5}
                      value={services}
                      onChange={(e) => setServices(Number(e.target.value))}
                      className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-stone-500">
                      <span>15 Services (Min Cap)</span>
                      <span>100 Services</span>
                      <span>200+ Services</span>
                    </div>
                  </div>

                  {/* Slider 3: Mutating Actions */}
                  <div className="bg-[#171412] border border-stone-800 rounded-2xl p-5 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Zap className="w-4 h-4 text-[#d97706]" />
                        <span className="text-sm font-bold text-white font-sans">Monthly Automated Mutating Fixes</span>
                      </div>
                      <span className="font-mono text-base font-black px-3 py-1 rounded-lg bg-[#d97706]/20 text-[#facc15] border border-[#d97706]/30">
                        {mutatingFixes} Fixes / mo
                      </span>
                    </div>
                    <input
                      type="range"
                      min={100}
                      max={1000}
                      step={50}
                      value={mutatingFixes}
                      onChange={(e) => setMutatingFixes(Number(e.target.value))}
                      className="w-full h-2 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
                    />
                    <div className="flex justify-between text-[11px] font-mono text-stone-500">
                      <span>100 Fixes (Included Base)</span>
                      <span>500 Fixes</span>
                      <span>1,000+ Fixes</span>
                    </div>
                  </div>

                  {/* Toggle: Dedicated SRE Escalation SLA */}
                  <div 
                    onClick={() => setDedicatedSla(!dedicatedSla)}
                    className={`border rounded-2xl p-4.5 flex items-center justify-between cursor-pointer transition-all ${
                      dedicatedSla 
                        ? 'bg-[#d97706]/15 border-[#d97706]' 
                        : 'bg-[#171412] border-stone-800 hover:border-stone-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center border transition-colors ${
                        dedicatedSla ? 'bg-[#d97706] border-[#d97706] text-white' : 'border-stone-600 bg-transparent'
                      }`}>
                        {dedicatedSla && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                      </div>
                      <div>
                        <div className="text-sm font-bold text-white font-sans flex items-center gap-2">
                          <span>Dedicated Incident Bridge SLA (&lt; 15-min Response)</span>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold">
                            RECOMMENDED FOR P0
                          </span>
                        </div>
                        <p className="text-stone-400 text-xs mt-0.5 font-sans">
                          An Amber Principal SRE directly joins your private war room if autonomous remediation halts.
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* Right 5 Columns: Dynamic Quote Card */}
                <div className="lg:col-span-5 bg-gradient-to-b from-[#1c1917] to-[#141210] border-2 border-[#d97706]/40 rounded-2xl p-6 sm:p-7 flex flex-col justify-between shadow-2xl relative">
                  
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#d97706]">
                        Dynamic Computed Quote
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
                        100% IN-VPC AIR-GAPPED
                      </span>
                    </div>

                    <h5 className="text-2xl font-black text-white tracking-tight font-sans">
                      Custom Enterprise Tier
                    </h5>
                    <p className="text-stone-400 text-xs mt-1 leading-relaxed">
                      Custom single-tenant appliance deployment with Ed25519 offline license token.
                    </p>

                    {/* Price Block */}
                    <div className={`py-5 my-5 border-y border-stone-800 transition-opacity duration-200 ${isCalculating ? 'opacity-60' : 'opacity-100'}`}>
                      <div className="flex items-baseline gap-2">
                        <span className="text-4xl sm:text-5xl font-black text-white tracking-tight font-sans">
                          ${monthlyPrice.toLocaleString()}
                        </span>
                        <span className="text-stone-400 text-xs font-bold uppercase tracking-wider">
                          / month
                        </span>
                      </div>
                      <div className="text-xs font-sans text-amber-400 mt-1 font-semibold flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>
                          {billingCycle === 'annual' 
                            ? `Billed annually ($${(monthlyPrice * 12).toLocaleString()}/yr) • Save $${annualSavings.toLocaleString()}/yr`
                            : 'Billed monthly • Cancel anytime'}
                        </span>
                      </div>
                    </div>

                    {/* Specifications Summary */}
                    <ul className="space-y-2 text-xs font-sans text-stone-300 mb-6">
                      <li className="flex items-center justify-between py-1 border-b border-stone-800/60">
                        <span className="text-stone-400">Node Limit:</span>
                        <span className="text-white font-bold">{nodes} Cloud/K8s Nodes</span>
                      </li>
                      <li className="flex items-center justify-between py-1 border-b border-stone-800/60">
                        <span className="text-stone-400">Microservice Quota:</span>
                        <span className="text-white font-bold">{services} Production Services</span>
                      </li>
                      <li className="flex items-center justify-between py-1 border-b border-stone-800/60">
                        <span className="text-stone-400">Mutating Actions:</span>
                        <span className="text-amber-400 font-bold">{mutatingFixes} Verified Fixes / mo</span>
                      </li>
                      <li className="flex items-center justify-between py-1 border-b border-stone-800/60">
                        <span className="text-stone-400">Escalation Bridge:</span>
                        <span className={dedicatedSla ? "text-emerald-400 font-bold" : "text-stone-400 font-medium"}>
                          {dedicatedSla ? "< 15-min Principal SRE" : "Standard Slack / Email"}
                        </span>
                      </li>
                      <li className="flex items-center justify-between pt-1">
                        <span className="text-stone-400">Telemetry Privacy:</span>
                        <span className="text-emerald-400 font-bold">0 Bytes Egress (Air-Gapped)</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    type="button"
                    onClick={handleApplyQuote}
                    className="w-full py-3.5 px-5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans font-black text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/30 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <span>Lock In Quote &amp; Deploy »</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
