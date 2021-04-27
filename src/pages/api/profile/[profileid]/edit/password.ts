import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connect from '../../../../../lib/database';

// TODO: implement a way to add and change password credentials.

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const { profileid } = req.query;

  if (session && session.user.name === profileid) {
    const query = { _id: profileid };
    const projection = {};
    try {
      const { database } = await connect();
      const accounts = database.collection("accounts");
      // here
      res.status(200).json({ name: 'John Doe' });
    }
    catch (e) {
      res.status(400).end();
    }
  }
  else {
    res.status(400).end();
  }
}