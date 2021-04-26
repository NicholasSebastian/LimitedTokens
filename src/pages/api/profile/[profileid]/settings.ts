import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/client';
import connect from '../../../../lib/database';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  const { profileid } = req.query;

  if (session && session.user.name === profileid) {
    const query = { _id: profileid };
    const projection = { 
      _id: true, name: true, description: true, email: true, image: true,
      socialMedia: true, shippingAddress: true, phoneNumber: true
    };
    try {
      const { database } = await connect();
      const accounts = database.collection("accounts");
      const accountData: IAccount = await accounts.findOne(query, { projection });
      res.status(200).json(accountData);
    }
    catch (e) {
      res.status(400).end();
    }
  }
  else {
    res.status(400).end();
  }
}

export interface IAccount { 
  _id: string
  name: string
  description: string
  email: string
  image: any
  socialMedia: string
  shippingAddress: any
  phoneNumber: string
}