# 📋 Plano de Desenvolvimento - App Satisfação Campus

## 1️⃣ AS 3 PERGUNTAS SUGERIDAS

### Pergunta 1: Infraestrutura Tecnológica
**"Como você avalia a infraestrutura tecnológica (laboratórios, equipamentos, internet Wi-Fi) disponível no campus para seus estudos?"**

Opções:
- ⭐ Muito insatisfeito
- ⭐⭐ Insatisfeito
- ⭐⭐⭐ Neutro
- ⭐⭐⭐⭐ Satisfeito
- ⭐⭐⭐⭐⭐ Muito satisfeito

---

### Pergunta 2: Adoção de Ferramentas Digitais
**"As ferramentas digitais utilizadas nos seus cursos (plataforma de aprendizado, softwares educacionais) facilitam o seu aprendizado?"**

Opções:
- Discordo totalmente
- Discordo
- Neutro
- Concordo
- Concordo totalmente

---

### Pergunta 3: Suporte Técnico e Treinamento
**"O suporte técnico e o treinamento oferecidos pela universidade são adequados para você utilizar as tecnologias no campus?"**

Opções:
- Péssimo
- Ruim
- Regular
- Bom
- Excelente

---

## 2️⃣ STACK TECNOLÓGICO RECOMENDADO

### Frontend
```
✅ React 18 (ou Next.js 14 para melhor SEO/SSR)
✅ TypeScript (type safety)
✅ Vite (build rápido)
✅ Tailwind CSS (styling moderno)
✅ React Hook Form (formulários)
✅ Recharts (gráficos responsivos)
✅ Axios (HTTP client)
```

### Backend
```
✅ Node.js + Express.js (rápido, escalável)
✅ TypeScript (type safety)
✅ PostgreSQL (banco relacional, confiável)
✅ Prisma ORM (queries type-safe)
✅ Nodemailer (envio de emails)
✅ JWT (autenticação)
✅ Zod (validação de schema)
```

### Infraestrutura
```
✅ Docker (containerização)
✅ GitHub Actions (CI/CD)
✅ Vercel ou Railway (deploy frontend)
✅ Render ou Railway (deploy backend)
✅ MongoDB ou PostgreSQL em cloud
```

---

## 3️⃣ ARQUITETURA DO SISTEMA

```
┌─────────────────────────────────────────────────────────┐
│                   USUÁRIO FINAL (Aluno)                 │
└──────────────────────┬──────────────────────────────────┘
                       │
        ┌──────────────┴──────────────┐
        │                             │
   ┌────▼─────┐              ┌──────▼────────┐
   │TELA 1    │              │TELA 2         │
   │Form Resp │              │Confirmação    │
   └────┬─────┘              └──────┬────────┘
        │                           │
        └───────────┬───────────────┘
                    │ (API REST)
        ┌───────────▼────────────┐
        │   BACKEND (Express)    │
        │ - Validação            │
        │ - Persistência BD      │
        │ - Envio Email          │
        └───────────┬────────────┘
                    │
        ┌───────────┴────────────┐
        │   PostgreSQL Database  │
        │ - Respostas            │
        │ - Alunos               │
        │ - Logs                 │
        └────────────────────────┘

┌─────────────────────────────────────────────────────────┐
│                   ADMIN (Professor/Coordenador)         │
└──────────────────────┬──────────────────────────────────┘
                       │
   ┌───────────────────▼──────────────────┐
   │      DASHBOARD ADMIN (Next.js)       │
   │  - Gráficos em Tempo Real            │
   │  - Filtros por período/curso         │
   │  - Download de relatórios (CSV/PDF)  │
   │  - Análise de tendências             │
   └───────────────────┬──────────────────┘
                       │ (API REST + WebSocket)
        ┌──────────────▼───────────────┐
        │   BACKEND (Express)          │
        │ - Agregação de dados         │
        │ - Estatísticas               │
        │ - Autenticação Admin         │
        └─────────────────────────────┘
```

---

## 4️⃣ MODELO DE BANCO DE DADOS

