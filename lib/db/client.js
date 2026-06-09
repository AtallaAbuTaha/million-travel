import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

let cachedDb;

export function hasDatabase() {
  return Boolean(process.env.DATABASE_URL);
}

export function getDb() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is not configured.');
  }

  if (!cachedDb) {
    const client = postgres(process.env.DATABASE_URL, {
      max: 1,
      prepare: false,
    });
    cachedDb = drizzle(client, { schema });
  }

  return cachedDb;
}
