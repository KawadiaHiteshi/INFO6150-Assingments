const express = require("express");
const router = express.Router();

const upload = require("../middleware/uploadMiddleware");

const {
  createUser,
  editUser,
  deleteUser,
  getAllUsers,
  uploadImage,
  loginUser,
} = require("../controllers/userController");

router.post("/create", createUser);
router.post("/login", loginUser);
router.put("/edit", editUser);
router.delete("/delete", deleteUser);
router.get("/getAll", getAllUsers);
router.post("/uploadImage", upload.single("image"), uploadImage);

module.exports = router;