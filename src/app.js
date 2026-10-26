import express from "express";
import dbConnect from "../config/db.js";
import mongoose from "mongoose";

const APP = express();

// Middleware to parse JSON
APP.use(express.json());

// Connect to MongoDB
dbConnect()
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("DB Connection Failed:", err);
  });

// User schema
const kittySchema = new mongoose.Schema({
  name: String,
  age: Number,
  place: String,
});

// User model
const kitten = mongoose.model("users", kittySchema);

// GET: Fetch all users
APP.get("/users", async (req, res) => {
  try {
    const result = await kitten.find();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// POST: Add a new user
APP.post("/users", async (req, res) => {
  try {
    const result = await kitten.create(req.body);

    res.status(201).json({
      msg: "User Added In Database",
      user: result,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// PUT: Update a user by ID
APP.put("/users/:userid", async (req, res) => {
  try {
    const result = await kitten.findByIdAndUpdate(
      req.params.userid,
      req.body,
      {
        returnDocument: "after",
        runValidators: true,
      }
    );

    if (!result) {
      return res.status(404).json({
        msg: "User Not Found",
      });
    }

    res.status(200).json({
      msg: "User Updated Successfully",
      user: result,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// DELETE: Delete a user by ID
APP.delete("/users/:userid", async (req, res) => {
  try {
    const result = await kitten.findByIdAndDelete(req.params.userid);

    if (!result) {
      return res.status(404).json({
        msg: "User Not Found",
      });
    }

    res.status(200).json({
      msg: "User Deleted Successfully",
      user: result,
    });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

// Start server
APP.listen(4003, () => {
  console.log("App started on port 4003");
});
