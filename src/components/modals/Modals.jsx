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
import {
    developersOptions,
    frontendOptions,
    backendOptions,
    databaseOptions,
    formatValues,
    generateNewId,
    formatValuesUser,
    TecnoOptions,
    generateNewIduser
} from '../../helpers/helpers'
import Success from '../messages/Success'

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
    const [showPopup, setShowPopup] = useState(false);
    const { addProject, projects } = useAuth();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmitAdd = handleSubmit(async (values) => {
        setLoading(true);

        const formattedValues = formatValues(values);
        const defaultValues = {
            errors_count: 0,
            warning_count: 0,
            deploy_count: 0,
            percentage_completion: 0,
            report_nc: 0,
            status: 'En Desarrollo',
        };

        const newId = generateNewId(projects);
        const newProject = {
            id: newId,
            ...formattedValues,
            ...defaultValues,
        };

        await addProject(newProject);
        setLoading(false);
        setShowPopup(true);
        onClose(true);
    });

    const animatedComponents = makeAnimated();

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-container">
                    <h1>Nuevo proyecto</h1>
                    <form onSubmit={onSubmitAdd}>
                        <h3>Nombre projecto</h3>
                        <input
                            type="text"
                            {...register("project_name", { required: true })}
                            placeholder="Nombre del Proyecto"
                        />
                        {errors.project_name && (
                            <p className="error-message">El nombre del proyecto es requerido</p>
                        )}
                        <h3>URL del repositorio</h3>
                        <input
                            type="text"
                            {...register("repo_url", { required: true })}
                            placeholder="URL del Repositorio"
                        />
                        {errors.repo_url && <p className="error-message">La URL del repositorio es requerida</p>}
                        <h3>Cliente</h3>
                        <input
                            type="text"
                            {...register("client", { required: true })}
                            placeholder="Cliente"
                        />
                        {errors.client && <p className="error-message">El cliente es requerido</p>}

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
                        {errors.developers && <p className="error-message">Los desarrolladores son requeridos</p>}
                        <h3>Integración Continua</h3>
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
                        {errors.frontend_tecnology && <p className="error-message">Tecnología Frontend es requerida</p>}

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
                        {errors.backend_tecnology && <p className="error-message">Tecnología Backend es requerida</p>}

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
                        {errors.databases && <p className="error-message">Bases de Datos son requeridas</p>}

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
                        {showPopup && <Success message="Proyecto agregado correctamente" onClose={() => setShowPopup(false)} />}
                    </form>
                </div>
            </div>
        </div>
    );
}

