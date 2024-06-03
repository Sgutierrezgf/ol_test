
import './App.css'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './pages/login/LoginPage';
import { AuthProvider } from './context/AuthContext';
// import HomePage from './pages/HomePage';
import DashboardPage from './pages/dashboard/DashboardPage'
import ProyectsPage from './pages/projects/ProyectsPage';
import RolesPage from './pages/roles/RolesPage';
import UsersPage from './pages/users/UsersPage';
import ProtectedRoute from './ProtectedRoute'
import Layout from './layout/Layout';
import NotFound from './pages/not found/NotFound';

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path='/home' element={<Layout />}>
              <Route path='/home/dashboard' element={<DashboardPage />} />
              <Route path='/home/proyectos' element={<ProyectsPage />} />
              <Route path='/home/roles' element={<RolesPage />} />
              <Route path='/home/usuarios' element={<UsersPage />} />
            </Route>
          </Route>
          <Route path='/*' element={<NotFound />} />

        </Routes>
      </BrowserRouter>
    </AuthProvider>

  )
}

export default App
