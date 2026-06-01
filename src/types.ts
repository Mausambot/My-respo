export type Language = 'en' | 'es';

export interface Milestone {
  title_en: string;
  title_es: string;
  date: string;
  status: 'completed' | 'active' | 'pending';
}

export interface Project {
  id: string;
  name_en: string;
  name_es: string;
  location_en: string;
  location_es: string;
  status_en: string;
  status_es: string;
  progress: number;
  category: 'civil' | 'utility' | 'industrial' | 'engineering';
  budget: string;
  area: string;
  client: string;
  timeline: string;
  description_en: string;
  description_es: string;
  beforeUrl: string;
  progressUrl: string;
  afterUrl: string;
  milestones: Milestone[];
}

export interface QuoteRequest {
  clientName: string;
  clientCompany: string;
  projectType: string;
  sizeSqm: number;
  budgetRange: string;
  timelineMonths: number;
  locationState: string;
  description: string;
}

export interface Quote {
  id: string;
  clientName: string;
  clientCompany: string;
  projectType: string;
  sizeSqm: number;
  budgetRange: string;
  locationState: string;
  estimatedCostUsd: number;
  breakdown: { item_en: string; item_es: string; cost: number }[];
  date: string;
}

export interface ContactSubmission {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  projectType: string;
  budgetRange: string;
  timeline: string;
  description: string;
  date: string;
  status: 'unread' | 'read' | 'contacted';
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}
