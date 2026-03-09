import React, { useState } from 'react';
import { useAppContext } from '../store';
import { ElementData } from '../types';

export const Element = ({ element, sectionId }: { element: ElementData, sectionId: string, key?: string }) => {
  const { mode, selectedElementId, setSelectedElementId, setSelectedSectionId, updateElement } = useAppContext();
  const isSelected = selectedElementId === element.id;
  const [isEditingText, setIsEditingText] = useState(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (mode === 'preview') return;
    e.stopPropagation();
    
    // If we are editing text, don't trigger drag
    if (isEditingText) return;

    setSelectedElementId(element.id);
    setSelectedSectionId(sectionId);

    const startX = e.clientX;
    const startY = e.clientY;
    const initialX = element.x;
    const initialY = element.y;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;
      updateElement(sectionId, element.id, { x: initialX + dx, y: initialY + dy });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    if (mode === 'preview') return;
    if (element.type === 'text') {
      e.stopPropagation();
      setIsEditingText(true);
    }
  };

  // Deselect text editing when clicking outside (handled by canvas/section click)
  // We can just rely on isSelected to reset it
  React.useEffect(() => {
    if (!isSelected) setIsEditingText(false);
  }, [isSelected]);

  let content = null;
  if (element.type === 'text') {
    content = mode === 'edit' && isEditingText ? (
      <textarea
        value={element.content}
        onChange={e => updateElement(sectionId, element.id, { content: e.target.value })}
        style={{
          width: '100%',
          height: '100%',
          resize: 'none',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          fontFamily: element.style.fontFamily,
          fontSize: element.style.fontSize,
          fontWeight: element.style.fontWeight,
          fontStyle: element.style.fontStyle,
          color: element.style.color,
          textAlign: element.style.textAlign,
          lineHeight: element.style.lineHeight || 1.5,
          letterSpacing: element.style.letterSpacing,
        }}
        autoFocus
        onBlur={() => setIsEditingText(false)}
      />
    ) : (
      <div
        style={{
          width: '100%',
          height: '100%',
          fontFamily: element.style.fontFamily,
          fontSize: element.style.fontSize,
          fontWeight: element.style.fontWeight,
          fontStyle: element.style.fontStyle,
          color: element.style.color,
          textAlign: element.style.textAlign,
          lineHeight: element.style.lineHeight || 1.5,
          letterSpacing: element.style.letterSpacing,
          whiteSpace: 'pre-wrap',
          cursor: element.linkTarget ? 'pointer' : 'default',
          textDecoration: element.linkTarget ? 'underline' : 'none',
        }}
        onClick={() => {
          if (mode === 'preview' && element.linkTarget) {
            document.getElementById(element.linkTarget)?.scrollIntoView({ behavior: 'smooth' });
          }
        }}
      >
        {element.content}
      </div>
    );
  } else if (element.type === 'image') {
    content = (
      <div className="w-full h-full flex flex-col pointer-events-none">
        {element.content ? (
          <img src={element.content} alt="" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-slate-200 flex items-center justify-center text-slate-400 text-sm border-2 border-dashed border-slate-300">
            No Image (Set URL or Upload in properties)
          </div>
        )}
      </div>
    );
  } else if (element.type === 'shape') {
    content = (
      <div
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: element.style.backgroundColor,
          borderRadius: element.style.borderRadius,
        }}
        className="pointer-events-none"
      />
    );
  }

  return (
    <div
      style={{
        position: 'absolute',
        left: element.x,
        top: element.y,
        width: element.width,
        height: element.height,
        zIndex: isSelected ? 30 : 20,
      }}
      className={`${mode === 'edit' && isSelected ? 'ring-2 ring-blue-500' : ''} ${mode === 'edit' && !isEditingText ? 'hover:ring-1 hover:ring-blue-300 cursor-move' : ''}`}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
    >
      {content}

      {/* Resize handles */}
      {mode === 'edit' && isSelected && !isEditingText && (
        <>
          <ResizeHandle position="se" element={element} sectionId={sectionId} />
          <ResizeHandle position="e" element={element} sectionId={sectionId} />
          <ResizeHandle position="s" element={element} sectionId={sectionId} />
        </>
      )}
    </div>
  );
};

const ResizeHandle = ({ position, element, sectionId }: { position: string, element: ElementData, sectionId: string }) => {
  const { updateElement } = useAppContext();

  const handleMouseDown = (e: React.MouseEvent) => {
    e.stopPropagation();
    const startX = e.clientX;
    const startY = e.clientY;
    const initialWidth = element.width;
    const initialHeight = element.height;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const dx = moveEvent.clientX - startX;
      const dy = moveEvent.clientY - startY;

      let newWidth = initialWidth;
      let newHeight = initialHeight;

      if (position.includes('e')) newWidth = Math.max(20, initialWidth + dx);
      if (position.includes('s')) newHeight = Math.max(20, initialHeight + dy);

      updateElement(sectionId, element.id, { width: newWidth, height: newHeight });
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  };

  const cursor = position === 'se' ? 'nwse-resize' : position === 'e' ? 'ew-resize' : 'ns-resize';

  const style: React.CSSProperties = {
    position: 'absolute',
    width: 10,
    height: 10,
    backgroundColor: 'white',
    border: '1px solid #3b82f6',
    cursor,
    zIndex: 40,
  };

  if (position === 'se') { style.right = -5; style.bottom = -5; }
  if (position === 'e') { style.right = -5; style.top = '50%'; style.marginTop = -5; }
  if (position === 's') { style.bottom = -5; style.left = '50%'; style.marginLeft = -5; }

  return <div style={style} onMouseDown={handleMouseDown} />;
};
