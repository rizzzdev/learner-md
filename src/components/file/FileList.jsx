import React from 'react'
import FileCard from './FileCard'

export default function FileList({ course, onSelect, onBack }) {
  return (
    <div>
      <div className="mb-6">
        <button
          onClick={onBack}
          className="bg-gray-800 hover:bg-gray-700 text-gray-200 px-4 py-2 rounded-lg transition text-sm flex items-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          Kembali ke Daftar Kursus
        </button>
      </div>

      {course.materials.length === 0 ? (
        <div className="text-center text-gray-500 py-10 bg-gray-800 rounded-xl border border-gray-700">
          Kursus ini belum memiliki materi.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {course.materials.map((material, index) => (
            <FileCard
              key={material.slug}
              material={material}
              onClick={() => onSelect(index)}
            />
          ))}
        </div>
      )}
    </div>
  )
}
