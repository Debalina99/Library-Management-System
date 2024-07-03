const Request = require("../models/requestModel");
const Book = require("../models/bookModel");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");

// Create new Request
exports.newRequest = catchAsyncErrors(async (req, res, next) => {
  const {
    shippingInfo,
    requestItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  const request = await Request.create({
    shippingInfo,
    requestItems,
    paymentInfo,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
    paidAt: Date.now(),
    return_date: Date.now()+ 30*24*60*60*1000,
    issued_date: Date.now(),
    amount: 0,
   
   
  
    user: req.user._id,
  });

  res.status(201).json({
    success: true,
    request,
  });
});

// get Single Request
exports.getSingleRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await Request.findById(req.params.id).populate(
    "user",
    "name email"
  );

  if (!request) {
    return next(new ErrorHander("Request not found with this Id", 404));
  }

  res.status(200).json({
    success: true,
    request,
  });
});

// get logged in user  Requests
exports.myRequests = catchAsyncErrors(async (req, res, next) => {
  const requests = await Request.find({ user: req.user._id });

  res.status(200).json({
    success: true,
    requests,
  });
});

// get all Requests -- Admin
exports.getAllRequests = catchAsyncErrors(async (req, res, next) => {
  const requests = await Request.find();

  let totalAmount = 0;

  requests.forEach((request) => {
    totalAmount += request.totalPrice;
  });

  res.status(200).json({
    success: true,
    totalAmount,
    requests,
  });
});

// update Request Status -- Admin
exports.updateRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await Request.findById(req.params.id);

  if (!request) {
    return next(new ErrorHander("Request not found with this Id", 404));
  }

  if (request.requestStatus === "Delivered") {
    return next(new ErrorHander("You have already delivered this request", 400));
  }

  if (req.body.status === "Shipped") {
    request.requestItems.forEach(async (o) => {
      await updateStock(o.book, o.quantity);
    });
  }
  request.requestStatus = req.body.status;

  if (req.body.status === "Issued") {
    request.issued_date = Date.now();
  }
  if (req.body.status === "Issued") {
    request.return_date = Date.now()+ 30*24*60*60*1000;
  }
 
  
  if (req.body.status === "Paid(Late Fine)") {
    request.amount = "Fine";
  }
  if (req.body.status === "Returned") {
    request.amount = "Pending Payment";
  }
  if (req.body.status === "Returned") {
    request.return_date = Date.now();
  }
  if (req.body.status === "Returned(Late fine)") {
    request.return_date = Date.now();
  }
  if (req.body.status === "Returned") {
    const hours = (request.return_date-request.issued_date);
    const days = hours/(1000*60*60*24);
    if (days<=30){
      request.amount = 0

}else{
  request.amount = 2*days

}
    
  }
  

  await request.save({ validateBeforeSave: false });
  res.status(200).json({
    success: true,
  });
});

async function updateStock(id, quantity) {
  const book = await Book.findById(id);

  book.Stock -= quantity;

  await book.save({ validateBeforeSave: false });
}

// delete Request -- Admin
exports.deleteRequest = catchAsyncErrors(async (req, res, next) => {
  const request = await Request.findById(req.params.id);

  if (!request) {
    return next(new ErrorHander("Request not found with this Id", 404));
  }

  await request.remove();

  res.status(200).json({
    success: true,
  });
});
