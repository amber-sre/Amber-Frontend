# Amber — Autonomous Incident Remediation & SRE Engine (Frontend)

<div align="center">
  <img src="public/assets/hero-section.png" alt="Amber Platform Interface" width="100%" />
</div>

<p align="center">
  <b>Deterministic Cloud Autonomy.</b><br />
  Production web portal, executive audit digests, and architecture documentation for the Amber SRE platform.
</p>

<p align="center">
  <a href="https://ambersre.xyz"><img src="https://img.shields.io/badge/Live-ambersre.xyz-d97706?style=flat-square&logo=cloudflare" alt="Live Domain" /></a>
  <a href="https://github.com/amber-sre/Amber-Frontend/blob/main/LICENSE"><img src="https://img.shields.io/badge/License-Proprietary-red?style=flat-square" alt="Proprietary License" /></a>
  <a href="https://react.dev/"><img src="https://img.shields.io/badge/React-19.0-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React 19" /></a>
  <a href="https://vite.dev/"><img src="https://img.shields.io/badge/Vite-6.1-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite 6" /></a>
  <a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/TailwindCSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="TailwindCSS" /></a>
  <a href="https://workers.cloudflare.com/"><img src="https://img.shields.io/badge/Cloudflare_Workers-Edge-F38020?style=flat-square&logo=cloudflare&logoColor=white" alt="Cloudflare Workers" /></a>
</p>

---

## Overview

Amber is an autonomous incident remediation engine that triages cloud alerts in under 3 seconds, runs bounded diagnostics, and executes cryptographically signed fixes inside your private VPC.

