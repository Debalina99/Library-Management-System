const express = require("express");
const {
  processConfirmation,
  sendStripeApiKey,
} = require("../controllers/confirmationController");
const router = express.Router();
const { isAuthenticatedUser } = require("../middleware/auth");

router.route("/confirmation/process").post(isAuthenticatedUser, processConfirmation);

router.route("/stripeapikey").get(isAuthenticatedUser, sendStripeApiKey);

module.exports = router;
