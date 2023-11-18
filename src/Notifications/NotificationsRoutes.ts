import { isAuthenticated, isManagerOrAdmin } from '../middleware/UserMiddleware';
import { deleteNotifications, getAllNotifications, registerNotifications, updateNotifications } from './NotificationsController';
import express  from 'express';

/**
 * Express router configuration for notifications-related routes.
 * @param {express.Router} router - The Express router instance.
 */

export default (router: express.Router) => {
    // Get all notifications
    router.get('/notification', isAuthenticated, getAllNotifications);

    // Create a new notification
    router.post('/notification', isAuthenticated, isManagerOrAdmin, registerNotifications);

    // Delete a notification by ID
    router.delete('/notification/delete/:id', isAuthenticated, isManagerOrAdmin, deleteNotifications);

    // Update a notification by ID
    router.patch('/notification/update/:id', isAuthenticated, isManagerOrAdmin, updateNotifications);
};
