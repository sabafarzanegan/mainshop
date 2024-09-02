import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./drizzle";
import Google from "next-auth/providers/google";
import Github from "next-auth/providers/Github";
export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: DrizzleAdapter(db),

  session: {
    strategy: "jwt",
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
  ],
  secret: "tfg1YcmS0ICmFhetYuQ976ZcZOd5R+fmw762Bu5KDG9ZY2K6uRLEuWyzI6k",
});
