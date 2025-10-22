import './ingrediente.css'

function Ingrediente({ nombre }) {
    return (
        <div className="ingrediente">
            <p>{nombre}</p>
        </div>
    )
}

export default Ingrediente