import mongoose from "mongoose";

/**
 * Mongoose schema for resident objects stored in MongoDB.
 * @typedef {Object} ResidentSchema
 * @property {string} firstName - The first name of the resident.
 * @property {string} lastName - The last name of the resident.
 * @property {Date} moveInDate - The date when the resident moved in (required).
 * @property {Date} moveOutDate - The date when the resident moved out (if applicable).
 * @property {Date} residentDateCreated - The date when the resident was created (immutable).
 * @property {Array<mongoose.Types.ObjectId>} residentTags - An array of tag IDs associated with the resident.
 * @property {mongoose.Types.ObjectId} createdBy - The user who created the resident (required).
 */

const ResidentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  moveInDate: { type: Date, required: true },
  moveOutDate: { type: Date },
  residentDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  residentTags: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Tags",
  }],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

/**
 * Mongoose model for resident objects.
 * @typedef {mongoose.Model} ResidentModel
 */
export const ResidentModel = mongoose.model("Resident", ResidentSchema);

/**
 * Retrieves all residents from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of resident objects.
 */
export const getResidents = () => ResidentModel.find();

/**
 * Retrieves a resident by their ID.
 * @param {string} id - The ID of the resident.
 * @returns {Promise<null|Object>} A promise that resolves to the resident object or null if not found.
 */
export const getResidentsById = (id: string) => ResidentModel.findById(id);

/**
 * Creates a new resident object in the database.
 * @param {Record<string, any>} values - The values for the new resident.
 * @returns {Promise<Object>} A promise that resolves to the created resident object.
 */
export const createResident = (values: Record<string, any>) =>
  new ResidentModel(values).save().then((resident) => resident.toObject());

/**
 * Finds a resident by specific field(s) like moveInDate, moveOutDate, or ID.
 * @param {Record<string, any>} query - The query object specifying the search criteria.
 * @returns {Promise<null|Object>} A promise that resolves to the resident object or null if not found.
 */
export const findResident = (query: Record<string, any>) => {
  return ResidentModel.findOne(query);
};

/**
 * Deletes a resident by their ID.
 * @param {string} id - The ID of the resident to be deleted.
 * @returns {Promise<null|Object>} A promise that resolves to the deleted resident object or null if not found.
 */
export const deleteResidentById = (id: string) =>
  ResidentModel.findByIdAndDelete(id);

/**
 * Updates a resident by their ID, modifying one or more fields.
 * @param {string} id - The ID of the resident to be updated.
 * @param {Record<string, any>} updatedFields - The fields to be updated.
 * @returns {Promise<null|Object>} A promise that resolves to the updated resident object or null if not found.
 */
export const updateResidentById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return ResidentModel.findByIdAndUpdate(id, updatedFields);
};