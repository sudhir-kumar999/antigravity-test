import React from 'react';
import { Eraser, Trash2 } from 'lucide-react';

const COLORS = [
  '#000000', '#FF3B30', '#4CD964', '#007AFF', 
  '#FFCC00', '#FF2D55', '#5AC8FA', '#FF9500', 
  '#5856D6', '#A2845E', '#8E8E93', '#FFFFFF'
];
const SIZES = [2, 5, 10, 20];

const Toolbar = ({ color, setColor, brushSize, setBrushSize, onClear }) => {
  return (
    <div className="bg-white p-3 rounded-2xl shadow-lg border border-gray-100 flex items-center gap-6">
      
      {/* Colors Grid */}
      <div className="grid grid-cols-6 gap-2">
        {COLORS.map(c => (
          <button
            key={c}
            className={`w-8 h-8 rounded-full border-2 transition-transform transform hover:scale-110 ${color === c ? 'border-indigo-600 scale-125 shadow-md z-10' : 'border-gray-200'}`}
            style={{ backgroundColor: c }}
            onClick={() => setColor(c)}
            title={c}
          />
        ))}
      </div>
      
      <div className="w-px h-12 bg-gray-200"></div>

      {/* Brush Sizes */}
      <div className="flex items-center gap-3">
        {SIZES.map(s => (
          <button
            key={s}
            className={`flex items-center justify-center w-10 h-10 rounded-full transition-transform hover:scale-110 ${brushSize === s ? 'bg-indigo-100 border-2 border-indigo-500 box-border' : 'bg-gray-100 border border-transparent'}`}
            onClick={() => setBrushSize(s)}
            title={`${s}px brush`}
          >
            <div className="rounded-full bg-gray-800" style={{ width: s, height: s }}></div>
          </button>
        ))}
      </div>

      <div className="w-px h-12 bg-gray-200"></div>

      {/* Tools */}
      <div className="flex gap-2">
         <button
            title="Eraser"
            className={`p-3 rounded-xl transition-colors border-2 ${color === '#FFFFFF' ? 'bg-indigo-100 border-indigo-500 text-indigo-700' : 'bg-gray-50 hover:bg-gray-100 border-transparent text-gray-500'}`}
            onClick={() => setColor('#FFFFFF')}
          >
           <Eraser className="w-6 h-6" />
          </button>
         <button
            title="Clear Canvas"
            className="p-3 bg-red-50 hover:bg-red-100 text-red-600 border-2 border-transparent hover:border-red-200 rounded-xl transition-all"
            onClick={onClear}
          >
            <Trash2 className="w-6 h-6"/>
          </button>
      </div>

    </div>
  );
};

export default Toolbar;
