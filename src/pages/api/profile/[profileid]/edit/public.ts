import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import { Db } from 'mongodb';

import connect from '../../../../../lib/database';

async function checkAvailability (username: string, database: Db) {
  const query = { _id: username };
  try {
    const accounts = database.collection("accounts");
    const exists = await accounts.findOne(query);
    return !exists;
  }
  catch (e) {
    return false;
  }
}

async function updateAccount (accountId: string, newData: IPublicInfo, database: Db) {
  const { username, name, description, socialMedia } = newData;
  const query = { _id: accountId };
  try {
    const accounts = database.collection('accounts');
    if (accountId === username) {
      const data = { name, description, socialMedia };
      await accounts.updateOne(query, { $set: data });
    }
    else {
      const oldAccount = await accounts.findOne(query);
      const newAccount = { ...oldAccount, _id: username, name, description, socialMedia };
      await accounts.insertOne(newAccount);
      await accounts.deleteOne(query);
    }
    return true;
  }
  catch (e) {
    return false;
  }
}

export async function checkAuthentication (req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });
  const userMatch = session.user.name === req.query.profileid;
  const authenticated = session && userMatch;
  if (!authenticated) {
    res.status(403).end();
    return;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await checkAuthentication(req, res);
  const { database } = await connect();
  const { profileid } = req.query;
  
  const usernameChanged = profileid !== req.body.username;
  if (usernameChanged) {
    const usernameAvailable = await checkAvailability(req.body.username, database);
    if (!usernameAvailable) {
      res.status(404).end();
      return;
    }
  }

  const accountUpdated = await updateAccount(profileid as string, req.body, database);
  if (accountUpdated) {
    res.status(200).end();
  }
  else {
    res.status(400).end();
  }
}    

export interface IPublicInfo {
  username: string
  name: string
  description: string
  socialMedia: string
}