import mongoose from "mongoose";
import { AddressModel } from "../Address/Address";

const FacilitySchema = new mongoose.Schema({
  facilityName: { type: String, required: true },
  facilityType: { type: Array<String>, required: true },
  facilityCapacity: { type: Number, required: true },
  facilityWingCount: { type: Number, required: true },
  facilityAddress: { type: AddressModel, required: true },
  facilityDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  isFacilityLocked: { type: Boolean, required: true },
  facilityWings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wing",
      required: true,
    },
  ],
});

export const FacilityModel = mongoose.model("Facility", FacilitySchema);

export const getFacilities = () => FacilityModel.find();

export const findFacilityById = (id: string) => FacilityModel.findById(id);

export const createFacility = async (values: Record<string, any>) => {
  const facility = await new FacilityModel(values)
    .save();
  return facility.toObject();
};


export const deleteFacilityById = async (id: string) => {
  FacilityModel.deleteOne({_id: id});
}

export const updateFacility =async (id:string, updatedFields: Record<string, any>) => {
  return FacilityModel.findByIdAndUpdate(id, updatedFields);
}