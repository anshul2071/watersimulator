import React from 'react'
import { Button } from '@/components/ui/button'
import { Slider } from '@/components/ui/slider'
import { Label } from '@/components/ui/label'


export default function ControlPanel({
  amplitude,
  onAmplitudeChange,
  wavelength,
  onWavelengthChange,
  speed,
  onSpeedChange,
  playing,
  onStart,
  onPause,
  onReset
}) {
  return (
    <div className="grid grid-cols-1 gap-4">
      <div>
        <Label>Amplitude: <strong>{amplitude}px</strong></Label>
        <Slider
          value={[amplitude]}
          min={10}
          max={100}
          step={1}
          onValueChange={([v]) => onAmplitudeChange(v)}
        />
      </div>
      <div>
        <Label>Wavelength: <strong>{wavelength}px</strong></Label>
        <Slider
          value={[wavelength]}
          min={20}
          max={300}
          step={5}
          onValueChange={([v]) => onWavelengthChange(v)}
        />
      </div>
      <div>
        <Label>Speed: <strong>{(speed * 100).toFixed(0)}%</strong></Label>
        <Slider
          value={[speed]}
          min={0.01}
          max={0.2}
          step={0.005}
          onValueChange={([v]) => onSpeedChange(v)}
        />
      </div>
      <div className="flex gap-4 pt-4">
        {playing ? (
          <Button variant="destructive" onClick={onPause}>Pause</Button>
        ) : (
          <Button onClick={onStart}>Start</Button>
        )}
        <Button variant="outline" onClick={onReset}>Reset</Button>
      </div>
    </div>
  )
}
