/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useEffect, createContext, useContext, useState, useCallback } from 'react';
import * as api from '../api/auth';
import { getWeatherByCity } from '../api/weather';
import { keysToCamel } from '../middleware/keysTocamel';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [notification, setNotification] = useState(null);
    const [todos, setTodos] = useState(null);
    const [weather, setWeather] = useState(null);
    const [dashCards, setDashCards] = useState(null);
    const [reports, setReports] = useState(null);
    const [commits, setCommits] = useState(null);
    const [release, setRelease] = useState(null);
    const [projects, setProjects] = useState(null);
    const [users, setUsers] = useState(null);

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
            const res = await api.loginRequest(userData);
            if (res.status === 200 && res.data && res.data.length > 0) {
                const responseData = keysToCamel(res.data[0]);
                const token = responseData.token;
                setUser(responseData);
                setIsAuthenticated(true);
                setErrorMessage("");
                localStorage.setItem("token", token);
                localStorage.setItem("user", JSON.stringify(responseData));
            } else {
                setErrorMessage("Usuario no existe");
            }
        } catch (error) {
            console.error(error.message);
            setErrorMessage("Hubo un error al iniciar sesión");
        }
    };

    const fetchWeather = useCallback(async (city) => {
        try {
            const response = await getWeatherByCity(city);
            setWeather(response.data.list[0]);
        } catch (error) {
            console.error('Error fetching weather data', error);
        }
    }, []);

    const logout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        setUser(null);
        setIsAuthenticated(false);
    };

    const hasPermission = useCallback((action) => {
        if (!user) return false;
        if (user.user === 'admin') return true;
        if (user.user === 'dev' && action === 'read') return true;
        return false;
    }, [user]);

    const handleApiAction = async (action, apiCall, data) => {
        if (!hasPermission(action)) {
            setErrorMessage(`No tienes permiso para ${action} ${data.type}`);
            return;
        }
        try {
            const res = await apiCall(data.payload);
            if (res.status === 200 || res.status === 201) {
                return res.data;
            } else {
                setErrorMessage(`Error al ${action} ${data.type}`);
                console.error(`Error al ${action} ${data.type}:`, res.status);
            }
        } catch (error) {
            setErrorMessage(`Error al ${action} ${data.type}`);
            console.error(`Error al ${action} ${data.type}:`, error);
        }
    };

    const addProject = async (project) => {
        const newProject = await handleApiAction('create', api.addRProjects, { type: 'proyecto', payload: project });
        if (newProject) setProjects([...projects, newProject]);
    };

    const deleteProjects = async (id) => {
        const success = await handleApiAction('delete', api.deleteProject, { type: 'proyecto', payload: id });
        if (success) setProjects(projects.filter((pro) => pro.id !== id));
    };

    const updateProjects = async (id, updatedProjectData) => {
        const updatedProject = await handleApiAction('update', api.updateProject, { type: 'proyecto', payload: { id, ...updatedProjectData } });
        if (updatedProject) setProjects(projects.map((pro) => pro.id === id ? updatedProject : pro));
    };

    const addUsers = async (user) => {
        const newUser = await handleApiAction('create', api.addUser, { type: 'usuario', payload: user });
        if (newUser) setUsers([...users, newUser]);
    };

    const updateUser = async (id, updatedUserData) => {
        const updatedUser = await handleApiAction('update', api.updateUsers, { type: 'usuario', payload: { id, ...updatedUserData } });
        if (updatedUser) setUsers(users.map((usr) => usr.id === id ? updatedUser : usr));
    };

    const deleteUsers = async (id) => {
        const success = await handleApiAction('delete', api.deleteUser, { type: 'usuario', payload: id });
        if (success) setUsers(users.filter((user) => user.id !== id));
    };

    useEffect(() => {
        const fetchData = async (apiCall, setState) => {
            try {
                const response = await apiCall();
                setState(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData(api.getNotification, setNotification);
        fetchData(api.getTodos, setTodos);
        fetchData(api.getDashCards, setDashCards);
        fetchData(api.getReports, setReports);
        fetchData(api.getCommits, setCommits);
        fetchData(api.getRelease, setRelease);
        fetchData(api.getProjects, setProjects);
        fetchData(api.getUsers, setUsers);
    }, []);

    return (
        <AuthContext.Provider value={{
            signin,
            user,
            isAuthenticated,
            errorMessage,
            logout,
            notification,
            todos,
            weather,
            fetchWeather,
            dashCards,
            reports,
            commits,
            release,
            projects,
            addProject,
            deleteProjects,
            users,
            updateProjects,
            addUsers,
            updateUser,
            deleteUsers,
            hasPermission
        }}>
            {children}
        </AuthContext.Provider>
    );
};
