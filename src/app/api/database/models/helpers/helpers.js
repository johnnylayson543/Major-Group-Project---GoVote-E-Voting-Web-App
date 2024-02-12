import mongoose from "mongoose";

export function getModel(modelName, Schema){

    let model;
    try {
        model = mongoose.model(modelName);
    } catch (error) {
        mongoose.model(modelName, Schema);
    }

    return model

}