function ModalUpdateProject({ project, onClose }) {
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { updateProjects } = useAuth();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmitUpdate = handleSubmit(async (values) => {
        setLoading(true);

        try {
            const formattedValues = formatValues(values);
            const defaultValues = {
                errors_count: 0,
                warning_count: 0,
                deploy_count: 0,
                percentage_completion: 0,
                report_nc: 0,
                status: 'En Desarrollo',
            };

            const updatedProjectData = {
                ...formattedValues,
                ...defaultValues,
            };

            await updateProjects(project.id, updatedProjectData); // Utiliza el ID del proyecto existente
            setLoading(false);
            setShowPopup(true);
            onClose(true);
        } catch (error) {
            console.error(error);
        }
    });

    const animatedComponents = makeAnimated();

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-container">
                    <h1>Editar proyecto</h1>
                    <form onSubmit={onSubmitUpdate}>
                        <h3>Nombre Projecto</h3>
                        <input
                            type="text"
                            {...register("project_name", { required: true })}
                            placeholder="Nombre del Proyecto"
                            defaultValue={project.project_name} // Utiliza el valor 'project_name' del proyecto para prellenar este campo
                        />
                        {errors.project_name && (
                            <p className="error-message">El nombre del proyecto es requerido</p>
                        )}
                        <h3>URL del repositorio</h3>
                        <input
                            type="text"
                            {...register("repo_url", { required: true })}
                            placeholder="URL del Repositorio"
                            defaultValue={project.repo_url} // Utiliza el valor 'repo_url' del proyecto para prellenar este campo
                        />
                        {errors.repo_url && <p className="error-message">La URL del repositorio es requerida</p>}
                        <h3>Cliente</h3>
                        <input
                            type="text"
                            {...register("client", { required: true })}
                            placeholder="Cliente"
                            defaultValue={project.client} // Utiliza el valor 'client' del proyecto para prellenar este campo
                        />
                        {errors.client && <p className="error-message">El cliente es requerido</p>}

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
                                    defaultValue={project.developers} // Utiliza el valor 'developers' del proyecto para prellenar este campo
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.developers && <p className="error-message">Los desarrolladores son requeridos</p>}
                        <h3>Integración Continua</h3>
                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                {...register("ci")}
                                defaultChecked={project.ci} // Utiliza el valor 'ci' del proyecto para preseleccionar este campo
                            />
                            <label htmlFor="ci">Tiene Integración Continua</label>
                        </div>

                        <div className="checkbox-container">
                            <input
                                type="checkbox"
                                {...register("cd")}
                                defaultChecked={project.cd} // Utiliza el valor 'cd' del proyecto para preseleccionar este campo
                            />
                            <label htmlFor="cd">Tiene Despliegue Continuo</label>
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
                                    defaultValue={project.frontend_tecnology} // Utiliza el valor 'frontend_tecnology' del proyecto para preseleccionar este campo
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.frontend_tecnology && <p className="error-message">Tecnología Frontend es requerida</p>}

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
                                    defaultValue={project.backend_tecnology} // Utiliza el valor 'backend_tecnology' del proyecto para preseleccionar este campo
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.backend_tecnology && <p className="error-message">Tecnología Backend es requerida</p>}

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
                                    defaultValue={project.databases} // Utiliza el valor 'databases' del proyecto para preseleccionar este campo
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.databases && <p className="error-message">Bases de Datos son requeridas</p>}

                        <div className='button-modal'>
                            <button type="submit" disabled={loading}>
                                {loading ? (
                                    <div role="status">
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    "Editar proyecto"
                                )}
                            </button>
                            <button type="button" onClick={() => onClose(false)}>
                                Cerrar
                            </button>
                        </div>
                        {showPopup && <Success message="Proyecto editado correctamente" onClose={() => setShowPopup(false)} />}
                    </form>
                </div>
            </div>
        </div>
    );
}

function ModalAddUser({ onClose }) {
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { addUsers, users } = useAuth();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmitAdd = handleSubmit(async (values) => {
        setLoading(true);

        values.rol = parseInt(values.rol);

        const formattedValues = formatValuesUser(values);
        const defaultValues = {
            url_photo: 'https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyZmlsfGVufDB8fDB8fHww'
        };

        const newId = generateNewIduser(users);
        const newUser = {
            id: newId,
            ...formattedValues,
            ...defaultValues
        };

        await addUsers(newUser);
        setLoading(false);
        setShowPopup(true);
        onClose(true);
    });

    const animatedComponents = makeAnimated();

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-container">
                    <h1>Nuevo Usuario</h1>
                    <form onSubmit={onSubmitAdd}>
                        <h3>Nombre</h3>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Nombre del usuario"
                        />
                        {errors.name && (
                            <p className="error-message">El nombre del usuario es requerido</p>
                        )}
                        <h3>Apellidos</h3>
                        <input
                            type="text"
                            {...register("last_name", { required: true })}
                            placeholder="Apellido del usuario"
                        />
                        {errors.last_name && <p className="error-message">El apellido del usuario es requerido</p>}
                        <h3>Rol</h3>
                        <div className="radio-container">
                            <input type="radio" id="administrador" value="1" {...register("rol")} />
                            <label htmlFor="administrador">Administrador</label>
                        </div>

                        <div className="radio-container">
                            <input type="radio" id="desarrollador" value="2" {...register("rol")} />
                            <label htmlFor="desarrollador">Desarrollador</label>
                        </div>


                        <h3>Tecnologias</h3>
                        <Controller
                            name="list"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    components={animatedComponents}
                                    options={TecnoOptions}
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.list && <p className="error-message">Las tecnologias son requeridas</p>}
                        <h3>Area</h3>
                        <input
                            type="text"
                            {...register("area", { required: true })}
                            placeholder="area"
                        />
                        {errors.area && <p className="error-message">El area es requerida</p>}

                        <div className='button-modal'>
                            <button type="submit" disabled={loading}>
                                {loading ? (
                                    <div role="status">
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    "Agregar usuario"
                                )}
                            </button>
                            <button type="button" onClick={() => onClose(false)}>
                                Cerrar
                            </button>
                        </div>
                        {showPopup && <Success message="Proyecto agregado correctamente" onClose={() => setShowPopup(false)} />}
                    </form>
                </div>
            </div>
        </div>
    );
}

