const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content']
  },
  excerpt: {
    type: String,
    maxlength: [200, 'Excerpt cannot be more than 200 characters']
  },
  slug: String,
  author: {
    type: String,
    default: 'Anonymous'
  },
  authorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  authorEmail: {
    type: String,
    required: true
  },
  featuredImage: String,
  tags: {
    type: [String],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: Date
});


PostSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Post', PostSchema);