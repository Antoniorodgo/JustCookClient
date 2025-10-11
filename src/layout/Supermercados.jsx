import React from "react";

export const Supermercados = () => {
  return (
    <section className="supermercados">
      <div className="logos-track">
        <div className="logo"><img src="ruta-a-logo-bonpreu.png" alt="Bonpreu" /></div>
        <div className="logo"><img src="ruta-a-logo-caprabo.png" alt="Caprabo" /></div>
        <div className="logo"><img src="ruta-a-logo-condis.png" alt="Condis" /></div>
        <div className="logo"><img src="ruta-a-logo-mercadona.png" alt="Mercadona" /></div>
        <div className="logo"><img src="ruta-a-logo-alcampo.png" alt="Alcampo" /></div>
        <div className="logo"><img src="ruta-a-logo-lidl.png" alt="Lidl" /></div>

        {/* Se repiten para lograr loop infinito */}
        <div className="logo"><img src="ruta-a-logo-bonpreu.png" alt="Bonpreu" /></div>
        <div className="logo"><img src="ruta-a-logo-caprabo.png" alt="Caprabo" /></div>
        <div className="logo"><img src="ruta-a-logo-condis.png" alt="Condis" /></div>
        <div className="logo"><img src="ruta-a-logo-mercadona.png" alt="Mercadona" /></div>
        <div className="logo"><img src="ruta-a-logo-alcampo.png" alt="Alcampo" /></div>
        <div className="logo"><img src="ruta-a-logo-lidl.png" alt="Lidl" /></div>
      </div>
    </section>
  );
};

