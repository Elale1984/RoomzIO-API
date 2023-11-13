import mongoose from "mongoose";

const BedSchema = new mongoose.Schema({
  bedNumber: { type: Number, required: true },
  bedType: { type: String, required: true },
  bedCapacity: { type: Number, required: true },
  bedDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  isBedLocked: { type: Boolean, default: false },
  isBedAvailable: { type: Boolean, default: true },
  bedResident: { type: mongoose.Schema.Types.ObjectId, ref: "Resident" },
  tags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
});

export const BedModel = mongoose.model("Bed", BedSchema);

export const getBeds = () => BedModel.find().populate("bedResident");

export const getBedById = (id: string) =>
  BedModel.findById(id).populate("bedResident");

export const createBed = (values: Record<string, any>) =>
  new BedModel(values).save().then((bed) => bed.toObject());

export const findBed = (query: Record<string, any>) => {
  return BedModel.findOne(query).populate("bedResident");
};

export const deleteBedById = (id: string) =>
  BedModel.findByIdAndDelete({ _id: id });

export const updateBedById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return BedModel.findByIdAndUpdate(id, updatedFields, { new: true }).populate(
    "bedResident"
  );
};

export const addResidentToBedById = (bedId: string, residentId: string) => {
  return BedModel.findByIdAndUpdate(
    bedId,
    { bedResident: residentId },
    { new: true }
  ).populate("bedResident");
};
