const express = require("express");
const router = express.Router();

const UserService = require("../services/UserService");
const UploadService = require("../helpers/storage")

// GET: users/
router.get("/", UserService.get_all);

// GET: users/{id}
router.get("/:userId", UserService.get);

// POST: users/ 
router.post("/", UploadService.single("avatar"), UserService.create);

// PATCH: users/{id}
router.patch("/:userId", UploadService.single("avatar"), UserService.update);

// DELETE: orders{id}
router.delete("/:userId", UserService.delete);

module.exports = router;