import React from 'react'
import { Header } from '../layout/Header'
import { Supermercados } from '../layout/Supermercados'
import { Footer } from '../layout/footer'
import { Nevera } from '../layout/nevera'

export const MiNevera = () => {
  return (
    <div>
      <Header></Header>
      <Nevera></Nevera>
      <Supermercados></Supermercados>
      <Footer></Footer>
    </div>
  )
}
