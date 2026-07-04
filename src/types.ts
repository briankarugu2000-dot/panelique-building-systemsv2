export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  projectType: string;
  wallArea: number; // in sq meters
  calculatedPanels: number;
  calculatedCost: number;
  estimatedDaysSaved: number;
  energySavingsYearly: number;
  drawingsFileName?: string;
  submittedAt: string;
}

export interface ComparisonPoint {
  id: string;
  number: string;
  title: string;
  traditionalDesc: string;
  traditionalImg: string;
  cmaxDesc: string;
  cmaxImg: string;
  iconName: string;
}

export interface Product {
  id: string;
  categoryNumber: string;
  title: string;
  description: string;
  iconName: string;
  specifications: {
    label: string;
    value: string;
  }[];
  benefits: string[];
}
