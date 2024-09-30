import NextAuth, { NextAuthOptions, Session, User } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { JWT } from "next-auth/jwt";

const prisma = new PrismaClient();

interface CustomSession extends Session {
  user: {
    id: string;
  } & Session["user"];
}

const handler = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.AUTH_GITHUB_ID as string,
      clientSecret: process.env.AUTH_GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID as string, 
      clientSecret: process.env.AUTH_GOOGLE_SECRET as string,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: User }) {
      if (user?.id) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      const customSession = session as CustomSession;
      if (customSession.user) {
        customSession.user.id = token.id as string;
      }
      return customSession;
    },
  },
  secret: process.env.AUTH_GITHUB_SECRET as string,
  debug: true,
} as NextAuthOptions);

export { handler as GET, handler as POST };
