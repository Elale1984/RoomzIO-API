import mongoose from "mongoose";

const WingSchema = new mongoose.Schema({
  wingName: { type: String, required: true },
  wingCapacity: { type: Number, required: true },
  wingDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  wingTypes: [{ type: mongoose.Schema.Types.ObjectId, ref: "servicetypes" }],
  wingTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  isWingLocked: { type: Boolean, default: false },
  isWingAvailable: { type: Boolean, default: true },
  wingRooms: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rooms", }],
});

export const WingModel = mongoose.model("Wings", WingSchema);

export const getWings = () =>
  WingModel.find().populate("wingRooms");

export const getWingById = (id: string) =>
  WingModel.findById(id).populate("wingRooms");

export const createWing = (values: Record<string, any>) =>
  new WingModel(values).save().then((wingModel) => wingModel.toObject());

export const findWing = (query: Record<string, any>) => {
  return WingModel.findOne(query)
    .populate("wingRooms");
};

export const deleteWingById = (id: string) =>
  WingModel.findByIdAndDelete({ _id: id });

export const updateWingById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return WingModel.findByIdAndUpdate(id, updatedFields, { new: true })
    .populate("wingRooms");
};
