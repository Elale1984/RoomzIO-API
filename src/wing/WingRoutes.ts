import express  from 'express';
import { deleteWing, getAllWings, registerWing, updateWingFields } from './WingController';
import { isAdmin, isAuthenticated, isManagerOrAdmin } from '../middleware/UserMiddleware';

/**
 * Configures routes related to Wings on the given Express Router instance.
 * @param {express.Router} router - The Express Router instance to configure.
 */

const wingRouter = (router: express.Router) => {
    // GET endpoint to retrieve all Wings
    router.get('/wings', isAuthenticated, getAllWings);

    // POST endpoint to register a new Wing
    router.post('/wings', isAuthenticated, isAdmin,registerWing);

    // DELETE endpoint to delete a Wing by ID
    router.delete('/Wings/delete/:id', isAuthenticated, isAdmin, deleteWing);

    // PATCH endpoint to update Wing fields by ID
    router.patch('/wings/update/:id', isAuthenticated, isManagerOrAdmin,updateWingFields);
}

export default wingRouter;