import React from 'react'

export default function FileCard({ material, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/20 cursor-pointer transition-all flex flex-col h-full group"
    >
      <h4 className="text-lg font-bold mb-3 text-gray-100 flex items-center gap-2 group-hover:text-purple-400 transition-colors">
        {material.prefix && (
          <span className="shrink-0 bg-purple-900/60 text-purple-300 w-7 h-7 rounded-md text-xs font-mono border border-purple-700/50 flex items-center justify-center shadow-sm">
            {material.prefix}
          </span>
        )}
        <span>{material.title}</span>
      </h4>

      {material.description && (
        <p className="text-gray-400 text-sm leading-relaxed flex-grow text-justify">
          {material.description}
        </p>
      )}

      <div className="mt-5 text-blue-400 text-sm font-medium flex items-center gap-1 group-hover:text-purple-400 transition-colors">
        Baca materi
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </div>
    </div>
  )
}
