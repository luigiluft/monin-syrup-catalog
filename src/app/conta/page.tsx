"use client";

import React, { useState, useCallback, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { toast } from 'sonner';
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Eye, 
  EyeOff, 
  Camera, 
  Edit, 
  Package, 
  Heart, 
  MapPin, 
  Gift, 
  HelpCircle, 
  LogOut, 
  Trash2, 
  Star,
  Plus,
  Truck,
  CheckCircle,
  Clock,
  X,
  Facebook,
  Chrome
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  loyaltyPoints: number;
  memberSince: string;
}

interface Order {
  id: string;
  date: string;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  total: number;
  items: Array<{
    name: string;
    quantity: number;
    price: number;
    image: string;
  }>;
  trackingNumber?: string;
}

interface Address {
  id: string;
  type: 'home' | 'work' | 'other';
  name: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
}

const sampleUser: User = {
  id: '1',
  name: 'Maria Silva',
  email: 'maria.silva@email.com',
  phone: '(11) 99999-9999',
  avatar: '/api/placeholder/80/80',
  loyaltyPoints: 2450,
  memberSince: '2023-03-15'
};

const sampleOrders: Order[] = [
  {
    id: '#MON-2024-001',
    date: '2024-12-10',
    status: 'delivered',
    total: 127.50,
    items: [
      { name: 'Xarope de Baunilha 750ml', quantity: 2, price: 47.90, image: '/api/placeholder/60/60' },
      { name: 'Xarope de Caramelo 750ml', quantity: 1, price: 47.90, image: '/api/placeholder/60/60' }
    ],
    trackingNumber: 'BR123456789'
  },
  {
    id: '#MON-2024-002',
    date: '2024-12-15',
    status: 'shipped',
    total: 95.80,
    items: [
      { name: 'Xarope de Lavanda 750ml', quantity: 1, price: 47.90, image: '/api/placeholder/60/60' },
      { name: 'Bomba para Frasco de Vidro', quantity: 1, price: 15.60, image: '/api/placeholder/60/60' }
    ],
    trackingNumber: 'BR987654321'
  }
];

const sampleAddresses: Address[] = [
  {
    id: '1',
    type: 'home',
    name: 'Casa',
    street: 'Rua das Flores, 123',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01234-567',
    isDefault: true
  },
  {
    id: '2',
    type: 'work',
    name: 'Trabalho',
    street: 'Av. Paulista, 1000',
    city: 'São Paulo',
    state: 'SP',
    zipCode: '01310-100',
    isDefault: false
  }
];

const sampleWishlist: WishlistItem[] = [
  {
    id: '1',
    name: 'Xarope de Yuzu Abacaxi 1L',
    price: 67.90,
    image: '/api/placeholder/60/60',
    inStock: true
  },
  {
    id: '2',
    name: 'Molho Gourmet de Chocolate',
    price: 32.50,
    image: '/api/placeholder/60/60',
    inStock: false
  }
];

