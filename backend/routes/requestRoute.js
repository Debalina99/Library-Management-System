const express = require("express");
const {
  newRequest,
  getSingleRequest,
  myRequests,
  getAllRequests,
  updateRequest,
  deleteRequest,
} = require("../controllers/requestController");
const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/request/new").post(isAuthenticatedUser, newRequest);

router.route("/request/:id").get(isAuthenticatedUser, getSingleRequest);

router.route("/requests/me").get(isAuthenticatedUser, myRequests);

router
  .route("/admin/requests")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAllRequests);

router
  .route("/admin/request/:id")
  .put(isAuthenticatedUser, authorizeRoles("admin"), updateRequest)
  .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteRequest);

module.exports = router;
