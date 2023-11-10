import { AddressModel } from "../db/Address";
import { FacilityModel, deleteFacilityById, findFacilityById, updateFacility } from "../db/Facility";
import express from "express";

export const registerFacility = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      facilityName,
      facilityType,
      facilityCapacity,
      facilityTotalWingCount,
      facilityAddress,
      facilityDateCreated,
      isFacilityLocked,
      facilityWings,
    } = req.body;

    if (
      !facilityName ||
      !facilityType ||
      !facilityCapacity ||
      !facilityTotalWingCount ||
      !facilityAddress ||
      !facilityDateCreated ||
      !isFacilityLocked ||
      !facilityWings
    ) {
      return res.sendStatus(400);
    }

    const address = await new AddressModel(facilityAddress).save();

    const facility = await FacilityModel.create({
      facilityName,
      facilityType,
      facilityCapacity,
      facilityTotalWingCount,
      facilityAddress: address,
      facilityDateCreated,
      isFacilityLocked,
      facilityWings,
    });

    res.status(200).json(facility).end();
  } catch (e) {
    console.log(e.message);
    return res.sendStatus(400);
  }
};

export const getAllFacilities = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
        const { id } = req.params;
        const updatedFields = req.body;
        
        const currentFacility = await findFacilityById(id);

        if (!currentFacility) {
            return res.sendStatus(404);
        }

        if (currentFacility._id.toString() !== id) {
            return res.sendStatus(403);
          }
      
          const updatedFacility = await updateFacility(id, updatedFields);
      
          return res.status(200).json(updatedFacility).end();
    } catch(e) {
        console.log(e.message);
        return res.sendStatus(400);
    }
  };


  export const deleteFacility = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { id } = req.params;
    
      const deletedFacility = await deleteFacilityById(id);

      return res.status(200).json(deletedFacility);
    } catch (e) {
        console.error(e.message);
        return res.sendStatus(400);
    }
  };

  export const updateFacilityFields = async (
    req: express.Request,
    res: express.Response
  ) => {
    try {
      const { id } = req.params;
      const updatedFields = req.body;
  
      const currentFacility = await findFacilityById(id);
  
      if (!currentFacility) {
        return res.sendStatus(404);
      }
  
      if (currentFacility._id.toString() !== id) {
        return res.sendStatus(403);
      }
  
      const updatedFacility = await updateFacility(id, updatedFields);
  
      return res.status(200).json(updatedFacility).end();
    } catch (e) {
      console.error(e.message);
      return res.sendStatus(400);
    }
  };
  