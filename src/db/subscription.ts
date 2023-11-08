import mongoose from "mongoose";

/* SubscriptionSchema using mongoose to send the schema to MongoDB */
const SubscriptionSchema = new mongoose.Schema({
    subscriptionType: { type: String, required: true },
    subscriptionDollarAmount: { type: Number, required: true },
    subscriptionBillingCycle: { type: String, required: true },
    subscriptionStartDate: { type: Date, required: true },
    subscriptionEndDate: { type: Date, required: true },
    isSubscriptionActive: { type: Boolean, required: true },
});

/* Creating the Mongoose model for subscription objects */
export const SubscriptionModel = mongoose.model('Subscription', SubscriptionSchema);

/* Methods for finding subscription objects for in house use  */
export const getSubscription = () => SubscriptionModel.find();
export const getSubscriptionById = (id: string) => SubscriptionModel.findById(id);

/* Crud methods for subscription objects  */
export const createSubscription = (values: Record<string, any>) => new SubscriptionModel(values).save().then((subscription) => subscription.toObject());
export const deleteSubscriptionById = (id: string) => SubscriptionModel.findByIdAndDelete({_id: id});
export const updateSubscriptionById = (id: string, updatedFields: Record<string, any>) => {
    return SubscriptionModel.findByIdAndUpdate(id, updatedFields);
};
