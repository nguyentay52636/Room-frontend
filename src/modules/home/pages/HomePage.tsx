

import { motion } from 'framer-motion';
import FeatureSections from '../components/FeatureSection/FeatureSections';
import StatsSection from '../components/StatsSection/StatsSection';
import BackToTop from '@/components/BackToTop/BackToTop';
import Services from '../components/Services/Services';
import HeroCarousel from '../components/Carousel/HeroCarousel';
import { ChatWidget } from '@/components/BubbleChat/ChatWidget';
import Products from '../components/Products/Products';
import ProductDetails from '../components/Products/components/ProductDetails/ProductDetails';
export default function HomePage() {


  return (
    <motion.div>
      <HeroCarousel />
      <Products />
      <StatsSection />
      <FeatureSections />
      <Services />
      <BackToTop />
      <ChatWidget />
      {/* <ProductDetails params={{ id: '1' }} /> */}
    </motion.div>
  );
}
