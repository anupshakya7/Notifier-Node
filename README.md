# Node.js Notification Processor Microservice

## Overview
This service:
- Subscribes to a Redis channel published by Laravel (`laravel_database_notifications`)
- Processes real-time notifications
- Attempts to update the notification status in Laravel (`processed` or `failed`)
- Retries up to 3 times on failure
- Provides REST endpoints to view Laravel's recent notifications and summary

## Technologies Used
- Node.js
- Fastify (Web Framework)
- ioredis (Redis client)
- Axios (HTTP Client)
- Laravel (As backend API)

## Setup Instructions

### Clone the Project
git clone https://github.com/anupshakya7/Notifier-Node.git
cd Notifier-Node

### Install Dependencies
npm install

### Configure Laravel API Url
If needed update the Laravel API base URL in httpClient.ts

const httpClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // Update if Laravel is hosted elsewhere
  headers: {
    'Content-Type': 'application/json',
  },
});

### Redis Configuration
This service expects Redis to be running locally:
-> export const redis = new Redis();

### Run the Service
npm run dev

### Notification will shown on terminal console when created

### API Endpoints
GET: /
Basic health check

## Hit these on Browser or Postman
### For Recent API
GET /recent
Fetches recent notifications from the Laravel API.

### For Summary API
GET /summary
Fetches summary stats from Laravel (total, processed, failed).

