//import { Stitch } from "mongodb-stitch-react-native-sdk";
import { Stitch } from "mongodb-stitch-browser-sdk";

// TODO: Add your Stitch app's App ID
const APP_ID:string = "persistant_pet-koezb";

// TODO: Initialize the app client
const stitchApp:any = Stitch.hasAppClient(APP_ID)
  ? Stitch.getAppClient(APP_ID)
  : Stitch.initializeAppClient(APP_ID);

export { stitchApp };
