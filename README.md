# A Física é Muito Louca (Physics Page)

Um Blog de Física Full Stack abrangente e robusto, construído com **Next.js 16**, **Prisma (com Adapter Supabase)**, e **Clean Architecture**.

Otimizado para **Vercel** com arquitetura **Serverless** e **Edge Runtime Compatibility**.

## 🚀 Tech Stack

-   **Frontend**: Next.js 16 (App Router), TailwindCSS, React 19
-   **Backend**: Next.js Server Actions & API Routes
-   **Banco de Dados**: PostgreSQL (Supabase) configurado com `@prisma/adapter-pg`
-   **Autenticação**: NextAuth.js v5 (Auth.js) - *Edge & Server Compatible*
-   **ORM**: Prisma 7
-   **Validação**: Zod
-   **Renderização Matemática**: KaTeX (via `react-katex` & `rehype-katex`) e `react-markdown`

## 📂 Estrutura do Projeto

O projeto utiliza **Route Groups** para separar contextos públicos e privados:

```
src/
├── app/
│   ├── (public)/           # Área Pública (Home, Posts)
│   ├── (admin)/            # Área Administrativa
│   │   ├── login/          # Login Seguro
│   │   └── (protected)/    # Rotas Protegidas (Dashboard, Editor)
│   └── api/                # Auth Endpoints
├── components/
│   ├── admin/              # Editor Markdown/LaTeX
│   └── ...
├── lib/                    # Configurações Singletom (Prisma, Auth)
└── middleware.ts           # Proteção de Rotas (Edge Runtime)
```

## 🛠️ Começando

### Pré-requisitos

-   Node.js (LTS recomendado)
-   Conta no Supabase (ou outro Postgres)

### Configuração de Ambiente

Crie um arquivo `.env` na raiz:

```bash
# Connection String do Postgres (Supabase - Transaction Mode recomendado se disponível, ou Session)
DATABASE_URL="postgresql://user:pass@host:5432/db"

# Segredo para assinatura de tokens (gere um seguro)
AUTH_SECRET="seu-segredo-aqui"
```

### Instalação e Banco de Dados

```bash
# Instalar dependências
npm install

# Sincronizar Schema com o Banco
npx prisma db push
```

### Criando um Admin

Utilize o Prisma Studio para criar seu primeiro usuário (lembre-se de que a senha deve ser hasheada se estiver usando bcrypt manualmente no seed, ou ajuste conforme a lógica de auth):

```bash
npx prisma studio
```

### Desenvolvimento

Rode o servidor de desenvolvimento:

```bash
npm run dev
```

Acesse:
-   **Blog**: `http://localhost:3000`
-   **Admin**: `http://localhost:3000/admin/login`

## 📐 Recursos do Editor

O painel administrativo conta com um editor poderoso:
-   **Markdown GFM**: Cabeçalhos, listas, links.
-   **LaTeX Inline**: Use `$E = mc^2$` para fórmulas na linha.
-   **LaTeX Block**: Use `$$` para blocos matemáticos.
-   **Preview em Tempo Real**: Veja como o post ficará antes de publicar.

## 📦 Deploy

Totalmente configurado para deploy na **Vercel**.
Certifique-se de configurar as variáveis de ambiente (`DATABASE_URL`, `AUTH_SECRET`) no painel da Vercel.
