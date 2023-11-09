import mongoose, { Schema, Document } from "mongoose";

interface Log extends Document {
  level: string;
  message: string;
  timestamp: Date;
  metadata?: Record<string, any>;
}

/* LogSchema using mongoose to send the schema to MongoDB */
const MongoDBLoggerSchema: Schema = new mongoose.Schema({
  level: { type: String, required: true },
  message: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  metadata: { type: Schema.Types.Mixed },
});

/* Creating the Mongoose model for log objects */
export const MongoDBLogsModel = mongoose.model<Log>("Log", MongoDBLoggerSchema);

/* Log functions for CRUD operations */
/* Create a new log entry */
export const createLog = async (level: string, message: string, metadata?: Record<string, any>): Promise<void> => {
  await MongoDBLogsModel.create({ level, message, metadata });
};

/* Retrieve log entry by its ID */
export const getLogById = async (id: string): Promise<Log | null> => {
  return MongoDBLogsModel.findById(id).exec();
};

/* Retrieve all log entries from the database */
export const getAllLogs = async (): Promise<Log[]> => {
  return MongoDBLogsModel.find().exec();
};

/* Delete a log entry by its ID */
export const deleteLogById = async (id: string): Promise<void> => {
  await MongoDBLogsModel.findByIdAndDelete(id).exec();
};

/* Update log entry by its ID, modifying one or more fields */
export const updateLogById = async (id: string, updatedFields: Record<string, any>): Promise<void> => {
  await MongoDBLogsModel.findByIdAndUpdate(id, updatedFields).exec();
};
