import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/Github";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import * as z from "zod";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { findUser } from "../lib/utils";

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),

  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token }) {
      // console.log(session, token);

      if (session && token.sub) {
        session.user.id = token.sub;
      }
      if (session.user && token.role) {
        session.user.role = token.role;
        if (session.user) {
          session.user.isTwoFactorEnabled = token.isTwoFactorEnabled;
          session.user.name = token.name;
          session.user.email = token.email;
          session.user.isOAuth = token.isOAuth;
          session.user.image = token.image;
        }
        return session;
      }
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await db
        .select()
        .from(users)
        .where(eq(users.id, token.sub));
      // console.log(existingUser);

      // const existingUser = await db.query.users.findFirst({
      //   where: eq(users.id, token.sub),
      // });
      // if (!existingUser) return token;
      // const existingAccount = await db.query.accounts.findFirst({
      //   where: eq(accounts.userId, existingUser.id),
      // });

      // token.isOAuth = !!existingAccount;
      token.name = existingUser[0].name;
      token.email = existingUser[0].email;
      token.role = existingUser[0].role;
      token.isTwoFactorEnabled = existingUser[0].twoFactorEnabled;
      token.image = existingUser[0].image;

      return token;
    },
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_SERCRET_ID,
      allowDangerousEmailAccountLinking: true,
    }),
    Github({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_SERCRET_ID,
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        // const validatedFields = LoginSchema.safeParse(credentials);
        // console.log(validatedFields);
        // credentials: {
        //   email: { label: "email" },
        //   password: { label: "Password", type: "password" },
        // },

        if (credentials) {
          const { email, password } = credentials;

          // const user = await db
          //   .select()
          //   .from(users)
          //   .where(eq(users.email, validatedFields.email));
          const user = await findUser(email);
          // console.log(user);

          // if (findingUser.length == 0) return null;

          const passwordMatch = await bcrypt.compare(
            password,
            user[0].password
          );
          // console.log(passwordMatch);

          if (passwordMatch) return user[0];
        } else {
          return null;
        }
      },
    }),
  ],
  secret: "tfg1YcmS0ICmFhetYuQ976ZcZOd5R+fmw762Bu5KDG9ZY2K6uRLEuWyzI6k",
});
