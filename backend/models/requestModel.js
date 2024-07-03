const mongoose = require("mongoose");

const requestSchema = new mongoose.Schema({
  shippingInfo: {
    address: {
      type: String,
      // required: true,
    },
    city: {
      type: String,
      // required: true,
    },

    state: {
      type: String,
      // required: true,
    },

    country: {
      type: String,
      // required: true,
    },
    pinCode: {
      type: Number,
      // required: true,
    },
    phoneNo: {
      type: Number,
      // required: true,
    },
  },
  requestItems: [
    {
      name: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      image: {
        type: String,
        required: true,
      },
      book: {
        type: mongoose.Schema.ObjectId,
        ref: "Book",
        required: true,
      },
    },
  ],
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true,
  },
  paymentInfo: {
    id: {
      type: String,
      // required: true,
    },
    status: {
      type: String,
      // required: true,
    },
  },
  paidAt: {
    type: Date,
    required: true,
  },
  itemsPrice: {
    type: Number,
    // required: true,
    default: 0,
  },
  taxPrice: {
    type: Number,
    // required: true,
    default: 0,
  },
  shippingPrice: {
    type: Number,
    // required: true,
    default: 0,
  },
  totalPrice: {
    type: Number,
    // required: true,
    default: 0,
  },
  requestStatus: {
    type: String,
    required: true,
    default: "Processing",
  },
 
  return_date:{
    type:Date,
    default: Date.now+ 31*24*60*60*1000,
  },
  issued_date:{
    type:Date,
    
  },
  amount:{
    type:Number,
    default: 0,
  },

  deliveredAt: Date,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Request", requestSchema);
