import express from "express";
import {

  createOrganization,
  deleteOrganizationById,
  findOrganization,
  getOrganizations,
  updateOrganizationById,
} from "./Organization";
import { logAction } from "../middleware/MongoDBLogs";

export const registerOrganization = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      organizationName,
      organizationEmail,
      organizationTypes,
      organizationAddress,
      organizationFacilities,
    } = req.body;

    if (!organizationName) {
      logAction(
        "ERROR",
        "registerOrganization",
        "validation",
        "Id not available",
        "Organization name is required"
      );
      return res.status(400).json("Organization was not created!");
    }

    // Check if the Organization name already exists
    const existingOrganization = await findOrganization({ organizationName: organizationName });

    if (existingOrganization) {
      logAction(
        "ERROR",
        "registerOrganization",
        "validation",
        `OrganizationID: ${existingOrganization.id}`,
        "Organization with that name already exists. Cannot duplicate."
      );
      return res.status(400).json("A Organization with that number already exists!");
    }

    // Create the Organization
    const organization = await createOrganization({
      organizationName,
      organizationEmail,
      organizationTypes,
      organizationAddress,
      organizationFacilities,
    });

    if (!organization) {
      logAction(
        "ERROR",
        "registerOrganization",
        "database",
        "OrganizationID not available",
        "Organization creation failed."
      );
      return res
        .status(400)
        .json("Oops! Something happened. Organization was not created!");
    }

    logAction(
      "INFO",
      "registerOrganization",
      "database",
      `OrganizationID: ${organization._id}`,
      "Organization creation successfully."
    );

    return res.status(200).json(organization).end();
  } catch (e) {
    logAction(
      "ERROR",
      "registerOrganization",
      "unexpected",
      "OrganizationID not available",
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
export const getAllOrganizations = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const organization = await getOrganizations();

    logAction(
      "INFO",
      "getAllFacilities",
      "database",
      "OrganizationID not available",
      "Failed to get all organization."
    );
    return res.status(200).json(organization).end();
  } catch (e) {
    logAction(
      "ERROR",
      "getAllFacilities",
      "database",
      "OrganizationID not available",
      e.message
    );
    res.status(500).json("An error occurred!");
  }
};

/**
 * Updates a Organization in the database.
 * - Should update a Organization given the id.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const updateOrganizationFields = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentOrganization = await findOrganization({ _id: id });

    if (!currentOrganization) {
      logAction(
        "ERROR",
        "updateOrganizationFields",
        "validation",
        `OrganizationID: ${id}`,
        "Could not find Organization. Edit failed."
      );
      return res.status(404).json("Could not find Organization. Edit failed.").end();
    }

    const updatedOrganization = await updateOrganizationById(id, updatedFields);

    if (!updatedOrganization) {
      logAction(
        "ERROR",
        "updateOrganization",
        "database",
        `OrganizationID: ${id}`,
        "Organization failed to update!"
      );
      return res.status(400).json("Could not modify Organization!").end();
    }

    logAction(
      "INFO",
      "updateOrganizationFields",
      "database",
      `OrganizationID: ${id}`,
      "Organization successfully updated."
    );

    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction(
      "ERROR",
      "updateOrganizationFields",
      "unexpected",
      "OrganizationID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Deletes a Organization from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const deleteOrganization = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedOrganization = await deleteOrganizationById(id);

    if (!deletedOrganization) {
      logAction(
        "ERROR",
        "deleteOrganization",
        "validation",
        `OrganizationID: ${id}`,
        "Organization not found or already deleted."
      );
      return res.status(404).json("Organization not found or already deleted.");
    }

    logAction(
      "INFO",
      "deleteOrganization",
      "database",
      `OrganizationID: ${id}`,
      "Organization deleted successfully."
    );

    return res.status(200).json("Organization was deleted successfully!");
  } catch (e) {
    logAction(
      "ERROR",
      "deleteOrganization",
      "unexpected",
      "OrganizationID not available",
      e.message
    );
    return res.status(500).json("An unexpected error occurred!");
  }
};
