import { deleteResident, getAllResidents, registerResident, updateResident } from '../controllers/ResidentController';
import express  from 'express';

export default (router: express.Router) => {
    router.get('/resident', getAllResidents);
    router.post('/resident', registerResident);
    router.delete('/resident/delete/:id', deleteResident);
    router.get('/resident/:id');
    router.patch('/resident/update/:id', updateResident);
}