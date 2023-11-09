import mongoose from "mongoose";
import { AddressModel } from "./Address";

const WingSchema = new mongoose.Schema({
    wingName: { type: String, required: true },
    wingType: { type: Array<string>, required: true },
    wingCapacity: { type: Number, required: true },
    wingWingCount: { type: Number, required: true },
    wingWings: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Wing',
          required: true,
        },
      ],         
    wingAddress: { type: AddressModel, required: true },
    wingDateCreated: { type: Date, required: true },
    isWingLocked: { type: Boolean, required: true },

});

/* Creating the Mongoose model for wing objects */
export const WingModel = mongoose.model('wing', WingSchema);

/* Retrieve all facilities from the database for in house use */
export const getWings = () => WingModel.find();

/* Retrieve a facilities by their ID */
export const getWingById = (id: string) => WingModel.findById(id);

/* CRUD methods for wing objects */
/* Create a new wing object */
export const createWing = (values: Record<string, any>) => new WingModel(values).save().then((WingModel) => WingModel.toObject());

/* Find wing by specific field(s) like city, state, country, or other fields */
export const findWing = (query: Record<string, any>) => {
    return WingModel.findOne(query);
}; 

/* Delete a wing by their ID */
export const deleteWingById = (id: string) => WingModel.findByIdAndDelete({ _id: id });

/* Update a wing by their ID, modifying one or more fields */
export const updateWingById = (id: string, updatedFields: Record<string, any>) => {
    return WingModel.findByIdAndUpdate(id, updatedFields);
}

/* Add a new Wing of type Wing to the wing's wing array */
export const addWingToWingById = (id: string, wing: typeof WingModel) => { 
    return WingModel.findByIdAndUpdate(
        id,
        { $push: { wingWings: wing } },
        { new: true } 
    );
};

