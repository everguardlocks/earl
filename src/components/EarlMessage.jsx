import { useEffect, useRef, useState } from 'react'

export default function EarlMessage({ text, speed = 32, onDone }) {
  const [displayed, setDisplayed] = useState('')
  const [done, setDone] = useState(false)
  const i = useRef(0)

  useEffect(() => {
    i.current = 0
    setDisplayed('')
    setDone(false)
    const iv = setInterval(() => {
      i.current++
      setDisplayed(text.slice(0, i.current))
      if (i.current >= text.length) {
        clearInterval(iv)
        setDone(true)
        if (onDone) setTimeout(onDone, 1500)
      }
    }, speed)
    return () => clearInterval(iv)
  }, [text])

  return (
    <div style={{ fontFamily:'var(--fb)', fontSize:15, lineHeight:1.88, color:'var(--t2)', whiteSpace:'pre-line', minHeight:48 }}>
      {displayed}
      {!done && <span style={{ display:'inline-block', width:2, height:14, background:'var(--a)', verticalAlign:'text-bottom', marginLeft:2, animation:'blink 1s step-end infinite' }} />}
    </div>
  )
}
