import express from 'express';
import { deleteOrganization, getAllOrganizations, registerOrganization, updateOrganizationFields } from './OrganizationController';

const organizationRoutes = (router: express.Router) => {
  router.post('/organizations', registerOrganization);
  router.get("/organizations", getAllOrganizations);
  router.delete("/organization/delete/:id", deleteOrganization);  
  router.patch("/organization/update/:id", updateOrganizationFields);
  
};

export default organizationRoutes;
