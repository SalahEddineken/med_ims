'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, X, Save, Music as MusicIcon } from 'lucide-react'

interface MusicTrack {
  id: string
  title: string
  artist: string
  duration: string
  genre: string | null
  audio_url: string
  cover_url: string | null
  display_order: number
  is_published: boolean
}

export default function AdminMusicPage() {
  const [tracks, setTracks] = useState<MusicTrack[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<MusicTrack | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<MusicTrack>>({
    title: '',
    artist: 'Salaheddine Kennouda',
    duration: '',
    genre: '',
    audio_url: '',
    cover_url: '',
    display_order: 0,
    is_published: true,
  })

  useEffect(() => {
    fetchTracks()
  }, [])

  async function fetchTracks() {
    try {
      const { data, error } = await supabase
        .from('music_tracks')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setTracks(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (editing) {
        const { error } = await supabase
          .from('music_tracks')
          .update(formData)
          .eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('music_tracks').insert([formData])
        if (error) throw error
      }
      cancel()
      fetchTracks()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this track?')) return
    try {
      const { error } = await supabase.from('music_tracks').delete().eq('id', id)
      if (error) throw error
      fetchTracks()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  function startEdit(track: MusicTrack) {
    setEditing(track)
    setFormData(track)
    setIsCreating(false)
  }

  function startCreate() {
    setFormData({
      title: '',
      artist: 'Salaheddine Kennouda',
      duration: '',
      genre: '',
      audio_url: '',
      cover_url: '',
      display_order: 0,
      is_published: true,
    })
    setEditing(null)
    setIsCreating(true)
  }

  function cancel() {
    setEditing(null)
    setIsCreating(false)
    setFormData({
      title: '',
      artist: 'Salaheddine Kennouda',
      duration: '',
      genre: '',
      audio_url: '',
      cover_url: '',
      display_order: 0,
      is_published: true,
    })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-sentient mb-2">Music Tracks</h1>
                <p className="font-mono text-sm text-foreground/60">Manage your music compositions</p>
              </div>
              {!isCreating && !editing && (
                <Button onClick={startCreate} className="gap-2">
                  <Plus size={16} />
                  Add Track
                </Button>
              )}
            </div>

            {(isCreating || editing) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-sentient flex justify-between items-center">
                    <span>{editing ? 'Edit Track' : 'Create New Track'}</span>
                    <Button variant="ghost" size="icon" onClick={cancel}>
                      <X size={20} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Track Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Midnight Crush"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Artist *</Label>
                      <Input
                        value={formData.artist}
                        onChange={(e) => setFormData({ ...formData, artist: e.target.value })}
                        placeholder="Artist name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Duration *</Label>
                      <Input
                        value={formData.duration}
                        onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                        placeholder="e.g., 3:45"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Genre</Label>
                      <Input
                        value={formData.genre || ''}
                        onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
                        placeholder="e.g., Lofi, Ambient"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Audio URL *</Label>
                    <Input
                      value={formData.audio_url}
                      onChange={(e) => setFormData({ ...formData, audio_url: e.target.value })}
                      placeholder="/music/track.mp3"
                    />
                    <p className="text-xs text-foreground/60 font-mono">
                      Upload your audio file to /public/music/ first
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Cover Image URL</Label>
                    <Input
                      value={formData.cover_url || ''}
                      onChange={(e) => setFormData({ ...formData, cover_url: e.target.value })}
                      placeholder="/music/covers/cover.jpg"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Display Order</Label>
                      <Input
                        type="number"
                        value={formData.display_order}
                        onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                      />
                    </div>
                    <div className="flex items-center gap-2 mt-7">
                      <input
                        type="checkbox"
                        id="is_published"
                        checked={formData.is_published}
                        onChange={(e) => setFormData({ ...formData, is_published: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="is_published" className="font-mono text-sm cursor-pointer">
                        Published
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      {editing ? 'Update' : 'Create'} Track
                    </Button>
                    <Button onClick={cancel} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-mono text-foreground/60">Loading tracks...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {tracks.map((track) => (
                  <Card key={track.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-4 flex-1">
                          <div className="w-12 h-12 rounded bg-foreground/5 flex items-center justify-center flex-shrink-0">
                            <MusicIcon size={24} className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-sentient text-lg">{track.title}</h3>
                              {!track.is_published && (
                                <span className="px-2 py-0.5 bg-foreground/10 rounded text-xs">
                                  Draft
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-sm text-foreground/60">
                              {track.artist} • {track.duration}
                              {track.genre && ` • ${track.genre}`}
                            </p>
                            <p className="font-mono text-xs text-foreground/40 mt-1">
                              Order: {track.display_order}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => startEdit(track)}>
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(track.id)}
                            className="text-red-500 hover:text-red-600"
                          >
                            <Trash2 size={16} />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  )
}
