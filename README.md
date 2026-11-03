# Artsy — Creator Community

Artsy is a responsive creator community and artwork marketplace demo built with React. Browse a sample art feed, discover artists, create posts, manage notifications, and add artwork to a shopping bag.

## Run locally

Requirements: Node.js and npm.

```bash
npm install
npm start
```

The development server opens at `http://localhost:3000`. To create an optimized production build:

```bash
npm run build
```

## Features

- Responsive feed with post search, likes, save controls, and share links
- Create posts and browse sample artists
- Shop sample artwork and add items to a shopping bag
- Notifications, conversations, profile, wallet, subscription, and settings pages
- Posts and likes, notification state, shopping bag, and preferences persist in this browser using `localStorage`

## Demo limitations

This repository contains a front-end demo and sample content. It does not include user accounts, a server, real-time messaging, payment processing, or payout services. Data saved in `localStorage` is limited to the current browser and device. Clearing this site's browser storage resets the locally saved demo data.
