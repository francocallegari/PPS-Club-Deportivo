import { useState, createContext, useEffect } from "react";
import React from "react";
import PropType from "prop-types";
import { jwtDecode } from "jwt-decode";  // Para decodificar el token y verificar si expiró

export const AuthenticationContext = createContext({});

const userValueString = localStorage.getItem("user");
const userValue = userValueString ? JSON.parse(userValueString) : null;

const access_token = localStorage.getItem("token")

export const AuthenticationContextProvider = ({ children }) => {

    const [user, setUser] = useState(userValue);
    const [token, setToken] = useState(access_token)

    const isTokenExpired = (token) => {
        try {
            const decodedToken = jwtDecode(token);
            const now = Date.now() / 1000; // Tiempo actual en segundos
            return decodedToken.exp < now; // Retorna true si el token expiró
        } catch (error) {
            return true; // Si hay un error al decodificar, se considera que expiró
        }
    };

    const handleLogin = (email, role, id, token) => {
        localStorage.setItem("user", JSON.stringify({ email, role, id }));
        setUser({ email, role, id });
        localStorage.setItem("token", token)
        setToken(token)
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        setUser(null);
        localStorage.removeItem("token")
        setToken("")
    };

    useEffect(() => {
        if(token){
            if(isTokenExpired(token)){
                handleLogout()
                console.log("el token expiró")
            }
        }
    }, [token])

    return (
        <AuthenticationContext.Provider value={{ user, token, handleLogin, handleLogout, isTokenExpired }}>
            {children}
        </AuthenticationContext.Provider>
    );
};

AuthenticationContextProvider.propTypes = {
    children: PropType.object,
};