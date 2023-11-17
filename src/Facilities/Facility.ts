import mongoose from "mongoose";

const FacilitySchema = new mongoose.Schema({
  facilityName: { type: String, required: true },
  facilityCapacity: { type: Number, required: true },
  facilityAddress: { type: mongoose.Schema.Types.ObjectId, ref: "Addresses" },
  facilityDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  facilityTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "ServiceTypes" }],  
  facilityTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  isFacilityLocked: { type: Boolean, default: false },
  isFacilityAvailable: { type: Boolean, default: true },
  facilityWings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wings",
    },
  ],
});

export const FacilityModel = mongoose.model("Facilities", FacilitySchema);

export const getFacilities = () => 
  FacilityModel.find().populate("facilityWings");

export const findFacilityById = (id: string) => 
  FacilityModel.findById(id).populate("facilityWings");

export const createFacility = (values: Record<string, any>) => 
 new FacilityModel(values).save().then((facilityModel) => facilityModel.toObject());

export const findFacility = (query: Record<string, any>) => {
  return FacilityModel.findOne(query)
    .populate("facilityWings");
};

export const deleteFacilityById = (id: string) => 
  FacilityModel.findByIdAndDelete(id);

export const updateFacilityById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return FacilityModel.findByIdAndUpdate(id, updatedFields);
};

