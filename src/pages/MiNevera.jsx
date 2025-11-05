import React from 'react'
import { Supermercados } from '../layout/Supermercados'
import { Nevera } from '../components/Nevera/Nevera'


export const MiNevera = () => {
  return (
    <>
      <main>
        <Nevera></Nevera>
      </main>
      <Supermercados></Supermercados>
    </>
  );
};
