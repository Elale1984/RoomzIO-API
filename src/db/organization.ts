import mongoose from "mongoose";
import { AddressModel } from "./Address";

const OrganizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  organizationType: { type: String, required: true },
  organizationDateCreated: { type: Date, required: true },
  organizationCapacity: { type: Number, required: true },
  organizationTotalFacilityCount: { type: Number, required: true },
  organizationAddress: { type: AddressModel, required: true },
  organizationFacilities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Facility",
      required: true,
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

export const createOrganization = (values: Record<string, any>) =>
  new OrganizationModel(values)
    .save()
    .then((organization) => organization.toObject());

export const findOrganizations = (query: Record<string, any>) => {
  return OrganizationModel.find(query).populate("organizationFacilities");
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
