import mongoose from "mongoose";

/* UserSchema using mongoose to send the schema to MongoDB */
const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  userType: { type: String, required: true },
  email: { type: String, required: true },
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

/* Creating the Mongoose model for user objects */
export const UserModel = mongoose.model("User", UserSchema);

/* Retrieve all users from the database */
export const getUsers = () => UserModel.find();

/* Retrieve a user by their ID */
export const getUserById = (id: string) => UserModel.findById(id);

/* Retrieve a user using a session token */
export const getUserBySessionToken = (sessionToken: string) =>
  UserModel.findOne({
    "authentication.sessionToken": sessionToken,
  });

/* CRUD methods for user objects */
/* Create a new user object */
export const createUser = (values: Record<string, any>) =>
  new UserModel(values).save().then((user) => user.toObject());

/* Find users by specific field(s) like ID, email, or username */
export const findUser = (query: Record<string, any>) => {
  return UserModel.findOne(query);
};

/* Delete a user by their ID */
export const deleteUserById = (id: string) =>
  UserModel.findByIdAndDelete({ _id: id });

/* Update a user by their ID, modifying one or more fields */
export const updateUserById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return UserModel.findByIdAndUpdate(id, updatedFields);
};