function ModalUpdateUser({ user, onClose }) {
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const { updateUser } = useAuth();

    const { register, handleSubmit, control, formState: { errors } } = useForm();

    const onSubmitUpdate = handleSubmit(async (values) => {
        setLoading(true);

        try {
            values.rol = parseInt(values.rol);

            const formattedValues = formatValuesUser(values);
            const defaultValues = {
                url_photo: 'https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyZmlsfGVufDB8fDB8fHww'
            };


            const updatedUserData = {
                ...formattedValues,
                ...defaultValues,
            };

            await updateUser(user.id, updatedUserData);
            setLoading(false);
            setShowPopup(true);
            onClose(true);
        } catch (error) {
            console.error(error);
        }
    });

    const animatedComponents = makeAnimated();

    return (
        <div className="overlay">
            <div className="modal">
                <div className="form-container">
                    <h1>Editar proyecto</h1>
                    <form onSubmit={onSubmitUpdate}>
                        <h3>Nombre</h3>
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            placeholder="Nombre del Proyecto"
                            defaultValue={user.name}
                        />
                        {errors.name && (
                            <p className="error-message">El nombre es requerido</p>
                        )}
                        <h3>Apellido</h3>
                        <input
                            type="text"
                            {...register("last_name", { required: true })}
                            placeholder="URL del Repositorio"
                            defaultValue={user.last_name}
                        />
                        {errors.last_name && <p className="error-message">El apellido es requerida</p>}

                        <h3>Rol</h3>
                        <div className="radio-container">
                            <input type="radio" id="administrador" value="1" {...register("rol")} />
                            <label htmlFor="administrador">Administrador</label>
                        </div>

                        <div className="radio-container">
                            <input type="radio" id="desarrollador" value="2" {...register("rol")} />
                            <label htmlFor="desarrollador">Desarrollador</label>
                        </div>


                        <h3>Tecnologias</h3>
                        <Controller
                            name="list"
                            control={control}
                            rules={{ required: true }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    isMulti
                                    components={animatedComponents}
                                    options={TecnoOptions}
                                    classNamePrefix="react-select"
                                />
                            )}
                        />
                        {errors.list && <p className="error-message">Las tecnologias son requeridas</p>}
                        <h3>Area</h3>
                        <input
                            type="text"
                            {...register("area", { required: true })}
                            placeholder="poner el area"
                            defaultValue={user.area}
                        />
                        {errors.area && <p className="error-message">El area es requerida</p>}


                        <div className='button-modal'>
                            <button type="submit" disabled={loading}>
                                {loading ? (
                                    <div role="status">
                                        <span>Loading...</span>
                                    </div>
                                ) : (
                                    "Editar proyecto"
                                )}
                            </button>
                            <button type="button" onClick={() => onClose(false)}>
                                Cerrar
                            </button>
                        </div>
                        {showPopup && <Success message="Proyecto editado correctamente" onClose={() => setShowPopup(false)} />}
                    </form>
                </div>
            </div>
        </div>
    );
}


export { ModalNotification, ModalAccount, ModalPendings, ModalAddProject, ModalUpdateProject, ModalAddUser, ModalUpdateUser };

