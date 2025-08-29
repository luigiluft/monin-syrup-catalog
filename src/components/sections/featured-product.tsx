import Image from 'next/image';
import Link from 'next/link';

export default function FeaturedProduct() {
  return (
    <div className="product-display__inner">
      <div 
        className="product-display__main flex flex-col lg:flex-row items-center min-h-[500px] lg:min-h-[600px]"
        style={{
          backgroundImage: "url('https://monin.us/cdn/shop/files/yuzu-background.png?v=1734726026')",
          backgroundColor: "#efc200",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat"
        }}
      >
        <div className="product-display__image flex-1 flex justify-center items-center p-8 lg:p-16">
          <Image
            src="https://monin.us/cdn/shop/files/1L-YuzuPineapple.png?v=1737561127&width=450"
            alt="Yuzu Pineapple Syrup"
            width={450}
            height={450}
            className="object-contain max-w-full h-auto drop-shadow-2xl"
            loading="lazy"
          />
        </div>
        
        <div 
          className="product-display__info flex-1 p-8 lg:p-16"
          style={{ backgroundColor: "#efc200" }}
        >
          <div className="product-label__container flex flex-wrap gap-3 mb-6">
            <Link href="https://monin.us/collections/new-flavors" className="label-link">
              <div 
                className="product-label flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: "#e7bc70", color: "#392000" }}
              >
                <Image 
                  src="https://monin.us/cdn/shop/files/new-icon.svg?v=1726166840&width=10" 
                  alt="" 
                  width={10} 
                  height={11} 
                  loading="lazy"
                  className="w-[10px] h-[11px]"
                />
                NEW
              </div>
            </Link>
            
            <Link href="https://monin.us/collections/flavor-of-the-year" className="label-link">
              <div 
                className="product-label px-4 py-2 rounded-full text-sm font-bold uppercase transition-all hover:opacity-90"
                style={{ backgroundColor: "#392000", color: "#ffffff" }}
              >
                FOTY
              </div>
            </Link>
          </div>
          
          <h2 className="h2 product-display__title text-4xl lg:text-5xl font-bold text-[#392000] mb-4 font-kanit">
            Yuzu Pineapple Syrup
          </h2>
          
          <p className="product-display__price text-2xl font-semibold text-[#392000] mb-6 font-poppins">
            $13.50 USD
          </p>
          
          <p className="product-display__description text-lg text-[#5D4037] leading-relaxed mb-8 font-kanit max-w-lg">
            Say "yes" to our 2025 Flavor of the Year—Yuzu! This vibrant blend of yuzu and pineapple delivers a bold burst of flavor, perfect for crafting refreshing tropical cocktails, mocktails, iced teas, refreshers, and more.
          </p>
          
          <Link 
            href="/products/yuzu-pineapple-syrup" 
            className="product-display__cta button-pill inline-block bg-[#392000] text-white font-bold text-lg uppercase px-8 py-4 rounded-full hover:bg-[#2E1A17] transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#392000]"
          >
            Discover
          </Link>
        </div>
      </div>
    </div>
  );
}