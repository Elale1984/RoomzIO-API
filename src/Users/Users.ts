import mongoose from "mongoose";

/**
 * Mongoose schema for user objects stored in MongoDB.
 * @typedef {Object} UserSchema
 * @property {string} firstName - The first name of the user.
 * @property {string} lastName - The last name of the user.
 * @property {string} username - The username of the user.
 * @property {string} userType - The type of the user.
 * @property {string} email - The email address of the user.
 * @property {Object} authentication - The authentication information.
 * @property {string} authentication.password - The hashed password of the user (not selected by default).
 * @property {string} authentication.salt - The salt used for password hashing (not selected by default).
 * @property {string} authentication.sessionToken - The session token of the user (not selected by default).
 * @property {Date} userDateCreated - The date when the user was created (immutable).
 * @property {Date} dateTerminated - The date when the user was terminated (if applicable).
 */
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  userType: { type: String, required: true },
  email: { type: String, required: true },
  title: { type: String },
  authentication: {
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    sessionToken: { type: String, select: false },
  },
  userDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  dateTerminated: { type: Date },
});

/**
 * Mongoose model for user objects.
 * @typedef {mongoose.Model} UserModel
 */
export const UserModel = mongoose.model("User", UserSchema);

/**
 * Retrieves all users from the database.
 * @returns {Promise<Array>} A promise that resolves to an array of user objects.
 */
export const getUsers = () => UserModel.find();

/**
 * Retrieves a user by their ID.
 * @param {string} id - The ID of the user.
 * @returns {Promise<null|Object>} A promise that resolves to the user object or null if not found.
 */
export const getUserById = (id: string) => UserModel.findById(id);

/**
 * Retrieves a user using a session token.
 * @param {string} sessionToken - The session token associated with the user.
 * @returns {Promise<null|Object>} A promise that resolves to the user object or null if not found.
 */
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

/**
 * Creates a new user object in the database.
 * @param {Record<string, any>} values - The values for the new user.
 * @returns {Promise<Object>} A promise that resolves to the created user object.
 */
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

/**
 * Finds a user by specific field(s) like ID, email, or username.
 * @param {Record<string, any>} query - The query object specifying the search criteria.
 * @returns {Promise<null|Object>} A promise that resolves to the user object or null if not found.
 */
export const findUser = (query: Record<string, any>) => {
  return UserModel.findOne(query);
};

/**
 * Deletes a user by their ID.
 * @param {string} id - The ID of the user to be deleted.
 * @returns {Promise<null|Object>} A promise that resolves to the deleted user object or null if not found.
 */
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });

/**
 * Updates a user by their ID, modifying one or more fields.
 * @param {string} id - The ID of the user to be updated.
 * @param {Record<string, any>} updatedFields - The fields to be updated.
 * @returns {Promise<null|Object>} A promise that resolves to the updated user object or null if not found.
 */
export const updateUserById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return UserModel.findByIdAndUpdate(id, updatedFields);
};
