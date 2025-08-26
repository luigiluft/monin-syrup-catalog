import Image from "next/image";
import { ChevronDown, Search, User, Mail, Phone } from "lucide-react";
import { FaFacebookF, FaYoutube, FaPinterestP, FaTiktok, FaLinkedinIn } from "react-icons/fa";
import { RiInstagramFill } from "react-icons/ri";

const navLinks1 = [
  { name: "RECEITAS", href: "#" },
  { name: "COMPRAR", href: "#" },
  { name: "SOBRE NÓS", href: "#" },
  { name: "RESPONSABILIDADE SOCIAL", href: "#" },
  { name: "RECURSOS", href: "#" },
];

const navLinks2 = [
  { name: "BLOG", href: "#" },
  { name: "RECOMPENSAS", href: "#" },
];

const footerLinks = {
  column1: [
    { name: "Avaliações de Clientes", href: "#" },
    { name: "Perguntas Frequentes Monin", href: "#" },
    { name: "Atacado", href: "#" },
  ],
  column2: [
    { name: "Influenciadores", href: "#" },
    { name: "Formulário de Doação Beneficente", href: "#" },
    { name: "Envio e Devoluções", href: "#" },
  ],
  column3: [
    { name: "Garantia de Satisfação", href: "#" },
    { name: "Acessibilidade", href: "#" },
    { name: "Baixar Aplicativo Móvel", href: "#" },
  ],
};

const socialLinks = [
  { icon: FaFacebookF, href: "#", label: "Facebook" },
  { icon: RiInstagramFill, href: "#", label: "Instagram" },
  { icon: FaYoutube, href: "#", label: "YouTube" },
  { icon: FaPinterestP, href: "#", label: "Pinterest" },
  { icon: FaTiktok, href: "#", label: "TikTok" },
  { icon: FaLinkedinIn, href: "#", label: "LinkedIn" },
];

const Footer = () => {
    return (
        <footer className="bg-white text-monin-brown-dark font-kanit border-t border-monin-tan-beige">
            <div className="max-w-[1248px] mx-auto px-6 py-12">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between pb-10 border-b border-monin-tan-beige">
                    <div className="flex items-center justify-between lg:justify-start lg:w-auto mb-8 lg:mb-0">
                      <a href="#" className="shrink-0 group">
                          <div className="text-monin-brown-dark font-kanit font-bold text-3xl tracking-wide group-hover:text-[#7B2D5F] transition-colors duration-200">
                            MONIN
                            <span className="text-[#D4AF37] text-lg">®</span>
                          </div>
                      </a>
                      <div className="lg:hidden flex items-center gap-x-4">
                          <button className="flex items-center gap-1 font-poppins text-sm bg-monin-tan-beige px-3 py-2 rounded-full hover:bg-[#C4B5B0] transition-colors">
                              <div className="w-5 h-4 bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500 rounded-sm flex items-center justify-center">
                                <div className="w-3 h-2 bg-blue-600 rounded-full relative">
                                  <div className="absolute inset-0 bg-yellow-400 rounded-full transform scale-75"></div>
                                </div>
                              </div>
                              BR <ChevronDown size={14} />
                          </button>
                          <a href="#" className="p-2 hover:text-[#7B2D5F] transition-colors"><Search size={20} /></a>
                          <a href="#" className="p-2 hover:text-[#7B2D5F] transition-colors"><User size={20} /></a>
                          <a href="#" className="p-2 hover:text-[#7B2D5F] transition-colors"><Mail size={20} /></a>
                      </div>
                    </div>
                    
                    <div className="hidden lg:flex flex-col items-center">
                        <nav className="font-poppins-medium text-sm">
                            <ul className="flex flex-wrap justify-center gap-x-8">
                                {navLinks1.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="flex items-center gap-1 hover:text-[#7B2D5F] transition-colors duration-200 py-2">
                                            {link.name} <ChevronDown size={14} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                        <nav className="font-poppins-medium text-sm mt-4">
                            <ul className="flex flex-wrap justify-center gap-x-10">
                                {navLinks2.map((link) => (
                                    <li key={link.name}>
                                        <a href={link.href} className="hover:text-[#7B2D5F] transition-colors duration-200 py-2 block">
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </nav>
                    </div>

                    <div className="hidden lg:flex items-center gap-x-5">
                        <button className="flex items-center gap-2 font-poppins text-sm bg-monin-tan-beige px-4 py-2 rounded-full hover:bg-[#C4B5B0] transition-colors">
                            <div className="w-5 h-4 bg-gradient-to-b from-green-500 via-yellow-400 to-blue-500 rounded-sm flex items-center justify-center">
                              <div className="w-3 h-2 bg-blue-600 rounded-full relative">
                                <div className="absolute inset-0 bg-yellow-400 rounded-full transform scale-75"></div>
                              </div>
                            </div>
                            BR <ChevronDown size={14} />
                        </button>
                        <a href="#" className="p-2 hover:text-[#7B2D5F] transition-colors"><Search size={22} /></a>
                        <a href="#" className="p-2 hover:text-[#7B2D5F] transition-colors"><User size={22} /></a>
                        <a href="#" className="p-2 hover:text-[#7B2D5F] transition-colors"><Mail size={22} /></a>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 md:gap-x-10 pt-12 pb-12">
                    <div className="lg:col-span-9 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                       {[footerLinks.column1, footerLinks.column2, footerLinks.column3].map((column, index) => (
                           <ul key={index} className="space-y-5 font-poppins text-sm">
                               {column.map((link) => (
                                   <li key={link.name}>
                                       <a href={link.href} className="hover:underline hover:text-[#7B2D5F] transition-colors duration-200 block py-1">{link.name}</a>
                                   </li>
                               ))}
                           </ul>
                       ))}
                    </div>

                    <div className="lg:col-span-3 flex flex-col items-start lg:items-end">
                        <a href="tel:11987654321" className="flex items-center gap-3 font-poppins text-sm font-medium whitespace-nowrap hover:underline hover:text-[#7B2D5F] transition-colors mb-6">
                            <Phone size={18} /> (11) 98765-4321
                        </a>
                        <div className="flex items-center gap-5">
                            {socialLinks.map((social) => (
                                <a key={social.label} href={social.href} aria-label={social.label} className="text-monin-brown-dark hover:text-[#7B2D5F] transition-all duration-200 transform hover:scale-110 p-1">
                                    <social.icon size={22}/>
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="text-xs font-poppins text-monin-brown-medium pt-10 border-t border-monin-tan-beige">
                    <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-start sm:items-center gap-y-6">
                      <p>© 2024 MONIN Brasil</p>
                      <div className="flex flex-col sm:flex-row gap-y-3 sm:gap-x-6">
                          <a href="#" className="hover:underline hover:text-monin-brown-dark transition-colors">Termos e Privacidade</a>
                          <a href="#" className="hover:underline hover:text-monin-brown-dark transition-colors">Aviso de Patente</a>
                          <a href="#" className="hover:underline hover:text-monin-brown-dark transition-colors">Não venda minhas informações pessoais</a>
                      </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;