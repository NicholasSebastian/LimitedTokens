import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { CallbacksOptions, NextAuthOptions } from 'next-auth';
import Providers from 'next-auth/providers';
import { compare } from 'bcrypt';

import connect from '../../../lib/database';
import { createNewUser, generateUsername } from './signup';

async function queryAccounts (query: any, projection: any) {
  try {
    const { database } = await connect();
    const collection = database.collection('accounts');
    const account = await collection.findOne(query, { projection });
    return account;
  }
  catch (e) {
    return null;
  }
}

async function passwordFromAccountId (accountId: string) {
  const query = { _id: accountId };
  const projection = { _id: false, 'credentials.password': true };
  const account = await queryAccounts(query, projection);
  if (account) {
    return account.credentials.password;
  }
  return null;
}

async function accountIdFromFacebook (profile: any) {
  const query = { 'credentials.facebook': profile.id };
  const projection = { _id: true };
  const account = await queryAccounts(query, projection);
  if (account) {
    const newToken = { accountId: account._id };
    return newToken;
  }
  else {
    const newUser = {
      _id: generateUsername(profile.name),
      name: profile.name,
      email: profile.email,
      image: profile.picture.data.url,
      credentials: {
        facebook: profile.id
      }
    };
    const newAccountId = createNewUser(newUser);
    const newToken = { accountId: newAccountId };
    return newToken;
  }
}

async function accountIdFromGoogle (profile: any) {
  const query = { 'credentials.google': profile.id };
  const projection = { _id: true };
  const account = await queryAccounts(query, projection);
  if (account) {
    const newToken = { accountId: account._id };
    return newToken;
  }
  else {
    const newUser = {
      _id: generateUsername(profile.name),
      name: profile.name,
      email: profile.email,
      image: profile.picture,
      credentials: {
        google: profile.id
      }
    };
    const newAccountId = await createNewUser(newUser);
    const newToken = { accountId: newAccountId };
    return newToken;
  }
}

async function sessionFromAccountId (accountId: string) {
  const query = { _id: accountId };
  const projection = { _id: true, email: true, image: true };
  const account = await queryAccounts(query, projection);
  return account;
}

const credentialsOptions = {
  name: "Credentials",
  authorize: async (credentials: Record<string, string>) => {
    const password = await passwordFromAccountId(credentials.username);
    if (password) {
      const authenticated = await compare(credentials.password, password);
      if (authenticated) {
        const user = { accountId: credentials.username };
        return user;
      }
    }
    return false;
  }
};

const callbacks: CallbacksOptions = {
  jwt: async (token, user: any, account, profile: any) => {
    if (user) {
      if (account.type === 'credentials') {
        token = { accountId: user.accountId };
      }
      else if (account.type === 'oauth') {
        if (account.provider === 'facebook') {
          token = await accountIdFromFacebook(profile);
        }
        else if (account.provider === 'google') {
          token = await accountIdFromGoogle(profile);
        }
      }
    }
    return token;
  },
  session: async (session, token: any): Promise<any> => {
    const account = await sessionFromAccountId(token.accountId);
    if (account) {
      session.user = {
        name: account._id,
        email: account.email,
        image: account.image
      };
      return session;
    }
    return null;
  }
};

const options: NextAuthOptions = {
  providers: [
    Providers.Credentials(credentialsOptions as never),
    Providers.Facebook({
      clientId: process.env.FACEBOOK_ID,
      clientSecret: process.env.FACEBOOK_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET
    })
  ],
  callbacks,
  session: {
    jwt: true,
    maxAge: 7 * 24 * 60 * 60 // 7 Days
  },
  secret: process.env.AUTH_SECRET,
  jwt: { 
    secret: process.env.AUTH_SECRET 
  }
};

export default (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, options);
