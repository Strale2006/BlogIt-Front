import { Client, Databases } from 'appwrite';

export const PROJECT_ID = '652bee66e34c896f82fb'
export const DATABASE_ID = '6533de4b5725582b05a0'
export const COLLECTION_ID_MESSAGES = '6533de69ec7b2f094dda'

const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('652bee66e34c896f82fb');

export const databases = new Databases(client);

export default client;