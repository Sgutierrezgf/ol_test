import { useState } from 'react';
import Button from '../../components/botones/Button';
import './users.css';
import { useAuth } from '../../context/AuthContext';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ModalAddUser, ModalUpdateUser } from '../../components/modals/Modals';

function UsersPage() {
    const [showModaluser, setShowModaluser] = useState(false);
    const [selectedUserId, setSelecteUserId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { users, deleteUsers, hasPermission } = useAuth();

    const handleAddUser = () => {
        if (!hasPermission('create')) {
            setErrorMessage('No tienes permisos para agregar un usuario');
            return;
        }
        setErrorMessage('');
        setShowModaluser(!showModaluser);
    };

    const handleEditUser = (userId) => {
        if (!hasPermission('update')) {
            setErrorMessage('No tienes permisos para editar este usuario');
            return;
        }
        setErrorMessage('');
        setSelecteUserId(userId);
    };

    const handleDeleteUser = (userId) => {
        if (!hasPermission('delete')) {
            setErrorMessage('No tienes permisos para eliminar este usuario');
            return;
        }
        setErrorMessage('');
        deleteUsers(userId);
    };

    return (
        <div className="project-container">
            <div className='project-title'>
                <p>Usuarios</p>
                <div className='button-container'>
                    <Button onClick={handleAddUser}>Nuevo Usuario</Button>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {showModaluser && (
                    <ModalAddUser onClose={handleAddUser} />
                )}
                {selectedUserId && (
                    <ModalUpdateUser
                        user={users.find(user => user.id === selectedUserId)} // Pasar el usuario seleccionado como prop
                        onClose={() => setSelecteUserId(null)}
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
                                <td><img className="user-image" src='https://plus.unsplash.com/premium_photo-1688891564708-9b2247085923?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8cGVyZmlsfGVufDB8fDB8fHww' alt={user.name} /></td>
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
