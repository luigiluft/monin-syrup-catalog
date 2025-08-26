import Image from 'next/image';
import Link from 'next/link';

const categoryData = [
  {
    name: 'Xaropes Saborizados',
    href: '/collections/xaropes-saborizados',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/750_ml_banana-19.png?',
  },
  {
    name: 'Sabores Sem Açúcar',
    href: '/collections/xaropes-sem-acucar',
    imageSrc: 'https://monin.us/cdn/shop/files/sugar-free-caramel-syrup-750ml_1.webp?v=1725575683&width=300',
  },
  {
    name: 'Molhos Gourmet',
    href: '/collections/molhos-gourmet',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/64_12-oz-caramel-sauce-group-rev-5_16-new-pump-22.webp?',
  },
  {
    name: 'Adoçantes & Mixers',
    href: '/collections/adocantes-e-mixers',
    imageSrc: 'https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/test-clones/a03201d5-2727-41ab-9ec0-b82cea30b5d3-monin-us/assets/images/Sweetener_Agave-23.webp?',
  },
  {
    name: 'Energizantes',
    href: '/collections/energizantes',
    imageSrc: 'https://monin.us/cdn/shop/files/1l_energy_boost.png?v=1723588159&width=300',
  },
  {
    name: 'Concentrados de Café e Chá',
    href: '/collections/concentrados-cafe-cha',
    imageSrc: 'https://monin.us/cdn/shop/files/1l_iced_coffee_concentrate.webp?v=1725575852&width=300',
  },
  {
    name: 'Bases para Bebidas 64oz',
    href: '/collections/bases-bebidas-64oz',
    imageSrc: 'https://monin.us/cdn/shop/files/neutral_base_4.png?v=1723588166&width=300',
  },
  {
    name: 'Purês & Smoothies',
    href: '/collections/pures-smoothies',
    imageSrc: 'https://monin.us/cdn/shop/files/monin-peach-fruit-puree.webp?v=1725575966&width=300',
  },
];

const ProductCategories = () => {
  return (
    <section className="bg-white py-20 lg:py-28">
      <div className="container">
        <h2 className="text-4xl md:text-5xl font-bold font-kanit text-monin-brown-dark text-center mb-16 tracking-tight">
          Nossos Produtos
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {categoryData.map((category) => (
            <Link key={category.name} href={category.href} className="group text-center block">
              <div className="bg-monin-gray-light rounded-2xl aspect-square p-6 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg border border-gray-100">
                <Image
                  src={category.imageSrc}
                  alt={category.name}
                  width={300}
                  height={300}
                  className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <p className="font-kanit text-monin-brown-dark mt-5 text-base md:text-lg font-medium leading-snug group-hover:text-[#7B2D5F] transition-colors duration-200">
                {category.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="text-center mt-16">
          <Link
            href="/collections"
            className="inline-block bg-monin-brown-dark text-white rounded-full py-4 px-12 uppercase font-poppins-medium text-sm tracking-widest transition-all duration-300 ease-in-out hover:scale-105 hover:bg-[#7B2D5F] hover:shadow-lg"
          >
            Ver Todas as Coleções
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;