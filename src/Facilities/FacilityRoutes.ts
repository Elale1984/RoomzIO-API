import { deleteFacility, getAllFacilities, registerFacility, updateFacilityFields } from './FacilityController';
import express from 'express';

export default (router: express.Router) => {
  router.post('/facilities', registerFacility);
  router.get("/facilities", getAllFacilities);
  router.delete("/facilities/delete/:id", deleteFacility);  
  router.patch("/facilities/update/:id", updateFacilityFields);
  
};

