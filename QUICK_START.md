# ⚡ QUICK START - DEPLOY AUTOMÁTICO

## 🎯 5 PASSOS PARA LIVE EM 30 MINUTOS

### ✅ Passo 1: Gerar Firebase Token (5 min)

```bash
# Execute no seu terminal local
firebase login:ci --no-localhost

# Copie o token exibido (vai aparecer uma URL longa)
# Exemplo: 1//0gP1234567890...
```

**Salve este token!**

---

### ✅ Passo 2: Criar Firebase Project (2 min)

Opção A (Recomendado):
```bash
# No seu terminal
cd ~/Documents/GitHub/app-copilot-haiku-firebase
chmod +x setup-github-actions.sh
./setup-github-actions.sh
```

Opção B (Manual):
```bash
firebase projects:create survey-campus-app
firebase firestore:indexes:list --project=survey-campus-app --token=YOUR_TOKEN
```

---

### ✅ Passo 3: Adicionar 5 Secrets no GitHub (5 min)

Vá para: 
**https://github.com/fagnergs/app-copilot-haiku-firebase/settings/secrets/actions**

Clique "+ New repository secret" para cada um:

#### Secret 1:
```
Name: FIREBASE_TOKEN
Value: [Cole o token do Passo 1]
```

#### Secret 2:
```
Name: NEXT_PUBLIC_API_URL
Value: https://us-central1-survey-campus-app.cloudfunctions.net/api
```

#### Secret 3:
```
Name: VERCEL_TOKEN
Value: [Pega em https://vercel.com/account/tokens → Create Token]
```

#### Secret 4:
```
Name: VERCEL_ORG_ID
Value: [Vá em https://vercel.com/account/teams → Sua org ID]
```

#### Secret 5:
```
Name: VERCEL_PROJECT_ID
Value: [Cria automaticamente ao fazer push, ou pega em Vercel Dashboard]
```

---

### ✅ Passo 4: Fazer Push Inicial (2 min)

```bash
# Volte ao seu projeto
cd ~/Documents/GitHub/app-copilot-haiku-firebase

# Crie arquivo de teste
echo "CI/CD ready" > test.txt

# Commit e push
git add test.txt
git commit -m "ci: trigger github actions"
git push
```

---

### ✅ Passo 5: Monitorar Deploy (16 min)

Vá para: **https://github.com/fagnergs/app-copilot-haiku-firebase/actions**

Veja os 3 workflows rodando:
1. ✅ Deploy Backend (Firebase Functions) - ~5 min
2. ✅ Deploy Frontend (Vercel) - ~7 min
3. ✅ Initialize Firebase - ~2 min

Quando todos ficarem **✅ green**, está LIVE!

---

## 🔗 URLS FINAIS

Após deploy:

**Frontend:** 
```
https://seu-nome.vercel.app
```

**API Backend:**
```
https://us-central1-survey-campus-app.cloudfunctions.net/api
```

**Admin:**
```
https://seu-nome.vercel.app/admin/login
Email: admin@demo.com
Senha: demo123
```

---

## 🎯 O QUE ACONTECE AUTOMATICAMENTE

A cada push para `main`:

```
git push
  ↓
GitHub Actions dispara
  ├─ Build & Deploy Backend →  Firebase Cloud Functions ⚡
  ├─ Build & Deploy Frontend → Vercel 🚀
  └─ Deploy Firestore Rules →  Database 🔒
  ↓
Tudo online em ~15 minutos
  ↓
Visite seu app em https://seu-nome.vercel.app
```

---

## 📊 MONITORAR

### GitHub Actions 🔄
https://github.com/fagnergs/app-copilot-haiku-firebase/actions

### Firebase Console 🔥
https://console.firebase.google.com/project/survey-campus-app

### Vercel Dashboard 🌍
https://vercel.com/dashboard

### Logs em Tempo Real 📝
```bash
# No seu terminal
firebase functions:log --project survey-campus-app --token YOUR_TOKEN
```

---

## ✅ CHECKLIST FINAL

- [ ] Firebase token gerado
- [ ] 5 Secrets adicionados no GitHub
- [ ] Push inicial feito
- [ ] GitHub Actions rodou (veja em /actions)
- [ ] Deploy completou (status verde)
- [ ] Frontend acessível em Vercel
- [ ] Admin dashboard funciona
- [ ] Survey respondível

---

## 🎉 PARABÉNS!

Seu app está **100% AUTOMÁTICO** agora!

Daqui em diante:
```
Edita código
  ↓
git push
  ↓
GitHub Actions faz tudo
  ↓
App online em 15 min
```

**Zero esforço de deploy! 🚀**

---

## 🆘 PRECISA DE AJUDA?

Se algo der errado:

1. **Erro no GitHub Actions?**
   - Vá em Actions → Workflow que falhou → Leia os logs

2. **Erro no Vercel?**
   - Vercel Dashboard → Deployments → Veja erro

3. **Erro no Firebase?**
   - Firebase Console → Functions → Logs

4. **Secret incorreto?**
   - Re-adicione o secret em Settings → Secrets

---

**Tudo pronto? Faça um push e veja a magia acontecer! ✨**
