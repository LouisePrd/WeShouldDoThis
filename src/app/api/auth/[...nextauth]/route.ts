import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectUser } from "@/app/database/queries/users"; // garde ta fonction
import { Session } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id?: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        pseudo: { label: "Pseudo", type: "text" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.pseudo || !credentials?.password) return null;
        const user = await connectUser(credentials.pseudo, credentials.password);
        if (!user) return null;
        return {
          id: user.id_user.toString(),
          name: user.pseudo,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (!session.user) {
        session.user = {};
      }
      session.user.id = typeof token.id === "string" ? token.id : token.id?.toString();
      session.user.name = typeof token.name === "string" ? token.name : null;
      session.user.email = typeof token.email === "string" ? token.email : null;
      session.user.image = typeof token.image === "string" ? token.image : null;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
