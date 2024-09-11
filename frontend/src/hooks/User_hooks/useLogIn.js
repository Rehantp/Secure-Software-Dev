import { useState } from "react";
import { useContext } from "react";
import { AuthContext } from "../../contexts/User_context/AuthContext";

export const useLogIn = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { dispatch } = useContext(AuthContext);

    const login = async (email, password) => {
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:4000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            const json = await response.json();

            if (!response.ok) {
                throw new Error(json.error || "An error occurred. Please try again.");
            }

            // Save the user to local storage
            localStorage.setItem('user', JSON.stringify(json)); // Save both email and the token

            // Update auth context
            dispatch({ type: 'LOGIN', payload: json });

            setIsLoading(false);
        } catch (err) {
            setIsLoading(false);
            throw new Error(err.message || "An error occurred. Please try again.");
        }
    }

    return { login, isLoading };
}
