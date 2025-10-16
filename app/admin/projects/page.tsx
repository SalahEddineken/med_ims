'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, X, Save, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface Project {
  id: string
  title: string
  description: string
  long_description: string | null
  tags: string[]
  demo_url: string | null
  github_url: string | null
  image_url: string | null
  features: string[]
  timeline: string | null
  display_order: number
  is_featured: boolean
}

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Project>>({
    title: '',
    description: '',
    long_description: '',
    tags: [],
    demo_url: '',
    github_url: '',
    image_url: '',
    features: [],
    timeline: '',
    display_order: 0,
    is_featured: true,
  })
  const [tagInput, setTagInput] = useState('')
  const [featureInput, setFeatureInput] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (editingProject) {
        // Update existing
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id)
        
        if (error) throw error
      } else {
        // Create new
        const { error } = await supabase
          .from('projects')
          .insert([formData])
        
        if (error) throw error
      }

      setEditingProject(null)
      setIsCreating(false)
      resetForm()
      fetchProjects()
    } catch (error: any) {
      alert('Error saving project: ' + error.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchProjects()
    } catch (error: any) {
      alert('Error deleting project: ' + error.message)
    }
  }

  function resetForm() {
    setFormData({
      title: '',
      description: '',
      long_description: '',
      tags: [],
      demo_url: '',
      github_url: '',
      image_url: '',
      features: [],
      timeline: '',
      display_order: 0,
      is_featured: true,
    })
    setTagInput('')
    setFeatureInput('')
  }

  function startEdit(project: Project) {
    setEditingProject(project)
    setFormData(project)
    setIsCreating(false)
  }

  function startCreate() {
    resetForm()
    setEditingProject(null)
    setIsCreating(true)
  }

  function cancelEdit() {
    setEditingProject(null)
    setIsCreating(false)
    resetForm()
  }

  function addTag() {
    if (tagInput.trim()) {
      setFormData({
        ...formData,
        tags: [...(formData.tags || []), tagInput.trim()],
      })
      setTagInput('')
    }
  }

  function removeTag(index: number) {
    setFormData({
      ...formData,
      tags: formData.tags?.filter((_, i) => i !== index) || [],
    })
  }

  function addFeature() {
    if (featureInput.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), featureInput.trim()],
      })
      setFeatureInput('')
    }
  }

  function removeFeature(index: number) {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index) || [],
    })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-sentient mb-2">Projects</h1>
                <p className="font-mono text-sm text-foreground/60">
                  Manage your portfolio projects
                </p>
              </div>
              {!isCreating && !editingProject && (
                <Button onClick={startCreate} className="gap-2">
                  <Plus size={16} />
                  Add Project
                </Button>
              )}
            </div>

            {/* Create/Edit Form */}
            {(isCreating || editingProject) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-sentient flex justify-between items-center">
                    <span>{editingProject ? 'Edit Project' : 'Create New Project'}</span>
                    <Button variant="ghost" size="icon" onClick={cancelEdit}>
                      <X size={20} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="Project Title"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Timeline</Label>
                      <Input
                        value={formData.timeline || ''}
                        onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        placeholder="e.g., 3 months"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Short Description *</Label>
                    <Textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Brief description"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Long Description</Label>
                    <Textarea
                      value={formData.long_description || ''}
                      onChange={(e) => setFormData({ ...formData, long_description: e.target.value })}
                      placeholder="Detailed description"
                      rows={4}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Demo URL</Label>
                      <Input
                        value={formData.demo_url || ''}
                        onChange={(e) => setFormData({ ...formData, demo_url: e.target.value })}
                        placeholder="https://demo.example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">GitHub URL</Label>
                      <Input
                        value={formData.github_url || ''}
                        onChange={(e) => setFormData({ ...formData, github_url: e.target.value })}
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Image URL</Label>
                    <Input
                      value={formData.image_url || ''}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="/path/to/image.jpg"
                    />
                  </div>

                  {/* Tags */}
                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={tagInput}
                        onChange={(e) => setTagInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                        placeholder="Add a tag (press Enter)"
                      />
                      <Button type="button" onClick={addTag} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.tags?.map((tag, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm flex items-center gap-2"
                        >
                          {tag}
                          <button onClick={() => removeTag(i)} className="hover:text-red-500">
                            <X size={14} />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Features</Label>
                    <div className="flex gap-2">
                      <Input
                        value={featureInput}
                        onChange={(e) => setFeatureInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())}
                        placeholder="Add a feature (press Enter)"
                      />
                      <Button type="button" onClick={addFeature} variant="outline">
                        Add
                      </Button>
                    </div>
                    <div className="space-y-1 mt-2">
                      {formData.features?.map((feature, i) => (
                        <div key={i} className="flex items-center gap-2 text-sm">
                          <span className="w-1 h-1 bg-primary rounded-full" />
                          <span className="flex-1">{feature}</span>
                          <button onClick={() => removeFeature(i)} className="text-red-500 hover:text-red-600">
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
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
                        id="is_featured"
                        checked={formData.is_featured}
                        onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="is_featured" className="font-mono text-sm cursor-pointer">
                        Featured Project
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      {editingProject ? 'Update' : 'Create'} Project
                    </Button>
                    <Button onClick={cancelEdit} variant="outline">
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Projects List */}
            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-mono text-foreground/60">Loading projects...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {projects.map((project) => (
                  <Card key={project.id}>
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        {project.image_url && (
                          <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-foreground/5">
                            <Image
                              src={project.image_url}
                              alt={project.title}
                              fill
                              className="object-cover"
                            />
                          </div>
                        )}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div>
                              <h3 className="font-sentient text-lg">{project.title}</h3>
                              <p className="font-mono text-xs text-foreground/60">
                                Order: {project.display_order} | {project.is_featured ? 'Featured' : 'Not Featured'}
                              </p>
                            </div>
                            <div className="flex gap-2 flex-shrink-0">
                              {project.demo_url && (
                                <a
                                  href={project.demo_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-foreground/60 hover:text-primary"
                                >
                                  <ExternalLink size={16} />
                                </a>
                              )}
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => startEdit(project)}
                              >
                                <Edit size={16} />
                              </Button>
                              <Button
                                size="icon"
                                variant="ghost"
                                onClick={() => handleDelete(project.id)}
                                className="text-red-500 hover:text-red-600"
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </div>
                          <p className="text-sm text-foreground/70 mb-2 line-clamp-2">
                            {project.description}
                          </p>
                          <div className="flex flex-wrap gap-1">
                            {project.tags.map((tag, i) => (
                              <span
                                key={i}
                                className="px-2 py-0.5 bg-primary/10 text-primary rounded text-xs"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
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

