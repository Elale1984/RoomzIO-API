import express from 'express';
import authentication from './AuthenticationRoutes';
import users from './UserRoutes';
import organizationRoutes from './OrganizationRoutes';
import AddressRoutes from './AddressRoutes';
import TagRoute from './TagRoute';
import BedRoutes from './BedRoutes';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    organizationRoutes(router);
    AddressRoutes(router);
    TagRoute(router);
    BedRoutes(router);
    return router;
};