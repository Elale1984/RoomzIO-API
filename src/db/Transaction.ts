import mongoose from "mongoose";
import { AddressModel } from "./Address";

/* TransactionSchema using mongoose to send the schema to MongoDB */
const TransactionSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    cardExpirationDate: { type: Date, required: true },
    cardCVV: { type: String, required: true },
    cardBillingAddress: { type: AddressModel, required: true },
});

/* Creating the Mongoose model for Transaction objects */
export const TransactionModel = mongoose.model('Transaction', TransactionSchema);

/* Retrieve Transaction by its ID */
export const getTransactionById = (id: string) => TransactionModel.findById(id);

/* CRUD methods for Transaction objects */
/* Create a new Transaction object */
export const createTransaction = (values: Record<string, any>) => new TransactionModel(values).save().then((Transaction) => Transaction.toObject());

/* Delete a Transaction by its ID */
export const deleteTransactionById = (id: string) => TransactionModel.findByIdAndDelete({_id: id});

/* Update Transaction by its ID, modifying one or more fields */
export const updateTransactionById = (id: string, updatedFields: Record<string, any>) => {
    return TransactionModel.findByIdAndUpdate(id, updatedFields);
};


