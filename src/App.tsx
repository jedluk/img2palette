import { useState } from 'react'
import './App.css'
import { Background } from './components/Background'
import { Dropzone } from './components/Dropzone'
import { RALPallette } from './components/RALPallette'
import { ImageDrawer } from './components/ImageDrawer'
import { ResetButton } from './components/ResetButton'

function App() {
  const [file, setFile] = useState<File | null>(null)

  return (
    <>
      <Background animate={file === null} />
      {file === null && <Dropzone onChange={setFile} />}
      {file instanceof File && (
        <>
          <ResetButton onClick={() => setFile(null)} />
          <ImageDrawer file={file} />
          <RALPallette />
        </>
      )}
    </>
  )
}

export default App
