// src/components/ScoreBoard.jsx
import React from 'react'
import {motion}  from 'framer-motion'

export default function ScoreBoard({ timeLeft, score, lastReaction }) {
  const formatTime = time => `${time}s`
  const formatReaction = reaction => (reaction != null ? `${reaction}ms` : '–')

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-white text-center sm:text-left"
    >
      {/* Time Remaining */}
      <div className="bg-blue-700/20 p-4 rounded-xl shadow-inner backdrop-blur-sm flex items-center justify-center gap-2 sm:justify-start">
        <span className="text-2xl">⏱</span>
        <div>
          <p className="text-sm text-blue-100 uppercase tracking-wider">Time Left</p>
          <p className="text-lg sm:text-xl font-bold">{formatTime(timeLeft)}</p>
        </div>
      </div>

      {/* Current Score */}
      <div className="bg-green-700/20 p-4 rounded-xl shadow-inner backdrop-blur-sm flex items-center justify-center gap-2 sm:justify-start">
        <span className="text-2xl">🏆</span>
        <div>
          <p className="text-sm text-green-100 uppercase tracking-wider">Score</p>
          <p className="text-lg sm:text-xl font-bold">{score}</p>
        </div>
      </div>

      {/* Last Reaction */}
      <div className="bg-purple-700/20 p-4 rounded-xl shadow-inner backdrop-blur-sm flex items-center justify-center gap-2 sm:justify-start">
        <span className="text-2xl">⚡</span>
        <div>
          <p className="text-sm text-purple-100 uppercase tracking-wider">Last Reaction</p>
          <p className="text-lg sm:text-xl font-bold">{formatReaction(lastReaction)}</p>
        </div>
      </div>
    </motion.div>
  )
}
