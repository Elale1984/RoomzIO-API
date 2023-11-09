import express from "express";
import {
  findUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getUsers,
} from "../db/Users";

/**
 * Get all users.
 * @param {express.Response} res - The response object.
 */
export const getAllUsers = async (res: express.Response) => {
  try {
    // Fetching all users from the database
    const users = await getUsers();
    return res.status(200).json(users);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400); // Handle error with a 400 Bad Request status
  }
};

/**
 * Delete a user by ID.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Extracting user ID from the request parameters
    const { id } = req.params;
    // Deleting the user by ID
    const deletedUser = await deleteUserById(id);
    return res.json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400); // Handle error with a 400 Bad Request status
  }
};

/**
 * Get the user type of a user by ID.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
export const getCurrentUserType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Extracting user ID from the request parameters
    const { id } = req.params;
    // Fetching user by ID
    const currentUser = await getUserById(id);

    // If user not found, return 404 Not Found status
    if (!currentUser) {
      return res.sendStatus(404);
    }

    // Extracting and returning the user type
    const currentUserType = currentUser.userType;
    return res.json(currentUserType);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400); // Handle error with a 400 Bad Request status
  }
};

/**
 * Update user fields by ID.
 * @param {express.Request} req - The request object.
 * @param {express.Response} res - The response object.
 */
export const updateUserFields = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Extracting user ID from the request parameters
    const { id } = req.params;
    // Extracting updated fields from the request body
    const updatedFields = req.body;

    // Fetching user by ID
    const currentUser = await findUser({ _id: id });

    // If user not found, return 404 Not Found status
    if (!currentUser) {
      return res.sendStatus(404);
    }

    // If trying to update the username, return 403 Forbidden status
    if ("username" in updatedFields) {
      return res.sendStatus(403);
    }

    // Ensure that the user is updating their own data
    if (currentUser._id.toString() !== id) {
      return res.sendStatus(403);
    }

    // Update user fields using updateUserById
    await updateUserById(id, updatedFields);

    // Fetch the updated user to return in the response
    const updatedUser = await findUser({ _id: id });

    return res.status(200).json(updatedUser).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400); // Handle error with a 400 Bad Request status
  }
};
