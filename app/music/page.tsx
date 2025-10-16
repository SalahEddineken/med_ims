"use client"

import { useState, useRef, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Play, Pause, SkipBack, SkipForward, Volume2, VolumeX, Music2, Shuffle, Repeat } from "lucide-react"
import { Card } from "@/components/ui/card"
import Image from "next/image"

const musicTracks = [
  {
    id: 1,
    title: "Midnight Crush",
    artist: "Salaheddine Kennouda",
    duration: "3:45",
    genre: "Lofi",
    audioUrl: "/music/Midnight%20Crush.mp3",
    cover: "/music/covers/Midnight%20Crush-Thumbnail.jpg",
  },
  {
    id: 2,
    title: "Urban Echoes",
    artist: "Salaheddine Kennouda",
    duration: "4:12",
    genre: "Ambient",
    audioUrl: "/music/urban-echoes.mp3",
    cover: "/music/covers/urban-echoes.jpg",
  },
  {
    id: 3,
    title: "Digital Sunrise",
    artist: "Salaheddine Kennouda",
    duration: "5:30",
    genre: "Synthwave",
    audioUrl: "/music/digital-sunrise.mp3",
    cover: "/music/covers/digital-sunrise.jpg",
  },
]

export default function MusicPage() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const [isShuffleOn, setIsShuffleOn] = useState(false)
  const [repeatMode, setRepeatMode] = useState<'off' | 'all' | 'one'>('off')
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentTrack = musicTracks[currentTrackIndex]

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => {
      setCurrentTime(audio.currentTime)
    }
    
    const updateDuration = () => {
      if (audio.duration && !isNaN(audio.duration)) {
        setDuration(audio.duration)
      }
    }
    
    const handleEnded = () => {
      if (repeatMode === 'one') {
        audio.currentTime = 0
        audio.play().catch(err => console.error('Playback error:', err))
      } else if (repeatMode === 'all' || currentTrackIndex < musicTracks.length - 1) {
        playNext()
      } else {
        setIsPlaying(false)
        setCurrentTime(0)
      }
    }
    
    const handleCanPlay = () => {
      updateDuration()
    }
    
    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      setIsPlaying(false)
      alert('Cannot load audio file. Please check if the file exists at: ' + currentTrack.audioUrl)
    }

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('durationchange', updateDuration)
    audio.addEventListener('canplay', handleCanPlay)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('error', handleError)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('durationchange', updateDuration)
      audio.removeEventListener('canplay', handleCanPlay)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('error', handleError)
    }
  }, [currentTrackIndex, repeatMode])

  // Load track when index changes
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.src = currentTrack.audioUrl
    audio.load()
    
    if (isPlaying) {
      audio.play().catch(err => console.error('Playback error:', err))
    }
  }, [currentTrackIndex, currentTrack.audioUrl, isPlaying])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
    } else {
      audio.play().catch(err => console.error('Playback error:', err))
    }
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    if (isShuffleOn) {
      const randomIndex = Math.floor(Math.random() * musicTracks.length)
      setCurrentTrackIndex(randomIndex)
    } else {
      setCurrentTrackIndex((prev) => (prev + 1) % musicTracks.length)
    }
  }

  const playPrevious = () => {
    if (currentTime > 3) {
      // If more than 3 seconds have passed, restart current track
      if (audioRef.current) {
        audioRef.current.currentTime = 0
      }
    } else {
      setCurrentTrackIndex((prev) => (prev - 1 + musicTracks.length) % musicTracks.length)
    }
  }

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
    if (newVolume > 0) {
      setIsMuted(false)
      if (audioRef.current) audioRef.current.muted = false
    }
  }

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }

  const toggleShuffle = () => {
    setIsShuffleOn(!isShuffleOn)
  }

  const toggleRepeat = () => {
    setRepeatMode((prev) => {
      if (prev === 'off') return 'all'
      if (prev === 'all') return 'one'
      return 'off'
    })
  }

  const selectTrack = async (index: number) => {
    const audio = audioRef.current
    if (!audio) return
    
    setCurrentTrackIndex(index)
    setCurrentTime(0)
    setDuration(0)
    setIsPlaying(true) // Set this before to trigger the useEffect
  }

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-background py-20 md:py-28">
      <div className="container max-w-6xl mx-auto px-4 md:px-8">
        {/* Hidden Audio Element */}
        <audio ref={audioRef} preload="metadata" />

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-sentient text-4xl md:text-5xl mb-4">Music</h1>
          <p className="font-mono text-sm text-foreground/60">
            Original compositions & soundtracks
          </p>
        </motion.div>

        {/* Main Player Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6 md:p-8 mb-8 bg-background border-border">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Album Art */}
              <div className="flex-shrink-0 mx-auto lg:mx-0">
                <div className="relative w-64 h-64 md:w-80 md:h-80 rounded-lg overflow-hidden bg-foreground/5 border border-border">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Music2 size={80} className="text-foreground/20" />
                  </div>
                  {/* Uncomment when you have cover images
                  <Image
                    src={currentTrack.cover}
                    alt={currentTrack.title}
                    fill
                    className="object-cover"
                  />
                  */}
                </div>
              </div>

              {/* Player Controls */}
              <div className="flex-1 flex flex-col justify-center">
                {/* Track Info */}
                <div className="mb-8">
                  <h2 className="font-sentient text-3xl md:text-4xl mb-2">
                    {currentTrack.title}
                  </h2>
                  <p className="font-mono text-sm text-foreground/60 mb-1">
                    {currentTrack.artist}
                  </p>
                  <p className="font-mono text-xs text-foreground/40">
                    {currentTrack.genre}
                  </p>
                </div>

                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="relative h-2 mb-2 py-1">
                    {/* Progress background */}
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-2 bg-foreground/10 rounded-full" />
                    {/* Progress fill */}
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-primary rounded-full transition-all duration-100"
                      style={{ width: `${duration > 0 ? (currentTime / duration) * 100 : 0}%` }}
                    />
                    {/* Range input */}
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      step="0.1"
                      className="relative w-full h-2 bg-transparent appearance-none cursor-pointer z-10
                        [&::-webkit-slider-runnable-track]:bg-transparent
                        [&::-webkit-slider-runnable-track]:h-2
                        [&::-webkit-slider-thumb]:appearance-none 
                        [&::-webkit-slider-thumb]:w-5
                        [&::-webkit-slider-thumb]:h-5
                        [&::-webkit-slider-thumb]:-mt-1.5
                        [&::-webkit-slider-thumb]:rounded-full 
                        [&::-webkit-slider-thumb]:bg-primary
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-background
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:shadow-xl
                        [&::-webkit-slider-thumb]:hover:scale-125
                        [&::-webkit-slider-thumb]:active:scale-110
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-moz-range-track]:bg-transparent
                        [&::-moz-range-track]:h-2
                        [&::-moz-range-thumb]:appearance-none
                        [&::-moz-range-thumb]:w-5
                        [&::-moz-range-thumb]:h-5
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-primary
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-background
                        [&::-moz-range-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:shadow-xl"
                    />
                  </div>
                  <div className="flex justify-between">
                    <span className="font-mono text-xs text-foreground/60">
                      {formatTime(currentTime)}
                    </span>
                    <span className="font-mono text-xs text-foreground/60">
                      {formatTime(duration)}
                    </span>
                  </div>
                </div>

                {/* Playback Controls */}
                <div className="flex items-center justify-center gap-4 mb-6">
                  <button
                    onClick={toggleShuffle}
                    className={`p-2 rounded-full transition-colors ${
                      isShuffleOn
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    <Shuffle size={20} />
                  </button>

                  <button
                    onClick={playPrevious}
                    className="p-3 rounded-full hover:bg-foreground/10 transition-colors"
                  >
                    <SkipBack size={24} />
                  </button>

                  <button
                    onClick={togglePlay}
                    className="w-16 h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center hover:bg-primary/20 transition-colors"
                  >
                    {isPlaying ? (
                      <Pause size={32} className="text-primary" />
                    ) : (
                      <Play size={32} className="text-primary ml-1" />
                    )}
                  </button>

                  <button
                    onClick={playNext}
                    className="p-3 rounded-full hover:bg-foreground/10 transition-colors"
                  >
                    <SkipForward size={24} />
                  </button>

                  <button
                    onClick={toggleRepeat}
                    className={`p-2 rounded-full transition-colors ${
                      repeatMode !== 'off'
                        ? 'text-primary bg-primary/10'
                        : 'text-foreground/60 hover:text-foreground hover:bg-foreground/5'
                    }`}
                  >
                    <Repeat size={20} />
                    {repeatMode === 'one' && (
                      <span className="absolute -mt-6 ml-3 text-xs font-bold">1</span>
                    )}
                  </button>
                </div>

                {/* Volume Control */}
                <div className="flex items-center justify-center gap-3">
                  <button
                    onClick={toggleMute}
                    className="p-2 rounded-full hover:bg-foreground/10 transition-colors"
                  >
                    {isMuted || volume === 0 ? (
                      <VolumeX size={20} className="text-foreground/60" />
                    ) : (
                      <Volume2 size={20} className="text-foreground/60" />
                    )}
                  </button>
                  <div className="relative w-32 h-1 py-2">
                    <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-foreground/10 rounded-full" />
                    <div 
                      className="absolute left-0 top-1/2 -translate-y-1/2 h-1 bg-primary rounded-full transition-all duration-100"
                      style={{ width: `${(isMuted ? 0 : volume) * 100}%` }}
                    />
                    <input
                      type="range"
                      min="0"
                      max="1"
                      step="0.01"
                      value={isMuted ? 0 : volume}
                      onChange={handleVolumeChange}
                      className="relative w-full h-1 bg-transparent appearance-none cursor-pointer z-10
                        [&::-webkit-slider-runnable-track]:bg-transparent
                        [&::-webkit-slider-runnable-track]:h-1
                        [&::-webkit-slider-thumb]:appearance-none
                        [&::-webkit-slider-thumb]:w-4
                        [&::-webkit-slider-thumb]:h-4
                        [&::-webkit-slider-thumb]:-mt-1.5
                        [&::-webkit-slider-thumb]:rounded-full
                        [&::-webkit-slider-thumb]:bg-primary
                        [&::-webkit-slider-thumb]:border-2
                        [&::-webkit-slider-thumb]:border-background
                        [&::-webkit-slider-thumb]:cursor-pointer
                        [&::-webkit-slider-thumb]:shadow-lg
                        [&::-webkit-slider-thumb]:hover:scale-125
                        [&::-webkit-slider-thumb]:transition-transform
                        [&::-moz-range-track]:bg-transparent
                        [&::-moz-range-track]:h-1
                        [&::-moz-range-thumb]:appearance-none
                        [&::-moz-range-thumb]:w-4
                        [&::-moz-range-thumb]:h-4
                        [&::-moz-range-thumb]:rounded-full
                        [&::-moz-range-thumb]:bg-primary
                        [&::-moz-range-thumb]:border-2
                        [&::-moz-range-thumb]:border-background
                        [&::-moz-range-thumb]:cursor-pointer
                        [&::-moz-range-thumb]:shadow-lg"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Playlist */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="font-sentient text-2xl mb-4">Playlist</h3>
          <div className="space-y-2">
            {musicTracks.map((track, index) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className={`p-4 cursor-pointer transition-all duration-300 ${
                    currentTrackIndex === index
                      ? 'bg-primary/10 border-primary/50'
                      : 'bg-background border-border hover:border-primary/30'
                  }`}
                  onClick={() => selectTrack(index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded bg-foreground/5 border border-border flex items-center justify-center flex-shrink-0">
                        {currentTrackIndex === index && isPlaying ? (
                          <motion.div
                            animate={{ scale: [1, 1.2, 1] }}
                            transition={{ repeat: Infinity, duration: 1 }}
                          >
                            <Music2 size={16} className="text-primary" />
                          </motion.div>
                        ) : (
                          <span className="font-mono text-sm text-foreground/60">
                            {index + 1}
                          </span>
                        )}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-sentient text-base truncate">
                          {track.title}
                        </h4>
                        <p className="font-mono text-xs text-foreground/60">
                          {track.genre}
                        </p>
                      </div>
                    </div>
                    <span className="font-mono text-sm text-foreground/60 flex-shrink-0 ml-4">
                      {track.duration}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Note about adding music */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 p-4 border border-border/50 rounded-lg bg-foreground/5"
        >
          <p className="font-mono text-xs text-foreground/60 text-center">
            💡 To add your music files: Place MP3 files in <code className="text-primary">/public/music/</code> and cover images in <code className="text-primary">/public/music/covers/</code>
          </p>
        </motion.div>
      </div>
    </div>
  )
}

