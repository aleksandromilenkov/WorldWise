import { createContext, useContext, useReducer } from "react";
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};
const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: {},
};

const reducer = (state, action) => {
  console.log("isAuthenticated: ", state.isAuthenticated);
  console.log(action.type);
  switch (action.type) {
    case "login":
      return { ...state, isAuthenticated: true, user: action.payload };
    case "logout":
      return { ...state, isAuthenticated: false, user: null };
    default:
      throw new Error("Unknown action type");
  }
};

const AuthProvider = ({ children }) => {
  const [{ isAuthenticated, user }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const login = (username, password) => {
    if (FAKE_USER.email === username && FAKE_USER.password === password) {
      dispatch({ type: "login", payload: FAKE_USER });
    }
  };
  const logout = () => {
    dispatch({ type: "logout" });
  };
  return (
    <AuthContext.Provider
      value={{
        user: user,
        isAuthenticated: isAuthenticated,
        login: login,
        logout: logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined)
    throw new Error("AuthContext used outside of AuthProvider");
  return context;
};
export { AuthProvider, useAuth };
