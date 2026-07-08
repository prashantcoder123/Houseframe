const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "My Custom Villa Design",
      trim: true,
    },
    theme: {
      type: String,
      required: true,
      enum: ["modern", "scandinavian", "industrial"],
    },
    colorTheme: {
      type: String,
      required: true,
      enum: ["alabaster", "sand", "charcoal", "forest"],
    },
    constructionStage: {
      type: String,
      required: true,
      enum: ["structure", "enclosure", "completed"],
    },
    wireframe: {
      type: Boolean,
      default: false,
    },
    dayMode: {
      type: Boolean,
      default: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
