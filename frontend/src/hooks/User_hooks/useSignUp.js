import { useState } from "react";
import { AuthContext } from "../../contexts/User_context/AuthContext";
import { useContext } from "react";

export const useSignUp = () => {
    const [err, setErr] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const { dispatch } = useContext(AuthContext);

    const signup = async (firstname,
        lastname,
        contact,
        addLine1,
        addLine2,
        addLine3,
        gender,
        email,
        password,) => {
        setIsLoading(true);
        setErr(null); //must to have

        const response = await fetch('http://localhost:4000/api/users/createuser', {
            method : 'POST', 
            headers: {'Content-Type' : 'application/json'},
            body: JSON.stringify({firstname,
                lastname,
                contact,
                addLine1,
                addLine2,
                addLine3,
                gender,
                email,
                password,})
        })

        const json = await response.json()

        if (!response.ok) {
            setIsLoading(false)
            setErr(json.error)
        }

        if (response.ok) {
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json)) //save the both email and the token

            //update auth context
            dispatch({type:'LOGIN', payload: json})

            setIsLoading(false);
        }
    }

    return { signup, isLoading, err };
}