const express = require("express");
const router = express.Router();
const API = require("../controlers/APIMongoDB.js");

router.get("/data", API.taskGet);
// router.post("/addOder", API.taskAdd);
// router.post("/proxy/:id", API.taskProxy);
// router.patch("/edit", API.taskEdit);
// router.delete("/:id", API.taskDel);

module.exports = router;
