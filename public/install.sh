#!/bin/sh
# MIND Compiler + Runtime Installation Script
# https://mindlang.dev
#
# Usage: curl -fsSL https://mindlang.dev/install.sh | sh

set -e

MIND_REPO="https://github.com/star-ga/mind.git"
MIND_VERSION="${MIND_VERSION:-latest}"
INSTALL_DIR="${MIND_INSTALL_DIR:-$HOME/.mind}"
RUNTIME_CDN="https://github.com/star-ga/mind/releases"

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

detect_platform() {
    OS="$(uname -s)"
    ARCH="$(uname -m)"

    case "$OS" in
        Linux)  PLATFORM="linux" ;;
        Darwin) PLATFORM="macos" ;;
        MINGW*|MSYS*|CYGWIN*) PLATFORM="windows" ;;
        *) error "Unsupported OS: $OS" ;;
    esac

    case "$ARCH" in
        x86_64|amd64) ARCH="x64" ;;
        aarch64|arm64) ARCH="aarch64" ;;
        *) error "Unsupported architecture: $ARCH" ;;
    esac

    RUNTIME_FILE="libmind_cpu_${PLATFORM}-${ARCH}"
    case "$PLATFORM" in
        linux)   RUNTIME_FILE="${RUNTIME_FILE}.so" ;;
        macos)   RUNTIME_FILE="${RUNTIME_FILE}.dylib" ;;
        windows) RUNTIME_FILE="${RUNTIME_FILE}.dll" ;;
    esac
}

printf "\n"
printf "${CYAN}========================================${NC}\n"
printf "${CYAN}    MIND Compiler Installation${NC}\n"
printf "${CYAN}  Machine Intelligence Native Design${NC}\n"
printf "${CYAN}========================================${NC}\n"
printf "\n"

detect_platform
info "Platform: ${PLATFORM}-${ARCH}"

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
cargo build --release --features full 2>/dev/null
success "Build complete"

# Install runtime library
MIND_LIB_DIR="$HOME/.mind/lib"
mkdir -p "$MIND_LIB_DIR"

if [ -f "$MIND_LIB_DIR/$RUNTIME_FILE" ]; then
    info "Runtime library already installed at $MIND_LIB_DIR/$RUNTIME_FILE"
else
    # Try to download pre-built runtime from releases
    if [ "$MIND_VERSION" = "latest" ]; then
        RELEASE_URL="${RUNTIME_CDN}/latest/download/${RUNTIME_FILE}"
    else
        RELEASE_URL="${RUNTIME_CDN}/download/v${MIND_VERSION}/${RUNTIME_FILE}"
    fi

    info "Downloading MIND runtime for ${PLATFORM}-${ARCH}..."
    if curl -fsSL -o "$MIND_LIB_DIR/$RUNTIME_FILE" "$RELEASE_URL" 2>/dev/null; then
        chmod +x "$MIND_LIB_DIR/$RUNTIME_FILE"
        success "Runtime installed to $MIND_LIB_DIR/$RUNTIME_FILE"
    else
        warn "Pre-built runtime not available for ${PLATFORM}-${ARCH}"
        warn "mindc eval will work, but mindc build requires the runtime library."
        warn "Contact STARGA (https://star.ga) for runtime access."
    fi
fi

# Create symlinks
MIND_BIN="$INSTALL_DIR/target/release/mindc"
MIND_EVAL_BIN="$INSTALL_DIR/target/release/mind"
LOCAL_BIN="$HOME/.local/bin"

mkdir -p "$LOCAL_BIN"
ln -sf "$MIND_BIN" "$LOCAL_BIN/mindc"
[ -f "$MIND_EVAL_BIN" ] && ln -sf "$MIND_EVAL_BIN" "$LOCAL_BIN/mind"
success "Installed to $LOCAL_BIN/mindc"

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
if command -v mindc >/dev/null 2>&1 || [ -x "$LOCAL_BIN/mindc" ]; then
    success "MIND compiler installed successfully!"
    printf "\n"
    printf "Quick start:\n"
    printf "  mindc --help           # Show commands\n"
    printf "  mind eval 'let x: Tensor[f32,(4)] = 1; x + x'   # Evaluate\n"
    printf "  mindc build hello.mind # Compile to native binary\n"
    printf "\n"
    printf "Documentation: https://mindlang.dev/docs\n"
    if [ -f "$MIND_LIB_DIR/$RUNTIME_FILE" ]; then
        printf "Runtime: $MIND_LIB_DIR/$RUNTIME_FILE\n"
    fi
else
    warn "Installation complete, but 'mindc' not in PATH yet."
    printf "Run: $LOCAL_BIN/mindc --help\n"
fi

printf "${CYAN}========================================${NC}\n"
