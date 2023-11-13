import { createBed, findBed } from "./Bed";
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

