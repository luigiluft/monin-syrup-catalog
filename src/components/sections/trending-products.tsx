"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";

type BadgeType = "CLEAN" | "NEW" | "FOTY";

interface Product {
  id: string;
  name: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
  badges: BadgeType[];
  reviews: number;
  price: string;
  status: "available" | "sold-out" | "coming-soon";
}

const trendingProducts: Product[] = [
  {
    id: "yuzu-puree",
    name: "Purê de Yuzu",
    href: "https://monin.us/products/yuzu-fruit-puree",
    imageSrc: "https://monin.us/cdn/shop/files/USNologo1.png?v=1734726411&width=533",
    imageAlt: "Purê de Yuzu",
    badges: ["CLEAN", "FOTY"],
    reviews: 40,
    price: "A partir de R$ 89,50",
    status: "available",
  },
  {
    id: "stone-fruit-syrup",
    name: "Xarope de Frutas Vermelhas",
    href: "https://monin.us/products/stone-fruit-syrup",
    imageSrc: "https://monin.us/cdn/shop/files/750mL-Stone-Fruit.png?v=1724938021&width=533",
    imageAlt: "Xarope de Frutas Vermelhas",
    badges: ["CLEAN"],
    reviews: 104,
    price: "A partir de R$ 47,90",
    status: "available",
  },
  {
    id: "rock-melon-cantaloupe-syrup",
    name: "Xarope de Melão Cantaloupe",
    href: "https://monin.us/products/rock-melon-cantaloupe-syrup",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/1L-Rock-Melon-Cantaloupe-5.png?",
    imageAlt: "Xarope de Melão Cantaloupe",
    badges: ["CLEAN"],
    reviews: 78,
    price: "A partir de R$ 56,20",
    status: "available",
  },
  {
    id: "cucumber-syrup",
    name: "Xarope de Pepino",
    href: "https://monin.us/products/cucumber-syrup",
    imageSrc: "https://monin.us/cdn/shop/files/1L-Cucumber.png?v=1724870540&width=533",
    imageAlt: "Xarope de Pepino",
    badges: [],
    reviews: 93,
    price: "A partir de R$ 56,20",
    status: "available",
  },
  {
    id: "tiramisu-syrup",
    name: "Xarope de Tiramisú",
    href: "https://monin.us/products/tiramisu-syrup",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/750mL-Tiramisu-7.png?",
    imageAlt: "Xarope de Tiramisú",
    badges: ["CLEAN"],
    reviews: 104,
    price: "A partir de R$ 47,90",
    status: "sold-out",
  },
  {
    id: "toasted-marshmallow-syrup",
    name: "Xarope de Marshmallow Tostado",
    href: "https://monin.us/products/toasted-marshmallow-syrup-1",
    imageSrc: "https://monin.us/cdn/shop/files/750mL-Toasted-Marshmallow.png?v=1724939373&width=533",
    imageAlt: "Xarope de Marshmallow Tostado",
    badges: ["CLEAN"],
    reviews: 238,
    price: "A partir de R$ 47,90",
    status: "available",
  },
  {
    id: "black-cherry-puree",
    name: "Purê de Cereja Preta",
    href: "https://monin.us/products/black-cherry-fruit-puree",
    imageSrc: "https://monin.us/cdn/shop/files/Puree-Black-Cherry.png?v=1724940107&width=533",
    imageAlt: "Purê de Cereja Preta",
    badges: ["CLEAN"],
    reviews: 56,
    price: "A partir de R$ 81,20",
    status: "available",
  },
];

