import {Schema, model as mongooseModel, Model, Document }  from "mongoose";
import { getDatabaseConnection } from "../../testing/signal_test";

interface IModelOptions<T extends Document> {
    modelName: string;
    modelSchema: Schema<T>;
}

export function getModel<T extends Document>(options: IModelOptions<T>): Model<T> {
    const { modelName, modelSchema} = options;

    const mongoose_client = getDatabaseConnection();
    let model: Model<T>;
    try {
        model = mongoose_client.model<T>(modelName);
    } catch (error) {
        model = mongoose_client.model<T>(modelName, modelSchema);
    }

    return model;

}