import { NextApiRequest, NextApiResponse } from 'next';

// TODO: backend authentication code.

export default (req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ name: 'John Doe' })
}
