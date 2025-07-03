// servermongo.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import { FormMongo } from "./models/FormMongo.js";  //this is designed schema

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB (same DB name is fine, just the model name is updated)..chk form username and pass ids same as here
mongoose
    .connect("mongodb://localhost:27017/FormMongoDB") 
    .then(() => console.log(" Connected to FormMongoDB"))
    .catch((err) => console.error(" Connection error:", err));

// Root route
app.get("/", (req, res) => {
    res.send("Backend Connected to MongoDB!");
});

// Submit form data and save to MongoDB
app.post("/submit", async (req, res) => {
    try {
        const { username, password } = req.body;

        const newForm = new FormMongo({ username, password });
        await newForm.save();

        console.log("Saved to MongoDB:", newForm);
        res.json({ success: true, message: "Saved to DB", data: newForm });
    } catch (err) {
        console.error(" Save failed:", err);
        res.status(500).json({ success: false, message: "Error saving data" });
    }
});

//  Fetch all submissions from MongoDB
app.get("/submissions", async (req, res) => {
    try {
        const data = await FormMongo.find();
        res.json(data);
    } catch (err) {
        res.status(500).json({ success: false, message: "Fetch error" });
    }
});

// Start server
app.listen(port, () => {
    console.log(` Server running at http://localhost:${port}`);
});
