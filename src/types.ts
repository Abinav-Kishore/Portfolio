export interface DossierStage {
  stage: string;
  detail: string;
  status: string;
}

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
  // Per-project dossier content
  pipeline?: DossierStage[];
  notes?: string[];
}

export type CursorMode = 'default' | 'view' | 'drag' | 'open' | 'enter' | 'close' | 'explore';
