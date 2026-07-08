const express = require("express");
const Project = require("../models/Project");
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// Apply auth middleware to all routes in this file
router.use(authMiddleware);

// @route   POST /api/projects/save
// @desc    Save a new 3D house configuration blueprint
// @access  Private
router.post("/save", async (req, res) => {
  try {
    const { name, theme, colorTheme, constructionStage, wireframe, dayMode } = req.body;

    if (!theme || !colorTheme || !constructionStage) {
      return res.status(400).json({ message: "Missing required configuration fields" });
    }

    const newProject = new Project({
      name: name || "My Custom Villa Blueprint",
      theme,
      colorTheme,
      constructionStage,
      wireframe: wireframe || false,
      dayMode: dayMode !== undefined ? dayMode : true,
      userId: req.user.id, // Injected by authMiddleware
    });

    const savedProject = await newProject.save();
    res.status(201).json({
      message: "3D Design saved successfully!",
      project: savedProject,
    });
  } catch (error) {
    console.error("Project save error:", error);
    res.status(500).json({ message: "Server error while saving design", error: error.message });
  }
});

// @route   GET /api/projects/my-projects
// @desc    Get all 3D configurations saved by the authenticated user
// @access  Private
router.get("/my-projects", async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (error) {
    console.error("Project fetch error:", error);
    res.status(500).json({ message: "Server error while loading designs", error: error.message });
  }
});

// @route   DELETE /api/projects/:id
// @desc    Delete a saved 3D configuration
// @access  Private
router.delete("/:id", async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);

    if (!project) {
      return res.status(404).json({ message: "Design not found" });
    }

    // Verify ownership
    if (project.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: "User not authorized to delete this design" });
    }

    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Design deleted successfully" });
  } catch (error) {
    console.error("Project delete error:", error);
    res.status(500).json({ message: "Server error while deleting design", error: error.message });
  }
});

module.exports = router;
