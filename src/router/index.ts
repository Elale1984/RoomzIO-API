import express from 'express';
import AuthenticationRoutes from '../Auth/AuthenticationRoutes';
import UserRoutes from '../Users/UserRoutes';
import organizationRoutes from '../Organizations/OrganizationRoutes';
import AddressRoutes from '../Address/AddressRoutes';
import TagRoutes from '../Tags/TagRoute';
import BedRoutes from '../Beds/BedRoutes';
import ResidentRoutes from '../Residents/ResidentRoutes';
import RoomRoutes from '../Rooms/RoomRoutes';

const router = express.Router();

export default (): express.Router => {
    AuthenticationRoutes(router);
    UserRoutes(router);
    organizationRoutes(router);
    AddressRoutes(router);
    TagRoutes(router);
    BedRoutes(router);
    ResidentRoutes(router);
    RoomRoutes(router);
    return router;
};