import { registerServiceTypes, deleteServiceTypes, getAllServiceTypes, updateServiceTypesFields } from './ServiceTypeController';
import express from  'express';

const ServiceTypesRoute = (router: express.Router) => {
    router.post('/service-types', registerServiceTypes);
    router.get('/service-types', getAllServiceTypes);
    router.delete('/service-types/delete/:id', deleteServiceTypes);
    router.patch('/service-types/update/:id', updateServiceTypesFields);
};

export default ServiceTypesRoute;
