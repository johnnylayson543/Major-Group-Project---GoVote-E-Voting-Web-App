import { mongoose_client, mongoose_client_test } from "../mongooseDocker";

let isTestEnvironment = false;

export function setTestEnvironment(isTest) {
    isTestEnvironment = isTest;
}

export function getDatabaseConnection() {
    return isTestEnvironment ? mongoose_client_test : mongoose_client;
}