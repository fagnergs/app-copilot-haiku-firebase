# 🎯 GITHUB ACTIONS + FIREBASE - IMPLEMENTAÇÃO COMPLETA

## ✅ O QUE FOI CRIADO

### 🤖 GitHub Actions Workflows (3 Pipelines)

```
.github/workflows/
├── deploy-backend.yml      # Deploy Cloud Functions
├── deploy-frontend.yml     # Deploy Vercel
└── firebase-init.yml       # Inicializar Firestore
```

**Trigger automático:** Cada push para `main`

---

## 🔄 PIPELINE AUTOMÁTICO

```
┌─────────────────────────────────────┐
│     git push origin main            │
└────────────┬────────────────────────┘
             ↓
   ┌─────────────────────┐
   │  GitHub Actions     │
   │  Dispara 3 jobs     │
   └────────┬────────────┘
            ↓
   ┌────────┴────────────────────┐
   ↓                             ↓
┌──────────────────┐      ┌──────────────────┐
│ Firebase Status  │      │ Vercel Status    │
│ Cloud Functions  │      │ Next.js Frontend │
│ Firestore Rules  │      │ Deployment       │
└──────────────────┘      └──────────────────┘
        ↓                          ↓
    🔄 5 min                    ⌛ 10 min
        ↓                          ↓
    ✅ LIVE                   ✅ LIVE
```

---

## 📁 ARQUIVOS CRIADOS

### Workflows
```
✅ .github/workflows/deploy-backend.yml
   → Triggers: push no /functions
   → Ações: npm install → npm build → firebase deploy

✅ .github/workflows/deploy-frontend.yml  
   → Triggers: push no /frontend
   → Ações: npm install → npm build → vercel deploy

✅ .github/workflows/firebase-init.yml
   → Triggers: push no firebase.json ou firestore.rules
   → Ações: deploy firestore rules + indexes
```

### Documentação
```
✅ QUICK_START.md               → 5 passos para live
✅ GITHUB_ACTIONS_SETUP.md      → Setup detalhado
✅ setup-github-actions.sh      → Script automático
```

### Config Firestore
```
✅ firestore.indexes.json       → Índices otimizados
✅ firestore.rules              → Security rules
```

---

## 🚀 COMO COMEÇAR (5 PASSOS)

### 1. Gerar Firebase Token (3 min)
```bash
firebase login:ci --no-localhost
# Copie o token (será usado em 5 Secrets no GitHub)
```

### 2. Criar Firebase Project (2 min)
```bash
firebase projects:create survey-campus-app
```

### 3. Adicionar 5 Secrets no GitHub (5 min)
```
⚙️ GitHub Settings → Secrets → New secret

FIREBASE_TOKEN              → Token do step 1
NEXT_PUBLIC_API_URL        → https://us-central1-...
VERCEL_TOKEN               → https://vercel.com/tokens
VERCEL_ORG_ID              → Seu org ID
VERCEL_PROJECT_ID          → Auto-criado ou manual
```

### 4. Push Inicial (2 min)
```bash
git add . && git commit -m "ci: setup" && git push
```

### 5. Monitorar Deploy (15 min)
```
GitHub → Actions → Veja workflows rodando
```

---

## ✨ RESULTADO

Após setup:

**Cada push:**
```
git push
  ↓
Automático:
  ✅ Backend deploy (5 min)
  ✅ Frontend deploy (7 min)  
  ✅ Rules deploy (2 min)
  ↓
🎉 APP LIVE em https://seu-projeto.vercel.app
```

---

## 📊 MONITORAMENTO

### Status dos Workflows
```
GitHub → Repository → Actions tab
↓
Verde ✅  = Sucesso
Vermelho ❌ = Falha
Amarelo 🟡 = Em progresso
```

### Logs em Tempo Real
```bash
# Ver logs do backend
firebase functions:log --project survey-campus-app

# Ver deployment do Vercel
vercel logs --project survey-campus-app
```

### Dashboards
```
🔥 Firebase: https://console.firebase.google.com
🚀 Vercel:   https://vercel.com/dashboard
🐙 GitHub:   https://github.com/.../actions
```

---

## 🔐 SECRETS GITHUB (5 REQUIRED)

