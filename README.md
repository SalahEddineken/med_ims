# Archive

*Automatically synced with your [v0.app](https://v0.app) deployments*

[![Deployed on Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://vercel.com/shared-8867s-projects/v0-archive)
[![Built with v0](https://img.shields.io/badge/Built%20with-v0.app-black?style=for-the-badge)](https://v0.app/chat/projects/7OBKdWwIbzR)

## Overview

This repository will stay in sync with your deployed chats on [v0.app](https://v0.app).
Any changes you make to your deployed app will be automatically pushed to this repository from [v0.app](https://v0.app).

### ✨ Features
- 🌓 **Light/Dark Mode** - Automatic theme switching with system detection
- 🎨 **Animated Particle Background** - Interactive particles with theme support
- 🎯 **Admin Panel** - Complete content management system
- 🗄️ **Supabase Integration** - Backend database and authentication
- 📱 **Fully Responsive** - Works on all devices

### 🚀 Professional Enhancements (New!)
- 💼 **Download Resume CTA** - Prominent download button with impact metrics
- 💬 **Client Testimonials** - Social proof section with verified 5-star reviews
- 🔄 **Process Methodology** - 6-step workflow visualization
- 🎓 **Certifications** - Google & Meta certificates with progress tracking
- 📝 **Blog Section** - Thought leadership with newsletter signup
- 📊 **Full Case Studies** - Problem→Approach→Solution→Results format
- 📈 **Tool Proficiency** - Visual skill bars showing expertise levels
- 🎥 **Video Introduction** - Ready-to-embed placeholder
- 🌐 **Social Media Integration** - LinkedIn, GitHub throughout

## Deployment

Your project is live at:

**[https://vercel.com/shared-8867s-projects/v0-archive](https://vercel.com/shared-8867s-projects/v0-archive)**

## Build your app

Continue building your app on:

**[https://v0.app/chat/projects/7OBKdWwIbzR](https://v0.app/chat/projects/7OBKdWwIbzR)**

## How It Works

1. Create and modify your project using [v0.app](https://v0.app)
2. Deploy your chats from the v0 interface
3. Changes are automatically pushed to this repository
4. Vercel deploys the latest version from this repository

## Contact Form Setup

This project uses EmailJS for the contact form. To enable it:

1. Follow the setup guide in [EMAILJS_SETUP.md](./EMAILJS_SETUP.md)
2. Create a `.env.local` file with your EmailJS credentials:
   ```env
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
   ```
3. Restart your development server

See [EMAILJS_SETUP.md](./EMAILJS_SETUP.md) for detailed instructions.

## Light/Dark Mode Theme Switching

Your website now supports automatic light/dark mode switching with beautiful animations! 🌓✨

### Features
- 🌞 **Light Mode** - Clean, bright interface
- 🌙 **Dark Mode** - Easy on the eyes in low light
- 🖥️ **System Theme Detection** - Automatically matches OS preference
- 🎨 **Smooth Animations** - Engaging icon transitions
- ✨ **Interactive Effects** - Rotating sun & pulsing hover effects
- 💾 **Persistent Selection** - Saved across sessions
- 📱 **Available on All Devices** - Desktop and mobile support

### How to Use
- **Desktop**: Click the animated sun/moon icon in the header navigation
- **Mobile**: Click the animated sun/moon icon next to the menu button
- **Automatic**: By default, follows your system's theme preference

### Animations
- 🌀 **Smooth slide & rotate** transitions between icons
- ☀️ **Continuously rotating sun** in light mode
- 💫 **Pulsing ring** on hover (theme-aware)
- 🎭 **Alternative day/night scene** available (see guide)

### Customization
See [THEME_SWITCHING_GUIDE.md](./THEME_SWITCHING_GUIDE.md) and [THEME_ANIMATION_GUIDE.md](./THEME_ANIMATION_GUIDE.md) for:
- Changing theme colors
- Customizing animations and speeds
- Alternative animation styles (day/night scene)
- Using themes in your components
- Advanced theme configurations
- Animation presets (bouncy, smooth, snappy, elastic)
- Troubleshooting tips

Quick customize: Edit `app/globals.css` to change colors:
```css
:root {
  --background: #ffffff; /* Light mode background */
  --foreground: #000000; /* Light mode text */
  --primary: #000000; /* Light mode accent - black */
}

.dark {
  --background: #000000; /* Dark mode background */
  --foreground: #ffffff; /* Dark mode text */
  --primary: #ffffff; /* Dark mode accent - white */
}
```

### Recent Updates (October 2024)
- 🚀 **Professional Enhancements**: Added employer-focused features
- ✅ **Hero Section**: Download Resume button + Impact metrics bar
- 💬 **Testimonials**: Social proof section with client reviews
- 🔄 **Process Methodology**: 6-step workflow visualization
- 🎓 **Certifications**: Professional credentials with progress tracking
- 📝 **Blog Preview**: Thought leadership section with newsletter
- 📊 **Case Studies**: Full Problem→Approach→Solution→Results format
- 📈 **Tool Proficiency**: Visual skill levels with years of experience
- 🎥 **Video Introduction**: Ready-to-embed video placeholder
- ✅ **Buttons**: Theme-aware (black on white in light, white on black in dark)
- ✅ **"AVAILABLE FOR WORK" dot**: Gold (#bbaf45) accent color
- ✅ **Primary color**: Dynamic black/white based on theme

## Particles Background

Subtle, elegant animated particles float across your entire website! ✨

### Features
- ✨ **Small, subtle particles** (2px size) that don't distract
- 🌓 **Theme-aware colors**: 
  - White particles in dark mode
  - Black particles in light mode
- 🖱️ **Interactive hover**: Particles repel from cursor
- 🖱️ **Click to spawn**: Add new particles with a click
- 💨 **Smooth animations**: Twinkling opacity and gentle movement
- 📱 Responsive and performant (120 FPS cap)

### Current Configuration
- **150 particles** with connecting lines
- **Size**: 2px (small and subtle)
- **Opacity**: 50% in dark mode, 30% in light mode
- **Movement**: Dynamic, random floating (3x speed)
- **Interactions**: Repulse on hover, spawn on click

### Customization
See [PARTICLES_BACKGROUND_GUIDE.md](./PARTICLES_BACKGROUND_GUIDE.md) for:
- Changing particle count, size, and speed
- Different interaction modes
- Custom colors and styles
- Preset configurations
- Mobile optimization

Quick customize: Edit `components/particles-background-dark.tsx`

## Supabase Integration

This project is now integrated with Supabase for backend services (authentication, database, storage). 

### Quick Start

1. **Create a Supabase project** at [supabase.com](https://supabase.com)
2. **Set up your database** (see [Database Setup](#database-setup) below)
3. **Configure environment variables**:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```
4. **Restart your development server**

The Supabase client is available at `lib/supabase.ts` for use throughout your application.

### Database Setup

Your portfolio data is now stored in Supabase! Follow these steps:

1. Go to your Supabase project → **SQL Editor**
2. Run `supabase/migrations/001_create_schema.sql` (creates all tables)
3. Run `supabase/migrations/002_seed_data.sql` (populates with your data)

**What's included:**
- ✅ 7 database tables (projects, music_tracks, experience, education, certificates, skills, contact_submissions)
- ✅ Row Level Security (RLS) policies
- ✅ Indexes for performance
- ✅ Your existing data pre-populated

See [SUPABASE_DATABASE_SETUP.md](./SUPABASE_DATABASE_SETUP.md) for detailed instructions.

### Resources

| Resource | Description |
|----------|-------------|
| [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) | Complete Supabase setup guide |
| [SUPABASE_DATABASE_SETUP.md](./SUPABASE_DATABASE_SETUP.md) | Database schema & migration guide |
| [SUPABASE_QUICK_REFERENCE.md](./SUPABASE_QUICK_REFERENCE.md) | Code snippets for common operations |
| [DEPLOYMENT.md](./DEPLOYMENT.md) | Deploy to Vercel with Supabase |
| [SUPABASE_NEXT_STEPS.md](./SUPABASE_NEXT_STEPS.md) | Quick start checklist |

### Example Components

Example components showing how to fetch data from Supabase:
- `components/supabase-example.tsx` - Authentication example
- `components/projects-section-supabase.tsx` - Fetch projects from database
- `components/contact-section-supabase.tsx` - Save contact submissions to database

## Admin Panel

A complete admin panel is now available to manage your content through a web interface.

### Features
- ✅ Secure authentication with user dropdown
- ✅ Enhanced dashboard with statistics & recent activity
- ✅ Projects management (full CRUD + search + export)
- ✅ Skills management (full CRUD)
- ✅ Music tracks management (full CRUD)
- ✅ Work experience management (full CRUD)
- ✅ Education management (full CRUD)
- ✅ Certificates management (full CRUD)
- ✅ Contact submissions viewer
- ✅ **Search & filtering** across content
- ✅ **Data export** (CSV/JSON)
- ✅ **Professional layout** with sticky header
- ✅ **Empty states** for better UX
- ✅ Mobile-responsive design

### Getting Started

1. **Create an admin user** in Supabase Dashboard → Authentication → Users
2. **Access the admin panel** at `/admin/login`
3. **Sign in** with your credentials
4. **Start managing** your content!

### Recent Enhancements 🎨
- ✨ New sticky header with user menu
- 🔍 Search functionality across all content
- 📊 Export data to CSV/JSON
- 🎯 Filter and sort options
- 💫 Enhanced dashboard with recent activity
- 🎨 Professional layout improvements

See [ADMIN_PANEL_GUIDE.md](./ADMIN_PANEL_GUIDE.md) for complete documentation and [ADMIN_PANEL_ENHANCEMENTS.md](./ADMIN_PANEL_ENHANCEMENTS.md) for enhancement details.

### Admin Routes
- `/admin` - Dashboard overview
- `/admin/projects` - Manage projects
- `/admin/skills` - Manage skills
- `/admin/music` - Manage music tracks
- `/admin/experience` - Manage work experience
- `/admin/education` - Manage education
- `/admin/certificates` - Manage certificates
- `/admin/contact` - View contact submissions
