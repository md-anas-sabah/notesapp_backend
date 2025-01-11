const express = require("express");
const { check } = require("express-validator");
const router = express.Router();
const noteController = require("../controllers/noteController");
const auth = require("../middleware/auth");
const validate = require("../middleware/validator");

// Validation middleware
const noteValidation = [
  check("title", "Title is required").not().isEmpty(),
  check("category").isIn(["Personal", "Work", "Study", "Important"]),
  validate,
];

// Protected routes
router.use(auth);

// Routes
router.get("/", noteController.getNotes);
router.post("/", noteValidation, noteController.createNote);
router.put("/:id", noteValidation, noteController.updateNote);
router.delete("/:id", noteController.deleteNote);
router.get("/search", noteController.searchNotes);
router.get("/category/:category", noteController.getNotesByCategory);

module.exports = router;


