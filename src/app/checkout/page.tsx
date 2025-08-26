"use client";

import React, { useState, useCallback } from 'react';
import { ChevronRight, ChevronLeft, CreditCard, Truck, Shield, Lock, MapPin, User, Mail, Phone, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Separator } from '@/components/ui/separator';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
  badges?: string[];
}

interface FormData {
  email: string;
  phone: string;
  newsletter: boolean;
  fullName: string;
  cep: string;
  street: string;
  number: string;
  complement: string;
  neighborhood: string;
  city: string;
  state: string;
  instructions: string;
  shipping: string;
  payment: string;
  cardNumber: string;
  cardName: string;
  cardExpiry: string;
  cardCvv: string;
  cpf: string;
}

const SAMPLE_CART: CartItem[] = [
  {
    id: '1',
    name: 'Xarope de Baunilha',
    image: 'https://monin.us/cdn/shop/files/750mL-Vanilla.png?v=1724939521&width=533',
    price: 47.90,
    quantity: 2,
    badges: ['POPULAR']
  },
  {
    id: '2',
    name: 'Xarope de Lavanda',
    image: 'https://monin.us/cdn/shop/files/750mL-Lavender.png?v=1724876415&width=533',
    price: 47.90,
    quantity: 1,
    badges: ['NATURAL']
  },
  {
    id: '3',
    name: 'Bomba para Frasco de Vidro 750mL',
    image: 'https://monin.us/cdn/shop/files/750_ml_glass_bottle_pumps_1.jpg?v=1712093035&width=533',
    price: 15.60,
    quantity: 2
  }
];

