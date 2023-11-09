import mongoose from "mongoose";
import { AddressModel } from "./Address";

const FacilitySchema = new mongoose.Schema({
  facilityName: { type: String, required: true },
  facilityType: { type: Array<String>, required: true },
  facilityCapacity: { type: Number, required: true },
  facilityWingCount: { type: Number, required: true },
  facilityAddress: { type: AddressModel, required: true },
  facilityDateCreated: { type: Date, required: true },
  isFacilityLocked: { type: Boolean, required: true },
  facilityOrganization: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Organization",
    required: true,
  },
  facilityWings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Wing",
      required: true,
    },
  ],
  facilityRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  ],
});

export const FacilityModel = mongoose.model("Facility", FacilitySchema);

export const getFacilities = () =>
  FacilityModel.find()
    .populate("facilityOrganization")
    .populate("facilityWings")
    .populate("facilityRooms");

export const getFacilityById = (id: string) =>
  FacilityModel.findById(id)
    .populate("facilityOrganization")
    .populate("facilityWings")
    .populate("facilityRooms");

export const createFacility = (values: Record<string, any>) =>
  new FacilityModel(values)
    .save()
    .then((facilityModel) => facilityModel.toObject());

export const findFacility = (query: Record<string, any>) => {
  return FacilityModel.findOne(query)
    .populate("facilityOrganization")
    .populate("facilityWings")
    .populate("facilityRooms");
};

export const deleteFacilityById = (id: string) =>
  FacilityModel.findByIdAndDelete({ _id: id });

export const updateFacilityById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return FacilityModel.findByIdAndUpdate(id, updatedFields)
    .populate("facilityOrganization")
    .populate("facilityWings")
    .populate("facilityRooms");
};

export const addRoomToFacilityById = (facilityId: string, roomId: string) => {
  return FacilityModel.findByIdAndUpdate(
    facilityId,
    { $push: { facilityRooms: roomId } },
    { new: true }
  )
    .populate("facilityOrganization")
    .populate("facilityWings")
    .populate("facilityRooms");
};
