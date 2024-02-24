import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { loadEnvConfig } from '@next/env';

if (!process.env.SUPABASE_DB_URL) {
	loadEnvConfig(process.cwd(), true); // Never load prod env outside Next.js
}

const connectionString = process.env.SUPABASE_DB_URL!;

export const client = postgres(connectionString, { prepare: false });
export const db = drizzle(client);