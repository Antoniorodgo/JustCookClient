import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Ingredientes } from './components/pages/Ingredientes'
import { Rutas } from './routing/rutas'
import { Header } from './components/layout/Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { MiNevera } from './components/pages/MiNevera'
import { Inicio } from './components/pages/inicio'
import { MisRecetas } from './components/pages/MisRecetas'

function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Inicio/>} />
          <Route path="/MiNevera" element={<MiNevera/>} />
          <Route path="/MisRecetas" element={<MisRecetas/>} />


          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
