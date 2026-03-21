const express = require("express");
const router = express.Router();
const { handleGetAllUsers,
    getUserByID,
    fullUpdateByID,
    partialUpdateByID,
enterNewDataByID, } = require("../controllers/user");




// GET all
router
  .route("/").get(handleGetAllUsers)
  .post(enterNewDataByID)

// GET by ID
router
.route("/:id")
.get(getUserByID)
.put(fullUpdateByID)
.patch(partialUpdateByID);



module.exports = router;