import express from 'express';
import { deleteOrganization, getAllOrganizations, registerOrganization, updateOrganization } from '../controllers/organizationController';

const organizationRoutes = (router: express.Router) => {
  router.post('/organizations', registerOrganization);
  router.get("/organizations", getAllOrganizations);
  router.delete("/organization/delete/:id", (req, res) => deleteOrganization(req, res));  
  router.patch("/organization/update/:id", (req, res) => updateOrganization(req, res));
  
};

export default organizationRoutes;
