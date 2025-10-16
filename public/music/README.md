# Music Files

This directory contains the music files for your portfolio website.

## Directory Structure

```
public/music/
  ├── README.md (this file)
  ├── midnight-dreams.mp3
  ├── urban-echoes.mp3
  ├── digital-sunrise.mp3
  └── covers/
      ├── midnight-dreams.jpg
      ├── urban-echoes.jpg
      └── digital-sunrise.jpg
```

## Adding Your Music

1. **Audio Files**: Place your MP3 files directly in the `public/music/` directory
   - Supported format: MP3
   - Recommended: 320kbps for best quality
   - File names should match the `audioUrl` in your track configuration

2. **Cover Images**: Place cover art in the `public/music/covers/` directory
   - Supported formats: JPG, PNG, WEBP
   - Recommended size: 800x800px (square)
   - File names should match the `cover` in your track configuration

## Current Tracks

The following tracks are configured in the music player:

1. **Midnight Dreams**
   - Audio: `/music/midnight-dreams.mp3`
   - Cover: `/music/covers/midnight-dreams.jpg`
   - Genre: Electronic
   - Duration: 3:45

2. **Urban Echoes**
   - Audio: `/music/urban-echoes.mp3`
   - Cover: `/music/covers/urban-echoes.jpg`
   - Genre: Ambient
   - Duration: 4:12

3. **Digital Sunrise**
   - Audio: `/music/digital-sunrise.mp3`
   - Cover: `/music/covers/digital-sunrise.jpg`
   - Genre: Synthwave
   - Duration: 5:30

## Adding More Tracks

To add more tracks, edit the `musicTracks` array in:
- `components/showcase-section.tsx` (for the showcase section)
- `app/music/page.tsx` (for the dedicated music page)

Example:
```typescript
{
  id: 4,
  title: "Your Track Name",
  artist: "Salaheddine Kennouda",
  duration: "3:30",
  genre: "Your Genre",
  audioUrl: "/music/your-track-name.mp3",
  cover: "/music/covers/your-track-name.jpg",
}
```

## Note

Remember to rebuild your Next.js site after adding new files:
```bash
npm run build
```

And redeploy to Firebase:
```bash
firebase deploy
```

