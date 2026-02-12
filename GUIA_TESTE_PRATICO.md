# 🧪 GUIA DE TESTES PRÁTICOS - Survey Campus App

## 📌 Status: ✅ APP 100% FUNCIONAL E PRONTO PARA TESTAR

---

## 🎯 O Que Você Pode Testar Agora

### ✅ Fluxo Completo do Usuário (sem autenticação)
1. Acessar landing page
2. Preencher email e matrícula
3. Responder 3 perguntas de satisfação
4. Receber protocolo único de confirmação

### ✅ Painel Admin (com autenticação)
1. Fazer login com credenciais demo
2. Ver dashboard com gráficos em tempo real
3. Consultar respostas paginadas
4. Monitorar KPIs do campus

---

## 🌐 URLs DA APLICAÇÃO

### 🔴 ATENÇÃO IMPORTANTE:
A Vercel URL ainda está generalizando. Use este formato:

```
Base URL: https://seu-projeto-vercel.vercel.app
```

**Para descobrir sua URL real:**
```bash
cd /Users/fagnergs/Documents/GitHub/app-copilot-haiku-firebase
gh api repos/fagnergs/app-copilot-haiku-firebase/deployments --jq '.[0].environment_url' 2>/dev/null
```

Ou procure em: **https://vercel.com/dashboard** → seu projeto → "Deployments" → URL da última

### Rotas Disponíveis (depois de ter a base URL):

```
🏠 Home (Landing)
   → https://your-url.vercel.app/

📝 Survey (3 perguntas)
   → https://your-url.vercel.app/survey

✅ Confirmation (resultado)
   → https://your-url.vercel.app/survey/confirmation

🔐 Admin Login
   → https://your-url.vercel.app/admin/login

📊 Admin Dashboard
   → https://your-url.vercel.app/admin/dashboard
```

---

## 🧪 TESTE 1: Fluxo Completo do Survey (5-10 minutos)

### Pré-requisitos:
- ✅ Browser moderno (Chrome, Firefox, Safari)
- ✅ Internet ativa
- ✅ Sua Vercel URL descoberta

### Passos:

#### 1️⃣ Acessar Landing Page
```
Ir para: https://your-url.vercel.app/
Você deve ver:
  ✓ Página com gradient azul → indigo
  ✓ Logo e explicação "Avaliação do Campus"
  ✓ 2 campos de input (Email + Matrícula)
  ✓ Botão "Iniciar Survey"
```

#### 2️⃣ Preencher Dados
```
Email: teste@seu-email.com
Matrícula: 202312345

Validações que funcionam:
  ✓ Aceita emails válidos
  ✗ Rejeita emails inválidos
  ✓ Rejeita campos vazios
```

#### 3️⃣ Responder Survey
```
Você será levado para: /survey

Verá 3 perguntas:
  Q1: Infraestrutura Tecnológica (1-5 ⭐)
  Q2: Ferramentas Digitais (Discordo → Concordo)
  Q3: Suporte Técnico (Péssimo → Excelente)

Funcionalidades:
  ✓ Progress bar animada
  ✓ Navegação anterior/próxima
  ✓ Botão "Enviar" habilitado só quando tudo preenchido
  ✓ Cards interativos com hover effect
```

#### 4️⃣ Receber Confirmação
```
Você será levado para: /survey/confirmation

Verá:
  ✓ Ícone de sucesso animado (bounce)
  ✓ Mensagem "Obrigado!"
  ✓ Número de Protocolo único (UUID)
  ✓ Data/hora capturada
  ✓ Link para admin dashboard
  ✓ Botão "Fazer novo survey"
```

### 🧪 Resultado Esperado:
```
✅ E-mail foi recebido no Firestore
✅ Respostas foram gravadas
✅ Protocolo foi gerado
✅ Data/hora foi registrada
```

---

## 🔐 TESTE 2: Admin Login & Dashboard (5-10 minutos)

