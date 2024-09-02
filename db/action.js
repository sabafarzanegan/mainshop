"use server";

import { eq } from "drizzle-orm";
import { signIn } from "../db/auth";
import { db } from "./drizzle";
import { users } from "./schema";
import { createSafeActionClient } from "next-safe-action";
import { z } from "zod";
import { findUser, getUsers } from "../lib/utils";
import bcrypt from "bcrypt";
import {
  generateemailVarifivationToken,
  sendverificationEmail,
} from "./tokens";

export const signinwithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const signinwithGithub = async () => {
  await signIn("github", { redirectTo: "/" });
};

const actionClient = createSafeActionClient();

const formSignin = z.object({
  email: z.string().email({
    message: "email is not invalid",
  }),
  password: z.string().min(8, {
    message: "password is required.",
  }),
});

const formSignup = z.object({
  username: z.string().min(4, {
    message: "username is not invalid",
  }),
  email: z.string().email({
    message: "email is not invalid",
  }),
  password: z.string().min(8, {
    message: "password is required.",
  }),
});
export const emailSignin = actionClient
  .schema(formSignin)
  .action(async ({ parsedInput: { email, password } }) => {
    // const existingUser = await db.query.users.findFirst({
    //   where: eq(users.email, email),
    // });
    // if (existingUser?.email !== email) {
    //   return { error: "email not found" };
    // }
    // if (!existingUser.emailVerified) {
    //   return { error: "email is not verified" };
    // }
    console.log(email, password);
    return { success: email };
  });

export const emailSignup = actionClient.schema(formSignup).action(
  async ({ parsedInput: { username, email, password } }) => {
    const hashpassword = await bcrypt.hash(password, 10);
    // console.log(hashpassword);
    const findingUser = await findUser(email);
    // console.log(findingUser);
    // console.log(findingUser.length);
    if (findingUser.length == 0) {
      await db.insert(users).values({
        name: username,
        password: hashpassword,
        email: email,
      });
      const verificationToken = await generateemailVarifivationToken(email);
      console.log(verificationToken);
      await sendverificationEmail(
        verificationToken[0].email,
        verificationToken[0].token
      );
      return { message: "success" };
    } else {
      return { message: "error" };
    }
  },

  {
    onSuccess: ({ data }) => {
      console.log(data);
    },
  }
);
