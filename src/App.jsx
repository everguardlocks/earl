import { useState } from 'react'
import Landing from './screens/Landing'
import Shell from './components/Shell'
import MissionView from './components/MissionView'
import { storage } from './lib/storage'
import { DOMAINS, UNLOCK_CHAIN } from './data/curriculum'

export default function App() {
  const [phase, setPhase] = useState(storage.isOnboarded() ? 'shell' : 'landing')
  const [activeChapter, setActiveChapter] = useState(null)
  const [initialPage, setInitialPage] = useState(26)

  const handleNodeClick = (nodeId) => {
    const domain = DOMAINS[0]
    const node = domain.nodes.find(n => n.id === nodeId)
    setInitialPage(node ? node.pdfPages[0] : 26)
    setActiveChapter(nodeId)
  }

  const handleChapterComplete = (chapterId) => {
    const toUnlock = UNLOCK_CHAIN[chapterId] || []
    const current = JSON.parse(localStorage.getItem('earl_unlocked') || '[]')
    const updated = [...new Set([...current, chapterId, ...toUnlock])]
    localStorage.setItem('earl_unlocked', JSON.stringify(updated))
  }

  if (phase === 'landing') return <Landing onComplete={() => setPhase('shell')} />

  if (activeChapter) return (
    <div style={{ position:'fixed', inset:0, background:'var(--bg)' }}>
      <nav style={{ position:'absolute', top:0, left:0, right:0, height:54, display:'flex', alignItems:'center', justifyContent:'space-between', padding:'0 28px', background:'rgba(12,9,7,0.88)', backdropFilter:'blur(12px)', borderBottom:'1px solid var(--bdr)', zIndex:60 }}>
        <div style={{ fontFamily:'var(--fd)', fontSize:18, fontWeight:700, letterSpacing:'0.12em', color:'var(--al)' }}>Earl</div>
        <button onClick={() => setActiveChapter(null)} style={{ background:'none', border:'none', color:'var(--t3)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', cursor:'pointer' }}>← Back to map</button>
      </nav>
      <div style={{ position:'absolute', top:54, bottom:0, left:0, right:0 }}>
        <MissionView initialPage={initialPage} onChapterComplete={handleChapterComplete} />
      </div>
    </div>
  )

  return (
    <Shell
      onReset={() => { storage.reset(); setPhase('landing') }}
      returning={true}
      onNodeClick={handleNodeClick}
    />
  )
}
