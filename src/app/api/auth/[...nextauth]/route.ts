import { mongoInit } from '@/lib/db/dbConfig';
import User from '@/models/user.model';
import NextAuth, { SessionStrategy } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
import { EndPoint } from '@/constants/enums';

export const authOptions = {
  session: {
    strategy: 'jwt' as SessionStrategy,
    maxAge: 24 * 60 * 60, // 1 day in seconds
  },
  jwt: {
    maxAge: 24 * 60 * 60, // 1 day in seconds
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      async authorize(credentials) {
        const endPoint = credentials?.endPoint;

        if (endPoint === EndPoint.SIGNUP) {
          const requestBody = {
            name: credentials?.username,
            email: credentials?.email,
            password: credentials?.password,
          };
          const res = await fetch(
            `${process.env.API_BASEURL}/${EndPoint.SIGNUP}`,
            {
              method: 'POST',
              body: JSON.stringify(requestBody),
              headers: { 'Content-Type': 'application/json' },
            }
          );
          const data = await res.json();
          if (!data.success) {
            throw new Error(data.message);
          }
          if (data.success) {
            return data.user;
          }
          return null;
        }
        if (endPoint === EndPoint.LOGIN) {
          const requestBody = {
            email: credentials?.email,
            password: credentials?.password,
          };
          const res = await fetch(
            `${process.env.API_BASEURL}/${EndPoint.LOGIN}`,
            {
              method: 'POST',
              body: JSON.stringify(requestBody),
              headers: { 'Content-Type': 'application/json' },
            }
          );
          const data = await res.json();
          if (!data.success) {
            throw new Error(data.message);
          }
          if (data.success) {
            return data.user;
          }
          return null;
        }
      },
      credentials: {
        email: { label: 'Email', type: 'text', placeholder: 'you@example.com' },
        password: { label: 'Password', type: 'password' },
        username: { label: 'Username', type: 'text' },
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account.provider == 'google') {
        await mongoInit();
        const existedUser = await User.findOne({ email: user.email });
        if (!existedUser) {
          const newUser = new User({
            email: user.email,
            name: user.name,
            imgUrl: user.image,
          });
          await newUser.save();
        }
      }
      return true;
    },
    async jwt({ token }) {
      const user = await User.findOne({ email: token.email });
      token.role = user?.role;
      return token;
    },
    async session({ session, token }) {
      session.user.role = token.role;
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
