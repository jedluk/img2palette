import { useState } from 'react'
import './App.css'
import { Background } from './components/Background'
import { Dropzone } from './components/Dropzone'
import { RALPallette } from './components/RALPallette'
import { ImageDrawer } from './components/ImageDrawer'
import { ResetButton } from './components/ResetButton'
import { Disclaimer } from './components/Disclaimer'

function App() {
  const [file, setFile] = useState<File | null>(null)
  const hasNoFile = file === null

  return (
    <>
      <Background animate={hasNoFile} />
      {hasNoFile && <Dropzone onChange={setFile} />}
      {file instanceof File && (
        <>
          <ResetButton onClick={() => setFile(null)} />
          <ImageDrawer file={file} />
          <RALPallette />
        </>
      )}
      <Disclaimer />
    </>
  )
}

export default App
