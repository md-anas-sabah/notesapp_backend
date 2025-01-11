const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxLength: [100, "Title cannot be more than 100 characters"],
    },
    content: {
      type: String,
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Please provide a category"],
      enum: ["Personal", "Work", "Study", "Important"],
      default: "Personal",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index for searching
noteSchema.index({ title: "text", content: "text" });

// Add user's notes limit middleware
noteSchema.pre("save", async function (next) {
  try {
    const notesCount = await mongoose.models.Note.countDocuments({
      user: this.user,
    });
    if (notesCount >= 100) {
      throw new Error("Notes limit reached (max: 100)");
    }
    next();
  } catch (error) {
    next(error);
  }
});

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;
