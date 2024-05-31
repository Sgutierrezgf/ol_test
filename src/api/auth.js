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
