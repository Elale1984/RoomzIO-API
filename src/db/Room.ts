import mongoose from "mongoose";

export const RoomSchema = new mongoose.Schema({
  roomName: { type: String, required: true },
  roomType: { type: Array<string>, required: true },
  roomCapacity: { type: Number, required: true },
  roomDateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  roomProjectedVacancyDate: { type: Date },
  roomTags: [{ type: mongoose.Schema.Types.ObjectId, ref: "Tags" }],
  isRoomLocked: { type: Boolean, default: false },
  isRoomAvailable: { type: Boolean, default: true },
  roomBeds: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Bed",
    },
  ],
});

export const RoomModel = mongoose.model("Room", RoomSchema);

export const getRooms = () =>
  RoomModel.find().populate("roomBeds");

export const getRoomById = (id: string) =>
  RoomModel.findById(id).populate("roomBeds");

export const createRoom = (values: Record<string, any>) =>
  new RoomModel(values).save().then((room) => room.toObject());

export const findRoom = (query: Record<string, any>) => {
  return RoomModel.findOne(query).populate("wingId").populate("roomBeds");
};

export const deleteRoomById = (id: string) =>
  RoomModel.findByIdAndDelete({ _id: id });

export const updateRoomById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return RoomModel.findByIdAndUpdate(id, updatedFields)
    .populate("wingId")
    .populate("roomBeds");
};

export const addBedToRoomById = (roomId: string, bedId: string) => {
  return RoomModel.findByIdAndUpdate(
    roomId,
    { $push: { roomBeds: bedId } },
    { new: true }
  )
    .populate("wingId")
    .populate("roomBeds");
};
