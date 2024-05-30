
// import { Outlet } from 'react-router-dom';
// import Header from '../components/Header'; // Crea un componente Header
import NavigationMenu from '../components/navigationMenu/NavigationMenu'; // Crea un componente NavigationMenu

const Layout = () => {
    return (
        <div>
            <div>
                <NavigationMenu />
            </div>
        </div>
    );
}

export default Layout;