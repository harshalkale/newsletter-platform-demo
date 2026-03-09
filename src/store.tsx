import React, { createContext, useContext, useState } from 'react';
import { NewsletterData, SectionData, ElementData, ElementType } from './types';

const initialSections: SectionData[] = [
  {
    id: 'hero',
    name: 'Section 1: Hero',
    backgroundColor: '#ffffff',
    backgroundImage: '',
    imageFit: 'cover',
    opacity: 100,
    heightMode: 'fixed',
    height: 400,
    padding: 40,
    elements: [
      {
        id: 'el-1',
        type: 'text',
        x: 50,
        y: 50,
        width: 600,
        height: 100,
        content: 'Sprint 42 Review',
        style: {
          fontFamily: 'Inter',
          fontSize: 48,
          fontWeight: 'bold',
          color: '#1e293b',
          textAlign: 'center'
        }
      }
    ]
  }
];

interface AppState {
  mode: 'edit' | 'preview' | 'code';
  setMode: (mode: 'edit' | 'preview' | 'code') => void;
  newsletter: NewsletterData;
  setNewsletter: React.Dispatch<React.SetStateAction<NewsletterData>>;
  sections: SectionData[];
  setSections: React.Dispatch<React.SetStateAction<SectionData[]>>;
  selectedSectionId: string | null;
  setSelectedSectionId: (id: string | null) => void;
  selectedElementId: string | null;
  setSelectedElementId: (id: string | null) => void;
  updateElement: (sectionId: string, elementId: string, updates: Partial<ElementData>) => void;
  updateSection: (sectionId: string, updates: Partial<SectionData>) => void;
  addSection: () => void;
  addElement: (type: ElementType) => void;
  moveSectionUp: (id: string) => void;
  moveSectionDown: (id: string) => void;
  deleteSection: (id: string) => void;
  deleteElement: (sectionId: string, elementId: string) => void;
  isMetadataModalOpen: boolean;
  setIsMetadataModalOpen: (isOpen: boolean) => void;
  previousNewsletters: { id: string; title: string; date: string }[];
}

const AppContext = createContext<AppState | null>(null);

export const useAppContext = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('Missing AppProvider');
  return ctx;
};

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [mode, setMode] = useState<'edit' | 'preview' | 'code'>('edit');
  const [newsletter, setNewsletter] = useState<NewsletterData>({
    title: 'Product Engineering Sync',
    sprintName: 'Sprint 42',
    audience: 'Internal Team',
    sprintDates: 'Oct 12 - Oct 26, 2023',
    backgroundColor: '#f1f5f9'
  });
  const [sections, setSections] = useState<SectionData[]>(initialSections);
  const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
  const [isMetadataModalOpen, setIsMetadataModalOpen] = useState(false);
  const [previousNewsletters] = useState([
    { id: 'nl-3', title: 'Sprint 41 Review', date: 'Oct 12, 2023' },
    { id: 'nl-2', title: 'Sprint 40 Review', date: 'Sep 28, 2023' },
    { id: 'nl-1', title: 'Q3 Planning Update', date: 'Sep 14, 2023' },
  ]);

  const updateElement = (sectionId: string, elementId: string, updates: Partial<ElementData>) => {
    setSections(prev => prev.map(sec => {
      if (sec.id !== sectionId) return sec;
      return {
        ...sec,
        elements: sec.elements.map(el => {
          if (el.id !== elementId) return el;
          return { ...el, ...updates, style: { ...el.style, ...(updates.style || {}) } };
        })
      };
    }));
  };

  const updateSection = (sectionId: string, updates: Partial<SectionData>) => {
    setSections(prev => prev.map(sec => {
      if (sec.id !== sectionId) return sec;
      return { ...sec, ...updates };
    }));
  };

  const addSection = () => {
    const newSection: SectionData = {
      id: `section-${Date.now()}`,
      name: `Section ${sections.length + 1}`,
      backgroundColor: '#ffffff',
      backgroundImage: '',
      imageFit: 'cover',
      opacity: 100,
      heightMode: 'fixed',
      height: 400,
      padding: 40,
      elements: []
    };
    setSections(prev => [...prev, newSection]);
    setSelectedSectionId(newSection.id);
    setSelectedElementId(null);
  };

  const addElement = (type: ElementType) => {
    const targetSectionId = selectedSectionId || sections[0]?.id;
    if (!targetSectionId) return;
    
    const newElement: ElementData = {
      id: `el-${Date.now()}`,
      type,
      x: 50,
      y: 50,
      width: type === 'shape' ? 100 : 300,
      height: type === 'shape' ? 100 : type === 'text' ? 50 : 200,
      content: type === 'text' ? 'New Text' : type === 'image' ? '' : '',
      style: {
        fontFamily: 'Inter',
        fontSize: 16,
        color: '#000000',
        backgroundColor: type === 'shape' ? '#e2e8f0' : 'transparent',
        textAlign: 'left'
      }
    };
    
    setSections(prev => prev.map(sec => {
      if (sec.id === targetSectionId) {
        return { ...sec, elements: [...sec.elements, newElement] };
      }
      return sec;
    }));
    setSelectedElementId(newElement.id);
    setSelectedSectionId(targetSectionId);
  };

  const moveSectionUp = (id: string) => {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx <= 0) return prev;
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
  };

  const moveSectionDown = (id: string) => {
    setSections(prev => {
      const idx = prev.findIndex(s => s.id === id);
      if (idx === -1 || idx === prev.length - 1) return prev;
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
  };

  const deleteSection = (id: string) => {
    setSections(prev => prev.filter(s => s.id !== id));
    if (selectedSectionId === id) {
      setSelectedSectionId(null);
      setSelectedElementId(null);
    }
  };

  const deleteElement = (sectionId: string, elementId: string) => {
    setSections(prev => prev.map(sec => {
      if (sec.id !== sectionId) return sec;
      return { ...sec, elements: sec.elements.filter(e => e.id !== elementId) };
    }));
    if (selectedElementId === elementId) {
      setSelectedElementId(null);
    }
  };

  return (
    <AppContext.Provider value={{
      mode, setMode,
      newsletter, setNewsletter,
      sections, setSections,
      selectedSectionId, setSelectedSectionId,
      selectedElementId, setSelectedElementId,
      updateElement, updateSection,
      addSection, addElement,
      moveSectionUp, moveSectionDown,
      deleteSection, deleteElement,
      isMetadataModalOpen, setIsMetadataModalOpen,
      previousNewsletters
    }}>
      {children}
    </AppContext.Provider>
  );
};
