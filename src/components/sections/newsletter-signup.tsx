"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function NewsletterSignup() {
  const [usage, setUsage] = React.useState<"home" | "business">("home");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Lógica de envio do formulário seria colocada aqui
    console.log("Formulário enviado com:", {
      firstName: (e.currentTarget.elements.namedItem("first_name") as HTMLInputElement).value,
      email: (e.currentTarget.elements.namedItem("email") as HTMLInputElement).value,
      usage,
    });
  };

  return (
    <section className="bg-monin-tan-beige py-24 lg:py-32 relative overflow-hidden">
      {/* Padrão decorativo de fundo */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-32 h-32 border-2 border-monin-brown-dark rounded-full"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 border border-monin-brown-dark rounded-full"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 border border-monin-brown-dark rounded-full"></div>
        <div className="absolute bottom-20 left-1/3 w-20 h-20 border border-monin-brown-dark rounded-full"></div>
      </div>

      <div className="container max-w-4xl mx-auto px-6 text-center relative z-10">
        <h2 className="font-kanit text-4xl md:text-5xl lg:text-6xl font-bold text-monin-brown-dark mb-6">
          Junte-se à Família
          <span className="block text-[#7B2D5F]">Monin</span>
        </h2>
        <p className="mt-6 mb-10 max-w-2xl mx-auto font-kanit text-lg md:text-xl text-monin-brown-dark leading-relaxed">
          Seja o primeiro a saber sobre novos sabores, descontos exclusivos e receba receitas incríveis direto na sua caixa de entrada!
        </p>
        
        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
          <input type="hidden" name="usage" value={usage} />
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <Input
              type="text"
              name="first_name"
              placeholder="Digite Seu Primeiro Nome"
              className="w-full flex-1 bg-white border-2 border-transparent rounded-full h-16 px-8 text-lg text-monin-brown-dark placeholder:text-monin-brown-medium focus-visible:ring-2 focus-visible:ring-[#7B2D5F] focus-visible:ring-offset-2 focus-visible:ring-offset-monin-tan-beige focus-visible:border-transparent shadow-sm"
              aria-label="Digite Seu Primeiro Nome"
            />
            <Input
              type="email"
              name="email"
              placeholder="Digite Seu Endereço de Email"
              className="w-full flex-1 bg-white border-2 border-transparent rounded-full h-16 px-8 text-lg text-monin-brown-dark placeholder:text-monin-brown-medium focus-visible:ring-2 focus-visible:ring-[#7B2D5F] focus-visible:ring-offset-2 focus-visible:ring-offset-monin-tan-beige focus-visible:border-transparent shadow-sm"
              aria-label="Digite Seu Endereço de Email"
            />
          </div>

          <p className="font-kanit font-semibold text-lg text-monin-brown-dark mb-6">Escolha uma opção:</p>
          
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row mb-10">
            <Button
              type="button"
              variant={usage === "home" ? "default" : "outline"}
              onClick={() => setUsage("home")}
              className="h-auto w-full sm:w-auto flex-1 sm:flex-none justify-center rounded-full px-8 py-4 font-kanit text-lg font-medium transition-all duration-300 border-2 border-monin-brown-dark bg-transparent text-monin-brown-dark data-[variant=default]:bg-monin-brown-dark data-[variant=default]:text-white hover:bg-monin-brown-dark hover:text-white hover:scale-105 shadow-sm"
            >
              Uso Monin em casa
            </Button>
            <Button
              type="button"
              variant={usage === "business" ? "default" : "outline"}
              onClick={() => setUsage("business")}
              className="h-auto w-full sm:w-auto flex-1 sm:flex-none justify-center rounded-full px-8 py-4 font-kanit text-lg font-medium transition-all duration-300 border-2 border-monin-brown-dark bg-transparent text-monin-brown-dark data-[variant=default]:bg-monin-brown-dark data-[variant=default]:text-white hover:bg-monin-brown-dark hover:text-white hover:scale-105 shadow-sm"
            >
              Uso Monin no meu negócio
            </Button>
          </div>

          <div className="text-monin-brown-dark font-kanit mb-10">
            <p className="text-lg md:text-xl font-bold mb-4">
              Envie MONIN para 11 99999-9999 e nunca perca uma novidade.
            </p>
            <p className="text-sm max-w-3xl mx-auto leading-relaxed text-monin-brown-medium">
              Ao enviar MONIN para 11 99999-9999, você concorda em receber mensagens promocionais e de marketing personalizadas recorrentes automatizadas (por exemplo, lembretes de carrinho) da Monin no número de celular usado ao se inscrever. O consentimento não é uma condição de qualquer compra. Responda AJUDA para obter ajuda e PARE para cancelar. A frequência das mensagens varia. Podem ser aplicadas taxas de mensagem e dados. Ver <a href="#" className="underline hover:text-[#7B2D5F] transition-colors">Termos</a> e <a href="#" className="underline hover:text-[#7B2D5F] transition-colors">Privacidade</a>.
            </p>
          </div>
          
          <div>
            <Button 
              type="submit" 
              className="bg-monin-brown-dark text-white rounded-full px-16 py-4 h-auto font-poppins font-bold text-base uppercase tracking-widest hover:bg-[#7B2D5F] hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}