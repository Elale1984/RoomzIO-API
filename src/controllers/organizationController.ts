import express from "express";
import {
  OrganizationModel,
  createOrganization,
  deleteOrganizationById,
  findOrganization,
  getOrganizationById,
  getOrganizations,
  updateOrganizationById,
} from "../db/Organization";
import { AddressModel, deleteAddressById } from "../db/Address"; // Adjust the path

export const registerOrganization = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const {
      organizationName,
      organizationType,
      organizationEmail,
      organizationCapacity,
      organizationTotalFacilityCount,
      organizationAddress,
      organizationFacilities,
    } = req.body;

    if (
      !organizationName ||
      !organizationType ||
      !organizationEmail ||
      !organizationCapacity ||
      !organizationTotalFacilityCount ||
      !organizationAddress ||
      !organizationFacilities ||
      !organizationFacilities
    ) {
      return res.sendStatus(400);
    }

    // Create the address document
    const address = await new AddressModel(organizationAddress).save();

    // Create the organization document with the associated address
    const organization = await createOrganization({
      organizationName,
      organizationType,
      organizationEmail,
      organizationCapacity,
      organizationTotalFacilityCount,
      organizationAddress: address, // Save the address id in the organization document
      organizationFacilities,
      organizationDateCreated: new Date().toLocaleDateString("en-US"),
    });

    // Respond with the created organization
    res.status(200).json(organization).end();
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const getAllOrganizations = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const organizations = await getOrganizations();
    return res.status(200).json(organizations).end();
  } catch (error) {
    console.error(error);
    res.sendStatus(400);
  }
};

export const deleteOrganization = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
  
    const organization = await getOrganizationById(id);
    if (!organization) {
      return res.sendStatus(404).json({error: 'Could not find organization with that id'}); // Organization not found
    }

    const addressId = await OrganizationModel.findOne({'organizationAddress._id': req.params.id});
    if (!addressId) {
      return res.sendStatus(404).json({error: 'No address was found with that id'});
    }
   
    
    return res.status(200).json(addressId);
  } catch (error) {
    console.error(error);
    return res.sendStatus(500); // Internal server error
  }
  
};

export const updateOrganization = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const { id } = req.params;
    const updatedFields = req.body;

    const currentOrganization = await findOrganization({ _id: id });

    if (!currentOrganization) {
      return res.sendStatus(404);
    }

    if (currentOrganization._id.toString() !== id) {
      return res.sendStatus(403);
    }

    const updatedOrganization = await updateOrganizationById(id, updatedFields);

    return res.status(200).json(updatedOrganization).end();
  } catch (error) {
    console.error(error);
    return res.sendStatus(400);
  }
};