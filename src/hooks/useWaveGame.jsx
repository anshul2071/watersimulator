// src/hooks/useWaveGame.jsx
import { useRef, useEffect } from 'react'

export function useWaveGame({
  amplitude,
  wavelength,
  speed,
  playing,
  onCrest
}) {
  const canvasRef = useRef(null)
  const frameRef = useRef(0)
  const rafRef = useRef(null)
  const crestActiveRef = useRef(false)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // High-DPI support
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      canvas.width = canvas.clientWidth * dpr
      canvas.height = canvas.clientHeight * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0)
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', resize)
    resize()

    function draw() {
      const { width, height } = canvas
      const midY = height / 2

      // Clear previous frame
      ctx.clearRect(0, 0, width, height)

      // Create animated gradient fill (shimmer-like)
      const grad = ctx.createLinearGradient(0, midY - amplitude, 0, midY + amplitude)
      grad.addColorStop(0, '#b3ecff')
      grad.addColorStop(0.5, '#4dd0e1')
      grad.addColorStop(1, '#039be5')
      ctx.fillStyle = grad

      ctx.beginPath()
      ctx.moveTo(0, midY)

      // Draw smooth sine wave using bezier curves
      const step = 2
      for (let x = 0; x <= width; x += step) {
        const theta = (x / wavelength) + frameRef.current * speed
        const y = midY + amplitude * Math.sin(theta)

        const nextX = x + step
        const nextTheta = (nextX / wavelength) + frameRef.current * speed
        const nextY = midY + amplitude * Math.sin(nextTheta)

        const ctrlX = (x + nextX) / 2
        const ctrlY = (y + nextY) / 2

        ctx.quadraticCurveTo(x, y, ctrlX, ctrlY)
      }

      // Close wave path to bottom of canvas
      ctx.lineTo(width, height)
      ctx.lineTo(0, height)
      ctx.closePath()
      ctx.fill()

      // Crest detection logic
      const centerX = width / 2
      const thetaC = (centerX / wavelength) + frameRef.current * speed
      const sinVal = Math.sin(thetaC)
      const threshold = 0.98 // Crest threshold

      if (sinVal > threshold && !crestActiveRef.current) {
        crestActiveRef.current = true
        onCrest(Date.now())
      } else if (sinVal < 0) {
        crestActiveRef.current = false
      }

      // Looping
      frameRef.current += 1
      if (playing) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    // Start drawing
    if (playing) {
      draw()
    }

    // Cleanup
    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [amplitude, wavelength, speed, playing, onCrest])

  return canvasRef
}