export default function ContaPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  
  // Form states
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [registerForm, setRegisterForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // User data
  const [user, setUser] = useState<User | null>(null);
  const [orders] = useState<Order[]>(sampleOrders);
  const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);
  const [wishlist, setWishlist] = useState<WishlistItem[]>(sampleWishlist);
  
  // Settings
  const [emailPreferences, setEmailPreferences] = useState({
    newsletter: true,
    promotions: true,
    orderUpdates: true
  });

  // Check login status on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('moninUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsLoggedIn(true);
    }
  }, []);

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const validatePhone = (phone: string) => {
    return /^\(\d{2}\)\s\d{4,5}-\d{4}$/.test(phone);
  };

  const handleLogin = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!loginForm.email) newErrors.email = 'Email é obrigatório';
    else if (!validateEmail(loginForm.email)) newErrors.email = 'Email inválido';
    if (!loginForm.password) newErrors.password = 'Senha é obrigatória';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setUser(sampleUser);
      setIsLoggedIn(true);
      localStorage.setItem('moninUser', JSON.stringify(sampleUser));
      toast.success('Login realizado com sucesso!');
      setIsLoading(false);
    }, 1000);
  }, [loginForm]);

  const handleRegister = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    // Validation
    const newErrors: Record<string, string> = {};
    if (!registerForm.name) newErrors.name = 'Nome é obrigatório';
    if (!registerForm.email) newErrors.email = 'Email é obrigatório';
    else if (!validateEmail(registerForm.email)) newErrors.email = 'Email inválido';
    if (!registerForm.password) newErrors.password = 'Senha é obrigatória';
    else if (registerForm.password.length < 6) newErrors.password = 'Senha deve ter pelo menos 6 caracteres';
    if (registerForm.password !== registerForm.confirmPassword) {
      newErrors.confirmPassword = 'Senhas não coincidem';
    }
    if (!registerForm.phone) newErrors.phone = 'Telefone é obrigatório';
    else if (!validatePhone(registerForm.phone)) newErrors.phone = 'Formato: (11) 99999-9999';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    // Simulate API call
    setTimeout(() => {
      const newUser: User = {
        id: '1',
        name: registerForm.name,
        email: registerForm.email,
        phone: registerForm.phone,
        loyaltyPoints: 0,
        memberSince: new Date().toISOString().split('T')[0]
      };
      setUser(newUser);
      setIsLoggedIn(true);
      localStorage.setItem('moninUser', JSON.stringify(newUser));
      toast.success('Conta criada com sucesso!');
      setIsLoading(false);
    }, 1000);
  }, [registerForm]);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem('moninUser');
    toast.success('Logout realizado com sucesso!');
  }, []);

  const handleSocialLogin = useCallback((provider: 'google' | 'facebook') => {
    toast.info(`Login com ${provider === 'google' ? 'Google' : 'Facebook'} em desenvolvimento`);
  }, []);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Order['status']) => {
    switch (status) {
      case 'pending': return 'Pendente';
      case 'processing': return 'Processando';
      case 'shipped': return 'Enviado';
      case 'delivered': return 'Entregue';
      case 'cancelled': return 'Cancelado';
      default: return status;
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'processing': return <Package className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <X className="w-4 h-4" />;
      default: return null;
    }
  };

  const removeFromWishlist = useCallback((itemId: string) => {
    setWishlist(prev => prev.filter(item => item.id !== itemId));
    toast.success('Item removido da lista de desejos');
  }, []);

  const removeAddress = useCallback((addressId: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== addressId));
    toast.success('Endereço removido');
  }, []);

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-[#3E2723] mb-2">Minha Conta</h1>
            <p className="text-[#5D4037]">Entre ou crie sua conta na Monin</p>
          </div>

          <Card>
            <CardHeader>
              <Tabs value={authMode} onValueChange={(value) => setAuthMode(value as 'login' | 'register')}>
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="login">Entrar</TabsTrigger>
                  <TabsTrigger value="register">Criar Conta</TabsTrigger>
                </TabsList>
              </Tabs>
            </CardHeader>
            <CardContent>
              <Tabs value={authMode}>
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm(prev => ({ ...prev, email: e.target.value }))}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="login-password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="login-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Digite sua senha"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm(prev => ({ ...prev, password: e.target.value }))}
                          className={errors.password ? 'border-red-500' : ''}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#3E2723] hover:bg-[#2C1810]"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Entrando...' : 'Entrar'}
                    </Button>

                    <div className="text-center">
                      <Button variant="link" className="text-[#7B2D5F]">
                        Esqueceu sua senha?
                      </Button>
                    </div>
                  </form>
                </TabsContent>

                <TabsContent value="register">
                  <form onSubmit={handleRegister} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="register-name">Nome Completo</Label>
                      <Input
                        id="register-name"
                        placeholder="Seu nome completo"
                        value={registerForm.name}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, name: e.target.value }))}
                        className={errors.name ? 'border-red-500' : ''}
                      />
                      {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-email">Email</Label>
                      <Input
                        id="register-email"
                        type="email"
                        placeholder="seu@email.com"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, email: e.target.value }))}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                      {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-phone">Telefone</Label>
                      <Input
                        id="register-phone"
                        placeholder="(11) 99999-9999"
                        value={registerForm.phone}
                        onChange={(e) => setRegisterForm(prev => ({ ...prev, phone: e.target.value }))}
                        className={errors.phone ? 'border-red-500' : ''}
                      />
                      {errors.phone && <p className="text-sm text-red-600">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-password">Senha</Label>
                      <div className="relative">
                        <Input
                          id="register-password"
                          type={showPassword ? 'text' : 'password'}
                          placeholder="Mínimo 6 caracteres"
                          value={registerForm.password}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, password: e.target.value }))}
                          className={errors.password ? 'border-red-500' : ''}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="register-confirm-password">Confirmar Senha</Label>
                      <div className="relative">
                        <Input
                          id="register-confirm-password"
                          type={showConfirmPassword ? 'text' : 'password'}
                          placeholder="Digite novamente sua senha"
                          value={registerForm.confirmPassword}
                          onChange={(e) => setRegisterForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className={errors.confirmPassword ? 'border-red-500' : ''}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                      {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#3E2723] hover:bg-[#2C1810]"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Criando conta...' : 'Criar Conta'}
                    </Button>
                  </form>
                </TabsContent>
              </Tabs>

              <div className="mt-6">
                <Separator />
                <p className="text-center text-sm text-gray-600 mt-4 mb-4">Ou entre com</p>
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('google')}
                    className="flex items-center gap-2"
                  >
                    <Chrome className="w-4 h-4" />
                    Google
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleSocialLogin('facebook')}
                    className="flex items-center gap-2"
                  >
                    <Facebook className="w-4 h-4" />
                    Facebook
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#3E2723] mb-2">Minha Conta</h1>
          <p className="text-[#5D4037]">Gerencie suas informações e pedidos</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="text-center">
                <div className="relative mx-auto w-20 h-20 mb-4">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src={user?.avatar} />
                    <AvatarFallback className="bg-[#7B2D5F] text-white text-lg">
                      {user?.name?.split(' ').map(n => n[0]).join('').toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <button className="absolute -bottom-1 -right-1 bg-[#3E2723] text-white rounded-full p-2 hover:bg-[#2C1810] transition-colors">
                    <Camera className="w-3 h-3" />
                  </button>
                </div>
                <CardTitle className="text-[#3E2723]">{user?.name}</CardTitle>
                <CardDescription>{user?.email}</CardDescription>
                <div className="mt-4">
                  <Badge variant="secondary" className="bg-[#D4AF37] text-white">
                    <Gift className="w-3 h-3 mr-1" />
                    {user?.loyaltyPoints} pontos
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            <div className="mt-4">
              <Button
                variant="destructive"
                onClick={handleLogout}
                className="w-full flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Sair
              </Button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="profile" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
                <TabsTrigger value="profile" className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  <span className="hidden sm:inline">Perfil</span>
                </TabsTrigger>
                <TabsTrigger value="orders" className="flex items-center gap-2">
                  <Package className="w-4 h-4" />
                  <span className="hidden sm:inline">Pedidos</span>
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="flex items-center gap-2">
                  <Heart className="w-4 h-4" />
                  <span className="hidden sm:inline">Favoritos</span>
                </TabsTrigger>
                <TabsTrigger value="addresses" className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span className="hidden sm:inline">Endereços</span>
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <User className="w-5 h-5" />
                      Informações Pessoais
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="profile-name">Nome Completo</Label>
                        <Input id="profile-name" defaultValue={user?.name} />
                      </div>
                      <div>
                        <Label htmlFor="profile-email">Email</Label>
                        <Input id="profile-email" type="email" defaultValue={user?.email} />
                      </div>
                      <div>
                        <Label htmlFor="profile-phone">Telefone</Label>
                        <Input id="profile-phone" defaultValue={user?.phone} />
                      </div>
                      <div>
                        <Label htmlFor="profile-birth">Data de Nascimento</Label>
                        <Input id="profile-birth" type="date" />
                      </div>
                    </div>
                    <Button className="bg-[#3E2723] hover:bg-[#2C1810]">
                      <Edit className="w-4 h-4 mr-2" />
                      Atualizar Perfil
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Alterar Senha
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="current-password">Senha Atual</Label>
                      <Input id="current-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="new-password">Nova Senha</Label>
                      <Input id="new-password" type="password" />
                    </div>
                    <div>
                      <Label htmlFor="confirm-new-password">Confirmar Nova Senha</Label>
                      <Input id="confirm-new-password" type="password" />
                    </div>
                    <Button variant="outline">Alterar Senha</Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="w-5 h-5" />
                      Preferências de Email
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Newsletter</Label>
                        <p className="text-sm text-gray-600">Receba novidades e receitas</p>
                      </div>
                      <Switch
                        checked={emailPreferences.newsletter}
                        onCheckedChange={(checked) => 
                          setEmailPreferences(prev => ({ ...prev, newsletter: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Promoções</Label>
                        <p className="text-sm text-gray-600">Ofertas especiais e descontos</p>
                      </div>
                      <Switch
                        checked={emailPreferences.promotions}
                        onCheckedChange={(checked) => 
                          setEmailPreferences(prev => ({ ...prev, promotions: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label>Atualizações de Pedidos</Label>
                        <p className="text-sm text-gray-600">Status dos seus pedidos</p>
                      </div>
                      <Switch
                        checked={emailPreferences.orderUpdates}
                        onCheckedChange={(checked) => 
                          setEmailPreferences(prev => ({ ...prev, orderUpdates: checked }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-red-600">
                      <Trash2 className="w-5 h-5" />
                      Zona de Perigo
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Alert>
                      <AlertDescription>
                        A exclusão da conta é permanente e não pode ser desfeita. Todos os seus dados serão removidos.
                      </AlertDescription>
                    </Alert>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="destructive" className="mt-4">
                          Excluir Conta
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Tem certeza?</AlertDialogTitle>
                          <AlertDialogDescription>
                            Esta ação não pode ser desfeita. Sua conta e todos os dados associados serão permanentemente removidos.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancelar</AlertDialogCancel>
                          <AlertDialogAction className="bg-red-600 hover:bg-red-700">
                            Excluir Conta
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#3E2723]">Meus Pedidos</h2>
                  <Select defaultValue="all">
                    <SelectTrigger className="w-48">
                      <SelectValue placeholder="Filtrar por status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos os pedidos</SelectItem>
                      <SelectItem value="pending">Pendentes</SelectItem>
                      <SelectItem value="processing">Processando</SelectItem>
                      <SelectItem value="shipped">Enviados</SelectItem>
                      <SelectItem value="delivered">Entregues</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-4">
                  {orders.map((order) => (
                    <Card key={order.id}>
                      <CardHeader>
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                          <div>
                            <CardTitle className="text-lg">{order.id}</CardTitle>
                            <CardDescription>
                              Pedido realizado em {new Date(order.date).toLocaleDateString('pt-BR')}
                            </CardDescription>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge className={getStatusColor(order.status)}>
                              {getStatusIcon(order.status)}
                              <span className="ml-1">{getStatusText(order.status)}</span>
                            </Badge>
                            <div className="text-right">
                              <p className="font-semibold">R$ {order.total.toFixed(2)}</p>
                              {order.trackingNumber && (
                                <p className="text-sm text-gray-600">#{order.trackingNumber}</p>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center gap-4">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-lg object-cover"
                              />
                              <div className="flex-1">
                                <p className="font-medium">{item.name}</p>
                                <p className="text-sm text-gray-600">
                                  Quantidade: {item.quantity} • R$ {item.price.toFixed(2)} cada
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                        <div className="flex gap-2 mt-4">
                          <Button variant="outline" size="sm">
                            Ver Detalhes
                          </Button>
                          {order.status === 'delivered' && (
                            <Button variant="outline" size="sm">
                              Comprar Novamente
                            </Button>
                          )}
                          {order.trackingNumber && (
                            <Button variant="outline" size="sm">
                              Rastrear Pedido
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              {/* Wishlist Tab */}
              <TabsContent value="wishlist" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#3E2723]">Lista de Desejos</h2>
                  <p className="text-[#5D4037]">{wishlist.length} itens</p>
                </div>

                {wishlist.length === 0 ? (
                  <Card>
                    <CardContent className="text-center py-12">
                      <Heart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                      <h3 className="text-lg font-medium text-gray-600 mb-2">
                        Sua lista de desejos está vazia
                      </h3>
                      <p className="text-gray-500 mb-4">
                        Adicione produtos que você gostaria de comprar mais tarde
                      </p>
                      <Button className="bg-[#3E2723] hover:bg-[#2C1810]">
                        Explorar Produtos
                      </Button>
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {wishlist.map((item) => (
                      <Card key={item.id}>
                        <CardContent className="p-4">
                          <div className="relative">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-32 object-cover rounded-lg mb-3"
                            />
                            <button
                              onClick={() => removeFromWishlist(item.id)}
                              className="absolute top-2 right-2 bg-white rounded-full p-1.5 shadow-md hover:bg-gray-50"
                            >
                              <X className="w-4 h-4 text-gray-600" />
                            </button>
                          </div>
                          <h3 className="font-medium text-[#3E2723] mb-2">{item.name}</h3>
                          <p className="text-lg font-semibold text-[#7B2D5F] mb-3">
                            R$ {item.price.toFixed(2)}
                          </p>
                          <Button
                            className={`w-full ${
                              item.inStock
                                ? 'bg-[#3E2723] hover:bg-[#2C1810]'
                                : 'bg-gray-300 cursor-not-allowed'
                            }`}
                            disabled={!item.inStock}
                          >
                            {item.inStock ? 'Adicionar ao Carrinho' : 'Fora de Estoque'}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Addresses Tab */}
              <TabsContent value="addresses" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-[#3E2723]">Meus Endereços</h2>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button className="bg-[#3E2723] hover:bg-[#2C1810]">
                        <Plus className="w-4 h-4 mr-2" />
                        Adicionar Endereço
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Adicionar Novo Endereço</DialogTitle>
                        <DialogDescription>
                          Complete as informações do seu endereço
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="address-name">Nome do Endereço</Label>
                          <Input id="address-name" placeholder="Ex: Casa, Trabalho" />
                        </div>
                        <div>
                          <Label htmlFor="address-cep">CEP</Label>
                          <Input id="address-cep" placeholder="00000-000" />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="address-street">Rua</Label>
                            <Input id="address-street" placeholder="Nome da rua" />
                          </div>
                          <div>
                            <Label htmlFor="address-number">Número</Label>
                            <Input id="address-number" placeholder="123" />
                          </div>
                        </div>
                        <div>
                          <Label htmlFor="address-complement">Complemento</Label>
                          <Input id="address-complement" placeholder="Apto, bloco, etc." />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label htmlFor="address-city">Cidade</Label>
                            <Input id="address-city" placeholder="São Paulo" />
                          </div>
                          <div>
                            <Label htmlFor="address-state">Estado</Label>
                            <Select>
                              <SelectTrigger>
                                <SelectValue placeholder="UF" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="sp">SP</SelectItem>
                                <SelectItem value="rj">RJ</SelectItem>
                                <SelectItem value="mg">MG</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="default-address" />
                          <Label htmlFor="default-address">Definir como endereço padrão</Label>
                        </div>
                        <Button className="w-full bg-[#3E2723] hover:bg-[#2C1810]">
                          Salvar Endereço
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {addresses.map((address) => (
                    <Card key={address.id}>
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-2">
                            <h3 className="font-medium text-[#3E2723]">{address.name}</h3>
                            {address.isDefault && (
                              <Badge variant="secondary" className="bg-[#D4AF37] text-white text-xs">
                                Padrão
                              </Badge>
                            )}
                          </div>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAddress(address.id)}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                        <div className="text-sm text-gray-600 space-y-1">
                          <p>{address.street}</p>
                          <p>{address.city}, {address.state}</p>
                          <p>CEP: {address.zipCode}</p>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Loyalty Points & Support */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Gift className="w-5 h-5 text-[#D4AF37]" />
                    Programa de Fidelidade
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Pontos atuais:</span>
                      <span className="font-semibold text-[#D4AF37]">{user?.loyaltyPoints}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Próximo nível:</span>
                      <span className="text-sm text-gray-600">500 pontos</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-[#D4AF37] h-2 rounded-full transition-all duration-300"
                        style={{ width: `${(user?.loyaltyPoints || 0) / 3000 * 100}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-600">
                      Ganhe pontos a cada compra e troque por descontos exclusivos!
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <HelpCircle className="w-5 h-5 text-[#7B2D5F]" />
                    Atendimento ao Cliente
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Mail className="w-4 h-4 mr-2" />
                      Enviar Mensagem
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Phone className="w-4 h-4 mr-2" />
                      (11) 4444-4444
                    </Button>
                    <div className="text-sm text-gray-600">
                      <p><strong>Horário de atendimento:</strong></p>
                      <p>Segunda à sexta: 9h às 18h</p>
                      <p>Sábado: 9h às 14h</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}