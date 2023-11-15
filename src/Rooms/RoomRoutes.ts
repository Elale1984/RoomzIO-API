import express  from 'express';
import { deleteRoom, getAllRooms, registerRoom, updateRoom } from './RoomController';

/**
 * Configures routes related to rooms on the given Express Router instance.
 * @param {express.Router} router - The Express Router instance to configure.
 */

export default (router: express.Router) => {
    // GET endpoint to retrieve all rooms
    router.get('/rooms', getAllRooms);

    // POST endpoint to register a new room
    router.post('/rooms', registerRoom);

    // DELETE endpoint to delete a room by ID
    router.delete('/rooms/delete/:id', deleteRoom);

    // PATCH endpoint to update room fields by ID
    router.patch('/rooms/update/:id', updateRoom);
}
