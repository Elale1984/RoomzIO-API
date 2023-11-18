import { isAuthenticated, isManagerOrAdmin } from '../middleware/UserMiddleware';
import { deleteMessageCenter, getAllMessageCenters, registerMessageCenter, updateMessageCenter } from './MessageCenterController';
import express  from 'express';

/**
 * Express router configuration for notifications-related routes.
 * @param {express.Router} router - The Express router instance.
 */

export default (router: express.Router) => {
    // Get all notifications
    router.get('/message-center', isAuthenticated, getAllMessageCenters);

    // Create a new notification
    router.post('/message-center', isAuthenticated, isManagerOrAdmin, registerMessageCenter);

    // Delete a notification by ID
    router.delete('/message-center/delete/:id', isAuthenticated, isManagerOrAdmin, deleteMessageCenter);

    // Update a notification by ID
    router.patch('/message-center/update/:id', isAuthenticated, isManagerOrAdmin, updateMessageCenter);
};
