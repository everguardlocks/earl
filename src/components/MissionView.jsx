import { useState, useEffect } from 'react'
import Map from './Map'
import PDFViewer from './PDFViewer'
import CheckCard from './CheckCard'
import EarlPanel from './EarlPanel'
import EarlMessage from './EarlMessage'
import { getChapter } from '../data/curriculum'

export default function MissionView({ chapterId, onChapterComplete }) {
  const [chapter, setChapter] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
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
    setTimeout(() => onChapterComplete(chapter.unlocks), 3000)
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'200px 1fr 300px', height:'100%', overflow:'hidden', position:'relative' }}>

      {/* LEFT — Living Map */}
      <div style={{ borderRight:'1px solid var(--bdr)', background:'var(--bg2)', padding:'18px 12px', overflow:'hidden', display:'flex', flexDirection:'column', gap:12 }}>
        <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.17em', textTransform:'uppercase', color:'var(--t3)' }}>Living Map</div>
        <div style={{ flex:1, minHeight:0, overflow:'hidden' }}>
          <Map shell={true} />
        </div>
        <div style={{ padding:'10px 12px', background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:6, flexShrink:0 }}>
          <div style={{ fontFamily:'var(--fm)', fontSize:9, color:'var(--t3)', letterSpacing:'0.12em', textTransform:'uppercase', marginBottom:4 }}>{chapter.chapterLabel}</div>
          <div style={{ fontFamily:'var(--fd)', fontSize:14, color:'var(--al)', fontWeight:600, lineHeight:1.3 }}>{chapter.title}</div>
        </div>
      </div>

      {/* CENTER — PDF Viewer */}
      <div style={{ height:'100%', overflow:'hidden', borderRight:'1px solid var(--bdr)' }}>
        <PDFViewer chapterId={chapterId} onPageChange={setCurrentPage} />
      </div>

      {/* RIGHT — Earl Panel */}
      <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

        {/* Chapter header */}
        <div style={{ padding:'14px 18px', borderBottom:'1px solid var(--bdr)', background:'var(--bg2)', flexShrink:0 }}>
          <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.2em', color:'var(--ad)', textTransform:'uppercase', marginBottom:4 }}>{chapter.chapterLabel}</div>
          <div style={{ fontFamily:'var(--fd)', fontSize:18, fontWeight:700, color:'var(--t)', lineHeight:1.2 }}>{chapter.title}</div>
          <div style={{ fontSize:12, color:'var(--t3)', fontStyle:'italic', marginTop:4 }}>{chapter.subtitle}</div>
        </div>

        {/* Earl panel — takes remaining space, scrolls internally */}
        <div style={{ flex:1, overflow:'hidden', minHeight:0 }}>
          <EarlPanel chapter={chapter} currentPage={currentPage} />
        </div>

        {/* Bottom section — scrolls internally, never pushes Earl up */}
        <div style={{ flexShrink:0, maxHeight:'42%', overflowY:'auto', padding:'12px 16px', borderTop:'1px solid var(--bdr)', background:'var(--bg2)' }}>

          {/* Peak moment trigger */}
          {!peakShown && (
            <button onClick={() => setPeakShown(true)} style={{ background:'none', border:'none', color:'var(--a)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.16em', textTransform:'uppercase', cursor:'pointer', marginBottom:8, display:'block' }}>
              ◉ Earl has something to say
            </button>
          )}
          {peakShown && !chapterPassed && (
            <div style={{ marginBottom:12, padding:'12px 14px', background:'var(--bg3)', border:'1px solid var(--bdrS)', borderRadius:8, fontSize:13, color:'var(--t2)', lineHeight:1.75, whiteSpace:'pre-line' }}>
              <EarlMessage text={chapter.peak_moment} speed={20} />
            </div>
          )}

          {/* Check card */}
          {!chapterPassed && (
            <CheckCard check={chapter.check} onPass={handlePass} />
          )}

          {/* Exit hook */}
          {chapterPassed && (
            <div style={{ padding:'14px 16px', background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:8, fontSize:13, color:'var(--t2)', lineHeight:1.8, whiteSpace:'pre-line', fontStyle:'italic' }}>
              <EarlMessage text={chapter.exit_hook} speed={18} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
