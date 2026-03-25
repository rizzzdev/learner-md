import React from 'react'
import FolderCard from './FolderCard'

export default function FolderList({ courses, onSelect }) {
  if (!courses.length) return (
    <div className="text-center text-gray-500 py-10 bg-gray-800 rounded-xl border border-gray-700">
      Tidak ada kursus ditemukan di folder contents.
    </div>
  )

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course, index) => (
        <FolderCard key={course.slug} course={course} onClick={() => onSelect(index)} />
      ))}
    </div>
  )
}
