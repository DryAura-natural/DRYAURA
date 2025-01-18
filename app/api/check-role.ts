// pages/api/check-role.ts
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Logic to check role on the server-side
  const userRole = 'admin'; // This should be dynamically determined based on your authentication logic

  if (userRole === 'admin') {
    return res.status(200).json({ isAdmin: true });
  } else {
    return res.status(200).json({ isAdmin: false });
  }
}
