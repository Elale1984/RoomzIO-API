import mongoose from "mongoose";

/* ResidentSchema using mongoose to send the schema to MongoDB */
const ResidentSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    moveInDate: { type: Date, required: true },
    moveOutDate: { type: Date, required: true },
    room: { type: Room, required: true }, 
});


/* Creating the Mongoose model for user objects */
export const ResidentModel = mongoose.model('Resident', ResidentSchema);

/* Retrieve all residents from the database */
export const getResidents = () => ResidentModel.find();

/* Retrieve a resident by their ID */
export const getResidentsById = (id: string) => ResidentModel.findById(id);

/* CRUD methods for resident objects */
/* Create a new resident object */
export const createResident = (values: Record<string, any>) => new ResidentModel(values).save().then((resident) => resident.toObject());

/* Find residents by specific field(s) like moveInDate, moveOutDate, or ID */
export const findResidents = (query: Record<string, any>) => {
    return ResidentModel.find(query);
}

/* Delete a resident by their ID */
export const deleteResident = (id: string) => ResidentModel.findByIdAndDelete(id);

/* Update a resident by their ID, modifying one or more fields */
export const updateResidentById = (id: string, updatedFields: Record<string, any>) => {
    return ResidentModel.findByIdAndUpdate(id, updatedFields);
}

