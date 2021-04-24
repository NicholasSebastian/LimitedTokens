import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { profileid } = req.query;
  try {
    const query = { _id: profileid };
    const projection = { _id: true, name: true, image: true, description: true };

    const { database } = await connect();
    const collection = database.collection('accounts');
    const profile: IProfile = await collection.findOne(query, { projection });
    res.status(200).json(profile);
  }
  catch (e) {
    res.status(400).end();
  }
}

export interface IProfile {
  _id: string
  name: string
  image: any
  description: string
}