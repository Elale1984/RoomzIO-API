import { logAction } from "../middleware/MongoDBLogs";
import { createTag, deleteTagById, findTag, getTags, updateTagById } from "./Tags";
import express from "express";

/**
 * Creates a new tag in the database.
 * - Should only create a tag if one with the same name does not exist already.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const registerTag = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const {
            name,
            description,
            createdBy,
            color,
        } = req.body;

        // Check for required fields
        if (!name || !description || !createdBy || !color) {
            logAction("ERROR", "registerTag", "validation", "Id not available", "Tag name is required");
            return res.sendStatus(400);
        }
        
        // Check if a tag with the same name already exists
        const existingTag = await findTag({ name: name });

        if (existingTag) {
            logAction("ERROR", "registerTag", "validation", `Tag with ID of ${existingTag.id}`, "Tag with that name already exists. Cannot duplicate.");
            return res.status(400).json('A tag with this name already exists! Tag not created.');
        }
        
        // Create the tag
        const tag = await createTag({name, description, createdBy, color});
        
        logAction("INFO", "registerTag", "database", `TagID: ${tag._id}`, "Tag creation successful");

        return res.status(200).json(tag).end();
    } catch (e) {
        logAction("ERROR", "registerTag", "unexpected", "TagID not available", e.message);
        res.sendStatus(400);
    }
}

/**
 * Retrieves all tags from the database.
 * - Should return all tags in the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const getAllTags = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const tags = await getTags();
        logAction("ERROR", "getAllTags", "validation", "TagID not available", "Failed to get all tags.");

        return res.status(200).json(tags).end();
    } catch (e) {
        logAction("ERROR", "getAllTag", "unexpected", "TagID not available", e.message);
        res.status(400);
    }
};

/**
 * Updates a tag in the database.
 * - Should update a tag given the ID.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const updateTag = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        // Find the current tag by ID
        const currentTag = await findTag({ _id: id });

        if (!currentTag) {
            logAction("ERROR", "updateTag", "validation", `TagID: ${id}`, "Could not find Tag. Edit failed.");
            return res.status(404).json('Could not find tag. Edit failed.');
        }

        // Update the tag
        const updatedTag = await updateTagById(id, updatedFields);

        if (!updatedTag) {
            logAction("ERROR", "updateTag", "validation", `TagID: ${id}`, "Tag was not updated.");
            return res.sendStatus(400);
        }
        
        return res.status(200).json(updatedFields);
    } catch (e) {
        logAction("ERROR", "updateTag", "unexpected", "TagID not available", e.message);
        return res.sendStatus(400);
    }
};

/**
 * Deletes a tag from the database.
 * @param {express.Request} req - The Express Request object.
 * @param {express.Response} res - The Express Response object.
 */
export const deleteTag = async (
    req: express.Request, 
    res: express.Response
) => {
    try {
        const { id } = req.params;

        // Delete the tag by ID
        const deletedTag = await deleteTagById(id);

        if (!deletedTag) {
            logAction("ERROR", "deleteTag", "validation", `TagID: ${id}`, "Tag not found or already deleted.");
            return res.sendStatus(400);
        }

        return res.status(200).json('Tag was deleted successfully!');
    } catch (e) {
        logAction("ERROR", "deleteTag", "unexpected", "TagID not available", e.message);
        return res.sendStatus(400);
    }    
}; 
