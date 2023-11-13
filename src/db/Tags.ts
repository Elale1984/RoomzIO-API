import mongoose, { mongo } from "mongoose";

const TagsSchema = new mongoose.Schema({
  name: { type: String },
  description: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    immutable: true,
    default: () => Date.now(),
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
});

export const TagsModel = mongoose.model("Tags", TagsSchema);

/*  
    Crud operations
*/

// Create
export const createTag = (values: Record<string, any>) =>
  new TagsModel(values).save().then((tag) => tag.toObject());

// Read all tags
export const getTags = () => TagsModel.find();

// Read tag by ID
export const getTagById = (id: string) => TagsModel.find({ _id: id });

// Read tag by { details }
export const findTag = (query: Record<string, any>) => {
  return TagsModel.findOne(query);
}
// Update tag by ID and with given updateFields
export const updateTagById = (
  id: string,
  updatedFields: Record<string, any>
) => {
  return TagsModel.findByIdAndUpdate(id, updatedFields);
};

// Delete tag by ID
export const deleteTagById = (id: string) => TagsModel.deleteOne({_id: id});