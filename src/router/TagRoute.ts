import { deleteTag, getAllTags, registerTag, updateTag } from '../controllers/TagController';
import express  from 'express';

export default (router: express.Router) => {
    router.get('/tags', getAllTags);
    router.post('/tags', registerTag);
    router.delete('/tags/delete/:id', deleteTag);
    router.get('/tags/:id');
    router.patch('/tags/update/:id', updateTag);
}