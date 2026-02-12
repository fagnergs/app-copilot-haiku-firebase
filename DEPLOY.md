# 🚀 GUIA DE DEPLOY - APP SURVEY CAMPUS

## ⚠️ PRÉ-REQUISITOS

```bash
# 1. Instalar Firebase CLI
npm install -g firebase-tools

# 2. Login
firebase login

# 3. Verificar projeto
firebase projects:list
```

## 🔥 1. CRIAR PROJETO FIREBASE

### Via Console (https://console.firebase.google.com/)
1. Clique em "Criar Projeto" 
2. Nome: `survey-campus-app`
3. Habilitar Google Analytics: NÃO (para MVP rápido)
4. Criar

### Ou via CLI
```bash
firebase projects:create survey-campus-app --display-name="Survey Campus App"
```

## 📋 2. INICIALIZAR FIREBASE NO PROJETO

```bash
cd /Users/fagnergs/Documents/GitHub/app-copilot-haiku-firebase

# Link projeto ao local
firebase use survey-campus-app

# Se necessário, set explicit
firebase use --add
```

## 🔐 3. HABILITAR FIRESTORE

```bash
# Criar Firestore (no console ou via CLI)
firebase firestore:create
```

**Via Console:**
- Firestore Database → Create Database
- Localização: `us-central1` (default é ok)
- Security Rules: "Start in production mode"

## 📂 4. DEPLOYING CLOUD FUNCTIONS

```bash
#Build first
cd functions && npm install && npm run build && cd ..

# Deploy functions
firebase deploy --only functions
```

**URL da API será:**
```
https://us-central1-survey-campus-app.cloudfunctions.net/api
```

## 🌍 5. DEPLOYING FRONTEND (VERCEL)

```bash
cd frontend

# Build Next.js
npm install
npm run build

# Deploy ao Vercel
npm install -g vercel
vercel --prod

# Adicionar variável de ambiente em Vercel Dashboard:
# NEXT_PUBLIC_API_URL=https://us-central1-survey-campus-app.cloudfunctions.net/api
```

**Frontend URL:** `https://seu-nome.vercel.app`

## 📧 6. (OPCIONAL) HABILITAR EMAIL

### Via SendGrid Extension

```bash
firebase ext:install sendgrid/firestore-send-email
```

**Configurar:**
- Coleção: `mail`
- API Key: Sua chave SendGrid

### Ou via Nodemailer (Local)

No functions/src/index.ts, descomentar a função de email:

```typescript
// Usar Nodemailer para enviar
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

await transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: email,
  subject: 'Obrigado por responder!',
  html: `...`
});
```

## 🧪 7. TESTAR LOCALMENTE (ANTES DE DEPLOY)

```bash
# Terminal 1: Frontend
cd frontend
npm run dev
# http://localhost:3000

# Terminal 2: Emulator Firebase
firebase emulators:start
# Firestore: http://localhost:4000
# Functions: http://localhost:5001
```

## 📊 8. VERIFICAR STATUS

```bash
# Ver deployments
firebase deploy:list

# Ver logs
firebase functions:log

# Ver banco de dados
firebase firestore:inspect-schema
```

## 🔗 ENDPOINTS EM PRODUÇÃO

- **API Base:** `https://us-central1-survey-campus-app.cloudfunctions.net/api`
- **Submit Survey:** `POST /api/submit`
- **Admin Login:** `POST /api/login`
- **Get Analytics:** `GET /api/admin/analytics`

## 👤 CREDENCIAIS DEMO

```
Email: admin@demo.com
Password: demo123
```

## 🐛 TROUBLESHOOTING

### ❌ Functions não aparecem
```bash
firebase deploy --only functions --debug
```

### ❌ CORS error
Verificar firebase.json e Cloud Functions headers

### ❌ Firestore sem permissões
Ir em Firestore → Rules e usar production mode temporariamente

## 📝 CHECKLIST DEPLOYMENT

- [ ] Projeto Firebase criado
- [ ] Firestore Database ativado
- [ ] Cloud Functions deployadas
- [ ] Frontend em Vercel
- [ ] Variáveis de ambiente configuradas
- [ ] Email funcionando (SendGrid ou Nodemailer)
- [ ] Testar survey completo
- [ ] Testar admin dashboard
- [ ] Verificar logs

---

**Tempo estimado: 15-30 minutos**

Qualquer dúvida, ver `firebase deploy --help`
