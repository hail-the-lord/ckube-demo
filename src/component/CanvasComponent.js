import React, { useRef, useEffect, useState } from "react";
import { ListComponent } from "./ListComponent";
import { Source } from "../images/Source";
import { Destination } from "../images/Destination";
import { Datamodel } from "../images/Datamodel";
import { renderToString } from "react-dom/server";

const CanvasComponent = () => {
  const canvasRef = useRef(null);
  const [imageList, setImageList] = useState([]);
  const [coordinateList, setCordinateList] = useState([]);

  const generateUniqueCoordinates = () => {
    const randomX = Math.floor(Math.random() * 1251);
    const randomY = Math.floor(Math.random() * 530);
    return [randomX, randomY];
  };


  const fetchImage = (listItem, i, context) => {
    const image = new Image();
    const svgImage =
      listItem.type === "source" ? (
        <Source />
      ) : listItem.type === "destination" ? (
        <Destination />
      ) : (
        <Datamodel />
      );
    const svgText = listItem.name;

    image.src = `data:image/svg+xml;base64,${btoa(renderToString(svgImage))}`;

    image.onload = () => {
      context.drawImage(image, listItem.abscissa, listItem.ordinate, 100, 100);
      context.font = "15px Arial";
      context.fillStyle = "black";
      context.fillText(svgText, listItem.abscissa, listItem.ordinate + 115);
    };
  };



  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    context.clearRect(0, 0, canvas.width, canvas.height);
    context.imageSmoothingEnabled = false;

    if (imageList.length) {
      imageList.forEach((listItem, i) => {
        fetchImage(listItem, i, context);
      });
    }
  }, [imageList]);

  const addToList = (item) => {
    const [randomX, randomY] = generateUniqueCoordinates();
    const newItem = {
      ...item,
      abscissa: randomX,
      ordinate: randomY,
    };
  
    const hasCollision = imageList.some((existingItem) => {
      const horizontalCollision =
        newItem.abscissa < existingItem.abscissa + 100 &&
        newItem.abscissa + 100 > existingItem.abscissa;
  
      const verticalCollision =
        newItem.ordinate < existingItem.ordinate + 100 &&
        newItem.ordinate + 100 > existingItem.ordinate;
  
      return horizontalCollision && verticalCollision;
    });
  
    if (hasCollision) {
      addToList(item);
    } else {
      setImageList((prevItems) => [...prevItems, newItem]);
    }
  };
  


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
        <ListComponent addToList={addToList} />
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
