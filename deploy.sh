#!/bin/bash
# Portfolio Auto-Deploy Script

set -e

REPO_DIR="/home/server/Code/Portfolio"
FRONTEND_DIR="$REPO_DIR/frontend"
LOG_FILE="/var/log/portfolio-deploy.log"

# Function to log messages
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

log "===== Starting deployment ====="

# Navigate to repo directory
cd "$REPO_DIR"

# Pull latest changes
log "Pulling latest changes from GitHub..."
git pull origin main 2>&1 | tee -a "$LOG_FILE"

# Navigate to frontend
cd "$FRONTEND_DIR"

# Install dependencies if package.json changed
log "Installing dependencies..."
npm install 2>&1 | tee -a "$LOG_FILE"

# Build the project
log "Building frontend..."
npm run build 2>&1 | tee -a "$LOG_FILE"

# Fix permissions
log "Setting permissions..."
chmod -R 755 "$FRONTEND_DIR/dist"
chmod 644 "$FRONTEND_DIR/dist"/*.html "$FRONTEND_DIR/dist"/*.svg 2>/dev/null || true

log "===== Deployment complete ====="
log "Portfolio updated successfully!"

exit 0
