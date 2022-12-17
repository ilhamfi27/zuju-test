import { Request, Response } from 'express';
import Context from '../src/context';

declare global {
  namespace Express {
    interface Request {
      context: Context;
    }
    interface Respose {}
  }
}
