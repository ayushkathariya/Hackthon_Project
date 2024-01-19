import { getServerSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/utils/prisma";
import bcryt from "bcrypt";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        try {
          const userEmail = req.body?.email;
          const userPassword = req.body?.password;

          const user = await prisma.user.findUnique({
            where: {
              email: userEmail,
            },
          });

          if (!user) {
            return null;
          }

          const isPassword = await bcryt.compare(
            userPassword,
            user?.password as any
          );

          if (!isPassword) {
            return null;
          }

          return user as any;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      const user = await prisma.user.findUnique({
        where: {
          email: session?.user.email as any,
        },
      });

      session.user.id = user?.id as string;
      session.user.role = user?.role as any;
      session.user.provider = user?.provider;

      return session;
    },
    async signIn({ user }) {
      const isUserAuthenticated = await prisma.user.findUnique({
        where: {
          email: user?.email as string,
        },
      });

      if (isUserAuthenticated) {
        return true;
      }

      await prisma.user.create({
        data: {
          name: user?.name as string,
          email: user?.email as string,
          image: user?.image as string,
          provider: "Google",
        },
      });

      return true;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export const getAuthSession = () => getServerSession(authOptions);
