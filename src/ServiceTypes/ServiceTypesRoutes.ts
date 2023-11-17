import { isAdmin, isAuthenticated, isManagerOrAdmin } from '../middleware/UserMiddleware';
import { registerServiceTypes, deleteServiceTypes, getAllServiceTypes, updateServiceTypesFields } from './ServiceTypeController';
import express from  'express';

const ServiceTypesRoute = (router: express.Router) => {
    router.post('/service-types', isAuthenticated, isAdmin , registerServiceTypes);
    router.get('/service-types', isAuthenticated, getAllServiceTypes);
    router.delete('/service-types/delete/:id', isAuthenticated, isAdmin, deleteServiceTypes);
    router.patch('/service-types/update/:id', isAuthenticated, isManagerOrAdmin, updateServiceTypesFields);
};

export default ServiceTypesRoute;
