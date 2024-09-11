import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN' : 
            return { user: action.payload }
        case 'LOGOUT' : 
            return { user: null }
        default : 
            return state
    }
};

export const AuthContextProvide = ({children}) => {
const [state, dispatch] = useReducer(AuthReducer, {
    users : null
})

// Function to fetch and update user data
const fetchAndUpdateUserData = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/users/${userId}`);
      if (response.status === 200) {
        dispatch({ type: 'LOGIN', payload: response.data });
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

//Set the Initial Auth Status 
useEffect (() => {
    const user = JSON.parse(localStorage.getItem('user'))

    if (user) {
        dispatch({ type: 'LOGIN' , payload: user })
    }
}, [])

console.log("AuthContext state : ",state) //keep track of login and logout in the console

return (
    <AuthContext.Provider value={{...state, dispatch, fetchAndUpdateUserData}}>
        { children }
    </AuthContext.Provider>
)
}