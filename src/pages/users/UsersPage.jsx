import { useState } from 'react';
import Button from '../../components/botones/Button';
import { useAuth } from '../../context/AuthContext';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ModalAddUser, ModalUpdateUser } from '../../components/modals/Modals';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import './users.css';

function UsersPage() {
    const [showModaluser, setShowModaluser] = useState(false);
    const [selectedUserId, setSelecteUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { users, deleteUsers, hasPermission } = useAuth();
    const [successMessage, setSuccessMessage] = useState('');
    const [successCreateMessage, setSuccessCreateMessage] = useState('');
    const [deleteMessage, setDeleteMessage] = useState('');

    // Función para mostrar el modal de añadir usuario
    const handleAddUser = () => {
        // Verificación de permisos
        if (!hasPermission('create')) {
            setErrorMessage('No tienes permisos para agregar un usuario');
            return;
        }
        // Limpieza de mensaje de error y cambio de estado para mostrar/ocultar modal
        setErrorMessage('');
        setShowModaluser(!showModaluser);
    };

    // Función para manejar la edición de un usuario
    const handleEditUser = (userId) => {
        // Verificación de permisos
        if (!hasPermission('update')) {
            setErrorMessage('No tienes permisos para editar este usuario');
            return;
        }
        // Limpieza de mensaje de error y selección del usuario para edición
        setErrorMessage('');
        setSelecteUserId(userId);
    };

    // Función para manejar la eliminación de un usuario
    const handleDeleteUser = (userId) => {
        // Verificación de permisos
        if (!hasPermission('delete')) {
            setErrorMessage('No tienes permisos para eliminar este usuario');
            return;
        }
        // Limpieza de mensaje de error y eliminación del usuario
        setErrorMessage('');
        deleteUsers(userId);
        showDeleteMessage('Usuario eliminado correctamente');
    };
    const showSuccessCreateMessage = (message) => {
        setSuccessCreateMessage(message);
        setTimeout(() => setSuccessCreateMessage(''), 3000);
    };

    const showSuccessMessage = (message) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(''), 3000);
    };

    const showDeleteMessage = (message) => {
        setDeleteMessage(message);
        setTimeout(() => setDeleteMessage(''), 3000);  // Ocultar después de 3 segundos
    };

    return (
        <div className="project-container">
            <div className='project-title'>
                <p>Usuarios</p>
                <div className='button-container'>
                    <Button onClick={handleAddUser}>Nuevo Usuario</Button>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {successCreateMessage && <p style={{ color: 'green' }}>{successCreateMessage}</p>}
                {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
                {deleteMessage && <p style={{ color: 'red' }}>{deleteMessage}</p>}
                {showModaluser && (
                    <ModalAddUser onClose={handleAddUser} onCreateSuccess={showSuccessCreateMessage} />
                )}
                {selectedUserId && (
                    <ModalUpdateUser
                        user={users.find(user => user.id === selectedUserId)}
                        onClose={() => setSelecteUserId(null)}
                        onSuccess={showSuccessMessage}
                    />
                )}
            </div>
            <div className='table-container'>
                <table className="projects-table">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Nombre</th>
                            <th>Apellido</th>
                            <th>Rol</th>
                            <th>Tecnologias</th>
                            <th>Area</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user.id}>
                                <td><LazyLoadImage className="user-image" src='https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyZmlsfGVufDB8fDB8fHww' alt={user.name} /></td>
                                <td>{user.name}</td>
                                <td>{user.last_name}</td>
                                <td>{user.rol === 1 ? 'admin' : 'dev'}</td>
                                <td>
                                    {user.list && user.list.split('|').map((list, index) => (
                                        <div key={index}>{list}</div>
                                    ))}
                                </td>
                                <td>{user.area}</td>
                                <td>
                                    <div className="icon-container">
                                        <MdModeEdit onClick={() => handleEditUser(user.id)} size='1.5rem' />
                                        <MdDelete onClick={() => handleDeleteUser(user.id)} size='1.5rem' />
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default UsersPage;
