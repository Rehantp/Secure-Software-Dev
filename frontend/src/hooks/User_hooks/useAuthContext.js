import { AuthContext } from "../../contexts/User_context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if(!context) {
        throw Error("Auth context must be used inside an auth context provider")
    }

    return context
}