/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect } from 'react'
import { createContext, useContext, useState } from "react";
import { loginRequest, getNotification, getTodos, getDashCards, getReports, getCommits, getRelease } from "../api/auth";
import { getWeatherByCity } from '../api/weather';

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
    const [weather, setWeather] = useState(null);
    const [dashCards, setDashCards] = useState(null)
    const [reports, setReports] = useState(null)
    const [commits, setCommits] = useState(null)
    const [release, setRelease] = useState(null)

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user) {
                setUser(user);
                fetchWeather(user.city);
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


    const fetchWeather = async (city) => {
        try {
            const response = await getWeatherByCity(city);
            setWeather(response.data.list[0]);
        } catch (error) {
            console.error('Error fetching weather data', error);
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

    useEffect(() => {
        const fetchDashCards = async () => {
            try {
                const dashCardsData = await getDashCards();

                setDashCards(dashCardsData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchDashCards();
    }, []);

    useEffect(() => {
        const fetchReports = async () => {
            try {
                const reportsData = await getReports();

                setReports(reportsData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchReports();
    }, []);

    useEffect(() => {
        const fetchCommits = async () => {
            try {
                const commitsData = await getCommits();

                setCommits(commitsData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchCommits();
    }, []);

    useEffect(() => {
        const fetchRelease = async () => {
            try {
                const releaseData = await getRelease();

                setRelease(releaseData.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchRelease();
    }, []);




    return (
        <AuthContext.Provider value={{ signin, user, isAuthenticated, errorMessage, logout, notification, todos, weather, fetchWeather, dashCards, reports, commits, release }}>
            {children}
        </AuthContext.Provider>
    )
}