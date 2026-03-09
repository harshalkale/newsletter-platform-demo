import React from 'react';
import { useAppContext } from '../store';
import { Section } from './Section';

export const Canvas = () => {
  const { mode, newsletter, sections, setSelectedSectionId, setSelectedElementId } = useAppContext();

  if (mode === 'code') {
    return (
      <main className="flex-1 h-full overflow-y-auto bg-slate-900 p-8 text-slate-300 font-mono text-sm">
        <div className="max-w-4xl mx-auto">
          <pre>
            {JSON.stringify({ newsletter, sections }, null, 2)}
          </pre>
        </div>
      </main>
    );
  }

  return (
    <main 
      className="flex-1 h-full overflow-y-auto flex justify-center py-12 px-8"
      style={{ backgroundColor: newsletter.backgroundColor }}
      onClick={() => {
        if (mode === 'edit') {
          setSelectedSectionId(null);
          setSelectedElementId(null);
        }
      }}
    >
      <div className="w-full max-w-[800px] flex flex-col gap-0 shadow-2xl bg-white relative min-h-[800px]">
        {/* Sections */}
        <div className="flex-1 flex flex-col relative z-0">
          {sections.map(sec => (
            <Section key={sec.id} section={sec} />
          ))}
          {sections.length === 0 && mode === 'edit' && (
            <div className="flex-1 flex items-center justify-center p-20 text-slate-400 border-2 border-dashed border-slate-200 m-8 rounded-xl">
              Click "+ Section" in the properties panel to start building.
            </div>
          )}
        </div>
      </div>
    </main>
  );
};
