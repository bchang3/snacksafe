import type {Config} from "drizzle-kit";
import {loadEnvConfig} from "@next/env";

loadEnvConfig(process.cwd(), process.env.NODE_ENV !== "production");

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.SUPABASE_DB_URL!,
  },
} satisfies Config;
