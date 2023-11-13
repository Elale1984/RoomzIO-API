import express from 'express';
import authentication from '../Auth/AuthenticationRoutes';
import users from '../Users/UserRoutes';
import organizationRoutes from '../Organizations/OrganizationRoutes';
import AddressRoutes from '../Address/AddressRoutes';
import TagRoute from '../Tags/TagRoute';
import BedRoutes from '../Beds/BedRoutes';
import ResidentRoutes from '../Residents/ResidentRoutes';

const router = express.Router();

export default (): express.Router => {
    authentication(router);
    users(router);
    organizationRoutes(router);
    AddressRoutes(router);
    TagRoute(router);
    BedRoutes(router);
    ResidentRoutes(router);
    return router;
};