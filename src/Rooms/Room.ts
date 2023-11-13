import mongoose from "mongoose";

/**
 * Defines the schema for a Room in the MongoDB database.
 * @typedef {Object} RoomSchema
 * @property {string} roomNumber - The room number.
 * @property {number} roomCapacity - The capacity of the room.
 * @property {Date} roomDateCreated - The date when the room was created.
 * @property {Date} roomProjectedVacancyDate - The projected vacancy date for the room.
 * @property {mongoose.Types.ObjectId[]} roomTags - An array of tag references associated with the room.
 * @property {boolean} isRoomLocked - Indicates whether the room is locked.
 * @property {boolean} isRoomAvailable - Indicates whether the room is available.
 * @property {mongoose.Types.ObjectId[]} roomBeds - An array of bed references associated with the room.
 */

// Creating the Room schema
export const RoomSchema = new mongoose.Schema({
  roomNumber: { type: String, required: true },
  roomCapacity: { type: Number, required: true },
  roomDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  roomProjectedVacancyDate: { type: Date },
  roomTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  isRoomLocked: { type: Boolean, default: false },
  isRoomAvailable: { type: Boolean, default: true },
  roomBeds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Beds" }],
});

// Creating the Room model
export const RoomModel = mongoose.model("Room", RoomSchema);

/**
 * Retrieves all rooms from the database, populating the 'roomBeds' field.
 * @returns {Promise<mongoose.Document[]>} - A promise that resolves to an array of room documents.
 */
export const getRooms = () =>
  RoomModel.find().populate("roomBeds");

/**
 * Retrieves a specific room by ID from the database, populating the 'roomBeds' field.
 * @param {string} id - The ID of the room to retrieve.
 * @returns {Promise<mongoose.Document|null>} - A promise that resolves to the room document or null if not found.
 */
export const getRoomById = (id: string) =>
  RoomModel.findById(id).populate("roomBeds");

/**
 * Creates a new room in the database.
 * @param {Record<string, any>} values - The values to create the room with.
 * @returns {Promise<Record<string, any>>} - A promise that resolves to the created room.
 */
export const createRoom = (values: Record<string, any>) =>
  new RoomModel(values).save().then((room) => room.toObject());

/**
 * Finds a room in the database based on the provided query, populating the 'roomBeds' field.
 * @param {Record<string, any>} query - The query to find the room.
 * @returns {Promise<mongoose.Document|null>} - A promise that resolves to the room document or null if not found.
 */
export const findRoom = (query: Record<string, any>) => {
  return RoomModel.findOne(query).populate("roomBeds");
};

/**
 * Deletes a room from the database based on the provided ID.
 * @param {string} id - The ID of the room to delete.
 * @returns {Promise<void>} - A promise that resolves when the room is successfully deleted.
 */
export const deleteRoomById = (id: string) =>
  RoomModel.findByIdAndDelete({ _id: id });

/**
 * Updates a room in the database based on the provided ID and updated fields, populating the 'roomBeds' field.
 * @param {string} id - The ID of the room to update.
 * @param {Record<string, any>} updatedFields - The fields to update.
 * @returns {Promise<Record<string, any>|null>} - A promise that resolves to the updated room or null if not found.
 */
export const updateRoomById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return RoomModel.findByIdAndUpdate(id, updatedFields)
    .populate("roomBeds");
};

/**
 * Adds a bed to a room in the database based on the provided room and bed IDs, populating the 'roomBeds' field.
 * @param {string} roomId - The ID of the room to update.
 * @param {string} bedId - The ID of the bed to add to the room.
 * @returns {Promise<Record<string, any>|null>} - A promise that resolves to the updated room or null if not found.
 */
export const addBedToRoomById = (roomId: string, bedId: string) => {
  return RoomModel.findByIdAndUpdate(
    roomId,
    { $push: { roomBeds: bedId } },
    { new: true }
  )
    .populate("roomBeds");
};
