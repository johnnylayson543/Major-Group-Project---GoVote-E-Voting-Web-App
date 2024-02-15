import mongoose from "mongoose";
import { mongoose_client } from "../../mongooseDocker";

export function getModel(modelName, Schema){

    let model;
    try {
        model = mongoose_client.model(modelName);
    } catch (error) {
        model = mongoose_client.model(modelName, Schema);
    }

    return model;

}