import { logAction } from "../middleware/MongoDBLogs";
import {
  createMessageCenter,
  findMessageCenter,
  getMessageCenters,
  updateMessageCenterById,
  deleteMessageCenterById,
} from "./MessageCenter";
import express from "express";

/**
 * Create a new MessageCenter
 * ? Should only create a MessageCenter if one with the same name does not exist already
 * TODO :
 * @param none
 */
export const registerMessageCenter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { ownerId, alertBox, notificationBox, createdBy } = req.body;

    // Check that MessageCenter number was included
    if (!ownerId || !alertBox || !notificationBox || !createdBy) {
      logAction(
        "ERROR",
        "registerMessageCenter",
        "validation",
        "Id not available",
        "MessageCenter first name, last name, and move in date is required"
      );
      return res.status(400).json("MessageCenter was not created!");
    }

    // Check if the MessageCenter number already exists
    const existingMessageCenter = await findMessageCenter({ ownerId: ownerId });

    if (existingMessageCenter) {
      logAction(
        "ERROR",
        "registerMessageCenter",
        "validation",
        `MessageCenterID: ${existingMessageCenter.id}`,
        "MessageCenter with that name already exists. Cannot duplicate."
      );
      return res
        .status(400)
        .json("A MessageCenter with that number already exists!");
    }

    // Create the MessageCenter
    const messageCenters = await createMessageCenter({
      ownerId,
      alertBox,
      notificationBox,
      createdBy,
    });

    if (!messageCenters) {
      logAction(
        "ERROR",
        "registerMessageCenter",
        "validation",
        "MessageCenterID not available",
        "MessageCenter creation failed."
      );
      return res
        .status(400)
        .json("Oops! Something happened. MessageCenter was not created!");
    }

    logAction(
      "INFO",
      "registerMessageCenter",
      "database",
      `MessageCenterID: ${messageCenters._id}`,
      "MessageCenter creation successful"
    );
    return res.status(200).json(messageCenters).end();
  } catch (e) {
    logAction(
      "ERROR",
      "registerMessageCenter",
      "unexpected",
      "MessageCenterID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Get All MessageCenter
 * ? Should return all MessageCenter in the database
 * TODO :
 * @param none
 */
export const getAllMessageCenters = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const messageCenters = await getMessageCenters();
    if (!messageCenters) {
      logAction(
        "INFO",
        "getAllMessageCenter",
        "database",
        "MessageCenterID not available",
        "Failed to get all messageCenters."
      );
    }

    logAction(
      "INFO",
      "getAllMessageCenters",
      "database",
      "MessageCenterID not available",
      "Succeeded in getting all messageCenters."
    );
    return res.status(200).json(messageCenters).end();
  } catch (e) {
    logAction(
      "ERROR",
      "getAllMessageCenters",
      "unexpected",
      "MessageCenterID not available",
      e.message
    );
    res.status(400);
  }
};

/**
 * Update MessageCenter
 * ? Should update a MessageCenter given the id
 * TODO :
 * @param id
 * @param Record<string, any>
 */
export const updateMessageCenter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentMessageCenter = await findMessageCenter({ _id: id });

    if (!currentMessageCenter) {
      logAction(
        "ERROR",
        "updateMessageCenter",
        "validation",
        `MessageCenterID: ${id}`,
        "Could not find MessageCenter. Edit failed."
      );
      return res.status(404).json("Could not find MessageCenter. Edit failed.");
    }

    const updatedMessageCenter = await updateMessageCenterById(id, updatedFields);

    if (!updatedMessageCenter) {
      logAction(
        "ERROR",
        "updatedMessageCenter",
        "database",
        `MessageCenterID: ${id}`,
        "MessageCenter failed to update!"
      );
      return res.sendStatus(400);
    }

    logAction(
      "INFO",
      "updatedMessageCenter",
      "database",
      `MessageCenterID: ${id}`,
      "MessageCenter successfully updated."
    );
    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction(
      "ERROR",
      "updateMessageCenter",
      "unexpected",
      "MessageCenterID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};

export const deleteMessageCenter = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedMessageCenter = await deleteMessageCenterById(id);

    if (!deletedMessageCenter) {
      logAction(
        "ERROR",
        "deleteMessageCenter",
        "validation",
        `MessageCenterID: ${id}`,
        "MessageCenter not found or already deleted."
      );
      return res.sendStatus(400);
    }

    logAction(
        "INFO",
        "deleteMessageCenter",
        "database",
        `MessageCenterID: ${id}`,
        "MessageCenter deleted successfully."
      );
    return res.status(200).json("MessageCenter was deleted successfully!");
  } catch (e) {
    logAction(
      "ERROR",
      "deleteMessageCenter",
      "unexpected",
      "MessageCenterID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};
