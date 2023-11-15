import express from "express";
import {
  findUser,
  updateUserById,
  deleteUserById,
  getUserById,
  getUsers,
} from "./Users";
import { logAction } from "../middleware/MongoDBLogs";

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
    const users = await getUsers();
    logAction("INFO", "getAllUsers", "database", "All users retrieved successfully.");
    return res.status(200).json(users).end();
  } catch (error) {
    logAction("ERROR", "getAllUsers", "database", error.message, {
      errorDetails: error.message,
    });
    return res.status(500).json({ error: "Internal Server Error" });
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
    const deletedUser = await deleteUserById(id);
    logAction("INFO", "deleteUser", "database", `User deleted successfully. UserID: ${id}`);
    return res.status(200).json(deletedUser);
  } catch (error) {
    logAction("ERROR", "deleteUser", "database", error.message, {
      errorDetails: error.message,
    });
    return res.status(500).json({ error: "Internal Server Error" });
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
    const currentUser = await getUserById(id);

    if (!currentUser) {
      logAction("ERROR", "getCurrentUserType", "validation", `User not found. UserID: ${id}`, {
        errorDetails: "User not found.",
      });
      return res.status(404).json('The user you are trying to get does not exist!');
    }

    const currentUserType = currentUser.userType;
    logAction("INFO", "getCurrentUserType", "database", `User type retrieved successfully. UserID: ${id}`);
    return res.status(200).json(currentUserType);
  } catch (e) {
    logAction("ERROR", "getCurrentUserType", "database", e.message, {
      errorDetails: e.message,
    });
    return res.status(500).json({ error: "Internal Server Error" });
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
    const currentUser = await findUser({ _id: id });

    if (!currentUser) {
      logAction("ERROR", "updateUserFields", "validation", `User not found. UserID: ${id}`, {
        errorDetails: "User not found.",
      });
      return res.sendStatus(404);
    }

    if ("username" in updatedFields) {
      logAction("ERROR", "updateUserFields", "validation", "Username update forbidden.", {
        errorDetails: "Username update forbidden.",
      });
      return res.sendStatus(403);
    }

    if (currentUser._id.toString() !== id) {
      logAction("ERROR", "updateUserFields", "validation", "Unauthorized attempt to update user fields.", {
        errorDetails: "Unauthorized attempt to update user fields.",
      });
      return res.sendStatus(403);
    }

    const updatedUser = await updateUserById(id, updatedFields);
    logAction("INFO", "updateUserFields", "database", `User fields updated successfully. UserID: ${id}`);
    return res.status(200).json(updatedUser).end();
  } catch (error) {
    logAction("ERROR", "updateUserFields", "database", error.message, {
      errorDetails: error.message,
    });
    return res.status(500).json({ error: "Internal Server Error" });
  }
};