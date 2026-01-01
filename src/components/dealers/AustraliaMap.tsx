"use client";

import Australia from '@svg-maps/australia';

interface AustraliaMapProps {
  selectedRegion: string | null;
  onRegionClick: (regionId: string) => void;
}

// Map the SVG location IDs to our region IDs
const regionMapping: Record<string, string> = {
  'wa': 'wa',
  'nt-mainland': 'nt',
  'nt-groote-eylandt': 'nt',
  'nt-melville-island': 'nt',
  'qld-mainland': 'qld',
  'qld-fraser-island': 'qld',
  'qld-mornington-island': 'qld',
  'sa-mainland': 'sa',
  'sa-kangaroo-island': 'sa',
  'nsw': 'nsw',
  'act': 'act',
  'vic': 'vic',
  'tas': 'tas',
};

// Pin positions for each region (based on viewBox "6.5 4.8 273 252.8")
// Positions centered in each state/territory
const pinPositions: Record<string, { x: number; y: number }> = {
  wa: { x: 70, y: 120 }, // Western Australia - centered
  nt: { x: 144, y: 70 }, // Northern Territory - centered
  qld: { x: 230, y: 90 }, // Queensland - centered
  sa: { x: 160, y: 150 }, // South Australia - centered
  nsw: { x: 235, y: 165 }, // New South Wales - centered
  act: { x: 245, y: 184 }, // Australian Capital Territory - Canberra (moved up and right)
  vic: { x: 220, y: 200}, // Victoria - centered
  tas: { x: 230, y: 240 }, // Tasmania - centered
};

interface MapPinProps {
  x: number;
  y: number;
  isActive: boolean;
  regionId: string;
  onPinClick: (regionId: string) => void;
}

const MapPin = ({ x, y, isActive, regionId, onPinClick }: MapPinProps) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onPinClick(regionId);
  };

  // Use red color for South Australia
  const pinColor = "hsl(0, 70%, 50%)";
  const shadowColor = "hsl(0, 70%, 50%)";

  return (
    <g
      transform={`translate(${x}, ${y})`}
      onClick={handleClick}
      style={{ 
        cursor: 'pointer',
        filter: isActive 
          ? `drop-shadow(0 0 8px ${shadowColor})` 
          : `drop-shadow(0 0 4px ${shadowColor}80)`,
        pointerEvents: 'all',
      }}
    >
      {/* Invisible larger hit area for easier clicking */}
      <circle cx="0" cy="-2.5" r="9" fill="transparent" style={{ pointerEvents: 'all' }} />
      {/* Visible pin */}
      <path
        d="M0 -6 C-2.25 -6, -3.75 -3.75, -3.75 -1.5 C-3.75 1.125, 0 4.125, 0 4.125 C0 4.125, 3.75 1.125, 3.75 -1.5 C3.75 -3.75, 2.25 -6, 0 -6Z"
        fill={pinColor}
        stroke="hsl(222, 47%, 8%)"
        strokeWidth="0.8"
        style={{ pointerEvents: 'all' }}
      />
      <circle cx="0" cy="-2.5" r="1.2" fill="hsl(222, 47%, 8%)" style={{ pointerEvents: 'all' }} />
    </g>
  );
};

export const AustraliaMap = ({ selectedRegion, onRegionClick }: AustraliaMapProps) => {
  const getRegionFromId = (id: string): string | undefined => {
    return regionMapping[id];
  };

  const handlePathClick = (e: React.MouseEvent, locationId: string) => {
    e.preventDefault();
    e.stopPropagation();
    const region = getRegionFromId(locationId);
    // Only allow South Australia
    if (region === 'sa') {
      onRegionClick(region);
    }
  };

  const handlePinClick = (regionId: string) => {
    onRegionClick(regionId);
  };

  const getPathStyle = (locationId: string) => {
    const region = getRegionFromId(locationId);
    const isSelected = region === selectedRegion;
    const isSA = region === 'sa';
    
    // Only South Australia is clickable - use red theme
    if (isSA) {
      return {
        fill: isSelected ? "hsl(0, 70%, 50%, 0.25)" : "hsl(222, 47%, 11%)",
        stroke: isSelected ? "hsl(0, 70%, 50%)" : "hsl(222, 15%, 22%)",
        strokeWidth: isSelected ? 1 : 0.5,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
      };
    }
    
    // Other regions are not clickable
    return {
      fill: "hsl(222, 47%, 11%)",
      stroke: "hsl(222, 15%, 22%)",
      strokeWidth: 0.5,
      cursor: 'default',
      transition: 'all 0.3s ease',
    };
  };

  return (
    <svg
      viewBox={Australia.viewBox}
      className="w-full h-full"
      preserveAspectRatio="xMidYMid meet"
      aria-label={Australia.label}
    >
      {/* Render all state/territory paths */}
      {Australia.locations.map((location) => {
        const region = getRegionFromId(location.id);
        const isSA = region === 'sa';
        return (
          <path
            key={location.id}
            id={location.id}
            d={location.path}
            aria-label={location.name}
            onClick={isSA ? (e) => handlePathClick(e, location.id) : undefined}
            style={getPathStyle(location.id)}
            className={isSA ? "hover:brightness-125" : ""}
          />
        );
      })}

      {/* Map pins - rendered last to be on top - only South Australia */}
      {Object.entries(pinPositions)
        .filter(([regionId]) => regionId === 'sa')
        .map(([regionId, pos]) => (
          <MapPin
            key={regionId}
            x={pos.x}
            y={pos.y}
            isActive={selectedRegion === regionId}
            regionId={regionId}
            onPinClick={handlePinClick}
          />
        ))}
    </svg>
  );
};
