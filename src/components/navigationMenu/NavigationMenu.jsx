import { useState } from 'react';
import { Link } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSpaceDashboard, MdControlCamera } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import './NavigationMenu.css';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';
import Header from '../header/Header'; // Importa el componente Header

const NavigationMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const {
        user
    } = useAuth();

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };


    return (
        <div>
            <Header user={user} toggleMenu={toggleMenu} /> {/* Usa el componente Header */}
            <div className='content'>
                <div className="main-content">
                    <nav className={isCollapsed ? 'collapsed' : ''}>
                        <ul>
                            <li><Link to="/home/dashboard"><RxDashboard /><span className="menu-text">Dashboard</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li><Link to="/home/proyectos"><MdOutlineSpaceDashboard /><span className="menu-text">Proyectos</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li><Link to="/home/usuarios"><FaRegUser /><span className="menu-text">Usuarios</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li><Link to="/home/roles"><MdControlCamera /><span className="menu-text">Roles</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                        </ul>
                    </nav>
                </div>
                <div>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default NavigationMenu;
