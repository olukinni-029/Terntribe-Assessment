const express = require("express");
const {Cause} = require("../models/index.model");
const upload = require('../middleware/multer');
const router = express.Router();

router.post("/causes", upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    //validate the input
    if (!title || !description || !req.file) {
      return res.status(400).json({ message: "Please fill in all fields" });
    }

    const imageUrl = `/uploads/${req.file.filename}`;

    const cause = new Cause({
      title: title,
      description: description,
      imageUrl: imageUrl,
    });
    await cause.save();
    return res.status(201).json({ message: "Cause created successfully",cause });
  } catch (error) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Internal server error", error: error.message });
  }
});

router.get("/causes", async (req, res) => {
  try {
    //Get all Cause
    const causes = await Cause.findAll();
    //Return all Causes
    return res.status(200).json(causes);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      error: error.message
    });
  }
});

router.get("/causes/:id", async (req, res) => {
  try {
    // Find the cause by primary key (id)
    const cause = await Cause.findByPk(req.params.id);
    //check if it exist
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }
    //return the cause
    return res.status(200).json(cause);
  } catch (error) {
    res.status(500).json({
      error: "Internal server error",
      error: error.message
    });
  }
});

router.put("/causes/:id", async (req, res) => {
  const causeId = req.params.id;
  const updatedData = req.body;

  try {
    // Validate if the cause ID is valid
    if (!causeId) {
      return res.status(400).json({ message: "Cause ID is required" });
    }

    // Find the cause by primary key (id)
    const cause = await Cause.findByPk(causeId);
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    // Update the cause with the new data
    const updatedCause = await cause.update(updatedData);

    // Return the updated record
    return res.status(200).json(updatedCause);
  } catch (error) {
    console.error("Error updating cause:", error.message);
    res.status(500).json({
      error: "Internal server error",
      message: error.message,
    });
  }
});



router.delete("/causes/:id", async (req, res) => {
  try {
    // Find the cause by primary key (id)
    const cause = await Cause.findByPk(req.params.id);
    if (!cause) {
      return res.status(404).json({ message: "Cause not found" });
    }

    // Delete the record
    await cause.destroy();

    // Send a success response
    return res.status(200).json({ message: "Cause deleted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({
      error: "Internal server error",
      error: error.message,
    });
  }
});



module.exports =router;