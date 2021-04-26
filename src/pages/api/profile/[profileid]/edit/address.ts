import { NextApiRequest, NextApiResponse } from 'next';

import connect from '../../../../../lib/database';
import { checkAuthentication } from './public';

async function updateAddress(accountId: string, newAddress: IAddress) {
  const { database } = await connect();
  const query = { _id: accountId };
  try {
    const accounts = database.collection('accounts');
    await accounts.updateOne(query, { $set: { shippingAddress: newAddress } });
    return true;
  }
  catch (e) {
    return false;
  }
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  await checkAuthentication(req, res);
  const { profileid } = req.query;

  const addressUpdated = await updateAddress(profileid as string, req.body);
  if (addressUpdated) {
    res.status(200).end();
  }
  else {
    res.status(400).end();
  }
}

export interface IAddress {
  address: string
  city: string
  postalCode: number
}