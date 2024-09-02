import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { db } from "../db/drizzle";
import { users } from "../db/schema";
import { eq } from "drizzle-orm";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export async function getUsers() {
  const data = await db.select().from(users);
  return data;
  // const user = await db.query.users.findFirst();
}

export async function findUser(email) {
  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  return existingUser;
}
