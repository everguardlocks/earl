import { useState, useCallback } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/AnnotationLayer.css'
import 'react-pdf/dist/Page/TextLayer.css'

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

const pdfStyles = `
.react-pdf__Page {
  box-shadow: 0 4px 32px rgba(0,0,0,0.5) !important;
  border-radius: 4px !important;
}

.react-pdf__Page canvas {
  filter: sepia(0.2) brightness(0.88) contrast(0.95) !important;
  border-radius: 4px !important;
}
`

export default function PDFViewer({ chapterId, onPageChange }) {
  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  const [loading, setLoading] = useState(true)
  const [containerWidth, setContainerWidth] = useState(600)

  const containerRef = useCallback(node => {
    if (node) setContainerWidth(node.getBoundingClientRect().width - 56)
  }, [])

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages)
    setLoading(false)
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
      <style>{pdfStyles}</style>

      {/* Page controls */}
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', padding:'10px 20px', borderBottom:'1px solid var(--bdr)', background:'var(--bg2)', flexShrink:0 }}>
        <button onClick={prevPage} disabled={pageNumber <= 1} style={{ background:'none', border:'1px solid var(--bdr)', color:'var(--t2)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', padding:'6px 14px', borderRadius:4, cursor: pageNumber <= 1 ? 'not-allowed' : 'pointer', opacity: pageNumber <= 1 ? 0.3 : 1 }}>← Prev</button>
        <div style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--t3)', textTransform:'uppercase' }}>
          Page <span style={{ color:'var(--al)' }}>{pageNumber}</span> of <span style={{ color:'var(--t2)' }}>{numPages || '—'}</span>
        </div>
        <button onClick={nextPage} disabled={pageNumber >= (numPages || 1)} style={{ background:'none', border:'1px solid var(--bdr)', color:'var(--t2)', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', textTransform:'uppercase', padding:'6px 14px', borderRadius:4, cursor: pageNumber >= (numPages||1) ? 'not-allowed' : 'pointer', opacity: pageNumber >= (numPages||1) ? 0.3 : 1 }}>Next →</button>
      </div>

      {/* PDF canvas area */}
      <div ref={containerRef} style={{ flex:1, overflowY:'auto', overflowX:'hidden', display:'flex', justifyContent:'center', padding:'24px 20px', background:'#111009' }}>
        {loading && (
          <div style={{ display:'flex', alignItems:'center', justifyContent:'center', height:'100%', fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--t3)', textTransform:'uppercase' }}>
            Loading document...
          </div>
        )}
        <Document
          file="/TLCL.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={console.error}
          loading=""
        >
          <Page
            pageNumber={pageNumber}
            width={containerWidth}
            renderTextLayer={true}
            renderAnnotationLayer={false}
            canvasBackground="white"
          />
        </Document>
      </div>

      {/* Page jump input */}
      <div style={{ padding:'10px 20px', borderTop:'1px solid var(--bdr)', background:'var(--bg2)', display:'flex', alignItems:'center', gap:10, flexShrink:0 }}>
        <span style={{ fontFamily:'var(--fm)', fontSize:9, letterSpacing:'0.14em', color:'var(--t3)', textTransform:'uppercase' }}>Go to page</span>
        <input
          type="number"
          min={1}
          max={numPages || 1}
          defaultValue={pageNumber}
          onKeyDown={e => {
            if (e.key === 'Enter') {
              const val = parseInt(e.target.value)
              if (val >= 1 && val <= (numPages || 1)) {
                setPageNumber(val)
                if (onPageChange) onPageChange(val)
              }
            }
          }}
          style={{ width:60, background:'var(--bg3)', border:'1px solid var(--bdr)', borderRadius:4, color:'var(--t)', fontFamily:'var(--fm)', fontSize:11, padding:'5px 8px', outline:'none', textAlign:'center' }}
        />
      </div>
    </div>
  )
}
