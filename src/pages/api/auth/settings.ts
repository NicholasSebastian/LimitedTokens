import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connect from '../../../lib/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  if (!session) {
    res.status(400).end();
  }
  else {
    const { name } = session.user;
    try {
      const { database } = await connect();
      const accounts = database.collection("accounts");
      // here
      res.status(200).json({ name: 'John Doe' })
    }
    catch (e) {
      res.status(400).end();
    }
  }
}