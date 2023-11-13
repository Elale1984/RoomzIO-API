import mongoose from "mongoose";

/**
 * Defines the schema for a Bed in the MongoDB database.
 * @typedef {Object} BedSchema
 * @property {string} bedNumber - The bed number.
 * @property {Date} bedDateCreated - The date when the bed was created.
 * @property {mongoose.Types.ObjectId} createdBy - The user who created the bed.
 * @property {boolean} isBedLocked - Indicates whether the bed is locked.
 * @property {boolean} isBedAvailable - Indicates whether the bed is available.
 * @property {mongoose.Types.ObjectId} bedResident - The resident assigned to the bed.
 * @property {mongoose.Types.ObjectId[]} tags - An array of tag references associated with the bed.
 */

/**
 * The MongoDB model for the Bed schema.
 * @typedef {mongoose.Model} BedModel
 */

// Creating the Bed schema
const BedSchema = new mongoose.Schema({
  bedNumber: { type: String, required: true },
  bedDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  isBedLocked: { type: Boolean, default: false },
  isBedAvailable: { type: Boolean, default: true },
  bedResident: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
});

// Creating the Bed model
export const BedModel = mongoose.model("Beds", BedSchema);

/**
 * Retrieves all beds from the database, populating the 'bedResident' field.
 * @returns {Promise<mongoose.Document[]>} - A promise that resolves to an array of bed documents.
 */
export const getBeds = () => BedModel.find().populate("bedResident");

/**
 * Retrieves a specific bed by ID from the database, populating the 'bedResident' field.
 * @param {string} id - The ID of the bed to retrieve.
 * @returns {Promise<mongoose.Document|null>} - A promise that resolves to the bed document or null if not found.
 */
export const getBedById = (id: string) =>
  BedModel.findById(id).populate("bedResident");

/**
 * Creates a new bed in the database.
 * @param {Record<string, any>} values - The values to create the bed with.
 * @returns {Promise<Record<string, any>>} - A promise that resolves to the created bed.
 */
export const createBed = (values: Record<string, any>) =>
  new BedModel(values).save().then((bed) => bed.toObject());

/**
 * Finds a bed in the database based on the provided query, populating the 'bedResident' field.
 * @param {Record<string, any>} query - The query to find the bed.
 * @returns {Promise<mongoose.Document|null>} - A promise that resolves to the bed document or null if not found.
 */
export const findBed = (query: Record<string, any>) => {
  return BedModel.findOne(query).populate("bedResident");
};

/**
 * Deletes a bed from the database based on the provided ID.
 * @param {string} id - The ID of the bed to delete.
 * @returns {Promise<void>} - A promise that resolves when the bed is successfully deleted.
 */
export const deleteBedById = (id: string) =>
  BedModel.findByIdAndDelete({ _id: id });

/**
 * Updates a bed in the database based on the provided ID and updated fields, populating the 'bedResident' field.
 * @param {string} id - The ID of the bed to update.
 * @param {Record<string, any>} updatedFields - The fields to update.
 * @returns {Promise<Record<string, any>|null>} - A promise that resolves to the updated bed or null if not found.
 */
export const updateBedById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return BedModel.findByIdAndUpdate(id, updatedFields, { new: true }).populate(
    "bedResident"
  );
};

/**
 * Adds a resident to a bed in the database based on the provided bed and resident IDs, populating the 'bedResident' field.
 * @param {string} bedId - The ID of the bed to update.
 * @param {string} residentId - The ID of the resident to add to the bed.
 * @returns {Promise<Record<string, any>|null>} - A promise that resolves to the updated bed or null if not found.
 */
export const addResidentToBedById = (bedId: string, residentId: string) => {
  return BedModel.findByIdAndUpdate(
    bedId,
    { bedResident: residentId },
    { new: true }
  ).populate("bedResident");
};
