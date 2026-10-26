import { LucideIcon } from 'lucide-react';

export interface Partner {
  name: string;
  icon: LucideIcon;
  url: string;
}

export interface MediaItem {
  type: 'video' | 'youtube' | 'image';
  url: string;
  alt: string;
}

export interface Document {
  id: string;
  title: string;
  expiry: string;
  status: string;
  icon: LucideIcon;
  image?: string;
  type?: string;
}

export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  plate: string;
  registrationExpiry: string;
  insuranceStatus: string;
  insuranceProvider: string;
  lastInspection: string;
}

export interface HistoryItem {
  id: string;
  service: string;
  date: string;
  status: string;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  idNumber: string;
  address: string;
  photo: string;
  nationality?: string;
  blackPoints?: number;
}

export interface EService {
  id: string;
  title: string;
  icon: LucideIcon;
  desc: string;
  color: string;
  border: string;
  category: string;
  isSmart: boolean;
}

export interface Solution {
  id: string;
  icon: LucideIcon;
  title: string;
  desc: string;
  color: string;
  border: string;
  category: string;
}
