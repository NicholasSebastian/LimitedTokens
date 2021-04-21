import { NextApiRequest, NextApiResponse } from 'next';
import { hash, genSalt } from 'bcrypt';
import { nanoid } from 'nanoid';
import connect from '../../../lib/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const accountId = await createNewUser(req.body);
  res.send(accountId);
}

export async function createNewUser (user: UserDetails) {
  try {
    const { database } = await connect();
    const accounts = database.collection('accounts');
    const newUser = { ...user, password: encryptPassword(user.credentials.password) };
    const result = await accounts.insertOne(newUser);
    return result.insertedId as string;
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

interface UserDetails {
  _id: string
  name: string
  email: string
  image: any
  shippingAddress?: {
    address?: string
    city?: string
    postalCode?: string
  }
  phoneNumber?: string
  socialMedia?: string
  credentials: {
    password?: string
    facebook?: string
    google?: string
  }
}