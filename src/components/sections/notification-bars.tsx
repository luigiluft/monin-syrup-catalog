import Image from 'next/image';
import Link from 'next/link';

const NotificationBars = () => {
  return (
    <div className="font-poppins text-white text-sm">
      {/* Barra 1: Frete Grátis */}
      <div className="bg-[#3e2723]">
        <Link 
          href="/pages/politica-de-envio-e-devolucao" 
          className="flex flex-wrap items-center justify-center gap-x-2 py-3 px-4 text-center hover:bg-[#2e1a17] transition-colors duration-200"
        >
          <div className="flex items-center gap-x-3">
            <Image
              src="https://monin.us/cdn/shop/files/icon-truck.png?v=1712954452&width=40"
              alt="Ícone de caminhão"
              width={22}
              height={16}
              className="flex-shrink-0"
            />
            <p className="font-bold text-white">Frete grátis em pedidos acima de R$200*</p>
          </div>
          <p className="hidden md:inline text-white/90">Sem código necessário. Válido apenas no Brasil continental. Saiba mais aqui.</p>
        </Link>
      </div>

      {/* Barra 2: Recompensas */}
      <div className="bg-primary">
        <Link 
          href="/pages/recompensas" 
          className="flex flex-wrap items-center justify-center gap-x-2 py-3 px-4 text-center hover:bg-[#6b2651] transition-colors duration-200"
        >
          <p className="font-bold text-white">Apresentando Sip & Savor Rewards!</p>
          <p className="hidden md:inline text-white/90">Clique aqui para começar a ganhar pontos a cada compra.</p>
        </Link>
      </div>
    </div>
  );
};

export default NotificationBars;