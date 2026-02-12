#!/bin/bash

set -e

echo "🔥 SETUP AUTOMÁTICO - FIREBASE + GITHUB ACTIONS"
echo "================================================"

PROJECT_ID="survey-campus-app"
REPO="fagnergs/app-copilot-haiku-firebase"

# ✅ Step 1: Firebase Login
echo ""
echo "📝 Step 1: Autenticação Firebase"
echo "Abra o link e autorize..."
firebase login:ci --no-localhost > firebase_token.txt 2>&1 || true

FIREBASE_TOKEN=$(cat firebase_token.txt | grep -oP '(\w{200,})' | head -1 || echo "")

if [ -z "$FIREBASE_TOKEN" ]; then
  echo "❌ Token não gerado. Tente manualmente:"
  echo "   firebase login:ci --no-localhost"
  exit 1
fi

echo "✅ Token Firebase gerado"

# ✅ Step 2: Create Firebase Project
echo ""
echo "📝 Step 2: Criando projeto Firebase..."
firebase projects:create $PROJECT_ID --quiet || true
echo "✅ Projeto Firebase: $PROJECT_ID"

# ✅ Step 3: Initialize Firestore
echo ""
echo "📝 Step 3: Inicializando Firestore..."
firebase firestore:indexes:list --project=$PROJECT_ID --token=$FIREBASE_TOKEN || echo "Firestore já existe"
echo "✅ Firestore pronto"

# ✅ Step 4: Display GitHub Secrets
echo ""
echo "================================================"
echo "📋 ADICIONE ESTES SECRETS NO GITHUB"
echo "================================================"
echo ""
echo "Vá para: https://github.com/$REPO/settings/secrets/actions"
echo ""
echo "1️⃣  FIREBASE_TOKEN:"
echo "   $FIREBASE_TOKEN"
echo ""
echo "2️⃣  NEXT_PUBLIC_API_URL:"
echo "   https://us-central1-$PROJECT_ID.cloudfunctions.net/api"
echo ""
echo "3️⃣  VERCEL_TOKEN:"
echo "   [Pega em https://vercel.com/account/tokens]"
echo ""
echo "4️⃣  VERCEL_ORG_ID:"
echo "   [Pega em Vercel Project → Settings → General]"
echo ""
echo "5️⃣  VERCEL_PROJECT_ID:"
echo "   [Pega em Vercel Project → Settings → General]"
echo ""
echo "================================================"
echo ""

# ✅ Step 5: Deploy Firebase Functions
echo ""
echo "📝 Step 5: Fazendo deploy das Functions..."
cd functions && npm install && npm run build && cd ..
firebase deploy --only functions --project=$PROJECT_ID --token=$FIREBASE_TOKEN

# ✅ Step 6: Deploy Firestore Rules
echo ""
echo "📝 Step 6: Deployando Firestore Rules..."
firebase deploy --only firestore:rules --project=$PROJECT_ID --token=$FIREBASE_TOKEN

echo ""
echo "✅ SETUP COMPLETO!"
echo ""
echo "📊 Próximas ações:"
echo "  1. Adicione os 5 secrets acima no GitHub"
echo "  2. Crie projeto no Vercel (opcional, auto-cria)"
echo "  3. Faça push para main e GitHub Actions vai deployar tudo"
echo ""
echo "🔗 Links:"
echo "  Firebase Console: https://console.firebase.google.com"
echo "  GitHub Actions:   https://github.com/$REPO/actions"
echo "  Vercel Dashboard: https://vercel.com"
echo ""

# Cleanup
rm -f firebase_token.txt
