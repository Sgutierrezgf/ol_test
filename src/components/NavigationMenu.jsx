import { Link } from 'react-router-dom';

const NavigationMenu = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/home/dashboard">Dashboard</Link></li>
                <li><Link to="/home/proyectos">Proyectos</Link></li>
                <li><Link to="/home/roles">Roles</Link></li>
                <li><Link to="/home/usuarios">Usuarios</Link></li>
            </ul>
        </nav>
    );
}

export default NavigationMenu;
