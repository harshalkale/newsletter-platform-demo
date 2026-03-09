import React from 'react';
import { useAppContext } from '../store';
import { FileText, Plus } from 'lucide-react';

export const SidebarLeft = () => {
  const { previousNewsletters, setIsMetadataModalOpen } = useAppContext();

  return (
    <aside className="w-[260px] flex-shrink-0 border-r border-slate-200 bg-white flex flex-col h-full z-20">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center">
        <h1 className="text-lg font-bold text-slate-800">Newsletters</h1>
      </div>

      <div className="p-4 border-b border-slate-100">
        <button
          onClick={() => setIsMetadataModalOpen(true)}
          className="w-full flex items-center justify-center gap-2 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 transition-colors shadow-sm"
        >
          <Plus size={16} />
          New Newsletter
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">Previous Newsletters</h2>
        <div className="space-y-1">
          {previousNewsletters.map(nl => (
            <button
              key={nl.id}
              className="w-full flex items-start gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors text-left group"
            >
              <div className="p-2 bg-slate-100 rounded text-slate-400 group-hover:text-blue-500 group-hover:bg-blue-50 transition-colors">
                <FileText size={16} />
              </div>
              <div>
                <p className="font-medium text-sm text-slate-700 group-hover:text-blue-600 transition-colors">{nl.title}</p>
                <p className="text-xs text-slate-400">{nl.date}</p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
};
