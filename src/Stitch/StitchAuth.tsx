import React from "react";
import PropTypes from "prop-types";
import {StitchUser} from 'mongodb-stitch-browser-sdk';

import {
  hasLoggedInUser,
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
  authInfo: authInfo
}



export const StitchAuthContext:React.Context<any> = React.createContext<Partial<Props>>({});


export function useStitchAuth() {
  const context = React.useContext(StitchAuthContext);
  if (!context) {
    throw new Error(`useStitchAuth must be used within a StitchAuthProvider`);
  }
  return context;
}

export function StitchAuthProvider(props:any) {
  const [authState, setAuthState] = React.useState({
    isLoggedIn: hasLoggedInUser(),
    currentUser: getCurrentUser(),
  });

  const handleLogout = async () => {
    const { isLoggedIn } = authState;
    if (isLoggedIn) {
      await logoutCurrentUser();
      setAuthState({
        ...authState,
        isLoggedIn: false,
        currentUser: null,
      });
      window.location.assign("/login");
    } else {
      console.log(`can't handleLogout when no user is logged in`);
    }
  };

  const handleUserLogin = async (email:string, password:string) => {
    const { isLoggedIn } = authState;
    let passedLogin:boolean = false;
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
          passedLogin = true;
        }
      } catch (err) {
      }
      return passedLogin;
    }
    else {
      console.log("already logged in")
    }
  };

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