```
┌─────────────────────────────────────────────────┐
│ FIREBASE_TOKEN                                  │
│ ✓ Gerado via: firebase login:ci                 │
│ ✓ Usado por: deploy-backend.yml                 │
├─────────────────────────────────────────────────┤
│ NEXT_PUBLIC_API_URL                             │
│ ✓ Value: https://us-central1-....firebaseapp.. │
│ ✓ Usado por: deploy-frontend.yml                │
├─────────────────────────────────────────────────┤
│ VERCEL_TOKEN                                    │
│ ✓ Gerado em: https://vercel.com/tokens          │
│ ✓ Usado por: deploy-frontend.yml                │
├─────────────────────────────────────────────────┤
│ VERCEL_ORG_ID                                   │
│ ✓ Encontrado em: Vercel Settings                │
│ ✓ Usado por: deploy-frontend.yml                │
├─────────────────────────────────────────────────┤
│ VERCEL_PROJECT_ID                               │
│ ✓ Encontrado em: Vercel Project Settings        │
│ ✓ Usado por: deploy-frontend.yml                │
└─────────────────────────────────────────────────┘
```

---

## 🎯 FUNCIONALIDADES DO CI/CD

✅ **Deploy automático** → Push = Deploy  
✅ **Firebase Functions** → Backend automático  
✅ **Firestore Rules** → Database seguro  
✅ **Vercel Hosting** → Frontend rápido  
✅ **Environment variables** → Via GitHub Secrets  
✅ **Logs centralizados** → Firebase Console  
✅ **Webhook notifications** → Status checks  

---

## 📋 ESTRUTURA DOS WORKFLOWS

### deploy-backend.yml
```yaml
triggers: push em functions/
steps:
  1. Checkout code
  2. Setup Node 18
  3. npm install (functions)
  4. npm run build
  5. firebase deploy --only functions
resultado: ✅ Backend em us-central1
```

### deploy-frontend.yml
```yaml
triggers: push em frontend/
steps:
  1. Checkout code
  2. Setup Node 18
  3. npm install --legacy-peer-deps
  4. npm run build (Next.js)
  5. vercel --prod
resultado: ✅ Frontend em vercel.app
```

### firebase-init.yml
```yaml
triggers: push em firebase.json/firestore.rules
steps:
  1. Checkout code
  2. firebase deploy --only firestore:rules
  3. firebase deploy --only firestore:indexes
resultado: ✅ Database rules + indexes
```

---

## 🔧 CONFIGURAÇÃO AMBIENTE

### Local (Para testar antes de push)
```bash
cd frontend && npm run dev
# Frontend: localhost:3000

firebase emulators:start
# Backend: localhost:5001
# Firestore: localhost:4000
```

### Produção (Via GitHub Actions)
```
Frontend: vercel.app
Backend: cloudfunctions.net
Database: firestore.google.com
```

---

## ⚡ PERFORMANCE

**Tempo de Deploy:**
- Backend: ~5 minutos
- Frontend: ~7 minutos
- Rules: ~2 minutos
- **Total: ~15 minutos**

**Gatilhos:**
- Frontend: Qualquer mudança em `frontend/`
- Backend: Qualquer mudança em `functions/`
- Rules: Qualquer mudança em `firebase.json` ou `firestore.rules`

---

## ✅ CHECKLIST SETUP

- [ ] Firebase CLI instalado (`npm install -g firebase-tools`)
- [ ] Firebase token gerado (`firebase login:ci --no-localhost`)
- [ ] Projeto Firebase criado (`survey-campus-app`)
- [ ] 5 Secrets adicionados no GitHub
- [ ] Primeiro push feito
- [ ] Workflows aparecem em GitHub Actions
- [ ] Deploy completou com sucesso (✅ verde)
- [ ] App acessível em https://seu-nome.vercel.app

---

## 🆘 TROUBLESHOOTING

### Workflow falha com "Project not found"
```bash
firebase projects:list --token YOUR_TOKEN
# Verifique se survey-campus-app existe
```

### Vercel falha no deploy
```
Vá em: https://vercel.com/dashboard
Clique no projeto → Deployments → Veja erro
```

### Firestore permissions denied
```
Firebase Console → Firestore → Rules
Mude para "production mode" temporariamente
```

### Token expirado
```bash
firebase login:ci --no-localhost
# Regenere o token
# Atualize SECRET FIREBASE_TOKEN no GitHub
```

---

## 📚 DOCUMENTAÇÃO RELACIONADA

1. [QUICK_START.md](QUICK_START.md) - Start em 5 passos
2. [GITHUB_ACTIONS_SETUP.md](GITHUB_ACTIONS_SETUP.md) - Setup detalhado
3. [DEPLOY.md](DEPLOY.md) - Deploy manual (se precisar)
4. [README.md](README.md) - Geral do projeto

---

## 🎉 RESULTADO FINAL

Você tem agora um **sistema CI/CD completo e automático**:

```
✅ Code → GitHub
✅ Detecta mudanças
✅ Compila automaticamente
✅ Testa (opcional)
✅ Faz deploy automático
✅ App live em minutos!
```

**Zero esforço de deploy após setup inicial! 🚀**

---

**Pronto para começar? Vá para [QUICK_START.md](QUICK_START.md)!**
