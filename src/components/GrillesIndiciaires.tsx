import React from 'react'
import Metiers from './Metiers'

interface GrillesIndicairesProps {
  onClose?: () => void
}

export default function GrillesIndiciaires({ onClose }: GrillesIndicairesProps) {
  return (
    <div className="w-full">
      <Metiers onClose={onClose || (() => {})} />
    </div>
  )
}
