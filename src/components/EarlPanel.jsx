import { useState } from 'react'
import EarlMessage from './EarlMessage'

async function askEarl(question, chapterTitle) {
  const res = await fetch('/api/earl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 600,
      system: `You are Earl. The user is currently studying: "${chapterTitle}". Answer their question directly. 3 paragraphs maximum. No bullet points. No hedging. Speak like someone who knows this cold and remembers what it felt like not to.`,
      messages: [{ role: 'user', content: question }]
    })
  })
  const data = await res.json()
  return data.content[0].text
}

export default function EarlPanel({ chapter, peakShown }) {
  const [messages, setMessages] = useState([
    { type: 'earl', text: `You're in Chapter 1. Read through the concepts. When you're ready — the check card is at the bottom.\n\nIf anything doesn't land, ask me below.` }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const submit = async () => {
    const q = input.trim()
    if (!q || loading) return
    setInput('')
    setMessages(m => [...m, { type: 'user', text: q }])
    setLoading(true)
    try {
      const resp = await askEarl(q, chapter.title)
      setMessages(m => [...m, { type: 'earl', text: resp }])
    } catch {
      setMessages(m => [...m, { type: 'earl', text: "Can't reach the server right now. Try again in a moment." }])
    }
    setLoading(false)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg2)', borderLeft:'1px solid var(--bdr)' }}>
      <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.17em', textTransform:'uppercase', color:'var(--t3)', padding:'18px 18px 10px' }}>Earl</div>
      <div style={{ flex:1, overflowY:'auto', padding:'0 18px 12px', display:'flex', flexDirection:'column', gap:12 }}>
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
      <div style={{ padding:'12px 16px', borderTop:'1px solid var(--bdr)', display:'flex', gap:8 }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && submit()}
          placeholder="Ask Earl anything..."
          style={{ flex:1, background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:6, color:'var(--t)', fontFamily:'var(--fb)', fontSize:13, padding:'10px 14px', outline:'none' }}
        />
        <button onClick={submit} disabled={loading} style={{ background:'none', border:'1px solid var(--a)', color:'var(--al)', width:38, borderRadius:6, cursor:'pointer', fontSize:14 }}>→</button>
      </div>
      <style>{`@keyframes dotP{0%,80%,100%{opacity:0.3;transform:scale(0.9)}40%{opacity:1;transform:scale(1.15)}}`}</style>
    </div>
  )
}
