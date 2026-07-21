import jwt from 'jsonwebtoken';

const getSecret = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }
  return secret;
};

export const signToken = (id: string, role: string): string => {
  return jwt.sign({ id, role }, getSecret(), {
    expiresIn: process.env.JWT_EXPIRES_IN || '1d',
  } as jwt.SignOptions);
};

export const verifyToken = (token: string): any => {
  return jwt.verify(token, getSecret());
};
