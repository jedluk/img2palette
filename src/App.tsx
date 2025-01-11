import { useState } from 'react'
import './App.css'
import { Background } from './Background'
import { Dropzone } from './Dropzone'
import { RALPallette } from './RALPallette'
import { ImageDrawer } from './ImageDrawer'

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
