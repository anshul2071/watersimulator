// src/components/GameCanvas.jsx
import React, { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { useWaveGame } from '../hooks/useWaveGame'

export default function GameCanvas({ amplitude, wavelength, speed, playing, onCrest }) {
  const canvasRef = useWaveGame({ amplitude, wavelength, speed, playing, onCrest })

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')

    // Handle high-DPI scaling for crisp visuals
    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      const { clientWidth, clientHeight } = canvas

      canvas.width = clientWidth * dpr
      canvas.height = clientHeight * dpr
      ctx.setTransform(1, 0, 0, 1, 0, 0) // reset transform before scaling
      ctx.scale(dpr, dpr)
    }

    window.addEventListener('resize', resize)
    resize()

    return () => window.removeEventListener('resize', resize)
  }, [])

  return (
    <motion.div
      className="w-full h-64 sm:h-72 md:h-80 lg:h-96 rounded-2xl border border-blue-200/50 shadow-[0_8px_40px_rgba(0,180,255,0.15)] bg-gradient-to-b from-blue-100/40 to-blue-300/30 backdrop-blur overflow-hidden relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ display: 'block', borderRadius: 'inherit' }}
      />
      {/* Optional shimmer light overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/0 pointer-events-none" />
    </motion.div>
  )
}
