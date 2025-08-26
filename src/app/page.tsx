import { Header } from '@/components/sections/header';
import NotificationBars from '@/components/sections/notification-bars';
import HeroSection from '@/components/sections/hero-section';
import TrendingProducts from '@/components/sections/trending-products';
import FlavorInspiration from '@/components/sections/flavor-inspiration';
import ProductCategories from '@/components/sections/product-categories';
import FeaturedProduct from '@/components/sections/featured-product';
import BlogArticles from '@/components/sections/blog-articles';
import TopPicks from '@/components/sections/top-picks';
import MerchandisingKit from '@/components/sections/merchandising-kit';
import NewsletterSignup from '@/components/sections/newsletter-signup';
import Footer from '@/components/sections/footer';

export default function HomePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen">
        <HeroSection />
        <TrendingProducts />
        <FlavorInspiration />
        <ProductCategories />
        <FeaturedProduct />
        <BlogArticles />
        <TopPicks />
        <MerchandisingKit />
        <NewsletterSignup />
        <Footer />
      </main>
    </>
  );
}