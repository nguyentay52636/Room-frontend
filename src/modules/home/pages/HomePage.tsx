

import { motion } from 'framer-motion';
import FeatureSections from '../components/FeatureSection/FeatureSections';
import StatsSection from '../components/StatsSection/StatsSection';
import BackToTop from '@/components/BackToTop/BackToTop';
import Services from '../components/Services/Services';
import HeroCarousel from '../components/Carousel/HeroCarousel';
import { ChatWidget } from '@/components/BubbleChat/ChatWidget';
export default function HomePage() {


  return (
    <motion.div>
      <HeroCarousel />
      <StatsSection />
      <FeatureSections />
      <Services />
      <BackToTop />
      <ChatWidget />
    </motion.div>
  );
}
