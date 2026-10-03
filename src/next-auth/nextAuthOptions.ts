import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "Log in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter Your Email",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Your Password",
        },
      },
      async authorize(credentials) {
        const response = await fetch(
          `${process.env.API_BASE_URL}/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const payload = await response.json();

        const userData: {
          id: string;
          name: string;
          role: string;
          iat: number;
          exp: number;
        } = jwtDecode(payload.token);

        return {
          id: userData.id,
          email: payload.user.email,
          name: payload.user.name,
          token: payload.token,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        token.token = (user as any).token;
        token.name = user.name;
        token.email = user.email;
        token.id = (user as any).id;
      }

      if (trigger === "update" && session) {
        if (session.name) {
          token.name = session.name;
        }
        if (session.email) {
          token.email = session.email;
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        (session.user as any).id = token.id;
      }

      (session as any).accessToken = token.token;

      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};
