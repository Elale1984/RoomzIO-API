import mongoose from "mongoose";

/**
 * Mongoose schema for storing messageCenter objects in MongoDB.
 * @typedef {Object} MessageCenterSchema
 * @property {string} messageCentersName - The name of the messageCenter.
 * @property {string} messageCentersDetails - Details associated with the messageCenter.
 * @property {string} messageCentersType - The type of the messageCenter.
 * @property {mongoose.Types.ObjectId} recipientId - The user ID of the recipient (reference to "Users").
 * @property {Date} messageCentersDateCreated - The date when the messageCenter was created (immutable).
 * @property {mongoose.Types.ObjectId} createdBy - The user who created the messageCenter (required).
 */

const MessageCenterSchema = new mongoose.Schema({
  // Schema definition for a Mongoose model storing messageCenters.
  ownerId: { type: mongoose.Schema.Types.ObjectId, ref: "Users" },
  alertBox: [{ type: mongoose.Schema.Types.ObjectId, ref: "Alerts" }],
  notificationBox:[{ type: mongoose.Schema.Types.ObjectId, ref: "Notifications" }],
  messageCentersDateCreated: {
    type: Date,
    immutable: true, // Date is immutable once created.
    default: () => Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
});

/**
 * Mongoose model for messageCenters.
 * @type {mongoose.Model}
 */
export const MessageCenterModel = mongoose.model("MessageCenter", MessageCenterSchema);

/**
 * Retrieves all messageCenters from the database.
 * @returns {Promise<Array>} A promise resolving to an array of messageCenter objects.
 */
export const getMessageCenters = () => MessageCenterModel.find();

/**
 * Retrieves a messageCenter by its ID.
 * @param {string} id - The ID of the messageCenter.
 * @returns {Promise<null|Object>} A promise resolving to the messageCenter object or null if not found.
 */
export const getMessageCenterById = (id: string) => MessageCenterModel.findById(id);

/**
 * Creates a new messageCenter object in the database.
 * @param {Record<string, any>} values - The values for the new messageCenter.
 * @returns {Promise<Object>} A promise resolving to the created messageCenter object.
 */
export const createMessageCenter = (values: Record<string, any>) =>
  new MessageCenterModel(values).save().then((messageCenter) => messageCenter.toObject());

/**
 * Finds a messageCenter by specific fields like moveInDate, moveOutDate, or ID.
 * @param {Record<string, any>} query - The query object specifying the search criteria.
 * @returns {Promise<null|Object>} A promise resolving to the messageCenter object or null if not found.
 */
export const findMessageCenter = (query: Record<string, any>) => MessageCenterModel.findOne(query);

/**
 * Deletes a messageCenter by its ID.
 * @param {string} id - The ID of the messageCenter to be deleted.
 * @returns {Promise<null|Object>} A promise resolving to the deleted messageCenter object or null if not found.
 */
export const deleteMessageCenterById = (id: string) =>
  MessageCenterModel.findByIdAndDelete(id);

/**
 * Updates a messageCenter by its ID, modifying one or more fields.
 * @param {string} id - The ID of the messageCenter to be updated.
 * @param {Record<string, any>} updatedFields - The fields to be updated.
 * @returns {Promise<null|Object>} A promise resolving to the updated messageCenter object or null if not found.
 */
export const updateMessageCenterById = (
  id: string,
  updatedFields: Record<string, any>
) => MessageCenterModel.findByIdAndUpdate(id, updatedFields);
