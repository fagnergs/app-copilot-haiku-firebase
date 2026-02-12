#!/bin/bash

cd /Users/fagnergs/Documents/GitHub/app-copilot-haiku-firebase

echo "📦 Installing Frontend dependencies..."
cd frontend && npm install --legacy-peer-deps

echo "📦 Installing Functions dependencies..."
cd ../functions && npm install

echo "🏗️ Building functions..."
npm run build

echo "✅ Setup complete!"
echo ""
echo "🚀 Next steps:"
echo "  Frontend: cd frontend && npm run dev"
echo "  Backend:  firebase emulators:start"
echo ""
echo "📝 Demo credentials:"
echo "  Email: admin@demo.com"
echo "  Password: demo123"
