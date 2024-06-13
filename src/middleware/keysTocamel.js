// camelCaseConverter.js

// Función para convertir una cadena en formato snake_case o kebab-case a camelCase
const toCamelCase = (str) => {
    return str.replace(/([-_][a-z])/gi, (match) => {
        return match.toUpperCase().replace('-', '').replace('_', '');
    });
};

// Función para convertir las claves de un objeto de snake_case o kebab-case a camelCase
const keysToCamel = (obj) => {
    // Manejo de casos especiales
    if (typeof obj !== 'object' || obj === null) {
        return obj;
    }

    // Si el objeto es un array, se mapean sus elementos
    if (Array.isArray(obj)) {
        return obj.map(v => keysToCamel(v));
    }

    // Se convierten las claves del objeto a camelCase
    return Object.keys(obj).reduce((acc, key) => {
        const camelKey = toCamelCase(key);
        acc[camelKey] = keysToCamel(obj[key]);
        return acc;
    }, {});
};

export { toCamelCase, keysToCamel };
