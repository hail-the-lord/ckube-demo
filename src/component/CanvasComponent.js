import React, { useEffect, useRef, useState } from 'react';
import data from '../utilities/data.json';

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [allKeys, setAllKeys] = useState([]);

  useEffect(() => {
    const keys = Object.keys(data);
    setAllKeys(keys);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (allKeys) {
      let startY = 50;

      allKeys.forEach((key) => {
        // Set up separate sections for endpoints and data-models
        if (key === 'endpoints' || key === 'Data-models') {
          drawSection(ctx, data[key], key, startY);
          // Adjust startY for the next section
          startY += 150;
        }
      });
    }
  }, [allKeys]);

  const drawSection = (ctx, items, sectionName, startY) => {
    let startX = 50;

    // Draw heading
    ctx.fillStyle = 'black';
    ctx.font = 'bold 16px Arial';
    ctx.fillText(sectionName, startX, startY);

    // Draw shapes based on the type
    items.forEach((item) => {
      const color = getColor(item.name);
      let shapeType;

      // Set shape type based on section
      if (sectionName === 'endpoints') {
        shapeType = item.type === 'source' ? 'rectangle' : 'circle';
      } else if (sectionName === 'Data-models') {
        shapeType = 'triangle';
      }

      if (shapeType === 'rectangle') {
        drawRectangle(ctx, startX, startY + 20, color);
      } else if (shapeType === 'circle') {
        drawCircle(ctx, startX, startY + 20, color);
      } else if (shapeType === 'triangle') {
        drawTriangle(ctx, startX, startY + 20, color);
      }

      // Draw name below the shape
      ctx.fillStyle = 'black';
      ctx.fillText(item.name, startX, startY + 80);

      // Adjust the spacing for the next shape
      startX += 150;
    });
  };

  const getColor = (productName) => {
    // Implement your logic to assign colors based on product name
    // For simplicity, using a basic hash function for illustration
    const hash = productName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const color = `hsl(${hash % 360}, 50%, 50%)`;
    return color;
  };

  const drawRectangle = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 100, 50); // Adjust the dimensions as needed
  };

  const drawCircle = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x + 50, y + 25, 25, 0, 2 * Math.PI); // Adjust the radius as needed
    ctx.fill();
  };

  const drawTriangle = (ctx, x, y, color) => {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 50, y - 50);
    ctx.lineTo(x + 100, y);
    ctx.closePath();
    ctx.fill();
  };

  return <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} />;
};

export default CanvasComponent;
