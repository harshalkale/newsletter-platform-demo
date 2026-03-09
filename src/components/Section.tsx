import React from 'react';
import { useAppContext } from '../store';
import { SectionData } from '../types';
import { Element } from './Element';

export const Section = ({ section }: { section: SectionData, key?: string }) => {
  const { mode, selectedSectionId, setSelectedSectionId, setSelectedElementId } = useAppContext();
  const isSelected = selectedSectionId === section.id;

  const height = section.heightMode === 'fixed'
    ? section.height
    : Math.max(100, ...section.elements.map(e => e.y + e.height)) + section.padding;

  return (
    <div
      id={section.id}
      className={`relative w-full border-b ${mode === 'edit' && isSelected ? 'border-blue-500 ring-2 ring-blue-500 z-10' : 'border-slate-100'} ${mode === 'edit' ? 'hover:border-blue-300' : ''}`}
      style={{
        height,
        backgroundColor: section.backgroundColor,
        overflow: 'hidden'
      }}
      onClick={(e) => {
        if (mode === 'preview') return;
        e.stopPropagation();
        setSelectedSectionId(section.id);
        setSelectedElementId(null);
      }}
    >
      {/* Background Image */}
      {section.backgroundImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${section.backgroundImage})`,
            backgroundSize: section.imageFit,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            opacity: section.opacity / 100,
          }}
        />
      )}

      {/* Section Label (Edit Mode) */}
      {mode === 'edit' && (
        <div className="absolute top-0 left-0 bg-blue-500 text-white text-[10px] px-2 py-1 rounded-br z-20 opacity-0 group-hover:opacity-100 transition-opacity" style={{ opacity: isSelected ? 1 : undefined }}>
          {section.name}
        </div>
      )}

      {/* Elements */}
      {section.elements.map(el => (
        <Element key={el.id} element={el} sectionId={section.id} />
      ))}
    </div>
  );
};
