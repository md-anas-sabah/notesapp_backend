const Note = require("../models/Note");

exports.getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;

    const note = new Note({
      title,
      content,
      category,
      user: req.user.id,
    });

    await note.save();
    res.status(201).json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.updateNote = async (req, res) => {
  try {
    const { title, content, category } = req.body;
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      { title, content, category },
      { new: true, runValidators: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json(note);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id,
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.json({ message: "Note deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.searchNotes = async (req, res) => {
  try {
    const { query } = req.query;

    if (!query) {
      const notes = await Note.find({ user: req.user.id }).sort({
        createdAt: -1,
      });
      return res.json(notes);
    }

    const searchQuery = {
      user: req.user.id,
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
      ],
    };

    const notes = await Note.find(searchQuery).sort({ createdAt: -1 });

    console.log(`Search "${query}":`, notes.length);
    res.json(notes);
  } catch (error) {
    console.error("Search error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.getNotesByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const notes = await Note.find({
      user: req.user.id,
      category,
    }).sort({ createdAt: -1 });

    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
