import mongoose, { mongo } from "mongoose";

/**
 * Defines the schema for a Tag in the MongoDB database.
 * @typedef {Object} TagsSchema
 * @property {string} name - The name of the tag.
 * @property {string} description - The description of the tag.
 * @property {Date} dateCreated - The date when the tag was created.
 * @property {mongoose.Types.ObjectId} createdBy - The user who created the tag.
 * @property {string} color - The color associated with the tag.
 */

/**
 * The MongoDB model for the Tag schema.
 * @typedef {mongoose.Model} TagsModel
 */

// Creating the Tags schema
const TagsSchema = new mongoose.Schema({
  name: { type: String },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

// Creating the Tags model
export const TagsModel = mongoose.model("Tags", TagsSchema);

/**
 * Creates a new tag in the database.
 * @param {Record<string, any>} values - The values to create the tag with.
 * @returns {Promise<Record<string, any>>} - A promise that resolves to the created tag.
 */
export const createTag = (values: Record<string, any>) =>
  new TagsModel(values).save().then((tag) => tag.toObject());

/**
 * Retrieves all tags from the database.
 * @returns {Promise<mongoose.Document[]>} - A promise that resolves to an array of tag documents.
 */
export const getTags = () => TagsModel.find();

/**
 * Retrieves a specific tag by ID from the database.
 * @param {string} id - The ID of the tag to retrieve.
 * @returns {Promise<mongoose.Document[]>} - A promise that resolves to the tag documents matching the ID.
 */
export const getTagById = (id: string) => TagsModel.find({ _id: id });

/**
 * Finds a tag in the database based on the provided query.
 * @param {Record<string, any>} query - The query to find the tag.
 * @returns {Promise<mongoose.Document|null>} - A promise that resolves to the tag document or null if not found.
 */
export const findTag = (query: Record<string, any>) => {
  return TagsModel.findOne(query);
}

/**
 * Updates a tag in the database based on the provided ID and updated fields.
 * @param {string} id - The ID of the tag to update.
 * @param {Record<string, any>} updatedFields - The fields to update.
 * @returns {Promise<mongoose.Document|null>} - A promise that resolves to the updated tag or null if not found.
 */
export const updateTagById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return TagsModel.findByIdAndUpdate(id, updatedFields);
};

/**
 * Deletes a tag from the database based on the provided ID.
 * @param {string} id - The ID of the tag to delete.
 * @returns {Promise<void>} - A promise that resolves when the tag is successfully deleted.
 */
export const deleteTagById = (id: string) => TagsModel.deleteOne({_id: id});
