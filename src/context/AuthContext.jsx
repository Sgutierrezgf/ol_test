/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { createContext, useContext, useState } from "react";
import { loginRequest } from "../api/auth";

export const AuthContext = createContext()

export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider")
    }
    return context
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        // Verificar si hay un token en el localStorage al cargar el componente
        const token = localStorage.getItem("token");
        if (token) {
            // Aquí deberías verificar la validez del token (por ejemplo, mediante una solicitud al servidor)
            // Si el token es válido, establece isAuthenticated en true y actualiza el estado del usuario si es necesario
            setIsAuthenticated(true);
            return
        }
    }, []);

    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            // Si la solicitud fue exitosa (200 OK) y se recibieron datos del usuario
            if (res.status === 200 && res.data && res.data.length > 0) {
                const token = res.data[0].token;// Suponiendo que el token está en el header Authorization
                setUser(res.data);
                setIsAuthenticated(true);
                setErrorMessage(""); // Limpiar mensaje de error si había alguno
                localStorage.setItem("token", token); // Guardar el token en localStorage
            } else {
                // Manejar el caso en el que la solicitud fue exitosa pero no se encontraron datos de usuario
                setErrorMessage("Usuario no existe");
            }
        } catch (error) {
            // Manejar el caso de errores de red u otros errores
            console.log(error.message);
            setErrorMessage("Hubo un error al iniciar sesión");
        }
    };


    return (
        <AuthContext.Provider value={{ signin, user, isAuthenticated, errorMessage }}>
            {children}
        </AuthContext.Provider>
    )
}