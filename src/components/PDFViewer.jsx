import { useState, useCallback, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url,
).toString()

const BEELINE_COLORS = [
  '#C8392B',
  '#8E44AD',
  '#1A5276',
  '#117A65',
  '#B7770D',
]

export default function PDFViewer({ initialPage, onPageChange, onTextSelect }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(initialPage || 1)
  const [containerWidth, setContainerWidth] = useState(600)
  const [beelineEnabled, setBeelineEnabled] = useState(true)

  const containerRef = useCallback(node => {
    if (node) setContainerWidth(node.getBoundingClientRect().width - 4)
  }, [])

  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (!selection || selection.isCollapsed) return
      const text = selection.toString().trim()
      console.log('selection:', text.length, text.slice(0, 50))
      if (text.length > 10 && onTextSelect) {
        onTextSelect(text)
      }
    }
    document.addEventListener('mouseup', handleSelection)
    return () => document.removeEventListener('mouseup', handleSelection)
  }, [onTextSelect])

  const applyBeeLine = () => {
    const textLayer = document.querySelector('.react-pdf__Page__textContent')
    if (!textLayer) return

    textLayer.style.opacity = '1'

    const spans = Array.from(textLayer.querySelectorAll('span'))
    if (!spans.length) return

    const lines = {}
    spans.forEach(span => {
      const top = Math.round(span.offsetTop / 2) * 2
      if (!lines[top]) lines[top] = []
      lines[top].push(span)
    })

    Object.values(lines).forEach((lineSpans, lineIndex) => {
      const fontSize = parseFloat(window.getComputedStyle(lineSpans[0]).fontSize)
      const color = fontSize > 14 ? '#111111' : BEELINE_COLORS[lineIndex % BEELINE_COLORS.length]
      lineSpans.forEach(span => {
        span.style.setProperty('color', color, 'important')
        span.style.setProperty('-webkit-text-fill-color', color, 'important')
      })
    })
  }

  const resetBeeLine = () => {
    const textLayer = document.querySelector('.react-pdf__Page__textContent')
    if (textLayer) textLayer.style.opacity = '0'
  }

  const toggleBeeline = () => {
    setBeelineEnabled(prev => {
      if (prev) resetBeeLine()
      else applyBeeLine()
      return !prev
    })
  }

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages)

  const onPageRenderSuccess = () => {
    if (beelineEnabled) {
      setTimeout(applyBeeLine, 100)
      setTimeout(applyBeeLine, 300)
      setTimeout(applyBeeLine, 600)
    }
  }

  const prevPage = () => {
    const p = Math.max(1, pageNumber - 1)
    setPageNumber(p)
    if (onPageChange) onPageChange(p)
  }

  const nextPage = () => {
    const p = Math.min(numPages || 1, pageNumber + 1)
    setPageNumber(p)
    if (onPageChange) onPageChange(p)
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', height:'100%', background:'var(--bg)', overflow:'hidden' }}>
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 20px', borderBottom:'1px solid var(--bdr)', background:'var(--bg2)', flexShrink:0 }}>
        <button onClick={prevPage} disabled={pageNumber <= 1} style={{ background:'none', border:'1px solid var(--bdr)', color:'var(--t2)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', padding:'6px 14px', borderRadius:4, cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer', opacity: pageNumber <= 1 ? 0.3 : 1 }}>← Prev</button>
        <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--t3)', textTransform:'uppercase' }}>
          Page <span style={{ color:'var(--al)' }}>{pageNumber}</span> of <span style={{ color:'var(--t2)' }}>{numPages || '—'}</span>
        </div>
        <button onClick={toggleBeeline} style={{ background:'none', border:'none', color: beelineEnabled ? 'var(--a)' : 'var(--t3)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}>
          <div style={{ width:6, height:6, borderRadius:'50%', background: beelineEnabled ? 'var(--a)' : 'var(--t3)' }} />
          BeeLine {beelineEnabled ? 'ON' : 'OFF'}
        </button>
        <button onClick={nextPage} disabled={pageNumber >= (numPages || 1)} style={{ background:'none', border:'1px solid var(--bdr)', color:'var(--t2)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', padding:'6px 14px', borderRadius:4, cursor: pageNumber >= (numPages||1) ? 'not-allowed' : 'pointer', opacity: pageNumber >= (numPages||1) ? 0.3 : 1 }}>Next →</button>
      </div>

      <div ref={containerRef} style={{ flex:1, overflowY:'auto', display:'flex', justifyContent:'center', padding:'12px 8px', background:'#111009', overflowX:'hidden' }}>
        <Document file="/TLCL.pdf" onLoadSuccess={onDocumentLoadSuccess} loading="">
          <Page
            pageNumber={pageNumber}
            width={containerWidth}
            renderTextLayer={true}
            renderAnnotationLayer={false}
            onRenderSuccess={onPageRenderSuccess}
          />
        </Document>
      </div>

      <div style={{ padding:'10px 20px', borderTop:'1px solid var(--bdr)', background:'var(--bg2)', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <span style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--t3)', textTransform:'uppercase' }}>Go to page</span>
        <input type="number" min={1} max={numPages || 1} defaultValue={1}
          onKeyDown={e => { if (e.key === 'Enter') { const val = parseInt(e.target.value); if (val >= 1 && val <= (numPages||1)) { setPageNumber(val); if (onPageChange) onPageChange(val) } }}}
          style={{ width:60, background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:4, color:'var(--t)', fontFamily:'var(--fm)', fontSize:11, padding:'5px 8px', outline:'none', textAlign:'center' }}
        />
      </div>

      <style>{`
        .react-pdf__Page canvas {
          border-radius: 4px;
        }
        .react-pdf__Page__textContent {
          opacity: 0;
        }
      `}</style>
    </div>
  )
}
