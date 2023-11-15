import { Schema, Document, model, Model } from 'mongoose';
import { Request, Response, NextFunction } from 'express';

interface RequestLog extends Document {
  method: string;
  url: string;
  timestamp: Date;
  body?: Record<string, any>;
  params?: Record<string, any>;
  query?: Record<string, any>;
}

const RequestLogSchema: Schema = new Schema({
  method: { type: String, required: true },
  url: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  body: { type: Schema.Types.Mixed },
  params: { type: Schema.Types.Mixed },
  query: { type: Schema.Types.Mixed },
});

export const RequestLogsModel: Model<RequestLog & Document> = model<RequestLog>('RequestLog', RequestLogSchema);

export const createRequestLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { method, url, body, params, query } = req;

    await RequestLogsModel.create({
      method,
      url,
      timestamp: new Date(),
      body,
      params,
      query,
    });

    next();
  } catch (error) {
    console.error('Error during request logging:', error);
    res.status(500).send('Internal Server Error');
  }
};

export const getAllRequestLogs = async (): Promise<RequestLog[]> => {
  return RequestLogsModel.find().sort({ timestamp: -1 }).lean();
};


/**
 * Logs an action in a centralized manner.
 * @param {string} level - The log level.
 * @param {string} action - The action being logged.
 * @param {string} entityType - The type of entity involved.
 * @param {string} entityId - The ID of the entity involved.
 * @param {string | { errorDetails: string; wingId?: string }} details - Additional details or error information.
 * @returns {Promise<void>}
 */
export const logAction = async (
  level: string,
  action: string,
  entityType: string,
  entityId?: string,
  details?: string | { errorDetails: string; wingId?: string }
): Promise<void> => {
  try {
    await RequestLogsModel.create({
      method: level,
      url: entityId
        ? `${level}: ${entityType} ${action} - ${entityId}`
        : `${level}: ${entityType} ${action}`,
      timestamp: new Date(),
      body: details,
    });
  } catch (error) {
    console.error('Error during centralized logging:', error);
  }
};
