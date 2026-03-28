import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "../store/authSlice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const login = (userData) => {
    dispatch(loginSuccess(userData));
  };

  const logoutUser = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider value={{ user, login, logout: logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);