import './App.scss';
import { useEffect, useRef } from "react"
import { verses, commentary } from "./verses"

function App() {

  const imageRef = useRef()

  const verseRefs = useRef([])
  const verseNumberRefs = useRef([])

  function scroll(e) {
    imageRef.current.style.backgroundPosition = "50% " + window.pageYOffset * 0.7 + "px"
  }

  useEffect(() => {

    window.addEventListener("scroll", scroll)

    return () => {
      window.removeEventListener("scroll", scroll)
    }
  }, [])




  const verseVisible = (entries) => {

    const [entry] = entries
    const target = entry.target
    const id = parseInt(entry.target.id)

    if (entry.isIntersecting) {
      target.classList.add("active")
      verseNumberRefs.current[id].classList.add("active")


      // if (verseRefs.current) {
      //   if (id >= 1) {
      //     verseRefs.current[id - 1].classList.remove("active")
      //   }
      //   if (id <= verseRefs.current.length - 2) {
      //     verseRefs.current[id + 1].classList.remove("active")
      //   }
      //
      // }

    } else {
      target.classList.remove("active")
      verseNumberRefs.current[id].classList.remove("active")
    }

  }

  useEffect(() => {

    const options = {
      rootMargin: "-49.5% 0% -49.5% 0%"
    }

    const current = verseRefs.current

    const observer = new IntersectionObserver(verseVisible, options)

    if (current) {
      for (const element of current) {
        observer.observe(element)
      }
    }


    return () => {
      for (const element of current) {
        observer.unobserve(element)
      }
    }

  }, [verseRefs])


  return (

    <div>

      <div className="header">
        <div className="top-image" ref={imageRef}></div>
        <span className="title">Surah 78: The Tiding</span>
      </div>

      <div className="main">

        <div className="sidebar">

          <div className="verse-numbers">

            {
              verses.map((el, index) => {
                return <span ref={e => verseNumberRefs.current[index] = e} key={index} id={`verse-${index}`}>{`Verse ${index}`}</span>
              })
            }

          </div>

        </div>

        <div className="surah">

          {
            verses.map((el, index) => {
              return (
                <span className="verse" id={index} key={index} ref={e => verseRefs.current[index] = e}>{el}</span>
              )
            })
          }

        </div>

      </div>

      <div className="footer">

        <span>&#169; Hugo Hua</span>

      </div>

    </div>

  );
}

export default App;
