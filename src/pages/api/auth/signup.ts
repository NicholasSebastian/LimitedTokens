import { NextApiRequest, NextApiResponse } from 'next';
import dbClient from '../../../utils/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await dbClient.connect();
    const database = dbClient.db("LimitedTokens");
    const connection = database.collection("accounts");
    // here
  }
  finally {
    dbClient.close();
  }
  res.status(200).json({ name: 'John Doe' })
}