import path from "node:path";
import dotenv from "dotenv";

// Load environment variables from .env.local
dotenv.config({ path: ".env.local" });

const config = {
  schema: path.join(__dirname, "prisma", "schema.prisma"),
  datasource: {
    url: process.env.DATABASE_URL_UNPOOLED || process.env.DATABASE_URL!,
  },
  migrations: {
    seed: "npx tsx prisma/seed.ts",
  },
};

export default config;
