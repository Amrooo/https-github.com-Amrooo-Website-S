/**
 * Redirection links analyzed from https://phpstack-1642338-6696289.cloudwaysapps.com/en/
 * and official SAAED digital portals (SAAED 360, EVG, Sahell, etc.)
 */

export const BASE_WEBSITE_URL = 'https://phpstack-1642338-6696289.cloudwaysapps.com';
export const SAAED_ESERVICES_URL = 'https://saaed360.saaed.ae/EServices';
export const SAAED_ACCIDENT_REPORT_URL = 'https://saaed360.saaed.ae/EServices/accident-report/';
export const SAAED_ESCORTS_URL = 'https://saaed360.saaed.ae/escorts/';
export const EVG_URL = 'https://evg.ae/';
export const SAHELL_URL = 'https://www.sahell.ae/home';
export const APP_STORE_URL = 'https://apps.apple.com/ae/app/saaed/id687287388';
export const GOOGLE_PLAY_URL = 'https://play.google.com/store/apps/details?id=international.softec.saaed&hl=en_US&gl=US';

/**
 * Returns the exact redirection URL corresponding to a service ID and language
 * as on https://phpstack-1642338-6696289.cloudwaysapps.com
 */
export const getServiceRedirectionUrl = (serviceId: string, lang: string = 'en'): string => {
  const isArabic = lang === 'ar';
  const prefix = isArabic ? '' : '/en';

  switch (serviceId?.toLowerCase()) {
    // 1. Accident reporting and accident claims
    case 'report':
    case 'report_accident':
    case 'request_report':
    case 'copy_report':
    case 'track':
    case 'against_unknown':
    case 'non_accident':
    case 'acc_recon':
    case 'accident_report':
      return SAAED_ACCIDENT_REPORT_URL;

    // 2. Fines & Vehicle gate
    case 'fines':
    case 'fines_payment':
    case 'fine_payment':
    case 'pay':
    case 'evg':
    case 'markabti':
      return EVG_URL;

    // 3. Heavy freight escorts & abnormal loads
    case 'heavy_trucks':
    case 'escorts':
    case 'escort':
    case 'unusual_payloads':
    case 'cargo_escort':
      return SAAED_ESCORTS_URL;

    // 4. Vehicle towing & roadside recovery
    case 'assist':
    case 'towing':
    case 'vehicle_towing':
    case 'recovery':
    case 'vehicle_recovery':
    case 'road_support':
      return `${BASE_WEBSITE_URL}${prefix}/vehicle-recovery/`;

    // 5. Organizing event requests & crowd traffic
    case 'events':
    case 'events_traffic':
    case 'organizing_events':
    case 'organizing_event_request':
    case 'school_zones':
      return `${BASE_WEBSITE_URL}${prefix}/organizing-event-request/`;

    // 6. Smart Parking & Impound Yards
    case 'parking':
    case 'smart_parking':
    case 'parking_sub':
    case 'release':
    case 'smart_impound':
    case 'impound':
      return `${BASE_WEBSITE_URL}${prefix}/services/#smart-parking`;

    // 7. Smart Services, Safe City & Tech Solutions
    case 'smart_tech':
    case 'smart_services':
    case 'smart_radar':
    case 'smart_gates':
    case 'safe_city':
    case 'command_control':
    case 'ai_solutions':
      return `${BASE_WEBSITE_URL}${prefix}/services/#smart-services`;

    // 8. Inspection, Oversight & Compliance
    case 'inspection':
    case 'field_inspection':
    case 'transport_inspection':
    case 'complex_inspection':
    case 'delivery_inspection':
    case 'residential_inspection':
    case 'workshop_classification':
    case 'civil_defence_inspection':
    case 'delivery_platform':
      return `${BASE_WEBSITE_URL}${prefix}/services/#inspection-services`;

    // 9. Traffic Services section
    case 'traffic_services':
    case 'road_transport':
    case 'road_patrols':
    case 'support':
    case 'home_security':
    case 'repair':
      return `${BASE_WEBSITE_URL}${prefix}/services/#traffic-services`;

    // 10. Sahell Platform
    case 'sahell':
      return SAHELL_URL;

    // 11. Full Services Catalog
    case 'explore':
    case 'all_services':
    case 'services':
      return `${BASE_WEBSITE_URL}${prefix}/services/`;

    // 12. SAAED e-Services Portal & Certificates
    case 'certificate':
    case 'certificates':
    case 'police_clearance':
    case 'lost_certificate':
    case 'objection':
    case 'saaed_eservices':
    case 'eservices':
    default:
      return SAAED_ESERVICES_URL;
  }
};

/**
 * Returns the exact category anchor URL on the reference website
 */
export const getCategoryRedirectionUrl = (categoryId: string, lang: string = 'en'): string => {
  const isArabic = lang === 'ar';
  const prefix = isArabic ? '' : '/en';

  switch (categoryId) {
    case 'road_transport':
      return `${BASE_WEBSITE_URL}${prefix}/services/#traffic-services`;
    case 'smart_parking':
      return `${BASE_WEBSITE_URL}${prefix}/services/#smart-parking`;
    case 'smart_tech':
      return `${BASE_WEBSITE_URL}${prefix}/services/#smart-services`;
    case 'inspection':
    case 'transport_inspection':
    case 'complex_inspection':
    case 'delivery_inspection':
    case 'residential_inspection':
      return `${BASE_WEBSITE_URL}${prefix}/services/#inspection-services`;
    case 'saaed_eservices':
    case 'eservices':
      return `${BASE_WEBSITE_URL}${prefix}/services/#e-services`;
    default:
      return `${BASE_WEBSITE_URL}${prefix}/services/`;
  }
};
