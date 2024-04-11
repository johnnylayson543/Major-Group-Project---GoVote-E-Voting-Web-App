import mongoose from "mongoose";
import { getDatabaseConnection } from "../../testing/signal_test";

export function getModel(modelName, Schema){

    const mongoose_client = getDatabaseConnection();
    let model;
    try {
        model = mongoose_client.model(modelName);
    } catch (error) {
        model = mongoose_client.model(modelName, Schema);
    }

    return model;

}