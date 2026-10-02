import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Key, ShieldCheck, AlertTriangle, X, CheckCircle2, ArrowRight, Loader2 } from 'lucide-react';

interface LicenseDetails {
  is_valid: boolean;
  status: 'active' | 'community' | 'expired' | 'invalid';
  org: string;
  tier: string;
  max_nodes: number;
  max_services: number;
  days_remaining: number;
  expires_at: string | null;
  features: string[];
  error_message: string | null;
  contact_url: string;
  get_key_url: string;
}

interface LicenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGetStarted: () => void;
}

export const LicenseModal: React.FC<LicenseModalProps> = ({ isOpen, onClose, onGetStarted }) => {
  const [licenseKeyInput, setLicenseKeyInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [licenseData, setLicenseData] = useState<LicenseDetails | null>(null);

  const API_BASE = 'http://localhost:8000/api/v1';

  const fetchStatus = async () => {
    try {
      const res = await fetch(`${API_BASE}/license/status`);
      if (res.ok) {
        const data = await res.json();
        setLicenseData(data);
      }
    } catch (e) {
      // Backend might be offline or not running locally
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchStatus();
      setErrorMsg(null);
      setSuccessMsg(null);
    }
  }, [isOpen]);

  const handleActivate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!licenseKeyInput.trim()) {
      setErrorMsg('Please enter an Amber Enterprise license key.');
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`${API_BASE}/license/activate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ license_key: licenseKeyInput.trim() }),
      });

      const result = await res.json();

      if (!res.ok) {
        setErrorMsg(result.detail || 'Activation failed. Please verify your token.');
      } else {
        setSuccessMsg(result.message || 'Amber Enterprise successfully activated!');
        setLicenseData(result.details);
        setLicenseKeyInput('');
      }
    } catch (err: any) {
      setErrorMsg('Cannot reach Amber Backend API at localhost:8000. Ensure the backend is running.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative w-full max-w-xl bg-[#0d0d0d] border border-white/15 rounded-2xl shadow-2xl p-6 sm:p-8 text-white overflow-hidden z-10"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#d97706]/10 rounded-full blur-3xl pointer-events-none" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-2 text-white/50 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-500 shrink-0">
              <Key className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight text-white flex items-center gap-2">
                Amber Commercial Licensing
                {licenseData?.is_valid && (
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-semibold uppercase">
                    Active
                  </span>
                )}
              </h3>
              <p className="text-xs text-white/60">
                Offline cryptographic Ed25519 verification. Zero telemetry or data phoning.
              </p>
            </div>
          </div>

          {/* Active License Details Card (if already activated) */}
          {licenseData?.is_valid ? (
            <div className="mb-6 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Licensed Entity:</span>
                <span className="font-semibold text-emerald-300">{licenseData.org}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Tier & Limits:</span>
                <span className="font-mono text-emerald-400 font-bold">{licenseData.tier} · {licenseData.max_nodes} Nodes</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-white/60">Days Remaining:</span>
                <span className="font-semibold text-emerald-300">{licenseData.days_remaining} Days ({licenseData.expires_at?.slice(0, 10)})</span>
              </div>
              <div className="mt-2 pt-2 border-t border-emerald-500/20 flex items-center gap-2 text-xs text-emerald-400">
                <ShieldCheck className="w-4 h-4 shrink-0" />
                <span>Multi-Channel Approvals (Slack, Telegram, WhatsApp) are fully UNLOCKED.</span>
              </div>
            </div>
          ) : (
            <div className="mb-6 p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
              <div className="text-xs space-y-1">
                <p className="font-semibold text-amber-300">
                  Running in Community Trial
                </p>
                <p className="text-white/70 leading-relaxed">
                  Multi-Channel 1-Click Approvals (Slack, WhatsApp, Telegram) and Autonomous Remediation require an active Amber Enterprise License Key.
                </p>
              </div>
            </div>
          )}

          {/* Activation Form */}
          <form onSubmit={handleActivate} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-white/70 mb-1.5 uppercase tracking-wider font-mono">
                Enter Commercial License Key
              </label>
              <input
                type="text"
                placeholder="amb_live_eyJleHBpcmVzX2F0..."
                value={licenseKeyInput}
                onChange={(e) => setLicenseKeyInput(e.target.value)}
                className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl font-mono text-xs text-white placeholder-white/20 focus:outline-none focus:border-amber-500 transition-colors"
              />
            </div>

            {errorMsg && (
              <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 bg-[#d97706] hover:bg-[#b45309] text-white font-semibold text-xs tracking-wider uppercase rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Cryptographically Verifying...</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Activate License</span>
                </>
              )}
            </button>
          </form>

          {/* Bottom "Get your key" CTA */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <span className="text-white/50">Don't have a commercial key yet?</span>
            <button
              onClick={() => {
                onClose();
                onGetStarted();
              }}
              className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5 transition-colors group cursor-pointer"
            >
              <span>Get your key on our Contact page</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
