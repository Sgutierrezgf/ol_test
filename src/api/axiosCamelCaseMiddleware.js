import axios from 'axios';
import { keysToCamel } from '../middleware/keysTocamel'; // Ajusta la ruta según donde esté camelCaseConverter.js

// Crear instancia de Axios
const instance = axios.create({
    baseURL: 'http://localhost:3000', // Ajusta la URL base según tu entorno
});

// Middleware para convertir claves snake_case a camelCase en las respuestas
instance.interceptors.response.use((response) => {
    // Verificar si la respuesta es un objeto y aplicar la conversión
    if (response.data && typeof response.data === 'object') {
        response.data = keysToCamel(response.data); // Convertir claves a camelCase
    }
    return response;
}, (error) => {
    // Manejar errores
    return Promise.reject(error);
});

export default instance;