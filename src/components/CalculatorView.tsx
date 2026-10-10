import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  Sparkles
} from 'lucide-react';

interface CalculatorViewProps {
  onBack: () => void;
  onNavigateToContact: (quoteNote?: string) => void;
}

// High-efficiency instant synchronous evaluation kernel (0ms latency, zero plain-text leaks)
const _evalQuote = (n: number, s: number, f: number, cycle: 'monthly' | 'annual') => {
  const _k = [0x3e7, 0x8, 0x6, 0x4, 0xf, 0xc, 0x8, 0xfa, 0x96, 0x513];
  const _nc = n <= 500 ? n * _k[1] : n <= 2000 ? (500 * _k[1]) + ((n - 500) * _k[2]) : (500 * _k[1]) + (1500 * _k[2]) + ((n - 2000) * _k[3]);
  const _sc = s <= 50 ? s * _k[4] : s <= 200 ? (50 * _k[4]) + ((s - 50) * _k[5]) : (50 * _k[4]) + (150 * _k[5]) + ((s - 200) * _k[6]);
  const _ef = Math.max(0, f - 100);
  const _fc = _ef > 0 ? (Math.min(9, Math.ceil(_ef / 100)) * _k[7]) + (Math.max(0, Math.ceil((_ef - 900) / 100)) * _k[8]) : 0;
  const _raw = _k[0] + _nc + _sc + _fc;
  const _base = Math.max(_k[9], Math.round(_raw));
  const _annualRate = Math.round(_base * 0.82);
  const _finalMonthly = cycle === 'annual' ? _annualRate : _base;
  const _savings = (_base - _annualRate) * 12;
  return { monthly: _finalMonthly, savings: _savings };
};

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  onBack,
  onNavigateToContact,
}) => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('annual');
  const [nodes, setNodes] = useState<number>(120);
  const [services, setServices] = useState<number>(30);
  const [mutatingFixes, setMutatingFixes] = useState<number>(100);

  // 0ms Real-Time Instant Calculation (60 FPS smooth dragging)
  const { monthly: monthlyPrice, savings: annualSavings } = useMemo(() => {
    return _evalQuote(nodes, services, mutatingFixes, billingCycle);
  }, [nodes, services, mutatingFixes, billingCycle]);

  const handleApplyQuote = () => {
    const note = `[Calculated Custom Plan Specification]
• Monitored Nodes: ${nodes.toLocaleString()} Nodes
• Active Services: ${services.toLocaleString()} Microservices
• Mutating Actions: ${mutatingFixes.toLocaleString()} actions/mo
• Incident Escalation: Priority Multi-Channel Dispatch (Slack / Telegram / Teams)
• Quoted Monthly Rate: $${monthlyPrice.toLocaleString()}/month (${billingCycle === 'annual' ? 'Annual commitment' : 'Monthly'})`;
    onNavigateToContact(note);
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#0c0a09] font-sans selection:bg-[#d97706] selection:text-white pb-24">
      
      {/* Top Professional Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200/80 px-6 sm:px-12 py-4 flex items-center justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-sans font-semibold text-stone-600 hover:text-black transition-colors cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to Platform</span>
        </button>

        <div 
          className="flex items-center gap-2.5 cursor-pointer group" 
          onClick={onBack}
        >
          <img 
            src="/assets/amber-symbol.svg" 
            alt="Amber Symbol" 
            className="w-7 h-9 object-contain drop-shadow-[0_2px_8px_rgba(217,119,6,0.3)] group-hover:scale-105 transition-transform duration-200" 
          />
          <span className="font-sans font-black text-lg text-[#0c0a09] tracking-tight">AMBER</span>
          <span className="text-stone-300">|</span>
          <span className="text-[10px] font-sans font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-600 border border-stone-200/80">
            CALCULATOR
          </span>
        </div>

        <button
          type="button"
          onClick={() => onNavigateToContact()}
          className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 hover:bg-black text-white text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
        >
          <span>Schedule Call</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-6xl mx-auto px-6 sm:px-10 pt-10 sm:pt-14">
        
        {/* Header Section */}
        <div className="max-w-3xl mb-10 sm:mb-12">
          <h1 className="text-3xl sm:text-5xl font-sans font-black text-[#0c0a09] tracking-tight leading-tight">
            Transparent Pricing. <br />
            <span className="text-[#d97706]">Modeled for Your Exact Scale.</span>
          </h1>

          <p className="mt-3.5 text-stone-600 font-sans text-sm sm:text-base leading-relaxed">
            Zero per-seat taxes. Zero unpredictable LLM token surprises. Type your exact infrastructure dimensions or drag the sliders to model custom deployment economics in real-time.
          </p>
        </div>

        {/* 2-Column Split: Inputs vs Dynamic Quote Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Clean White Controls (7 Cols) */}
          <div className="lg:col-span-7 space-y-5">
            
            {/* Control 1: Monitored Nodes */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706] block mb-1">
                    01 // Compute Infrastructure
                  </span>
                  <h3 className="text-base font-sans font-bold text-stone-900 tracking-tight">Monitored Cloud &amp; K8s Nodes</h3>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">Total VM instances, EC2 hosts, and Kubernetes worker nodes</p>
                </div>
                
                {/* Clean Numeric Input with professional font */}
                <div className="flex items-center self-start sm:self-auto bg-stone-50 hover:bg-stone-100/80 focus-within:bg-white border border-stone-300 focus-within:border-stone-900 rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
                  <input
                    type="number"
                    min={10}
                    max={100000}
                    value={nodes === 0 ? '' : nodes}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      setNodes(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-20 sm:w-24 text-right font-sans font-bold text-stone-900 bg-transparent outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="120"
                  />
                  <span className="text-xs font-sans font-semibold text-stone-500 ml-1.5 select-none">Nodes</span>
                </div>
              </div>

              {/* Slider with stable fixed range: min=10, max=5000, step=10 */}
              <input
                type="range"
                min={10}
                max={5000}
                step={10}
                value={Math.min(Math.max(10, nodes), 5000)}
                onChange={(e) => setNodes(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>10 Nodes</span>
                <span>{nodes > 5000 ? `${nodes.toLocaleString()} (Custom)` : '2,500 Nodes'}</span>
                <span>5,000 Nodes</span>
              </div>

              {/* Quick Presets in clean modern typography */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[50, 120, 250, 500, 1000, 2500, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setNodes(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                      nodes === preset
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {preset.toLocaleString()} Nodes
                  </button>
                ))}
              </div>
            </div>

            {/* Control 2: Active Microservices */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706] block mb-1">
                    02 // Service Topology
                  </span>
                  <h3 className="text-base font-sans font-bold text-stone-900 tracking-tight">Active Production Microservices</h3>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">Distinct services with dedicated telemetry &amp; runbook mapping</p>
                </div>
                
                {/* Clean Numeric Input */}
                <div className="flex items-center self-start sm:self-auto bg-stone-50 hover:bg-stone-100/80 focus-within:bg-white border border-stone-300 focus-within:border-stone-900 rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
                  <input
                    type="number"
                    min={5}
                    max={10000}
                    value={services === 0 ? '' : services}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      setServices(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-20 sm:w-24 text-right font-sans font-bold text-stone-900 bg-transparent outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="30"
                  />
                  <span className="text-xs font-sans font-semibold text-stone-500 ml-1.5 select-none">Services</span>
                </div>
              </div>

              {/* Slider with stable fixed range: min=5, max=500, step=5 */}
              <input
                type="range"
                min={5}
                max={500}
                step={5}
                value={Math.min(Math.max(5, services), 500)}
                onChange={(e) => setServices(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>5 Services</span>
                <span>{services > 500 ? `${services.toLocaleString()} (Custom)` : '250 Services'}</span>
                <span>500 Services</span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[15, 30, 75, 150, 200, 300, 500].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setServices(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                      services === preset
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {preset} Services
                  </button>
                ))}
              </div>
            </div>

            {/* Control 3: Mutating Remediations */}
            <div className="bg-white border border-stone-200/90 rounded-2xl p-6 shadow-sm hover:border-amber-400/50 transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                <div>
                  <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706] block mb-1">
                    03 // Autonomous Remediations
                  </span>
                  <h3 className="text-base font-sans font-bold text-stone-900 tracking-tight">Monthly Mutating Actions</h3>
                  <p className="text-xs font-sans text-stone-500 mt-0.5">Autonomous pod restarts, connection drains, state heals &amp; rollbacks</p>
                </div>
                
                {/* Clean Numeric Input */}
                <div className="flex items-center self-start sm:self-auto bg-stone-50 hover:bg-stone-100/80 focus-within:bg-white border border-stone-300 focus-within:border-stone-900 rounded-xl px-3.5 py-1.5 transition-all shadow-inner">
                  <input
                    type="number"
                    min={50}
                    max={100000}
                    value={mutatingFixes === 0 ? '' : mutatingFixes}
                    onChange={(e) => {
                      const val = e.target.value === '' ? 0 : parseInt(e.target.value, 10);
                      setMutatingFixes(isNaN(val) ? 0 : Math.max(0, val));
                    }}
                    className="w-20 sm:w-24 text-right font-sans font-bold text-stone-900 bg-transparent outline-none text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    placeholder="100"
                  />
                  <span className="text-xs font-sans font-semibold text-stone-500 ml-1.5 select-none">Fixes / mo</span>
                </div>
              </div>

              {/* Slider with stable fixed range: min=50, max=5000, step=50 */}
              <input
                type="range"
                min={50}
                max={5000}
                step={50}
                value={Math.min(Math.max(50, mutatingFixes), 5000)}
                onChange={(e) => setMutatingFixes(Number(e.target.value))}
                className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#d97706]"
              />

              <div className="flex justify-between text-xs font-sans font-medium text-stone-400 mt-2">
                <span>50 Fixes</span>
                <span>{mutatingFixes > 5000 ? `${mutatingFixes.toLocaleString()} (Custom)` : '2,500 Fixes'}</span>
                <span>5,000 Fixes</span>
              </div>

              {/* Quick Presets */}
              <div className="flex flex-wrap items-center gap-2 mt-3.5 pt-3.5 border-t border-stone-100">
                <span className="text-xs font-sans font-semibold text-stone-400 mr-0.5 select-none">Presets:</span>
                {[100, 250, 500, 1000, 2500, 5000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setMutatingFixes(preset)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all cursor-pointer ${
                      mutatingFixes === preset
                        ? 'bg-stone-900 text-white shadow-sm'
                        : 'bg-stone-100 hover:bg-stone-200 text-stone-700 hover:text-stone-950'
                    }`}
                  >
                    {preset.toLocaleString()} Fixes
                  </button>
                ))}
              </div>
            </div>

            {/* Privacy Guarantee Note */}
            <div className="p-4 rounded-xl bg-stone-100/80 border border-stone-200 flex items-start gap-2.5 text-xs text-stone-600">
              <span className="font-sans text-xs font-bold px-2 py-0.5 rounded bg-stone-200 text-stone-800 uppercase tracking-wider shrink-0 mt-0.5">
                IN-VPC AIR-GAPPED
              </span>
              <div className="font-sans">
                <strong className="text-stone-900">Zero Telemetry Egress:</strong> Amber operates as a single-tenant software appliance on customer infrastructure with offline Ed25519 signature verification.
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Quote Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-24">
            <div className="bg-white border-2 border-stone-900 rounded-3xl p-7 shadow-xl relative overflow-hidden">
              
              {/* Badge & Cycle Toggle */}
              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-sans font-bold uppercase tracking-wider text-[#d97706]">
                  Computed Dynamic Quote
                </span>
                
                {/* Billing Cycle Pill */}
                <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs font-sans">
                  <button
                    type="button"
                    onClick={() => setBillingCycle('annual')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      billingCycle === 'annual' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    Annual (-18%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-2.5 py-1 rounded-md font-bold transition-all cursor-pointer ${
                      billingCycle === 'monthly' ? 'bg-white text-stone-900 shadow-sm' : 'text-stone-500'
                    }`}
                  >
                    Monthly
                  </button>
                </div>
              </div>

              <h2 className="text-2xl font-sans font-black text-stone-900 tracking-tight">
                Custom Enterprise Tier
              </h2>
              <p className="text-stone-500 font-sans text-xs mt-1">
                Dedicated single-tenant SRE engine with offline signed license key.
              </p>

              {/* Price Block - 0ms Real-time Instant Updates */}
              <div className="py-6 my-6 border-y border-stone-200/80 transition-all duration-150">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-sans font-black text-stone-950 tracking-tight">
                    ${monthlyPrice.toLocaleString()}
                  </span>
                  <span className="text-stone-500 font-sans text-xs font-bold uppercase tracking-wider">
                    / month
                  </span>
                </div>
                <div className="text-xs font-sans font-bold text-[#b45309] mt-1.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>
                    {billingCycle === 'annual' 
                      ? `$${(monthlyPrice * 12).toLocaleString()} billed annually • Save $${annualSavings.toLocaleString()}/yr`
                      : 'Billed monthly • Cancel anytime'}
                  </span>
                </div>
              </div>

              {/* Quota Breakdown Table */}
              <div className="space-y-2.5 text-xs font-sans text-stone-700 mb-6">
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Monitored Nodes:</span>
                  <span className="font-bold text-stone-900">{nodes.toLocaleString()} Cloud / K8s Nodes</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Microservice Quota:</span>
                  <span className="font-bold text-stone-900">{services.toLocaleString()} Active Services</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Autonomous Actions:</span>
                  <span className="font-bold text-[#d97706]">{mutatingFixes.toLocaleString()} Verified Fixes / mo</span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Incident Escalation:</span>
                  <span className="font-bold text-stone-900">
                    Priority Slack / Teams / Webhook
                  </span>
                </div>
                <div className="flex justify-between py-1 border-b border-stone-100">
                  <span className="text-stone-500">Deployment Topology:</span>
                  <span className="font-bold text-stone-900">In-VPC Single-Tenant Cluster</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-stone-500">Telemetry Egress:</span>
                  <span className="font-bold text-emerald-700">0 Bytes (Zero Cloud Egress)</span>
                </div>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={handleApplyQuote}
                className="w-full py-3.5 px-5 rounded-xl bg-[#d97706] hover:bg-[#b45309] text-white font-sans font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#d97706]/25 transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
              >
                <span>Lock In Quote &amp; Deploy</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 text-center text-xs font-sans text-stone-400">
                Quotes are guaranteed for 30 days upon submission.
              </div>

            </div>
          </div>

        </div>

        {/* Bottom Feature Confidence Grid */}
        <div className="mt-16 pt-12 border-t border-stone-200 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-amber-400/50 transition-colors">
            <span className="text-xs font-sans font-bold text-[#d97706] uppercase tracking-wider block mb-2">
              01 // Cryptographic Safety
            </span>
            <h4 className="text-sm font-sans font-bold text-stone-900 mb-1.5">Deterministic Safe Execution</h4>
            <p className="text-xs font-sans text-stone-600 leading-relaxed font-normal">
              Every remediation action requires cryptographic SHA-256 parameter binding and strict static allowlist verification.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-amber-400/50 transition-colors">
            <span className="text-xs font-sans font-bold text-[#d97706] uppercase tracking-wider block mb-2">
              02 // Local Runtime
            </span>
            <h4 className="text-sm font-sans font-bold text-stone-900 mb-1.5">Zero Training on Telemetry</h4>
            <p className="text-xs font-sans text-stone-600 leading-relaxed font-normal">
              Run offline via local Ollama compute. Customer error traces and configurations never train public AI models.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white border border-stone-200/90 shadow-sm hover:border-amber-400/50 transition-colors">
            <span className="text-xs font-sans font-bold text-[#d97706] uppercase tracking-wider block mb-2">
              03 // Onboarding Calibration
            </span>
            <h4 className="text-sm font-sans font-bold text-stone-900 mb-1.5">Custom Runbook Engineering</h4>
            <p className="text-xs font-sans text-stone-600 leading-relaxed font-normal">
              Our engineering team works with your SREs to author and validate custom runbooks for your proprietary services.
            </p>
          </div>
        </div>

      </main>

    </div>
  );
};
