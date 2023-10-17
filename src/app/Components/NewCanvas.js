"use client";
import * as React from "react";
import { useState,useRef } from "react";
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

const styles = {
  border: "0.0625rem solid #9c9c9c",
  borderRadius: "0.25rem",
};

export const NewCanvas = () => {
  const [isEraserMode, setEraserMode] = useState(false);
  const [isUndoMode, setUndoMode] = useState(false);
  const [isConfetti, setConfetti] = useState(false);

  const UndoRef = useRef(null);

  const toggleUndoMode = ()=>{
    console.log("Undo button clicked"); 
    if(UndoRef.current){
      UndoRef.current.undo();
    }
  }

  const toggleRedoMode = ()=>{
    console.log("Redo button clicked"); 
    if(UndoRef.current){
      UndoRef.current.redo();
    }
  }


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
          strokeWidth={isEraserMode ? 10 : 2} // Adjust strokeWidth for eraser mode
          strokeColor={isEraserMode ? "#F7F7F7" : "red"} // Set stroke color to white for eraser mode
          onMouseDown={false}
          canvasColor="#F7F7F7"
          eraserWidth="30"
          //backgroundImage="https://upload.wikimedia.org/wikipedia/commons/7/70/Graph_paper_scan_1600x1000_%286509259561%29.jpg"
         
        />
      </div>
      <div style={{ position: "absolute", top: 0, left: 0 }}>
        <Signup />
        <CanvasExport />  
        <ShareBoard setConfetti={setConfetti}/>
        <SideBar setEraserMode={setEraserMode} toggleUndoMode={toggleUndoMode} toggleRedoMode={toggleRedoMode}/>
        <FeedBack />
        {
          isConfetti ? <GraphPaper/> : ""
        }
      </div>
      </Layout>  
    </>
  );
};
