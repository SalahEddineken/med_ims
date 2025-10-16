"use client"

import { Card } from "./ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { useState, useRef, useEffect } from "react"
import { Play, Music2, X, ChevronLeft, ChevronRight, Pause, Volume2, VolumeX } from "lucide-react"

const softwareProjects = [
  {
    title: "Analytics Dashboard",
    description: "Real-time analytics platform with interactive charts and data visualization",
    images: ["/analytics-dashboard.png", "/sales-analytics-dashboard.png", "/customer-behavior-analysis.jpg"],
    tags: ["React", "TypeScript", "Chart.js"],
    features: ["Real-time data updates", "Custom dashboards", "Interactive charts"],
  },
  {
    title: "Task Management App",
    description: "Collaborative task management tool with drag-and-drop functionality",
    images: ["/task-management-app.png", "/ecommerce-platform-interface.png"],
    tags: ["Next.js", "Prisma", "PostgreSQL"],
    features: ["Drag & drop interface", "Real-time sync", "Team assignments"],
  },
  {
    title: "E-commerce Platform",
    description: "Full-featured online store with payment integration and inventory management",
    images: ["/ecommerce-platform-interface.png", "/task-management-app.png", "/analytics-dashboard.png"],
    tags: ["React", "Stripe", "Node.js"],
    features: ["Secure payments", "Inventory management", "Order tracking"],
  },
]

const renders3D = [
  {
    title: "Modern Architecture",
    description: "Photorealistic architectural visualization of a contemporary building",
    images: ["/modern-architecture-3d-render.jpg", "/product-visualization-3d-render.jpg", "/abstract-3d-composition-render.jpg"],
    tools: ["Blender", "Cycles", "Photoshop"],
    features: ["Photorealistic lighting", "Accurate materials", "High resolution"],
  },
  {
    title: "Product Visualization",
    description: "High-quality product render for marketing materials",
    images: ["/product-visualization-3d-render.jpg", "/modern-architecture-3d-render.jpg"],
    tools: ["Cinema 4D", "Octane", "After Effects"],
    features: ["Studio lighting", "Material accuracy", "Marketing ready"],
  },
  {
    title: "Abstract Composition",
    description: "Creative abstract 3D artwork exploring form and light",
    images: ["/abstract-3d-composition-render.jpg", "/abstract-motion-graphics.png", "/product-visualization-3d-render.jpg"],
    tools: ["Blender", "Geometry Nodes", "Substance"],
    features: ["Procedural generation", "Custom shaders", "Artistic exploration"],
  },
]

const otherWorks = [
  {
    title: "Brand Identity Design",
    description: "Complete brand identity system including logo, colors, and typography",
    images: ["/brand-identity-design-mockup.jpg", "/mobile-app-ui-ux-design.jpg"],
    category: "Design",
    features: ["Logo design", "Color system", "Typography"],
  },
  {
    title: "Motion Graphics Reel",
    description: "Collection of animated graphics and visual effects for various clients",
    images: ["/abstract-motion-graphics.png", "/brand-identity-design-mockup.jpg", "/mobile-app-ui-ux-design.jpg"],
    category: "Animation",
    features: ["2D/3D animation", "Visual effects", "Client projects"],
  },
  {
    title: "UI/UX Case Study",
    description: "Comprehensive redesign of a mobile banking application",
    images: ["/mobile-app-ui-ux-design.jpg", "/brand-identity-design-mockup.jpg"],
    category: "UX Design",
    features: ["User research", "Wireframing", "Prototyping"],
  },
]

const musicTracks = [
  {
    id: 1,
    title: "Midnight Crush",
    duration: "3:45",
    genre: "Lofi",
    audioUrl: "/music/Midnight%20Crush.mp3", // URL encoded space
    cover: "/music/covers/Midnight%20Crush-Thumbnail.jpg",
  },
  {
    id: 2,
    title: "Urban Echoes",
    duration: "4:12",
    genre: "Ambient",
    audioUrl: "/music/urban-echoes.mp3",
    cover: "/music/covers/urban-echoes.jpg",
  },
  {
    id: 3,
    title: "Digital Sunrise",
    duration: "5:30",
    genre: "Synthwave",
    audioUrl: "/music/digital-sunrise.mp3",
    cover: "/music/covers/digital-sunrise.jpg",
  },
]

