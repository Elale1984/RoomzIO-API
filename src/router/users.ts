import express from  'express';

import { deleteUser, getAllUsers, getCurrentUserType, updateUserFields } from '../controllers/users';
import { isAuthenticated, isAdmin, isManagerOrAdmin } from '../middleware/users';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/delete/:id', isAuthenticated, isAdmin, deleteUser);
    router.get('/users/type/:id', isAuthenticated, isManagerOrAdmin, getCurrentUserType);
    router.patch('/users/update/:id', isAuthenticated, updateUserFields);
};