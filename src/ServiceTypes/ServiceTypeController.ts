import express from "express";
import {
  createServiceTypes,
  deleteServiceTypesById,
  findServiceTypes,
  getServiceTypes,
  updateServiceTypesById,
} from "./ServiceTypes";
import { logAction } from "../middleware/MongoDBLogs";

/**
 * Creates a new ServiceTypes in the database.
 * - Should only create a ServiceTypes if one with the same name does not exist already.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const registerServiceTypes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { 
      serviceTypeName, 
      createdBy
    } = req.body;
    console.log(req.body);

    // Check that ServiceTypes name was included
    if (!serviceTypeName) {
      logAction(
        "ERROR",
        "registerServiceTypes",
        "validation",
        "Id not available",
        "ServiceTypes name is required"
      );
      return res.status(400).json("ServiceTypes was not created!");
    }

    // Check if the ServiceTypes name already exists
    const existingServiceTypes = await findServiceTypes({ serviceTypeName: serviceTypeName });

    if (existingServiceTypes) {
      logAction(
        "ERROR",
        "registerServiceTypes",
        "validation",
        `ServiceTypesID: ${existingServiceTypes.id}`,
        "ServiceTypes with that name already exists. Cannot duplicate."
      );
      return res.status(400).json("A ServiceTypes with that number already exists!");
    }

    // Create the ServiceTypes
    const serviceTypes = await createServiceTypes({
      serviceTypeName,
      createdBy,
    });

    if (!serviceTypes) {
      logAction(
        "ERROR",
        "registerServiceTypes",
        "database",
        "ServiceTypesID not available",
        "ServiceTypes creation failed."
      );
      return res
        .status(400)
        .json("Oops! Something happened. ServiceTypes was not created!");
    }

    logAction(
      "INFO",
      "registerServiceTypes",
      "database",
      `ServiceTypesID: ${serviceTypes._id}`,
      "ServiceTypes creation successfully."
    );

    return res.status(200).json(serviceTypes).end();
  } catch (e) {
    logAction(
      "ERROR",
      "registerServiceTypes",
      "unexpected",
      "ServiceTypesID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Retrieves all ServiceTypes from the database.
 * - Should return all ServiceTypes in the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const getAllServiceTypes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const serviceTypes = await getServiceTypes();

    logAction(
      "INFO",
      "getAllServiceTypes",
      "database",
      "ServiceTypesID not available",
      "Failed to get all serviceTypes."
    );
    return res.status(200).json(serviceTypes).end();
  } catch (e) {
    logAction(
      "ERROR",
      "getAllServiceTypes",
      "database",
      "ServiceTypesID not available",
      e.message
    );
    res.status(500).json("An error occurred!");
  }
};

/**
 * Updates a ServiceTypes in the database.
 * - Should update a ServiceTypes given the id.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const updateServiceTypesFields = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentServiceTypes = await findServiceTypes({ _id: id });

    if (!currentServiceTypes) {
      logAction(
        "ERROR",
        "updateServiceTypesFields",
        "validation",
        `ServiceTypesID: ${id}`,
        "Could not find ServiceTypes. Edit failed."
      );
      return res.status(404).json("Could not find ServiceTypes. Edit failed.").end();
    }

    const updatedServiceTypes = await updateServiceTypesById(id, updatedFields);

    if (!updatedServiceTypes) {
      logAction(
        "ERROR",
        "updateServiceTypes",
        "database",
        `ServiceTypesID: ${id}`,
        "ServiceTypes failed to update!"
      );
      return res.status(400).json("Could not modify ServiceTypes!").end();
    }

    logAction(
      "INFO",
      "updateServiceTypesFields",
      "database",
      `ServiceTypesID: ${id}`,
      "ServiceTypes successfully updated."
    );

    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction(
      "ERROR",
      "updateServiceTypesFields",
      "unexpected",
      "ServiceTypesID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Deletes a ServiceTypes from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const deleteServiceTypes = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedServiceTypes = await deleteServiceTypesById(id);

    if (!deletedServiceTypes) {
      logAction(
        "ERROR",
        "deleteServiceTypes",
        "validation",
        `ServiceTypesID: ${id}`,
        "ServiceTypes not found or already deleted."
      );
      return res.status(404).json("ServiceTypes not found or already deleted.");
    }

    logAction(
      "INFO",
      "deleteServiceTypes",
      "database",
      `ServiceTypesID: ${id}`,
      "ServiceTypes deleted successfully."
    );

    return res.status(200).json("ServiceTypes was deleted successfully!");
  } catch (e) {
    logAction(
      "ERROR",
      "deleteServiceTypes",
      "unexpected",
      "ServiceTypesID not available",
      e.message
    );
    return res.status(500).json("An unexpected error occurred!");
  }
};
