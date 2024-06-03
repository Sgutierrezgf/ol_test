/* eslint-disable react/jsx-key */
import { useState } from 'react';
import Button from '../../components/botones/Button';
import './projects.css';
import { useAuth } from '../../context/AuthContext';
import { MdModeEdit, MdDelete } from "react-icons/md";
import { ModalAddProject, ModalUpdateProject } from '../../components/modals/Modals';

function ProyectsPage() {
    const [showModalProject, setShowModalProject] = useState(false);
    const [selectedProjectId, setSelectedProjectId] = useState(null);
    const [errorMessage, setErrorMessage] = useState('');
    const { projects, deleteProjects, hasPermission } = useAuth();

    const handleAddProject = () => {
        if (!hasPermission('create')) {
            setErrorMessage('No tienes permisos para agregar un proyecto');
            return;
        }
        setErrorMessage('');
        setShowModalProject(!showModalProject);
    };

    const handleEditProject = (projectId) => {
        if (!hasPermission('update')) {
            setErrorMessage('No tienes permisos para editar este proyecto');
            return;
        }
        setErrorMessage('');
        setSelectedProjectId(projectId);
    };

    const handleDeleteProject = (projectId) => {
        if (!hasPermission('delete')) {
            setErrorMessage('No tienes permisos para eliminar este proyecto');
            return;
        }
        setErrorMessage('');
        deleteProjects(projectId);
    };

    return (
        <div className="project-container">
            <div className='project-title'>
                <p>Lista de proyectos registrados</p>
                <div className='button-container'>
                    <Button onClick={handleAddProject}>Nuevo Proyecto</Button>
                </div>
                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}
                {showModalProject && (
                    <ModalAddProject onClose={handleAddProject} />
                )}
                {selectedProjectId && (
                    <ModalUpdateProject
                        project={projects.find(project => project.id === selectedProjectId)} // Pasar el proyecto seleccionado como prop
                        onClose={() => setSelectedProjectId(null)}
                    />
                )}
            </div>
            <div className='table-container'>
                <table className="projects-table">
                    <thead>
                        <tr>
                            <th>Nombre del Proyecto</th>
                            <th>Cliente</th>
                            <th>Desarrolladores</th>
                            <th>CI</th>
                            <th>CD</th>
                            <th>Tecnologías Frontend</th>
                            <th>Tecnologías Backend</th>
                            <th>Bases de Datos</th>
                            <th>Errores</th>
                            <th>Advertencias</th>
                            <th>Despliegues</th>
                            <th>Porcentaje de Compleción</th>
                            <th>Reporte NC</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id}>
                                <td>{project.project_name}</td>
                                <td>{project.client}</td>
                                <td>
                                    {project.developers && project.developers.split('|').map((developer, index) => (
                                        <div key={index}>{developer}</div>
                                    ))}
                                </td>
                                <td className={project.ci ? 'checkmark' : 'crossmark'}>{project.ci ? '✔' : '❌'}</td>
                                <td className={project.cd ? 'checkmark' : 'crossmark'}>{project.cd ? '✔' : '❌'}</td>
                                <td>
                                    {project.frontend_tecnology && project.frontend_tecnology.split('|').map((frontend_tecnology, index) => (
                                        <div key={index}>{frontend_tecnology}</div>
                                    ))}
                                </td>
                                <td>{project.backend_tecnology}</td>
                                <td>
                                    {project.databases && project.databases.split('|').map((databases, index) => (
                                        <div key={index}>{databases}</div>
                                    ))}
                                </td>
                                <td style={{ color: '#e0cc7e' }}>{project.warning_count}</td>
                                <td style={{ color: '#d8a9ab' }} >{project.errors_count}</td>
                                <td style={{ color: '#bad3f7' }}>{project.deploy_count}</td>
                                <td style={{ color: '#aac1a7' }}>{project.percentage_completion}%</td>
                                <td style={{ color: '#d8a9ab' }}>{project.report_nc}</td>
                                <td><p style={{ backgroundColor: 'yellow', borderRadius: '15px', fontSize: '12px', width: '90px', height: '20px', placeContent: 'center' }}>{project.status}</p></td>
                                <td>
                                    <div className="icon-container">
                                        <MdModeEdit size='1.5rem' onClick={() => handleEditProject(project.id)} />
                                        <MdDelete onClick={() => handleDeleteProject(project.id)} size='1.5rem' />
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

export default ProyectsPage;
