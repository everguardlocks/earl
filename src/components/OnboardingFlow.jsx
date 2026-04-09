import { useState } from 'react'
import EarlMessage from './EarlMessage'
import { storage } from '../lib/storage'

const MSGS = {
  contract: "One thing before we go further.\n\nYou're going to get things wrong in here. A lot. That's not a problem — that's literally the point. Every wrong answer is data. We use it.\n\nThere's no timer. No one watching. No grade. No judgment.\n\nThe only thing that matters in here is whether you understand the thing in front of you.\n\nThat's it.",
  dest: "Here's what you're going to be able to do when you finish this domain.\n\nYou'll be able to sit down at any Linux machine on the planet — one you've never touched — and navigate it. Configure it. Secure it. Automate it.\n\nThere's a specific moment — I can't tell you exactly when it happens because it's different for everyone — where something clicks and you realize the system isn't foreign anymore. You're inside it. Moving through it. Like you were always supposed to be there.\n\nThat moment is in here somewhere. Let's find it."
}

async function getEarlResponse(userAnswer) {
  const res = await fetch('/api/earl', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 1000,
      system: `You are Earl.

CHARACTER:
Earl learned everything the hard way — which means he learned it the real way. He came from somewhere without advantages and reverse engineered every system he encountered. He speaks from the other side of the journey the user is on. Not above them. Ahead of them. He knows exactly how this feels because he felt it. He tells the truth because that's the only thing that actually helped him.

VOICE ARCHITECTURE:
When opening or introducing — Belfort's urgency. No warm-up. Start in the middle of the thought.
When explaining — Mehdi's precision. Name the mechanism. No hedging.
When delivering truth — Goggins and Wilde. Uncomfortable, stated beautifully.
When using analogies — Chappelle. Universal, disarming.
When closing — Belfort opens the loop, Chappelle lands the last line.

RULES — never break these:
- Never say "Great answer", "Well done", "I love that", or any validation opener
- Never use bullet points
- Never hedge or qualify
- Never speak at the person — always to them
- Speak to who they are becoming, not who they currently are
- End with one short line — a command or a statement. One to four words. No period needed
- 3-5 short paragraphs maximum
- Reference the user's actual words directly`,
      messages: [{ role: 'user', content: `The user was asked "What made you start today?" They answered: "${userAnswer}"\n\nRespond as Earl.` }]
    })
  })
  const data = await res.json()
  return data.content[0].text
}

