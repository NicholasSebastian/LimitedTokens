import { NextApiRequest, NextApiResponse } from 'next';
import connect from '../../../lib/database';

// TODO: sort by popularity / number of pieces sold / worth of pieces owned.

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { trend } = req.query;
  try {
    const projection = { _id: true, image: true };

    const sortByArtist = {};
    const sortByCollector = {};
    const sort = 
      trend === 'artist' ? sortByArtist : 
      trend === 'collector' ? sortByCollector : 
      {};

    const { database } = await connect();
    const collection = database.collection("accounts");
    const profiles = await collection.find({}, { projection }).limit(20).toArray();
    res.status(200).json(profiles);
  }
  catch (e) {
    res.status(400).end();
  }
}

export interface IProfile {
  _id: string
  image: any
}