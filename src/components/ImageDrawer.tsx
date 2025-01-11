import { useEffect, useRef } from 'react'

export function ImageDrawer({ file }: { file: File }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!file || canvas === null) {
      return
    }
    const img = new Image()
    const ctx = canvas.getContext('2d')!
    img.onload = function () {
      const scale = Math.min(
        canvas.width / img.width,
        canvas.height / img.height
      )
      const x = canvas.width / 2 - (img.width / 2) * scale
      const y = canvas.height / 2 - (img.height / 2) * scale
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.drawImage(img, x, y, img.width * scale, img.height * scale)
    }
    img.src = URL.createObjectURL(file)
  }, [file])

  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
    />
  )
}
