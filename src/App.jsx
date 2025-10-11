import './App.css'
import { Ingredientes } from './pages/Ingredientes.jsx'
import { Rutas } from './routing/rutas'
import { Header } from './layout/Header.jsx'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MiNevera } from './pages/MiNevera'
import { Inicio } from './pages/inicio'
import { MisRecetas } from './pages/MisRecetas'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/MiNevera" element={<MiNevera />} />
          <Route path="/MisRecetas" element={<MisRecetas />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
