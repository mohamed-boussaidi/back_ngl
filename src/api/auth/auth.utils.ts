import { sign, verify } from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'changeme';
const EXPIRES_IN = process.env.EXPIRES_IN || '15d';

// Sign New JWT Token
export function signJwt(payload: string | Buffer | object) {
  return sign(payload, JWT_SECRET, {
    expiresIn: EXPIRES_IN,
  });
}
// Verify JWT Token
export function verifyJwt(token: string) {
  try {
    const decoded = verify(token, JWT_SECRET);
    return decoded;
  } catch (e) {
    return null;
  }
}
