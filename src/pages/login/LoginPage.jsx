import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../../components/botones/Button";
import './login.css'; // Importar el archivo CSS

function LoginPage() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const {
        signin,
        isAuthenticated,
        errorMessage,
    } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) navigate("/home");
    }, [isAuthenticated, navigate]);

    const onSubmit = handleSubmit((data) => {
        signin(data);
    });

    return (
        <div className="login-container">
            <div className="login-box">
                <div className="logo">
                    <img src="https://olsoftware.com/wp-content/uploads/2021/04/cropped-Logo-Oficial-OL-Software-230x64.png" alt="Logo" />
                </div>
                <h1 className="login-title">Bienvenido al gestor de proyectos!</h1>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={onSubmit} className="login-form">
                    <input
                        type="text"
                        {...register("user", { required: true })}
                        placeholder="Nombre de usuario Ej: nombre.apellido"
                        className="login-input"
                    />
                    {errors.user && <p className="error-message">El usuario es requerido</p>}
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Aquí va tu contraseña"
                        className="login-input"
                    />
                    {errors.password && <p className="error-message">La contraseña es requerida</p>}
                    <Button>
                        Ingresar
                    </Button>
                    <div className="login-options">
                        <label>
                            <input type="checkbox" /> Permanecer Conectado
                        </label>
                        <a href="/recuperar-contrasena" className="recover-password">Recuperar Contraseña</a>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
