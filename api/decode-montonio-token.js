import type { VercelRequest, VercelResponse } from 'vercel';
import jwt from 'jsonwebtoken';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { token, secret } = req.body;

  if (!token || !secret) {
    return res.status(400).json({ error: 'Missing token or secret' });
  }

  try {
    const decoded = jwt.verify(token, secret);
    return res.status(200).json({ decoded });
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token or signature', details: error.message });
  }
}
