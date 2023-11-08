import mongoose from "mongoose";

/* AddressSchema using mongoose to send the schema to MongoDB */
const AddressSchema = new mongoose.Schema({
    addressStreetNumber: { type: String, required: true },
    addressStreetName: { type: String, required: true },
    addressCity: { type: String, required: true },
    addressState: { type: String, required: true },
    addressZipCode: { type: String, required: true },
});

/* Creating the Mongoose model for Address objects */
export const AddressModel = mongoose.model('Address', AddressSchema);

/* Retrieve all Addresses from the database for in house use */
export const getAddresses = () => AddressModel.find();

/* Retrieve an Address by its ID */
export const getAddressById = (id: string) => AddressModel.findById(id);

/* CRUD methods for Address objects */
/* Create a new Address object */
export const createAddress = (values: Record<string, any>) => new AddressModel(values).save().then((address) => address.toObject());

/* Find addresses by specific field(s) like ID, city, state or zipcode */
export const findAddress = (query: Record<string, any>) => {
    return AddressModel.findOne(query);
};

/* Delete a address by their ID */
export const deleteAddressById = (id: string) => AddressModel.findOneAndDelete({_id: id});

/* Update an address by their ID, modifying one or more fields */
export const updateAddressById = (id: string, updatedFields: Record<string, any>) => {
    return AddressModel.findByIdAndUpdate(id, updatedFields);
};

