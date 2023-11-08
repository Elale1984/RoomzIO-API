import mongoose from "mongoose";

/* CreditCardDetailsSchema using mongoose to send the schema to MongoDB */
const CreditCardDetailsSchema = new mongoose.Schema({
    cardNumber: { type: String, required: true },
    cardHolderName: { type: String, required: true },
    cardExpirationDate: { type: Date, required: true },
    cardCVV: { type: String, required: true },
    cardBillingAddress: { type: Address, required: true },
});

/* Creating the Mongoose model for CreditCardDetails objects */
export const CreditCardDetailsModel = mongoose.model('CreditCardDetails', CreditCardDetailsSchema);

/* Retrieve CreditCardDetails by its ID */
export const getCreditCardDetailsById = (id: string) => CreditCardDetailsModel.findById(id);

/* CRUD methods for CreditCardDetails objects */
/* Create a new CreditCardDetails object */
export const createCreditCardDetails = (values: Record<string, any>) => new CreditCardDetailsModel(values).save().then((creditCardDetails) => creditCardDetails.toObject());

/* Delete a CreditCardDetails by its ID */
export const deleteCreditCardDetailsById = (id: string) => CreditCardDetailsModel.findByIdAndDelete({_id: id});

/* Update CreditCardDetails by its ID, modifying one or more fields */
export const updateCreditCardDetailsById = (id: string, updatedFields: Record<string, any>) => {
    return CreditCardDetailsModel.findByIdAndUpdate(id, updatedFields);
};