```sql
-- Tabela de Alunos
CREATE TABLE students (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  matricula VARCHAR(50),
  curso VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Respostas
CREATE TABLE responses (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES students(id),
  question_1 INTEGER (1-5), -- Infra
  question_2 INTEGER (1-5), -- Ferramentas
  question_3 INTEGER (1-5), -- Suporte
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de Logs de Email
CREATE TABLE email_logs (
  id UUID PRIMARY KEY,
  student_id UUID NOT NULL REFERENCES students(id),
  email_sent_at TIMESTAMP,
  status VARCHAR(50), -- 'sent', 'failed'
  error_message TEXT
);

-- Tabela de Admins
CREATE TABLE admins (
  id UUID PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  role VARCHAR(50), -- 'admin', 'professor'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## 5️⃣ ESTRUTURA DE PASTAS

```
app-copilot/
├── frontend/
│   ├── src/
│   │   ├── pages/
│   │   │   ├── index.tsx (Tela inicial)
│   │   │   ├── survey.tsx (Formulário)
│   │   │   ├── confirmation.tsx (Confirmação)
│   │   │   ├── dashboard/ (Admin)
│   │   │   │   ├── index.tsx (Dashboard)
│   │   │   │   └── analytics.tsx (Gráficos)
│   │   │   └── login.tsx (Admin Login)
│   │   ├── components/
│   │   │   ├── SurveyForm.tsx
│   │   │   ├── Chart.tsx
│   │   │   ├── QuestionCard.tsx
│   │   │   ├── AdminNavbar.tsx
│   │   │   └── LoadingSpinner.tsx
│   │   ├── services/
│   │   │   └── api.ts (Axios config)
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   └── useSurvey.ts
│   │   └── styles/
│   │       └── globals.css
│   ├── package.json
│   ├── next.config.js
│   └── tsconfig.json
│
├── backend/
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── surveyController.ts
│   │   │   ├── authController.ts
│   │   │   └── analyticsController.ts
│   │   ├── routes/
│   │   │   ├── survey.ts
│   │   │   ├── auth.ts
│   │   │   └── analytics.ts
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts
│   │   │   └── errorHandler.ts
│   │   ├── services/
│   │   │   ├── emailService.ts
│   │   │   ├── surveyService.ts
│   │   │   └── analyticsService.ts
│   │   ├── prisma/
│   │   │   └── schema.prisma
│   │   ├── utils/
│   │   │   ├── validators.ts
│   │   │   └── logger.ts
│   │   └── app.ts (Express setup)
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

---

## 6️⃣ FLUXO DE RESPOSTA

```
┌─────────────────────────────────────────────────────┐
│ 1. ALUNO ACESSA O APP                               │
│    - Tela de Welcome com explicação                 │
│    - Entra email e matricula                        │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│ 2. ALUNO RESPONDE O FORMULÁRIO                      │
│    - 3 perguntas com opcoes visuais (radio/select)  │
│    - Progress bar mostrando progresso               │
│    - Botão "Enviar Respostas"                       │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│ 3. VALIDAÇÃO NO BACKEND                             │
│    - Verifica se email é válido                     │
│    - Valida todas as respostas                      │
│    - Retorna erro ou sucesso                        │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│ 4. PERSISTÊNCIA NO BANCO                            │
│    - Insere estudante (se novo)                     │
│    - Insere respostas                               │
│    - Retorna ID da resposta                         │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│ 5. ENVIO DE EMAIL                                   │
│    - Template HTML com resumo das respostas         │
│    - Número de protocolo                            │
│    - Data e hora da resposta                        │
│    - Log no banco de dados                          │
└──────────────┬──────────────────────────────────────┘
               │
┌──────────────▼──────────────────────────────────────┐
│ 6. TELA DE CONFIRMAÇÃO                              │
│    - "Obrigado por responder!"                      │
│    - Email será enviado em breve                    │
│    - Botão "Voltar" ou "Novo Formulário"            │
└─────────────────────────────────────────────────────┘
```

---

## 7️⃣ TELAS NECESSÁRIAS

### Usuário Final (3 telas)
1. **Tela Inicial / Bem-vindo**
   - Logo da universidade
   - Explicação breve do survey
   - Campo Email
   - Campo Matrícula (ou número de estudante)
   - Botão "Começar"

2. **Tela do Formulário**
   - Pergunta 1 com 5 opções (stars/radio)
   - Pergunta 2 com 5 opções
   - Pergunta 3 com 5 opções
   - Progress bar (33%, 66%, 100%)
   - Botão "Próxima" e "Anterior"
   - Botão "Enviar"

