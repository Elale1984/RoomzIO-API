import express from  'express';

import { deleteUser, getAllUsers, getCurrentUserType } from '../controllers/users';
import { isAuthenticated, isOwner, isManager } from '../middleware/users';

export default (router: express.Router) => {
    router.get('/users', isAuthenticated, getAllUsers);
    router.delete('/users/:id', isAuthenticated, isOwner, deleteUser);
    router.get('/users/type/:id', isAuthenticated, isManager, getCurrentUserType);
    
};