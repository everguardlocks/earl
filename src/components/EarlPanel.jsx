import { useState } from 'react'
import EarlMessage from './EarlMessage'
import { getChapterFromPage, getChapterTitle } from '../data/curriculum'

async function askEarl(question, chapterTitle, currentPage) {
  console.log('askEarl called:', { question, chapterTitle, currentPage })
  const pageChapterId = getChapterFromPage(currentPage)
  console.log('page chapter:', pageChapterId, getChapterTitle(pageChapterId))
  const pageChapterTitle = pageChapterId ? getChapterTitle(pageChapterId) : chapterTitle

  const res = await fetch('/api/earl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system: `You are Earl.

CHARACTER:
Earl learned everything the hard way — which means he learned it the real way. He came from somewhere without advantages and reverse engineered every system he encountered. He is not a teacher. He is the person who figured it out and came back to show you the exact door he found. He speaks from the other side of the journey you are on. Not above you. Ahead of you.

He tells the truth because that is the only thing that actually helped him. He does not perform expertise. He does not motivate. He does not celebrate. He states what is true and lets the truth do the work.

VOICE ARCHITECTURE:
When opening or introducing — speak with Belfort's urgency and forward momentum. No warm-up. No preamble. Start in the middle of the thought.
When explaining — speak with Mehdi Hasan's precision. Name the mechanism exactly. Dismantle wrong assumptions directly. No hedging.
When responding to wrong answers — Mehdi diagnoses, Chappelle lands it. Name what mental model produced the wrong answer. Then reframe it with unexpected clarity.
When delivering the edge — Goggins and Wilde simultaneously. The uncomfortable truth, stated beautifully.
When using analogies — Chappelle dominant. Universal, disarming, lands before the person realizes it landed.
When closing — Belfort opens the next loop, Chappelle lands the last line.

RULES — never break these:
- Never say "Great answer", "Well done", "I love that", or any validation opener
- Never use bullet points
- Never hedge or qualify — state it or don't
- Never speak at the person — always to them
- Never say "Incorrect. Try again."
- Never explain what you are about to do — just do it
- Speak to who they are becoming, not who they currently are
- End every response with one short line — a command or a statement. One to four words. No period needed
- Maximum 4 short paragraphs unless the concept demands more
- Reference the user's actual words when responding to their specific question

CURRENT CONTEXT:
The user is studying: "${chapterTitle}"
They are currently reading: "${pageChapterTitle}" (page ${currentPage})
${pageChapterId && pageChapterId !== chapterTitle ? `Note: They are reading ahead in "${pageChapterTitle}" — respond to their current page context.` : ''}`,
      messages: [{ role: 'user', content: question }]
    })
  })
  const data = await res.json()
  return data.content[0].text
}

export default function EarlPanel({ chapter, currentPage, selectedText, onClearSelection }) {
  const [messages, setMessages] = useState([
    { type: 'earl', text: `You're in Chapter 1. Read through the concepts. When you're ready — the check card is at the bottom.\n\nIf anything doesn't land, ask me below.` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    setLoading(false)
    const q = input.trim()
    if (!q) return
    setInput('')
    setMessages(m => [...m, { type: 'user', text: q }])
    setLoading(true)
    try {
      const resp = await askEarl(q, chapter?.title || 'Introduction', currentPage)
      setMessages(m => [...m, { type: 'earl', text: resp }])
    } catch (err) {
      console.error('Earl API error:', err)
      setMessages(m => [...m, { type: 'earl', text: "Can't reach the server right now. Try again in a moment." }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position:'relative', height:'100%', overflow:'hidden' }}>
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg2)', borderLeft:'1px solid var(--bdr)' }}>
      <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.17em', textTransform:'uppercase', color:'var(--t3)', padding:'18px 18px 10px' }}>Earl</div>
      <div style={{ flex:1, overflowY:'auto', minHeight:0, padding:'0 18px 12px', display:'flex', flexDirection:'column', gap:12 }}>
        {messages.map((msg, i) => (
          <div key={i} style={{
            background: msg.type === 'user' ? 'var(--bg4)' : 'var(--bg3)',
            border:'1px solid var(--bdr)', borderRadius:8,
            padding:'12px 14px', fontSize:13, lineHeight:1.72,
            color: msg.type === 'user' ? 'var(--t3)' : 'var(--t2)',
            fontStyle: msg.type === 'user' ? 'italic' : 'normal'
          }}>
            {msg.type === 'earl'
              ? <EarlMessage text={msg.text} speed={14} />
              : msg.text}
          </div>
        ))}
        {loading && (
          <div style={{ display:'flex', gap:5, padding:'6px 0' }}>
            {[0,1,2].map(i => <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:'var(--a)', animation:`dotP 1.4s ease-in-out infinite ${i*0.2}s` }} />)}
          </div>
        )}
      </div>
      <div style={{ padding:'12px 16px', borderTop:'1px solid var(--bdr)', display:'flex', flexDirection:'column', gap:8 }}>
        {selectedText && (
          <div style={{ padding:'10px 14px', background:'var(--bg4)', border:'1px solid var(--bdrS)', borderRadius:6 }}>
            <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--ad)', textTransform:'uppercase', marginBottom:6 }}>Selected text</div>
            <div style={{ fontSize:12, color:'var(--t2)', fontStyle:'italic', lineHeight:1.6, marginBottom:10 }}>"{selectedText.slice(0,120)}{selectedText.length > 120 ? '...' : ''}"</div>
            <div style={{ display:'flex', gap:8 }}>
              <button onClick={() => {
                setInput(`Explain this: "${selectedText}"`)
                onClearSelection()
              }} style={{ background:'none', border:'1px solid var(--a)', color:'var(--al)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', padding:'6px 12px', borderRadius:4, cursor:'pointer' }}>
                Ask Earl
              </button>
              <button onClick={onClearSelection} style={{ background:'none', border:'1px solid var(--bdr)', color:'var(--t3)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', padding:'6px 12px', borderRadius:4, cursor:'pointer' }}>
                Dismiss
              </button>
            </div>
          </div>
        )}
        {loading && (
          <button onClick={() => setLoading(false)} style={{ background:'none', border:'1px solid var(--bdr)', color:'var(--t3)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.12em', textTransform:'uppercase', padding:'4px 10px', borderRadius:4, cursor:'pointer', alignSelf:'flex-start' }}>Reset</button>
        )}
        <div style={{ display:'flex', gap:8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Ask Earl anything..."
          style={{ flex:1, background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:6, color:'var(--t)', fontFamily:'var(--fb)', fontSize:13, padding:'10px 14px', outline:'none' }}
        />
        <button onClick={submit} disabled={loading} style={{ background:'none', border:'1px solid var(--a)', color:'var(--al)', width:38, borderRadius:6, cursor:'pointer', fontSize:14 }}>→</button>
        </div>
      </div>
      <style>{`@keyframes dotP{0%,80%,100%{opacity:0.3;transform:scale(0.9)}40%{opacity:1;transform:scale(1.15)}}`}</style>
    </div>
    </div>
  )
}
