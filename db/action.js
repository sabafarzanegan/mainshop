"use server";

import { eq } from "drizzle-orm";
import { signIn } from "../db/auth";
import { db } from "./drizzle";
import { users } from "./schema";

export const signinwithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const signinwithGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};

export const emailSignin = async (formData) => {
  console.log(formData);
  const email = formData.get("email");
  const password = formData.get("password");
  const existUser = await db.query.user.findFirst({
    where: eq(users.email, email),
  });
  console.log(existUser);
};
