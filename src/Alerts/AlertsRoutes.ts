import { isAuthenticated, isManagerOrAdmin } from '../middleware/UserMiddleware';
import { deleteAlerts, getAllAlerts, registerAlerts, updateAlerts } from './AlertsController';
import express  from 'express';

/**
 * Express router configuration for alerts-related routes.
 * @param {express.Router} router - The Express router instance.
 */

export default (router: express.Router) => {
    // Get all alerts
    router.get('/alert', isAuthenticated, getAllAlerts);

    // Create a new alert
    router.post('/alert', isAuthenticated, isManagerOrAdmin, registerAlerts);

    // Delete a alert by ID
    router.delete('/alert/delete/:id', isAuthenticated, isManagerOrAdmin, deleteAlerts);

    // Update a alert by ID
    router.patch('/alert/update/:id', isAuthenticated, isManagerOrAdmin, updateAlerts);
};
