import { Stitch, StitchAppClient, RemoteMongoClient } from "mongodb-stitch-browser-sdk";

// TODO: Add your Stitch app's App ID
const APP_ID:string = "persistant_pet-koezb";

// TODO: Initialize the app client
const stitchApp:StitchAppClient = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

const mongodb = stitchApp.getServiceClient(RemoteMongoClient.factory, "mongodb-atlas");

export { stitchApp, mongodb };
