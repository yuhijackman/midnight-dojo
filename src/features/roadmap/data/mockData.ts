export interface Academy {
  id: string;
  title: string;
  description: string;
  themeColor: string;
  progress: number;
  icon: string;
}

export type NodeStatus = 'locked' | 'ready' | 'in_progress' | 'completed';

export interface RoadmapNode {
  id: string;
  title: string;
  description?: string;
  status: NodeStatus;
  position: number;
}

export const MOCK_ACADEMIES: Academy[] = [
  {
    id: '1',
    title: 'アルゴリズムとデータ構造',
    description: '計算機科学の基礎をマスターし、効率的なプログラムを書く技術を習得します。',
    themeColor: 'indigo',
    progress: 35,
    icon: 'BrainCircuit'
  },
  {
    id: '2',
    title: 'Practical Spanish',
    description: '日常会話からビジネスシーンまで使える実用的なスペイン語を学びます。',
    themeColor: 'rose',
    progress: 10,
    icon: 'Languages'
  },
  {
    id: '3',
    title: 'React Native Expert',
    description: 'クロスプラットフォームモバイルアプリ開発の高度なテクニックを習得。',
    themeColor: 'cyan',
    progress: 0,
    icon: 'Smartphone'
  }
];

export const MOCK_NODES: Record<string, RoadmapNode[]> = {
  '1': [
    { id: 'n1', title: 'Introduction to Algorithms', status: 'completed', position: 1000 },
    { id: 'n2', title: 'Big O Notation', status: 'in_progress', description: 'Understanding time and space complexity.', position: 2000 },
    { id: 'n3', title: 'Arrays & Strings', status: 'ready', position: 3000 },
    { id: 'n4', title: 'Two Pointers', status: 'locked', position: 4000 },
    { id: 'n5', title: 'Sliding Window', status: 'locked', position: 5000 },
    { id: 'n6', title: 'Linked Lists', status: 'locked', position: 6000 },
  ],
  '2': [
    { id: 's1', title: 'Alphabet & Pronunciation', status: 'completed', position: 1000 },
    { id: 's2', title: 'Basic Greetings', status: 'in_progress', position: 2000 },
    { id: 's3', title: 'Common Verbs', status: 'ready', position: 3000 },
  ]
};
