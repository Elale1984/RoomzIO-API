import mongoose from "mongoose";
import { AddressModel } from "./Address";

/* FacilitySchema using mongoose to send the schema to MongoDB */
const FacilitySchema = new mongoose.Schema({
    facilityName: { type: String, required: true },
    facilityType: { type: Array<string>, required: true },
    facilityCapacity: { type: Number, required: true },
    facilityWingCount: { type: Number, required: true },
    facilityWings: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Wing',
          required: true,
        },
      ],         
    facilityAddress: { type: AddressModel, required: true },
    facilityDateCreated: { type: Date, required: true },
    isFacilityLocked: { type: Boolean, required: true },
});

/* Creating the Mongoose model for facility objects */
export const FacilityModel = mongoose.model('Facility', FacilitySchema);

/* Retrieve all facilities from the database for in house use */
export const getFacilities = () => FacilityModel.find();

/* Retrieve a facilities by their ID */
export const getFacilityById = (id: string) => FacilityModel.findById(id);

/* CRUD methods for facility objects */
/* Create a new facility object */
export const createFacility = (values: Record<string, any>) => new FacilityModel(values).save().then((facilityModel) => facilityModel.toObject());

/* Find facility by specific field(s) like city, state, country, or other fields */
export const findFacility = (query: Record<string, any>) => {
    return FacilityModel.findOne(query);
}; 

/* Delete a facility by their ID */
export const deleteFacilityById = (id: string) => FacilityModel.findByIdAndDelete({ _id: id });

/* Update a facility by their ID, modifying one or more fields */
export const updateFacilityById = (id: string, updatedFields: Record<string, any>) => {
    return FacilityModel.findByIdAndUpdate(id, updateFacilityById);
}

//TODO = Create the Wing Class. 
/* Add a new Wing of type Wing to the facility's wing array */
export const addWingToFacilityById = (id: string, wing: typeof WingModel) => { 
    return FacilityModel.findByIdAndUpdate(
        id,
        { $push: { facilityWings: wing } },
        { new: true } 
    );
};

