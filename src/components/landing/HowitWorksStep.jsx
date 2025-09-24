import React from 'react';
import { motion } from 'framer-motion';

export default function HowItWorksStep({ icon: Icon, title, description, stepNumber, delay = 0 }) {
  return (
    <motion.div 
      className="flex flex-col items-center text-center p-6 bg-white rounded-xl shadow-lg hover:shadow-emerald-200/50 transition-all duration-300 hover:scale-105 border border-gray-100"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.6, type: "spring", stiffness: 100 }}
      viewport={{ once: true }}
    >
      <motion.div 
        className="mb-4 p-4 bg-emerald-500 text-white rounded-full shadow-md"
        whileHover={{ rotate: 15 }}
      >
        <Icon className="w-8 h-8" />
      </motion.div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{stepNumber}. {title}</h3>
      <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
    </motion.div>
  );
}