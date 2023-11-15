import express from "express";
import {
  createRoom,
  deleteRoomById,
  findRoom,
  getRooms,
  updateRoomById,
} from "./Room";
import { logAction } from "../middleware/MongoDBLogs";

/**
 * Creates a new room in the database.
 * - Should only create a room if one with the same name does not exist already.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const registerRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { roomNumber, roomCapacity, createdBy, roomTags, roomBeds } =
      req.body;

    // Check that room number was included
    if (!roomNumber) {
      logAction(
        "ERROR",
        "registerRoom",
        "validation",
        "Id not available",
        "Room Number name is required"
      );
      return res.status(400).json("Room was not created!");
    }

    // Check if the Room number already exists
    const existingRoom = await findRoom({ roomNumber: roomNumber });

    if (existingRoom) {
      logAction(
        "ERROR",
        "registerRoom",
        "validation",
        `RoomID: ${existingRoom.id}`,
        "Room with that name already exists. Cannot duplicate."
      );
      return res.status(400).json("A Room with that number already exists!");
    }

    // Create the Room
    const room = await createRoom({
      roomNumber,
      roomCapacity,
      createdBy,
      roomTags,
      roomBeds,
    });

    if (!room) {
      logAction(
        "ERROR",
        "registerRoom",
        "validation",
        "RoomID not available",
        "Room creation failed."
      );
      return res
        .status(400)
        .json("Oops! Something happened. room was not created!");
    }

    logAction(
      "INFO",
      "registerRoom",
      "database",
      `RoomID: ${room._id}`,
      "Room creation successful"
    );

    return res.status(200).json(room).end();
  } catch (e) {
    logAction(
      "ERROR",
      "registerRoom",
      "unexpected",
      "RoomID not available",
      e.message
    );
    return res.status(500).json("An error occurred!");
  }
};

/**
 * Retrieves all rooms from the database.
 * - Should return all rooms in the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const getAllRooms = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const rooms = await getRooms();
    if (!rooms) {
      logAction(
        "INFO",
        "getAllRooms",
        "database",
        "RoomID not available",
        "Failed to get all rooms."
      );
    }

    logAction(
        "INFO",
        "getAllRooms",
        "database",
        "RoomID not available",
        "Succeeded in getting all rooms."
      );
    return res.status(200).json(rooms).end();
  } catch (e) {
    logAction(
      "ERROR",
      "getAllRooms",
      "unexpected",
      "RoomID not available",
      e.message
    );
    res.status(400);
  }
};

/**
 * Updates a room in the database.
 * - Should update a room given the id.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const updateRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentRoom = await findRoom({ _id: id });

    if (!currentRoom) {
      logAction(
        "ERROR",
        "updateRoom",
        "validation",
        `RoomID: ${id}`,
        "Could not find room. Edit failed."
      );

      return res.status(404).json("Could not find Room. Edit failed.").end();
    }

    const updatedRoom = await updateRoomById(id, updatedFields);

    if (!updatedRoom) {
      logAction(
        "ERROR",
        "updateRoom",
        "database",
        `RoomID: ${id}`,
        "Room failed to update!"
      );
      return res.status(400).json("Could not modify Room!").end();
    }

    logAction(
      "INFO",
      "updateRoom",
      "database",
      `RoomID: ${id}`,
      "Room successfully updated."
    );

    return res.status(200).json(updatedFields);
  } catch (e) {
    logAction(
      "ERROR",
      "updateRoom",
      "unexpected",
      "RoomID not available",
      e.message
    );
    return res.status(400).json("Room was successfully updated!");
  }
};

/**
 * Deletes a room from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const deleteRoom = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;

    const deletedRoom = await deleteRoomById(id);

    if (!deletedRoom) {
      logAction(
        "ERROR",
        "deleteRoom",
        "validation",
        `RoomID: ${id}`,
        "Room not found or already deleted."
      );

      return res.status(400).json("Room was not deleted!");
    }
    
    logAction(
      "INFO",
      "deleteRoom",
      "database",
      `RoomID: ${id}`,
      "Room deleted successfully."
    );

    return res.status(200).json("Room was deleted successfully!");
  } catch (e) {
    logAction(
      "ERROR",
      "deleteRoom",
      "unexpected",
      "RoomID not available",
      e.message
    );
    return res.sendStatus(400);
  }
};
