# Saaed Mobile Application

This directory contains the separate mobile application project for iOS and Android.

## Architecture & Database Idea
As discussed, this mobile app is designed to share the same **Firebase / API Backend** as the web application. 

### Why a Single Database?
1. **Real-time Sync**: If a user submits an accident report via the Web, they can immediately see it in their mobile "History" tab.
2. **Unified Authentication**: Users use the same login credentials for both platforms.
3. **Data Integrity**: No need to sync multiple databases; there is only one "Source of Truth."

## Deployment
- **iOS**: Built via Xcode or Expo Application Services (EAS).
- **Android**: Built via Android Studio or EAS.

## Getting Started
1. `cd mobile`
2. `npm install`
3. `npm start`
