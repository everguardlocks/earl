import { useState, useEffect } from 'react'
import Map from './Map'
import ConceptBlock from './ConceptBlock'
import CheckCard from './CheckCard'
import EarlPanel from './EarlPanel'
import EarlMessage from './EarlMessage'
import { getChapter } from '../data/curriculum'

export default function MissionView({ chapterId, onChapterComplete }) {
  const [chapter, setChapter] = useState(null)
  const [peakShown, setPeakShown] = useState(false)
  const [chapterPassed, setChapterPassed] = useState(false)

  useEffect(() => {
    getChapter(chapterId).then(setChapter)
  }, [chapterId])

  if (!chapter) return (
    <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', background:'var(--bg)', color:'var(--t3)', fontFamily:'var(--fm)', fontSize:11, letterSpacing:'0.14em', textTransform:'uppercase' }}>
      Loading...
    </div>
  )

  const handlePass = () => {
    setChapterPassed(true)
    setTimeout(() => onChapterComplete(chapter.unlocks), 500)
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 280px', height:'100%', overflow:'hidden' }}>

      {/* LEFT — Living Map */}
      <div style={{ borderRight:'1px solid var(--bdr)', background:'var(--bg2)', padding:'18px 12px', overflow:'hidden', display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.17em', textTransform:'uppercase', color:'var(--t3)' }}>Living Map</div>
        <div style={{ flex:1, minHeight:0 }}>
          <Map shell={true} />
        </div>
        <div style={{ padding:'10px 12px', background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:6 }}>
          <div style={{ fontFamily:'var(--fm)', fontSize:9, color:'var(--t3)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4 }}>{chapter.chapterLabel}</div>
          <div style={{ fontFamily:'var(--fd)', fontSize:14, color:'var(--al)', fontWeight:600 }}>{chapter.title}</div>
        </div>
      </div>

      {/* CENTER — Reading panel */}
      <div style={{ overflowY:'auto', padding:'28px 36px', background:'var(--bg)' }}>
        <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.2em', color:'var(--ad)', textTransform:'uppercase', marginBottom:10 }}>{chapter.chapterLabel}</div>
        <div style={{ fontFamily:'var(--fd)', fontSize:36, fontWeight:700, color:'var(--t)', lineHeight:1.12, marginBottom:8 }}>{chapter.title}</div>
        <div style={{ fontSize:15, color:'var(--t2)', fontStyle:'italic', marginBottom:30, lineHeight:1.65 }}>{chapter.subtitle}</div>

        {chapter.concepts.map(concept => (
          <ConceptBlock key={concept.id} concept={concept} />
        ))}

        {/* Peak moment */}
        {!peakShown && (
          <button onClick={() => setPeakShown(true)} style={{ background:'none', border:'none', color:'var(--a)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.16em', textTransform:'uppercase', cursor:'pointer', margin:'24px 0 12px', display:'block' }}>
            ◉ Earl has something to say
          </button>
        )}
        {peakShown && (
          <div style={{ background:'var(--bg2)', border:'1px solid var(--bdrS)', borderRadius:8, padding:'20px 22px', margin:'20px 0', fontFamily:'var(--fb)', fontSize:15, lineHeight:1.85, color:'var(--t2)', whiteSpace:'pre-line' }}>
            <EarlMessage text={chapter.peak_moment} speed={22} />
          </div>
        )}

        {/* Check card */}
        <div style={{ marginTop:32, paddingTop:24, borderTop:'1px solid var(--bdr)' }}>
          <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.16em', color:'var(--ad)', textTransform:'uppercase', marginBottom:14 }}>Check — one question</div>
          <CheckCard check={chapter.check} onPass={handlePass} />
        </div>

        {/* Exit hook */}
        {chapterPassed && (
          <div style={{ margin:'32px 0', padding:'20px 22px', background:'var(--bg2)', border:'1px solid var(--bdr)', borderRadius:8, fontFamily:'var(--fb)', fontSize:14, color:'var(--t2)', lineHeight:1.8, whiteSpace:'pre-line', fontStyle:'italic' }}>
            <EarlMessage text={chapter.exit_hook} speed={20} />
          </div>
        )}
      </div>

      {/* RIGHT — Earl panel */}
      <EarlPanel chapter={chapter} peakShown={peakShown} />
    </div>
  )
}
