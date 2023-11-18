import { logAction } from "../middleware/MongoDBLogs";
import {
  createNotification,
  findNotification,
  getNotifications,
  updateNotificationById,
  deleteNotificationById,
} from "./Notifications";
import express from "express";

/**
 * Create a new Notifications
 * ? Should only create a Notifications if one with the same name does not exist already
 * TODO :
 * @param none
 */
export const registerNotifications = async (
  req: express.Request,
  res: express.Response,
) => {
  try {
    const { notificationsName, notificationsDetails, notificationsType, recipientId, createdBy } = req.body;

    // Check that Notifications number was included
    if (!notificationsName || !notificationsDetails || !notificationsType || !recipientId || !createdBy) {
      logAction(
        "ERROR",
        "registerNotifications",
        "validation",
        "Id not available",
        "Notifications first name, last name, and move in date is required"
      );
      return res.status(400).json("Notifications was not created!");
    }

    // Check if the Notifications number already exists
    const existingNotifications = await findNotification({ notificationsName: notificationsName });

    if (existingNotifications) {
      logAction(
        "ERROR",
        "registerNotifications",
        "validation",
        `NotificationsID: ${existingNotifications.id}`,
        "Notifications with that name already exists. Cannot duplicate."
      );
      return res
        .status(400)
        .json("A Notifications with that number already exists!");
    }

    // Create the Notifications
    const notifications = await createNotification({
      notificationsName,
      notificationsDetails,
      notificationsType,
      recipientId,
      createdBy,
    });

    if (!notifications) {
      logAction(
        "ERROR",
        "registerNotifications",
        "validation",
        "NotificationsID not available",
        "Notifications creation failed."
      );
      return res
        .status(400)
        .json("Oops! Something happened. Notifications was not created!");
    }

    logAction(
      "INFO",
      "registerNotifications",
      "database",
      `NotificationsID: ${notifications._id}`,
      "Notifications creation successful"
    );
    return res.status(200).json(notifications).end();
  } catch (e) {
    logAction(
      "ERROR",
      "registerNotifications",
      "unexpected",
      "NotificationsID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Get All Notifications
 * ? Should return all Notifications in the database
 * TODO :
 * @param none
 */
export const getAllNotifications = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const notifications = await getNotifications();
    if (!notifications) {
      logAction(
        "INFO",
        "getAllNotifications",
        "database",
        "NotificationsID not available",
        "Failed to get all notifications."
      );
    }

    logAction(
      "INFO",
      "getAllNotifications",
      "database",
      "NotificationsID not available",
      "Succeeded in getting all notifications."
    );
    return res.status(200).json(notifications).end();
  } catch (e) {
    logAction(
      "ERROR",
      "getAllNotifications",
      "unexpected",
      "NotificationsID not available",
      e.message
    );
    res.status(400);
  }
};

/**
 * Update Notifications
 * ? Should update a Notifications given the id
 * TODO :
 * @param id
 * @param Record<string, any>
 */
export const updateNotifications = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentNotifications = await findNotification({ _id: id });

    if (!currentNotifications) {
      logAction(
        "ERROR",
        "updateNotifications",
        "validation",
        `NotificationsID: ${id}`,
        "Could not find Notifications. Edit failed."
      );
      return res.status(404).json("Could not find Notifications. Edit failed.");
    }

    const updatedNotifications = await updateNotificationById(id, updatedFields);

    if (!updatedNotifications) {
      logAction(
        "ERROR",
        "updatedNotifications",
        "database",
        `NotificationsID: ${id}`,
        "Notifications failed to update!"
      );
      return res.sendStatus(400);
    }

    logAction(
      "INFO",
      "updatedNotifications",
      "database",
      `NotificationsID: ${id}`,
      "Notifications successfully updated."
    );
    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction(
      "ERROR",
      "updateNotifications",
      "unexpected",
      "NotificationsID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};

export const deleteNotifications = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedNotifications = await deleteNotificationById(id);

    if (!deletedNotifications) {
      logAction(
        "ERROR",
        "deleteNotifications",
        "validation",
        `NotificationsID: ${id}`,
        "Notifications not found or already deleted."
      );
      return res.sendStatus(400);
    }

    logAction(
        "INFO",
        "deleteNotifications",
        "database",
        `NotificationsID: ${id}`,
        "Notifications deleted successfully."
      );
    return res.status(200).json("Notifications was deleted successfully!");
  } catch (e) {
    logAction(
      "ERROR",
      "deleteNotifications",
      "unexpected",
      "NotificationsID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};
