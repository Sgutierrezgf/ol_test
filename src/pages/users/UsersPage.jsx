import { useState } from 'react';
import Button from '../../components/botones/Button'
import './users.css'
import { useAuth } from '../../context/AuthContext';
import { MdModeEdit, MdDelete } from "react-icons/md"
import { ModalAddProject } from '../../components/modals/Modals';

function UsersPage() {
    const [showModalProject, setShowModalProject] = useState(false)

    const { users } = useAuth()

    const handleAddProject = () => {
        setShowModalProject(!showModalProject);
        // Cerrar otros modales al abrir el de campana
    };

    return (
        <div className="project-container">
            <div className='project-title'>
                <p>Usuarios</p>
                <div className='button-container'>
                    <Button onClick={handleAddProject}>Nuevo Usuario</Button>
                </div>
                {showModalProject && (
                    <ModalAddProject onClose={handleAddProject} />
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
                                <td><img src={user} alt={user.name} /></td>
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
                                        <MdModeEdit size='1.5rem' />
                                        <MdDelete size='1.5rem' />
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
