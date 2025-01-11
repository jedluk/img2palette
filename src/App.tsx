import { useState } from 'react'
import './App.css'
import { Background } from './components/Background'
import { Dropzone } from './components/Dropzone'
import { RALPallette } from './components/RALPallette'
import { ImageDrawer } from './components/ImageDrawer'

function App() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <>
      <Background animate={file === null} />
      {file === null ? (
        <Dropzone onChange={setFile} />
      ) : (
        <ImageDrawer file={file} />
      )}
      <RALPallette />
    </>
  )
}

export default App
