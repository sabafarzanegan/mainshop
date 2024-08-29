import { config } from "dotenv";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
config({ path: ".env.local" }); // or .env.local
const sql = neon(
  "postgresql://shop1_owner:HRS9kngclsT3@ep-royal-sun-a1rrddce-pooler.ap-southeast-1.aws.neon.tech/shop1?sslmode=require"
);
export const db = drizzle(sql);
