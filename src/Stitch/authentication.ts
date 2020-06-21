import { AnonymousCredential, UserPasswordAuthProviderClient, UserPasswordCredential, StitchUser } from "mongodb-stitch-browser-sdk";
import { stitchApp } from "./StitchApp";

export const loginAnonymous = (): Promise<StitchUser> => {
  // Allow users to log in anonymously
  const credential:any = new AnonymousCredential();
  return stitchApp.auth.loginWithCredential(credential);
};

// Not working yet. Documentation is down.
export const LoginUser = (email:string, password:string):Promise<StitchUser> => {
  // login a user with a username and pass
  const credential:UserPasswordCredential = new UserPasswordCredential(email, password);
  return stitchApp.auth.loginWithCredential(credential)
      // Returns a promise that resolves to the authenticated user
      // .then((authedUser:StitchUser) => console.log(`successfully logged in with id: ${authedUser.id}`))
      // .catch((err:any) => console.error(`login failed with error: ${err}`))
};

export const hasLoggedInUser = ():boolean => {
  // Check if there is currently a logged in user
  return stitchApp.auth.isLoggedIn;
};

export const getCurrentUser = ():any => {
  // Return the user object of the currently logged in user
  return stitchApp.auth.isLoggedIn ? stitchApp.auth.user : null;
};

export const logoutCurrentUser = ():Promise<void> => {
  // Logout the currently logged in user
  const user:any = getCurrentUser();
  return stitchApp.auth.logoutUserWithId(user.id);
};

export const CreateAccount = (email:string, password:string): void => {
  const emailPasswordClient = stitchApp.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
  // const emailPasswordClient = Stitch.defaultAppClient.auth
  //     .getProviderClient(UserPasswordAuthProviderClient.factory);

  emailPasswordClient.registerWithEmail(email, password)
      .then(() => console.log("Sending user email confirmation."))
      .catch((err:any) => console.error("Error registering new user:", err));
};

export const resetAccPass = (email:string, password:string): void => {
  const emailPasswordClient = stitchApp.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
  // const emailPasswordClient = Stitch.defaultAppClient.auth
  //     .getProviderClient(UserPasswordAuthProviderClient.factory);

  // emailPasswordClient.registerWithEmail(email, password)
  //     .then(() => console.log("Sending user email confirmation."))
  //     .catch((err:any) => console.error("Error registering new user:", err));
  // TODO add in reset acc password code
};
