import { PrismaClient } from '@prisma/client';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

const connectionString = process.env.DATABASE_URL;

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Prevent multiple instances of Pool in development
// Note: In serverless, connection pooling is handled by the provider (e.g. Neon, Supabase) or this Pool.
// Detailed global handling for Pool might be needed to avoid connection exhaustion in dev HMR.
// For now, simpler singleton pattern for Client.

const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,

  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
