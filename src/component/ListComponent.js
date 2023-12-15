import React, { useState } from "react";
import data from "../utilities/data.json";
import { Source } from "../images/Source";
import { Destination } from "../images/Destination";
import { Datamodel } from "../images/Datamodel";

export const ListComponent = ({ setSvg, setSvgText }) => {
  const [buttonClicked, setButtonClicked] = useState("source");

  const handleClick = (item) => {
    const svgImage = item.type === 'source' ? <Source/> : item.type === 'destination' ? <Destination/> : <Datamodel/> 
    setSvg(svgImage)
    setSvgText(item.name)
  }

  const handleButtonClick = (buttonType) => {
    setButtonClicked(buttonType);
  };

  const renderEndpoints = () => (
    <>
      <div style={{ display: "flex", width: "100%" }}>
        <div style={{ width: "50%" }}>
          <button
            style={{ width: "100%", height: "32px", cursor: "pointer" }}
            onClick={() => handleButtonClick("source")}
          >
            Source
          </button>
        </div>
        <div style={{ width: "50%" }}>
          <button
            style={{ width: "100%", height: "32px", cursor: "pointer" }}
            onClick={() => handleButtonClick("destination")}
          >
            Destination
          </button>
        </div>
      </div>
      <div style={{ marginTop: "15px" }}>
        {buttonClicked === "source" ? <Source /> : <Destination />}
      </div>
      <div>
        {data["endpoints"].map((item, i) => {
          return (
            item.type === buttonClicked && (
              <p
                key={i}
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(item)}
              >
                {item.name}
              </p>
            )
          );
        })}
      </div>
    </>
  );

  const renderDataModels = () => (
    <>
      <div style={{ marginTop: "15px" }}>
        <Datamodel />
      </div>
      <div>
        {data["Data-models"].map((item, i) => (
          <p key={i} style={{ cursor: "pointer" }}    onClick={() => handleClick(item)}>
            {item.name}
          </p>
        ))}
      </div>
    </>
  );

  const displayItem = Object.keys(data).map((item, i) => (
    <div key={i} style={{ minHeight: "300px" }}>
      <p>{item === "endpoints" ? "End Points" : "Data Models"}</p>
      {item === "endpoints" ? renderEndpoints() : renderDataModels()}
    </div>
  ));

  return <div>{displayItem}</div>;
};
