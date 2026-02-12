# 🧪 GUIA DE TESTE PRÁTICO - SURVEY CAMPUS APP

## ✅ URL CONFIRMADA: https://survey-campus-app.vercel.app

---

## 🎯 TESTES PRÁTICOS QUE VOCÊ PODE FAZER AGORA

### 🏠 **TESTE 1: Landing Page (1-2 minutos)**

**URL:** https://survey-campus-app.vercel.app/

**O que você vai ver:**
```
┌─────────────────────────────────┐
│  Avaliação do Campus            │
│  "Sua opinião é importante"     │
│                                 │
│  Email Institucional: [input]   │
│  Matrícula: [input]             │
│  [Iniciar Survey] (botão azul)   │
└─────────────────────────────────┘
```

**Testes a fazer:**

1️⃣ **Validação de Email Vazio**
   - Deixar campos em branco
   - Clicar "Iniciar Survey"
   - ✅ Esperado: Mensagem de erro "Por favor, preencha todos os campos"

2️⃣ **Validação de Email Inválido**
   - Email: `teste`
   - Matrícula: `202312345`
   - Clicar "Iniciar Survey"
   - ✅ Esperado: Erro "Email inválido"

3️⃣ **Fluxo Correto**
   - Email: `seu-email@teste.com` (pode ser qualquer email)
   - Matrícula: `202312345` (qualquer número)
   - Clicar "Iniciar Survey"
   - ✅ Esperado: Vai para `/survey`

---

### 📝 **TESTE 2: Página de Survey (3-5 minutos)**

**URL:** https://survey-campus-app.vercel.app/survey

**O que você vai ver:**
```
┌──────────────────────────────────┐
│  Progress: ███░░░ (1/3)          │
│                                  │
│  PERGUNTA 1:                     │
│  Infraestrutura Tecnológica      │
│                                  │
│  [⭐] [⭐⭐] [⭐⭐⭐] ...        │
│                                  │
│  [← Anterior] [Próxima →]        │
└──────────────────────────────────┘
```

**Testes a fazer:**

1️⃣ **Progress Bar Funcionando**
   - Observe a barra de progresso
   - Ela deve aumentar a cada pergunta
   - ✅ Esperado: 1/3 → 2/3 → 3/3

2️⃣ **Navegação Entre Perguntas**
   - Clique em uma opção de resposta (⭐⭐ ou similar)
   - Clique "Próxima →"
   - ✅ Esperado: Vai para pergunta 2
   - Clique "← Anterior"
   - ✅ Esperado: Volta para pergunta 1
   - Sua resposta anterior deve ser lembrada

3️⃣ **3 Perguntas Diferentes**
   - Q1: Infraestrutura (⭐ 1-5)
   - Q2: Ferramentas Digitais (Discordo/Concordo)
   - Q3: Suporte Técnico (Péssimo/Excelente)
   - Responda cada uma

4️⃣ **Botão Enviar**
   - Após responder todas as 3 perguntas
   - Botão "Enviar" fica ativo/colorido
   - ✅ Esperado: Clique "Enviar"

---

### ✅ **TESTE 3: Página de Confirmação (1 minuto)**

**URL:** https://survey-campus-app.vercel.app/survey/confirmation

**O que você vai ver:**
```
┌──────────────────────────────────┐
│  ✓ (ícone animado com bounce)   │
│                                  │
│  Obrigado!                       │
│  Suas respostas foram            │
│  registradas com sucesso         │
│                                  │
│  Número de Protocolo:            │
│  abc-123-def-456-xyz            │
│                                  │
│  Confirmação enviada para:       │
│  seu-email@teste.com             │
│                                  │
│  [Ver Dashboard Admin] [Novo...]│
└──────────────────────────────────┘
```

**Testes a fazer:**

1️⃣ **Protocolo Único**
   - Cada survey recebe um protocolo diferente (UUID)
   - ✅ Esperado: Sequência aleatória tipo: `a1b2c3d4-e5f6-7890-abcd-ef1234567890`

2️⃣ **Email Confirmado**
   - Seu email está exibido
   - ✅ Esperado: Igual ao que você preencheu

3️⃣ **Botão "Fazer Novo Survey"**
   - Clique no botão
   - ✅ Esperado: Volta para `/` (landing page limpa)

