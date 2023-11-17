import express from 'express';
import AuthenticationRoutes from '../Auth/AuthenticationRoutes';
import UserRoutes from '../Users/UserRoutes';
import OrganizationRoutes from '../Organizations/OrganizationRoutes';
import AddressRoutes from '../Address/AddressRoutes';
import TagRoutes from '../Tags/TagRoute';
import BedRoutes from '../Beds/BedRoutes';
import ResidentRoutes from '../Residents/ResidentRoutes';
import RoomRoutes from '../Rooms/RoomRoutes';
import WingRoutes from '../Wing/WingRoutes';
import FacilityRoutes from '../Facilities/FacilityRoutes';
import ServiceTypesRoutes from '../ServiceTypes/ServiceTypesRoutes';

/**
 * Express Router instance for managing routes.
 * @typedef {express.Router} Router
 */

// Creating an Express Router instance
const router = express.Router();

/**
 * Configures and returns the main router for the application, including all sub-routes.
 * @returns {express.Router} - The configured main router.
 */
export default (): express.Router => {
    // Configuring sub-routes
    AuthenticationRoutes(router);
    UserRoutes(router);
    OrganizationRoutes(router);
    AddressRoutes(router);
    TagRoutes(router);
    BedRoutes(router);
    ResidentRoutes(router);
    RoomRoutes(router);
    WingRoutes(router);
    FacilityRoutes(router);
    ServiceTypesRoutes(router);
    // Returning the main router
    return router;
};
