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

    const toggleMenu = () => {
        setIsCollapsed(!isCollapsed);
    };

    useEffect(() => {
        if (user && location.pathname === '/home') {
            navigate('/home/dashboard');
        }
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
                            <li className={location.pathname === '/home/dashboard' ? 'active' : ''}><Link to="/home/dashboard"><RxDashboard /><span className="menu-text">Dashboard</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li><Link to="/home/proyectos"><MdOutlineSpaceDashboard /><span className="menu-text">Proyectos</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li><Link to="/home/usuarios"><FaRegUser /><span className="menu-text">Usuarios</span><IoIosArrowForward className="arrow-icon" /></Link></li>
                            <li><Link to="/home/roles"><MdControlCamera /><span className="menu-text">Roles</span><IoIosArrowForward className="arrow-icon" /></Link></li>
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
