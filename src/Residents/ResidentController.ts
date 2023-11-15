import { logAction } from "../middleware/MongoDBLogs";
import {
  createResident,
  findResident,
  getResidents,
  updateResidentById,
  deleteResidentById,
} from "./Residents";
import express from "express";

/**
 * Create a new Resident
 * ? Should only create a Resident if one with the same name does not exist already
 * TODO :
 * @param none
 */
export const registerResident = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { firstName, lastName, createdBy, moveInDate, tags } = req.body;

    // Check that Resident number was included
    if (!firstName || !lastName || !moveInDate || !createdBy) {
      logAction(
        "ERROR",
        "registerResident",
        "validation",
        "Id not available",
        "Resident first name, last name, and move in date is required"
      );
      return res.status(400).json("Resident was not created!");
    }

    // Check if the Resident number already exists
    const existingResident = await findResident({ firstName: firstName });

    if (existingResident) {
      logAction(
        "ERROR",
        "registerResident",
        "validation",
        `ResidentID: ${existingResident.id}`,
        "Resident with that name already exists. Cannot duplicate."
      );
      return res
        .status(400)
        .json("A Resident with that number already exists!");
    }

    // Create the Resident
    const resident = await createResident({
      firstName,
      lastName,
      moveInDate,
      createdBy,
      tags,
    });

    if (!resident) {
      logAction(
        "ERROR",
        "registerResident",
        "validation",
        "ResidentID not available",
        "Resident creation failed."
      );
      return res
        .status(400)
        .json("Oops! Something happened. Resident was not created!");
    }

    logAction(
      "INFO",
      "registerResident",
      "database",
      `ResidentID: ${resident._id}`,
      "Resident creation successful"
    );
    return res.status(200).json(resident).end();
  } catch (e) {
    logAction(
      "ERROR",
      "registerResident",
      "unexpected",
      "ResidentID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Get All Residents
 * ? Should return all Residents in the database
 * TODO :
 * @param none
 */
export const getAllResidents = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const residents = await getResidents();
    if (!residents) {
      logAction(
        "INFO",
        "getAllResidents",
        "database",
        "ResidentID not available",
        "Failed to get all residents."
      );
    }

    logAction(
      "INFO",
      "getAllResidents",
      "database",
      "ResidentID not available",
      "Succeeded in getting all residents."
    );
    return res.status(200).json(residents).end();
  } catch (e) {
    logAction(
      "ERROR",
      "getAllResidents",
      "unexpected",
      "ResidentID not available",
      e.message
    );
    res.status(400);
  }
};

/**
 * Update Resident
 * ? Should update a Resident given the id
 * TODO :
 * @param id
 * @param Record<string, any>
 */
export const updateResident = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentResident = await findResident({ _id: id });

    if (!currentResident) {
      logAction(
        "ERROR",
        "updateResident",
        "validation",
        `ResidentID: ${id}`,
        "Could not find Resident. Edit failed."
      );
      return res.status(404).json("Could not find Resident. Edit failed.");
    }

    const updatedResident = await updateResidentById(id, updatedFields);

    if (!updatedResident) {
      logAction(
        "ERROR",
        "updatedResident",
        "database",
        `ResidentID: ${id}`,
        "Resident failed to update!"
      );
      return res.sendStatus(400);
    }

    logAction(
      "INFO",
      "updatedResident",
      "database",
      `ResidentID: ${id}`,
      "Resident successfully updated."
    );
    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction(
      "ERROR",
      "updateResident",
      "unexpected",
      "ResidentID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};

export const deleteResident = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedResident = await deleteResidentById(id);

    if (!deletedResident) {
      logAction(
        "ERROR",
        "deleteResident",
        "validation",
        `ResidentID: ${id}`,
        "Resident not found or already deleted."
      );
      return res.sendStatus(400);
    }

    logAction(
        "INFO",
        "deleteResident",
        "database",
        `ResidentID: ${id}`,
        "Resident deleted successfully."
      );
    return res.status(200).json("Resident was deleted successfully!");
  } catch (e) {
    logAction(
      "ERROR",
      "deleteResident",
      "unexpected",
      "ResidentID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};
