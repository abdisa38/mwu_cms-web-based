import { Request, Response } from 'express';

export const login = async (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Login endpoint' });
};

export const register = async (req: Request, res: Response) => {
  res.status(200).json({ status: 'success', message: 'Register endpoint' });
};
