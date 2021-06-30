import { createContext, useContext, useEffect, useReducer } from "react";
import AuthReducer from "./AuthReducer";

const INTIAL_STATE = {
  user: JSON.parse(localStorage.getItem("user")) || null,
  isfetching: false,
  error: false,
};

const AuthContext = createContext(INTIAL_STATE);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AuthReducer, INTIAL_STATE);

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(state.user));
  }, [state.user]);

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isfetching: state.isfetching,
        error: state.error,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AuthContext);
};
