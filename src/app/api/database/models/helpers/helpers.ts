import {Schema, model as mongooseModel, Model, Document }  from "mongoose";
import { getDatabaseConnection } from "../../testing/signal_test";

interface IModelOptions<T extends Document, M extends Model<T> = Model<T>>  {
    modelName: string;
    modelSchema: Schema<T>;
}

export function getModel<T extends Document, M extends Model<T>>(options: IModelOptions<T, M>): M {
    const { modelName, modelSchema} = options;

    const mongoose_client = getDatabaseConnection();
    let model: M;
    try {
        model = mongoose_client.model<T, M>(modelName);
    } catch (error) {
        model = mongoose_client.model<T, M>(modelName, modelSchema);
    }

    return model;

}