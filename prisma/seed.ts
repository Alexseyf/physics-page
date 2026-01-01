import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import bcrypt from 'bcryptjs';

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const email = 'admin@physicspage.com';
  const password = 'password123';
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.user.upsert({
    where: { email },
    update: {},
    create: {
      email,
      name: 'Admin',
      password: hashedPassword,
      posts: {
        create: {
          title: 'Bem-vindo ao Blog de Física',
          slug: 'bem-vindo-ao-blog',
          content: `
# Olá, Mundo! 👋

Este é o primeiro post do **A Física é Muito Louca**.

## Fórmulas

Aqui testamos o suporte a LaTeX:

A equivalência massa-energia é dada por:

$$
E = mc^2
$$

E a equação de Schrödinger:

$$
i\\hbar \\frac{\\partial}{\\partial t} \\Psi(\\mathbf{r},t) = \\hat{H} \\Psi(\\mathbf{r},t)
$$

Aproveite o conteúdo!
          `.trim(),
          published: true,
          excerpt: 'Primeiro post de teste do blog com suporte a LaTeX.',
        },
      },
    },
  });

  console.log({ user });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
