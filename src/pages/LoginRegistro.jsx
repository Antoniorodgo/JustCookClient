import Registro from "../components/LoginRegistro/Registro/Registro";
import InicioSesion from "../components/LoginRegistro/InicioSesion/InicioSesion";
import '../components/LoginRegistro/Registro/registro.css'; 

export const LoginRegistro = () => {
    return (
        <section className="login-registro-container">
            <div className="form-column">
                <InicioSesion />
            </div>
            <div className="form-column">
                <Registro />
            </div>
        </section>
    )
}
