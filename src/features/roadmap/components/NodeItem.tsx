'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Check, Lock } from 'lucide-react';
import { cn } from '@/lib/utils'; // I'll need to create this util
import { type RoadmapNode } from '../data/mockData';

interface NodeItemProps {
  node: RoadmapNode;
  isLast: boolean;
  onClick: (node: RoadmapNode) => void;
}

export const NodeItem: React.FC<NodeItemProps> = ({ node, isLast, onClick }) => {
  const isCompleted = node.status === 'completed';
  const isInProgress = node.status === 'in_progress';
  const isLocked = node.status === 'locked';

  return (
    <div className="flex flex-col items-center">
      <motion.button
        whileHover={!isLocked ? { scale: 1.1 } : {}}
        onClick={() => !isLocked && onClick(node)}
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center transition-all duration-500 z-10",
          isCompleted && "bg-dojo-success text-white border-2 border-dojo-success",
          isInProgress && "bg-white border-4 border-dojo-highlight shadow-[0_0_15px_rgba(197,160,89,0.3)]",
          !isCompleted && !isInProgress && !isLocked && "bg-white border-2 border-dojo-muted hover:border-dojo-primary",
          isLocked && "bg-dojo-muted/20 border-2 border-dojo-muted/30 cursor-not-allowed opacity-60"
        )}
      >
        {isCompleted && <Check size={28} />}
        {isLocked && <Lock size={20} className="text-dojo-muted" />}
        {isInProgress && <div className="w-3 h-3 rounded-full bg-dojo-highlight animate-pulse" />}
      </motion.button>

      <div className="mt-4 text-center max-w-[200px]">
        <h4 className={cn(
          "font-serif text-sm font-medium",
          isLocked ? "text-dojo-muted" : "text-dojo-content"
        )}>
          {node.title}
        </h4>
      </div>

      {!isLast && (
        <div className="h-20 w-1 flex flex-col items-center">
          <div className={cn(
            "w-px h-full",
            isCompleted ? "bg-dojo-success" : "bg-dojo-muted/30"
          )} />
        </div>
      )}
    </div>
  );
};
