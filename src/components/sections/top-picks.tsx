"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

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

const products: Product[] = [
  {
    id: 1,
    name: 'Xarope de Baunilha',
    image: 'https://monin.us/cdn/shop/files/750mL-Vanilla.png?v=1724939521&width=533',
    alt: 'Xarope de Baunilha',
    price: 'A partir de R$ 47,90',
    rating: 5,
    reviewCount: 333,
    badges: [
      { label: 'CLEAN', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/clean-icon-2.svg?' },
      { label: 'POPULAR', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/popular-icon-4.svg?' }
    ],
    href: '/products/vanilla-syrup',
  },
  {
    id: 2,
    name: 'Bomba para Frasco de Vidro 750mL',
    image: 'https://monin.us/cdn/shop/files/750_ml_glass_bottle_pumps_1.jpg?v=1712093035&width=533',
    alt: 'Bomba para Frasco de Vidro 750mL',
    price: 'R$ 15,60',
    rating: 5,
    reviewCount: 298,
    badges: [],
    href: '/products/monin-750ml-pump',
  },
  {
    id: 3,
    name: 'Xarope de Lavanda',
    image: 'https://monin.us/cdn/shop/files/750mL-Lavender.png?v=1724876415&width=533',
    alt: 'Xarope de Lavanda',
    price: 'A partir de R$ 47,90',
    rating: 5,
    reviewCount: 346,
    badges: [
      { label: 'CLEAN', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/clean-icon-2.svg?' },
      { label: 'POPULAR', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/popular-icon-4.svg?' }
    ],
    href: '/products/lavender-syrup',
  },
  {
    id: 4,
    name: 'Xarope de Caramelo',
    image: 'https://monin.us/cdn/shop/files/750mL-Caramel.png?v=1724869846&width=533',
    alt: 'Frasco de 750 mililitros de xarope de caramelo Monin',
    price: 'A partir de R$ 47,90',
    rating: 5,
    reviewCount: 246,
    badges: [
      { label: 'CLEAN', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/clean-icon-2.svg?' },
      { label: 'POPULAR', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/popular-icon-4.svg?' }
    ],
    href: '/products/caramel-syrup',
  },
  {
    id: 5,
    name: 'Molho de Chocolate Branco',
    image: 'https://monin.us/cdn/shop/files/64_12-oz-white-chocolate-sauce-group-rev-5_16-new-pump.png?v=1712093032&width=533',
    alt: 'Uma garrafa de Molho de Chocolate Branco Monin com dispensador bomba, ao lado de uma garrafa menor de Molho de Chocolate Branco Monin sem bomba.',
    price: 'A partir de R$ 54,10',
    rating: 5,
    reviewCount: 229,
    badges: [
      { label: 'POPULAR', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/popular-icon-4.svg?' }
    ],
    href: '/products/white-chocolate-sauce',
  },
  {
    id: 6,
    name: 'Molho de Chocolate Amargo',
    image: 'https://monin.us/cdn/shop/files/64_12-oz-chocolate-sauce-group-rev-5_16-new-pump_-_copy.png?v=1752765928&width=533',
    alt: 'Uma garrafa de Molho de Chocolate Amargo Monin com dispensador bomba, ao lado de uma garrafa menor de Molho de Chocolate Amargo Monin sem bomba.',
    price: 'A partir de R$ 47,90',
    rating: 5,
    reviewCount: 216,
    badges: [
      { label: 'POPULAR', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/popular-icon-4.svg?' }
    ],
    href: '/products/dark-chocolate-sauce-1',
  },
  {
    id: 7,
    name: 'Bomba para Frasco Plástico 1L',
    image: 'https://monin.us/cdn/shop/files/1l_plastic_bottle_pumps_1.jpg?v=1712093074&width=533',
    alt: 'Bomba para Frasco Plástico 1L',
    price: 'R$ 15,60',
    rating: 5,
    reviewCount: 268,
    badges: [],
    href: '/products/monin-pump-for-1l-plastic-bottle',
  },
  {
    id: 8,
    name: 'Molho de Caramelo',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/64_12-oz-caramel-sauce-group-rev-5_16-new-pump-22.webp?',
    alt: 'Uma garrafa de Molho de Caramelo Monin com dispensador bomba, ao lado de uma garrafa menor de Molho de Caramelo Monin sem bomba.',
    price: 'A partir de R$ 52,00',
    rating: 5,
    reviewCount: 211,
    badges: [
        { label: 'POPULAR', icon: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/popular-icon-4.svg?' }
    ],
    href: '/products/caramel-sauce',
  },
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
  const itemsVisible = 4;
  const totalPositions = products.length - itemsVisible + 1;

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(totalPositions - 1, prev + 1));
  };

  return (
    <section className="bg-background py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold font-kanit text-monin-brown-dark text-center mb-16">
          Principais Escolhas para Você
        </h2>
        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out -mx-3"
              style={{ transform: `translateX(-${currentIndex * (100 / itemsVisible)}%)` }}
            >
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-6 mt-12">
          <button
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Slide anterior"
            className="w-14 h-14 flex items-center justify-center rounded-full bg-monin-tan-beige/50 text-monin-brown-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-monin-tan-beige transition-all duration-200 hover:scale-105"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <div className="font-poppins text-sm text-monin-brown-medium">
            <span className="font-bold">{currentIndex + 1}</span>
            <span className="mx-2">de</span>
            <span>{totalPositions}</span>
          </div>

          <button
            onClick={handleNext}
            disabled={currentIndex === totalPositions - 1}
            aria-label="Próximo slide"
            className="w-14 h-14 flex items-center justify-center rounded-full bg-monin-tan-beige/50 text-monin-brown-dark disabled:opacity-50 disabled:cursor-not-allowed hover:bg-monin-tan-beige transition-all duration-200 hover:scale-105"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        <div className="text-center mt-12">
          <Link href="/collections/principais-escolhas" className="inline-block bg-monin-brown-dark text-white font-poppins-medium text-sm tracking-wider uppercase py-4 px-12 rounded-full hover:bg-[#7B2D5F] hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            Ver Tudo
          </Link>
        </div>
      </div>
    </section>
  );
}