"use client";

import { useState, useMemo } from "react";
import { Search, Filter, Grid, List, ChevronDown, Star, ShoppingCart, ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Category {
  id: string;
  name: string;
  productCount: number;
  image: string;
  description: string;
  badges: string[];
  popular?: boolean;
  new?: boolean;
  promotion?: boolean;
}

const categories: Category[] = [
  {
    id: "xaropes-saborizados",
    name: "Xaropes Saborizados",
    productCount: 125,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/750_ml_banana-19.png",
    description: "Nossa coleção mais ampla de sabores únicos",
    badges: ["POPULAR"],
    popular: true
  },
  {
    id: "sabores-sem-acucar",
    name: "Sabores Sem Açúcar",
    productCount: 48,
    image: "https://monin.us/cdn/shop/files/sugar-free-caramel-syrup-750ml_1.webp?v=1725575683&width=300",
    description: "Sabores deliciosos sem culpa",
    badges: ["NATURAL"],
    popular: true
  },
  {
    id: "molhos-gourmet",
    name: "Molhos Gourmet",
    productCount: 28,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/64_12-oz-caramel-sauce-group-rev-5_16-new-pump-22.webp",
    description: "Molhos cremosos para bebidas especiais",
    badges: ["GOURMET"]
  },
  {
    id: "adocantes-mixers",
    name: "Adoçantes & Mixers",
    productCount: 18,
    image: "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/Sweetener_Agave-23.webp",
    description: "Soluções naturais para adoçar",
    badges: ["NATURAL"]
  },
  {
    id: "energizantes",
    name: "Energizantes",
    productCount: 10,
    image: "https://monin.us/cdn/shop/files/1l_energy_boost.png?v=1723588159&width=300",
    description: "Energia natural para suas bebidas",
    badges: ["NOVO"],
    new: true
  },
  {
    id: "concentrados-cafe-cha",
    name: "Concentrados de Café e Chá",
    productCount: 15,
    image: "https://monin.us/cdn/shop/files/1l_iced_coffee_concentrate.webp?v=1725575852&width=300",
    description: "Bases concentradas premium",
    badges: ["PREMIUM"]
  },
  {
    id: "bases-bebidas-64oz",
    name: "Bases para Bebidas 64oz",
    productCount: 12,
    image: "https://monin.us/cdn/shop/files/neutral_base_4.png?v=1723588166&width=300",
    description: "Bases neutras para criatividade",
    badges: ["PROFISSIONAL"]
  },
  {
    id: "pures-smoothies",
    name: "Purês & Smoothies",
    productCount: 35,
    image: "https://monin.us/cdn/shop/files/monin-peach-fruit-puree.webp?v=1725575966&width=300",
    description: "Purês de frutas autênticas",
    badges: ["NATURAL", "POPULAR"],
    popular: true,
    promotion: true
  }
];

const filterOptions = [
  { value: "todos", label: "Todas as Categorias" },
  { value: "populares", label: "Mais Populares" },
  { value: "novos", label: "Novos Lançamentos" },
  { value: "promocao", label: "Em Promoção" },
  { value: "natural", label: "Naturais" },
  { value: "premium", label: "Premium" }
];

const sortOptions = [
  { value: "popularidade", label: "Por Popularidade" },
  { value: "nome-az", label: "Nome A-Z" },
  { value: "nome-za", label: "Nome Z-A" },
  { value: "produtos-mais", label: "Mais Produtos" },
  { value: "produtos-menos", label: "Menos Produtos" },
  { value: "novos", label: "Mais Recentes" }
];

export default function CollectionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("todos");
  const [selectedSort, setSelectedSort] = useState("popularidade");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const filteredAndSortedCategories = useMemo(() => {
    let filtered = categories.filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          category.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesFilter = selectedFilter === "todos" || 
                          (selectedFilter === "populares" && category.popular) ||
                          (selectedFilter === "novos" && category.new) ||
                          (selectedFilter === "promocao" && category.promotion) ||
                          (selectedFilter === "natural" && category.badges.includes("NATURAL")) ||
                          (selectedFilter === "premium" && category.badges.includes("PREMIUM"));
      
      return matchesSearch && matchesFilter;
    });

    // Sort categories
    filtered.sort((a, b) => {
      switch (selectedSort) {
        case "nome-az":
          return a.name.localeCompare(b.name);
        case "nome-za":
          return b.name.localeCompare(a.name);
        case "produtos-mais":
          return b.productCount - a.productCount;
        case "produtos-menos":
          return a.productCount - b.productCount;
        case "novos":
          return (b.new ? 1 : 0) - (a.new ? 1 : 0);
        case "popularidade":
        default:
          return (b.popular ? 1 : 0) - (a.popular ? 1 : 0);
      }
    });

    return filtered;
  }, [searchTerm, selectedFilter, selectedSort]);

  const totalPages = Math.ceil(filteredAndSortedCategories.length / itemsPerPage);
  const currentCategories = filteredAndSortedCategories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case "POPULAR":
        return "bg-[#7B2D5F] text-white";
      case "NOVO":
        return "bg-[#D4AF37] text-white";
      case "NATURAL":
        return "bg-green-600 text-white";
      case "PREMIUM":
        return "bg-[#3E2723] text-white";
      case "GOURMET":
        return "bg-amber-600 text-white";
      case "PROFISSIONAL":
        return "bg-blue-600 text-white";
      default:
        return "bg-gray-600 text-white";
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#D7CCC8]">
        <div className="container py-4">
          <nav className="flex items-center space-x-2 text-sm">
            <a href="/" className="text-[#5D4037] hover:text-[#7B2D5F] transition-colors">
              Início
            </a>
            <span className="text-[#D7CCC8]">/</span>
            <span className="text-[#3E2723] font-medium">Coleções</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-br from-[#7B2D5F] to-[#8B3A6B] text-white py-16">
        <div className="container text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Nossas Coleções
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Descubra nossa ampla variedade de produtos premium para criar bebidas excepcionais
          </p>
        </div>
      </div>

      <div className="container py-8">
        {/* Search and Filters */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#5D4037] w-5 h-5" />
              <Input
                type="text"
                placeholder="Buscar coleções..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-[#D7CCC8] focus:ring-[#7B2D5F] focus:border-[#7B2D5F]"
              />
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              {/* Filter */}
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-[#5D4037]" />
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-48 border-[#D7CCC8]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {filterOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Sort */}
              <Select value={selectedSort} onValueChange={setSelectedSort}>
                <SelectTrigger className="w-48 border-[#D7CCC8]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* View Mode */}
              <div className="flex bg-[#F5F5F5] rounded-lg p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={viewMode === "grid" ? "bg-[#7B2D5F] text-white" : "text-[#5D4037]"}
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={viewMode === "list" ? "bg-[#7B2D5F] text-white" : "text-[#5D4037]"}
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchTerm || selectedFilter !== "todos") && (
            <div className="mt-4 pt-4 border-t border-[#D7CCC8]">
              <div className="flex flex-wrap gap-2 items-center">
                <span className="text-sm text-[#5D4037]">Filtros ativos:</span>
                {searchTerm && (
                  <Badge variant="secondary" className="bg-[#D7CCC8] text-[#3E2723]">
                    Busca: "{searchTerm}"
                  </Badge>
                )}
                {selectedFilter !== "todos" && (
                  <Badge variant="secondary" className="bg-[#D7CCC8] text-[#3E2723]">
                    {filterOptions.find(opt => opt.value === selectedFilter)?.label}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-[#5D4037] text-lg">
            Exibindo <span className="font-bold text-[#3E2723]">{currentCategories.length}</span> de{" "}
            <span className="font-bold text-[#3E2723]">{filteredAndSortedCategories.length}</span> coleções
          </p>
        </div>

        {/* Category Grid/List */}
        <div className={`grid gap-6 mb-8 ${
          viewMode === "grid" 
            ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
            : "grid-cols-1"
        }`}>
          {currentCategories.map((category) => (
            <Card 
              key={category.id} 
              className={`group cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl border-[#D7CCC8] ${
                viewMode === "list" ? "flex-row" : ""
              }`}
            >
              <CardContent className={`p-0 ${viewMode === "list" ? "flex" : ""}`}>
                {/* Image */}
                <div className={`relative overflow-hidden ${
                  viewMode === "list" 
                    ? "w-48 h-48 flex-shrink-0" 
                    : "aspect-square"
                } bg-[#F5F5F5] rounded-t-2xl ${viewMode === "list" ? "rounded-l-2xl rounded-tr-none" : ""}`}>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                    {category.badges.map((badge) => (
                      <Badge 
                        key={badge} 
                        className={`text-xs font-medium ${getBadgeVariant(badge)}`}
                      >
                        {badge}
                      </Badge>
                    ))}
                  </div>

                  {/* Promotion Badge */}
                  {category.promotion && (
                    <div className="absolute top-3 right-3">
                      <Badge className="bg-red-600 text-white animate-pulse">
                        PROMOÇÃO
                      </Badge>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-bold text-lg text-[#3E2723] group-hover:text-[#7B2D5F] transition-colors">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-1 text-[#D4AF37]">
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                      <Star className="w-4 h-4 fill-current" />
                    </div>
                  </div>

                  <p className="text-[#5D4037] text-sm mb-4 line-clamp-2">
                    {category.description}
                  </p>

                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[#3E2723] font-medium">
                      {category.productCount}+ produtos
                    </span>
                    {category.popular && (
                      <Badge className="bg-[#7B2D5F] text-white text-xs">
                        ⭐ Popular
                      </Badge>
                    )}
                  </div>

                  <Button 
                    className="w-full bg-[#3E2723] hover:bg-[#5D4037] text-white rounded-full transition-all duration-300 group-hover:bg-[#7B2D5F]"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Ver Produtos
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {filteredAndSortedCategories.length === 0 && (
          <div className="text-center py-16">
            <div className="w-24 h-24 mx-auto mb-6 bg-[#F5F5F5] rounded-full flex items-center justify-center">
              <Search className="w-12 h-12 text-[#D7CCC8]" />
            </div>
            <h3 className="text-2xl font-bold text-[#3E2723] mb-4">
              Nenhuma coleção encontrada
            </h3>
            <p className="text-[#5D4037] mb-6 max-w-md mx-auto">
              Não encontramos coleções que correspondam aos seus filtros. Tente ajustar sua busca.
            </p>
            <Button 
              onClick={() => {
                setSearchTerm("");
                setSelectedFilter("todos");
              }}
              className="bg-[#7B2D5F] hover:bg-[#8B3A6B] text-white"
            >
              Limpar Filtros
            </Button>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-4 mt-8">
            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="border-[#D7CCC8]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Anterior
            </Button>

            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className={`w-10 h-10 ${
                    currentPage === page 
                      ? "bg-[#7B2D5F] text-white" 
                      : "border-[#D7CCC8] text-[#5D4037]"
                  }`}
                >
                  {page}
                </Button>
              ))}
            </div>

            <Button
              variant="outline"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="border-[#D7CCC8]"
            >
              Próxima
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        )}

        {/* Load More Alternative */}
        <div className="text-center mt-12">
          <Button 
            size="lg"
            className="bg-gradient-to-r from-[#F4A261] to-[#E76F51] hover:from-[#E76F51] hover:to-[#F4A261] text-white px-8 py-3 rounded-full text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300"
          >
            Explorar Todas as Coleções
          </Button>
        </div>
      </div>
    </div>
  );
}