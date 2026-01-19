#!/bin/bash
# MIND Compiler Installation Script
# https://mindlang.dev
#
# Usage: curl -fsSL https://mindlang.dev/install.sh | sh

set -e

MIND_VERSION="latest"
MIND_REPO="https://github.com/star-ga/mind.git"
INSTALL_DIR="${MIND_INSTALL_DIR:-$HOME/.mind}"

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

info() { echo -e "${CYAN}[INFO]${NC} $1"; }
success() { echo -e "${GREEN}[OK]${NC} $1"; }
warn() { echo -e "${YELLOW}[WARN]${NC} $1"; }
error() { echo -e "${RED}[ERROR]${NC} $1"; exit 1; }

echo ""
echo -e "${CYAN}╔════════════════════════════════════════════╗${NC}"
echo -e "${CYAN}║       MIND Compiler Installation           ║${NC}"
echo -e "${CYAN}║     Machine Intelligence Native Design     ║${NC}"
echo -e "${CYAN}╚════════════════════════════════════════════╝${NC}"
echo ""

# Check for required tools
command -v git >/dev/null 2>&1 || error "git is required but not installed."

# Check for Rust/Cargo
if ! command -v cargo >/dev/null 2>&1; then
    warn "Rust toolchain not found."
    info "Installing Rust via rustup..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
    success "Rust installed"
fi

# Clone or update repository
if [ -d "$INSTALL_DIR" ]; then
    info "Updating existing installation at $INSTALL_DIR..."
    cd "$INSTALL_DIR"
    git pull --quiet
else
    info "Cloning MIND repository..."
    git clone --quiet "$MIND_REPO" "$INSTALL_DIR"
    cd "$INSTALL_DIR"
fi
success "Repository ready"

# Build the compiler
info "Building MIND compiler (this may take a minute)..."
cargo build --release --bin mindc 2>/dev/null
success "Build complete"

# Create symlink
MIND_BIN="$INSTALL_DIR/target/release/mindc"
LOCAL_BIN="$HOME/.local/bin"

mkdir -p "$LOCAL_BIN"
ln -sf "$MIND_BIN" "$LOCAL_BIN/mind"
success "Installed to $LOCAL_BIN/mind"

# Check PATH
if [[ ":$PATH:" != *":$LOCAL_BIN:"* ]]; then
    warn "$LOCAL_BIN is not in your PATH"
    echo ""
    echo "Add this to your shell profile (~/.bashrc, ~/.zshrc, etc.):"
    echo ""
    echo -e "  ${GREEN}export PATH=\"\$HOME/.local/bin:\$PATH\"${NC}"
    echo ""
fi

# Verify installation
echo ""
if command -v mind >/dev/null 2>&1 || [ -x "$LOCAL_BIN/mind" ]; then
    success "MIND compiler installed successfully!"
    echo ""
    echo "Quick start:"
    echo "  mind --help              # Show help"
    echo "  mind examples/hello_tensor.mind --emit-ir"
    echo ""
    echo "Documentation: https://mindlang.dev/docs"
else
    warn "Installation complete, but 'mind' not in PATH yet."
    echo "Run: $LOCAL_BIN/mind --help"
fi

echo -e "${CYAN}════════════════════════════════════════════${NC}"
