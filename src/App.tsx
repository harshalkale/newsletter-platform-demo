/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { AppProvider, useAppContext } from './store';
import { SidebarLeft } from './components/SidebarLeft';
import { SidebarRight } from './components/SidebarRight';
import { Canvas } from './components/Canvas';
import { X } from 'lucide-react';

const MetadataModal = () => {
  const { isMetadataModalOpen, setIsMetadataModalOpen, newsletter, setNewsletter } = useAppContext();

  if (!isMetadataModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-slate-800">Newsletter Details</h3>
          <button onClick={() => setIsMetadataModalOpen(false)} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Title</label>
            <input
              type="text"
              value={newsletter.title}
              onChange={e => setNewsletter({ ...newsletter, title: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Sprint Name</label>
            <input
              type="text"
              value={newsletter.sprintName}
              onChange={e => setNewsletter({ ...newsletter, sprintName: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Audience</label>
            <input
              type="text"
              value={newsletter.audience}
              onChange={e => setNewsletter({ ...newsletter, audience: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Dates</label>
            <input
              type="text"
              value={newsletter.sprintDates}
              onChange={e => setNewsletter({ ...newsletter, sprintDates: e.target.value })}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={() => setIsMetadataModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 rounded-md transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => setIsMetadataModalOpen(false)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors shadow-sm"
          >
            Save Details
          </button>
        </div>
      </div>
    </div>
  );
};

const AppContent = () => {
  return (
    <div className="h-screen w-screen flex overflow-hidden font-sans text-slate-900 bg-slate-100">
      <SidebarLeft />
      <Canvas />
      <SidebarRight />
      <MetadataModal />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

