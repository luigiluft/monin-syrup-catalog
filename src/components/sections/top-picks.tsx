'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Purê de Yuzu',
    price: 'A partir de $21.00',
    image: 'https://monin.us/cdn/shop/files/USNologo1.png?v=1734726411&width=533',
    rating: 4.8,
    reviews: 40,
    badge: 'SABOR 2025',
    badgeColor: 'bg-[#D4AF37]',
    badges: ['CLEAN', 'FOTY'],
    status: 'sold-out'
  },
  {
    id: 2,
    name: 'Xarope de Pistache',
    price: 'A partir de $11.00',
    image: 'https://monin.us/cdn/shop/files/750mL-Pistachio.png?v=1724878745&width=533',
    rating: 4.9,
    reviews: 89,
    badge: 'NATURAL',
    badgeColor: 'bg-emerald-600',
    badges: ['CLEAN'],
    status: 'available'
  },
  {
    id: 3,
    name: 'Xarope de Marshmallow Tostado',
    price: 'A partir de $11.00',
    image: 'https://monin.us/cdn/shop/files/750mL-Toasted-Marshmallow.png?v=1724939373&width=533',
    rating: 4.7,
    reviews: 238,
    badge: 'NATURAL',
    badgeColor: 'bg-emerald-600',
    badges: ['CLEAN'],
    status: 'available'
  },
  {
    id: 4,
    name: 'Xarope de Yuzu com Abacaxi',
    price: 'A partir de $13.50',
    image: 'https://monin.us/cdn/shop/files/1L-YuzuPineapple.png?v=1737561127&width=533',
    rating: 4.9,
    reviews: 9,
    badge: 'NOVO',
    badgeColor: 'bg-[#e41e2b]',
    badges: ['NEW', 'FOTY'],
    status: 'available'
  },
  {
    id: 5,
    name: 'Xarope de Frutas Vermelhas',
    price: 'A partir de $11.00',
    image: 'https://monin.us/cdn/shop/files/750mL-Stone-Fruit.png?v=1724938021&width=533',
    rating: 4.6,
    reviews: 104,
    badge: 'NATURAL',
    badgeColor: 'bg-emerald-600',
    badges: ['CLEAN'],
    status: 'available'
  },
  {
    id: 6,
    name: 'Xarope de Pepino',
    price: 'A partir de $13.50',
    image: 'https://monin.us/cdn/shop/files/1L-Cucumber.png?v=1724870540&width=533',
    rating: 4.8,
    reviews: 93,
    badge: 'POPULAR',
    badgeColor: 'bg-slate-700',
    badges: [],
    status: 'available'
  },
  {
    id: 7,
    name: 'Purê de Cereja Preta',
    price: 'A partir de $21.00',
    image: 'https://monin.us/cdn/shop/files/Puree-Black-Cherry.png?v=1724940107&width=533',
    rating: 4.9,
    reviews: 56,
    badge: 'NATURAL',
    badgeColor: 'bg-emerald-600',
    badges: ['CLEAN'],
    status: 'available'
  },
  {
    id: 8,
    name: 'Xarope de Coco Sem Açúcar',
    price: 'A partir de $11.00',
    image: 'https://monin.us/cdn/shop/files/750mL-SFCoconut.png?v=1750280046&width=533',
    rating: 4.7,
    reviews: 3,
    badge: 'NOVO',
    badgeColor: 'bg-[#e41e2b]',
    badges: ['NEW'],
    status: 'available'
  }
];

