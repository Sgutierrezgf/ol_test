import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function HomePage() {

  const {
    isAuthenticated,
  } = useAuth();
  const navigate = useNavigate();

  const handleDash = () => {
    if (isAuthenticated) navigate("/dashboard");
  }

  const handleProyects = () => {
    if (isAuthenticated) navigate("/proyectos");
  }

  const handleUsers = () => {
    if (isAuthenticated) navigate("/usuarios");
  }

  const handleRols = () => {
    if (isAuthenticated) navigate("/roles");
  }

  return (
    <div>
      <button onClick={handleDash}>dashboard</button>
      <button onClick={handleProyects}>proyectos</button>
      <button onClick={handleUsers}>usuarios</button>
      <button onClick={handleRols}>roles</button>
    </div>
  );
}

export default HomePage;
