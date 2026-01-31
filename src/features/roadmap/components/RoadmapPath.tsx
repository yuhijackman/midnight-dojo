'use client';

import React from 'react';
import { type RoadmapNode } from '../data/mockData';
import { NodeItem } from './NodeItem';

interface RoadmapPathProps {
  nodes: RoadmapNode[];
  onNodeClick: (node: RoadmapNode) => void;
}

export const RoadmapPath: React.FC<RoadmapPathProps> = ({ nodes, onNodeClick }) => {
  return (
    <div className="relative py-20 flex flex-col items-center">
      {/* Zen ripples background decoration (simplified) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden flex justify-center">
        <div className="w-px h-full bg-gradient-to-b from-transparent via-dojo-muted/20 to-transparent" />
        {/* Horizontal ripples */}
        {[1, 2, 3, 4, 5].map((i) => (
          <div 
            key={i} 
            className="absolute border border-dojo-muted/5 rounded-full"
            style={{ 
              width: `${i * 300}px`, 
              height: `${i * 300}px`, 
              top: `${i * 400}px`,
              opacity: 0.1 - (i * 0.01)
            }}
          />
        ))}
      </div>

      <div className="relative z-10 space-y-0">
        {nodes.sort((a, b) => a.position - b.position).map((node, index) => (
          <NodeItem 
            key={node.id} 
            node={node} 
            isLast={index === nodes.length - 1} 
            onClick={onNodeClick}
          />
        ))}
      </div>
    </div>
  );
};
