import { useState } from 'react';
import './Modals.css'
import { PiSignOut } from "react-icons/pi";
import { MdOutlineErrorOutline } from "react-icons/md";
import { CiWarning, CiCircleInfo } from "react-icons/ci";
import { useAuth } from '../../context/AuthContext'
import { TiDeleteOutline } from "react-icons/ti";
import Button from '../botones/Button';

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

export { ModalNotification, ModalAccount, ModalPendings };

