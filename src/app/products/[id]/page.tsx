"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { Star, Heart, Share2, Plus, Minus, ShoppingCart, Loader2, ChevronLeft, ChevronRight, MapPin, Truck, Clock, Award, Users, MessageSquare, ThumbsUp, ThumbsDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

// Sample product data
const productData = {
  "xarope-baunilha": {
    id: "xarope-baunilha",
    name: "Xarope de Baunilha",
    slug: "xarope-baunilha",
    badges: ["NATURAL", "POPULAR"],
    rating: 4.8,
    reviewCount: 333,
    price: 47.90,
    originalPrice: 52.90,
    images: [
      "https://monin.us/cdn/shop/files/750mL-Vanilla.png?v=1724939521&width=800",
      "https://monin.us/cdn/shop/files/750mL-Vanilla.png?v=1724939521&width=800",
      "https://monin.us/cdn/shop/files/750mL-Vanilla.png?v=1724939521&width=800"
    ],
    description: "O Xarope de Baunilha MONIN oferece o sabor autêntico e cremoso da baunilha premium. Perfeito para lattes, cappuccinos, sobremesas e coquetéis, este xarope adiciona uma doçura natural e um aroma irresistível às suas bebidas favoritas.",
    features: [
      "Feito com extratos naturais de baunilha",
      "Sem conservantes artificiais",
      "Ideal para bebidas quentes e frias",
      "Certificação Kosher"
    ],
    sizes: [
      { size: "750ml", price: 47.90, inStock: true },
      { size: "1L", price: 62.90, inStock: true },
      { size: "250ml", price: 28.90, inStock: false }
    ],
    nutritionalInfo: {
      servingSize: "30ml (2 colheres de sopa)",
      calories: 80,
      totalFat: "0g",
      sodium: "5mg",
      totalCarbs: "20g",
      sugars: "19g",
      protein: "0g"
    },
    ingredients: [
      "Açúcar",
      "Água",
      "Aroma natural de baunilha",
      "Ácido cítrico",
      "Benzoato de sódio (conservante)"
    ],
    allergens: ["Pode conter traços de nozes"],
    storage: "Armazenar em local fresco e seco. Após aberto, refrigerar e consumir em até 3 meses.",
    origin: "França",
    shelfLife: "36 meses",
    category: "Xaropes Saborizados"
  },
  "xarope-caramelo": {
    id: "xarope-caramelo",
    name: "Xarope de Caramelo",
    slug: "xarope-caramelo",
    badges: ["NATURAL", "POPULAR"],
    rating: 4.9,
    reviewCount: 246,
    price: 47.90,
    images: [
      "https://monin.us/cdn/shop/files/750mL-Caramel.png?v=1724869846&width=800"
    ],
    description: "Desfrute do sabor rico e dourado do Xarope de Caramelo MONIN. Com seu perfil de sabor buttery e doce, é perfeito para criar lattes caramelados, frappés e sobremesas irresistíveis.",
    features: [
      "Sabor autêntico de caramelo",
      "Cor dourada natural",
      "Textura suave e cremosa",
      "Versátil para diversas aplicações"
    ],
    category: "Xaropes Saborizados"
  },
  "xarope-lavanda": {
    id: "xarope-lavanda",
    name: "Xarope de Lavanda",
    slug: "xarope-lavanda",
    badges: ["NATURAL", "POPULAR"],
    rating: 4.7,
    reviewCount: 346,
    price: 47.90,
    images: [
      "https://monin.us/cdn/shop/files/750mL-Lavender.png?v=1724876415&width=800"
    ],
    description: "O Xarope de Lavanda MONIN traz o aroma floral único da lavanda francesa para suas bebidas. Perfeito para criar lattes especiais, limonadas aromáticas e coquetéis sofisticados.",
    features: [
      "Lavanda francesa premium",
      "Aroma delicado e floral",
      "Sabor equilibrado e refinado",
      "Ideal para bebidas gourmet"
    ],
    category: "Xaropes Saborizados"
  }
};

