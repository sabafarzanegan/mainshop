"use server";

import { signIn } from "../db/auth";


export const signinwithGoogle = async () => {
  await signIn("google", { redirectTo: "/" });
};

export const signinwithGithub = async () => {
    await signIn("github", { redirectTo: "/" });
  };