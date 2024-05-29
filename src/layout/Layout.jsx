
import { Outlet } from 'react-router-dom';
import Header from '../components/Header'; // Crea un componente Header
import NavigationMenu from '../components/NavigationMenu'; // Crea un componente NavigationMenu

const Layout = () => {
    return (
        <div>
            <Header />
            <NavigationMenu />
            <div className="content">
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;