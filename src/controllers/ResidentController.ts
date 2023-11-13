import { createResident, findResident, getResidents, updateResidentById, deleteResidentById } from "../db/Residents";
import express from "express";

/**
 * Create a new Resident
 * ? Should only create a Resident if one with the same name does not exist already
 * TODO : 
 * @param none
 */
export const registerResident =async (
    req: express.Request, 
    res: express.Response
) => {
    try {

        const {
            firstName,
            lastName,
            createdBy,
            moveInDate,
            tags,   
        } = req.body;

        // Check that Resident number was included
        if (
            !firstName || 
            !lastName || 
            !moveInDate ||
            !createdBy
        ) {
            return res.status(400).json('Resident was not created!');
        }

        // Check if the Resident number already exists
        const existingResident = await findResident({ firstName: firstName });

        if (existingResident) {
            return res.status(400).json('A Resident with that number already exists!');
        }

        // Create the Resident
        const resident = await createResident({firstName, lastName, moveInDate, createdBy, tags});
        
        if (!resident) {
            return res.status(400).json('Oops! Something happened. Resident was not created!');
        }

        return res.status(200).json(resident).end();
    } catch (e) {
        console.log(e.message);
        return res.status(500).json('An error occurred!');
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
      return res.status(200).json(residents).end();
    } catch (e) {
      console.log(e.message);
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
  
          const currentResident = await findResident({ _id: id});
  
          if (!currentResident) {
              return res.status(404).json('Could not find Resident. Edit failed.');
          }
  
          const updatedResident = await updateResidentById(id, updatedFields);
  
          if (!updatedResident) {
              return res.sendStatus(400);
          }
          
          return res.status(200).json(updatedFields);
      } catch (e) {
          console.log(e.message);
          return res.sendStatus(400);
      }
  };
  
  export const deleteResident = async (
      req: express.Request, 
      res: express.Response
  ) => {
      try {
          const { id } = req.params;
  
          const deletedResident= await deleteResidentById(id);
  
          if (!deletedResident) {
              return res.sendStatus(400);
          }
  
          return res.status(200).json('Resident was deleted successfully!');
      } catch (e) {
          console.log(e.message);
          return res.sendStatus(400);
      }    
  }; 
  
  
  