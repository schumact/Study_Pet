import React from "react";
import {StitchUser} from 'mongodb-stitch-browser-sdk';
import PropTypes from "prop-types";
import {
  hasLoggedInUser,
  loginAnonymous,
  logoutCurrentUser,
  getCurrentUser,
  LoginUser
} from "./authentication";

interface Props {
  // TODO some values should go here eventually like user_id, login state. I think
  actions: any  // seems right to me?
}

// Create a React Context that lets us expose and access auth state
// without passing props through many levels of the component tree

// https://fettblog.eu/typescript-react/context/ has info on types with default context
// https://stackoverflow.com/questions/56496624/typescript-for-react-createcontext-and-usecontext
// TODO still unsure what this context is going to look like. change type from "any" to something else later
const StitchAuthContext:React.Context<any> = React.createContext<Partial<Props>>({});  // we don't need a default but ts complains if there is none

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

  // Authentication Actions
  const handleAnonymousLogin = async () => {
    const { isLoggedIn } = authState;
    if (!isLoggedIn) {
      console.log("logging in");
      const loggedInUser = await loginAnonymous();
      setAuthState({
        ...authState,
        isLoggedIn: true,
        currentUser: loggedInUser,
      });
    }
  };
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

  // TODO Not sure if LoginUser() method will work.
  // grabbed it from an example on mongo stitch tutorial page.
  // stitch sdk documentation not working so I can't figure out
  // for certain how to register a user. which needs to be done
  // first before using LoginUser function.
  // TODO Remove "Stub" part from func name once working
  const handleUserLoginStub = async (username:string, password:string) => {
    const { isLoggedIn } = authState;
    if (!isLoggedIn) {
      console.log("logging in");
      // should return a stitch user, although an exception could also be thrown
      const loggedInUser:any = await LoginUser(username, password).catch((err:any) =>
      {console.log(`login failed with error: ${err}`)});
      setAuthState({
        ...authState,
        isLoggedIn: true,
        currentUser: loggedInUser,
      });
    }
  };

  // Use useMemo to improve performance by eliminating some re-renders
  const authInfo = React.useMemo(
    () => {
      const { isLoggedIn, currentUser } = authState;
      const value = {
        isLoggedIn,
        currentUser,
        actions: { handleAnonymousLogin, handleLogout, handleUserLoginStub },
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
