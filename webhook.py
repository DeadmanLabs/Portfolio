#!/usr/bin/env python3
"""
Portfolio Deployment Webhook Server
Listens for deployment requests and triggers the deploy script
"""

import os
import subprocess
import hmac
import hashlib
from flask import Flask, request, jsonify

app = Flask(__name__)

# Security token - CHANGE THIS!
DEPLOY_SECRET = os.environ.get('DEPLOY_SECRET', 'change-this-secret-token-now')
DEPLOY_SCRIPT = '/home/server/Code/Portfolio/deploy.sh'

def verify_signature(payload, signature):
    """Verify the webhook signature"""
    if not signature:
        return False

    # Calculate expected signature
    expected = hmac.new(
        DEPLOY_SECRET.encode(),
        payload,
        hashlib.sha256
    ).hexdigest()

    # Compare signatures
    return hmac.compare_digest(f'sha256={expected}', signature)

@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({'status': 'healthy', 'service': 'portfolio-webhook'}), 200

@app.route('/deploy', methods=['POST'])
def deploy():
    """Deploy endpoint - triggers the deployment script"""

    # Get signature from header
    signature = request.headers.get('X-Deploy-Signature')

    # Verify signature
    if not verify_signature(request.data, signature):
        app.logger.warning('Invalid signature received')
        return jsonify({'error': 'Invalid signature'}), 403

    try:
        # Run deployment script
        app.logger.info('Starting deployment...')
        result = subprocess.run(
            [DEPLOY_SCRIPT],
            capture_output=True,
            text=True,
            timeout=300  # 5 minute timeout
        )

        if result.returncode == 0:
            app.logger.info('Deployment successful')
            return jsonify({
                'status': 'success',
                'message': 'Deployment completed successfully',
                'output': result.stdout
            }), 200
        else:
            app.logger.error(f'Deployment failed: {result.stderr}')
            return jsonify({
                'status': 'error',
                'message': 'Deployment failed',
                'error': result.stderr
            }), 500

    except subprocess.TimeoutExpired:
        app.logger.error('Deployment timed out')
        return jsonify({'error': 'Deployment timed out'}), 500
    except Exception as e:
        app.logger.error(f'Deployment error: {str(e)}')
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    # Run on port 9000, only accessible locally
    app.run(host='127.0.0.1', port=9000, debug=False)
