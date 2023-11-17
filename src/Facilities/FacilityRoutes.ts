import { isAdmin, isAuthenticated, isManagerOrAdmin } from '../middleware/UserMiddleware';
import { deleteFacility, getAllFacilities, registerFacility, updateFacilityFields } from './FacilityController';
import express from 'express';

export default (router: express.Router) => {
  router.post('/facilities', isAuthenticated, isAdmin, registerFacility);
  router.get("/facilities", isAuthenticated, getAllFacilities);
  router.delete("/facilities/delete/:id", isAuthenticated, isAdmin, deleteFacility);  
  router.patch("/facilities/update/:id", isAuthenticated, isManagerOrAdmin, updateFacilityFields);
  
};

