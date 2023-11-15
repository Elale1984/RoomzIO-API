import express from "express";
import { createWing, deleteWingById, findWing, getWings, updateWingById } from "./Wings";

/**
 * Creates a new Wing in the database.
 * - Should only create a Wing if one with the same name does not exist already.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const registerWing = async (
    req: express.Request, 
    res: express.Response
) => {
    try {
        const {
            wingName,
            wingCapacity,
            createdBy,
            wingTags,
            wingRooms,   
        } = req.body;

        // Check that Wing number was included
        if (!wingName) {
            return res.status(400).json('Wing was not created!');
        }

        // Check if the Wing number already exists
        const existingWing = await findWing({ wingName: wingName});

        if (existingWing) {
            return res.status(400).json('A Wing with that number already exists!');
        }

        // Create the Wing
        const wing = await createWing({wingName, wingCapacity, createdBy, wingTags, wingRooms});
        
        if (!wing) {
            return res.status(400).json('Oops! Something happened. Wing was not created!');
        }

        return res.status(200).json(wing).end();
    } catch (e) {
        console.log(e.message);
        return res.status(500).json('An error occurred!');
    }    
};

/**
 * Retrieves all Wings from the database.
 * - Should return all Wings in the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const getAllWings = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const wings = await getWings();
        return res.status(200).json(wings).end();
    } catch (e) {
        console.log(e.message);
        res.status(400);
    }
};

/**
 * Updates a Wing in the database.
 * - Should update a Wing given the id.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const updateWingFields = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        const currentWing = await findWing({ _id: id});

        if (!currentWing) {
            return res.status(404).json('Could not find Wing. Edit failed.').end();
        }

        const updatedWing = await updateWingById(id, updatedFields);

        if (!updatedWing) {
            return res.status(400).json('Could not modify Wing!').end();
        }

        return res.status(200).json(updatedFields);
    } catch (e) {
        console.log(e.message);
        return res.status(400).json('Wing was successfully updated!');
    }
};

/**
 * Deletes a Wing from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const deleteWing = async (
    req: express.Request, 
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const deletedWing = await deleteWingById(id);

        if (!deletedWing) {
            return res.status(400).json('Wing was not deleted!');
        }

        return res.status(200).json('Wing was deleted successfully!');
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(400);
    }    
};
