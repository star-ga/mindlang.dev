#!/bin/sh
# MIND Compiler Installation Script
# https://mindlang.dev
#
# Usage: curl -fsSL https://mindlang.dev/install.sh | sh

set -e

MIND_REPO="https://github.com/star-ga/mind.git"
INSTALL_DIR="${MIND_INSTALL_DIR:-$HOME/.mind}"

# Colors (POSIX compatible)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

info() { printf "${CYAN}[INFO]${NC} %s\n" "$1"; }
success() { printf "${GREEN}[OK]${NC} %s\n" "$1"; }
warn() { printf "${YELLOW}[WARN]${NC} %s\n" "$1"; }
error() { printf "${RED}[ERROR]${NC} %s\n" "$1"; exit 1; }

printf "\n"
printf "${CYAN}========================================${NC}\n"
printf "${CYAN}    MIND Compiler Installation${NC}\n"
printf "${CYAN}  Machine Intelligence Native Design${NC}\n"
printf "${CYAN}========================================${NC}\n"
printf "\n"

# Check for required tools
command -v git >/dev/null 2>&1 || error "git is required but not installed."

# Check for Rust/Cargo
if ! command -v cargo >/dev/null 2>&1; then
    warn "Rust toolchain not found."
    info "Installing Rust via rustup..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    . "$HOME/.cargo/env"
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
case ":$PATH:" in
    *":$LOCAL_BIN:"*) ;;
    *)
        warn "$LOCAL_BIN is not in your PATH"
        printf "\n"
        printf "Add this to your shell profile (~/.bashrc, ~/.zshrc, etc.):\n"
        printf "\n"
        printf "  ${GREEN}export PATH=\"\$HOME/.local/bin:\$PATH\"${NC}\n"
        printf "\n"
        ;;
esac

# Verify installation
printf "\n"
if command -v mind >/dev/null 2>&1 || [ -x "$LOCAL_BIN/mind" ]; then
    success "MIND compiler installed successfully!"
    printf "\n"
    printf "Quick start:\n"
    printf "  mind --help\n"
    printf "  mind examples/hello_tensor.mind --emit-ir\n"
    printf "\n"
    printf "Documentation: https://mindlang.dev/docs\n"
else
    warn "Installation complete, but 'mind' not in PATH yet."
    printf "Run: $LOCAL_BIN/mind --help\n"
fi

printf "${CYAN}========================================${NC}\n"