const reviews = [
  {
    id: 1,
    name: "Maria Silva",
    rating: 5,
    date: "2024-01-15",
    title: "Excelente qualidade!",
    comment: "O sabor é incrível, bem natural e não enjoativo. Uso no meu café da manhã todos os dias.",
    helpful: 12,
    notHelpful: 1
  },
  {
    id: 2,
    name: "João Santos",
    rating: 4,
    date: "2024-01-10",
    title: "Muito bom",
    comment: "Produto de ótima qualidade, entrega rápida. Recomendo!",
    helpful: 8,
    notHelpful: 0
  },
  {
    id: 3,
    name: "Ana Costa",
    rating: 5,
    date: "2024-01-08",
    title: "Perfeito para lattes",
    comment: "Transformou completamente meus lattes caseiros. O sabor é autêntico e a qualidade é excepcional.",
    helpful: 15,
    notHelpful: 2
  }
];

const relatedProducts = [
  {
    id: "xarope-caramelo",
    name: "Xarope de Caramelo",
    image: "https://monin.us/cdn/shop/files/750mL-Caramel.png?v=1724869846&width=400",
    price: 47.90,
    rating: 4.9,
    badges: ["NATURAL", "POPULAR"]
  },
  {
    id: "xarope-lavanda", 
    name: "Xarope de Lavanda",
    image: "https://monin.us/cdn/shop/files/750mL-Lavender.png?v=1724876415&width=400",
    price: 47.90,
    rating: 4.7,
    badges: ["NATURAL", "POPULAR"]
  },
  {
    id: "bomba-frasco",
    name: "Bomba para Frasco de Vidro 750mL",
    image: "https://monin.us/cdn/shop/files/750_ml_glass_bottle_pumps_1.jpg?v=1712093035&width=400",
    price: 15.60,
    rating: 4.8,
    badges: []
  },
  {
    id: "xarope-chocolate",
    name: "Molho Gourmet Chocolate",
    image: "https://monin.us/cdn/shop/files/64_12-oz-chocolate-sauce-group-rev-5_16-new-pump_-_copy.png?v=1752765928&width=400",
    price: 52.90,
    rating: 4.6,
    badges: ["POPULAR"]
  }
];

const recipes = [
  {
    id: 1,
    title: "Vanilla Latte Clássico",
    image: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=400&h=300&fit=crop",
    description: "Um latte cremoso com o toque doce da baunilha MONIN.",
    difficulty: "Fácil",
    time: "5 min"
  },
  {
    id: 2,
    title: "Milkshake de Baunilha Premium",
    image: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop",
    description: "Milkshake cremoso e gelado perfeito para dias quentes.",
    difficulty: "Fácil",
    time: "3 min"
  },
  {
    id: 3,
    title: "Cocktail Vanilla Sunset",
    image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=400&h=300&fit=crop",
    description: "Coquetel sofisticado com baunilha e frutas cítricas.",
    difficulty: "Médio",
    time: "8 min"
  }
];

