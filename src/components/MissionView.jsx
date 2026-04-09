import { useState, useEffect } from 'react'
import PDFViewer from './PDFViewer'
import CheckCard from './CheckCard'
import EarlPanel from './EarlPanel'
import EarlMessage from './EarlMessage'
import JourneyOrb from './JourneyOrb'
import { getChapterFromPage, getChapter } from '../data/curriculum'

const UNLOCK_CHAIN = {
  'linux-01': ['linux-02', 'linux-03'],
  'linux-02': ['linux-04'],
  'linux-03': ['linux-04'],
  'linux-04': ['linux-05'],
  'linux-05': ['linux-06'],
  'linux-06': ['linux-07'],
  'linux-07': ['linux-08'],
  'linux-08': ['linux-09'],
  'linux-09': ['linux-10'],
  'linux-10': [],
}

export default function MissionView({ initialPage, onChapterComplete }) {
  const [currentPage, setCurrentPage] = useState(initialPage || 1)
  const [chapter, setChapter] = useState(null)
  const [peakShown, setPeakShown] = useState(false)
  const [chapterPassed, setChapterPassed] = useState(false)
  const [showCheck, setShowCheck] = useState(false)
  const [selectedText, setSelectedText] = useState('')
  const [passedChapters, setPassedChapters] = useState(
    JSON.parse(localStorage.getItem('earl_unlocked') || '[]')
  )

  // Derive chapter from page — updates automatically
  useEffect(() => {
    const chapterId = getChapterFromPage(currentPage)
    if (!chapterId) return

    getChapter(chapterId).then(ch => {
      if (ch && ch.id !== chapter?.id) {
        setChapter(ch)
        setPeakShown(false)
        setShowCheck(false)
        setChapterPassed(passedChapters.includes(chapterId))
      }
    })
  }, [currentPage])

  const handlePass = () => {
    if (!chapter) return
    const chapterId = chapter.id
    const toUnlock = UNLOCK_CHAIN[chapterId] || []
    const current = JSON.parse(localStorage.getItem('earl_unlocked') || '[]')
    const updated = [...new Set([...current, chapterId, ...toUnlock])]
    localStorage.setItem('earl_unlocked', JSON.stringify(updated))
    setPassedChapters(updated)
    setChapterPassed(true)
    if (onChapterComplete) onChapterComplete(chapterId)
  }

  return (
    <div style={{ display:'grid', gridTemplateColumns:'1fr 320px', height:'100%', overflow:'hidden', position:'relative' }}>

      {/* CENTER — PDF Viewer */}
      <div style={{ height:'100%', overflow:'hidden', borderRight:'1px solid var(--bdr)' }}>
        <PDFViewer initialPage={initialPage} onPageChange={setCurrentPage} onTextSelect={setSelectedText} />
      </div>

      {/* RIGHT — Earl */}
      <div style={{ display:'flex', flexDirection:'column', height:'100%', overflow:'hidden' }}>

        {/* Chapter header */}
        <div style={{ flexShrink:0, padding:'14px 18px', borderBottom:'1px solid var(--bdr)', background:'var(--bg2)' }}>
          {chapter ? (
            <>
              <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.2em', color:'var(--ad)', textTransform:'uppercase', marginBottom:4 }}>{chapter.chapterLabel}</div>
              <div style={{ fontFamily:'var(--fd)', fontSize:17, fontWeight:700, color:'var(--t)', lineHeight:1.2 }}>{chapter.title}</div>
              {!chapterPassed && (
                <button onClick={() => setShowCheck(true)} style={{
                  background:'none', border:'none', color:'var(--t3)',
                  fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.13em',
                  textTransform:'uppercase', cursor:'pointer', marginTop:6,
                  display:'block', transition:'color 0.2s'
                }}>
                  Ready to be tested →
                </button>
              )}
              {chapterPassed && (
                <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.13em', color:'var(--ad)', textTransform:'uppercase', marginTop:6 }}>✓ Complete</div>
              )}
            </>
          ) : (
            <>
              <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.2em', color:'var(--ad)', textTransform:'uppercase', marginBottom:4 }}>The Linux Command Line</div>
              <div style={{ fontFamily:'var(--fd)', fontSize:17, fontWeight:700, color:'var(--t)', lineHeight:1.2 }}>Introduction</div>
              <div style={{ fontFamily:'var(--fb)', fontSize:12, color:'var(--t3)', marginTop:6, lineHeight:1.5 }}>Navigate to page 26 to begin Chapter 1.</div>
            </>
          )}
        </div>

        {/* Earl messages — flex 1 */}
        <div style={{ flex:1, overflow:'hidden', minHeight:0 }}>
          <EarlPanel chapter={chapter} currentPage={currentPage} selectedText={selectedText} onClearSelection={() => setSelectedText('')} />
        </div>

        {/* Bottom — peak + check — only when chapter exists and check triggered */}
        {chapter && (showCheck || peakShown || chapterPassed) && (
          <div style={{ flexShrink:0, maxHeight:'44%', overflowY:'auto', borderTop:'1px solid var(--bdr)', background:'var(--bg2)', padding:'12px 16px' }}>

            {!peakShown && !chapterPassed && (
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
