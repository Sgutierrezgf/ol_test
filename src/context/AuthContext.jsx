/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { createContext, useContext, useState } from "react";
import { loginRequest, getNotification, getTodos } from "../api/auth";

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
    const [notification, setNotification] = useState(null);
    const [todos, setTodos] = useState(null);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            const user = JSON.parse(localStorage.getItem("user"));
            if (user) {
                setUser(user);
            }
            setIsAuthenticated(true);
        }
    }, []);

    const signin = async (userData) => {
        try {
            const res = await loginRequest(userData);
            if (res.status === 200 && res.data && res.data.length > 0) {
                const token = res.data[0].token;
                const user = res.data[0];
                setUser(user);
                setIsAuthenticated(true);
                setErrorMessage("");
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                setErrorMessage("Usuario no existe");
            }
        } catch (error) {
            console.log(error.message);
            setErrorMessage("Hubo un error al iniciar sesión");
        }
    };

    const logout = () => {

        // Limpiar el localStorage
        localStorage.removeItem("user");
        localStorage.removeItem("token");

        // Limpiar el estado del usuario y la autenticación
        setUser(null);
        setIsAuthenticated(false);
    };


    useEffect(() => {
        const fetchNotificationData = async () => {
            try {
                const employeesData = await getNotification();

                setNotification(employeesData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchNotificationData();
    }, []);

    useEffect(() => {
        const fetchTodosData = async () => {
            try {
                const todosData = await getTodos();

                setTodos(todosData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchTodosData();
    }, []);

    return (
        <AuthContext.Provider value={{ signin, user, isAuthenticated, errorMessage, logout, notification, todos }}>
            {children}
        </AuthContext.Provider>
    )
}