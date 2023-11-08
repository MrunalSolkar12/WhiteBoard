import "./ShareBoard.css";
import Image from "next/image";

export const ShareBoard = ({setConfetti}) => {

    function onClickConfetti() {
        
        setConfetti(true);
    
        setInterval(()=>{
          setConfetti(false);
        },2000);
      }
  return (
    <>
      <div className="share">
        <button className="confetti" onClick={onClickConfetti}>
          <Image
            src="/images/party.png" // Path to your logo image in the "public" directory
            alt="cursor"
            width={25} // Specify the desired width
            height={25} // Specify the desired height
          />
        </button>

        <button className="share-signup-button">
          <a href="">Share Board</a>
        </button>
      </div>
    </>
  );
};
