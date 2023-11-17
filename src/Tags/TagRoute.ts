import { isAuthenticated } from '../middleware/UserMiddleware';
import { deleteTag, getAllTags, registerTag, updateTag } from './TagController';
import express  from 'express';

/**
 * Configures routes related to tags on the given Express Router instance.
 * @param {express.Router} router - The Express Router instance to configure.
 */

export default (router: express.Router) => {
    // GET endpoint to retrieve all tags
    router.get('/tags', isAuthenticated, getAllTags);

    // POST endpoint to register a new tag
    router.post('/tags', isAuthenticated, registerTag);

    // DELETE endpoint to delete a tag by ID
    router.delete('/tags/delete/:id', isAuthenticated, deleteTag);

    // PATCH endpoint to update a tag by ID
    router.patch('/tags/update/:id', isAuthenticated, updateTag);
}
