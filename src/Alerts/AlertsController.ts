import { logAction } from "../middleware/MongoDBLogs";
import {
  createAlert,
  findAlert,
  getAlerts,
  updateAlertById,
  deleteAlertById,
} from "./Alerts";
import express from "express";

/**
 * Create a new Alerts
 * ? Should only create a Alerts if one with the same name does not exist already
 * TODO :
 * @param none
 */
export const registerAlerts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { alertName, alertDetails, alertSeverity, alertType, alertLocation, createdBy } = req.body;

    // Check that Alerts number was included
    if (!alertName || !alertDetails || !alertSeverity || !alertType || !alertLocation || !createdBy) {
      logAction(
        "ERROR",
        "registerAlerts",
        "validation",
        "Id not available",
        "Alerts first name, last name, and move in date is required"
      );
      return res.status(400).json("Alerts was not created!");
    }

    // Check if the Alerts number already exists
    const existingAlerts = await findAlert({ alertName: alertName });

    if (existingAlerts) {
      logAction(
        "ERROR",
        "registerAlerts",
        "validation",
        `AlertsID: ${existingAlerts.id}`,
        "Alerts with that name already exists. Cannot duplicate."
      );
      return res
        .status(400)
        .json("A Alerts with that number already exists!");
    }

    // Create the Alerts
    const alerts = await createAlert({
      alertName,
      alertDetails,
      alertSeverity,
      alertType,
      alertLocation,
      createdBy,
    });

    if (!alerts) {
      logAction(
        "ERROR",
        "registerAlerts",
        "validation",
        "AlertsID not available",
        "Alerts creation failed."
      );
      return res
        .status(400)
        .json("Oops! Something happened. Alerts was not created!");
    }

    logAction(
      "INFO",
      "registerAlerts",
      "database",
      `AlertsID: ${alerts._id}`,
      "Alerts creation successful"
    );
    return res.status(200).json(alerts).end();
  } catch (e) {
    logAction(
      "ERROR",
      "registerAlerts",
      "unexpected",
      "AlertsID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Get All Alerts
 * ? Should return all Alerts in the database
 * TODO :
 * @param none
 */
export const getAllAlerts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const alerts = await getAlerts();
    if (!alerts) {
      logAction(
        "INFO",
        "getAllAlerts",
        "database",
        "AlertsID not available",
        "Failed to get all alerts."
      );
    }

    logAction(
      "INFO",
      "getAllAlerts",
      "database",
      "AlertsID not available",
      "Succeeded in getting all alerts."
    );
    return res.status(200).json(alerts).end();
  } catch (e) {
    logAction(
      "ERROR",
      "getAllAlerts",
      "unexpected",
      "AlertsID not available",
      e.message
    );
    res.status(400);
  }
};

/**
 * Update Alerts
 * ? Should update a Alerts given the id
 * TODO :
 * @param id
 * @param Record<string, any>
 */
export const updateAlerts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentAlerts = await findAlert({ _id: id });

    if (!currentAlerts) {
      logAction(
        "ERROR",
        "updateAlerts",
        "validation",
        `AlertsID: ${id}`,
        "Could not find Alerts. Edit failed."
      );
      return res.status(404).json("Could not find Alerts. Edit failed.");
    }

    const updatedAlerts = await updateAlertById(id, updatedFields);

    if (!updatedAlerts) {
      logAction(
        "ERROR",
        "updatedAlerts",
        "database",
        `AlertsID: ${id}`,
        "Alerts failed to update!"
      );
      return res.sendStatus(400);
    }

    logAction(
      "INFO",
      "updatedAlerts",
      "database",
      `AlertsID: ${id}`,
      "Alerts successfully updated."
    );
    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction(
      "ERROR",
      "updateAlerts",
      "unexpected",
      "AlertsID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};

export const deleteAlerts = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedAlerts = await deleteAlertById(id);

    if (!deletedAlerts) {
      logAction(
        "ERROR",
        "deleteAlerts",
        "validation",
        `AlertsID: ${id}`,
        "Alerts not found or already deleted."
      );
      return res.sendStatus(400);
    }

    logAction(
        "INFO",
        "deleteAlerts",
        "database",
        `AlertsID: ${id}`,
        "Alerts deleted successfully."
      );
    return res.status(200).json("Alerts was deleted successfully!");
  } catch (e) {
    logAction(
      "ERROR",
      "deleteAlerts",
      "unexpected",
      "AlertsID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};
