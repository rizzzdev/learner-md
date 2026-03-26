import React, { useState, useEffect } from 'react'
import FolderList from './components/folder/FolderList'
import FileList from './components/file/FileList'
import MarkdownViewer from './components/markdown/MarkdownViewer'

function App() {
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Navigation: null = daftar kursus, number = kursus terpilih, { course, material } = materi terpilih
  const [selectedCourse, setSelectedCourse] = useState(null)
  const [selectedMaterial, setSelectedMaterial] = useState(null)

  useEffect(() => {
    fetch('/data.json')
      .then(res => {
        if (!res.ok) throw new Error('Gagal mengambil data dari server')
        return res.json()
      })
      .then(data => { setCourses(data); setLoading(false) })
      .catch(err => { setError(err.message); setLoading(false) })
  }, [])

  const view = selectedMaterial !== null ? 'content' : selectedCourse !== null ? 'materials' : 'courses'

  const handleSelectCourse = (index) => { setSelectedCourse(index); setSelectedMaterial(null); window.scrollTo(0, 0) }
  const handleSelectMaterial = (index) => { setSelectedMaterial(index); window.scrollTo(0, 0) }
  const handleBackToCourses = () => { setSelectedCourse(null); setSelectedMaterial(null); window.scrollTo(0, 0) }
  const handleBackToMaterials = () => { setSelectedMaterial(null); window.scrollTo(0, 0) }

  const currentCourse = selectedCourse !== null ? courses[selectedCourse] : null
  const currentMaterial = selectedMaterial !== null && currentCourse ? currentCourse.materials[selectedMaterial] : null

  // Breadcrumb
  let breadcrumb = loading ? 'Memuat data...' : error
    ? <span className="text-red-400">{error}</span>
    : 'Kursus'

  if (view === 'materials' && currentCourse) {
    breadcrumb = (
      <>
        <span className="cursor-pointer hover:text-blue-400 transition" onClick={handleBackToCourses}>Kursus</span>
        <span className="mx-2 text-gray-600">/</span>
        <span className="text-gray-200">{currentCourse.title}</span>
      </>
    )
  } else if (view === 'content' && currentCourse && currentMaterial) {
    breadcrumb = (
      <>
        <span className="cursor-pointer hover:text-blue-400 transition" onClick={handleBackToCourses}>Kursus</span>
        <span className="mx-2 text-gray-600">/</span>
        <span className="cursor-pointer hover:text-blue-400 transition" onClick={handleBackToMaterials}>{currentCourse.title}</span>
        <span className="mx-2 text-gray-600">/</span>
        <span className="text-gray-200">{currentMaterial.title}</span>
      </>
    )
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <header className="mb-8 flex justify-between items-center border-b border-gray-700 pb-4">
        <div>
          <h1
            className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 cursor-pointer"
            onClick={handleBackToCourses}
          >
            MD Learner
          </h1>
          <p className="text-gray-400 text-sm mt-1">{breadcrumb}</p>
        </div>
        {loading && (
          <svg className="animate-spin h-6 w-6 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        )}
      </header>

      <main>
        {view === 'courses' && !loading && !error && (
          <FolderList courses={courses} onSelect={handleSelectCourse} />
        )}
        {view === 'materials' && currentCourse && (
          <FileList
            course={currentCourse}
            onSelect={handleSelectMaterial}
            onBack={handleBackToCourses}
          />
        )}
        {view === 'content' && currentMaterial && (
          <MarkdownViewer
            material={currentMaterial}
            onBack={handleBackToMaterials}
          />
        )}
      </main>
    </div>
  )
}

export default App
