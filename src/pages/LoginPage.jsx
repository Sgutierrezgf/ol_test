import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

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
        <div >
            <div >
                <h1 >Inicio de sesion</h1>
                {errorMessage && <p >{errorMessage}</p>}
                <form onSubmit={onSubmit} >
                    <input
                        type="user"
                        {...register("user", { required: true })}

                        placeholder="Usuario"
                    />
                    {errors.user && <p>user is required</p>}
                    <input
                        type="password"
                        {...register("password", { required: true })}

                        placeholder="Password"
                    />
                    {errors.password && (
                        <p>Password is required</p>
                    )}
                    <button
                        type="submit"

                    >
                        Iniciar sesion
                    </button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
