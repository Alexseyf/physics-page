# Physics Page

Um Blog de Física Full Stack abrangente construído com **Next.js**, **Express**, **Prisma**, e **Clean Architecture**.

## 🚀 Tech Stack

-   **Frontend**: Next.js 16 (App Router), TailwindCSS, React 19
-   **Backend**: Node.js + Express Custom Server
-   **Banco de Dados**: PostgreSQL com Prisma ORM
-   **Validação**: Zod
-   **Renderização Matemática**: KaTeX (via `react-katex` & `rehype-katex`)
-   **Linguagem**: TypeScript

## 📂 Estrutura do Projeto

O projeto segue uma abordagem modular de Clean Architecture dentro de `src/`.

```
src/
├── app/                  # Next.js App Router (Camada de Visualização)
├── server/               # Lógica de Backend Express
│   ├── controllers/      # Controladores de Rota
│   ├── routers/          # Roteadores Express
│   ├── services/         # Regras de Negócio
│   └── middleware/       # Middlewares Express
├── components/           # Componentes React
│   ├── domain/           # Específicos do Domínio (MathRenderer, etc)
│   ├── ui/               # UI Genérica
│   └── layout/           # Componentes de Layout
├── schemas/              # Schemas Zod (Compartilhados)
├── lib/                  # Integrações Externas
└── types/                # Definições TypeScript
```

`server.ts` na raiz atua como o ponto de entrada, orquestrando tanto a API Express quanto o frontend Next.js.

## 🛠️ Começando

### Pré-requisitos

-   Node.js (LTS recomendado)
-   npm

### Instalação

```bash
npm install
```

### Configuração do Banco de Dados

Inicialize seu banco de dados Prisma:

```bash
npx prisma init
# Configure o .env com sua DATABASE_URL
npx prisma db push
```

### Desenvolvimento

Roda o servidor customizado usando `ts-node`:

```bash
npm run dev
```

> **Nota**: O servidor roda em `http://localhost:3000`. Rotas de API devem ser definidas em `src/server` e montadas no `server.ts`.

### Produção

Compila tanto o app Next.js quanto o servidor, e então inicia o processo Node de produção:

```bash
npm run build
npm start
```

## 📐 Recursos Matemáticos

O blog suporta renderização LaTeX para fórmulas físicas.

-   **Componente**: `<MathRenderer formula="..." block />`
-   **Markdown**: Suporta sintaxe LaTeX padrão `$E=mc^2$` via `react-markdown`.

## ⚠️ Importante

Como usamos um **Custom Server**, este projeto é otimizado para deploy em **Container/VPS** (Docker, Google Cloud Run), e não para Vercel Serverless Functions padrão.
