"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [cartCount, setCartCount] = useState(2);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (!isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleDropdownHover = (item: string) => {
    setActiveDropdown(item);
  };

  const handleDropdownLeave = () => {
    setActiveDropdown(null);
  };

  const navigationItems = [
    { 
      name: 'Receitas', 
      href: '/receitas', 
      hasDropdown: true,
      dropdownItems: [
        'Bebidas Quentes',
        'Bebidas Geladas',
        'Coquetéis',
        'Sobremesas',
        'Cafés Especiais'
      ]
    },
    { 
      name: 'Comprar', 
      href: '/comprar', 
      hasDropdown: true,
      dropdownItems: [
        'Xaropes Saborizados',
        'Sem Açúcar',
        'Molhos Gourmet',
        'Purês de Frutas',
        'Concentrados'
      ]
    },
    { 
      name: 'Sobre Nós', 
      href: '/sobre-nos', 
      hasDropdown: true,
      dropdownItems: [
        'Nossa História',
        'Qualidade',
        'Inovação',
        'Sustentabilidade'
      ]
    },
    { 
      name: 'Responsabilidade Social', 
      href: '/responsabilidade-social', 
      hasDropdown: false 
    },
    { 
      name: 'Recursos', 
      href: '/recursos', 
      hasDropdown: true,
      dropdownItems: [
        'Guias de Receitas',
        'Treinamentos',
        'Downloads',
        'FAQ'
      ]
    },
    { 
      name: 'Blog', 
      href: '/blog', 
      hasDropdown: false 
    },
    { 
      name: 'Recompensas', 
      href: '/recompensas', 
      hasDropdown: false 
    }
  ];

  return (
    <>
      {/* Top Notification Bars */}
      <div className="bg-[#3E2723] text-white py-2 text-sm">
        <div className="container mx-auto px-4 text-center font-poppins">
          <span className="flex items-center justify-center gap-2">
            <svg width="20" height="16" viewBox="0 0 20 16" className="text-white">
              <path fill="currentColor" d="M0 0h4l1.68 6.92L7 12h9l2-8H6.16L5.5 0H0zm16 14a2 2 0 11-4 0 2 2 0 014 0zm-8 0a2 2 0 11-4 0 2 2 0 014 0z"/>
            </svg>
            Frete grátis em pedidos acima de R$200* Sem código necessário. Válido apenas no Brasil.
          </span>
        </div>
      </div>

      <div className="bg-[#7B2D5F] text-white py-2 text-sm">
        <div className="container mx-auto px-4 text-center font-poppins">
          Apresentando Sip & Savor Rewards! Clique aqui para começar a ganhar pontos a cada compra.
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 bg-white transition-all duration-300 ${isScrolled ? 'shadow-md' : ''}`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="text-[#3E2723] font-kanit font-bold text-2xl tracking-wide">
                MONIN
                <span className="text-[#D4AF37] text-sm">®</span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <div
                  key={item.name}
                  className="relative"
                  onMouseEnter={() => item.hasDropdown && handleDropdownHover(item.name)}
                  onMouseLeave={handleDropdownLeave}
                >
                  <Link
                    href={item.href}
                    className="font-poppins font-medium text-[#3E2723] hover:text-[#7B2D5F] transition-colors duration-200 flex items-center gap-1 py-2"
                  >
                    {item.name}
                    {item.hasDropdown && (
                      <ChevronDown 
                        size={16} 
                        className={`transition-transform duration-200 ${
                          activeDropdown === item.name ? 'rotate-180' : ''
                        }`} 
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu */}
                  {item.hasDropdown && activeDropdown === item.name && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-[#D7CCC8] py-2 min-w-[200px] z-50">
                      {item.dropdownItems?.map((dropdownItem) => (
                        <Link
                          key={dropdownItem}
                          href={`${item.href}/${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`}
                          className="block px-4 py-2 text-sm font-poppins text-[#3E2723] hover:bg-[#F5F5F5] hover:text-[#7B2D5F] transition-colors duration-200"
                        >
                          {dropdownItem}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              
              {/* Search */}
              <button
                onClick={toggleSearch}
                className="p-2 text-[#3E2723] hover:text-[#7B2D5F] transition-colors duration-200"
                aria-label="Buscar"
              >
                <Search size={20} />
              </button>

              {/* Country Selector */}
              <div className="hidden md:flex items-center gap-2 px-3 py-1 border border-[#D7CCC8] rounded-full">
                <div className="w-5 h-4 bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500 rounded-sm flex items-center justify-center">
                  <div className="w-3 h-2 bg-blue-600 rounded-full relative">
                    <div className="absolute inset-0 bg-yellow-400 rounded-full transform scale-75"></div>
                  </div>
                </div>
                <span className="text-sm font-poppins text-[#3E2723]">BR</span>
              </div>

              {/* Account */}
              <Link
                href="/conta"
                className="p-2 text-[#3E2723] hover:text-[#7B2D5F] transition-colors duration-200"
                aria-label="Minha Conta"
              >
                <User size={20} />
              </Link>

              {/* Cart */}
              <Link
                href="/carrinho"
                className="relative p-2 text-[#3E2723] hover:text-[#7B2D5F] transition-colors duration-200"
                aria-label="Carrinho de Compras"
              >
                <ShoppingCart size={20} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-[#7B2D5F] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-poppins font-medium">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-[#3E2723] hover:text-[#7B2D5F] transition-colors duration-200"
                aria-label="Menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="pb-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar produtos, receitas..."
                  className="w-full px-4 py-3 border border-[#D7CCC8] rounded-lg font-poppins text-[#3E2723] placeholder-[#5D4037] focus:outline-none focus:ring-2 focus:ring-[#7B2D5F] focus:border-transparent"
                />
                <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-[#7B2D5F]">
                  <Search size={20} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Menu Overlay */}
        {isMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleMenu} />
        )}

        {/* Mobile Menu */}
        <div className={`lg:hidden fixed top-0 right-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex items-center justify-between p-6 border-b border-[#D7CCC8]">
            <h2 className="text-xl font-kanit font-bold text-[#3E2723]">Menu</h2>
            <button onClick={toggleMenu} className="text-[#3E2723] hover:text-[#7B2D5F]">
              <X size={24} />
            </button>
          </div>
          
          <nav className="p-6">
            {navigationItems.map((item) => (
              <div key={item.name} className="mb-4">
                <Link
                  href={item.href}
                  className="block font-poppins font-medium text-[#3E2723] hover:text-[#7B2D5F] transition-colors duration-200 py-2"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
                {item.hasDropdown && item.dropdownItems && (
                  <div className="ml-4 mt-2 space-y-2">
                    {item.dropdownItems.map((dropdownItem) => (
                      <Link
                        key={dropdownItem}
                        href={`${item.href}/${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block text-sm font-poppins text-[#5D4037] hover:text-[#7B2D5F] py-1"
                        onClick={toggleMenu}
                      >
                        {dropdownItem}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            {/* Mobile Country Selector */}
            <div className="flex items-center gap-3 mt-6 pt-6 border-t border-[#D7CCC8]">
              <div className="w-6 h-4 bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500 rounded-sm flex items-center justify-center">
                <div className="w-4 h-2 bg-blue-600 rounded-full relative">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full transform scale-75"></div>
                </div>
              </div>
              <span className="font-poppins text-[#3E2723]">Brasil</span>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
};