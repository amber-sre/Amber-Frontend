# Amber — Autonomous Incident Remediation & SRE Engine (Frontend)

<div align="center">
  <img src="public/assets/hero-section.png" alt="Amber Hero Interface" width="100%" />
</div>

<p align="center">
  <b>Deterministic Cloud Autonomy.</b><br />
  Autonomous triage, hybrid RAG playbooks, and verified healing for production Kubernetes and cloud clusters.
</p>

<p align="center">
  <a href="https://ambersre.xyz"><img src="https://img.shields.io/badge/Live-ambersre.xyz-d97706?style=flat-square&logo=cloudflare" alt="Live Domain" /></a>
  <a href="https://github.com/himanshu-xyz-1/Amber-Frontend/blob/main/LICENSE"><img src="https://img.shields.io/badge/license-Proprietary-red?style=flat-square" alt="Proprietary License" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19-blue?style=flat-square" alt="React 19" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-6-646CFF?style=flat-square" alt="Vite 6" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square" alt="TailwindCSS" /></a>
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare_Workers-Edge-F38020?style=flat-square&logo=cloudflare" alt="Cloudflare Workers" /></a>
</p>

---

## Overview

Amber is an autonomous incident remediation engine designed for high-throughput SRE and platform engineering teams. This repository contains the public web interface, interactive alert storm simulator, Deep Proof inspection drawer, architecture showcase, and intake dispatch engine.

**Live Production Domain:** [https://ambersre.xyz](https://ambersre.xyz)  
*(Automated Universal SSL by Google Trust Services)*

The core premise of Amber:
> **LLMs propose actions. Deterministic code and human operators decide.**

Amber eliminates hallucination risk by enforcing static compiled tool allowlists, SHA-256 cryptographic argument binding, automated health probes, and instant auto-rollback on anomalous metrics.

---

## Architecture Thesis & Visualizations

<div align="center">
  <img src="public/assets/architecture-thesis.png" alt="Amber Architecture Thesis" width="100%" />
</div>

- **Zero Raw Terminal Access:** Amber prohibits unconstrained shell execution. Every action is registered with static risk levels compiled into code.
- **SHA-256 Argument Binding:** Remediation parameters are cryptographically hashed into approval tokens with strict 10-minute TTLs to prevent payload tampering.
- **Automated Health Probes:** Post-remediation canary probes verify target cluster error rates and latency. If metrics do not normalize within 5 seconds, changes revert automatically.
- **500 Alerts/sec Sustained Ingestion:** Sliding window deduplication fingerprints incident cascades before invoking agent reasoning nodes.

---

## Live Interactive Alert Simulator

The front-facing dashboard includes a real-time SRE incident simulator comparing desktop vs mobile incident resolution:

1. **Slack Monitor View (Desktop):** Renders interactive Block Kit cards with expandable Deep Proof blocks, live diagnostic telemetry, and runbook matching confidence scores.
2. **Telegram Smartphone View (Mobile):** Demonstrates real-time 1-click mobile approvals via `@ambersre_alert_bot` with inline button callbacks.
3. **Deep Proof Drawer:** Real-time visibility into the exact SQL/K8s mutation diffs, connection pool utilization curves, and SHA-256 cryptographic token hashes.

---

## SEO & Web Standards

The site is optimized for global search engine indexing and social media link unfurling:
- **Canonical URL:** `https://ambersre.xyz/`
- **Schema.org Structured Data:** `SoftwareApplication` JSON-LD for rich Google search results.
- **OpenGraph & Twitter Cards:** Full rich card previews for WhatsApp, LinkedIn, Twitter/X, and Slack.
- **Crawlers:** Live `robots.txt` and `sitemap.xml` deployed directly to Cloudflare edge.

---

## Tech Stack

| Layer | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Core component architecture |
| **Bundler** | Vite 6 | Sub-second HMR and optimized production bundling |
| **Styling** | Tailwind CSS 3.4 | Custom obsidian (`#050505`) and warm amber (`#f59e0b`) design system |
| **Animations** | Framer Motion + GSAP | Interactive simulator scrubbing and transitions |
| **Icons** | Lucide React | Clean, scalable system iconography |
| **Hosting & Edge** | Cloudflare Workers (`wrangler`) | Zero-latency global CDN edge deployment with Universal SSL |

---

## Quickstart

### 1. Clone & Install
```bash
git clone https://github.com/himanshu-xyz-1/Amber-Frontend.git
cd Amber-Frontend
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build for Production
```bash
npm run build
```

### 4. Deploy to Cloudflare Workers
```bash
npx wrangler deploy
```

The application will be compiled into `dist/` and deployed to the Cloudflare global network under `ambersre.xyz`.

---

## License

Proprietary and Confidential. Copyright (c) 2026 Amber Technologies Inc. All Rights Reserved. See [LICENSE](LICENSE) for details.
