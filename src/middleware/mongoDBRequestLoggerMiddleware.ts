import { Request, Response, NextFunction } from 'express';
import { MongoDBLogsModel } from '../db/MongoDBLogs';

/**
 * Middleware to log incoming requests to MongoDBLogs.
 */
export const mongoDBRequestLoggerMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Log the request information
    await MongoDBLogsModel.create({
      level: 'info',
      message: `Incoming request: ${req.method} ${req.url}`,
      metadata: { body: req.body, params: req.params, query: req.query },
    });

    // Pass the request to the next middleware or route handler
    next();
  } catch (error) {
    console.error('Error during request logging:', error);
    res.status(500).send('Internal Server Error');
  }
};
