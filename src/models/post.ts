import { Schema, model, models } from 'mongoose';

const PostSchema = new Schema({
  id: {
        type: String,
        required: [true, 'Id is required.'],
   },

  original_text: {
    type: String,
    required: [true, 'Original text is required.'],
  },

  revised_text: {
    type: String,
    required: [true, 'Revised text is required.'],
  },

  createdAt: {
    type: Date,
    default: Date.now
  },
  
  creator: {
    type: String,
    ref: "User",
    required: true,
  },

});

const Post = models.Post || model('Post', PostSchema);

export default Post;