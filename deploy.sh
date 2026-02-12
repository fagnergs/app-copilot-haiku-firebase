#!/bin/bash

# Deploy script for survey-campus-app
# Run after Firebase Blaze plan is activated

set -e

echo "🚀 Starting deployment..."

FIREBASE_TOKEN="${FIREBASE_TOKEN:-}"
VERCEL_TOKEN="${VERCEL_TOKEN:-}"

if [ -z "$FIREBASE_TOKEN" ]; then
    echo "❌ FIREBASE_TOKEN not set. Exiting."
    exit 1
fi

echo "📦 Deploying Cloud Functions..."
firebase deploy --only functions --project survey-campus-app --token "$FIREBASE_TOKEN"

echo "✅ Cloud Functions deployed!"
echo "📍 API URL: https://us-central1-survey-campus-app.cloudfunctions.net/api"

echo "🎉 Deployment complete!"
echo ""
echo "📊 Next steps:"
echo "1. Visit admin dashboard: https://your-app.vercel.app/admin/login"
echo "2. Use credentials: admin@demo.com / demo123"
echo "3. Start collecting responses!"
echo ""
echo "📝 Survey URL: https://your-app.vercel.app/survey"