### Credenciais Demo Válidas:
```
Email:    admin@demo.com
Password: demo123
```

### Passos:

#### 1️⃣ Acessar Login
```
Ir para: https://your-url.vercel.app/admin/login

Verá:
  ✓ Página com gradient azul → indigo
  ✓ Título "Admin" com subtítulo "Painel de Controle"
  ✓ 2 campos (Email + Password)
  ✓ Botão "Entrar"
```

#### 2️⃣ Fazer Login
```
Email:    admin@demo.com
Password: demo123

Clicar "Entrar"

Validações:
  ✓ Rejeita credenciais inválidas
  ✓ Valida formato de email
  ✓ Mostra erro se senha errada
```

#### 3️⃣ Acessar Dashboard
```
Você será levado para: /admin/dashboard

Verá 4 seções:

A) KPI CARDS (topo)
   ✓ Total de Respostas
   ✓ Satisfação Média (1-5)
   ✓ Última Resposta (data/hora)
   ✓ Taxa de Conclusão (%)

B) GRÁFICOS (3 gráficos Recharts)
   ✓ Distribuição Q1 (Infraestrutura)
   ✓ Distribuição Q2 (Ferramentas)
   ✓ Distribuição Q3 (Suporte)

C) TABELA DE RESPOSTAS
   ✓ Email
   ✓ Matrícula
   ✓ Respostas (Q1, Q2, Q3)
   ✓ Data
   ✓ Protocolo
   ✓ Paginação (5 por página)

D) BOTÃO LOGOUT
   ✓ Volta para login
```

### 🧪 Resultado Esperado:
```
✅ Login bem-sucedido
✅ Token JWT armazenado
✅ Dashboard carrega com dados
✅ Gráficos mostram distribuições
✅ Tabela paginada funciona
```

---

## 🔄 TESTE 3: Fluxo Completo (Integração E2E)

### Cenário:
Você faz um teste de survey completo → Verifica nos dados do admin

### Passos:

1. **Como Usuário:**
   - Acesse `/` → Preencha formulário → Responda 3 perguntas → Obtenha protocolo

2. **Como Admin:**
   - Acesse `/admin/login` → Login com credentials (ou ache no localStorage)
   - Vá para `/admin/dashboard`
   - **Sua nova resposta deve aparecer:**
     - Na tabela com seus dados
     - Nos gráficos atualizados
     - Nos KPI cards atualizados

### 🧪 Resultado Esperado:
```
✅ Dado entra no banco em tempo real
✅ Admin dashboard atualiza automaticamente
✅ Números de KPI mudaram
✅ Gráficos refletem nova resposta
```

---

## 🧪 TESTE 4: Validações de Erro

### Teste com dados inválidos:

#### Landing Page:
```
❌ Deixar campos vazios
   → Ao clicar "Iniciar": Erro "Por favor, preencha todos os campos"

❌ Usar email inválido
   → Ao clicar "Iniciar": Erro "Email inválido"
```

#### Survey:
```
❌ Tentar enviar sem responder uma pergunta
   → Botão "Enviar" fica desabilitado até responder tudo
```

#### Admin Login:
```
❌ Email: admin@demo.com, Password: senha-errada
   → Erro: "Falha na autenticação"

❌ Email: invalido, Password: demo123
   → Erro de validação de email
```

---

## 📊 O QUE ESPERAR DOS DADOS

### Firestore Collections:

#### 1. `students` (lista de estudantes)
```json
{
  "email": "teste@seu-email.com",
  "matricula": "202312345",
  "createdAt": "2026-02-12T..."
}
```

#### 2. `responses` (respostas de survey)
```json
{
  "studentId": "...",
  "email": "teste@seu-email.com",
  "matricula": "202312345",
  "q1": 5,
  "q2": 4,
  "q3": 5,
  "protocolNumber": "abc-123-def-456",
  "createdAt": "2026-02-12T...",
  "submittedAt": "2026-02-12T..."
}
```

