import React from 'react';
import * as Lucide from 'lucide-react';

// Distinct, verified operational Saaed slider photo assets (zero duplicates, zero screenshots)
import eventsCImg from '../assets/02-events-c.jpg';
import trafficNightImg from '../assets/traffic-night.jpg';
import escortTankImg from '../assets/04-escort-tank-night__1__bb334d84.jpg';
import towingFleetImg from '../assets/06-towing-fleet_1ba2f17e.jpg';
import inspectionImg from '../assets/inspection-v2_10524915.jpg';
import parkingInspectorImg from '../assets/parking-inspector_6fffd83b.jpg';
import parkingMachineImg from '../assets/parking-mawaqif-machine_7b4090cd.jpg';
import parkingBusImg from '../assets/parking-team-bus_23ea568d.jpg';

/**
 * High-fidelity authentic icons & entity brand logos
 */
export const ServicePDFIcon: React.FC<{ serviceId: string; className?: string }> = ({ 
  serviceId, 
  className = "w-10 h-10" 
}) => {
  const IconComponent = (Lucide as any)[
    serviceId === 'acc_recon' ? 'CarCrash' :
    serviceId === 'delivery_platform' ? 'Truck' :
    serviceId === 'heavy_trucks' ? 'ContainerTruck' :
    serviceId === 'vehicle_towing' ? 'Wrench' :
    serviceId === 'school_zones' ? 'School' :
    serviceId === 'events_traffic' ? 'CalendarDays' :
    serviceId === 'road_patrols' ? 'Radio' :
    serviceId === 'parking_mgmt' ? 'ParkingCircle' :
    serviceId === 'safe_city' ? 'Globe' :
    serviceId === 'c4i_centers' ? 'Cpu' :
    serviceId === 'ai_solutions' ? 'BrainCircuit' :
    ''
  ];

  if (IconComponent) {
    return <IconComponent className={className} />;
  }

  switch (serviceId) {
    case 'acc_recon':
    case 'patrols_recon':
    case 'road_patrols':
    case 'smart_patrols':
      return <Lucide.ShieldAlert className={className} />;

    case 'heavy_trucks':
    case 'escort_service':
      return <Lucide.ShieldCheck className={className} />;

    case 'vehicle_towing':
    case 'emergency_towing':
      return <Lucide.Wrench className={className} />;

    default:
      return (
        <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="46" fill="#EFF6FF" stroke="#3B82F6" strokeWidth="2.5" />
          <rect x="30" y="30" width="40" height="40" rx="8" fill="#2563EB" />
        </svg>
      );
  }
};

/**
 * Representing photo banner / thumbnail box for each service using distinct slider operational photos only.
 */
export const ServiceRepresentingPhoto: React.FC<{ 
  serviceId: string; 
  title?: string;
  categoryColor?: string;
  className?: string;
}> = ({ 
  serviceId, 
  title = '', 
  className = "w-full h-full object-cover" 
}) => {
  const sliderPhotos = [
    eventsCImg,
    trafficNightImg,
    escortTankImg,
    towingFleetImg,
    inspectionImg,
    parkingInspectorImg,
    parkingMachineImg,
    parkingBusImg
  ];

  let imgSrc = eventsCImg;

  if (serviceId.includes('tank') || serviceId.includes('cargo') || serviceId.includes('freight') || serviceId.includes('heavy') || serviceId.includes('escort') || serviceId === 'heavy_trucks') {
    imgSrc = escortTankImg;
  } else if (serviceId.includes('towing') || serviceId.includes('rescue') || serviceId.includes('flatbed') || serviceId === 'vehicle_towing') {
    imgSrc = towingFleetImg;
  } else if (serviceId.includes('inspect') || serviceId.includes('audit') || serviceId.includes('chassis') || serviceId.includes('technical') || serviceId.includes('ai') || serviceId.includes('radar')) {
    imgSrc = inspectionImg;
  } else if (serviceId.includes('mawaqif') || serviceId.includes('meter') || serviceId.includes('pay') || serviceId.includes('kiosk')) {
    imgSrc = parkingMachineImg;
  } else if (serviceId.includes('parking') || serviceId.includes('zone')) {
    imgSrc = parkingInspectorImg;
  } else if (serviceId.includes('bus') || serviceId.includes('transit') || serviceId.includes('public_trans') || serviceId.includes('school')) {
    imgSrc = parkingBusImg;
  } else if (serviceId.includes('circuit') || serviceId.includes('yas') || serviceId.includes('fleet') || serviceId.includes('night') || serviceId.includes('patrol') || serviceId === 'road_patrols') {
    imgSrc = trafficNightImg;
  } else if (serviceId.includes('event') || serviceId.includes('crowd') || serviceId.includes('exhibition')) {
    imgSrc = eventsCImg;
  } else {
    let hash = 0;
    for (let i = 0; i < serviceId.length; i++) {
      hash = (hash * 31 + serviceId.charCodeAt(i)) >>> 0;
    }
    imgSrc = sliderPhotos[hash % sliderPhotos.length];
  }

  return (
    <div className="w-full h-full relative overflow-hidden bg-slate-900 group">
      <img 
        src={imgSrc} 
        alt={title || serviceId} 
        className={`w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300 ${className}`}
      />
    </div>
  );
};
