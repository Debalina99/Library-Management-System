const mongoose = require("mongoose");

const bookSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter book Name"],
    trim: true,
  },
  author: {
    type: String,
    required: [true, "Please Enter author Name"],
    trim: true,
  },
  edition:{
    type: Number,
    default: 1,
    // required: [true, "Please Enter Edition"],
  },
  description: {
    type: String,
    required: [true, "Please Enter book Description"],
  },
  price: {
    type: Number,
    required: [true, "Please Enter book Price"],
    maxLength: [8, "Price cannot exceed 8 characters"],
  },
  ratings: {
    type: Number,
    default: 0,
  },
  images: [
    {
      public_id: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
    },
  ],
  category: {
    type: String,
    required: [true, "Please Enter Book Category"],
  },
  Stock: {
    type: Number,
    required: [true, "Please Enter book Stock"],
    maxLength: [4, "Stock cannot exceed 4 characters"],
    default: 1,
  },
  numOfReviews: {
    type: Number,
    default: 0,
  },
  reviews: [
    {
      user: {
        type: mongoose.Schema.ObjectId,
        ref: "User",
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      rating: {
        type: Number,
        required: true,
      },
      comment: {
        type: String,
        required: true,
      },
    },
  ],

  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Books", bookSchema);
