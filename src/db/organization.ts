import mongoose from "mongoose";
import { AddressModel, AddressSchema } from "./Address";

const OrganizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
  organizationType: { 
    type: String, 
    required: true,
  },
  organizationEmail: { 
    type: String,
    required: true,
    lowercase: true,
  },
  organizationDateCreated: { 
    type: Date, 
    immutable: true, 
    default: () => Date.now(),
  },
  organizationUpdatedDate: {
    type: Date,
    default: () => Date.now(),
  },
  organizationCapacity: { type: Number, required: true },
  organizationTotalFacilityCount: { type: Number, required: true },
  organizationAddress: { 
    type: AddressSchema,
    ref: "addresses", 
    required: true 
  }, 
  organizationFacilities: [
    {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Facility",
      req: true,
    },
  ],
});


OrganizationSchema.pre('save', function(next) {
  this.organizationUpdatedDate = new Date(Date.now()); 
  next();
});

export const OrganizationModel = mongoose.model(
  "Organization",
  OrganizationSchema
);

export const getOrganizations = () =>
  OrganizationModel.find().populate("organizationFacilities");

export const getOrganizationById = (id: string) =>
  OrganizationModel.findById(id);

export const createOrganization = async (values: Record<string, any>) => {
  const organization = await new OrganizationModel(values)
    .save();
  return organization.toObject();
};
  

export const findOrganization = (query: Record<string, any>) => {
  return OrganizationModel.findOne(query);
};

export const deleteOrganizationById = async (doc: { organizationAddress: { _id: any; }; }, id: string) => {
  const organizationAddressId = doc.organizationAddress._id;
  AddressModel.deleteOne(organizationAddressId);
  OrganizationModel.deleteOne({ _id: id });
}

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
