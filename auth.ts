import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { cookies } from "next/headers";
import { ROLE_COOKIE, isRole } from "@/lib/roles";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  session: { strategy: "jwt" },
  // Required in production. Generate one with: openssl rand -base64 32
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signup",
  },
  callbacks: {
    // Runs on sign-in (account is set) and on every later session check.
    async jwt({ token, account }) {
      if (account) {
        // The sign-in page stores the chosen account type in a short-lived cookie.
        const chosen = cookies().get(ROLE_COOKIE)?.value;
        token.role = isRole(chosen) ? chosen : "seeker";
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role ?? "seeker";
        session.user.id = token.sub;
      }
      return session;
    },
  },
};