const ProductBadge = ({ badges }: { badges: string[] }) => {
  return (
    <div className="absolute top-3 left-3 z-10 flex flex-wrap items-start gap-2">
      {badges.map((badge) => {
        if (badge === 'CLEAN') {
          return (
            <div key={badge} className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-monin-brown-dark whitespace-nowrap shadow-sm">
              <Image
                src="https://monin.us/cdn/shop/files/clean-icon.svg?v=1726166848&width=10"
                alt="Ícone Clean Label"
                width={10}
                height={10}
              />
              <span>NATURAL</span>
            </div>
          );
        }
        if (badge === 'NEW') {
          return (
            <div key={badge} className="bg-[#e41e2b] text-white rounded-md px-3 py-1 text-xs font-bold tracking-wider shadow-sm">
              NOVO
            </div>
          );
        }
        if (badge === 'FOTY') {
          return (
            <div key={badge} className="bg-[#D4AF37] text-[#3E2723] rounded-sm px-3 py-1 text-xs font-bold tracking-wider shadow-sm">
              SABOR 2025
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

const StarRating = ({ rating, reviewCount }: { rating: number; reviewCount: number }) => (
  <div className="flex items-center justify-center space-x-1 text-monin-brown-dark">
    <div className="flex">
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={`h-4 w-4 ${i < rating ? 'fill-current text-[#D4AF37]' : 'text-gray-300'}`} />
      ))}
    </div>
    <span className="text-xs font-poppins text-monin-brown-medium">({reviewCount})</span>
  </div>
);

export default function TopPicks() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % Math.ceil(products.length / 4));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + Math.ceil(products.length / 4)) % Math.ceil(products.length / 4));
  };

  const itemsPerSlide = 4;
  const startIndex = currentIndex * itemsPerSlide;
  const visibleProducts = products.slice(startIndex, startIndex + itemsPerSlide);

  return (
    <section className="bg-gradient-to-b from-monin-gray-light to-white py-20 lg:py-28">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold font-kanit text-monin-brown-dark mb-6 tracking-tight">
            Principais Escolhas para Você
          </h2>
          <p className="text-lg text-gray-600 font-poppins max-w-2xl mx-auto leading-relaxed">
            Nossos produtos mais amados pelos clientes, selecionados especialmente para elevar suas criações
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-monin-brown-dark hover:text-white group"
            aria-label="Produtos anteriores"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-3 shadow-lg border border-gray-200 transition-all duration-300 hover:scale-110 hover:shadow-xl hover:bg-monin-brown-dark hover:text-white group"
            aria-label="Próximos produtos"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 px-8">
            {visibleProducts.map((product) => (
              <div key={product.id} className="group">
                <div className="bg-white rounded-2xl shadow-md border border-gray-100 transition-all duration-300 hover:shadow-xl hover:scale-105 overflow-hidden">
                  {/* Product Badge */}
                  <div className="relative">
                    <ProductBadge badges={product.badges} />
                    
                    {/* Product Image */}
                    <div className="aspect-square bg-gradient-to-br from-gray-50 to-gray-100 p-6 flex items-center justify-center">
                      <Image
                        src={product.image}
                        alt={product.name}
                        width={300}
                        height={300}
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="p-6">
                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-4 h-4 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`} />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 font-medium">
                        {product.rating} ({product.reviews})
                      </span>
                    </div>

                    {/* Product Name */}
                    <h3 className="font-kanit text-lg font-semibold text-monin-brown-dark mb-3 group-hover:text-[#7B2D5F] transition-colors duration-200 leading-tight">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-monin-brown-dark font-kanit">
                        {product.price}
                      </span>
                    </div>

                    {/* Add to Cart Button */}
                    {product.status === 'available' ? (
                      <button className="w-full bg-monin-brown-dark text-white rounded-xl py-3 px-4 font-poppins-medium text-sm uppercase tracking-wide transition-all duration-300 hover:bg-[#7B2D5F] hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group/btn">
                        <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                        Adicionar ao Carrinho
                      </button>
                    ) : (
                      <button disabled className="w-full bg-gray-200 text-gray-400 rounded-xl py-3 px-4 font-poppins-medium text-sm uppercase tracking-wide cursor-not-allowed">
                        Esgotado
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center mt-8 gap-2">
            {Array.from({ length: Math.ceil(products.length / 4) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-monin-brown-dark scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Ir para página ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* View All Button */}
        <div className="text-center mt-16">
          <Link
            href="/collections"
            className="inline-block bg-monin-brown-dark text-white rounded-full py-4 px-12 uppercase font-poppins-medium text-sm tracking-widest transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#7B2D5F] hover:shadow-lg"
          >
            Ver Todos os Produtos
          </Link>
        </div>
      </div>
    </section>
  );
}