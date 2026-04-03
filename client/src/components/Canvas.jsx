import React, { useRef, useEffect, useState } from 'react';

const Canvas = ({ socket, currentDrawer, isDrawer, color = '#000000', brushSize = 5 }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set 800x600 logical resolution for drawing consistency
    canvas.width = 800;
    canvas.height = 600;
    
    const context = canvas.getContext('2d');
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = brushSize;
    contextRef.current = context;

    if (!socket) return;

    // Listeners for socket events
    const handleDrawLine = ({ x0, y0, x1, y1, color, size }) => {
      if (!contextRef.current) return;
      const ctx = contextRef.current;
      ctx.beginPath();
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      ctx.strokeStyle = color;
      ctx.lineWidth = size;
      ctx.stroke();
      ctx.closePath();
      
      // Restore own context
      ctx.strokeStyle = contextRef.current.strokeStyle;
      ctx.lineWidth = contextRef.current.lineWidth;
    };

    const handleClear = () => {
      if (!contextRef.current || !canvasRef.current) return;
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    };

    const handleCanvasState = (lines) => {
      handleClear();
      lines.forEach(handleDrawLine);
    };

    socket.on('draw_line', handleDrawLine);
    socket.on('clear_canvas', handleClear);
    socket.on('canvas_state', handleCanvasState);

    return () => {
      socket.off('draw_line', handleDrawLine);
      socket.off('clear_canvas', handleClear);
      socket.off('canvas_state', handleCanvasState);
    };
  }, [socket]); 

  // Update stroke styles when external props change
  useEffect(() => {
    if (contextRef.current) {
      contextRef.current.strokeStyle = color;
      contextRef.current.lineWidth = brushSize;
    }
  }, [color, brushSize]);

  const prevPos = useRef({ x: 0, y: 0 });

  const getCoordinates = (e) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    // Handle touch & mouse events
    const clientX = e.clientX || (e.touches && e.touches[0].clientX);
    const clientY = e.clientY || (e.touches && e.touches[0].clientY);

    return {
      x: (clientX - rect.left) * scaleX,
      y: (clientY - rect.top) * scaleY
    };
  };

  const startDrawing = (e) => {
    if (!isDrawer) return;
    const { x, y } = getCoordinates(e);
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    prevPos.current = { x, y };
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing || !isDrawer) return;
    
    const { x, y } = getCoordinates(e);
    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
    
    // Emit drawing event
    if (socket) {
      socket.emit('draw_line', {
        x0: prevPos.current.x,
        y0: prevPos.current.y,
        x1: x,
        y1: y,
        color: color,
        size: brushSize
      });
    }
    
    prevPos.current = { x, y };
  };

  const stopDrawing = () => {
    if (!isDrawer) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <div className="mb-4 bg-indigo-600 text-white px-6 py-2 rounded-full shadow font-bold tracking-wide">
        {isDrawer 
          ? '✏️ You are drawing!' 
          : `👁️ Watching ${currentDrawer || 'Someone'} draw...`}
      </div>
      <div className="relative w-full max-w-4xl border-4 border-indigo-200 rounded-xl overflow-hidden bg-white shadow-2xl">
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
          className={`w-full h-auto aspect-[4/3] touch-none ${isDrawer ? 'cursor-crosshair' : 'cursor-default'}`}
        />
        {!isDrawer && (
           // Overlay to block non-drawers from interacting
          <div className="absolute inset-0 bg-transparent z-10" /> 
        )}
      </div>
    </div>
  );
};

export default Canvas;
