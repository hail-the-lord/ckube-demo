import React, { useRef, useEffect, useState } from "react";
import { ListComponent } from "./ListComponent";
import { Source } from "../images/Source";
import { Destination } from "../images/Destination";
import { Datamodel } from "../images/Datamodel";
import { renderToString } from "react-dom/server";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [svg, setSvg] = useState();
  const [svgText, setSvgText] = useState();


  useEffect(() => {
    if(svg && svgText){
    const image = new Image();
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth // Adjust width as needed
    canvas.height = window.innerHeight; // Adjust height as needed

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = false;

    // Draw the SVG image
    image.src = `data:image/svg+xml;base64,${btoa(renderToString(svg))}`;
    image.onload = () => {
      context.drawImage(image, 0, 0, 100, 100);

      // Draw text beneath the SVG image
      context.font = "15px Arial"; // Set the font size and style
      context.fillStyle = "black"; // Set the text color
      context.fillText(svgText, 0, 130); // Adjust the coordinates as needed
    };}

  }, [svg, svgText]);

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "15%",
          background: "#C0BFFF",
          height: "100vh",
          borderRadius: "4px",
          position: "relative",
          padding: "15px",
          boxSizing: "border-box",
        }}
      >
        <ListComponent setSvg={setSvg} setSvgText={setSvgText}/>
      </div>
      <div
        style={{
          width: "85%",
          background: "white",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <canvas
          ref={canvasRef}
          style={{
            width: "100%",
            height: "100%",
            boxSizing: "border-box",
            border: "5px solid yellow",
          }}
        />
      </div>
    </div>
  );
};

export default CanvasComponent;
