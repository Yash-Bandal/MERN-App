// models/FormMongo.js

import mongoose from "mongoose";

const FormSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
    },
});

export const FormMongo = mongoose.model("FormMongo", FormSchema);
