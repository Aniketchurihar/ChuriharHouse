# Churihar Home

Website for Churihar Home. Built with React, Tailwind CSS, GSAP, and Lenis.

## Features

- **Cinematic preloader** with letter-by-letter home name reveal
- **Hero section** with Ken Burns zoom and split-text animation
- **Photo gallery** with masonry layout, category filters, and fullscreen lightbox
- **Video showcase** with YouTube/Vimeo/self-hosted support
- **Features & specifications** with animated counters
- **360° panoramic viewer** for virtual room tours
- **Fully responsive** across mobile, tablet, and desktop
- **Smooth scroll** (Lenis) on desktop
- **Deploy to Vercel** at `churiharhouse.vercel.app` for free

## Customize Your Content

Edit these files to add your own content:

1. **`src/data/siteConfig.js`** - Home name, tagline, contact info, social links
2. **`src/data/photos.js`** - Replace with your photos (paths or URLs) and categories
3. **`src/data/features.js`** - Update features, stats (bedrooms, sq ft, etc.)
4. **`src/data/panoramas.js`** - Add your 360° panorama image paths/URLs
5. **`src/components/VideoSection.jsx`** - Set `videoConfig` (YouTube ID, Vimeo, or MP4 path)
6. **`src/components/HeroSection.jsx`** - Change `heroImage` URL for your exterior photo

## Development

```bash
npm install
npm run dev
```

## Build & Deploy to Vercel

1. Build: `npm run build`
2. Deploy: `npx vercel`
3. When prompted for project name, enter `churiharhouse` for URL **churiharhouse.vercel.app**
4. Or connect your GitHub repo at [vercel.com](https://vercel.com) for automatic deployments on push.
