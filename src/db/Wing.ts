import mongoose from "mongoose";

const WingSchema = new mongoose.Schema({
  wingName: { type: String, required: true },
  wingCapacity: { type: Number, required: true },
  wingDateCreated: { type: Date, required: true },
  isWingLocked: { type: Boolean, required: true },
  wingFacility: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Facility",
    required: true,
  },
  wingRooms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      required: true,
    },
  ],
});

export const WingModel = mongoose.model("Wing", WingSchema);

export const getWings = () =>
  WingModel.find().populate("wingFacility").populate("wingRooms");

export const getWingById = (id: string) =>
  WingModel.findById(id).populate("wingFacility").populate("wingRooms");

export const createWing = (values: Record<string, any>) =>
  new WingModel(values).save().then((wingModel) => wingModel.toObject());

export const findWing = (query: Record<string, any>) => {
  return WingModel.findOne(query)
    .populate("wingFacility")
    .populate("wingRooms");
};

export const deleteWingById = (id: string) =>
  WingModel.findByIdAndDelete({ _id: id });

export const updateWingById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return WingModel.findByIdAndUpdate(id, updatedFields, { new: true })
    .populate("wingFacility")
    .populate("wingRooms");
};

export const addRoomToWingById = (wingId: string, roomId: string) => {
  return WingModel.findByIdAndUpdate(
    wingId,
    { $push: { wingRooms: roomId } },
    { new: true }
  )
    .populate("wingFacility")
    .populate("wingRooms");
};
