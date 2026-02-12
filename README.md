# 🚀 App Copilot + Haiku + Firebase

**Survey de Satisfação do Campus com MVP em Firebase + Next.js**

## 📋 Características

✅ Interface bonita e responsiva (Tailwind CSS)  
✅ 3 perguntas de satisfação do campus  
✅ Autenticação admin com JWT  
✅ Dashboard em tempo real com gráficos  
✅ Firestore database  
✅ Cloud Functions (Express + Node.js)  
✅ Email confirmação automático  
✅ Deploy automático (Vercel + Firebase)  

## 🏗️ Estrutura

```
├── frontend/          (Next.js 14 - Vercel)
│   ├── app/
│   │   ├── page.tsx (Welcome)
│   │   ├── survey/ (3 perguntas)
│   │   └── admin/ (Login + Dashboard)
│   └── package.json
│
├── functions/         (Cloud Functions - Firebase)
│   ├── src/index.ts (Express API)
│   └── package.json
│
├── firebase.json      (Config)
└── firestore.rules    (Security)
```

## ⚙️ Setup Rápido

### 1. Instalar dependências

```bash
# Frontend
cd frontend
npm install

# Backend
cd ../functions
npm install
```

### 2. Configurar Firebase

```bash
# Login
firebase login

# Criar projeto (ou usar existente)
firebase projects:create survey-campus-app

# Link local
firebase use survey-campus-app
```

### 3. Variáveis de Ambiente

**frontend/.env.local**
```
NEXT_PUBLIC_API_URL=http://localhost:5001/survey-campus-app/us-central1/api
```

**functions/.env.local**
```
JWT_SECRET=seu-secret-key
```

### 4. Rodar Localmente

**Terminal 1: Frontend**
```bash
cd frontend
npm run dev
# http://localhost:3000
```

**Terminal 2: Emulator Firebase**
```bash
firebase emulators:start
# http://localhost:4000 (Firestore)
# http://localhost:5001 (Functions)
```

## 🧪 Testar

1. Acesse http://localhost:3000
2. Preencha email e matrícula
3. Responda as 3 perguntas
4. Veja confirmação
5. Acesse admin em http://localhost:3000/admin/login
   - Email: `admin@demo.com`
   - Senha: `demo123`

## 🚀 Deploy

### Firebase Functions

```bash
firebase deploy --only functions
```

### Frontend (Vercel)

```bash
cd frontend
vercel --prod
```

## 📊 Endpoints da API

- `POST /api/submit` - Enviar respostas
- `POST /api/login` - Login admin
- `GET /api/admin/analytics` - Dados para dashboard
- `GET /api/admin/responses` - Lista respostas

## 🔐 Credenciais Demo

- Email: `admin@demo.com`
- Senha: `demo123`

## 📝 Licença

MIT
