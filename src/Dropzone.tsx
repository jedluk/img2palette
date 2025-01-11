import { useCallback, useState, useRef, useEffect } from 'react'
import { FileRejection, useDropzone } from 'react-dropzone'
import styles from './Dropzone.module.css'
import Pacman from './assets/pacman.svg'

interface DropzoneProps {
  onChange: (file: File) => void
}

export function Dropzone({ onChange }: DropzoneProps) {
  const [hoverDirection, setHoverDirection] = useState<string>('')
  const dropzoneRef = useRef<HTMLDivElement>(null)
  const [dropzoneRect, setDropzoneRect] = useState<DOMRect | null>(null)

  useEffect(() => {
    if (dropzoneRef.current) {
      setDropzoneRect(dropzoneRef.current.getBoundingClientRect())
    }
  }, [])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      onChange(acceptedFiles[0])
    },
    [onChange]
  )

  const updateHoverDirection = (event: React.DragEvent<HTMLElement>) => {
    const { clientX, clientY } = event
    if (!dropzoneRect) return

    const centerX = dropzoneRect.left + dropzoneRect.width / 2
    const centerY = dropzoneRect.top + dropzoneRect.height / 2
    const angle =
      Math.atan2(clientY - centerY, clientX - centerX) * (180 / Math.PI)

    if (angle >= -45 && angle <= 45) {
      setHoverDirection('right')
    } else if (angle > 45 && angle < 135) {
      setHoverDirection('down')
    } else if (angle >= 135 || angle <= -135) {
      setHoverDirection('left')
    } else {
      setHoverDirection('up')
    }
  }

  const handleRejection = (rejections: FileRejection[]) => {
    setHoverDirection('')
    alert(rejections[0].errors[0].message)
  }
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    onDragEnter: updateHoverDirection,
    onDragOver: updateHoverDirection,
    onDragLeave: () => setHoverDirection(''),
    onDropRejected: handleRejection,
    multiple: false,
    maxFiles: 1,
    noClick: true,
    accept: {
      'image/jpg': [],
      'image/png': [],
    },
  })

  return (
    <div
      {...getRootProps()}
      ref={dropzoneRef}
      className={`${styles.dropzone} ${isDragActive ? styles.active : ''}`}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <div className={`${styles.pacmanContainer} ${styles[hoverDirection]}`}>
          <img src={Pacman} className={styles.pacman} alt="Pacman" />
        </div>
      ) : (
        <p>Drag 'n' drop some files here, or click to select files</p>
      )}
    </div>
  )
}
