const catchAsyncErrors = require("../middleware/catchAsyncErrors");

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

exports.processConfirmation = catchAsyncErrors(async (req, res, next) => {
  const myConfirmation = await stripe.confirmationIntents.create({
    amount: req.body.amount,
    currency: "inr",
    metadata: {
      company: "LIBRARY",
    },
  });

  res
    .status(200)
    .json({ success: true, client_secret: myConfirmation.client_secret });
});

exports.sendStripeApiKey = catchAsyncErrors(async (req, res, next) => {
  res.status(200).json({ stripeApiKey: process.env.STRIPE_API_KEY });
});
