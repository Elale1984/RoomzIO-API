import { createTag, deleteTagById, findTag, getTags, updateTagById } from "../db/Tags";
import express from "express";

/**
 * Create a new Tag
 * ? Should only create a tag if one with the same name does not exist already
 * TODO : 
 * @param none
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

        if (
            !name ||
            !description ||
            !createdBy ||
            !color
        ) {
            return res.sendStatus(400);
        }
        
        const existingTag = await findTag({ name: name });

        if (existingTag) {
            return res.status(400).json('A tag with this name already exists! Tag not created.');
        }
        

        const tag = await createTag({name, description, createdBy, color});
        return res.status(200).json(tag).end();
    } catch (e) {
        console.log(e.message);
        res.sendStatus(400);
    }
}

/**
 * Get All Tags
 * ? Should return all tags in the database
 * TODO :
 * @param none
 */
export const getAllTags = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const tags = await getTags();
    return res.status(200).json(tags).end();
  } catch (e) {
    console.log(e.message);
    res.status(400);
  }
};

/**
 * Update Tag
 * ? Should update a tag given the id
 * TODO :
 * @param id
 */
export const updateTag = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;

        const currentTag = await findTag({ _id: id});

        if (!currentTag) {
            return res.status(404).json('Could not find tag. Edit failed.');
        }

        const updatedTag = await updateTagById(id, updatedFields);

        if (!updatedTag) {
            return res.sendStatus(400);
        }
        
        return res.status(200).json(updatedFields);
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(400);
    }
};

export const deleteTag = async (
    req: express.Request, 
    res: express.Response
) => {
    try {
        const { id } = req.params;

        const deletedTag = await deleteTagById(id);

        if (!deletedTag) {
            return res.sendStatus(400);
        }

        return res.status(200).json('Tag was deleted successfully!');
    } catch (e) {
        console.log(e.message);
        return res.sendStatus(400);
    }    
}; 


