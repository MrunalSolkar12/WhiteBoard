"use client";
import * as React from "react";
import { useState, useRef, useEffect } from "react";
import { ReactSketchCanvas } from "react-sketch-canvas";
import SideBar from "./SideBar";
import { FeedBack } from "./Feedback/feedback";
import { Signup } from "./Signup/Signup";
import { CanvasExport } from "./CanvasExport/CanvasExport";
import { UserContext } from "../Context/context";
import { useContext } from "react";
import Layout from "./Layout";
import { GraphPaper } from "./GraphPaper/GraphPaper";
import { Slim } from "./GraphPaper/Slim";
import { ShareBoard } from "./ShareBoard/ShareBoard";
import { GithubPicker, TwitterPicker, SketchPicker } from "react-color";
import { SignupPage } from "./Signup/SignupPage";

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

export const NewCanvas = () => {
  const [isEraserMode, setEraserMode] = useState(false);
  const [isConfetti, setConfetti] = useState(false);
  const [strokeColors, setStrokeColors] = useState("red");
  const [displayColorPicker, setDisplayColorPicker] = useState(false);
  const [color, setColor] = useState("#F30707");
  const [isStrokeWidth, setStrokeWidth] = useState(2);
  const [openSignUp,setOpenSignUp] = useState(false);

  const UndoRef = useRef(null);
  const colorRef = useRef(null);

  const toggleUndoMode = () => {
    console.log("Undo button clicked");
    if (UndoRef.current) {
      UndoRef.current.undo();
    }
  };

  const toggleRedoMode = () => {
    console.log("Redo button clicked");
    if (UndoRef.current) {
      UndoRef.current.redo();
    }
  };

  const handleChangeComplete = (newColor) => {
    setColor(newColor.hex);
    setStrokeColors(newColor.hex);
  };

  // USEEFFECT IS USED TO  COLOR PALETTE WHEN CLICKED OUTSIDE OF IT.
  useEffect(() => {
    const handleOutsideClick = (event) => {
      //console.log("2:::",event.target);
      //console.log("1::",colorRef.current.contains(event.target));
      if (colorRef.current && !colorRef.current.contains(event.target)) {
        setDisplayColorPicker(false);
      }
    };

    if (displayColorPicker) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [displayColorPicker]);

  console.log("EraseMode", isEraserMode);

  const { state } = useContext(UserContext);
  console.log("canvas pencil", state);
  return (
    <>
      <Layout>
        <div style={{ position: "relative" }}>
          <ReactSketchCanvas
            ref={UndoRef}
            style=""
            width={window.innerWidth}
            height={window.innerHeight}
            strokeWidth={isEraserMode ? 20 : isStrokeWidth} // Adjust strokeWidth for eraser mode
            strokeColor={isEraserMode ? "#F7F7F7" : strokeColors} // Set stroke color to white for eraser mode
            onMouseDown={false}
            canvasColor="#F7F7F7"
            eraserWidth="30"
            //backgroundImage="https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg"
          />
        </div>
        <div style={{ position: "absolute", top: 0, left: 0 }}>
          <Signup setOpenSignUp={setOpenSignUp}/>
          <CanvasExport />
          <ShareBoard setConfetti={setConfetti} />
          <SideBar
            color={color}
            setDisplayColorPicker={setDisplayColorPicker}
            setStrokeColors={setStrokeColors}
            setEraserMode={setEraserMode}
            toggleUndoMode={toggleUndoMode}
            toggleRedoMode={toggleRedoMode}
            setStrokeWidth={setStrokeWidth}
          />
          <FeedBack />
          { openSignUp &&
              <SignupPage/>
          }
          {displayColorPicker && (
            <div ref={colorRef} style={{cursor:"default"}}>
              <SketchPicker
                className="sketchpicker"
                color={color}
                onChange={handleChangeComplete}
              />
            </div>
          )}
          {isConfetti ? <GraphPaper /> : ""}
        </div>
      </Layout>
    </>
  );
};