const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
];

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [cepLoading, setCepLoading] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
    newsletter: false,
    fullName: '',
    cep: '',
    street: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: '',
    instructions: '',
    shipping: '',
    payment: '',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
    cpf: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const subtotal = SAMPLE_CART.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal >= 200 ? 0 : 15.90;
  const taxes = subtotal * 0.08; // ICMS aproximado
  const total = subtotal + shipping + taxes;

  const handleInputChange = useCallback((field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  }, [errors]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone: string) => {
    const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
    return phoneRegex.test(phone);
  };

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{4,5})(\d{4})/, '($1) $2-$3');
    }
    return value;
  };

  const formatCep = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{5})(\d{3})/, '$1-$2').slice(0, 9);
  };

  const formatCardNumber = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{4})(?=\d)/g, '$1 ').slice(0, 19);
  };

  const formatCardExpiry = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    return numbers.replace(/(\d{2})(\d{2})/, '$1/$2').slice(0, 5);
  };

  const simulateCepLookup = useCallback(async (cep: string) => {
    if (cep.length === 9) {
      setCepLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Simulando dados do CEP
      setFormData(prev => ({
        ...prev,
        street: 'Rua das Flores',
        neighborhood: 'Centro',
        city: 'São Paulo',
        state: 'SP'
      }));
      setCepLoading(false);
    }
  }, []);

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.email) newErrors.email = 'Email é obrigatório';
      else if (!validateEmail(formData.email)) newErrors.email = 'Email inválido';
      
      if (!formData.phone) newErrors.phone = 'Telefone é obrigatório';
      else if (!validatePhone(formData.phone)) newErrors.phone = 'Telefone inválido';
    }

    if (step === 2) {
      if (!formData.fullName) newErrors.fullName = 'Nome completo é obrigatório';
      if (!formData.cep) newErrors.cep = 'CEP é obrigatório';
      if (!formData.street) newErrors.street = 'Endereço é obrigatório';
      if (!formData.number) newErrors.number = 'Número é obrigatório';
      if (!formData.neighborhood) newErrors.neighborhood = 'Bairro é obrigatório';
      if (!formData.city) newErrors.city = 'Cidade é obrigatória';
      if (!formData.state) newErrors.state = 'Estado é obrigatório';
    }

    if (step === 3) {
      if (!formData.shipping) newErrors.shipping = 'Selecione uma opção de entrega';
    }

    if (step === 4) {
      if (!formData.payment) newErrors.payment = 'Selecione uma forma de pagamento';
      
      if (formData.payment === 'card') {
        if (!formData.cardNumber) newErrors.cardNumber = 'Número do cartão é obrigatório';
        if (!formData.cardName) newErrors.cardName = 'Nome no cartão é obrigatório';
        if (!formData.cardExpiry) newErrors.cardExpiry = 'Validade é obrigatória';
        if (!formData.cardCvv) newErrors.cardCvv = 'CVV é obrigatório';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (validateStep(4)) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 2000));
      // Aqui seria enviado para o backend
      console.log('Pedido finalizado:', formData);
      setIsLoading(false);
    }
  };

  const applyCoupon = () => {
    // Simulação de aplicação de cupom
    console.log('Aplicando cupom:', couponCode);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-6 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Início</span>
            <ChevronRight className="w-4 h-4" />
            <span>Carrinho</span>
            <ChevronRight className="w-4 h-4" />
            <span className="text-[#7B2D5F] font-medium">Checkout</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Form Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Indicator */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-6">
                  {[1, 2, 3, 4].map((step) => (
                    <div key={step} className="flex items-center">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium ${
                        currentStep >= step ? 'bg-[#7B2D5F] text-white' : 'bg-gray-200 text-gray-600'
                      }`}>
                        {step}
                      </div>
                      {step < 4 && (
                        <div className={`w-16 h-1 mx-2 ${
                          currentStep > step ? 'bg-[#7B2D5F]' : 'bg-gray-200'
                        }`} />
                      )}
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-4 gap-4 text-sm text-center">
                  <span className={currentStep >= 1 ? 'text-[#7B2D5F] font-medium' : 'text-gray-600'}>
                    Contato
                  </span>
                  <span className={currentStep >= 2 ? 'text-[#7B2D5F] font-medium' : 'text-gray-600'}>
                    Endereço
                  </span>
                  <span className={currentStep >= 3 ? 'text-[#7B2D5F] font-medium' : 'text-gray-600'}>
                    Entrega
                  </span>
                  <span className={currentStep >= 4 ? 'text-[#7B2D5F] font-medium' : 'text-gray-600'}>
                    Pagamento
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Informações de Contato
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className={errors.email ? 'border-red-500' : ''}
                      placeholder="seu@email.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phone">Telefone *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', formatPhone(e.target.value))}
                      className={errors.phone ? 'border-red-500' : ''}
                      placeholder="(11) 99999-9999"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="newsletter"
                      checked={formData.newsletter}
                      onCheckedChange={(checked) => handleInputChange('newsletter', checked as boolean)}
                    />
                    <Label htmlFor="newsletter" className="text-sm">
                      Quero receber ofertas exclusivas e novidades por email
                    </Label>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 2: Shipping Address */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Endereço de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="fullName">Nome Completo *</Label>
                    <Input
                      id="fullName"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                      className={errors.fullName ? 'border-red-500' : ''}
                      placeholder="Seu nome completo"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>

                  <div>
                    <Label htmlFor="cep">CEP *</Label>
                    <div className="relative">
                      <Input
                        id="cep"
                        value={formData.cep}
                        onChange={(e) => {
                          const formatted = formatCep(e.target.value);
                          handleInputChange('cep', formatted);
                          simulateCepLookup(formatted);
                        }}
                        className={errors.cep ? 'border-red-500' : ''}
                        placeholder="00000-000"
                      />
                      {cepLoading && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-2 border-[#7B2D5F] border-t-transparent"></div>
                        </div>
                      )}
                    </div>
                    {errors.cep && <p className="text-red-500 text-sm mt-1">{errors.cep}</p>}
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-2">
                      <Label htmlFor="street">Endereço *</Label>
                      <Input
                        id="street"
                        value={formData.street}
                        onChange={(e) => handleInputChange('street', e.target.value)}
                        className={errors.street ? 'border-red-500' : ''}
                        placeholder="Rua, Avenida..."
                      />
                      {errors.street && <p className="text-red-500 text-sm mt-1">{errors.street}</p>}
                    </div>
                    <div>
                      <Label htmlFor="number">Número *</Label>
                      <Input
                        id="number"
                        value={formData.number}
                        onChange={(e) => handleInputChange('number', e.target.value)}
                        className={errors.number ? 'border-red-500' : ''}
                        placeholder="123"
                      />
                      {errors.number && <p className="text-red-500 text-sm mt-1">{errors.number}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="complement">Complemento</Label>
                    <Input
                      id="complement"
                      value={formData.complement}
                      onChange={(e) => handleInputChange('complement', e.target.value)}
                      placeholder="Apto, Bloco, Casa..."
                    />
                  </div>

                  <div>
                    <Label htmlFor="neighborhood">Bairro *</Label>
                    <Input
                      id="neighborhood"
                      value={formData.neighborhood}
                      onChange={(e) => handleInputChange('neighborhood', e.target.value)}
                      className={errors.neighborhood ? 'border-red-500' : ''}
                      placeholder="Seu bairro"
                    />
                    {errors.neighborhood && <p className="text-red-500 text-sm mt-1">{errors.neighborhood}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">Cidade *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange('city', e.target.value)}
                        className={errors.city ? 'border-red-500' : ''}
                        placeholder="Sua cidade"
                      />
                      {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                    </div>
                    <div>
                      <Label htmlFor="state">Estado *</Label>
                      <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                        <SelectTrigger className={errors.state ? 'border-red-500' : ''}>
                          <SelectValue placeholder="UF" />
                        </SelectTrigger>
                        <SelectContent>
                          {BRAZILIAN_STATES.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="instructions">Instruções de Entrega</Label>
                    <Input
                      id="instructions"
                      value={formData.instructions}
                      onChange={(e) => handleInputChange('instructions', e.target.value)}
                      placeholder="Observações para o entregador..."
                    />
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Step 3: Shipping Options */}
            {currentStep === 3 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Opções de Entrega
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <RadioGroup
                    value={formData.shipping}
                    onValueChange={(value) => handleInputChange('shipping', value)}
                    className="space-y-4"
                  >
                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="standard" id="standard" />
                        <Label htmlFor="standard">
                          <div className="font-medium">Entrega Padrão</div>
                          <div className="text-sm text-gray-600">5-7 dias úteis</div>
                        </Label>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">
                          {subtotal >= 200 ? (
                            <span className="text-green-600">Grátis</span>
                          ) : (
                            'R$ 15,90'
                          )}
                        </div>
                        {subtotal >= 200 && (
                          <div className="text-xs text-green-600">Frete grátis acima de R$ 200</div>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="express" id="express" />
                        <Label htmlFor="express">
                          <div className="font-medium">Entrega Expressa</div>
                          <div className="text-sm text-gray-600">2-3 dias úteis</div>
                        </Label>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">R$ 29,90</div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-3">
                        <RadioGroupItem value="same-day" id="same-day" />
                        <Label htmlFor="same-day">
                          <div className="font-medium">Entrega no Mesmo Dia</div>
                          <div className="text-sm text-gray-600">Até 18h (apenas capitais)</div>
                        </Label>
                      </div>
                      <div className="text-right">
                        <div className="font-medium">R$ 49,90</div>
                      </div>
                    </div>
                  </RadioGroup>
                  {errors.shipping && <p className="text-red-500 text-sm mt-2">{errors.shipping}</p>}
                </CardContent>
              </Card>
            )}

            {/* Step 4: Payment Methods */}
            {currentStep === 4 && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Forma de Pagamento
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <RadioGroup
                    value={formData.payment}
                    onValueChange={(value) => handleInputChange('payment', value)}
                    className="space-y-4"
                  >
                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex items-center gap-2">
                        <CreditCard className="w-4 h-4" />
                        Cartão de Crédito/Débito
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="pix" id="pix" />
                      <Label htmlFor="pix" className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-[#7B2D5F] rounded"></div>
                        PIX (5% de desconto)
                      </Label>
                    </div>

                    <div className="flex items-center space-x-3 p-4 border rounded-lg">
                      <RadioGroupItem value="boleto" id="boleto" />
                      <Label htmlFor="boleto" className="flex items-center gap-2">
                        <div className="w-4 h-4 bg-orange-500 rounded"></div>
                        Boleto Bancário
                      </Label>
                    </div>
                  </RadioGroup>

                  {errors.payment && <p className="text-red-500 text-sm">{errors.payment}</p>}

                  {formData.payment === 'card' && (
                    <div className="space-y-4 mt-6 p-4 bg-gray-50 rounded-lg">
                      <div>
                        <Label htmlFor="cardNumber">Número do Cartão *</Label>
                        <Input
                          id="cardNumber"
                          value={formData.cardNumber}
                          onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e.target.value))}
                          className={errors.cardNumber ? 'border-red-500' : ''}
                          placeholder="0000 0000 0000 0000"
                          maxLength={19}
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>

                      <div>
                        <Label htmlFor="cardName">Nome no Cartão *</Label>
                        <Input
                          id="cardName"
                          value={formData.cardName}
                          onChange={(e) => handleInputChange('cardName', e.target.value.toUpperCase())}
                          className={errors.cardName ? 'border-red-500' : ''}
                          placeholder="NOME COMO NO CARTÃO"
                        />
                        {errors.cardName && <p className="text-red-500 text-sm mt-1">{errors.cardName}</p>}
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="cardExpiry">Validade *</Label>
                          <Input
                            id="cardExpiry"
                            value={formData.cardExpiry}
                            onChange={(e) => handleInputChange('cardExpiry', formatCardExpiry(e.target.value))}
                            className={errors.cardExpiry ? 'border-red-500' : ''}
                            placeholder="MM/AA"
                            maxLength={5}
                          />
                          {errors.cardExpiry && <p className="text-red-500 text-sm mt-1">{errors.cardExpiry}</p>}
                        </div>
                        <div>
                          <Label htmlFor="cardCvv">CVV *</Label>
                          <Input
                            id="cardCvv"
                            value={formData.cardCvv}
                            onChange={(e) => handleInputChange('cardCvv', e.target.value.replace(/\D/g, ''))}
                            className={errors.cardCvv ? 'border-red-500' : ''}
                            placeholder="123"
                            maxLength={4}
                          />
                          {errors.cardCvv && <p className="text-red-500 text-sm mt-1">{errors.cardCvv}</p>}
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="cpf">CPF</Label>
                        <Input
                          id="cpf"
                          value={formData.cpf}
                          onChange={(e) => handleInputChange('cpf', e.target.value)}
                          placeholder="000.000.000-00"
                        />
                      </div>
                    </div>
                  )}

                  {formData.payment === 'pix' && (
                    <div className="p-4 bg-green-50 rounded-lg border border-green-200">
                      <p className="text-green-800 font-medium">PIX - Pagamento instantâneo</p>
                      <p className="text-sm text-green-700 mt-1">
                        Após finalizar o pedido, você receberá o código PIX por email para efetuar o pagamento.
                        O pedido será processado imediatamente após a confirmação.
                      </p>
                    </div>
                  )}

                  {formData.payment === 'boleto' && (
                    <div className="p-4 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-orange-800 font-medium">Boleto Bancário</p>
                      <p className="text-sm text-orange-700 mt-1">
                        O boleto será enviado por email após finalizar o pedido. 
                        Prazo de vencimento: 3 dias úteis.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between">
              <Button
                variant="outline"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="flex items-center gap-2"
              >
                <ChevronLeft className="w-4 h-4" />
                Voltar
              </Button>

              {currentStep < 4 ? (
                <Button onClick={nextStep} className="flex items-center gap-2">
                  Continuar
                  <ChevronRight className="w-4 h-4" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="flex items-center gap-2 bg-[#7B2D5F] hover:bg-[#6B2550]"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                      Processando...
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      Finalizar Pedido
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pedido</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SAMPLE_CART.map((item) => (
                  <div key={item.id} className="flex items-center space-x-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-sm">{item.name}</h4>
                      <div className="flex items-center gap-2 mt-1">
                        {item.badges?.map((badge) => (
                          <span key={badge} className="text-xs bg-[#D4AF37] text-white px-2 py-1 rounded">
                            {badge}
                          </span>
                        ))}
                      </div>
                      <p className="text-sm text-gray-600">Qtd: {item.quantity}</p>
                    </div>
                    <span className="font-medium">
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <Separator />

                <div className="flex items-center space-x-2">
                  <Input
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Código do cupom"
                    className="flex-1"
                  />
                  <Button variant="outline" onClick={applyCoupon} size="sm">
                    Aplicar
                  </Button>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>R$ {subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frete</span>
                    <span className={shipping === 0 ? 'text-green-600' : ''}>
                      {shipping === 0 ? 'Grátis' : `R$ ${shipping.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Impostos</span>
                    <span>R$ {taxes.toFixed(2)}</span>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-between font-bold text-lg">
                  <span>Total</span>
                  <span>R$ {total.toFixed(2)}</span>
                </div>

                {subtotal >= 200 && (
                  <div className="text-green-600 text-sm text-center">
                    🎉 Você ganhou frete grátis!
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Security Badges */}
            <Card>
              <CardContent className="p-4">
                <div className="text-center space-y-3">
                  <div className="flex items-center justify-center gap-2">
                    <Shield className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium">Checkout Seguro</span>
                  </div>
                  <div className="flex items-center justify-center gap-4 text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Lock className="w-3 h-3" />
                      SSL
                    </div>
                    <span>•</span>
                    <span>256-bit</span>
                    <span>•</span>
                    <span>Criptografado</span>
                  </div>
                  <p className="text-xs text-gray-600">
                    Seus dados estão protegidos com criptografia de nível bancário
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}