import express  from 'express';
import { deleteRoom, getAllRooms, registerRoom, updateRoomFields } from './RoomController';

export default (router: express.Router) => {
    router.get('/rooms', getAllRooms);
    router.post('/rooms', registerRoom);
    router.delete('/rooms/delete/:id', deleteRoom);
    router.get('/rooms/:id');
    router.patch('/rooms/update/:id', updateRoomFields);
}