const newFlavorProducts: Product[] = [
  {
    id: "sugar-free-coconut-syrup",
    name: "Xarope de Coco Sem Açúcar",
    href: "https://monin.us/products/sugar-free-coconut-syrup",
    imageSrc: "https://monin.us/cdn/shop/files/750mL-SFCoconut.png?v=1750280046&width=533",
    imageAlt: "Xarope de Coco Sem Açúcar",
    badges: ["NEW"],
    reviews: 3,
    price: "A partir de R$ 52,00",
    status: "available",
  },
  {
    id: "yuzu-pineapple-syrup",
    name: "Xarope de Yuzu com Abacaxi",
    href: "https://monin.us/products/yuzu-pineapple-syrup",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/1L-YuzuPineapple-11.png?",
    imageAlt: "Xarope de Yuzu com Abacaxi",
    badges: ["NEW", "FOTY"],
    reviews: 9,
    price: "A partir de R$ 56,20",
    status: "available",
  },
  {
    id: "sugar-free-blue-raspberry",
    name: "Framboesa Azul Sem Açúcar",
    href: "https://monin.us/products/sugar-free-blue-raspberry",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/1L-SFBlueRaspberry-12.png?",
    imageAlt: "Framboesa Azul Sem Açúcar",
    badges: ["NEW"],
    reviews: 10,
    price: "A partir de R$ 64,50",
    status: "sold-out",
  },
  {
    id: "brilliance-berry-blue-natural-energy",
    name: "Brilliance Berry Blue Energia Natural",
    href: "https://monin.us/products/berry-blue-natural-energy",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/Arch_Berry_Blue-13.png?",
    imageAlt: "Brilliance Berry Blue Energia Natural",
    badges: ["NEW"],
    reviews: 0,
    price: "Em breve",
    status: "coming-soon",
  },
  {
    id: "brilliance-dragon-fruit-pink-natural-energy",
    name: "Brilliance Dragon Fruit Rosa Energia Natural",
    href: "https://monin.us/products/dragon-fruit-pink-natural-energy",
    imageSrc: "https://monin.us/cdn/shop/files/Arch_Dragon_Fruit_Pink.png?v=1727291721&width=533",
    imageAlt: "Brilliance Dragon Fruit Rosa Energia Natural",
    badges: ["NEW"],
    reviews: 0,
    price: "Em breve",
    status: "coming-soon",
  },
  {
    id: "brilliance-glacier-clear-natural-energy",
    name: "Brilliance Glacier Clear Energia Natural",
    href: "https://monin.us/products/glacier-clear-natural-energy",
    imageSrc: "https://monin.us/cdn/shop/files/Arch_Glacier_Clear.png?v=1727291831&width=533",
    imageAlt: "Brilliance Glacier Clear Energia Natural",
    badges: ["NEW"],
    reviews: 0,
    price: "Em breve",
    status: "coming-soon",
  },
  {
    id: "brilliance-powerfruit-purple-natural-energy",
    name: "Brilliance Powerfruit Roxo Energia Natural",
    href: "https://monin.us/products/powerfruit-purple-natural-energy",
    imageSrc: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/Arch_Powerfruit_Purple-16.png?",
    imageAlt: "Brilliance Powerfruit Roxo Energia Natural",
    badges: ["NEW"],
    reviews: 1,
    price: "Em breve",
    status: "coming-soon",
  },
  {
    id: "brilliance-starfruit-yellow-natural-energy",
    name: "Brilliance Starfruit Amarelo Energia Natural",
    href: "https://monin.us/products/starfruit-yellow-natural-energy",
    imageSrc: "https://monin.us/cdn/shop/files/Arch_Starfruit_Yellow.png?v=1727292159&width=533",
    imageAlt: "Brilliance Starfruit Amarelo Energia Natural",
    badges: ["NEW"],
    reviews: 1,
    price: "Em breve",
    status: "coming-soon",
  },
];

const ProductBadge = ({ type }: { type: BadgeType }) => {
  if (type === "CLEAN") {
    return (
      <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-full px-3 py-1 text-xs font-medium text-monin-brown-dark whitespace-nowrap shadow-sm">
        <Image
          src="https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/svgs/clean-icon-2.svg?"
          alt="Ícone Clean Label"
          width={14}
          height={14}
        />
        <span>NATURAL</span>
      </div>
    );
  }
  if (type === "NEW") {
    return (
      <div className="bg-[#e41e2b] text-white rounded-md px-3 py-1 text-xs font-bold tracking-wider shadow-sm">
        NOVO
      </div>
    );
  }
  if (type === "FOTY") {
    return (
      <div className="bg-[#D4AF37] text-[#3E2723] rounded-sm px-3 py-1 text-xs font-bold tracking-wider shadow-sm">
        SABOR 2025
      </div>
    );
  }
  return null;
};

