import mongoose from "mongoose";
import { SubscriptionModel } from "./subscription";


/* ProductOwnerSchema using mongoose to send the schema to MongoDB */
const ProductOwnerSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: {type: String, required: true },
    userType: { type: String, required: true },
    email: { type: String, required: true },
    authentication: {
        password: { type: String, required: true, select: false },
        salt: { type: String, select: false },
        sessionToken: { type: String, select: false },
    },
    subscription: { type: SubscriptionModel, required: true},
    creditCard: { type: CreditCard, required: true },
    facilityType: { type: Array<String>, required: true },
    dateCreated: { type: Date, required: true },
});

/* Creating the Mongoose model for product owner objects */
export const ProductOwnerModel = mongoose.model('ProductOwners', ProductOwnerSchema);

/* Retrieve all product owners from the database */
export const getProductOwners = () => ProductOwnerModel.find();

/* Retrieve a product owner by their ID, email, or username */
export const getProductOwnerByField = (field: string, value: string) => {
    const query: Record<string, string> = {};
    query[field] = value;
    return ProductOwnerModel.findOne(query);
};

/* Retrieve a product owner by their ID */
export const getProductOwnerById = (id: string) => ProductOwnerModel.findById(id);

/* CRUD methods for user objects */
/* Create a new product owner object */
export const createProductOwner = (values: Record<string, any>) => new ProductOwnerModel(values).save().then((productOwner) => productOwner.toObject());

/* Delete a product owner by their ID */
export const deleteProductOwnerById = (id: string) => ProductOwnerModel.findByIdAndDelete({ _id: id });

/* Update a product owner's email, name, or type by their ID, modifying one or more fields */
export const updateProductOwnerById = (id: string, updatedFields: Record<string, any>) => {
    return ProductOwnerModel.findByIdAndUpdate(id, updatedFields);
};
