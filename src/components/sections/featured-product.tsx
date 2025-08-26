import Image from 'next/image';
import Link from 'next/link';

const NewBadge = () => (
  <Link href="https://monin.us/collections/new-flavors" className="bg-[#D7CCC8] text-[#3E2723] text-xs font-bold uppercase px-4 py-2 rounded-full flex items-center gap-2 hover:bg-[#C4B5B0] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#e7b100] focus:ring-[#D7CCC8] shadow-sm">
    <Image 
      src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/new-icon-3.svg?" 
      alt="Novo" 
      width={12} 
      height={12}
      className="w-3 h-3"
    />
    NOVO
  </Link>
);

const FOTYBadge = () => (
  <Link href="https://monin.us/collections/flavor-of-the-year" className="bg-[#3E2723] text-white text-xs font-bold uppercase px-5 py-2 rounded-full hover:bg-[#2E1A17] transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#e7b100] focus:ring-[#3E2723] shadow-sm">
    SABOR 2025
  </Link>
);

export default function FeaturedProduct() {
  return (
    <section 
      style={{ backgroundImage: 'linear-gradient(116.74deg, #F5D061 22.2%, #D4AF37 79.86%)' }}
      className="py-20 lg:py-28 relative overflow-hidden"
    >
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-[#3E2723] rounded-full"></div>
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-[#3E2723] rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-[#3E2723] rounded-full"></div>
      </div>

      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          <div className="flex justify-center lg:justify-end order-2 lg:order-1">
            <div className="relative">
              <Image
                src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/1L-YuzuPineapple-11.png?"
                alt="Xarope de Yuzu com Abacaxi"
                width={450}
                height={700}
                className="object-contain drop-shadow-[0_20px_25px_rgba(0,0,0,0.2)] max-w-full h-auto max-h-[600px] transform hover:scale-105 transition-transform duration-500"
              />
              
              {/* Círculo decorativo atrás do produto */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-white/20 rounded-full -z-10"></div>
            </div>
          </div>
          
          <div className="bg-[#e7b100] p-8 md:p-12 lg:p-16 rounded-3xl relative order-1 lg:order-2 shadow-xl">
              {/* Sombra interna para profundidade */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/5 rounded-3xl"></div>
              
              <div className="relative z-10">
                <div className="flex flex-wrap items-center gap-3 mb-6">
                  <NewBadge />
                  <FOTYBadge />
                </div>
                
                <h2 className="font-kanit font-bold text-3xl md:text-4xl lg:text-5xl text-[#3E2723] leading-tight">
                  Xarope de Yuzu com Abacaxi
                </h2>
                
                <p className="font-poppins text-xl md:text-2xl text-[#3E2723] font-semibold mt-4 mb-6">
                  R$ 56,20
                </p>
                
                <p className="font-kanit text-base md:text-lg text-[#5D4037] leading-relaxed mb-8">
                  Diga "sim" ao nosso Sabor do Ano de 2025 — Yuzu! Esta mistura vibrante de yuzu e abacaxi oferece uma explosão intensa de sabor, perfeita para criar coquetéis tropicais refrescantes, mocktails, chás gelados, bebidas energéticas e muito mais.
                </p>
                
                <Link href="https://monin.us/products/yuzu-pineapple-syrup" className="inline-block bg-[#3E2723] text-white font-poppins font-bold text-base lg:text-lg uppercase tracking-widest px-12 py-4 rounded-full hover:bg-[#5D4037] hover:shadow-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#e7b100] focus:ring-[#3E2723]">
                  Descobrir
                </Link>
              </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}