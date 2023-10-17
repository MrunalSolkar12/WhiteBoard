"use client";
import { useState, useRef } from "react";
import { UserContext } from "../Context/context";
import { useContext } from "react";
import Image from "next/image";
import "./Sidebar.css";
import customCursor from "../../../public/images/pencilcursor.png";

export default function SideBar({
  setEraserMode,
  toggleUndoMode,
  toggleRedoMode,
}) {
  const [isClicked, setisClicked] = useState(false);

  const { dispatch } = useContext(UserContext);
  // const customCursorImage = "whiteboard-app//public//images//pencilcursor.png";

  function handleClickArrow() {
    document.body.style.cursor = "pointer";
    setEraserMode(true);
  }

  function handleClickPen() {
    // document.body.style.cursor = `url("https://cdn-icons-png.flaticon.com/128/483/483907.png") , auto`;
    document.body.style.cursor = "url(https://i.ibb.co/brhhfs6/pencil20x20.png),auto";
    //document.style.cursor.width="10px";
    //document.style.height="10px"
    //document.body.style.cursor = "grab";
    dispatch({ type: "USER", payload: true });
    setEraserMode(false);
  }

  function handleClickShapes() {
    document.body.style.cursor =
      "url(https://i.ibb.co/kyV4Npc/eraser20x20.png),auto";
    setEraserMode(true);
  }

  function handleClickText() {
    document.body.style.cursor = "text";
  
  }

  return (
    <>
      <div>
        <div className="sidebar">
          <ul>
            <li>
              <button
                data-tooltip="Select"
                data-flow="right"
                onClick={handleClickArrow}
                className="ml-1.5"
              >
                <Image
                  src="/images/cursor.png" // Path to your logo image in the "public" directory
                  alt="cursor"
                  width={25} // Specify the desired width
                  height={25} // Specify the desired height
                />
              </button>
            </li>
            <li>
              <button
                data-tooltip="Pen"
                data-flow="right"
                onClick={handleClickPen}
                className="ml-1"
              >
                <Image
                  src="/images/pencil.png" // Path to your logo image in the "public" directory
                  alt="shapes"
                  width={25} // Specify the desired width
                  height={25} // Specify the desired height
                />
              </button>
            </li>
            <li>
              <button
                data-tooltip="Eraser"
                data-flow="right"
                onClick={handleClickShapes}
                className="ml-1"
              >
                <Image
                  src="/images/eraser.png" // Path to your logo image in the "public" directory
                  alt="shapes"
                  width={25} // Specify the desired width
                  height={25} // Specify the desired height
                />
              </button>
            </li>
            <li>
              <button
                data-tooltip="Text"
                data-flow="right"
                onClick={handleClickText}
                className="ml-1.5"
              >
                <Image
                  src="/images/font.png" // Path to your logo image in the "public" directory
                  alt="shapes"
                  width={30} // Specify the desired width
                  height={30} // Specify the desired height
                />
              </button>
            </li>
          </ul>
        </div>

        <div className="sidebar2 mt-10">
          <ul>
            <li>
              <button
                data-tooltip="Undo"
                data-flow="right"
                onClick={toggleUndoMode}
              >
                <Image
                  src="/images/undo.png" // Path to your logo image in the "public" directory
                  alt="shapes"
                  width={25} // Specify the desired width
                  height={25} // Specify the desired height
                />
              </button>
            </li>
            <li>
              <button
                data-tooltip="Redo"
                data-flow="right"
                onClick={toggleRedoMode}
              >
                <Image
                  src="/images/redo.png" // Path to your logo image in the "public" directory
                  alt="shapes"
                  width={25} // Specify the desired width
                  height={25} // Specify the desired height
                />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