export default function ProductPage() {
  const params = useParams();
  const productId = params.id as string;
  const product = productData[productId as keyof typeof productData];

  const [selectedSize, setSelectedSize] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Produto não encontrado</h1>
          <Link href="/produtos" className="text-purple-600 hover:underline">
            Voltar para produtos
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsAddingToCart(false);
    toast.success('Produto adicionado ao carrinho!');
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity(prev => Math.max(1, prev + delta));
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copiado para a área de transferência!');
    }
  };

  const renderStars = (rating: number, size: string = 'w-4 h-4') => {
    return (
      <div className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${size} ${
              star <= rating
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const getBadgeVariant = (badge: string) => {
    switch (badge) {
      case 'NATURAL':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'POPULAR':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'NEW':
        return 'bg-orange-100 text-orange-800 border-orange-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="container py-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-purple-600">Home</Link>
          <span>/</span>
          <Link href="/produtos" className="hover:text-purple-600">Produtos</Link>
          <span>/</span>
          <span className="text-gray-900">{product.name}</span>
        </div>
      </div>

      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            <div 
              className="aspect-square bg-gray-50 rounded-lg overflow-hidden cursor-zoom-in relative"
              onClick={() => setIsZoomed(!isZoomed)}
            >
              <Image
                src={product.images[selectedImageIndex] || product.images[0]}
                alt={product.name}
                fill
                className={`object-contain transition-transform duration-300 ${
                  isZoomed ? 'scale-150' : 'scale-100'
                }`}
              />
              
              {/* Image Navigation */}
              {product.images.length > 1 && (
                <>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(prev => 
                        prev === 0 ? product.images.length - 1 : prev - 1
                      );
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 backdrop-blur-sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(prev => 
                        prev === product.images.length - 1 ? 0 : prev + 1
                      );
                    }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </>
              )}
            </div>
            
            {/* Thumbnail Images */}
            {product.images.length > 1 && (
              <div className="flex gap-2 overflow-x-auto">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                      selectedImageIndex === index
                        ? 'border-purple-600'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${index + 1}`}
                      width={80}
                      height={80}
                      className="w-full h-full object-contain"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              {product.badges.map((badge) => (
                <Badge key={badge} className={getBadgeVariant(badge)}>
                  {badge}
                </Badge>
              ))}
            </div>

            {/* Title & Rating */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">{product.name}</h1>
              <div className="flex items-center gap-3">
                {renderStars(product.rating, 'w-5 h-5')}
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviewCount} avaliações)</span>
              </div>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              <span className="text-sm text-gray-500">A partir de</span>
              <span className="text-3xl font-bold text-gray-900">
                R$ {product.price.toFixed(2).replace('.', ',')}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                </span>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed">{product.description}</p>

            {/* Features */}
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900">Características:</h3>
              <ul className="space-y-1">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Size Selection */}
            {product.sizes && (
              <div className="space-y-3">
                <h3 className="font-semibold text-gray-900">Tamanho:</h3>
                <div className="flex gap-2">
                  {product.sizes.map((sizeOption, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedSize(index)}
                      disabled={!sizeOption.inStock}
                      className={`px-4 py-2 rounded-lg border text-sm font-medium transition-colors ${
                        selectedSize === index
                          ? 'border-purple-600 bg-purple-50 text-purple-700'
                          : sizeOption.inStock
                          ? 'border-gray-200 hover:border-gray-300'
                          : 'border-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      {sizeOption.size}
                      {!sizeOption.inStock && (
                        <span className="block text-xs text-gray-400">Indisponível</span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity & Actions */}
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-lg">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="px-4 py-2 text-center min-w-[3rem]">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleQuantityChange(1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isAddingToCart}
                  className="flex-1 bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {isAddingToCart ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <ShoppingCart className="w-4 h-4 mr-2" />
                  )}
                  {isAddingToCart ? 'Adicionando...' : 'Adicionar ao Carrinho'}
                </Button>
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="flex-1"
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  {isFavorited ? 'Favoritado' : 'Favoritar'}
                </Button>
                <Button variant="outline" onClick={handleShare}>
                  <Share2 className="w-4 h-4 mr-2" />
                  Compartilhar
                </Button>
              </div>
            </div>

            {/* Delivery Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Truck className="w-4 h-4 text-green-600" />
                <span>Frete grátis para pedidos acima de R$ 150,00</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="w-4 h-4 text-blue-600" />
                <span>Entrega em todo o Brasil</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>Prazo de entrega: 3-7 dias úteis</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <Tabs defaultValue="specs" className="mb-16">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="specs">Especificações</TabsTrigger>
            <TabsTrigger value="ingredients">Ingredientes</TabsTrigger>
            <TabsTrigger value="reviews">Avaliações ({product.reviewCount})</TabsTrigger>
            <TabsTrigger value="recipes">Receitas</TabsTrigger>
          </TabsList>

          <TabsContent value="specs" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Informações Nutricionais</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Porção:</span>
                        <span className="font-medium">{product.nutritionalInfo?.servingSize}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Calorias:</span>
                        <span className="font-medium">{product.nutritionalInfo?.calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gordura Total:</span>
                        <span className="font-medium">{product.nutritionalInfo?.totalFat}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sódio:</span>
                        <span className="font-medium">{product.nutritionalInfo?.sodium}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Carboidratos:</span>
                        <span className="font-medium">{product.nutritionalInfo?.totalCarbs}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Açúcares:</span>
                        <span className="font-medium">{product.nutritionalInfo?.sugars}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Proteína:</span>
                        <span className="font-medium">{product.nutritionalInfo?.protein}</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Informações Gerais</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Categoria:</span>
                        <span className="font-medium">{product.category}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Origem:</span>
                        <span className="font-medium">{product.origin}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Validade:</span>
                        <span className="font-medium">{product.shelfLife}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Armazenamento:</span>
                        <span className="font-medium text-right max-w-xs">{product.storage}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ingredients" className="mt-8">
            <Card>
              <CardContent className="p-6">
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="font-semibold text-lg mb-4">Lista de Ingredientes</h3>
                    <ul className="space-y-2">
                      {product.ingredients?.map((ingredient, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm">
                          <div className="w-1.5 h-1.5 bg-purple-600 rounded-full flex-shrink-0" />
                          {ingredient}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h3 className="font-semibold text-lg mb-4">Informações Importantes</h3>
                    <div className="space-y-4">
                      <div>
                        <h4 className="font-medium mb-2">Alérgenos:</h4>
                        <ul className="space-y-1">
                          {product.allergens?.map((allergen, index) => (
                            <li key={index} className="text-sm text-orange-600 flex items-center gap-2">
                              <Award className="w-4 h-4" />
                              {allergen}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reviews" className="mt-8">
            <div className="space-y-8">
              {/* Rating Overview */}
              <Card>
                <CardContent className="p-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-gray-900 mb-2">
                        {product.rating}
                      </div>
                      {renderStars(product.rating, 'w-6 h-6')}
                      <p className="text-sm text-gray-500 mt-2">
                        Baseado em {product.reviewCount} avaliações
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      {[5, 4, 3, 2, 1].map((stars) => (
                        <div key={stars} className="flex items-center gap-3 text-sm">
                          <span className="w-8">{stars}★</span>
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-yellow-400 h-2 rounded-full"
                              style={{ 
                                width: `${Math.random() * 100}%` // Simulated data
                              }}
                            />
                          </div>
                          <span className="w-8 text-gray-500">
                            {Math.floor(Math.random() * 50)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Individual Reviews */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold">Avaliações dos Clientes</h3>
                  <Button variant="outline">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Escrever Avaliação
                  </Button>
                </div>

                {reviews.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-1">
                            <h4 className="font-medium">{review.name}</h4>
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-sm text-gray-500">{review.date}</p>
                        </div>
                      </div>
                      
                      <h5 className="font-medium mb-2">{review.title}</h5>
                      <p className="text-gray-600 mb-4">{review.comment}</p>
                      
                      <div className="flex items-center gap-4">
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsUp className="w-4 h-4" />
                          Útil ({review.helpful})
                        </button>
                        <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700">
                          <ThumbsDown className="w-4 h-4" />
                          ({review.notHelpful})
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="recipes" className="mt-8">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold">Receitas Sugeridas</h3>
                <Button variant="outline">Ver Todas as Receitas</Button>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                  <Card key={recipe.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video relative">
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{recipe.title}</h4>
                      <p className="text-sm text-gray-600 mb-3">{recipe.description}</p>
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>{recipe.difficulty}</span>
                        <span>{recipe.time}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Related Products */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-8">Você também pode gostar</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <Link key={relatedProduct.id} href={`/produto/${relatedProduct.id}`}>
                <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:scale-105">
                  <div className="aspect-square bg-gray-50 relative">
                    <Image
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      fill
                      className="object-contain p-4"
                    />
                    {relatedProduct.badges.length > 0 && (
                      <div className="absolute top-2 left-2 flex flex-col gap-1">
                        {relatedProduct.badges.map((badge) => (
                          <Badge key={badge} className={`${getBadgeVariant(badge)} text-xs`}>
                            {badge}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-medium text-sm mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                      {renderStars(relatedProduct.rating)}
                      <span className="text-xs text-gray-500">({relatedProduct.rating})</span>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-xs text-gray-500">A partir de</span>
                      <span className="font-bold text-gray-900">
                        R$ {relatedProduct.price.toFixed(2).replace('.', ',')}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}