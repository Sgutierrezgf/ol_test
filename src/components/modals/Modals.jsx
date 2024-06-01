/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useForm, Controller } from "react-hook-form";
import { PiSignOut } from "react-icons/pi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { CiWarning, CiCircleInfo } from "react-icons/ci";
import { useAuth } from '../../context/AuthContext'
import { TiDeleteOutline } from "react-icons/ti";
import Button from '../botones/Button';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './Modals.css'

function ModalNotification() {
    const { notification } = useAuth();
    const getIcon = (type) => {
        switch (type) {
            case 'error':
                return <MdOutlineErrorOutline size='3em' className="icon-error" />;
            case 'warning':
                return <CiWarning size='3em' className="icon-warning" />;
            case 'info':
                return <CiCircleInfo size='3em' className="icon-info" />;
            default:
                return null;
        }
    };

    return (
        <div className="modals noti">
            {notification.map(notif => (
                <div key={notif.id} className={`notification ${notif.type}`}>
                    {getIcon(notif.type)}
                    <div className='notify'>
                        <p>{notif.details}</p>
                        <p> {notif.time}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}

function ModalAccount() {
    const { logout } = useAuth();
    return (
        <div className="modals account" onClick={() => logout()}>
            <PiSignOut />
            <p >Cerrar Sesión</p>
        </div>
    );
}

function ModalPendings() {
    const { todos: initialTodos } = useAuth();
    const [todos, setTodos] = useState(initialTodos);

    const toggleCheck = (id) => {
        setTodos(todos.map(todo =>
            todo.id === id ? { ...todo, check: !todo.check } : todo
        ));
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div className="modals todos">
            <h2>Pendings</h2>
            <div className='add-todo'>
                <p>Que tienes pendiente?</p>
                <Button>Agregar</Button>
            </div>
            <ul>
                {todos.map(todo => (
                    <li key={todo.id} className={`todo-item ${todo.check ? 'checked' : ''}`}>
                        <div className="todo-content">
                            <input
                                type="checkbox"
                                checked={todo.check}
                                onChange={() => toggleCheck(todo.id)}
                            />
                            <span>{todo.description}</span>
                        </div>
                        <TiDeleteOutline
                            className="delete-icon"
                            size="1.5rem"
                            onClick={() => deleteTodo(todo.id)}
                        />
                    </li>
                ))}
            </ul>
        </div>
    );
}

function ModalAddProject({ onClose }) {
    const [loading, setLoading] = useState(false);
    const { addProject, projects } = useAuth();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmitAdd = handleSubmit(async (values) => {
        setLoading(true);

        // Formatear los datos
        const formattedValues = {
            ...values,
            developers: values.developers ? values.developers.map(dev => dev.value).join('|') : '',
            frontend_tecnology: values.frontend_tecnology ? values.frontend_tecnology.map(tech => tech.value).join('|') : '',
            backend_tecnology: values.backend_tecnology ? values.backend_tecnology.map(tech => tech.value).join(',') : '',
            databases: values.databases ? values.databases.map(db => db.value).join('|') : '',
            ci: values.ci ? true : false,
            cd: values.cd ? true : false,
        };

        console.log(formattedValues);

        const defaultValues = {
            errors_count: 0,
            warning_count: 0,
            deploy_count: 0,
            percentage_completion: 0,
            report_nc: 0,
            status: 'En Desarrollo',
        };

        // Generar nuevo ID
        const newId = projects.length ? (parseInt(projects[projects.length - 1].id, 10) + 1).toString() : '1';
        const newProject = {
            id: newId,
            ...formattedValues,
            ...defaultValues,
        };

        await addProject(newProject);
        setLoading(false);
        onClose(true);
    });

    const developersOptions = [
        { value: "Sandra Lorena Buitrón Ruiz", label: "Sandra Lorena Buitrón Ruiz" },
        { value: "Franci Eliana Viveros Martínez", label: "Franci Eliana Viveros Martínez" },
        { value: "Alvaro Eduardo Zapata", label: "Alvaro Eduardo Zapata" },
        { value: "Joan Alexis Cordoba Narvaez", label: "Joan Alexis Cordoba Narvaez" },
        { value: "Victor Hugo Conto Carvajal", label: "Victor Hugo Conto Carvajal" },
        { value: "Leonardo Zapata Mora", label: "Leonardo Zapata Mora" },
        { value: "Breyner Albarracín Lozada", label: "Breyner Albarracín Lozada" }
    ];

    const frontendOptions = [
        { value: "VueJS", label: "VueJS" },
        { value: "React-Native", label: "React-Native" },
        { value: "Angular", label: "Angular" },
        { value: "React", label: "React" }
    ];

    const backendOptions = [
        { value: "Python", label: "Python" },
        { value: ".Net", label: ".Net" },
        { value: "NodeJS", label: "NodeJS" }
    ];

    const databaseOptions = [
        { value: "ORACLE", label: "ORACLE" },
        { value: "PosgresSQL", label: "PosgresSQL" }
    ];

    const animatedComponents = makeAnimated();

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-container">
                    <h1>Nuevo proyecto</h1>
                    <form onSubmit={onSubmitAdd}>
                        <input
                            type="text"
                            {...register("project_name", { required: true })}
                            placeholder="Nombre del Proyecto"
                        />
                        {errors.project_name && (
                            <p>El nombre del proyecto es requerido</p>
                        )}

                        <input
                            type="text"
                            {...register("repo_url", { required: true })}
                            placeholder="URL del Repositorio"
                        />
                        {errors.repo_url && <p>La URL del repositorio es requerida</p>}

                        <input
                            type="text"
                            {...register("client", { required: true })}
                            placeholder="Cliente"
                        />
                        {errors.client && <p>El cliente es requerido</p>}

                        <h3>Desarrolladores</h3>
                        <Controller
                            name="developers"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    components={animatedComponents}
                                    options={developersOptions}
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.developers && <p>Los desarrolladores son requeridos</p>}

                        <div className="checkbox-container">
                            <label htmlFor="ci">Tiene Integración Continua</label>
                            <input type="checkbox" {...register("ci")} />
                        </div>

                        <div className="checkbox-container">
                            <label htmlFor="cd">Tiene Despliegue Continuo</label>
                            <input type="checkbox" {...register("cd")} />
                        </div>

                        <h3>Tecnología Frontend</h3>
                        <Controller
                            name="frontend_tecnology"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    components={animatedComponents}
                                    options={frontendOptions}
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.frontend_tecnology && <p>Tecnología Frontend es requerida</p>}

                        <h3>Tecnología Backend</h3>
                        <Controller
                            name="backend_tecnology"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    components={animatedComponents}
                                    options={backendOptions}
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.backend_tecnology && <p>Tecnología Backend es requerida</p>}

                        <h3>Bases de Datos</h3>
                        <Controller
                            name="databases"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    components={animatedComponents}
                                    options={databaseOptions}
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.databases && <p>Bases de Datos son requeridas</p>}

                        <div className='button-modal'>
                            <button type="submit" disabled={loading}>
                                {loading ? (
                                    <div role="status">
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    "Agregar proyecto"
                                )}
                            </button>
                            <button type="button" onClick={() => onClose(false)}>
                                Cerrar
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export { ModalNotification, ModalAccount, ModalPendings, ModalAddProject };

