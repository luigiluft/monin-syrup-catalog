"use client";

import React, { useState, useCallback } from 'react';
import Link from 'next/link';
import { Minus, Plus, Trash2, ShoppingBag, ArrowRight, Tag, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface CartItem {
  id: string;
  name: string;
  image: string;
  flavor: string;
  size: string;
  price: number;
  quantity: number;
  originalPrice?: number;
}

interface CartTotals {
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

const initialCartItems: CartItem[] = [
  {
    id: '1',
    name: 'Xarope de Baunilha',
    image: 'https://monin.us/cdn/shop/files/750mL-Vanilla.png?v=1724939521&width=533',
    flavor: 'Baunilha',
    size: '750ml',
    price: 47.90,
    quantity: 2,
  },
  {
    id: '2',
    name: 'Molho de Caramelo',
    image: 'https://monin.us/cdn/shop/files/64_12-oz-caramel-sauce-group-rev-5_16-new-pump-22.webp',
    flavor: 'Caramelo',
    size: '64oz',
    price: 52.00,
    quantity: 1,
  },
  {
    id: '3',
    name: 'Bomba para Frasco de Vidro',
    image: 'https://monin.us/cdn/shop/files/750_ml_glass_bottle_pumps_1.jpg?v=1712093035&width=533',
    flavor: 'Acessório',
    size: '750ml',
    price: 15.60,
    quantity: 1,
  },
];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

export default function ShoppingCartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [isLoadingCoupon, setIsLoadingCoupon] = useState(false);
  const [notification, setNotification] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const updateQuantity = useCallback((id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
    
    setNotification({ type: 'success', message: 'Quantidade atualizada com sucesso!' });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const removeItem = useCallback((id: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    setNotification({ type: 'success', message: 'Item removido do carrinho!' });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const saveForLater = useCallback((id: string) => {
    // In a real app, this would move the item to a saved list
    setNotification({ type: 'success', message: 'Item salvo para depois!' });
    setTimeout(() => setNotification(null), 3000);
  }, []);

  const applyCoupon = useCallback(() => {
    if (!couponCode.trim()) return;
    
    setIsLoadingCoupon(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoadingCoupon(false);
      if (couponCode.toUpperCase() === 'MONIN10') {
        setNotification({ type: 'success', message: 'Cupom aplicado com sucesso! 10% de desconto' });
      } else {
        setNotification({ type: 'error', message: 'Cupom inválido ou expirado' });
      }
      setTimeout(() => setNotification(null), 3000);
    }, 1500);
  }, [couponCode]);

  const calculateTotals = useCallback((): CartTotals => {
    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal >= 200 ? 0 : 15;
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + shipping + tax;

    return { subtotal, shipping, tax, total };
  }, [cartItems]);

  const totals = calculateTotals();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <nav className="text-sm text-gray-600 mb-8">
            <Link href="/" className="hover:text-primary">Início</Link>
            <span className="mx-2">/</span>
            <span className="text-monin-brown-dark">Carrinho</span>
          </nav>

          {/* Empty Cart State */}
          <div className="max-w-2xl mx-auto text-center">
            <Card className="p-12">
              <CardContent className="space-y-6">
                <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-12 h-12 text-gray-400" />
                </div>
                
                <div>
                  <h1 className="text-3xl font-bold text-monin-brown-dark mb-4">
                    Seu carrinho está vazio
                  </h1>
                  <p className="text-lg text-gray-600 mb-8">
                    Descubra nossos sabores únicos e transforme suas bebidas em experiências extraordinárias.
                  </p>
                </div>

                <div className="space-y-4">
                  <Button 
                    asChild 
                    className="w-full bg-monin-brown-dark hover:bg-monin-brown-medium text-white rounded-full py-3 text-lg"
                  >
                    <Link href="/produtos">
                      Descobrir Produtos
                      <ArrowRight className="ml-2 w-5 h-5" />
                    </Link>
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    asChild 
                    className="w-full border-2 border-monin-brown-dark text-monin-brown-dark hover:bg-monin-brown-dark hover:text-white rounded-full py-3"
                  >
                    <Link href="/categorias">Ver Categorias</Link>
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto bg-monin-primary-purple/10 rounded-full flex items-center justify-center mb-3">
                      <ShoppingBag className="w-6 h-6 text-monin-primary-purple" />
                    </div>
                    <h3 className="font-semibold text-monin-brown-dark">Xaropes Premium</h3>
                    <p className="text-sm text-gray-600">Sabores únicos e autênticos</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto bg-monin-warm-gold/10 rounded-full flex items-center justify-center mb-3">
                      <Heart className="w-6 h-6 text-monin-warm-gold" />
                    </div>
                    <h3 className="font-semibold text-monin-brown-dark">Receitas Exclusivas</h3>
                    <p className="text-sm text-gray-600">Inspiração para criar</p>
                  </div>
                  
                  <div className="text-center p-4">
                    <div className="w-12 h-12 mx-auto bg-monin-orange-start/10 rounded-full flex items-center justify-center mb-3">
                      <Tag className="w-6 h-6 text-monin-orange-start" />
                    </div>
                    <h3 className="font-semibold text-monin-brown-dark">Ofertas Especiais</h3>
                    <p className="text-sm text-gray-600">Descontos exclusivos</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Notification */}
        {notification && (
          <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 ${
            notification.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
          }`}>
            {notification.message}
          </div>
        )}

        {/* Breadcrumb */}
        <nav className="text-sm text-gray-600 mb-8">
          <Link href="/" className="hover:text-primary transition-colors">Início</Link>
          <span className="mx-2">/</span>
          <span className="text-monin-brown-dark">Carrinho</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <Card className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h1 className="text-2xl font-bold text-monin-brown-dark">
                    Meu Carrinho ({cartItems.length} {cartItems.length === 1 ? 'item' : 'itens'})
                  </h1>
                </div>

                <div className="space-y-6">
                  {cartItems.map((item, index) => (
                    <div 
                      key={item.id}
                      className={`flex flex-col md:flex-row gap-4 pb-6 ${
                        index < cartItems.length - 1 ? 'border-b border-gray-200' : ''
                      } transition-all duration-300`}
                    >
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-lg bg-gray-100"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 space-y-3">
                        <div>
                          <h3 className="font-semibold text-lg text-monin-brown-dark">
                            {item.name}
                          </h3>
                          <p className="text-gray-600">
                            {item.flavor} • {item.size}
                          </p>
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <span className="text-sm text-gray-600">Quantidade:</span>
                            <div className="flex items-center border border-gray-300 rounded-full overflow-hidden">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                                className="p-2 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                aria-label="Diminuir quantidade"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 font-medium min-w-[3rem] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-100 transition-colors"
                                aria-label="Aumentar quantidade"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          {/* Price */}
                          <div className="text-right">
                            <p className="text-lg font-bold text-monin-brown-dark">
                              {formatCurrency(item.price * item.quantity)}
                            </p>
                            <p className="text-sm text-gray-600">
                              {formatCurrency(item.price)} cada
                            </p>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex space-x-4 text-sm">
                          <button
                            onClick={() => saveForLater(item.id)}
                            className="text-monin-primary-purple hover:underline transition-colors"
                          >
                            Salvar para depois
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:underline transition-colors flex items-center"
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Remover
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Continue Shopping */}
            <div className="mt-6">
              <Button 
                variant="outline" 
                asChild 
                className="border-2 border-monin-brown-dark text-monin-brown-dark hover:bg-monin-brown-dark hover:text-white rounded-full"
              >
                <Link href="/produtos">
                  ← Continuar Comprando
                </Link>
              </Button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Coupon Code */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-monin-brown-dark mb-4">
                  Cupom de Desconto
                </h3>
                <div className="space-y-3">
                  <Input
                    type="text"
                    placeholder="Digite seu cupom"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="rounded-lg"
                  />
                  <Button
                    onClick={applyCoupon}
                    disabled={isLoadingCoupon || !couponCode.trim()}
                    className="w-full bg-monin-primary-purple hover:bg-monin-secondary-purple text-white rounded-full"
                  >
                    {isLoadingCoupon ? 'Aplicando...' : 'Aplicar Cupom'}
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Order Summary */}
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold text-monin-brown-dark mb-4">
                  Resumo do Pedido
                </h3>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">{formatCurrency(totals.subtotal)}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Frete</span>
                    <span className="font-medium">
                      {totals.shipping === 0 ? (
                        <span className="text-green-600">Grátis</span>
                      ) : (
                        formatCurrency(totals.shipping)
                      )}
                    </span>
                  </div>
                  
                  {totals.shipping === 0 && (
                    <p className="text-sm text-green-600">
                      🎉 Frete grátis em compras acima de R$ 200!
                    </p>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Impostos</span>
                    <span className="font-medium">{formatCurrency(totals.tax)}</span>
                  </div>
                  
                  <hr className="border-gray-200" />
                  
                  <div className="flex justify-between text-lg font-bold">
                    <span className="text-monin-brown-dark">Total</span>
                    <span className="text-monin-brown-dark">{formatCurrency(totals.total)}</span>
                  </div>
                </div>

                <Button
                  asChild
                  className="w-full mt-6 bg-gradient-to-r from-monin-orange-start to-monin-orange-end hover:opacity-90 text-white rounded-full py-3 text-lg font-semibold transition-all duration-200"
                >
                  <Link href="/checkout">
                    Finalizar Compra
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Link>
                </Button>

                <p className="text-xs text-gray-500 text-center mt-3">
                  Pagamento seguro e protegido
                </p>
              </CardContent>
            </Card>

            {/* Shipping Info */}
            <Card className="bg-monin-gray-light">
              <CardContent className="p-6">
                <h4 className="font-semibold text-monin-brown-dark mb-3">
                  Informações de Entrega
                </h4>
                <div className="space-y-2 text-sm text-gray-600">
                  <p>• Frete grátis em pedidos acima de R$ 200</p>
                  <p>• Entrega em 3-5 dias úteis</p>
                  <p>• Rastreamento incluído</p>
                  <p>• Embalagem sustentável</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}