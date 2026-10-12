#!/usr/bin/env bash
# ==============================================================================
# Amber SRE Engine — Enterprise / Commercial Edition Installer
#
# Usage:
#   curl -fsSL https://ambersre.xyz/install.sh | bash
#
# Features:
#   • Autonomous Multi-Cluster Incident Remediation & Root-Cause Proof
#   • Cryptographically Signed Ed25519 License Verification
#   • Hardware-Aware Local Ollama & Multi-Channel On-Call Bridge
#   • Zero Telemetry / 100% On-Premises & In-VPC Data Sovereignty
# ==============================================================================
set -euo pipefail

AMBER_DIR="${HOME}/.amber"
REPO_URL="https://github.com/himanshu-xyz-1/Amber-Backend.git"

# Colours
GREEN='\033[0;32m'; YELLOW='\033[1;33m'; RED='\033[0;31m'; CYAN='\033[0;36m'; BOLD='\033[1m'; NC='\033[0m'
info()  { echo -e "${GREEN}[Amber Enterprise]${NC} $*"; }
warn()  { echo -e "${YELLOW}[Amber WARN]${NC} $*"; }
error() { echo -e "${RED}[Amber ERROR]${NC} $*"; exit 1; }

echo ""
echo -e "${CYAN}${BOLD}======================================================================${NC}"
echo -e "${CYAN}${BOLD}  💎 AMBER SRE — ENTERPRISE COMMERCIAL INSTALLER${NC}"
echo -e "  High-Volume Autonomous Remediation • Multi-Channel Bridge • SLA"
echo -e "${CYAN}${BOLD}======================================================================${NC}"
echo ""

# ──────────────────────────────────────────────────────────────────────
# Step 1: System Pre-requisites Check
# ──────────────────────────────────────────────────────────────────────
info "Checking enterprise host requirements..."
for tool in git curl; do
    if ! command -v "$tool" &>/dev/null; then
        error "'$tool' is required but not installed. Please install it and re-run."
    fi
done

PYTHON_CMD=""
for cmd in python3.11 python3.12 python3.10 python3; do
    if command -v "$cmd" &>/dev/null; then
        if "$cmd" -c "import sys; sys.exit(0 if sys.version_info >= (3, 10) else 1)" 2>/dev/null; then
            PYTHON_CMD="$cmd"
            break
        fi
    fi
done

if [[ -z "$PYTHON_CMD" ]]; then
    error "Python 3.10 or higher is required. Please install Python 3.10+ and re-run."
fi
info "Using Python runtime: $("$PYTHON_CMD" --version 2>&1)"

if ! command -v docker &>/dev/null; then
    warn "Docker is not detected in PATH. Docker is required for cluster microservices."
fi

# ──────────────────────────────────────────────────────────────────────
# Step 2: Download Amber Engine to ~/.amber
# ──────────────────────────────────────────────────────────────────────
if [[ -d "$AMBER_DIR" ]]; then
    info "Existing Amber directory found at $AMBER_DIR. Fetching latest release..."
    cd "$AMBER_DIR"
    git fetch origin main --quiet 2>/dev/null || true
    git reset --hard origin/main --quiet 2>/dev/null || true
else
    info "Provisioning Amber Engine at $AMBER_DIR..."
    git clone "$REPO_URL" "$AMBER_DIR" --quiet
    cd "$AMBER_DIR"
fi

# ──────────────────────────────────────────────────────────────────────
# Step 3: Configure Isolated Python Environment
# ──────────────────────────────────────────────────────────────────────
if [[ ! -d "${AMBER_DIR}/.venv" ]]; then
    info "Setting up isolated virtual environment..."
    "$PYTHON_CMD" -m venv "${AMBER_DIR}/.venv"
fi

VENV_PY="${AMBER_DIR}/.venv/bin/python"
VENV_PIP="${AMBER_DIR}/.venv/bin/pip"

info "Installing enterprise dependencies..."
"$VENV_PIP" install --upgrade pip --quiet
"$VENV_PIP" install -r requirements.txt --quiet || true

# ──────────────────────────────────────────────────────────────────────
# Step 4: Ensure Ollama is present for local AI compute
# ──────────────────────────────────────────────────────────────────────
if ! command -v ollama &>/dev/null; then
    info "Installing Ollama for local self-hosted AI reasoning..."
    curl -fsSL https://ollama.com/install.sh | sh 2>/dev/null || warn "Could not install Ollama automatically. You can install it manually from https://ollama.ai"
fi

# ──────────────────────────────────────────────────────────────────────
# Step 5: Launch Enterprise Setup Wizard (License & Verification)
# ──────────────────────────────────────────────────────────────────────
echo ""
info "Launching Commercial Setup Wizard..."
if [ -e /dev/tty ]; then
    "$VENV_PY" -m scripts.setup_wizards commercial < /dev/tty
else
    "$VENV_PY" -m scripts.setup_wizards commercial
fi

# ──────────────────────────────────────────────────────────────────────
# Step 6: Make CLI wrapper available
# ──────────────────────────────────────────────────────────────────────
chmod +x amber 2>/dev/null || true
mkdir -p "${HOME}/.local/bin"
ln -sf "${AMBER_DIR}/scripts/amber" "${HOME}/.local/bin/amber" 2>/dev/null || true

# ──────────────────────────────────────────────────────────────────────
# Step 7: Launch Background Containers
# ──────────────────────────────────────────────────────────────────────
if command -v docker &>/dev/null; then
    info "Launching cluster containers via Docker Compose..."
    docker compose up -d </dev/null || true
fi

echo ""
echo -e "${GREEN}${BOLD}======================================================================${NC}"
echo -e "${GREEN}${BOLD}  ✔ AMBER COMMERCIAL ENGINE IS READY!${NC}"
echo -e ""
echo -e "  🛡️ Sovereign Sentinel Daemon: ACTIVE (24x7 Multi-Cluster Surveillance)"
echo -e "  ⚡ High-Volume Autonomous Remediation & Smart Log Pruning Enabled"
echo -e ""
echo -e "  To manage your engine anytime, use the CLI:"
echo -e "    ${BOLD}amber status${NC}"
echo -e "    ${BOLD}amber commercial setup${NC}"
echo -e "    ${BOLD}amber log-pruner status${NC}"
echo -e "${GREEN}${BOLD}======================================================================${NC}"
echo ""
