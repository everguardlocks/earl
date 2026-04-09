import { useState, useEffect } from 'react'
import PDFViewer from './PDFViewer'
import CheckCard from './CheckCard'
import EarlPanel from './EarlPanel'
import EarlMessage from './EarlMessage'
import JourneyOrb from './JourneyOrb'
import { getChapter } from '../data/curriculum'

export default function MissionView({ chapterId, onChapterComplete }) {
  const [chapter, setChapter] = useState(null)
  const [currentPage, setCurrentPage] = useState(1)
  const [peakShown, setPeakShown] = useState(false)
  const [chapterPassed, setChapterPassed] = useState(false)
  const [showCheck, setShowCheck] = useState(false)

  useEffect(() => {
    getChapter(chapterId).then(setChapter)
  }, [chapterId])

  // Show check card after page 5
  useEffect(() => {
    if (currentPage >= 28) setShowCheck(true)
  }, [currentPage])

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
    <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', height:'100%', overflow:'hidden', position:'relative' }}>

      {/* CENTER — PDF Viewer */}
      <div style={{ height:'100%', overflow:'hidden', borderRight:'1px solid var(--bdr)' }}>
        <PDFViewer chapterId={chapterId} onPageChange={setCurrentPage} />
      </div>

      {/* RIGHT — Earl */}
      <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

        {/* Chapter header */}
        <div style={{ flexShrink:0, padding:'14px 18px', borderBottom:'1px solid var(--bdr)', background:'var(--bg2)' }}>
          <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.2em', color:'var(--ad)', textTransform:'uppercase', marginBottom:4 }}>{chapter.chapterLabel}</div>
          <div style={{ fontFamily:'var(--fd)', fontSize:17, fontWeight:700, color:'var(--t)', lineHeight:1.2 }}>{chapter.title}</div>
          <button onClick={() => setShowCheck(true)} style={{
            background:'none', border:'none', color:'var(--t3)',
            fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.13em',
            textTransform:'uppercase', cursor:'pointer', marginTop:6,
            display:'block', transition:'color 0.2s'
          }}>
            Ready to be tested →
          </button>
        </div>

        {/* Earl messages — flex 1 */}
        <div style={{ flex:1, overflow:'hidden', minHeight:0 }}>
          <EarlPanel chapter={chapter} currentPage={currentPage} />
        </div>

        {/* Bottom — peak + check — only when unlocked */}
        {(showCheck || peakShown || chapterPassed) && (
          <div style={{ flexShrink:0, maxHeight:'44%', overflowY:'auto', borderTop:'1px solid var(--bdr)', background:'var(--bg2)', padding:'12px 16px' }}>

            {!peakShown && (
              <button onClick={() => setPeakShown(true)} style={{ background:'none', border:'none', color:'var(--a)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.16em', textTransform:'uppercase', cursor:'pointer', marginBottom:10, display:'block' }}>
                ◉ Earl has something to say
              </button>
            )}

            {peakShown && !chapterPassed && (
              <div style={{ marginBottom:12, padding:'12px 14px', background:'var(--bg3)', border:'1px solid var(--bdrS)', borderRadius:8, fontSize:13, color:'var(--t2)', lineHeight:1.75, whiteSpace:'pre-line' }}>
                <EarlMessage text={chapter.peak_moment} speed={20} />
              </div>
            )}

            {!chapterPassed && (
              <CheckCard check={chapter.check} onPass={handlePass} />
            )}

            {chapterPassed && (
              <div style={{ padding:'14px 16px', background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:8, fontSize:13, color:'var(--t2)', lineHeight:1.8, whiteSpace:'pre-line', fontStyle:'italic' }}>
                <EarlMessage text={chapter.exit_hook} speed={18} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Floating Journey Orb */}
      <JourneyOrb />
    </div>
  )
}
