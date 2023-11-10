import express from 'express';
import authentication from './authentication';
import users from './users';
import organizationRoutes from './organizationRoutes';
import AddressRoutes from './AddressRoutes';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    organizationRoutes(router);
    AddressRoutes(router);
    return router;
};