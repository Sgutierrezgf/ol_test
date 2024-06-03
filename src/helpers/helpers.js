export const developersOptions = [
    { value: "Sandra Lorena Buitrón Ruiz", label: "Sandra Lorena Buitrón Ruiz" },
    { value: "Franci Eliana Viveros Martínez", label: "Franci Eliana Viveros Martínez" },
    { value: "Alvaro Eduardo Zapata", label: "Alvaro Eduardo Zapata" },
    { value: "Joan Alexis Cordoba Narvaez", label: "Joan Alexis Cordoba Narvaez" },
    { value: "Victor Hugo Conto Carvajal", label: "Victor Hugo Conto Carvajal" },
    { value: "Leonardo Zapata Mora", label: "Leonardo Zapata Mora" },
    { value: "Breyner Albarracín Lozada", label: "Breyner Albarracín Lozada" }
];

export const frontendOptions = [
    { value: "VueJS", label: "VueJS" },
    { value: "React-Native", label: "React-Native" },
    { value: "Angular", label: "Angular" },
    { value: "React", label: "React" }
];

export const backendOptions = [
    { value: "Python", label: "Python" },
    { value: ".Net", label: ".Net" },
    { value: "NodeJS", label: "NodeJS" }
];

export const databaseOptions = [
    { value: "ORACLE", label: "ORACLE" },
    { value: "PosgresSQL", label: "PosgresSQL" }
];

export const TecnoOptions = [
    { value: "Java", label: "Java" },
    { value: ".Net", label: ".Net" },
    { value: "Python", label: "Python" },
    { value: "Angular", label: "Angular" },
    { value: "React-Native", label: "React-Native" },
    { value: "VueJS", label: "PosgresSQL" },
    { value: "NodeJS", label: "NodeJS" },
    { value: "SQLServer", label: "SQLServer" }
];


export const formatValues = (values) => {
    return {
        ...values,
        developers: values.developers ? values.developers.map(dev => dev.value).join('|') : '',
        frontend_tecnology: values.frontend_tecnology ? values.frontend_tecnology.map(tech => tech.value).join('|') : '',
        backend_tecnology: values.backend_tecnology ? values.backend_tecnology.map(tech => tech.value).join(',') : '',
        databases: values.databases ? values.databases.map(db => db.value).join('|') : '',
        ci: values.ci ? true : false,
        cd: values.cd ? true : false,
    };
};

export const formatValuesUser = (values) => {
    return {
        ...values,
        list: values.list ? values.list.map(listtech => listtech.value).join('|') : '',
    };

};


export const generateNewId = (projects) => {
    return projects.length ? (parseInt(projects[projects.length - 1].id, 10) + 1).toString() : '1';
};

export const generateNewIduser = (users) => {
    return users.length ? (parseInt(users[users.length - 1].id, 10) + 1).toString() : '1';
};