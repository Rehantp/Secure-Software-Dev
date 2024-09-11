import { useContext } from "react";
import { AuthContext } from "../../contexts/User_context/AuthContext";

export const useLogOut = () => {
  const { dispatch } = useContext(AuthContext);

  const logout = () => {
    // 1 --> Remove user from storage
    localStorage.removeItem("user");

    // 2 --> dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
