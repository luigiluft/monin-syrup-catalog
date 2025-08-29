'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star, ShoppingCart } from 'lucide-react';

type Product = {
  id: number;
  name: string;
  image: string;
  alt: string;
  price: string;
  rating: number;
  reviewCount: number;
  badges: {
    label: 'CLEAN' | 'POPULAR';
    icon: string;
  }[];
  href: string;
};

const products = [
  {
    id: 1,
    name: 'Xarope de Baunilha 750mL',
    price: 'R$ 45,90',
    originalPrice: 'R$ 52,90',
    image: 'https://monin.us/cdn/shop/files/vanilla-syrup-750ml.webp?v=1725575697&width=300',
    rating: 4.8,
    reviews: 156,
    badge: 'MAIS VENDIDO',
    badgeColor: 'bg-monin-brown-dark'
  },
  {
    id: 2,
    name: 'Bomba para Frasco de Vidro 750mL',
    price: 'R$ 28,90',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a03201d5-2727-41ab-9ec0-b82cea30b5d3/generated_images/professional-product-photography-of-glas-b1d165b8-20250829192114.jpg',
    rating: 4.9,
    reviews: 89,
    badge: 'ACESSÓRIO',
    badgeColor: 'bg-emerald-600'
  },
  {
    id: 3,
    name: 'Xarope de Caramelo 750mL',
    price: 'R$ 45,90',
    image: 'https://monin.us/cdn/shop/files/caramel-syrup-750ml.webp?v=1725575682&width=300',
    rating: 4.7,
    reviews: 203,
    badge: 'CLÁSSICO',
    badgeColor: 'bg-amber-600'
  },
  {
    id: 4,
    name: 'Kit Café Barista Premium',
    price: 'R$ 189,90',
    originalPrice: 'R$ 229,90',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a03201d5-2727-41ab-9ec0-b82cea30b5d3/generated_images/professional-product-photography-of-prem-3952f41d-20250829192134.jpg',
    rating: 4.9,
    reviews: 67,
    badge: 'KIT ESPECIAL',
    badgeColor: 'bg-purple-600'
  },
  {
    id: 5,
    name: 'Xarope de Morango 750mL',
    price: 'R$ 45,90',
    image: 'https://monin.us/cdn/shop/files/strawberry-syrup-750ml.webp?v=1725575696&width=300',
    rating: 4.6,
    reviews: 142,
    badge: 'FRUTADO',
    badgeColor: 'bg-rose-600'
  },
  {
    id: 6,
    name: 'Concentrado de Café Gelado 1L',
    price: 'R$ 67,90',
    image: 'https://monin.us/cdn/shop/files/1l_iced_coffee_concentrate.webp?v=1725575852&width=300',
    rating: 4.8,
    reviews: 98,
    badge: 'PROFISSIONAL',
    badgeColor: 'bg-slate-700'
  },
  {
    id: 7,
    name: 'Xarope de Chocolate 750mL',
    price: 'R$ 45,90',
    image: 'https://monin.us/cdn/shop/files/dark-chocolate-syrup-750ml.webp?v=1725575684&width=300',
    rating: 4.9,
    reviews: 178,
    badge: 'FAVORITO',
    badgeColor: 'bg-yellow-600'
  },
  {
    id: 8,
    name: 'Molho de Caramelo Premium 375mL',
    price: 'R$ 38,90',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a03201d5-2727-41ab-9ec0-b82cea30b5d3/generated_images/professional-product-photography-of-gour-a3911071-20250829192123.jpg',
    rating: 4.7,
    reviews: 134,
    badge: 'GOURMET',
    badgeColor: 'bg-orange-600'
  },
  {
    id: 9,
    name: 'Coleção Sabores Tropicais',
    price: 'R$ 129,90',
    originalPrice: 'R$ 159,90',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/project-uploads/a03201d5-2727-41ab-9ec0-b82cea30b5d3/generated_images/professional-product-photography-of-prem-f40243c5-20250829192143.jpg',
    rating: 4.8,
    reviews: 76,
    badge: 'COLEÇÃO',
    badgeColor: 'bg-teal-600'
  }
];

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

const ProductCard = ({ product }: { product: Product }) => (
  <div className="flex-shrink-0 w-1/4 px-3">
    <div className="group relative bg-white h-full flex flex-col">
      <div className="relative bg-monin-gray-light rounded-xl aspect-[1/1] flex items-center justify-center p-6">
        {product.badges.length > 0 && (
          <div className="absolute top-3 left-3 flex flex-col space-y-2">
            {product.badges.map((badge, index) => (
               <div key={index} className="flex items-center bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                 <Image src={badge.icon} alt={`Ícone ${badge.label}`} width={12} height={12} className="mr-1" />
                 <span className="text-[10px] font-poppins-medium text-monin-brown-dark tracking-wider">
                   {badge.label === 'CLEAN' ? 'NATURAL' : 'POPULAR'}
                 </span>
               </div>
            ))}
          </div>
        )}
        <Link href={product.href} className="block w-full h-full group-hover:scale-105 transition-transform duration-300">
          <Image
            src={product.image}
            alt={product.alt}
            width={280}
            height={280}
            className="object-contain w-full h-full"
          />
        </Link>
        <button className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-48px)] bg-monin-brown-dark text-white rounded-full py-3 px-6 text-sm font-poppins-medium uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#7B2D5F] transform hover:scale-105">
          Adicionar ao Carrinho
        </button>
      </div>
      <div className="text-center pt-5 pb-3 px-3 flex flex-col flex-grow justify-between">
        <div>
          <h3 className="text-base font-kanit text-monin-brown-dark mb-2 leading-snug">
            <Link href={product.href} className="hover:underline hover:text-[#7B2D5F] transition-colors duration-200">{product.name}</Link>
          </h3>
          <StarRating rating={product.rating} reviewCount={product.reviewCount} />
        </div>
        <p className="font-kanit text-base font-medium text-monin-brown-dark mt-3">{product.price}</p>
      </div>
    </div>
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
                    <div className={`absolute top-3 left-3 z-10 ${product.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg`}>
                      {product.badge}
                    </div>
                    
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
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through font-poppins">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button className="w-full bg-monin-brown-dark text-white rounded-xl py-3 px-4 font-poppins-medium text-sm uppercase tracking-wide transition-all duration-300 hover:bg-[#7B2D5F] hover:scale-105 hover:shadow-lg flex items-center justify-center gap-2 group/btn">
                      <ShoppingCart className="w-4 h-4 transition-transform duration-300 group-hover/btn:scale-110" />
                      Adicionar ao Carrinho
                    </button>
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