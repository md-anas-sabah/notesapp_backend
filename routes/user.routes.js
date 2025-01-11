const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const userController = require("../controllers/userController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validator");

// Validation middleware
const updateProfileValidation = [
  check("name", "Name is required").optional().not().isEmpty(),
  check("email", "Please include a valid email").optional().isEmail(),
  check("newPassword", "New password must be at least 6 characters")
    .optional()
    .isLength({ min: 6 }),
  validate,
];

// Protected routes
router.use(auth);

// Routes
router.get("/profile", userController.getProfile);
router.put("/profile", updateProfileValidation, userController.updateProfile);

module.exports = router;
