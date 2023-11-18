import mongoose from "mongoose";

/**
 * Mongoose schema for storing notification objects in MongoDB.
 * @typedef {Object} NotificationSchema
 * @property {string} notificationsName - The name of the notification.
 * @property {string} notificationsDetails - Details associated with the notification.
 * @property {string} notificationsType - The type of the notification.
 * @property {mongoose.Types.ObjectId} recipientId - The user ID of the recipient (reference to "Users").
 * @property {Date} notificationsDateCreated - The date when the notification was created (immutable).
 * @property {mongoose.Types.ObjectId} createdBy - The user who created the notification (required).
 */

const NotificationSchema = new mongoose.Schema({
  // Schema definition for a Mongoose model storing notifications.
  notificationsName: { type: String, required: true },
  notificationsDetails: { type: String, required: true },
  notificationsType: { type: String, required: true },
  recipientId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Users", required: true }],
  notificationsDateCreated: {
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
 * Mongoose model for notifications.
 * @type {mongoose.Model}
 */
export const NotificationModel = mongoose.model("Notifications", NotificationSchema);

/**
 * Retrieves all notifications from the database.
 * @returns {Promise<Array>} A promise resolving to an array of notification objects.
 */
export const getNotifications = () => NotificationModel.find();

/**
 * Retrieves a notification by its ID.
 * @param {string} id - The ID of the notification.
 * @returns {Promise<null|Object>} A promise resolving to the notification object or null if not found.
 */
export const getNotificationById = (id: string) => NotificationModel.findById(id);

/**
 * Creates a new notification object in the database.
 * @param {Record<string, any>} values - The values for the new notification.
 * @returns {Promise<Object>} A promise resolving to the created notification object.
 */
export const createNotification = (values: Record<string, any>) =>
  new NotificationModel(values).save().then((notification) => notification.toObject());

/**
 * Finds a notification by specific fields like moveInDate, moveOutDate, or ID.
 * @param {Record<string, any>} query - The query object specifying the search criteria.
 * @returns {Promise<null|Object>} A promise resolving to the notification object or null if not found.
 */
export const findNotification = (query: Record<string, any>) => NotificationModel.findOne(query);

/**
 * Deletes a notification by its ID.
 * @param {string} id - The ID of the notification to be deleted.
 * @returns {Promise<null|Object>} A promise resolving to the deleted notification object or null if not found.
 */
export const deleteNotificationById = (id: string) =>
  NotificationModel.findByIdAndDelete(id);

/**
 * Updates a notification by its ID, modifying one or more fields.
 * @param {string} id - The ID of the notification to be updated.
 * @param {Record<string, any>} updatedFields - The fields to be updated.
 * @returns {Promise<null|Object>} A promise resolving to the updated notification object or null if not found.
 */
export const updateNotificationById = (
  id: string,
  updatedFields: Record<string, any>
) => NotificationModel.findByIdAndUpdate(id, updatedFields);
