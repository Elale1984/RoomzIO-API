import mongoose from "mongoose";

const OrganizationSchema = new mongoose.Schema({
  organizationName: { type: String, required: true },
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
  organizationTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServiceTypes" }],
  organizationAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Addresses" },
  organizationFacilities: [{ type: mongoose.SchemaTypes.ObjectId, ref: "Facilities" }],
});


export const OrganizationModel = mongoose.model( "Organization", OrganizationSchema);

export const getOrganizations = () => 
  OrganizationModel.find().populate("organizationFacilities");

export const findOrganizationById = (id: string) => 
  OrganizationModel.findById(id).populate("organizationFacilities");

export const createOrganization = (values: Record<string, any>) => 
 new OrganizationModel(values).save().then((facilityModel) => facilityModel.toObject());

export const findOrganization = (query: Record<string, any>) => {
  return OrganizationModel.findOne(query)
    .populate("organizationFacilities");
};

export const deleteOrganizationById = (id: string) => 
  OrganizationModel.findByIdAndDelete(id);

export const updateOrganizationById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return OrganizationModel.findByIdAndUpdate(id, updatedFields);
};

