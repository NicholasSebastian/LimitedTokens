import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/database';

// TODO: This route should be protected.

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { database } = await connect();
    const accounts = database.collection("accounts");
    // here
  }
  catch (e) {
    // here
  }
  res.status(200).json({ name: 'John Doe' })
}