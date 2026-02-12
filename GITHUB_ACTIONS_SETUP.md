# 🔐 SETUP COM GITHUB ACTIONS & FIREBASE

## 🚀 1. GERAR FIREBASE TOKEN

```bash
# No seu terminal local
firebase login:ci --no-localhost

# Copie o token gerado (parece com: 1//0gP.....)
```

Salve este token! Vamos usar em GitHub.

---

## 📋 2. CRIAR SECRETS NO GITHUB

Vá para: **https://github.com/fagnergs/app-copilot-haiku-firebase/settings/secrets/actions**

Clique em "New repository secret" e adicione:

### 🔑 Secret 1: Firebase Token
- **Name:** `FIREBASE_TOKEN`
- **Value:** `[Cole o token do passo anterior]`
- **↳ Save**

### 🔑 Secret 2: Firebase Service Account (opcional)
```bash
# Se usar Firebase Auth
firebase projects:download-service-account survey-campus-app > service-account.json

# Copie o conteúdo do arquivo
# Crie secret FIREBASE_SERVICE_ACCOUNT com o JSON
```

### 🔑 Secret 3: Next.js API URL
- **Name:** `NEXT_PUBLIC_API_URL`
- **Value:** `https://us-central1-survey-campus-app.cloudfunctions.net/api`
- **↳ Save**

### 🔑 Secret 4: Vercel Token (para frontend deploy)
```bash
# Acesse https://vercel.com/account/tokens
# Gere um token novo
```
- **Name:** `VERCEL_TOKEN`
- **Value:** `[Token do Vercel]`
- **↳ Save**

### 🔑 Secret 5: Vercel Org ID
```bash
# No seu projeto Vercel
# Vá em Settings → General → Project ID
```
- **Name:** `VERCEL_ORG_ID`
- **Value:** `[Seu org ID]`
- **↳ Save**

### 🔑 Secret 6: Vercel Project ID
```bash
# No seu projeto Vercel
# Vá em Settings → General → Project ID
```
- **Name:** `VERCEL_PROJECT_ID`
- **Value:** `[Seu project ID]`
- **↳ Save**

---

## 🔥 3. CRIAR FIREBASE PROJECT

### Opção A: Via Console
1. Acesse https://console.firebase.google.com
2. Clique "+ Add project"
3. Nome: `survey-campus-app`
4. Desabilitar Google Analytics
5. Criar projeto

### Opção B: Via CLI
```bash
firebase projects:create survey-campus-app
```

---

## 📂 4. ATIVAR FIRESTORE

### Via Console:
1. Firebase Console → Firestore Database
2. "Create database"
3. Localização: `us-central1` ou sua preferência
4. Security Rules: "Start in production mode"
5. Create

### Via CLI:
```bash
firebase firestore:create --project survey-campus-app
```

---

## 🎯 5. INICIAR DEPLOYMENTS

Agora que GitHub Actions está configurado, cada push vai:

```
Push → Vercel (Frontend)
     → Firebase Functions (Backend)
     → Firestore Rules (Database)
```

### Teste o Pipeline:

```bash
# Adicione arquivo e push
echo "test" > test.txt
git add test.txt
git commit -m "test: trigger CI"
git push

# Vá para: https://github.com/fagnergs/app-copilot-haiku-firebase/actions
# Veja os workflows rodando
```

---

## ✅ CHECKLIST SETUP

- [ ] Firebase token gerado
- [ ] Secret `FIREBASE_TOKEN` criado no GitHub
- [ ] Projeto Firebase criado (`survey-campus-app`)
- [ ] Firestore database ativado
- [ ] Secret `NEXT_PUBLIC_API_URL` criado
- [ ] Vercel token gerado
- [ ] Secrets Vercel criados no GitHub
- [ ] Primeiro push feito (para testar CI)

---

## 🐛 TROUBLESHOOTING

### ❌ Workflow falha com "Project not found"
```bash
firebase projects:list --token YOUR_TOKEN
# Verifique se survey-campus-app existe
```

### ❌ Vercel deploy falha
```bash
# Verifique se VERCEL_ORG_ID e VERCEL_PROJECT_ID são corretos
vercel projects list --token YOUR_TOKEN
```

### ❌ Firestore permissions error
Vá em Firestore → Rules e use production mode temporariamente

---

## 🚀 RESULTADO

Agora quando você fizer push:

```
git commit -m "feat: new feature"
git push
  ↓
GitHub Actions dispara automaticamente
  ├── Build & Deploy Backend (Firebase)
  ├── Build & Deploy Frontend (Vercel)
  └── Deploy Firestore Rules

  ↓
Em ~5 minutos, tudo está live!
```

---

## 📊 MONITORAR DEPLOYMENTS

### GitHub Actions
https://github.com/fagnergs/app-copilot-haiku-firebase/actions

### Firebase Console
https://console.firebase.google.com/project/survey-campus-app

### Vercel Dashboard
https://vercel.com/dashboard

---

**Pronto! CI/CD automático configurado! 🎉**
