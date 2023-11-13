import { createBed, deleteBedById, findBed, getBeds, updateBedById } from "./Bed";
import express from "express";

/**
 * Create a new Bed
 * ? Should only create a bed if one with the same name does not exist already
 * TODO : 
 * @param none
 */
export const registerBed =async (
    req: express.Request, 
    res: express.Response
) => {
    try {

        const {
            bedNumber,
            createdBy,
            tags,   
        } = req.body;

        // Check that bed number was included
        if (!bedNumber) {
            return res.status(400).json('Bed was not created!');
        }

        // Check if the bed number already exists
        const existingBed = await findBed({ bedNumber: bedNumber});

        if (existingBed) {
            return res.status(400).json('A bed with that number already exists!');
        }

        // Create the bed
        const bed = await createBed({bedNumber, createdBy, tags});
        
        if (!bed) {
            return res.status(400).json('Oops! Something happened. Bed was not created!');
        }

        return res.status(200).json(bed).end();
    } catch (e) {
        console.log(e.message);
        return res.status(500).json('An error occurred!');
    }    
};


/**
 * Get All Beds
 * ? Should return all Beds in the database
 * TODO :
 * @param none
 */
export const getAllBeds = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const beds = await getBeds();
      return res.status(200).json(beds).end();
    } catch (e) {
      console.log(e.message);
      res.status(400);
    }
  };
  
  /**
   * Update Bed
   * ? Should update a Bed given the id
   * TODO :
   * @param id
   */
  export const updateBedFields = async (
      req: express.Request,
      res: express.Response
  ) => {
      try {
          const { id } = req.params;
          const updatedFields = req.body;
  
          const currentBed = await findBed({ _id: id});
  
          if (!currentBed) {
              return res.status(404).json('Could not find Bed. Edit failed.').end();
          }
  
          const updatedBed = await updateBedById(id, updatedFields);
  
          if (!updatedBed) {
              return res.status(400).json('Could not modify bed!').end();
          }
          
          return res.status(200).json(updatedFields);
      } catch (e) {
          console.log(e.message);
          return res.status(400).json('Bed was successfully updated!');
      }
  };
  
  export const deleteBed = async (
      req: express.Request, 
      res: express.Response
  ) => {
      try {
          const { id } = req.params;
  
          const deletedBed = await deleteBedById(id);
  
          if (!deletedBed) {
              return res.status(400).json('Bed was not deleted!');
          }
  
          return res.status(200).json('Bed was deleted successfully!');
      } catch (e) {
          console.log(e.message);
          return res.sendStatus(400);
      }    
  }; 
  
  
  
