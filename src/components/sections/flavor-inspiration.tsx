import React from 'react';

const inspirationCategories = [
  {
    title: 'Bebidas Sem Álcool',
    href: 'https://monin.us/collections/mocktail-recipes',
    backgroundImage: 'url(https://monin.us/cdn/shop/articles/Screenshot-2024-06-04-144434_33ef5011-6890-4b42-a807-9d7a32437305.png?v=1750440868&width=600)',
    positionClasses: 'w-[280px] h-[280px] sm:w-[320px] sm:h-[320px] lg:w-[360px] lg:h-[360px] top-0 left-1/2 -translate-x-1/2 z-20',
  },
  {
    title: 'Favoritos do Café',
    href: 'https://monin.us/collections/coffee-syrups',
    backgroundColor: 'bg-[#5D4037]', // Medium Brown placeholder for coffee beans
    positionClasses: 'w-[220px] h-[220px] sm:w-[260px] sm:h-[260px] lg:w-[300px] lg:h-[300px] bottom-0 right-0 sm:right-4 z-10',
  },
  {
    title: 'Sabores Florais',
    href: 'https://monin.us/collections/floral-flavors',
    backgroundColor: 'bg-[#8B3A6B]', // Secondary Purple placeholder for floral image
    positionClasses: 'w-[200px] h-[200px] sm:w-[240px] sm:h-[240px] lg:w-[280px] lg:h-[280px] bottom-4 left-0 sm:left-4 z-0',
  },
];

interface InspirationCardProps {
  title: string;
  href: string;
  positionClasses: string;
  backgroundImage?: string;
  backgroundColor?: string;
}

const InspirationCard: React.FC<InspirationCardProps> = ({ title, href, positionClasses, backgroundImage, backgroundColor }) => (
  <a
    href={href}
    className={`absolute block rounded-full overflow-hidden shadow-2xl group transition-all duration-500 ease-in-out hover:scale-110 hover:shadow-3xl ${positionClasses} ${backgroundColor || ''}`}
    style={backgroundImage ? { backgroundImage: backgroundImage, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
  >
    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-all duration-300"></div>
    <div className="relative h-full flex flex-col items-center justify-center text-center text-white p-6">
      <h3 className="font-kanit font-bold text-2xl lg:text-3xl leading-tight drop-shadow-lg mb-4">{title}</h3>
      <div className="bg-white text-monin-brown-dark rounded-full px-8 py-3 text-sm font-poppins font-medium uppercase tracking-widest shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-white">
        Descobrir
      </div>
    </div>
  </a>
);

const FlavorInspiration = () => {
  return (
    <section className="relative bg-gradient-to-br from-[#7B2D5F] via-[#8B3A6B] to-[#7B2D5F] text-white overflow-hidden py-20 lg:py-28">
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-white rounded-full"></div>
        <div className="absolute top-32 right-20 w-16 h-16 border border-white rounded-full"></div>
        <div className="absolute bottom-20 left-32 w-12 h-12 border border-white rounded-full"></div>
        <div className="absolute bottom-32 right-10 w-24 h-24 border-2 border-white rounded-full"></div>
      </div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-y-16 lg:gap-x-16 items-center">
          <div className="lg:col-span-2 space-y-8 text-center lg:text-left">
            <h2 className="font-kanit font-bold text-5xl lg:text-6xl leading-tight">
              Inspiração de
              <span className="block text-[#D4AF37]">Sabores</span>
            </h2>
            <p className="text-lg lg:text-xl max-w-lg mx-auto lg:mx-0 leading-relaxed text-white/90">
              Explore mais de 200 saborizantes premium para encontrar o seu perfil perfeito. Seja você fã de notas frutadas, florais ou picantes, deixe os sabores da natureza inspirarem você a criar algo extraordinário.
            </p>
            <div className="hidden lg:block">
              <a 
                href="/produtos"
                className="inline-block bg-[#D4AF37] hover:bg-[#B8941F] text-[#3E2723] font-poppins font-bold px-8 py-4 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
              >
                Ver Todos os Sabores
              </a>
            </div>
          </div>
          <div className="lg:col-span-3 relative h-[400px] sm:h-[450px] lg:h-[480px] w-full">
            {inspirationCategories.map((card) => (
              <InspirationCard key={card.title} {...card} />
            ))}
          </div>
          
          {/* Mobile CTA */}
          <div className="lg:hidden text-center">
            <a 
              href="/produtos"
              className="inline-block bg-[#D4AF37] hover:bg-[#B8941F] text-[#3E2723] font-poppins font-bold px-8 py-4 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Ver Todos os Sabores
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FlavorInspiration;