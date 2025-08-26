"use client";

import { useState, useEffect, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Search, 
  Filter, 
  Grid, 
  List, 
  ChevronDown, 
  Star, 
  ShoppingCart,
  Heart,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

// Collection data
const collections = {
  'xaropes-saborizados': {
    name: 'Xaropes Saborizados',
    description: 'Descubra nossa coleção premium de xaropes saborizados, feitos com ingredientes naturais de alta qualidade para elevar suas bebidas ao próximo nível.',
    image: 'https://monin.us/cdn/shop/files/750mL-Vanilla.png?v=1724939521&width=533',
    productCount: 45
  },
  'molhos-gourmet': {
    name: 'Molhos Gourmet',
    description: 'Molhos artesanais premium para cafés, sobremesas e criações culinárias especiais.',
    image: 'https://monin.us/cdn/shop/files/64_12-oz-caramel-sauce-group-rev-5_16-new-pump.png?v=1712093032&width=533',
    productCount: 18
  },
  'sabores-sem-acucar': {
    name: 'Sabores Sem Açúcar',
    description: 'Toda a doçura sem o açúcar. Perfeito para quem busca sabor sem compromissos.',
    image: 'https://monin.us/cdn/shop/files/sugar-free-caramel-syrup-750ml_1.webp?v=1725575683&width=300',
    productCount: 22
  },
  'adocantes-mixers': {
    name: 'Adoçantes & Mixers',
    description: 'Bases e adoçantes naturais para suas criações mais autênticas.',
    image: 'https://monin.us/cdn/shop/files/Sweetener_Agave-23.webp?v=1725575852&width=300',
    productCount: 15
  }
};

// Sample products
const products = [
  {
    id: 1,
    name: 'Xarope de Baunilha',
    category: 'xaropes-saborizados',
    image: 'https://monin.us/cdn/shop/files/750mL-Vanilla.png?v=1724939521&width=533',
    price: 47.90,
    rating: 4.8,
    reviewCount: 333,
    badges: ['NATURAL', 'POPULAR'],
    isNew: false,
    isPromotion: false
  },
  {
    id: 2,
    name: 'Xarope de Caramelo',
    category: 'xaropes-saborizados',
    image: 'https://monin.us/cdn/shop/files/750mL-Caramel.png?v=1724869846&width=533',
    price: 47.90,
    rating: 4.9,
    reviewCount: 246,
    badges: ['NATURAL', 'POPULAR'],
    isNew: false,
    isPromotion: false
  },
  {
    id: 3,
    name: 'Xarope de Lavanda',
    category: 'xaropes-saborizados',
    image: 'https://monin.us/cdn/shop/files/750mL-Lavender.png?v=1724876415&width=533',
    price: 47.90,
    rating: 4.7,
    reviewCount: 186,
    badges: ['NATURAL'],
    isNew: false,
    isPromotion: false
  },
  {
    id: 4,
    name: 'Xarope Yuzu Abacaxi',
    category: 'xaropes-saborizados',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/1L-YuzuPineapple-11.png?',
    price: 52.90,
    rating: 4.6,
    reviewCount: 89,
    badges: ['NEW', 'FOTY'],
    isNew: true,
    isPromotion: false
  },
  {
    id: 5,
    name: 'Molho de Chocolate',
    category: 'molhos-gourmet',
    image: 'https://monin.us/cdn/shop/files/64_12-oz-chocolate-sauce-group-rev-5_16-new-pump_-_copy.png?v=1752765928&width=533',
    price: 35.60,
    rating: 4.8,
    reviewCount: 156,
    badges: ['POPULAR'],
    isNew: false,
    isPromotion: false
  },
  {
    id: 6,
    name: 'Molho de Chocolate Branco',
    category: 'molhos-gourmet',
    image: 'https://monin.us/cdn/shop/files/64_12-oz-white-chocolate-sauce-group-rev-5_16-new-pump.png?v=1712093032&width=533',
    price: 35.60,
    rating: 4.7,
    reviewCount: 134,
    badges: [],
    isNew: false,
    isPromotion: false
  },
  {
    id: 7,
    name: 'Molho de Caramelo',
    category: 'molhos-gourmet',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/64_12-oz-caramel-sauce-group-rev-5_16-new-pump-22.webp?',
    price: 35.60,
    rating: 4.9,
    reviewCount: 198,
    badges: ['POPULAR'],
    isNew: false,
    isPromotion: false
  },
  {
    id: 8,
    name: 'Xarope Sem Açúcar - Baunilha',
    category: 'sabores-sem-acucar',
    image: 'https://monin.us/cdn/shop/files/750mL-SFVanilla.png?v=1724939691&width=533',
    price: 52.90,
    rating: 4.5,
    reviewCount: 89,
    badges: ['SUGAR-FREE'],
    isNew: false,
    isPromotion: false
  },
  {
    id: 9,
    name: 'Xarope Sem Açúcar - Caramelo',
    category: 'sabores-sem-acucar',
    image: 'https://monin.us/cdn/shop/files/sugar-free-caramel-syrup-750ml_1.webp?v=1725575683&width=300',
    price: 52.90,
    rating: 4.4,
    reviewCount: 76,
    badges: ['SUGAR-FREE'],
    isNew: false,
    isPromotion: false
  },
  {
    id: 10,
    name: 'Adoçante de Agave',
    category: 'adocantes-mixers',
    image: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/Sweetener_Agave-23.webp?',
    price: 42.90,
    rating: 4.6,
    reviewCount: 112,
    badges: ['NATURAL'],
    isNew: false,
    isPromotion: false
  }
];

const badgeColors = {
  'NATURAL': 'bg-green-100 text-green-700 border-green-200',
  'POPULAR': 'bg-orange-100 text-orange-700 border-orange-200',
  'NEW': 'bg-blue-100 text-blue-700 border-blue-200',
  'FOTY': 'bg-purple-100 text-purple-700 border-purple-200',
  'SUGAR-FREE': 'bg-teal-100 text-teal-700 border-teal-200',
  'PROMOTION': 'bg-red-100 text-red-700 border-red-200'
};

export default function CollectionPage() {
  const params = useParams();
  const slug = params.slug as string;
  
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('popularity');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedBadges, setSelectedBadges] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  const collection = collections[slug as keyof typeof collections];

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      // Category filter
      if (product.category !== slug) return false;
      
      // Search filter
      if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) {
        return false;
      }
      
      // Price filter
      if (product.price < priceRange[0] || product.price > priceRange[1]) {
        return false;
      }
      
      // Badge filters
      if (selectedBadges.length > 0) {
        const hasMatchingBadge = selectedBadges.some(badge => product.badges.includes(badge));
        if (!hasMatchingBadge) return false;
      }
      
      return true;
    });

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'newest':
          return b.isNew ? 1 : -1;
        case 'popularity':
        default:
          return b.rating - a.rating;
      }
    });

    return filtered;
  }, [slug, searchQuery, sortBy, priceRange, selectedBadges]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredAndSortedProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredAndSortedProducts, currentPage]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  const handleAddToCart = (productName: string) => {
    toast.success(`${productName} adicionado ao carrinho!`);
  };

  const handleBadgeFilter = (badge: string, checked: boolean) => {
    setSelectedBadges(prev => 
      checked 
        ? [...prev, badge]
        : prev.filter(b => b !== badge)
    );
  };

  const clearFilters = () => {
    setSearchQuery('');
    setPriceRange([0, 100]);
    setSelectedBadges([]);
    setSortBy('popularity');
  };

  if (!collection) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#3E2723] mb-4">Coleção não encontrada</h1>
          <p className="text-[#5D4037] mb-6">A categoria que você está procurando não existe.</p>
          <Link href="/collections">
            <Button className="bg-[#7B2D5F] hover:bg-[#8B3A6B] text-white">
              Ver Todas as Coleções
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-[#F5F5F5] py-4">
        <div className="container">
          <nav className="flex items-center space-x-2 text-sm text-[#5D4037]">
            <Link href="/" className="hover:text-[#7B2D5F] transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/collections" className="hover:text-[#7B2D5F] transition-colors">
              Collections
            </Link>
            <span>/</span>
            <span className="text-[#3E2723] font-medium">{collection.name}</span>
          </nav>
        </div>
      </div>

      {/* Collection Hero */}
      <div className="py-16 bg-gradient-to-r from-[#7B2D5F] to-[#8B3A6B]">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl font-bold mb-6">{collection.name}</h1>
              <p className="text-xl mb-6 opacity-90">{collection.description}</p>
              <div className="flex items-center space-x-6">
                <div className="text-sm">
                  <span className="opacity-70">Total de produtos:</span>
                  <span className="ml-2 font-semibold text-[#D4AF37]">
                    {filteredAndSortedProducts.length}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={400}
                  height={400}
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:w-80 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white border border-[#D7CCC8] rounded-lg p-6 sticky top-4">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-[#3E2723]">Filtros</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="text-[#7B2D5F] hover:bg-[#F5F5F5]"
                >
                  Limpar
                </Button>
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#3E2723] mb-2">
                  Buscar
                </label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5D4037] w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Nome do produto..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#3E2723] mb-4">
                  Faixa de Preço: R$ {priceRange[0]} - R$ {priceRange[1]}
                </label>
                <Slider
                  value={priceRange}
                  onValueChange={setPriceRange}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>

              {/* Badge Filters */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-[#3E2723] mb-4">
                  Características
                </label>
                <div className="space-y-3">
                  {['NATURAL', 'POPULAR', 'NEW', 'SUGAR-FREE'].map(badge => (
                    <div key={badge} className="flex items-center space-x-2">
                      <Checkbox
                        id={badge}
                        checked={selectedBadges.includes(badge)}
                        onCheckedChange={(checked) => handleBadgeFilter(badge, checked as boolean)}
                      />
                      <label 
                        htmlFor={badge} 
                        className="text-sm text-[#5D4037] cursor-pointer"
                      >
                        {badge}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-8 gap-4">
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filtros
                </Button>
                
                <div className="flex items-center gap-2">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm text-[#5D4037]">
                  {filteredAndSortedProducts.length} produtos encontrados
                </span>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Ordenar por" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="popularity">Popularidade</SelectItem>
                    <SelectItem value="name-asc">Nome A-Z</SelectItem>
                    <SelectItem value="name-desc">Nome Z-A</SelectItem>
                    <SelectItem value="price-asc">Preço: Menor-Maior</SelectItem>
                    <SelectItem value="price-desc">Preço: Maior-Menor</SelectItem>
                    <SelectItem value="newest">Mais Recentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Products Grid/List */}
            {paginatedProducts.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 bg-[#F5F5F5] rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-[#5D4037]" />
                </div>
                <h3 className="text-xl font-semibold text-[#3E2723] mb-2">
                  Nenhum produto encontrado
                </h3>
                <p className="text-[#5D4037] mb-6">
                  Tente ajustar os filtros para encontrar o que você procura.
                </p>
                <Button onClick={clearFilters} variant="outline">
                  Limpar Filtros
                </Button>
              </div>
            ) : (
              <>
                <div className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
                    : 'space-y-4'
                }>
                  {paginatedProducts.map((product) => (
                    <div
                      key={product.id}
                      className={`
                        bg-white border border-[#D7CCC8] rounded-lg overflow-hidden 
                        hover:shadow-lg transition-all duration-300 group
                        ${viewMode === 'list' ? 'flex items-center p-4' : 'p-4'}
                      `}
                    >
                      <div className={viewMode === 'list' ? 'w-24 h-24 flex-shrink-0 mr-4' : 'relative mb-4'}>
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={viewMode === 'list' ? 96 : 300}
                          height={viewMode === 'list' ? 96 : 300}
                          className={`
                            object-contain transition-transform duration-300 group-hover:scale-105
                            ${viewMode === 'list' ? 'w-full h-full' : 'w-full h-48'}
                          `}
                        />
                        
                        {viewMode === 'grid' && (
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="bg-white/80 hover:bg-white"
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>

                      <div className={viewMode === 'list' ? 'flex-1' : ''}>
                        {/* Badges */}
                        {product.badges.length > 0 && (
                          <div className="flex flex-wrap gap-1 mb-2">
                            {product.badges.map((badge) => (
                              <Badge
                                key={badge}
                                variant="outline"
                                className={`text-xs ${badgeColors[badge as keyof typeof badgeColors]}`}
                              >
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        )}

                        <h3 className="font-semibold text-[#3E2723] mb-2 group-hover:text-[#7B2D5F] transition-colors">
                          <Link href={`/products/${product.id}`}>
                            {product.name}
                          </Link>
                        </h3>

                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-2">
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < Math.floor(product.rating)
                                    ? 'text-[#D4AF37] fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <span className="text-sm text-[#5D4037]">
                            ({product.reviewCount})
                          </span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-semibold text-[#3E2723]">
                            A partir de R$ {product.price.toFixed(2)}
                          </div>
                          
                          <Button
                            size="sm"
                            onClick={() => handleAddToCart(product.name)}
                            className="bg-[#3E2723] hover:bg-[#5D4037] text-white opacity-0 group-hover:opacity-100 transition-all duration-300"
                          >
                            <ShoppingCart className="w-4 h-4 mr-1" />
                            Adicionar
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 mt-12">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    
                    {[...Array(totalPages)].map((_, i) => {
                      const page = i + 1;
                      const isCurrentPage = page === currentPage;
                      
                      return (
                        <Button
                          key={page}
                          variant={isCurrentPage ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className={isCurrentPage ? 'bg-[#7B2D5F] hover:bg-[#8B3A6B]' : ''}
                        >
                          {page}
                        </Button>
                      );
                    })}
                    
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}