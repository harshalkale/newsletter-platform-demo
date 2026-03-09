export type ElementType = 'text' | 'image' | 'shape';

export interface ElementStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: 'normal' | 'bold';
  fontStyle?: 'normal' | 'italic';
  color?: string;
  textAlign?: 'left' | 'center' | 'right';
  lineHeight?: number;
  letterSpacing?: number;
  backgroundColor?: string;
  borderRadius?: number;
}

export interface ElementData {
  id: string;
  type: ElementType;
  x: number;
  y: number;
  width: number;
  height: number;
  content: string; // text content or image URL
  style: ElementStyle;
  linkTarget?: string; // ID of the section to scroll to
}

export interface SectionData {
  id: string;
  name: string;
  backgroundColor: string;
  backgroundImage: string;
  imageFit: 'cover' | 'contain';
  opacity: number;
  heightMode: 'auto' | 'fixed';
  height: number;
  padding: number;
  elements: ElementData[];
}

export interface NewsletterData {
  id: string;
  title: string;
  sprintName: string;
  audience: string;
  sprintDates: string;
  backgroundColor: string;
  sections: SectionData[];
}
