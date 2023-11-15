import express  from 'express';
import { deleteWing, getAllWings, registerWing, updateWingFields } from './WingController';

/**
 * Configures routes related to Wings on the given Express Router instance.
 * @param {express.Router} router - The Express Router instance to configure.
 */

export default (router: express.Router) => {
    // GET endpoint to retrieve all Wings
    router.get('/wings', getAllWings);

    // POST endpoint to register a new Wing
    router.post('/wings', registerWing);

    // DELETE endpoint to delete a Wing by ID
    router.delete('/Wings/delete/:id', deleteWing);

    // PATCH endpoint to update Wing fields by ID
    router.patch('/wings/update/:id', updateWingFields);
}
