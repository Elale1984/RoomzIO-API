import express from "express";
import {
  createWing,
  deleteWingById,
  findWing,
  getWings,
  updateWingById,
} from "./Wings";
import { logAction } from "../middleware/MongoDBLogs";

/**
 * Creates a new Wing in the database.
 * - Should only create a Wing if one with the same name does not exist already.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const registerWing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { wingName, wingCapacity, createdBy, wingTags, wingRooms } = req.body;

    // Check that Wing name was included
    if (!wingName) {
      logAction("ERROR", "registerWing", "validation", "Id not available", "Wing name is required");
      return res.status(400).json("Wing was not created!");
    }

    // Check if the Wing name already exists
    const existingWing = await findWing({ wingName: wingName });

    if (existingWing) {
      logAction("ERROR", "registerWing", "validation", `WingID: ${existingWing.id}`, "Wing with that name already exists. Cannot duplicate.");
      return res.status(400).json("A Wing with that number already exists!");
    }

    // Create the Wing
    const wing = await createWing({
      wingName,
      wingCapacity,
      createdBy,
      wingTags,
      wingRooms,
    });

    if (!wing) {
      logAction("ERROR", "registerWing", "database", "WingID not available", "Wing creation failed.");
      return res
        .status(400)
        .json("Oops! Something happened. Wing was not created!");
    }

    logAction("INFO", "registerWing", "database", `WingID: ${wing._id}`, "Wing creation successfully.");

    return res.status(200).json(wing).end();
  } catch (e) {
    logAction("ERROR", "registerWing", "unexpected", "WingID not available", e.message);
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Retrieves all Wings from the database.
 * - Should return all Wings in the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const getAllWings = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const wings = await getWings();

    logAction("INFO", "getAllWings", "database", "WingID not available", "Failed to get all wings.");
    return res.status(200).json(wings).end();
  } catch (e) {
    logAction("ERROR", "getAllWings", "database", "WingID not available", e.message);
    res.status(500).json("An error occurred!");
  }
};

/**
 * Updates a Wing in the database.
 * - Should update a Wing given the id.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const updateWingFields = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentWing = await findWing({ _id: id });

    if (!currentWing) {
      logAction("ERROR", "updateWingFields", "validation", `WingID: ${id}`, "Could not find Wing. Edit failed.");
      return res.status(404).json("Could not find Wing. Edit failed.").end();
    }

    const updatedWing = await updateWingById(id, updatedFields);

    if (!updatedWing) {
      logAction("ERROR", "updateWing", "database", `WingID: ${id}`, "Wing failed to update!");
      return res.status(400).json("Could not modify Wing!").end();
    }

    logAction("INFO", "updateWingFields", "database", `WingID: ${id}`, "Wing successfully updated.");

    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction("ERROR", "updateWingFields", "unexpected", "WingID not available", e.message);
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Deletes a Wing from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const deleteWing = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedWing = await deleteWingById(id);

    if (!deletedWing) {
      logAction("ERROR", "deleteWing", "validation", `WingID: ${id}`, "Wing not found or already deleted.");
      return res.status(404).json("Wing not found or already deleted.");
    }

    logAction("INFO", "deleteWing", "database", `WingID: ${id}`, "Wing deleted successfully.");

    return res.status(200).json("Wing was deleted successfully!");
  } catch (e) {
    logAction("ERROR", "deleteWing", "unexpected", "WingID not available",  e.message);
    return res.status(500).json("An unexpected error occurred!");
  }
};
