import React, { useEffect, useRef } from 'react'
import { marked } from 'marked'

export default function MarkdownViewer({ material, onBack }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current || !material.content) return

    marked.setOptions({
      highlight: function(code, lang) {
        if (lang && window.hljs?.getLanguage(lang)) {
          return window.hljs.highlight(code, { language: lang }).value
        }
        return window.hljs ? window.hljs.highlightAuto(code).value : code
      },
      langPrefix: 'hljs language-',
      breaks: true,
      gfm: true
    })

    containerRef.current.innerHTML = marked.parse(material.content)

    containerRef.current.querySelectorAll('pre code').forEach((block) => {
      window.hljs?.highlightElement(block)
    })
  }, [material.content])

  return (
    <div>
      <div className="mb-6 flex gap-3 sticky top-0 bg-gray-900/90 backdrop-blur-sm py-4 z-10 border-b border-gray-800">
        <button
          onClick={onBack}
          className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg transition text-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Kembali ke Daftar Materi
        </button>
      </div>
      <div
        ref={containerRef}
        className="prose prose-invert prose-lg max-w-none bg-gray-800 p-8 rounded-xl shadow-xl mt-4 border border-gray-700"
      />
    </div>
  )
}
