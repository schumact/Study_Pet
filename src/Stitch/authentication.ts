import { AnonymousCredential, UserPasswordAuthProviderClient, UserPasswordCredential } from "mongodb-stitch-browser-sdk";
import { stitchApp } from "./StitchApp";

export function loginAnonymous() {
  // Allow users to log in anonymously
  const credential:any = new AnonymousCredential();
  return stitchApp.auth.loginWithCredential(credential);
}

// Not working yet. Documentation is down.
export function LoginUser(username:string, password:string) {
  // login a user with a username and pass
  const credential = new UserPasswordCredential(username, password);
  stitchApp.auth.loginWithCredential(credential)
      // Returns a promise that resolves to the authenticated user
      .then((authedUser:any) => console.log(`successfully logged in with id: ${authedUser.id}`))
      .catch((err:any) => console.error(`login failed with error: ${err}`))
}

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  return stitchApp.auth.isLoggedIn;
}

export function getCurrentUser() {
  // Return the user object of the currently logged in user
  return stitchApp.auth.isLoggedIn ? stitchApp.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user
  const user = getCurrentUser();
  console.log("Logging out user with user.id " + user.id);
  return stitchApp.auth.logoutUserWithId(user.id);
}

export function CreateAccount(email:string, password:string){
  const emailPasswordClient = stitchApp.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
  // const emailPasswordClient = Stitch.defaultAppClient.auth
  //     .getProviderClient(UserPasswordAuthProviderClient.factory);

  emailPasswordClient.registerWithEmail(email, password)
      .then(() => console.log("Sending user email confirmation."))
      .catch((err:any) => console.error("Error registering new user:", err));
}
