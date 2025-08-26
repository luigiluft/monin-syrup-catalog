import Image from "next/image";
import React from "react";

const HeroSection = () => {
  return (
    <section className="relative w-full aspect-[1920/951] overflow-hidden">
      <Image
        src="https://monin.us/cdn/shop/files/US-FOTY-Yuzu-Homepage-Slider.png?v=1734725870&width=3840"
        alt="Banner web mostrando Purê de Yuzu sobre uma mesa com a fruta Yuzu no meio e o logo do Sabor do Ano Yuzu à direita"
        fill
        priority
        className="object-cover object-center z-0"
      />
      
      {/* Overlay gradiente sutil para melhorar legibilidade */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20 z-5"></div>
      
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <div className="text-center text-white max-w-4xl px-6">
          <h1 className="font-kanit font-bold text-5xl sm:text-6xl md:text-7xl lg:text-[88px] xl:text-[104px] tracking-[-0.02em] leading-none drop-shadow-2xl">
            A Vida é
          </h1>
          <div className="font-script italic text-6xl sm:text-7xl md:text-8xl lg:text-[120px] xl:text-[144px] leading-tight -mt-1 md:-mt-2 drop-shadow-2xl">
            <span className="block text-shadow-xl">uma Jornada</span>
            <span className="block -mt-4 sm:-mt-6 md:-mt-8 lg:-mt-10 text-shadow-xl">
              Criativa
            </span>
          </div>
          
          {/* CTA Button */}
          <div className="mt-8 md:mt-12">
            <a 
              href="/produtos/xarope-yuzu-abacaxi"
              className="inline-block bg-[#D4AF37] hover:bg-[#B8941F] text-[#3E2723] font-poppins font-bold text-base md:text-lg px-8 md:px-12 py-3 md:py-4 rounded-full uppercase tracking-wider transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              Descobrir Yuzu 2025
            </a>
          </div>
        </div>
      </div>
      
      {/* Badge do Sabor do Ano - Posicionamento aprimorado */}
      <div className="absolute top-4 right-4 md:top-8 md:right-8 lg:top-12 lg:right-12 z-20">
        <div className="bg-[#D4AF37] text-[#3E2723] rounded-full p-2 md:p-3 shadow-lg">
          <div className="text-center">
            <div className="font-kanit font-bold text-xs md:text-sm lg:text-base uppercase tracking-wider">
              Yuzu
            </div>
            <div className="font-poppins font-medium text-[10px] md:text-xs">
              Sabor do Ano
            </div>
            <div className="font-kanit font-bold text-lg md:text-xl lg:text-2xl">
              2025
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;