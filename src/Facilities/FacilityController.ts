import { logAction } from "../middleware/MongoDBLogs";
import {
  createFacility,
  findFacility,
  getFacilities,
  updateFacilityById,
  deleteFacilityById,
} from "./Facility";
import express from "express";

/**
 * Creates a new Facility in the database.
 * - Should only create a Facility if one with the same name does not exist already.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const registerFacility = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { 
      facilityName, 
      facilityCapacity, 
      createdBy,
      facilityTypes, 
      facilityTags, 
      facilityWings 
    } = req.body;
    
    // Check that Facility name was included
    if (!facilityName) {
      logAction(
        "ERROR",
        "registerFacility",
        "validation",
        "Id not available",
        "Facility name is required"
      );
      return res.status(400).json("Facility was not created!");
    }

    // Check if the Facility name already exists
    const existingFacility = await findFacility({ facilityName: facilityName });

    if (existingFacility) {
      logAction(
        "ERROR",
        "registerFacility",
        "validation",
        `FacilityID: ${existingFacility.id}`,
        "Facility with that name already exists. Cannot duplicate."
      );
      return res.status(400).json("A Facility with that number already exists!");
    }

    // Create the Facility
    const facility = await createFacility({
      facilityName,
      facilityCapacity,
      createdBy,
      facilityTypes,
      facilityTags,
      facilityWings,
    });

    if (!facility) {
      logAction(
        "ERROR",
        "registerFacility",
        "database",
        "FacilityID not available",
        "Facility creation failed."
      );
      return res
        .status(400)
        .json("Oops! Something happened. Facility was not created!");
    }

    logAction(
      "INFO",
      "registerFacility",
      "database",
      `FacilityID: ${facility._id}`,
      "Facility creation successfully."
    );

    return res.status(200).json(facility).end();
  } catch (e) {
    logAction(
      "ERROR",
      "registerFacility",
      "unexpected",
      "FacilityID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Retrieves all Facilities from the database.
 * - Should return all Facilities in the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const getAllFacilities = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const facilities = await getFacilities();

    logAction(
      "INFO",
      "getAllFacilities",
      "database",
      "FacilityID not available",
      "Failed to get all facilities."
    );
    return res.status(200).json(facilities).end();
  } catch (e) {
    logAction(
      "ERROR",
      "getAllFacilities",
      "database",
      "FacilityID not available",
      e.message
    );
    res.status(500).json("An error occurred!");
  }
};

/**
 * Updates a Facility in the database.
 * - Should update a Facility given the id.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const updateFacilityFields = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentFacility = await findFacility({ _id: id });

    if (!currentFacility) {
      logAction(
        "ERROR",
        "updateFacilityFields",
        "validation",
        `FacilityID: ${id}`,
        "Could not find Facility. Edit failed."
      );
      return res.status(404).json("Could not find Facility. Edit failed.").end();
    }

    const updatedFacility = await updateFacilityById(id, updatedFields);

    if (!updatedFacility) {
      logAction(
        "ERROR",
        "updateFacility",
        "database",
        `FacilityID: ${id}`,
        "Facility failed to update!"
      );
      return res.status(400).json("Could not modify Facility!").end();
    }

    logAction(
      "INFO",
      "updateFacilityFields",
      "database",
      `FacilityID: ${id}`,
      "Facility successfully updated."
    );

    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction(
      "ERROR",
      "updateFacilityFields",
      "unexpected",
      "FacilityID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Deletes a Facility from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const deleteFacility = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedFacility = await deleteFacilityById(id);

    if (!deletedFacility) {
      logAction(
        "ERROR",
        "deleteFacility",
        "validation",
        `FacilityID: ${id}`,
        "Facility not found or already deleted."
      );
      return res.status(404).json("Facility not found or already deleted.");
    }

    logAction(
      "INFO",
      "deleteFacility",
      "database",
      `FacilityID: ${id}`,
      "Facility deleted successfully."
    );

    return res.status(200).json("Facility was deleted successfully!");
  } catch (e) {
    logAction(
      "ERROR",
      "deleteFacility",
      "unexpected",
      "FacilityID not available",
      e.message
    );
    return res.status(500).json("An unexpected error occurred!");
  }
};
