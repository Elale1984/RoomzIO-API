import mongoose from "mongoose";
import { AddressSchema } from "./Address";

const OrganizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  organizationType: { type: String, required: true },
  organizationDateCreated: { type: Date, required: true },
  organizationCapacity: { type: Number, required: true },
  organizationTotalFacilityCount: { type: Number, required: true },
  organizationAddress: { type: AddressSchema, required: true }, // Use the AddressSchema directly
  organizationFacilities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      req: true,
    },
  ],
});

export const OrganizationModel = mongoose.model(
  "Organization",
  OrganizationSchema
);

export const getOrganizations = () =>
  OrganizationModel.find().populate("organizationFacilities");

export const getOrganizationById = (id: string) =>
  OrganizationModel.findById(id).populate("organizationFacilities");

export const createOrganization = async (values: Record<string, any>) => {
  console.log('Values received for organization creation:', values);
  const organization = await new OrganizationModel(values)
    .save();
  return organization.toObject();
};
  

export const findOrganization = (query: Record<string, any>) => {
  return OrganizationModel.findOne(query);
};

export const deleteOrganizationById = (id: string) =>
  OrganizationModel.findByIdAndDelete({ _id: id });

export const updateOrganizationById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return OrganizationModel.findByIdAndUpdate(id, updatedFields).populate(
    "organizationFacilities"
  );
};

export const addFacilityToOrganizationById = (
  id: string,
  facilityId: string
) => {
  return OrganizationModel.findByIdAndUpdate(
    id,
    { $push: { organizationFacilities: facilityId } },
    { new: true }
  ).populate("organizationFacilities");
};
