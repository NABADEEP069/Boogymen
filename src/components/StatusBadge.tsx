import React from 'react';
import { MapPin } from 'lucide-react';

interface StatusBadgeProps {
  isOutsideCampus: boolean;
  lastUpdate?: string;
}

export default function StatusBadge({ isOutsideCampus, lastUpdate }: StatusBadgeProps) {
  if (!isOutsideCampus) return null;

  return (
    <div className="flex items-center space-x-2 bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">
      <MapPin className="h-4 w-4" />
      <span>Outside Campus</span>
      {lastUpdate && (
        <span className="text-green-600 text-xs">
          • Updated {new Date(lastUpdate).toLocaleTimeString()}
        </span>
      )}
    </div>
  );
}