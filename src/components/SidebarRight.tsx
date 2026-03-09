import React from 'react';
import { useAppContext } from '../store';
import { Trash2, ArrowUp, ArrowDown, Plus, Type, Image as ImageIcon, Square, Eye, Edit2, Code } from 'lucide-react';

export const SidebarRight = () => {
  const {
    mode,
    setMode,
    newsletter,
    setNewsletter,
    sections,
    selectedSectionId,
    selectedElementId,
    updateElement,
    updateSection,
    addSection,
    addElement,
    moveSectionUp,
    moveSectionDown,
    deleteSection,
    deleteElement
  } = useAppContext();

  const selectedSection = sections.find(s => s.id === selectedSectionId);
  const selectedElement = selectedSection?.elements.find(e => e.id === selectedElementId);

  return (
    <aside className="w-[300px] flex-shrink-0 border-l border-slate-200 bg-white flex flex-col h-full z-20">
      <div className="p-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
        <div className="flex bg-slate-200 p-1 rounded-md w-full">
          <button
            onClick={() => setMode('edit')}
            className={`flex-1 flex justify-center py-1.5 rounded text-xs font-medium ${mode === 'edit' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            title="Edit Mode"
          >
            <Edit2 size={14} className="mr-1.5" /> Edit
          </button>
          <button
            onClick={() => setMode('preview')}
            className={`flex-1 flex justify-center py-1.5 rounded text-xs font-medium ${mode === 'preview' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            title="Preview Mode"
          >
            <Eye size={14} className="mr-1.5" /> Preview
          </button>
          <button
            onClick={() => setMode('code')}
            className={`flex-1 flex justify-center py-1.5 rounded text-xs font-medium ${mode === 'code' ? 'bg-white shadow-sm text-blue-600' : 'text-slate-500 hover:text-slate-700'}`}
            title="Code Mode"
          >
            <Code size={14} className="mr-1.5" /> Code
          </button>
        </div>
      </div>

      {mode === 'edit' && (
        <div className="p-4 border-b border-slate-100">
          <h2 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-3">Add Content</h2>
          <div className="grid grid-cols-4 gap-2">
            <button
              onClick={addSection}
              className="flex flex-col items-center justify-center gap-1 p-2 border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600"
              title="Add Section"
            >
              <Plus size={16} />
              <span className="text-[10px] font-medium">Section</span>
            </button>
            <button
              onClick={() => addElement('text')}
              className="flex flex-col items-center justify-center gap-1 p-2 border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600"
              title="Add Text"
            >
              <Type size={16} />
              <span className="text-[10px] font-medium">Text</span>
            </button>
            <button
              onClick={() => addElement('image')}
              className="flex flex-col items-center justify-center gap-1 p-2 border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600"
              title="Add Image"
            >
              <ImageIcon size={16} />
              <span className="text-[10px] font-medium">Image</span>
            </button>
            <button
              onClick={() => addElement('shape')}
              className="flex flex-col items-center justify-center gap-1 p-2 border border-slate-200 rounded hover:bg-slate-50 hover:border-slate-300 transition-colors text-slate-600"
              title="Add Rect"
            >
              <Square size={16} />
              <span className="text-[10px] font-medium">Rect</span>
            </button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {mode !== 'edit' ? (
          <div className="flex flex-col items-center justify-center h-full text-slate-400 space-y-4">
            <p className="text-sm text-center">Switch to Edit mode to change properties.</p>
          </div>
        ) : selectedElement ? (
          <>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Element Properties</h2>
            {/* Element Properties */}
            {selectedElement.type === 'text' && (
              <section className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Font Family</label>
                  <select
                    value={selectedElement.style.fontFamily || 'Inter'}
                    onChange={e => updateElement(selectedSectionId!, selectedElement.id, { style: { fontFamily: e.target.value } })}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none"
                  >
                    <option value="Inter">Inter</option>
                    <option value="Roboto">Roboto</option>
                    <option value="Playfair Display">Playfair Display</option>
                    <option value="JetBrains Mono">JetBrains Mono</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Size</label>
                    <input
                      type="number"
                      value={selectedElement.style.fontSize || 16}
                      onChange={e => updateElement(selectedSectionId!, selectedElement.id, { style: { fontSize: Number(e.target.value) } })}
                      className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-medium text-slate-700 mb-1">Color</label>
                    <input
                      type="color"
                      value={selectedElement.style.color || '#000000'}
                      onChange={e => updateElement(selectedSectionId!, selectedElement.id, { style: { color: e.target.value } })}
                      className="w-full h-[34px] rounded border border-slate-300 p-0.5 outline-none cursor-pointer"
                    />
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => updateElement(selectedSectionId!, selectedElement.id, { style: { fontWeight: selectedElement.style.fontWeight === 'bold' ? 'normal' : 'bold' } })}
                    className={`flex-1 py-1.5 rounded border text-sm font-bold ${selectedElement.style.fontWeight === 'bold' ? 'bg-slate-200 border-slate-300' : 'bg-white border-slate-200'}`}
                  >
                    B
                  </button>
                  <button
                    onClick={() => updateElement(selectedSectionId!, selectedElement.id, { style: { fontStyle: selectedElement.style.fontStyle === 'italic' ? 'normal' : 'italic' } })}
                    className={`flex-1 py-1.5 rounded border text-sm italic ${selectedElement.style.fontStyle === 'italic' ? 'bg-slate-200 border-slate-300' : 'bg-white border-slate-200'}`}
                  >
                    I
                  </button>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Alignment</label>
                  <div className="flex bg-slate-100 p-1 rounded">
                    {['left', 'center', 'right'].map(align => (
                      <button
                        key={align}
                        onClick={() => updateElement(selectedSectionId!, selectedElement.id, { style: { textAlign: align as any } })}
                        className={`flex-1 py-1 text-xs capitalize rounded ${selectedElement.style.textAlign === align ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                      >
                        {align}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Link Target (Section ID)</label>
                  <select
                    value={selectedElement.linkTarget || ''}
                    onChange={e => updateElement(selectedSectionId!, selectedElement.id, { linkTarget: e.target.value })}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none"
                  >
                    <option value="">None</option>
                    {sections.map(s => (
                      <option key={s.id} value={s.id}>{s.name} ({s.id})</option>
                    ))}
                  </select>
                </div>
              </section>
            )}

            {selectedElement.type === 'image' && (
              <section className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Image URL</label>
                  <input
                    type="text"
                    placeholder="https://..."
                    value={selectedElement.content}
                    onChange={e => updateElement(selectedSectionId!, selectedElement.id, { content: e.target.value })}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none mb-2"
                  />
                  <div className="text-xs text-slate-500 text-center mb-2">OR</div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Upload Image</label>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                          updateElement(selectedSectionId!, selectedElement.id, { content: event.target?.result as string });
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              </section>
            )}

            {selectedElement.type === 'shape' && (
              <section className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Background Color</label>
                  <input
                    type="color"
                    value={selectedElement.style.backgroundColor || '#e2e8f0'}
                    onChange={e => updateElement(selectedSectionId!, selectedElement.id, { style: { backgroundColor: e.target.value } })}
                    className="w-full h-[34px] rounded border border-slate-300 p-0.5 outline-none cursor-pointer"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Border Radius</label>
                  <input
                    type="number"
                    value={selectedElement.style.borderRadius || 0}
                    onChange={e => updateElement(selectedSectionId!, selectedElement.id, { style: { borderRadius: Number(e.target.value) } })}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none"
                  />
                </div>
              </section>
            )}

            <div className="pt-6 border-t border-slate-100">
              <button
                onClick={() => deleteElement(selectedSectionId!, selectedElement.id)}
                className="flex items-center gap-2 text-red-600 hover:text-red-700 text-sm font-medium"
              >
                <Trash2 size={16} />
                Delete Element
              </button>
            </div>
          </>
        ) : selectedSection ? (
          <>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Section Properties</h2>
            {/* Section Properties */}
            <section className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Section ID</label>
                <input
                  type="text"
                  value={selectedSection.id}
                  onChange={e => updateSection(selectedSection.id, { id: e.target.value })}
                  className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none bg-slate-50"
                  disabled
                />
                <p className="text-[10px] text-slate-400 mt-1">ID is used for anchor links.</p>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Name</label>
                <input
                  type="text"
                  value={selectedSection.name}
                  onChange={e => updateSection(selectedSection.id, { name: e.target.value })}
                  className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Background Color</label>
                <input
                  type="color"
                  value={selectedSection.backgroundColor}
                  onChange={e => updateSection(selectedSection.id, { backgroundColor: e.target.value })}
                  className="w-full h-[34px] rounded border border-slate-300 p-0.5 outline-none cursor-pointer"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Background Image URL</label>
                <input
                  type="text"
                  placeholder="https://..."
                  value={selectedSection.backgroundImage}
                  onChange={e => updateSection(selectedSection.id, { backgroundImage: e.target.value })}
                  className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none mb-2"
                />
                <div className="text-xs text-slate-500 text-center mb-2">OR</div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Upload Background</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        updateSection(selectedSection.id, { backgroundImage: event.target?.result as string });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="w-full text-xs text-slate-500 file:mr-4 file:py-1 file:px-2 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Image Fit</label>
                  <select
                    value={selectedSection.imageFit}
                    onChange={e => updateSection(selectedSection.id, { imageFit: e.target.value as any })}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none"
                  >
                    <option value="cover">Cover</option>
                    <option value="contain">Contain</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Opacity (%)</label>
                  <input
                    type="number"
                    min="0" max="100"
                    value={selectedSection.opacity}
                    onChange={e => updateSection(selectedSection.id, { opacity: Number(e.target.value) })}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-700 mb-1">Height Mode</label>
                <div className="flex bg-slate-100 p-1 rounded">
                  {['auto', 'fixed'].map(hm => (
                    <button
                      key={hm}
                      onClick={() => updateSection(selectedSection.id, { heightMode: hm as any })}
                      className={`flex-1 py-1 text-xs capitalize rounded ${selectedSection.heightMode === hm ? 'bg-white shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      {hm}
                    </button>
                  ))}
                </div>
              </div>

              {selectedSection.heightMode === 'fixed' && (
                <div>
                  <label className="block text-xs font-medium text-slate-700 mb-1">Height (px)</label>
                  <input
                    type="number"
                    value={selectedSection.height}
                    onChange={e => updateSection(selectedSection.id, { height: Number(e.target.value) })}
                    className="w-full rounded border border-slate-300 px-2 py-1.5 text-sm outline-none"
                  />
                </div>
              )}
            </section>

            <div className="pt-6 border-t border-slate-100 space-y-3">
              <div className="flex gap-2">
                <button
                  onClick={() => moveSectionUp(selectedSection.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-slate-200 rounded text-sm hover:bg-slate-50"
                >
                  <ArrowUp size={14} /> Up
                </button>
                <button
                  onClick={() => moveSectionDown(selectedSection.id)}
                  className="flex-1 flex items-center justify-center gap-1 py-1.5 border border-slate-200 rounded text-sm hover:bg-slate-50"
                >
                  <ArrowDown size={14} /> Down
                </button>
              </div>
              <button
                onClick={() => deleteSection(selectedSection.id)}
                className="w-full flex items-center justify-center gap-2 py-1.5 text-red-600 hover:bg-red-50 rounded text-sm font-medium transition-colors"
              >
                <Trash2 size={16} />
                Delete Section
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-4">Page Properties</h2>
            <section className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-700 mb-2">Background Color</label>
                <div className="flex flex-wrap gap-2">
                  {['#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#fffbeb', '#f0fdf4', '#f0f9ff'].map(color => (
                    <button
                      key={color}
                      onClick={() => setNewsletter({ ...newsletter, backgroundColor: color })}
                      className={`w-6 h-6 rounded-full border ${newsletter.backgroundColor === color ? 'border-blue-500 ring-2 ring-blue-200' : 'border-slate-300'}`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </aside>
  );
};
