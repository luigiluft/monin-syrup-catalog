import React from 'react';

const MerchandisingKit = () => {
  return (
    <section 
      className="relative w-full bg-monin-brown-dark bg-cover bg-center bg-no-repeat overflow-hidden"
      // Nota: O site original usa uma imagem de fundo. Como nenhum asset foi fornecido,
      // uma cor marrom escura sólida da paleta da marca é usada como fallback.
      // A URL da imagem de fundo no site ao vivo é:
      // https://cdn.shopify.com/s/files/1/0612/9339/2054/files/MicrosoftTeams-image_32.jpg?v=1712781489
    >
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60" />
      
      {/* Padrão geométrico decorativo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rotate-45"></div>
        <div className="absolute top-20 right-20 w-16 h-16 border border-white rotate-12"></div>
        <div className="absolute bottom-20 left-20 w-12 h-12 border border-white rotate-45"></div>
        <div className="absolute bottom-10 right-16 w-24 h-24 border-2 border-white rotate-12"></div>
      </div>
      
      <div className="relative z-10 flex min-h-[400px] md:min-h-[480px] flex-col items-center justify-center p-8 text-center text-white">
        <div className="max-w-2xl">
          <h2 className="mb-4 font-kanit text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            Kit de Merchandising
          </h2>
          <p className="mb-8 text-lg md:text-xl text-white/90 font-poppins leading-relaxed max-w-lg mx-auto">
            Eleve seu negócio com nossos materiais promocionais profissionais e atraia mais clientes.
          </p>
          <a
            href="https://vw6sffeouum.typeform.com/to/ixpHYkrD?typeform-source=www.monin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full bg-white px-10 py-4 font-poppins-medium text-base md:text-lg uppercase tracking-wider text-monin-brown-dark transition-all duration-300 hover:scale-105 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-monin-brown-dark"
          >
            INSCREVER-SE
          </a>
        </div>
      </div>
    </section>
  );
};

export default MerchandisingKit;