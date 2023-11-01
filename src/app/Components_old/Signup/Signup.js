import "./Signup.css";
import { useEffect, useRef } from "react";

export const Signup = ({ setOpenSignUp }) => {
  const signupRef = useRef(null);

  useEffect(() => {
    // Define a function to handle clicks outside the signup modal
    function handleClickOutside(event) {
      if (signupRef.current && !signupRef.current.contains(event.target)) {
        setOpenSignUp(false);
      }
    }

    // Add a click event listener to the document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [setOpenSignUp]);
  

  function handleSignUp() {
    setOpenSignUp(true);
  }
  return (
    <>
      <div className="signup" ref={signupRef}>
        <div className="textBoxContainer">
          <div className="textContent">
            <p className="h2">
              <span className="welcome">Welcome</span> to Web whiteboard.
            </p>
          </div>
        </div>
        <button className="signup-button" onClick={handleSignUp}>
          Signup for free
        </button>
      </div>
    </>
  );
};
