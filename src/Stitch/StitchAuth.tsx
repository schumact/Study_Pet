import React, {Provider} from "react";
import PropTypes from "prop-types";
import {StitchUser} from 'mongodb-stitch-browser-sdk';

import {
  hasLoggedInUser,
  loginAnonymous,
  logoutCurrentUser,
  getCurrentUser,
  LoginUser
} from "./authentication";

interface actions {
  handleLogout: () => void;
  handleUserLogin: (email:string, password:string) => void
}


export interface authInfo {
  isLoggedIn:boolean;
  currentUser: StitchUser;
  actions: actions,
}

interface Props {
  // TODO some values should go here eventually like user_id, login state. I think
  authInfo: authInfo
}


// TODO still unsure what this context is going to look like. change type from "any" to something else later
export const StitchAuthContext:React.Context<any> = React.createContext<Partial<Props>>({});  // we don't need a default but ts complains if there is none

// Create a React Hook that lets us get data from our auth context
export function useStitchAuth() {
  const context = React.useContext(StitchAuthContext);
  if (!context) {
    throw new Error(`useStitchAuth must be used within a StitchAuthProvider`);
  }
  return context;
}

// Create a component that controls auth state and exposes it via
// the React Context we created.
export function StitchAuthProvider(props:any) {
  const [authState, setAuthState] = React.useState({
    isLoggedIn: hasLoggedInUser(),
    currentUser: getCurrentUser(),
  });

  const handleLogout = async () => {
    const { isLoggedIn } = authState;
    if (isLoggedIn) {
      await logoutCurrentUser();
      console.log("Should be logging out current user");
      console.log(hasLoggedInUser());
      setAuthState({
        ...authState,
        isLoggedIn: false,
        currentUser: null,
      });
    } else {
      console.log(`can't handleLogout when no user is logged in`);
    }
  };

  const handleUserLogin = async (email:string, password:string) => {
    const { isLoggedIn } = authState;
    if (!isLoggedIn) {
      console.log("logging in");
      // should return a stitch user, although an exception could also be thrown
      try {
        const loggedInUser = await LoginUser(email, password);
        if (loggedInUser) {
          console.log("User successfully logged in");
          setAuthState({
            ...authState,
            isLoggedIn: true,
            currentUser: loggedInUser,
          });
          window.location.assign("/account");
        }
      } catch (err) {
        console.log("Exception thrown when trying to login:", err)
      }
    }
    else {
      console.log("already logged in")
    }
  };

  // Use useMemo to improve performance by eliminating some re-renders
  const authInfo = React.useMemo(
    () => {
      const { isLoggedIn, currentUser } = authState;
      const value = {
        isLoggedIn,
        currentUser,
        actions: { handleLogout, handleUserLogin },
      };
      return value;
    },
    [authState.isLoggedIn],
  );
  return (
    <StitchAuthContext.Provider value={authInfo}>
      {props.children}
    </StitchAuthContext.Provider>
  );
}
StitchAuthProvider.propTypes = {
  children: PropTypes.element,
};
