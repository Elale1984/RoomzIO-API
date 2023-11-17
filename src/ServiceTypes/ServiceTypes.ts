import mongoose from "mongoose";

/* ServiceTypesSchema using mongoose to send the schema to MongoDB */
export const ServiceTypesSchema = new mongoose.Schema({
    serviceTypeName: { type: String, required: true },
    serviceTypeDateCreated: {
        type: Date,
        immutable: true,
        default: () => Date.now(),
      },
      createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required: true,
      },  
});

/* Creating the Mongoose model for ServiceTypes objects */
export const ServiceTypesModel = mongoose.model('ServiceTypes', ServiceTypesSchema);

/* Retrieve all ServiceTypes from the database for in house use */
export const getServiceTypes = () => ServiceTypesModel.find();

/* Retrieve an ServiceTypes by its ID */
export const getServiceTypesById = (id: string) => ServiceTypesModel.findById(id);

/* CRUD methods for ServiceTypes objects */
/* Create a new ServiceTypes object */
export const createServiceTypes = (values: Record<string, any>) => new ServiceTypesModel(values).save().then((serviceTypes) => serviceTypes.toObject());

/* Find serviceTypes by specific field(s) like ID, city, state or zipcode */
export const findServiceTypes = (query: Record<string, any>) => {
    return ServiceTypesModel.findOne(query);
};

/* Delete a serviceTypes by their ID */
export const deleteServiceTypesById = (id: string) => ServiceTypesModel.findOneAndDelete({_id: id});

/* Update an serviceTypes by their ID, modifying one or more fields */
export const updateServiceTypesById = (id: string, updatedFields: Record<string, any>) => {
    return ServiceTypesModel.findByIdAndUpdate(id, updatedFields);
};

