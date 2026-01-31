'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BrainCircuit, Languages, Smartphone, type LucideIcon } from 'lucide-react';
import { type Academy } from '../data/mockData'; // Adjusting path if needed, but I'll put it in features/academy/components

const ICON_MAP: Record<string, LucideIcon> = {
  BrainCircuit,
  Languages,
  Smartphone
};

interface AcademyCardProps {
  academy: Academy;
}

export const AcademyCard: React.FC<AcademyCardProps> = ({ academy }) => {
  const Icon = ICON_MAP[academy.icon] || BrainCircuit;

  return (
    <Link href={`/${academy.id}`}>
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="group relative bg-white border border-dojo-muted p-6 transition-all duration-300 hover:border-dojo-primary overflow-hidden"
      >
        <div className="flex justify-between items-start mb-4">
          <div className={`p-3 bg-dojo-base text-dojo-primary group-hover:bg-dojo-primary group-hover:text-white transition-colors duration-300`}>
            <Icon size={24} />
          </div>
          <span className="text-xs font-sans text-dojo-muted">
            {academy.progress}% Complete
          </span>
        </div>
        
        <h3 className="font-serif text-xl mb-2 text-dojo-content group-hover:text-dojo-primary transition-colors">
          {academy.title}
        </h3>
        
        <p className="text-sm text-dojo-muted line-clamp-2 leading-relaxed">
          {academy.description}
        </p>

        <div className="mt-6 h-1 w-full bg-dojo-base overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${academy.progress}%` }}
            className="h-full bg-dojo-primary/30"
          />
        </div>
      </motion.div>
    </Link>
  );
};