3. **Tela de Confirmação**
   - Ícone de sucesso (checkmark)
   - Mensagem de agradecimento
   - Número de protocolo
   - "Um email de confirmação foi enviado para: aluno@email.com"
   - Botão "Voltar ao início"

### Admin (2 telas)
1. **Tela de Login**
   - Email
   - Senha
   - Botão "Entrar"

2. **Dashboard Admin**
   - Header com nome do admin + logout
   - 4 Cards com KPIs:
     * Total de respostas
     * Taxa de satisfação média
     * Última resposta (tempo)
     * Tendência (↑ ou ↓)
   - 3 Gráficos (um por pergunta):
     * Gráfico de barras com distribuição
     * Percentual de cada opção
     * Filtro por período/curso
   - Tabela com todas as respostas (paginada):
     * Email aluno
     * Respostas
     * Data
     * Opção de deletar/exportar
   - Botão "Exportar CSV"

---

## 8️⃣ ENDPOINTS DA API

### Public Endpoints
```
POST /api/survey/submit
  - Body: { email, matricula, q1, q2, q3 }
  - Response: { success, protocolNumber, message }

POST /api/survey/validate
  - Body: { email }
  - Response: { isValid, message }
```

### Admin Endpoints (requer JWT)
```
GET /api/admin/login
  - Body: { email, password }
  - Response: { token, user }

GET /api/admin/responses
  - Query: ?page=1&limit=20&startDate=...&endDate=...
  - Response: { total, page, data: [...] }

GET /api/admin/analytics
  - Query: ?period=week|month|year
  - Response: { 
      totalResponses,
      averageSatisfaction,
      questionStats: [...]
    }

GET /api/admin/export-csv
  - Query: ?startDate=...&endDate=...
  - Response: CSV file

DELETE /api/admin/responses/:id
  - Response: { success, message }
```

---

## 9️⃣ TIMELINE DE DESENVOLVIMENTO (realista)

### 1. Setup Inicial (30min)
- [ ] Inicializar backend (Express + Prisma)
- [ ] Inicializar frontend (Next.js)
- [ ] Setup banco de dados (PostgreSQL local)
- [ ] Configurar variáveis de ambiente

### 2. Backend Core (2h)
- [ ] Models Prisma + Migrations
- [ ] Controller de Survey
- [ ] Validações com Zod
- [ ] Service de Email
- [ ] Controller de Analytics
- [ ] Auth middleware + login admin

### 3. Frontend UX (2h)
- [ ] Tela inicial com formulário
- [ ] Componente de pergunta reutilizável
- [ ] Tela de confirmação
- [ ] Conectar ao backend
- [ ] Tratamento de erros

### 4. Dashboard Admin (2h)
- [ ] Login page
- [ ] Layout admin (navbar, sidebar)
- [ ] Cards de KPI
- [ ] Gráficos com Recharts
- [ ] Tabela de respostas
- [ ] Filtros e exportação

### 5. Polishing & Deploy (1h)
- [ ] Testes básicos
- [ ] Deploy backend (Render/Railway)
- [ ] Deploy frontend (Vercel)
- [ ] Email template final
- [ ] Documentação

---

## 🔟 VARIÁVEIS DE AMBIENTE NECESSÁRIAS

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/survey_db
JWT_SECRET=sua_chave_secreta_aqui
NODEMAILER_EMAIL=seu_email@gmail.com
NODEMAILER_PASSWORD=sua_senha_app_google
NODEMAILER_HOST=smtp.gmail.com
FRONTEND_URL=http://localhost:3000
NODE_ENV=development
PORT=3001
```

### Frontend (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_APP_NAME=Survey Campus
```

---

## 📊 MÉTRICAS DE SUCESSO

✅ Aplicação rodando localmente em 4h
✅ 100+ respostas coletadas
✅ Email enviado com sucesso
✅ Dashboard mostrando dados em tempo real
✅ Deploy em produção funcionando

---

## 🚀 PRÓXIMOS PASSOS

1. ✅ **Aprovar este plano**
2. ⏳ **Setup inicial dos projetos**
3. ⏳ **Implementação backend**
4. ⏳ **Implementação frontend**
5. ⏳ **Testes e deploy**

---

**Está pronto para começar? 🚀**
