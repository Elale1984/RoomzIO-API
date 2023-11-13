import express from "express";
import {
  findUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getUsers,
} from "./Users";

/**
 * Retrieves all users from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const getAllUsers = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    // Get all users from the database
    const users = await getUsers();
    return res.status(200).json(users).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400); 
  }
};

/**
 * Deletes a user from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const deleteUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    // Delete the user by ID
    const deletedUser = await deleteUserById(id);
    return res.status(200).json(deletedUser);
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};

/**
 * Retrieves the type of the current user based on the provided ID.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const getCurrentUserType = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    // Get the current user by ID
    const currentUser = await getUserById(id);

    if (!currentUser) {
      return res.status(404).json('The user you are trying to get does not exist!');
    }

    // Get and return the user type
    const currentUserType = currentUser.userType;
    return res.status(200).json(currentUserType);
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(400);
  }
};

/**
 * Updates user fields in the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const updateUserFields = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    // Find the current user by ID
    const currentUser = await findUser({ _id: id });

    if (!currentUser) {
      return res.sendStatus(404);
    }

    // Check if "username" is in the updated fields (Forbidden)
    if ("username" in updatedFields) {
      return res.sendStatus(403);
    }

    // Check if the current user matches the requested update
    if (currentUser._id.toString() !== id) {
      return res.sendStatus(403);
    }

    // Update the user
    const updatedUser = await updateUserById(id, updatedFields);

    return res.status(200).json(updatedUser).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};
