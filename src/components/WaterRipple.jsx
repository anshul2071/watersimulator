// src/components/WaterRipple.jsx
import React, { useState, useCallback, useEffect } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert'
import GameCanvas from './GameCanvas'
import ReactionMarker from './ReactionMaker'
import ScoreBoard from './ScoreBoard'
import ControlPanel from './ControlPanel'

export default function WaterRippleGame() {
  // ────────────────────────────────────────────────────────────────
  // GAME STATE
  const [amplitude, setAmplitude] = useState(30)
  const [wavelength, setWavelength] = useState(120)
  const [speed, setSpeed] = useState(0.05)
  const [playing, setPlaying] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [score, setScore] = useState(0)
  const [lastReaction, setLastReaction] = useState(null)
  const [crestTime, setCrestTime] = useState(null)
  const [gameOver, setGameOver] = useState(false)

  // ────────────────────────────────────────────────────────────────
  // COUNTDOWN TIMER
  useEffect(() => {
    if (!playing) return
    if (timeLeft <= 0) {
      setPlaying(false)
      setGameOver(true)
      return
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000)
    return () => clearTimeout(id)
  }, [playing, timeLeft])

  // ────────────────────────────────────────────────────────────────
  // CREST DETECTION CALLBACK (called by useWaveGame hook)
  const handleCrest = useCallback(ts => {
    setCrestTime(ts)
  }, [])

  // ────────────────────────────────────────────────────────────────
  // PLAYER REACTION HANDLER
  const handleClick = () => {
    if (!crestTime) return
    const now = Date.now()
    const reaction = now - crestTime
    setLastReaction(reaction)
    setScore(s => s + 1)
    setCrestTime(null)
  }

  // ────────────────────────────────────────────────────────────────
  // GAME CONTROL FUNCTIONS
  const startGame = () => {
    setPlaying(true)
    setGameOver(false)
    setTimeLeft(30)
    setScore(0)
    setLastReaction(null)
    setCrestTime(null)
  }

  const resetGame = () => {
    setPlaying(false)
    setGameOver(false)
    setTimeLeft(30)
    setScore(0)
    setLastReaction(null)
    setCrestTime(null)
  }

  // ────────────────────────────────────────────────────────────────
  // UI LAYOUT
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-900 via-blue-900 to-indigo-950 px-4 py-10 flex flex-col items-center">
      {/* Title */}
      <h1 className="text-center text-2xl sm:text-3xl md:text-4xl font-extrabold text-white drop-shadow-md mb-6">
        🌊 Water Ripple Reaction Game
      </h1>

      {/* Game Card */}
      <Card className="relative w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border border-white/10 bg-white/10 backdrop-blur-md">
        {/* Game Canvas and Marker */}
        <div className="relative">
          <GameCanvas
            amplitude={amplitude}
            wavelength={wavelength}
            speed={speed}
            playing={playing}
            onCrest={handleCrest}
          />
          <ReactionMarker onClick={handleClick} disabled={!playing || gameOver} />
        </div>

        {/* Controls + Stats */}
        <CardContent className="p-5 sm:p-6 md:p-8 space-y-8 bg-white/20 backdrop-blur-md rounded-b-3xl">
          <ScoreBoard
            timeLeft={timeLeft}
            score={score}
            lastReaction={lastReaction}
          />
          <ControlPanel
            amplitude={amplitude}
            onAmplitudeChange={setAmplitude}
            wavelength={wavelength}
            onWavelengthChange={setWavelength}
            speed={speed}
            onSpeedChange={setSpeed}
            playing={playing}
            onStart={startGame}
            onPause={() => setPlaying(false)}
            onReset={resetGame}
          />
        </CardContent>

        {/* Game Over Overlay */}
        {gameOver && (
          <Alert className="absolute inset-0 m-6 flex flex-col items-center justify-center bg-white/90 backdrop-blur-md rounded-2xl z-30 shadow-2xl border border-gray-300">
            <AlertTitle className="text-3xl font-bold text-blue-800">Game Over</AlertTitle>
            <AlertDescription className="mt-2 text-lg text-gray-800">
              Your final score: <strong>{score}</strong>
            </AlertDescription>
            <button
              onClick={resetGame}
              className="mt-4 bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              Play Again
            </button>
          </Alert>
        )}
      </Card>
    </div>
  )
}
