

import { motion } from 'framer-motion';
import FeatureSections from '../components/FeatureSection/FeatureSections';
import StatsSection from '../components/StatsSection/StatsSection';
export default function HomePage() {


  return (
    <motion.div>
      <StatsSection />
      <FeatureSections />
    </motion.div>
  );
}
