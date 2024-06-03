import { Suspense, lazy, useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSpaceDashboard, MdControlCamera } from "react-icons/md";
import { IoIosArrowForward } from "react-icons/io";
import { FaRegUser } from "react-icons/fa";
import './NavigationMenu.css';
import { useAuth } from '../../context/AuthContext';
import { Outlet } from 'react-router-dom';

const Header = lazy(() => import('../header/Header'));

const NavigationMenu = () => {
    const [isCollapsed, setIsCollapsed] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [activeRoute, setActiveRoute] = useState(location.pathname);

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        if (user && location.pathname === '/home') {
            navigate('/home/dashboard');
        }
        setActiveRoute(location.pathname);
    }, [user, location, navigate]);

    return (
        <div className='app-container'>
            <Suspense fallback={<div>Loading...</div>}>
                <Header user={user} toggleMenu={toggleMenu} />
            </Suspense>
            <div className='content'>
                <div className="main-content">
                    <nav className={isCollapsed ? 'collapsed' : ''}>
                        <ul>
                            <li className={activeRoute === '/home/dashboard' ? 'active' : ''}><Link to="/home/dashboard"><RxDashboard /><span className="menu-text">Dashboard</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li className={activeRoute === '/home/proyectos' ? 'active' : ''}><Link to="/home/proyectos"><MdOutlineSpaceDashboard /><span className="menu-text">Proyectos</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li className={activeRoute === '/home/usuarios' ? 'active' : ''}><Link to="/home/usuarios"><FaRegUser /><span className="menu-text">Usuarios</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li className={activeRoute === '/home/roles' ? 'active' : ''}><Link to="/home/roles"><MdControlCamera /><span className="menu-text">Roles</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                        </ul>
                    </nav>
                </div>
                <div className='main'>
                    <Outlet />
                </div>
            </div>
            <footer className="footer">
                <p>Copyright© 2024 OL Software S.A. prueba frontend.</p>
                <p>React</p>
            </footer>
        </div>
    );
}

export default NavigationMenu; 
