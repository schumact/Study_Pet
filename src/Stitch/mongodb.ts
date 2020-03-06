import { RemoteMongoClient } from "mongodb-stitch-browser-sdk";
import { stitchApp } from "./StitchApp";

// TODO: Initialize a MongoDB Service Client
const mongoClient:any = stitchApp.getServiceClient(
  RemoteMongoClient.factory,
  "mongodb-atlas"
);

// TODO: Instantiate a collection handle for study_pet.items
const items:any = mongoClient.db("study_pet").collection("items");

export { items };
