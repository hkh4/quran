import './App.scss';
import { useEffect, useRef } from "react"

function App() {

  const imageRef = useRef()

  function scroll(e) {
    imageRef.current.style.backgroundPosition = "50% " + window.pageYOffset * 0.7 + "px"
  }

  useEffect(() => {

    window.addEventListener("scroll", scroll)

    return () => {
      window.removeEventListener("scroll", scroll)
    }
  }, [])

  return (

    <div>

      <div className="header">
        <div className="top-image" ref={imageRef}></div>
        <span className="title">Surah 78: The Tiding</span>
      </div>

      <div className="main">

        <div className="sidebar"></div>

        <div className="surah"></div>

      </div>

    </div>

  );
}

export default App;
