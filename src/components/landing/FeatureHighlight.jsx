import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle } from 'lucide-react'; // Import CheckCircle

export default function FeatureHighlight({ text }) { // Removed icon prop
  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div 
      className="flex items-center gap-2 text-sm text-gray-600" // Simplified styling
      variants={itemVariants}
    >
      <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" /> {/* Using CheckCircle directly */}
      <span>{text}</span>
    </motion.div>
  );
}