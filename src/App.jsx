import { useRef, useState, useEffect } from 'react';
import './App.css';

function App() {
  // State to track if we are currently drawing
  const [isDrawing, setIsDrawing] = useState(false);
  const [calcFourier, drawFourier] = useState(false);
  const canvasRef = useRef(null);
  const contextRef = useRef(null);



  // Setup our canvas and its drawing context when the component mounts
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const context = canvas.getContext("2d");
    context.strokeStyle = "white";    // Set drawing color to white
    context.lineJoin = "round";       // Round line joints for smoother drawing
    context.lineWidth = 5;            // Set line width for drawing
    context.lineCap = 'round';        // Round line ends for smoother drawing

    contextRef.current = context;
  }, []);

  // Start the drawing when the mouse is pressed
  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
  };

  // Draw on the canvas as the mouse moves
  const draw = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
  };

  // Finish drawing when the mouse is released
  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  return (
    // <button
    //   style={{
    //     position: 'absolute',
    //     top: 0,
    //     left: 0,
    //     zIndex: 10,
    //   }}
    //   >
    //   Save & Clear
    // </button>
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
      style={{ display: 'block' }}
    />
  );
}

export default App;
