import './App.scss';
import { useEffect, useRef, useState, Fragment } from "react"
import { verses, commentary } from "./verses"

function App() {

  const imageRef = useRef()
  const surahRef = useRef()
  const sidebarRef = useRef()
  const verseRefs = useRef([])
  const verseNumberRefs = useRef([])
  const commentaryRefs = useRef([])
  const cRef = useRef()

  const [cOpen, setCOpen] = useState(false)
  const [number, setNumber] = useState(0)

  function scroll(e) {
    imageRef.current.style.backgroundPosition = "50% " + window.pageYOffset * 0.7 + "px"
  }

  useEffect(() => {

    window.addEventListener("scroll", scroll)

    return () => {
      window.removeEventListener("scroll", scroll)
    }
  }, [])

  useEffect(() => {
    let height = window.innerHeight
    surahRef.current.style.top = `${height / 2 - 55}px`
    sidebarRef.current.style.top = `${height / 2 - 15}px`
  }, [])

  useEffect(() => {

    let currentVerse = verseRefs.current[number]
    let currentVerseNumber = verseNumberRefs.current[number]

    // set this verse to be active
    currentVerse.classList.add("active")
    currentVerseNumber.classList.add("active")

    // Move everything
    const offsetVerse = currentVerse.offsetTop + (currentVerse.getBoundingClientRect().height / 2.2)
    const offsetVerseNumber = currentVerseNumber.offsetTop

    surahRef.current.style.top = `${window.innerHeight / 2 - 30 - offsetVerse}px`
    sidebarRef.current.style.top = `${window.innerHeight / 2 - 15 - offsetVerseNumber}px`


  }, [number])


  function up(e) {
    setNumber(prev => {
      if (prev <= verses.length - 2) {
        verseRefs.current[prev].classList.remove("active")
        verseNumberRefs.current[prev].classList.remove("active")
        return prev + 1
      } else {
        return prev
      }
    })
  }

  function down(e) {
    setNumber(prev => {
      if (prev > 0) {
        verseRefs.current[prev].classList.remove("active")
        verseNumberRefs.current[prev].classList.remove("active")
        return prev - 1
      } else {
        return prev
      }
    })
  }

  function clickVerse(e, num) {
    setNumber(prev => {
      verseRefs.current[prev].classList.remove("active")
      verseNumberRefs.current[prev].classList.remove("active")
      return num
    })
  }


  function openCommentary(e) {
    const target = e.target
    if (target.classList.contains("active")) {
      cRef.current.style.height = "250px";
      setCOpen(true)
    }
  }

  function closeCommentary(e) {
    const target = e.target
    if (target.classList.contains("active")) {
      cRef.current.style.height = "0px";
      setCOpen(false)
    }
  }


  return (

    <div>

      <div className="header">
        <div className="top-image" ref={imageRef}></div>
        <span className="title">Surah 78: The Tiding</span>
      </div>

      <div className="main">

        <div className="overlay"></div>

        <div className="sidebar">

          <div className="arrow up-arrow" onClick={down}>
            <span></span>
            <span></span>
          </div>

          <div className="arrow down-arrow" onClick={up}>
            <span></span>
            <span></span>
          </div>

          <div className="verse-numbers" ref={sidebarRef}>

            {
              verses.map((el, index) => {
                return <Fragment key={index}>

                  <span ref={e => verseNumberRefs.current[index] = e} id={`verse-${index}`} onClick={e => clickVerse(e, index)}>{`Verse ${index + 1}`}</span>

                </Fragment>

              })
            }

          </div>

        </div>

        <div className="surah" ref={surahRef}>

          {
            verses.map((el, index) => {
              return <Fragment key={index}>

                <span className="verse" id={index} ref={e => verseRefs.current[index] = e} onMouseEnter={openCommentary} onMouseLeave={closeCommentary}>{el}</span>

              </Fragment>

            })
          }

        </div>

        <div className="commentary" ref={cRef}>

          {
            cOpen &&
            <span>{commentary[number]}</span>
          }

        </div>

      </div>

      <div className="footer">

        <span>&#169; Hugo Hua 2022</span>

      </div>

    </div>

  );
}

export default App;
