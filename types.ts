import React from 'react';

export interface Post {
  id: number;
  type: 'post-it' | 'photo';
  content: string;
  color: string;
  rotation: string;
  imageUrl?: string;
  author?: string;
  from?: string;
  to?: string;
  date?: string;
}

export interface LinkItem {
    id: number;
    title: string;
    href?: string;
    onClick?: () => void;
    icon: React.ReactNode;
    color: string;
}

export interface CalendarEvent {
  id: string; // Use string for unique IDs like UUIDs or composite keys
  date: string; // YYYY-MM-DD format
  title: string;
  color: string; // e.g., 'bg-blue-500'
}


export interface WeatherData {
  city: string;
  temperature: string;
  description: string;
  icon: string;
}