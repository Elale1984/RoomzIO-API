import { isAuthenticated, isManagerOrAdmin } from '../middleware/UserMiddleware';
import { deleteResident, getAllResidents, registerResident, updateResident } from './ResidentController';
import express  from 'express';

/**
 * Express router configuration for resident-related routes.
 * @param {express.Router} router - The Express router instance.
 */

export default (router: express.Router) => {
    // Get all residents
    router.get('/resident', isAuthenticated, getAllResidents);

    // Create a new resident
    router.post('/resident', isAuthenticated, isManagerOrAdmin, registerResident);

    // Delete a resident by ID
    router.delete('/resident/delete/:id', isAuthenticated, isManagerOrAdmin, deleteResident);

    // Update a resident by ID
    router.patch('/resident/update/:id', isAuthenticated, isManagerOrAdmin, updateResident);
};