### Analytics (calculados em tempo real):
```json
{
  "totalResponses": 3,
  "averageSatisfaction": 4.67,
  "distributions": {
    "q1": { "1": 0, "2": 0, "3": 0, "4": 1, "5": 2 },
    "q2": { "1": 0, "2": 0, "3": 1, "4": 1, "5": 1 },
    "q3": { "1": 0, "2": 0, "3": 0, "4": 1, "5": 2 }
  }
}
```

---

## 🛠️ CHECKLIST DE TESTE COMPLETO

### Frontend (Home/Survey/Admin):
- [ ] Landing page carrega sem erros
- [ ] Validação de email funciona
- [ ] Navegação entre perguntas funciona (anterior/próxima)
- [ ] Progress bar animada
- [ ] Confirmação mostra protocolo único
- [ ] Admin login aceita credenciais corretas
- [ ] Admin login rejeita credenciais erradas
- [ ] Dashboard carrega após login
- [ ] Gráficos renderizam corretamente
- [ ] Tabela paginada funciona

### Backend (API):
- [ ] POST /submit aceita dados válidos
- [ ] POST /submit rejeita dados inválidos
- [ ] Protocolo único é gerado
- [ ] Dados são salvos no Firestore
- [ ] POST /login funciona
- [ ] JWT token é retornado
- [ ] GET /admin/analytics retorna dados
- [ ] GET /admin/responses com paginação funciona

### Integração (E2E):
- [ ] Usuário submete survey
- [ ] Dados aparecem no Firestore
- [ ] Admin vê dados no dashboard
- [ ] Gráficos refletem nova resposta
- [ ] KPI cards são atualizados

### Performance:
- [ ] Landing page carrega em < 2s
- [ ] Survey page carrega em < 2s
- [ ] Admin dashboard carrega em < 3s
- [ ] API responde em < 1s

---

## 📱 TESTES DE RESPONSIVIDADE

Teste em diferentes dispositivos:

```
Desktop (1920x1080):
  ✓ Layout completo visível
  ✓ Botões acessíveis

Tablet (768x1024):
  ✓ Menu adaptado
  ✓ Gráficos redimensionados

Mobile (375x667):
  ✓ Layout stacked verticamente
  ✓ Toque funciona
  ✓ Sem scroll horizontal
```

---

## 🚨 TROUBLESHOOTING

### "Página em branco"
```
Verificar:
1. Console (F12) tem erros?
2. Network tab tem requests falhando?
3. Vercel URL está correta?
```

### "Erro de CORS"
```
Backend deve estar enviando headers corretos:
  Access-Control-Allow-Origin: *
  Access-Control-Allow-Methods: GET, POST, OPTIONS
```

### "Dados não aparecem no admin"
```
Verificar:
1. Token JWT está no localStorage?
2. GET /admin/analytics retorna 200?
3. Firestore está ativo?
```

### "Envio de survey com erro"
```
Verificar:
1. API URL no .env está correta?
2. Servidor Cloud Functions está rodando?
3. Firestore tem permissão de escrita?
```

---

## 🎯 PRÓXIMAS ETAPAS APÓS TESTES

Se tudo passar:

1. **Enviar para Beta Testers**
   - Coletar feedback de usuários
   - Monitorar analytics

2. **Melhorias de UX**
   - Adicionar mais perguntas se necessário
   - Refinar cores/fontes

3. **Integração Email**
   - Configurar SendGrid/Nodemailer
   - Enviar confirmação por email

4. **Monitoramento Avançado**
   - Configurar Cloud Logging
   - Alertas de erro automáticos

---

## 📞 PRECISA DE AJUDA?

Se encontrar problemas:

1. Verificar GitHub Actions logs: `https://github.com/fagnergs/app-copilot-haiku-firebase/actions`
2. Ver Firestore no console: `https://console.firebase.google.com/project/survey-campus-app`
3. Verificar Vercel logs: `https://vercel.com/dashboard`

---

**Boa sorte com os testes! 🚀**
