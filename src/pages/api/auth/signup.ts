import { NextApiRequest, NextApiResponse } from 'next';
import { hash, genSalt } from 'bcrypt';
import { nanoid } from 'nanoid';
import connect from '../../../lib/database';

// TODO: implement a way for users to link new credentials to existing an account.
// Warn if credentials is already linked to an account.

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const accountId = await createNewUser(req.body);
  res.send(accountId);
}

export async function createNewUser (user: UserDetails) {
  if (user.credentials.password) {
    user.credentials.password = await encryptPassword(user.credentials.password);
  }
  try {
    const { database } = await connect();
    const accounts = database.collection('accounts');
    const result = await accounts.insertOne(user);
    const newAccountId = result.insertedId as string;
    return newAccountId;
  }
  catch (e) {
    return null;
  }
}

export function generateUsername (name: string) {
  const shortName = name.split(' ')[0];
  const suffix = nanoid().substr(0, 4);
  const uniqueName = `${shortName}_${suffix}`;
  return uniqueName;
}

async function encryptPassword (password: string) {
  const salt = await genSalt();
  const hashedPassword = await hash(password, salt);
  return hashedPassword;
}

export interface UserDetails {
  _id: string
  name: string
  email: string
  image?: any
  shippingAddress?: {
    address?: string
    city?: string
    postalCode?: string
  }
  phoneNumber?: string
  credentials: {
    password?: string
    facebook?: string
    google?: string
  }
}