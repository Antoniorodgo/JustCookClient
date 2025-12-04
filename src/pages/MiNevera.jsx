import React from 'react'
import { Supermercados } from '../layout/Supermercados'
import { Nevera } from '../components/Nevera/Nevera'


export const MiNevera = () => {
  return (
    <>
      <main>
        <h2 id='titulo-nevera'>Mi nevera</h2>
        <Nevera></Nevera>
      </main>
      {/* <Supermercados></Supermercados> */}
    </>
  );
};
