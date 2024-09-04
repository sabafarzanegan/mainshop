"use server";
import { eq } from "drizzle-orm";
import { db } from "./drizzle";
import { emailTokens, users } from "./schema";
import { Resend } from "resend";
import { findUser } from "../lib/utils";
const getverificationToken = async (email) => {
  try {
    const verificationToken = await db
      .select()
      .from(emailTokens)
      .where(eq(emailTokens.token, email));
    return verificationToken;
  } catch (error) {
    return null;
  }
};
export const generateemailVarifivationToken = async (email) => {
  const token = crypto.randomUUID();
  //   const expires = new Date(new Date.getTime() + 37600 * 1000);
  const expires = new Date(new Date().getTime() + 3600 * 1000);

  const existingToken = await getverificationToken(email);

  if (existingToken.length > 0) {
    await db.delete(emailTokens).where(eq(emailTokens.id, existingToken.id));
  }

  const verificationToken = await db
    .insert(emailTokens)
    .values({
      email: email,
      token: token,
      expires: expires,
    })
    .returning();
  return verificationToken;
};

const resend = new Resend(process.env.RESEND_API_KEY);
export const sendverificationEmail = async (email, token) => {
  const confirmLink = `http://localhost:3000/auth/new-verification?token=${token}`;
  const { data, error } = await resend.emails.send({
    from: "Acme <onboarding@resend.dev>",
    to: email,
    subject: "سلام از فروشگاه",
    html: `<p>Click to <a href=${confirmLink}>ایمیل خود را تایید کنید</a></p>`,
  });
  if (error) console.log(error);
  if (data) return data;
};

export const newverification = async (token) => {
  const existingtoken = await getverificationToken(token);
  console.log(existingtoken);

  if (existingtoken.length == 0) {
    return { error: "token not found" };
  }
  const hasexpired = new Date(existingtoken.expires) < new Date();
  console.log(hasexpired);

  if (hasexpired) {
    return { error: "token has expired" };
  }

  const existinguser = await findUser(existingtoken[0].email);
  console.log(existinguser);

  if (existinguser.length == 0) {
    return { error: "email does not exist" };
  } else {
    await db
      .update(users)
      .set({
        emailVerified: new Date(),
        email: existingtoken.email,
      })
      .where(eq(users.email, existingtoken.email));
    await db.delete(emailTokens).where(eq(emailTokens.id, existingtoken.id));
    return { success: "email verified" };
  }
};
