# Portfolio Auto-Deployment Setup

## Overview

Your portfolio now has automatic deployment configured! When you push to the `main` branch, a GitHub Action will trigger the deployment webhook on your server.

## System Components

### 1. Deployment Script
**Location:** `/home/server/Code/Portfolio/deploy.sh`

This script:
- Pulls latest changes from GitHub
- Installs npm dependencies
- Builds the frontend
- Updates file permissions
- Logs all actions to `/var/log/portfolio-deploy.log`

### 2. Webhook Server
**Location:** `/home/server/Code/Portfolio/webhook.py`
**Service:** `portfolio-webhook.service`
**Port:** 9000 (internal only)
**Endpoints:**
- `GET /health` - Health check
- `POST /deploy` - Trigger deployment

The webhook server runs as a systemd service and automatically restarts if it crashes.

### 3. Public Endpoint
**URL:** `https://mmagahey.com/webhook/deploy`

Caddy proxies webhook requests to the internal Flask server.

### 4. GitHub Action
**Location:** `.github/workflows/deploy.yml`

Automatically triggers on pushes to `main` branch.

## Setup Instructions

### Step 1: Add Secret to GitHub

1. Go to your repository: https://github.com/DeadmanLabs/Portfolio
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret**
4. Name: `DEPLOY_SECRET`
5. Value: `6d49e63d6886b89dc79ab867eda0b81fa4f960c0f0dbbc0ecaccfd03e76209b2`
6. Click **Add secret**

### Step 2: Commit the GitHub Action

The workflow file is already created at `.github/workflows/deploy.yml`.

Commit and push it:

```bash
cd /home/server/Code/Portfolio
git add .github/workflows/deploy.yml
git commit -m "Add auto-deployment workflow"
git push origin main
```

### Step 3: Test the Deployment

Make any change and push:

```bash
echo "# Test" >> README.md
git add README.md
git commit -m "Test auto-deployment"
git push origin main
```

Watch the GitHub Actions tab in your repository to see the deployment run!

## Manual Deployment

You can also trigger deployment manually:

### From the server:
```bash
/home/server/Code/Portfolio/deploy.sh
```

### Using curl:
```bash
# Calculate signature
PAYLOAD='{"manual": true}'
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "6d49e63d6886b89dc79ab867eda0b81fa4f960c0f0dbbc0ecaccfd03e76209b2" | sed 's/^.* //')

# Trigger deployment
curl -X POST \
  -H "Content-Type: application/json" \
  -H "X-Deploy-Signature: sha256=$SIGNATURE" \
  -d "$PAYLOAD" \
  https://mmagahey.com/webhook/deploy
```

## Monitoring

### Check webhook service status:
```bash
sudo systemctl status portfolio-webhook
```

### View deployment logs:
```bash
tail -f /var/log/portfolio-deploy.log
```

### Test webhook health:
```bash
curl https://mmagahey.com/webhook/health
```

## Troubleshooting

### Deployment fails
1. Check logs: `tail -100 /var/log/portfolio-deploy.log`
2. Check webhook service: `sudo systemctl status portfolio-webhook`
3. Check Caddy: `sudo systemctl status caddy`

### GitHub Action fails
1. Check the Actions tab in GitHub
2. Verify the `DEPLOY_SECRET` is set correctly
3. Test the webhook endpoint: `curl https://mmagahey.com/webhook/health`

### Webhook not responding
1. Restart the service: `sudo systemctl restart portfolio-webhook`
2. Check if port 9000 is listening: `sudo ss -tlnp | grep 9000`
3. Check Caddy logs: `sudo journalctl -u caddy -n 50`

## Security

- The webhook uses HMAC-SHA256 signature verification
- Deploy secret: `6d49e63d6886b89dc79ab867eda0b81fa4f960c0f0dbbc0ecaccfd03e76209b2`
- Webhook only runs on localhost (port 9000)
- Public access only through Caddy reverse proxy
- Deployment runs as the `server` user

## Files Reference

```
/home/server/Code/Portfolio/
├── deploy.sh                    # Deployment script
├── webhook.py                   # Webhook server
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Action
├── DEPLOYMENT.md               # This file
└── frontend/
    └── dist/                   # Built site (served by Caddy)

/etc/systemd/system/
└── portfolio-webhook.service   # Webhook systemd service

/etc/caddy/
└── Caddyfile                   # Caddy configuration

/var/log/
└── portfolio-deploy.log        # Deployment logs
```

---

**Your portfolio is now fully automated! 🚀**

Push to main → GitHub Action runs → Webhook triggered → Site deployed!
