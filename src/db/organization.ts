import mongoose, { mongo } from "mongoose";
import { AddressModel } from "./Address";
import { FacilityModel } from "./Facility";

/* OrganizationSchema using mongoose to send the schema to MongoDB */
const OrganizationSchema = new mongoose.Schema({
    organizationName: { type: String, required: true },
    organizationType: { type: String, required: true },
    organizationDateCreated: { type: Date, required: true },
    organizationCapacity: { type: Number, required: true },
    organizationTotalFacilityCount: { type: Number, required: true },
    organizationFacilities: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Facility',
          required: true,
        },
      ],
    
    organizationAddress: { type: AddressModel, required: true },
    
});

/* Creating the Mongoose model for organization objects */
export const OrganizationModel = mongoose.model('Organization', OrganizationSchema);

/* Retrieve all Organizations from the database for in house use */
export const getOrganizations = () => OrganizationModel.find();

/* Retrieve a Organization by their ID */
export const getOrganizationById = (id: string) => OrganizationModel.findById(id);

/* CRUD methods for Organization objects */
/* Create a new Organization object */
export const createOrganization = (values: Record<string, any>) => new OrganizationModel(values).save().then((organization) => organization.toObject());

/* Find Organizations by specific field(s) like city, state, country, or other fields */
export const findOrganizations = (query: Record<string, any>) => {
    return OrganizationModel.find(query);
};

/* Delete a Organization by their ID */
export const deleteOrganizationById = (id: string) => OrganizationModel.findByIdAndDelete({ _id: id });

/* Update a Organization by their ID, modifying one or more fields */
export const updateOrganizationById = (id: string, updatedFields: Record<string, any>) => {
    return OrganizationModel.findByIdAndUpdate(id, updatedFields);
};

/* Add a new Facility of type Facility to the organization's Facility array */
export const addFacilityToOrganizationById = (id: string, facility: typeof FacilityModel) => {
    return OrganizationModel.findByIdAndUpdate(
        id,
        { $push: { organizationFacilities: facility } },
        { new: true } 
    );
};