const ProductCard = ({ product }: { product: Product }) => (
  <div className="flex flex-col h-full text-center group">
    <div className="relative mb-4">
      <div className="absolute top-3 left-3 z-10 flex flex-wrap items-start gap-2">
        {product.badges.map((badgeType) => (
          <ProductBadge key={badgeType} type={badgeType} />
        ))}
      </div>
      <Link href={product.href} className="block group-hover:scale-105 transition-transform duration-300">
        <div className="aspect-square bg-[#f9f9f9] rounded-xl p-6 transition-all duration-300 group-hover:shadow-lg border border-gray-100">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            width={400}
            height={400}
            className="w-full h-full object-contain"
          />
        </div>
      </Link>
    </div>
    <div className="flex-grow flex flex-col items-center px-2">
      <h3 className="text-base font-medium text-monin-brown-dark mb-3 min-h-[48px] flex items-center justify-center">
        <Link href={product.href} className="hover:underline transition-colors duration-200 hover:text-[#7B2D5F]">
          {product.name}
        </Link>
      </h3>
      
      {product.reviews > 0 || product.status !== 'coming-soon' ? (
        <div className="flex items-center justify-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star key={i} size={16} className="text-[#d8a422] fill-[#d8a422]" />
          ))}
          <span className="text-sm text-gray-500 ml-1">({product.reviews})</span>
        </div>
      ) : <div className="h-6 mb-3"></div>}
      
      {product.status !== 'coming-soon' && (
        <p className="text-base font-medium text-monin-brown-dark mb-4">{product.price}</p>
      )}
    </div>
    <div className="mt-auto px-2 pb-2">
      {product.status === "available" && (
        <Button className="w-full bg-monin-brown-dark text-white rounded-full uppercase hover:bg-monin-brown-medium h-12 text-sm font-poppins-medium tracking-wider transition-all duration-200 hover:shadow-lg">
          Adicionar ao Carrinho
        </Button>
      )}
      {product.status === "sold-out" && (
        <Button disabled className="w-full bg-gray-200 text-gray-400 rounded-full uppercase h-12 text-sm font-poppins-medium tracking-wider cursor-not-allowed">
          Esgotado
        </Button>
      )}
      {product.status === "coming-soon" && (
        <Button disabled className="w-full bg-[#D4AF37]/20 text-[#B8941F] rounded-full uppercase h-12 text-sm font-poppins-medium tracking-wider cursor-not-allowed">
          Em Breve
        </Button>
      )}
    </div>
  </div>
);

export default function TrendingProducts() {
  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-monin-brown-dark text-center mb-10 font-kanit">O que está em alta?</h2>
        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="flex justify-center gap-8 bg-transparent p-0 mb-12">
            <TabsTrigger 
              value="trending" 
              className="text-lg font-medium text-gray-500 data-[state=active]:text-monin-brown-dark data-[state=active]:border-monin-brown-dark data-[state=active]:border-b-2 pb-2 px-1 rounded-none bg-transparent hover:text-monin-brown-dark transition-colors duration-200"
            >
              Em Alta
            </TabsTrigger>
            <TabsTrigger 
              value="new-flavors" 
              className="text-lg font-medium text-gray-500 data-[state=active]:text-monin-brown-dark data-[state=active]:border-monin-brown-dark data-[state=active]:border-b-2 pb-2 px-1 rounded-none bg-transparent hover:text-monin-brown-dark transition-colors duration-200"
            >
              Novos Sabores
            </TabsTrigger>
          </TabsList>
          <TabsContent value="trending">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {trendingProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="new-flavors">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {newFlavorProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}