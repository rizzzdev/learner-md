import React from 'react'

export default function FolderCard({ course, onClick }) {
  return (
    <div
      onClick={onClick}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 cursor-pointer transition-all group relative overflow-hidden relative flex flex-col justify-between"
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:from-blue-500/20 group-hover:to-purple-500/20 transition-all" />
      
      <div className='flex flex-col justify-center items-center gap-2 mb-4'>

      <h3 className="w-full text-xl font-bold mb-2 group-hover:text-blue-400 text-gray-100 transition-colors relative z-10">
        {course.title}
      </h3>

      {course.description && (
        <p className="w-full text-gray-400 text-sm mb-4 relative z-10 text-justify">
          {course.description}
        </p>
      )}
      </div>

      <div className="w-fit inline-flex items-center mt-3 px-3 py-1 rounded-full bg-gray-900 border border-gray-700 text-sm text-gray-400  z-10">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        {course.materials.length} Materi
      </div>
    </div>
  )
}
