import mongoose from "mongoose";

/**
 * Mongoose schema for alert objects stored in MongoDB.
 * @typedef {Object} AlertSchema
 * @property {string} firstName - The first name of the alert.
 * @property {string} lastName - The last name of the alert.
 * @property {Date} moveInDate - The date when the alert moved in (required).
 * @property {Date} moveOutDate - The date when the alert moved out (if applicable).
 * @property {Date} alertDateCreated - The date when the alert was created (immutable).
 * @property {Array<mongoose.Types.ObjectId>} alertTags - An array of tag IDs associated with the alert.
 * @property {mongoose.Types.ObjectId} createdBy - The user who created the alert (required).
 */

const AlertSchema = new mongoose.Schema({
  alertName: { type: String, required: true },
  alertDetails: { type: String, required: true },
  alertSeverity: { type: String, required: true },
  alertType: { type: String, required: true },
  alertLocation: { type: String, required: true },
  alertDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  alertDateUpdated: {
    type: Date,
    default: () => Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

/**
 * Mongoose model for alert objects.
 * @typedef {mongoose.Model} AlertModel
 */
export const AlertModel = mongoose.model("Alert", AlertSchema);

/**
 * Retrieves all alerts from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of alert objects.
 */
export const getAlerts = () => AlertModel.find();

/**
 * Retrieves a alert by their ID.
 * @param {string} id - The ID of the alert.
 * @returns {Promise<null|Object>} A promise that resolves to the alert object or null if not found.
 */
export const getAlertById = (id: string) => AlertModel.findById(id);

/**
 * Creates a new alert object in the database.
 * @param {Record<string, any>} values - The values for the new alert.
 * @returns {Promise<Object>} A promise that resolves to the created alert object.
 */
export const createAlert = (values: Record<string, any>) =>
  new AlertModel(values).save().then((alert) => alert.toObject());

/**
 * Finds a alert by specific field(s) like moveInDate, moveOutDate, or ID.
 * @param {Record<string, any>} query - The query object specifying the search criteria.
 * @returns {Promise<null|Object>} A promise that resolves to the alert object or null if not found.
 */
export const findAlert = (query: Record<string, any>) => {
  return AlertModel.findOne(query);
};

/**
 * Deletes a alert by their ID.
 * @param {string} id - The ID of the alert to be deleted.
 * @returns {Promise<null|Object>} A promise that resolves to the deleted alert object or null if not found.
 */
export const deleteAlertById = (id: string) =>
  AlertModel.findByIdAndDelete(id);

/**
 * Updates a alert by their ID, modifying one or more fields.
 * @param {string} id - The ID of the alert to be updated.
 * @param {Record<string, any>} updatedFields - The fields to be updated.
 * @returns {Promise<null|Object>} A promise that resolves to the updated alert object or null if not found.
 */
export const updateAlertById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return AlertModel.findByIdAndUpdate(id, updatedFields);
};