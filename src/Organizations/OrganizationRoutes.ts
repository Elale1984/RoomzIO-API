import express from 'express';
import { deleteOrganization, getAllOrganizations, registerOrganization, updateOrganizationFields } from './OrganizationController';
import { isAdmin, isAuthenticated } from '../middleware/UserMiddleware';

const organizationRoutes = (router: express.Router) => {
  router.post('/organizations', isAuthenticated, isAdmin, registerOrganization);
  router.get("/organizations", isAuthenticated, isAdmin, getAllOrganizations);
  router.delete("/organization/delete/:id", isAuthenticated, isAdmin, deleteOrganization);  
  router.patch("/organization/update/:id", isAuthenticated, isAdmin, updateOrganizationFields);
};

export default organizationRoutes;