export default function OnboardingFlow({ onComplete, mapRecede }) {
  const [step, setStep] = useState(1)
  const [input, setInput] = useState('')
  const [earlResp, setEarlResp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [lastAns, setLastAns] = useState('')
  const [showCont, setShowCont] = useState(false)

  const submit = async () => {
    const val = input.trim()
    if (!val) return
    setLastAns(val)
    storage.set('earl_day_one_answer', val)
    storage.set('earl_onboarded', 'true')
    setLoading(true)
    setError(false)
    setStep(2)
    try {
      const text = await getEarlResponse(val)
      setEarlResp(text)
      setLoading(false)
    } catch {
      setLoading(false)
      setError(true)
    }
  }

  const retry = async () => {
    setError(false)
    setLoading(true)
    try {
      const text = await getEarlResponse(lastAns)
      setEarlResp(text)
      setLoading(false)
    } catch {
      setLoading(false)
      setError(true)
    }
  }

  return (
    <div style={{ position:'absolute', inset:0, zIndex:40, display:'flex', alignItems:'center', justifyContent:'center', padding:20 }}>
      <div style={{ background:'rgba(18,13,10,0.94)', border:'1px solid var(--bdrS)', borderRadius:10, padding:'38px 44px', maxWidth:540, width:'100%', backdropFilter:'blur(10px)', boxShadow:'0 24px 80px rgba(0,0,0,0.6)' }}>
        <span style={{ fontFamily:'var(--fd)', fontSize:15, fontWeight:700, letterSpacing:'0.12em', color:'var(--al)', display:'block', marginBottom:6 }}>Earl</span>
        <span style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.2em', color:'var(--t4)', textTransform:'uppercase', display:'block', marginBottom:26 }}>
          {step === 1 && '01 of 05 · The only question that matters'}
          {step === 2 && '02 of 05 · Your answer'}
          {step === 3 && '03 of 05 · How this works'}
          {step === 4 && '04 of 05 · Where this ends up'}
        </span>

        {step === 1 && <EarlMessage text={"Before anything else — I want to know one thing.\n\nWhat made you start today?"} speed={36} onDone={() => setShowCont(true)} />}
        {step === 1 && showCont && (
          <div style={{ display:'flex', gap:10, marginTop:26 }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key==='Enter' && submit()}
              placeholder="No right answer. No wrong answer."
              autoFocus
              style={{ flex:1, background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:'var(--r)', color:'var(--t)', fontFamily:'var(--fb)', fontSize:14, fontStyle:'italic', padding:'13px 18px', outline:'none' }} />
            <button onClick={submit} style={{ background:'none', border:'1px solid var(--a)', color:'var(--al)', width:46, borderRadius:'var(--r)', cursor:'pointer', fontSize:16 }}>→</button>
          </div>
        )}

        {step === 2 && loading && (
          <div style={{ display:'flex', alignItems:'center', gap:10, padding:'6px 0' }}>
            <div style={{ display:'flex', gap:5 }}>
              {[0,1,2].map(i => <div key={i} style={{ width:5, height:5, borderRadius:'50%', background:'var(--a)', animation:`dotP 1.4s ease-in-out infinite ${i*0.2}s` }} />)}
            </div>
            <span style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.18em', color:'var(--t3)', textTransform:'uppercase' }}>Earl is reading that</span>
          </div>
        )}
        {step === 2 && !loading && !error && earlResp && (
          <EarlMessage text={earlResp} speed={28} onDone={() => setShowCont(true)} />
        )}
        {step === 2 && error && (
          <div style={{ padding:'14px 16px', background:'rgba(200,146,42,0.06)', border:'1px solid var(--bdr)', borderRadius:'var(--r)', fontSize:13, color:'var(--t3)', lineHeight:1.65 }}>
            <span style={{ fontFamily:'var(--fd)', fontSize:15, color:'var(--t2)' }}>Earl can't reach the server right now.</span><br /><br />
            <button onClick={retry} style={{ background:'none', border:'1px solid var(--bdrS)', color:'var(--t2)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', padding:'8px 16px', cursor:'pointer', borderRadius:'var(--r)', marginRight:12 }}>Try again</button>
            <button onClick={() => { setStep(3); setShowCont(false) }} style={{ background:'none', border:'1px solid var(--bdrS)', color:'var(--t2)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', padding:'8px 16px', cursor:'pointer', borderRadius:'var(--r)' }}>Continue anyway</button>
          </div>
        )}
        {step === 2 && showCont && !loading && !error && (
          <button onClick={() => { setStep(3); setShowCont(false) }} style={{ background:'none', border:'1px solid var(--bdrS)', color:'var(--t2)', fontFamily:'var(--fb)', fontSize:13, letterSpacing:'0.05em', padding:'11px 28px', cursor:'pointer', borderRadius:'var(--r)', marginTop:28 }}>Continue</button>
        )}

        {step === 3 && <EarlMessage text={MSGS.contract} speed={26} onDone={() => setShowCont(true)} />}
        {step === 3 && showCont && (
          <button onClick={() => { setStep(4); setShowCont(false) }} style={{ background:'none', border:'1px solid var(--bdrS)', color:'var(--t2)', fontFamily:'var(--fb)', fontSize:13, letterSpacing:'0.05em', padding:'11px 28px', cursor:'pointer', borderRadius:'var(--r)', marginTop:28 }}>Continue</button>
        )}

        {step === 4 && <EarlMessage text={MSGS.dest} speed={24} onDone={() => setShowCont(true)} />}
        {step === 4 && showCont && (
          <button onClick={onComplete} style={{ background:'none', border:'1px solid var(--bdrS)', color:'var(--t2)', fontFamily:'var(--fb)', fontSize:13, letterSpacing:'0.05em', padding:'11px 28px', cursor:'pointer', borderRadius:'var(--r)', marginTop:28 }}>Show me the map.</button>
        )}
      </div>
      <style>{`@keyframes dotP{0%,80%,100%{opacity:0.3;transform:scale(0.9)}40%{opacity:1;transform:scale(1.15)}}`}</style>
    </div>
  )
}
