import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './ProtectedRoute'
import { Suspense, lazy } from 'react';
import './App.css'

const LoginPage = lazy(() => import('./pages/login/LoginPage'));
const DashboardPage = lazy(() => import('./pages/dashboard/DashboardPage'));
const ProyectsPage = lazy(() => import('./pages/projects/ProyectsPage'));
const RolesPage = lazy(() => import('./pages/roles/RolesPage'));
const UsersPage = lazy(() => import('./pages/users/UsersPage'));
const NotFound = lazy(() => import('./pages/not found/NotFound'));
const Layout = lazy(() => import('./layout/Layout'));

function App() {

  return (
    <AuthProvider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
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
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
