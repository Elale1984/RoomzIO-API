import { createNewAddress, deleteAddress, getAllAddresses, updateAddressFields } from '../controllers/AddressController';
import express from  'express';

const AddressRoutes = (router: express.Router) => {
    router.post('/addresses', createNewAddress);
    router.get('/address', getAllAddresses);
    router.delete('/address/delete/:id', deleteAddress);
    router.patch('/address/update/:id', updateAddressFields);
};

export default AddressRoutes;