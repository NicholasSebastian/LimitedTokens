import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions, User } from 'next-auth';
import Providers from 'next-auth/providers';
import dbClient from '../../../utils/database';

const credentialsConfig = {
  name: "Credentials",
  authorize: async (credentials: Record<string, string>) => {
    try {
      // await dbClient.connect();
      // const database = dbClient.db("LimitedTokens");
      // const connection = database.collection("accounts");
      
      const user: User = { name: "test", ...credentials };
      return user;
    }
    catch (e) {
      return false;
    }
    finally {
      // dbClient.close();
    }
  }
};

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials(credentialsConfig as never),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60 // 7 Days
  },
  secret: process.env.AUTH_SECRET,
  jwt: { 
    secret: process.env.AUTH_SECRET 
  },
  callbacks: {
    jwt: async (token, user: any) => {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    session: async (session, token: any): Promise<any> => {
      session.accessToken = token.accessToken;
      return session;
    }
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