This repository contains the production web interface, accessible at **[https://ambersre.xyz](https://ambersre.xyz)**. The interface uses a clean white editorial design system (`#ffffff`) paired with warm amber accents (`#d97706`) and dense typography.

### Core Operating Principle
> **LLMs propose actions. Deterministic code and human operators decide.**

Amber eliminates hallucination risk by enforcing static compiled tool allowlists, SHA-256 cryptographic argument binding, automated health probes, and automatic rollback on anomalous metrics.

---

## Features

### 1. Executive Reliability Audits & PDF Digest Export
- **Automated Cadence:** Weekly summaries scheduled for Monday 9:00 AM local time, plus monthly stability reviews.
- **Host Timezone Detection:** Reads the cluster host timezone directly to deliver reports before peak windows.
- **Client-Side PDF Generation:** Built-in PDF generator creates `Amber_Executive_Reliability_Audit_W41.pdf` on the fly via raw PDF byte streams. Includes incident chronologies, SLO attainment figures (99.994%), and links to automated pull requests.
- **Cryptographic Audit Trail:** Documents are signed with Ed25519 and SHA-256 HMAC for SOC-2 Type II audit readiness.

### 2. Interactive Lifecycle Telemetry Inspector
- Interactive step-by-step telemetry viewer walking through the four-stage remediation pipeline:
  1. **Alert Ingestion:** 500 alerts/sec ingestion with sliding-window deduplication.
  2. **Bounded Diagnosis:** Correlating pod logs, metrics, and PostgreSQL lock tables without arbitrary shell access.
  3. **Signed Execution:** SHA-256 token signing with 10-minute TTLs and Slack/Telegram approval webhooks.
  4. **Health Verification & Rollback:** Automated canary probes that revert mutations if error rates do not normalize within 5 seconds.

### 3. Dedicated Infrastructure ROI Calculator (`/calculator`)
- Interactive calculator allowing platform teams to model pricing and savings based on:
  - Worker node scale (4 to 5,000+ nodes)
  - Active microservices (5 to 500+ services)
  - Monthly automated remediation volume (50 to 5,000+ actions)
  - Engineering team size and on-call burnout reduction metrics

### 4. Engineering Blog & Architectural Guides (`/blog`)
- In-depth technical articles detailing:
  - Deterministic SRE vs unconstrained autonomous agents
  - Safe database pool healing via `pg_stat_activity`
  - In-VPC air-gapped local model deployment with Ollama

### 5. Web Standards, SEO & Edge Routing
- **Clean Path Routing:** Native browser History API integration with support for `/calculator`, `/blog`, `/blog/:slug`, `/privacy`, `/terms`, `/security`, and `/dpa`.
- **Structured Data:** Full `SoftwareApplication` JSON-LD schema for rich search engine indexing.
- **Edge Deployment:** Deployed on Cloudflare Workers edge nodes with automated SSL by Google Trust Services.

---

## Architecture & Directory Layout

```
Amber-Frontend/
├── public/
│   ├── assets/              # Architecture diagrams, vector symbols, and screenshots
│   ├── robots.txt           # Search engine crawling policies
│   └── sitemap.xml          # Canonical URL registry for search engines
├── src/
│   ├── components/
│   │   ├── ExecutiveAuditShowcase.tsx   # White editorial audit showcase with PDF export
│   │   ├── HowItWorks.tsx               # 4-stage telemetry lifecycle inspector
│   │   ├── CalculatorView.tsx           # Dedicated ROI pricing calculator
│   │   ├── BlogView.tsx                 # Technical engineering blog index and article reader
│   │   ├── LegalModal.tsx               # Security, Terms, Privacy, and DPA documents
│   │   └── SpotlightCard.tsx            # Radial gradient card container
│   ├── App.tsx              # Root component, routing synchronization, navigation
│   ├── main.tsx             # Application entrypoint
│   └── index.css            # Tailwind directives and typographic font styles
├── wrangler.toml            # Cloudflare Workers deployment configuration
├── vite.config.ts           # Vite build and asset pipeline configuration
└── package.json             # Scripts and dependency registry
```

---

## Tech Stack

| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Framework** | React 19 + TypeScript | Strict type safety across application state and route handling |
| **Bundler** | Vite 6 | Production build optimization and fast local module replacement |
| **Styling** | Tailwind CSS 3.4 | Custom white canvas (`#ffffff`) and amber palette (`#d97706`) |
| **Smooth Scroll** | Lenis + GSAP ScrollTrigger | Hardware-accelerated inertial scrolling and scroll animations |
| **Animations** | Framer Motion | Smooth layout shifts, modals, and disclosure cards |
| **Icons** | Lucide React | Lightweight, tree-shaken SVG icon components |
| **Edge Deployment** | Cloudflare Workers (`wrangler`) | Global static asset distribution with sub-10ms initial byte latency |

---

## Local Development

### Prerequisites
- Node.js 20.0.0 or higher
- npm 10.0.0 or higher

### 1. Clone & Install
```bash
git clone https://github.com/amber-sre/Amber-Frontend.git
cd Amber-Frontend
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
The application will start at `http://localhost:5173` (or the port indicated in your terminal).

### 3. Type Checking & Production Build
```bash
npm run build
```
This runs `tsc -b` to verify types, followed by `vite build` to output optimized static bundles into `dist/`.

---

## Production Deployment

The production site is hosted on Cloudflare Workers and mapped to custom domains `ambersre.xyz` and `www.ambersre.xyz`.

### Deploy via Wrangler CLI
```bash
npx wrangler deploy
```

Wrangler inspects `wrangler.toml`, uploads changed assets to the Cloudflare KV edge store, and updates the active worker version within seconds.

---

## Security & Compliance

- **Zero Client Telemetry:** No user tracking scripts, third-party trackers, or marketing pixels are loaded.
- **Content Security:** Strict HTTPS enforcement with modern TLS 1.3 ciphers.
- **Legal & Compliance:** View official terms, privacy policy, and SOC-2 data security boundaries directly on [ambersre.xyz/security](https://ambersre.xyz/security).

---

## License

Proprietary and Confidential. Copyright (c) 2026 Amber Technologies Inc. All Rights Reserved. See [LICENSE](LICENSE) for terms.
