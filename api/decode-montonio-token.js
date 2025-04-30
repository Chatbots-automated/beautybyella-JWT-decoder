const jwt = require('jsonwebtoken');

/**
 * @param {import('vercel').VercelRequest} req 
 * @param {import('vercel').VercelResponse} res 
 */
module.exports = function handler(req, res) {
  // Handle CORS
  res.setHeader('Access-Control-Allow-Origin', '*'); // Allow from all domains — change if needed
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    // Respond to preflight
    return res.status(200).end();
  }

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
