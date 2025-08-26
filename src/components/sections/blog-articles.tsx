import Image from 'next/image';

const articles = [
  {
    title: "Receitas Fáceis de Dirty Soda que Você Precisa Experimentar",
    image: "https://monin.us/cdn/shop/articles/Screenshot-2024-06-04-144434_33ef5011-6890-4b42-a807-9d7a32437305.png?v=1750440868&width=600",
    alt: "Em primeiro plano, um refrigerante rosa guarnecido com uma rodela de limão sendo coberto com creme de um despejador. Outro dirty soda rosa, cerejas e limões estão em uma bandeja ao fundo.",
    link: "https://monin.us/blogs/blog/easy-dirty-soda-recipes-you-need-to-try",
    isMuted: false,
  },
  {
    title: "Cuidados com Bomba 101: Como Usar uma Bomba de Xarope Monin",
    image: "https://monin.us/cdn/shop/articles/23054-Monin43902_49eed290-794e-4c69-a7fd-af18d5059209.jpg?v=1744225460&width=600",
    alt: "Cuidados com Bomba 101: Como Usar uma Bomba de Xarope Monin",
    link: "https://monin.us/blogs/blog/how-to-use-monin-syrup-pumps-pump-care-101",
    isMuted: false,
  },
  {
    title: "Os 12 Melhores Sabores de Bubble Tea que Você Precisa Experimentar em 2025",
    image: "https://monin.us/cdn/shop/articles/AdobeStock_108731832_2fe3e6d8-4602-436f-b315-d13dee4347fc.jpg?v=1750442547&width=600",
    alt: "Bubble Tea de Taro Caseiro com Pérolas de Tapioca",
    link: "https://monin.us/blogs/blog/bubble-tea-recipes",
    isMuted: true,
  },
];

const BlogArticles = () => {
  return (
    <section className="bg-white py-24 lg:py-32">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 lg:gap-x-12">
          <div className="lg:col-span-4 mb-12 lg:mb-0">
            <h2 className="font-kanit text-4xl md:text-5xl font-bold text-monin-brown-dark leading-tight -tracking-[0.01em]">
              Mais para
              <br />
              <span className="text-[#7B2D5F]">Explorar</span>
            </h2>
            <p className="mt-6 text-lg text-monin-brown-medium leading-relaxed mb-8">
              Descubra receitas exclusivas, dicas de especialistas e inspirações para criar bebidas incríveis.
            </p>
            <a
              href="https://monin.us/blogs/blog"
              className="inline-block bg-monin-brown-dark text-white font-poppins text-sm font-medium uppercase tracking-[0.1em] px-10 py-4 rounded-full transition-all duration-300 hover:bg-[#7B2D5F] hover:shadow-lg transform hover:scale-105"
            >
              Ver Todos os Posts
            </a>
          </div>
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {articles.map((article, index) => (
              <a href={article.link} key={index} className="group block">
                <div className="overflow-hidden rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-300 group-hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] group-hover:scale-105">
                  <Image
                    src={article.image}
                    alt={article.alt}
                    width={600}
                    height={400}
                    className="w-full aspect-[3/2] object-cover transform transition-transform duration-500 ease-in-out group-hover:scale-110"
                  />
                </div>
                <h3 className={`mt-6 font-kanit text-lg md:text-xl font-medium leading-[1.4] transition-colors duration-200 ${
                  article.isMuted 
                    ? 'text-monin-brown-medium/90 group-hover:text-monin-brown-dark' 
                    : 'text-monin-brown-dark group-hover:text-[#7B2D5F]'
                }`}>
                  {article.title}
                </h3>
                <div className="mt-3 text-sm text-monin-brown-medium font-poppins">
                  <span className="inline-block px-3 py-1 bg-[#F5F5F5] rounded-full">
                    Leia mais →
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogArticles;