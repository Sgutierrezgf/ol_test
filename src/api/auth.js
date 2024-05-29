import axios from "axios";

const API = "http://localhost:3000";
export const loginRequest = (user) =>
    axios.get(`${API}/login?user=${user.user}&password=${user.password}`);