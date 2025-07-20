// src/components/ReactionMarker.jsx
import React from 'react'

export default function ReactionMarker({ onClick, disabled }) {
  return (
    <div
      onClick={disabled ? null : onClick}
      className={`
        absolute top-1/2 left-1/2 
        w-10 h-10 sm:w-12 sm:h-12 
        -translate-x-1/2 -translate-y-1/2 
        rounded-full bg-red-500 
        z-20 cursor-pointer
        transition-all duration-200
        ${disabled ? 'opacity-40 cursor-not-allowed' : 'hover:scale-110'}
        before:content-[''] before:absolute before:inset-0 
        before:rounded-full before:animate-ping 
        before:bg-red-400 before:opacity-30
      `}
    />
  )
}