---

### 🔐 **TESTE 4: Admin Login (2-3 minutos)**

**URL:** https://survey-campus-app.vercel.app/admin/login

**O que você vai ver:**
```
┌──────────────────────────────────┐
│  Admin                           │
│  Painel de Controle              │
│                                  │
│  Email: [input]                  │
│  Senha: [input]                  │
│  [Entrar] (botão)                │
└──────────────────────────────────┘
```

**Credenciais Demo:**
```
Email:    admin@demo.com
Senha:    demo123
```

**Testes a fazer:**

1️⃣ **Credenciais Inválidas**
   - Email: `admin@demo.com`
   - Senha: `senha-errada`
   - Clicar "Entrar"
   - ✅ Esperado: Erro "Falha na autenticação"

2️⃣ **Credenciais Válidas**
   - Email: `admin@demo.com`
   - Senha: `demo123`
   - Clicar "Entrar"
   - ✅ Esperado: Vai para `/admin/dashboard`

3️⃣ **Token JWT Armazenado**
   - Abrir DevTools (F12)
   - Ir em: Application → Local Storage → `https://survey-campus-app.vercel.app`
   - ✅ Esperado: Ver `adminToken` (uma sequência longa)

---

### 📊 **TESTE 5: Admin Dashboard (5-10 minutos)**

**URL:** https://survey-campus-app.vercel.app/admin/dashboard

**O que você vai ver:**
```
┌─────────────────────────────────────────────────┐
│ ADMIN DASHBOARD - Survey Campus App             │
│                                                 │
│ ┌──────────┬──────────┬──────────┬───────────┐ │
│ │ Total    │ Térmica  │ Última   │ Conclusão│ │
│ │ de Resp  │ Média    │ Resposta │ %        │ │
│ │    X     │   4.2    │  10:30   │   100%   │ │
│ └──────────┴──────────┴──────────┴───────────┘ │
│                                                 │
│ ┌─────────────┐ ┌─────────────┐ ┌────────────┐│
│ │ Gráfico Q1  │ │ Gráfico Q2  │ │ Gráfico Q3 ││
│ │  (barras)   │ │  (barras)   │ │  (barras)  ││
│ └─────────────┘ └─────────────┘ └────────────┘│
│                                                 │
│ ┌────────────────────────────────────────────┐ │
│ │ Email        │ Matricula │ Q1│ Q2│ Q3│ Data│ │
│ │ teste@...    │ 2023-1234 │ 5 │ 4 │ 5 │ 10..│ │
│ │ outro@...    │ 2023-5678 │ 4 │ 4 │ 4 │ 09..│ │
│ │ [◄ Prev] [P1][P2]  [Próx ►]              │ │
│ └────────────────────────────────────────────┘ │
│                                                 │
│                           [Logout]            │
└─────────────────────────────────────────────────┘
```

**Testes a fazer:**

1️⃣ **KPI Cards (Topo)**
   - Total de Respostas: número deve ser > 0
   - Satisfação Média: valor entre 1-5
   - Última Resposta: data/hora recente
   - ✅ Esperado: Todos com dados

2️⃣ **Gráficos Recharts (3 gráficos)**
   - Q1: Distribuição de respostas (1-5 ⭐)
   - Q2: Distribuição (Discordo-Concordo)
   - Q3: Distribuição (Péssimo-Excelente)
   - ✅ Esperado: Barras/cores em cada gráfico

3️⃣ **Tabela Paginada**
   - Deve mostrar 5 respostas por página
   - Cada linha tem: Email, Matrícula, Q1, Q2, Q3, Data, Protocolo
   - ✅ Esperado: Suas respostas aparecem aqui

4️⃣ **Paginação funciona**
   - Se tiver mais de 5 respostas, aparecem botões de próxima página
   - ✅ Esperado: Clique em "Próximo" avança

5️⃣ **Dados em Tempo Real**
   - Abra em 2 abas: uma com survey, outra com dashboard
   - Submeta um survey em uma aba
   - ✅ Esperado: Dashboard atualiza em < 3 segundos

6️⃣ **Logout**
   - Clique botão "Logout"
   - ✅ Esperado: Volta para `/admin/login`
   - ✅ localStorage sai (authToken apaga)

---

