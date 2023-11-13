import express from  'express';

import { deleteUser, getAllUsers, getCurrentUserType, updateUserFields } from './UserController';
import { isAuthenticated, isAdmin, isManagerOrAdmin } from '../middleware/UserMiddleware';

/**
 * Configures routes related to users on the given Express Router instance.
 * @param {express.Router} router - The Express Router instance to configure.
 */

export default (router: express.Router) => {
    // GET endpoint to retrieve all users, requires authentication
    router.get('/users', isAuthenticated, getAllUsers);

    // DELETE endpoint to delete a user by ID, requires authentication and admin privileges
    router.delete('/users/delete/:id', isAuthenticated, isAdmin, deleteUser);

    // GET endpoint to retrieve the type of the current user by ID, requires authentication and manager or admin privileges
    router.get('/users/type/:id', isAuthenticated, isManagerOrAdmin, getCurrentUserType);

    // PATCH endpoint to update user fields by ID, requires authentication
    router.patch('/users/update/:id', isAuthenticated, updateUserFields);
};
