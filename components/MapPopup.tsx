import React from 'react';
import { Popup } from 'react-map-gl/maplibre';

interface MapPopupProps {
  longitude: number;
  latitude: number;
  anchor?: 'center' | 'top' | 'bottom' | 'left' | 'right' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  onClose?: () => void;
  children: React.ReactNode;
}

export function MapPopup({ 
  longitude, 
  latitude, 
  anchor = 'bottom', 
  onClose, 
  children 
}: MapPopupProps) {
  return (
    <Popup
      anchor={anchor}
      style={{ zIndex: 10 }} /* position above deck.gl canvas */
      longitude={longitude}
      latitude={latitude}
      onClose={onClose}
    >
      {children}
    </Popup>
  );
}
