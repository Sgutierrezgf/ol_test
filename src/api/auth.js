import axios from "axios";

const API = "http://localhost:3000";
export const loginRequest = (user) =>
    axios.get(`${API}/login?user=${user.user}&password=${user.password}`);

export const getNotification = () =>
    axios.get(`${API}/notification`);

export const getTodos = () =>
    axios.get(`${API}/todos`);

export const getDashCards = () =>
    axios.get(`${API}/dashboard_cards`);

export const getReports = () =>
    axios.get(`${API}/cpu_report`);

export const getCommits = () =>
    axios.get(`${API}/report_commits`);

export const getRelease = () =>
    axios.get(`${API}/release_resume`);

export const getProjects = () =>
    axios.get(`${API}/projects`);

export const addRProjects = (project) => axios.post(`${API}/projects`, project);

export const deleteProject = async (id) =>
    axios.delete(`${API}/projects/${id}`, id);

export const getUsers = () =>
    axios.get(`${API}/users`);

export const addUser = (user) => axios.post(`${API}/users`, user);

export const deleteUser = async (id) =>
    axios.delete(`${API}/users/${id}`, id);