export function ShowcaseSection() {
  const [activeTab, setActiveTab] = useState("software")
  const [selectedSoftware, setSelectedSoftware] = useState<typeof softwareProjects[0] | null>(null)
  const [selected3D, setSelected3D] = useState<typeof renders3D[0] | null>(null)
  const [selectedOther, setSelectedOther] = useState<typeof otherWorks[0] | null>(null)
  const [currentSoftwareImage, setCurrentSoftwareImage] = useState(0)
  const [current3DImage, setCurrent3DImage] = useState(0)
  const [currentOtherImage, setCurrentOtherImage] = useState(0)
  
  // Music player state
  const [currentTrack, setCurrentTrack] = useState<typeof musicTracks[0] | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(1)
  const [isMuted, setIsMuted] = useState(false)
  const audioRef = useRef<HTMLAudioElement>(null)
  
  // Music player handlers
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
      setIsPlaying(false)
      setCurrentTime(0)
    }
    
    const handleCanPlay = () => {
      updateDuration()
    }
    
    const handleError = (e: Event) => {
      console.error('Audio error:', e)
      setIsPlaying(false)
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
  }, [])
  
  const togglePlay = async (track: typeof musicTracks[0]) => {
    const audio = audioRef.current
    if (!audio) return
    
    if (currentTrack?.id === track.id) {
      if (isPlaying) {
        audio.pause()
        setIsPlaying(false)
      } else {
        try {
          await audio.play()
          setIsPlaying(true)
        } catch (err) {
          console.error('Playback error:', err)
          alert('Cannot play audio. Please make sure the audio file exists at: ' + track.audioUrl)
        }
      }
    } else {
      setCurrentTrack(track)
      setCurrentTime(0)
      setDuration(0)
      audio.src = track.audioUrl
      audio.load()
      
      // Wait for audio to be ready
      audio.addEventListener('canplay', async function playWhenReady() {
        try {
          await audio.play()
          setIsPlaying(true)
        } catch (err) {
          console.error('Playback error:', err)
          alert('Cannot play audio. Please make sure the audio file exists at: ' + track.audioUrl)
        }
        audio.removeEventListener('canplay', playWhenReady)
      })
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
  }
  
  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value)
    setCurrentTime(newTime)
    if (audioRef.current) {
      audioRef.current.currentTime = newTime
    }
  }
  
  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00"
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <section className="py-20 md:py-28 relative z-0">
      {/* Hidden Audio Element - Always mounted */}
      <audio ref={audioRef} preload="metadata" />
      
      <div className="container max-w-7xl mx-auto px-4 md:px-8 my-7">
        <div className="max-w-6xl mx-auto">
          <div className="mb-12 md:mb-16">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-sentient mb-4">
              Creative <i className="font-light">Showcase</i>
            </h2>
            <p className="font-mono text-foreground/60">A collection of software, 3D renders, music, and creative works</p>
          </div>

          <Tabs defaultValue="software" className="w-full" onValueChange={setActiveTab}>
            <div className="flex justify-center mb-12">
              <TabsList className="inline-flex h-12 items-center justify-center rounded-full bg-background/50 border border-border p-1 backdrop-blur-sm">
                <TabsTrigger 
                  value="software" 
                  className="relative px-4 md:px-6 py-2 font-mono text-xs md:text-sm uppercase transition-all data-[state=active]:text-foreground data-[state=active]:bg-transparent text-foreground/60 hover:text-foreground rounded-full"
                >
                  {activeTab === "software" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Software</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="3d"
                  className="relative px-4 md:px-6 py-2 font-mono text-xs md:text-sm uppercase transition-all data-[state=active]:text-foreground data-[state=active]:bg-transparent text-foreground/60 hover:text-foreground rounded-full"
                >
                  {activeTab === "3d" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">3D Renders</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="music"
                  className="relative px-4 md:px-6 py-2 font-mono text-xs md:text-sm uppercase transition-all data-[state=active]:text-foreground data-[state=active]:bg-transparent text-foreground/60 hover:text-foreground rounded-full"
                >
                  {activeTab === "music" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Music</span>
                </TabsTrigger>
                <TabsTrigger 
                  value="other"
                  className="relative px-4 md:px-6 py-2 font-mono text-xs md:text-sm uppercase transition-all data-[state=active]:text-foreground data-[state=active]:bg-transparent text-foreground/60 hover:text-foreground rounded-full"
                >
                  {activeTab === "other" && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-primary/20 border border-primary/40 rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                  <span className="relative z-10">Other</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="software">
              <AnimatePresence mode="wait">
                <motion.div
                  key="software"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {softwareProjects.map((project, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className="overflow-hidden bg-background border-border hover:border-primary/50 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedSoftware(project)}
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="relative aspect-video md:aspect-auto">
                            <Image
                              src={project.images[0] || "/placeholder.svg"}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6 md:p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-sentient mb-3">{project.title}</h3>
                            <p className="font-mono text-sm text-foreground/60 mb-6">{project.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {project.tags.map((tag, tagIndex) => (
                                <span
                                  key={tagIndex}
                                  className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-full"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-primary/60 font-mono mt-auto">Click for details →</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="3d">
              <AnimatePresence mode="wait">
                <motion.div
                  key="3d"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {renders3D.map((render, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className="overflow-hidden bg-background border-border hover:border-primary/50 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelected3D(render)}
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="relative aspect-video md:aspect-auto">
                            <Image
                              src={render.images[0] || "/placeholder.svg"}
                              alt={render.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="p-6 md:p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-sentient mb-3">{render.title}</h3>
                            <p className="font-mono text-sm text-foreground/60 mb-6">{render.description}</p>
                            <div className="flex flex-wrap gap-2 mb-3">
                              {render.tools.map((tool, toolIndex) => (
                                <span
                                  key={toolIndex}
                                  className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-full"
                                >
                                  {tool}
                                </span>
                              ))}
                            </div>
                            <p className="text-xs text-primary/60 font-mono mt-auto">Click for details →</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="music">
              <AnimatePresence mode="wait">
                <motion.div
                  key="music"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="max-w-3xl mx-auto space-y-4"
                >
                  {musicTracks.map((track, index) => {
                    const isCurrentTrack = currentTrack?.id === track.id
                    const isTrackPlaying = isCurrentTrack && isPlaying
                    
                    return (
                      <motion.div
                        key={track.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className={`p-4 sm:p-6 bg-background border-border hover:border-primary/50 transition-all duration-300 ${isCurrentTrack ? 'border-primary/50 bg-primary/5' : ''}`}>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between gap-3">
                              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                                <button 
                                  onClick={() => togglePlay(track)}
                                  className="w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center hover:bg-primary/20 transition-colors"
                                >
                                  {isTrackPlaying ? (
                                    <Pause size={16} className="text-primary" />
                                  ) : (
                                    <Play size={16} className="text-primary ml-0.5" />
                                  )}
                                </button>
                                <div className="min-w-0 flex-1">
                                  <h3 className="font-sentient text-base sm:text-lg truncate">{track.title}</h3>
                                  <p className="font-mono text-xs text-foreground/60">{track.genre}</p>
                                </div>
                              </div>
                              <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                                <span className="font-mono text-xs sm:text-sm text-foreground/60">
                                  {isCurrentTrack ? formatTime(currentTime) : track.duration}
                                </span>
                                <Music2 size={18} className="text-foreground/40 hidden xs:block" />
                              </div>
                            </div>
                            
                            {/* Progress Bar - Only show for current track */}
                            {isCurrentTrack && (
                              <div className="space-y-2">
                                <div className="relative pt-2 pb-2">
                                  {/* Progress background */}
                                  <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1.5 bg-foreground/10 rounded-full" />
                                  {/* Progress fill */}
                                  <div 
                                    className="absolute left-0 top-1/2 -translate-y-1/2 h-1.5 bg-primary rounded-full transition-all duration-100"
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
                                    className="relative w-full h-1.5 bg-transparent appearance-none cursor-pointer z-10
                                      [&::-webkit-slider-runnable-track]:bg-transparent
                                      [&::-webkit-slider-runnable-track]:h-1.5
                                      [&::-webkit-slider-thumb]:appearance-none 
                                      [&::-webkit-slider-thumb]:w-4
                                      [&::-webkit-slider-thumb]:h-4
                                      [&::-webkit-slider-thumb]:-mt-1
                                      [&::-webkit-slider-thumb]:rounded-full 
                                      [&::-webkit-slider-thumb]:bg-primary
                                      [&::-webkit-slider-thumb]:border-2
                                      [&::-webkit-slider-thumb]:border-background
                                      [&::-webkit-slider-thumb]:cursor-pointer
                                      [&::-webkit-slider-thumb]:shadow-lg
                                      [&::-webkit-slider-thumb]:hover:scale-125
                                      [&::-webkit-slider-thumb]:active:scale-110
                                      [&::-webkit-slider-thumb]:transition-transform
                                      [&::-moz-range-track]:bg-transparent
                                      [&::-moz-range-track]:h-1.5
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
                                <div className="flex items-center gap-2 justify-end">
                                  <button
                                    onClick={toggleMute}
                                    className="p-1 hover:bg-foreground/10 rounded transition-colors"
                                  >
                                    {isMuted ? (
                                      <VolumeX size={14} className="text-foreground/60" />
                                    ) : (
                                      <Volume2 size={14} className="text-foreground/60" />
                                    )}
                                  </button>
                                  <div className="relative w-16 py-2">
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
                                        [&::-webkit-slider-thumb]:w-3
                                        [&::-webkit-slider-thumb]:h-3
                                        [&::-webkit-slider-thumb]:-mt-1
                                        [&::-webkit-slider-thumb]:rounded-full
                                        [&::-webkit-slider-thumb]:bg-primary
                                        [&::-webkit-slider-thumb]:border
                                        [&::-webkit-slider-thumb]:border-background
                                        [&::-webkit-slider-thumb]:cursor-pointer
                                        [&::-webkit-slider-thumb]:shadow-md
                                        [&::-webkit-slider-thumb]:hover:scale-125
                                        [&::-moz-range-track]:bg-transparent
                                        [&::-moz-range-track]:h-1
                                        [&::-moz-range-thumb]:appearance-none
                                        [&::-moz-range-thumb]:w-3
                                        [&::-moz-range-thumb]:h-3
                                        [&::-moz-range-thumb]:rounded-full
                                        [&::-moz-range-thumb]:bg-primary
                                        [&::-moz-range-thumb]:border
                                        [&::-moz-range-thumb]:border-background
                                        [&::-moz-range-thumb]:cursor-pointer
                                        [&::-moz-range-thumb]:shadow-md"
                                    />
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </Card>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </TabsContent>

            <TabsContent value="other">
              <AnimatePresence mode="wait">
                <motion.div
                  key="other"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {otherWorks.map((work, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                    >
                      <Card 
                        className="overflow-hidden bg-background border-border hover:border-primary/50 transition-colors duration-300 cursor-pointer"
                        onClick={() => setSelectedOther(work)}
                      >
                        <div className="grid md:grid-cols-2 gap-6">
                          <div className="relative aspect-video md:aspect-auto">
                            <Image src={work.images[0] || "/placeholder.svg"} alt={work.title} fill className="object-cover" />
                          </div>
                          <div className="p-6 md:p-8 flex flex-col justify-center">
                            <h3 className="text-2xl font-sentient mb-3">{work.title}</h3>
                            <p className="font-mono text-sm text-foreground/60 mb-6">{work.description}</p>
                            <span className="px-3 py-1 text-xs font-mono bg-primary/10 text-primary border border-primary/20 rounded-full w-fit mb-3">
                              {work.category}
                            </span>
                            <p className="text-xs text-primary/60 font-mono mt-auto">Click for details →</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </div>

        {/* Software Project Modal */}
        <AnimatePresence>
          {selectedSoftware && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setSelectedSoftware(null)
                  setCurrentSoftwareImage(0)
                }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[110]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 pt-24"
                onClick={() => {
                  setSelectedSoftware(null)
                  setCurrentSoftwareImage(0)
                }}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  {/* Close Button */}
                  <motion.button
                    onClick={() => {
                      setSelectedSoftware(null)
                      setCurrentSoftwareImage(0)
                    }}
                    className="absolute -top-12 right-0 p-2 hover:bg-foreground/10 rounded-lg transition-colors z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} className="text-white" />
                  </motion.button>

                  {/* Main Image with Navigation */}
                  <div className="relative bg-gradient-to-b from-foreground/5 to-background/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-foreground/10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative aspect-[16/10] rounded-xl overflow-hidden bg-foreground/5 mb-6"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentSoftwareImage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={selectedSoftware.images[currentSoftwareImage] || "/placeholder.svg"}
                            alt={`${selectedSoftware.title} ${currentSoftwareImage + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>

                      {/* Navigation Arrows */}
                      {selectedSoftware.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentSoftwareImage((prev) => 
                                prev === 0 ? selectedSoftware.images.length - 1 : prev - 1
                              )
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all backdrop-blur-sm"
                          >
                            <ChevronLeft size={24} className="text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentSoftwareImage((prev) => 
                                prev === selectedSoftware.images.length - 1 ? 0 : prev + 1
                              )
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all backdrop-blur-sm"
                          >
                            <ChevronRight size={24} className="text-white" />
                          </button>

                          {/* Image Counter */}
                          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                            {currentSoftwareImage + 1} / {selectedSoftware.images.length}
                          </div>
                        </>
                      )}
                    </motion.div>

                    {/* Content Below */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center space-y-4"
                    >
                      <div>
                        <h2 className="text-3xl md:text-4xl font-sentient text-foreground mb-2">
                          {selectedSoftware.title}
                        </h2>
                        <p className="text-sm text-foreground/60 max-w-2xl mx-auto">
                          {selectedSoftware.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center">
                        {selectedSoftware.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-3 py-1 text-xs bg-foreground/10 text-foreground/70 rounded-full border border-foreground/20"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* 3D Render Modal */}
        <AnimatePresence>
          {selected3D && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setSelected3D(null)
                  setCurrent3DImage(0)
                }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[110]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 pt-24"
                onClick={() => {
                  setSelected3D(null)
                  setCurrent3DImage(0)
                }}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.button
                    onClick={() => {
                      setSelected3D(null)
                      setCurrent3DImage(0)
                    }}
                    className="absolute -top-12 right-0 p-2 hover:bg-foreground/10 rounded-lg transition-colors z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} className="text-white" />
                  </motion.button>

                  <div className="relative bg-gradient-to-b from-foreground/5 to-background/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-foreground/10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative aspect-[16/10] rounded-xl overflow-hidden bg-foreground/5 mb-6"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={current3DImage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={selected3D.images[current3DImage] || "/placeholder.svg"}
                            alt={`${selected3D.title} ${current3DImage + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>

                      {selected3D.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrent3DImage((prev) => 
                                prev === 0 ? selected3D.images.length - 1 : prev - 1
                              )
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all backdrop-blur-sm"
                          >
                            <ChevronLeft size={24} className="text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrent3DImage((prev) => 
                                prev === selected3D.images.length - 1 ? 0 : prev + 1
                              )
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all backdrop-blur-sm"
                          >
                            <ChevronRight size={24} className="text-white" />
                          </button>

                          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                            {current3DImage + 1} / {selected3D.images.length}
                          </div>
                        </>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center space-y-4"
                    >
                      <div>
                        <h2 className="text-3xl md:text-4xl font-sentient text-foreground mb-2">
                          {selected3D.title}
                        </h2>
                        <p className="text-sm text-foreground/60 max-w-2xl mx-auto">
                          {selected3D.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 justify-center">
                        {selected3D.tools.map((tool) => (
                          <span
                            key={tool}
                            className="px-3 py-1 text-xs bg-foreground/10 text-foreground/70 rounded-full border border-foreground/20"
                          >
                            {tool}
                          </span>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Other Works Modal */}
        <AnimatePresence>
          {selectedOther && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => {
                  setSelectedOther(null)
                  setCurrentOtherImage(0)
                }}
                className="fixed inset-0 bg-black/95 backdrop-blur-md z-[110]"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 z-[110] flex items-center justify-center p-4 pt-24"
                onClick={() => {
                  setSelectedOther(null)
                  setCurrentOtherImage(0)
                }}
              >
                <motion.div
                  onClick={(e) => e.stopPropagation()}
                  className="relative max-w-4xl w-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.button
                    onClick={() => {
                      setSelectedOther(null)
                      setCurrentOtherImage(0)
                    }}
                    className="absolute -top-12 right-0 p-2 hover:bg-foreground/10 rounded-lg transition-colors z-10"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <X size={24} className="text-white" />
                  </motion.button>

                  <div className="relative bg-gradient-to-b from-foreground/5 to-background/80 backdrop-blur-xl rounded-2xl p-6 md:p-8 shadow-2xl border border-foreground/10">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="relative aspect-[16/10] rounded-xl overflow-hidden bg-foreground/5 mb-6"
                    >
                      <AnimatePresence mode="wait">
                        <motion.div
                          key={currentOtherImage}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={selectedOther.images[currentOtherImage] || "/placeholder.svg"}
                            alt={`${selectedOther.title} ${currentOtherImage + 1}`}
                            fill
                            className="object-contain"
                            sizes="(max-width: 768px) 100vw, 80vw"
                            priority
                          />
                        </motion.div>
                      </AnimatePresence>

                      {selectedOther.images.length > 1 && (
                        <>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentOtherImage((prev) => 
                                prev === 0 ? selectedOther.images.length - 1 : prev - 1
                              )
                            }}
                            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all backdrop-blur-sm"
                          >
                            <ChevronLeft size={24} className="text-white" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setCurrentOtherImage((prev) => 
                                prev === selectedOther.images.length - 1 ? 0 : prev + 1
                              )
                            }}
                            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-all backdrop-blur-sm"
                          >
                            <ChevronRight size={24} className="text-white" />
                          </button>

                          <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm rounded-full text-white text-sm">
                            {currentOtherImage + 1} / {selectedOther.images.length}
                          </div>
                        </>
                      )}
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="text-center space-y-4"
                    >
                      <div>
                        <div className="text-xs font-mono text-primary/80 mb-1 uppercase tracking-wide">
                          {selectedOther.category}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-sentient text-foreground mb-2">
                          {selectedOther.title}
                        </h2>
                        <p className="text-sm text-foreground/60 max-w-2xl mx-auto">
                          {selectedOther.description}
                        </p>
                      </div>

                      {selectedOther.features && (
                        <div className="flex flex-wrap gap-2 justify-center">
                          {selectedOther.features.map((feature) => (
                            <span
                              key={feature}
                              className="px-3 py-1 text-xs bg-foreground/10 text-foreground/70 rounded-full border border-foreground/20"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
