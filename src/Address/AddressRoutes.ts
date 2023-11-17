import { isAdmin, isAuthenticated } from '../middleware/UserMiddleware';
import { createNewAddress, deleteAddress, getAllAddresses, updateAddressFields } from './AddressController';
import express from  'express';

const AddressRoutes = (router: express.Router) => {
    router.post('/address', isAuthenticated, isAdmin, createNewAddress);
    router.get('/address', isAuthenticated, isAdmin, getAllAddresses);
    router.delete('/address/delete/:id', isAuthenticated, isAdmin, deleteAddress);
    router.patch('/address/update/:id', isAuthenticated, isAdmin, updateAddressFields);
};
export default AddressRoutes;