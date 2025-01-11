import { useState } from 'react'

export const DraggableWrapper = ({
  initialPosition,
  children,
}: {
  initialPosition: { x: number; y: number }
  children: React.ReactNode
}) => {
  const [position, setPosition] = useState(initialPosition)
  const [dragging, setDragging] = useState(false)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })

  const handleMouseDown = (e) => {
    setDragging(true)
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y })
  }

  const handleMouseMove = (e) => {
    if (dragging) {
      setPosition({ x: e.clientX - startPos.x, y: e.clientY - startPos.y })
    }
  }

  const handleMouseUp = () => {
    setDragging(false)
  }

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        cursor: 'grab',
        width: 300,
        height: 300,
        position: 'absolute',
        left: position.x,
        top: position.y,
      }}
    >
      {children}
    </div>
  )
}
