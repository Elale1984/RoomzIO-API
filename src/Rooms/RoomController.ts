import express from "express";
import { createRoom, deleteRoomById, findRoom, getRooms, updateRoomById } from "./Room";

/**
 * Create a new Room
 * ? Should only create a Room if one with the same name does not exist already
 * TODO : 
 * @param none
 */
export const registerRoom =async (
    req: express.Request, 
    res: express.Response
) => {
    try {

        const {
            roomNumber,
            roomCapacity,
            createdBy,
            roomTags,
            roomBeds,   
        } = req.body;

        // Check that room number was included
        if (!roomNumber) {
            return res.status(400).json('Room was not created!');
        }

        // Check if the Room number already exists
        const existingRoom = await findRoom({ roomNumber: roomNumber});

        if (existingRoom) {
            return res.status(400).json('A Room with that number already exists!');
        }

        // Create the Room
        const room = await createRoom({roomNumber, roomCapacity, createdBy, roomTags, roomBeds});
        
        if (!room) {
            return res.status(400).json('Oops! Something happened. room was not created!');
        }

        return res.status(200).json(room).end();
    } catch (e) {
        console.log(e.message);
        return res.status(500).json('An error occurred!');
    }    
};


/**
 * Get All rooms
 * ? Should return all rooms in the database
 * TODO :
 * @param none
 */
export const getAllRooms = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const rooms = await getRooms();
      return res.status(200).json(rooms).end();
    } catch (e) {
      console.log(e.message);
      res.status(400);
    }
  };
  
  /**
   * Update room
   * ? Should update a room given the id
   * TODO :
   * @param id
   */
  export const updateRoomFields = async (
      req: express.Request,
      res: express.Response
  ) => {
      try {
          const { id } = req.params;
          const updatedFields = req.body;
  
          const currentRoom = await findRoom({ _id: id});
  
          if (!currentRoom) {
              return res.status(404).json('Could not find Room. Edit failed.').end();
          }
  
          const updatedRoom = await updateRoomById(id, updatedFields);
  
          if (!updatedRoom) {
              return res.status(400).json('Could not modify Room!').end();
          }
          
          return res.status(200).json(updatedFields);
      } catch (e) {
          console.log(e.message);
          return res.status(400).json('Room was successfully updated!');
      }
  };
  
  export const deleteRoom = async (
      req: express.Request, 
      res: express.Response
  ) => {
      try {
          const { id } = req.params;
  
          const deletedRoom = await deleteRoomById(id);
  
          if (!deletedRoom) {
              return res.status(400).json('Room was not deleted!');
          }
  
          return res.status(200).json('Room was deleted successfully!');
      } catch (e) {
          console.log(e.message);
          return res.sendStatus(400);
      }    
  }; 
  
  
  
