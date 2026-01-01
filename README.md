# Physics Page

Um Blog de Física Full Stack abrangente construído com **Next.js**, **Prisma**, e **Clean Architecture**. Otimizado para **Vercel** e **Serverless**.

## 🚀 Tech Stack

-   **Frontend**: Next.js 16 (App Router), TailwindCSS, React 19
-   **Backend**: Next.js API Routes (Serverless Functions)
-   **Banco de Dados**: PostgreSQL com Prisma ORM
-   **Validação**: Zod
-   **Renderização Matemática**: KaTeX (via `react-katex` & `rehype-katex`)
-   **Linguagem**: TypeScript

## 📂 Estrutura do Projeto

O projeto segue uma abordagem modular de Clean Architecture dentro de `src/`.

```
src/
├── app/                  # Next.js App Router & API Routes
│   ├── api/              # Backend (Serverless Functions)
│   └── ...               # Pages & Layouts
├── components/           # Componentes React
│   ├── domain/           # Específicos do Domínio (MathRenderer, etc)
│   ├── ui/               # UI Genérica
│   └── layout/           # Componentes de Layout
├── schemas/              # Schemas Zod (Compartilhados)
├── lib/                  # Integrações Externas (Prisma Client)
└── types/                # Definições TypeScript
```

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

Roda o servidor de desenvolvimento padrão do Next.js:

```bash
npm run dev
```

> **Nota**: O servidor roda em `http://localhost:3000`. Rotas de API ficam em `src/app/api`.

### Produção

Compila o app Next.js para produção (compatível com Vercel):

```bash
npm run build
npm start
```

## 📐 Recursos Matemáticos

O blog suporta renderização LaTeX para fórmulas físicas.

-   **Componente**: `<MathRenderer formula="..." block />`
-   **Markdown**: Suporta sintaxe LaTeX padrão `$E=mc^2$` via `react-markdown`.
