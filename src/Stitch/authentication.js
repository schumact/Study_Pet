import { AnonymousCredential, UserPasswordAuthProviderClient, UserPasswordCredential } from "mongodb-stitch-browser-sdk";
import { app } from "./app.js";
import {sendEmail} from '../Util/Emailer';

export function loginAnonymous() {
  // Allow users to log in anonymously
  const credential = new AnonymousCredential();
  return app.auth.loginWithCredential(credential);
}

// Not working yet. Documentation is down.
export function LoginUser(username, password) {
  // login a user with a username and pass
  const credential = new UserPasswordCredential(username, password);
  app.auth.loginWithCredential(credential)
      // Returns a promise that resolves to the authenticated user
      .then(authedUser => console.log(`successfully logged in with id: ${authedUser.id}`))
      .catch(err => console.error(`login failed with error: ${err}`))
}

export function hasLoggedInUser() {
  // Check if there is currently a logged in user
  return app.auth.isLoggedIn;
}

export function getCurrentUser() {
  // Return the user object of the currently logged in user
  return app.auth.isLoggedIn ? app.auth.user : null;
}

export function logoutCurrentUser() {
  // Logout the currently logged in user
  const user = getCurrentUser();
  console.log("Logging out user with user.id " + user.id);
  return app.auth.logoutUserWithId(user.id);
}

export function CreateAccount(email, password){
  const emailPasswordClient = app.auth.getProviderClient(UserPasswordAuthProviderClient.factory);
  // const emailPasswordClient = Stitch.defaultAppClient.auth
  //     .getProviderClient(UserPasswordAuthProviderClient.factory);

  emailPasswordClient.registerWithEmail(email, password)
      .then(async () => await sendEmail())
      .catch(err => console.error("Error registering new user:", err));
}
