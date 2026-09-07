export interface ProjectData {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  category: string;
  year: string;
  role: string;
  client: string;
  stack: string[];
  description: string;
  metrics: { label: string; value: string }[];
  accentColor?: string;
  dark?: boolean;
}

export interface ExperimentItem {
  id: string;
  number: string;
  title: string;
  category: string;
  date: string;
  description: string;
  status: 'STABLE' | 'ALPHA' | 'PROTOTYPE' | 'ACTIVE';
  interactiveType: 'canvas' | 'typography' | 'particles' | 'audio';
}

export type CursorMode = 'default' | 'view' | 'drag' | 'open' | 'enter' | 'close' | 'explore';