## 🔄 **TESTE 6: Fluxo Completo E2E (Integração)**

### Objetivo: 
Fazer um survey e verificar se todos os dados aparecem no admin

### Passos:

1. **Abra 2 abas do navegador:**
   - Aba A: Survey
   - Aba B: Admin Dashboard

2. **Aba A - Faça um survey:**
   ```
   URL: https://survey-campus-app.vercel.app/
   Email: seu-email@teste.com
   Matrícula: 202312345
   Responda: 5, 4, 5 (próximo, próximo, enviar)
   Copie o Protocolo exibido
   ```

3. **Aba B - Verifique admin:**
   ```
   URL: https://survey-campus-app.vercel.app/admin/login
   Login: admin@demo.com / demo123
   ```

4. **Valide os resultados:**
   - [ ] KPI "Total de Respostas" aumentou em 1
   - [ ] KPI "Satisfação Média" mudou (média de 5+4+5 = 4,67)
   - [ ] Seu email aparece na tabela
   - [ ] Protocolo aparece na tabela
   - [ ] Gráficos refletem suas respostas (Q1=5, Q2=4, Q3=5)
   - [ ] Data está correta

### ✅ Resultado Esperado:
```
Survey → Firestore → Admin Dashboard (em tempo real!)
```

---

## 📱 **TESTE 7: Responsividade**

### Teste em diferentes tamanhos:

**Desktop (1920x1080):**
- [ ] Layout completo
- [ ] Gráficos lado a lado
- [ ] Tabela com todas as colunas

**Tablet (768x1024, F12 → iPad):**
- [ ] Componentes adaptados
- [ ] Sem scroll horizontal
- [ ] Botões acessíveis

**Mobile (375x667, F12 → iPhone):**
- [ ] Layout stacked verticalmente
- [ ] Gráficos redimensionados
- [ ] Tabela scrollável (se necessário)
- [ ] Botões com bom tamanho para toque

---

## 🛠️ **TROUBLESHOOTING**

### ❌ "Página em branco"
```
1. Abra DevTools (F12)
2. Vá em "Console"
3. Procure por erro vermelho
4. Copie a mensagem e me avise
```

### ❌ "Erro ao enviar survey"
```
Verificar em DevTools > Network:
- POST /api/submit deve retornar 200
- Se 500: Backend está fora
- Se 400: Validação falhou
```

### ❌ "Admin não mostra dados"
```
1. Verificar localStorage (F12 > Application)
2. adminToken existe? 
3. Se não, login falhou
4. Se sim, GET /api/admin/analytics pode estar com erro
```

### ❌ "Dados não atualizam em tempo real"
```
1. Firestore pode estar com problema de permissão
2. Verificar em: https://console.firebase.google.com
3. Ir em Firestore → Rules
```

---

## ✅ **CHECKLIST FINAL**

### Landing & Survey:
- [ ] Landing page carrega
- [ ] Validação de email funciona
- [ ] Survey carrega após submit
- [ ] 3 perguntas aparecem
- [ ] Progress bar atualiza
- [ ] Navegação anterior/próxima
- [ ] Confirmação com protocolo único

### Admin:
- [ ] Login aceita credenciais corretas
- [ ] Login rejeita incorretas
- [ ] Dashboard carrega após login
- [ ] 4 KPI cards visíveis
- [ ] 3 gráficos renderizam
- [ ] Tabela mostra dados
- [ ] Paginação funciona
- [ ] Logout remove token

### Integração:
- [ ] Survey data → Firestore → Admin (em tempo real)
- [ ] KPI values calculados corretamente
- [ ] Gráficos refletem dados
- [ ] Responsivo em mobile/tablet/desktop

---

## 🎯 **PRÓXIMAS AÇÕES**

Após confirmar tudo funcionando:

1. **Coletar feedback:**
   - UX/UI está bom?
   - Cores adequadas?
   - Muito lento?

2. **Possíveis melhorias:**
   - Adicionar mais perguntas?
   - Mudar design?
   - Integração de email?

3. **Compartilhar com stakeholders:**
   - Enviar URL para testes
   - Coletar respostas reais
   - Monitorar analytics

---

## 🚀 **BOA SORTE! AVISE COMO FOI!**

Se tiver qualquer erro, copie a mensagem do console (F12) e avise! 🧪
