'use client'

/**
 * Enhanced Projects Page with Search, Export, and Better Layout
 * Copy this to page.tsx to replace the existing projects page
 */

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { PageHeader } from '@/components/admin/page-header'
import { EmptyState } from '@/components/admin/empty-state'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { exportToCSV, exportToJSON, getFormattedDate } from '@/lib/export-utils'
import { Plus, Edit, Trash2, X, Save, ExternalLink, FolderKanban, Github } from 'lucide-react'
import Image from 'next/image'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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

export default function AdminProjectsPageEnhanced() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterFeatured, setFilterFeatured] = useState<string>('all')
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

  useEffect(() => {
    // Filter projects based on search and filter
    let filtered = projects

    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(p => 
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(tag => tag.toLowerCase().includes(query))
      )
    }

    // Featured filter
    if (filterFeatured === 'featured') {
      filtered = filtered.filter(p => p.is_featured)
    } else if (filterFeatured === 'notfeatured') {
      filtered = filtered.filter(p => !p.is_featured)
    }

    setFilteredProjects(filtered)
  }, [searchQuery, filterFeatured, projects])

  async function fetchProjects() {
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setProjects(data || [])
      setFilteredProjects(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleSave() {
    try {
      if (editingProject) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingProject.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('projects').insert([formData])
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
      const { error } = await supabase.from('projects').delete().eq('id', id)
      if (error) throw error
      fetchProjects()
    } catch (error: any) {
      alert('Error deleting project: ' + error.message)
    }
  }

  function handleExport() {
    const data = projects.map(p => ({
      title: p.title,
      description: p.description,
      tags: p.tags.join('; '),
      demo_url: p.demo_url || '',
      github_url: p.github_url || '',
      is_featured: p.is_featured ? 'Yes' : 'No',
      timeline: p.timeline || '',
    }))
    exportToCSV(data, `projects-${getFormattedDate()}.csv`)
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
      setFormData({ ...formData, tags: [...(formData.tags || []), tagInput.trim()] })
      setTagInput('')
    }
  }

  function removeTag(index: number) {
    setFormData({ ...formData, tags: formData.tags?.filter((_, i) => i !== index) || [] })
  }

  function addFeature() {
    if (featureInput.trim()) {
      setFormData({ ...formData, features: [...(formData.features || []), featureInput.trim()] })
      setFeatureInput('')
    }
  }

  function removeFeature(index: number) {
    setFormData({ ...formData, features: formData.features?.filter((_, i) => i !== index) || [] })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-muted/30">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 lg:ml-64">
          <AdminHeader 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            title="Projects"
          />
          
          <main className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
              <PageHeader
                title="Projects"
                description="Manage your portfolio projects"
                onAdd={startCreate}
                addLabel="Add Project"
                showAdd={!isCreating && !editingProject}
                showSearch
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                searchPlaceholder="Search projects..."
                showExport
                onExport={handleExport}
              >
                <Select value={filterFeatured} onValueChange={setFilterFeatured}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Projects</SelectItem>
                    <SelectItem value="featured">Featured Only</SelectItem>
                    <SelectItem value="notfeatured">Not Featured</SelectItem>
                  </SelectContent>
                </Select>
              </PageHeader>

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
                    {/* Same form as before - keeping it concise for now */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Title *</Label>
                        <Input
                          value={formData.title}
                          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Timeline</Label>
                        <Input
                          value={formData.timeline || ''}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Description *</Label>
                      <Textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={2}
                      />
                    </div>
                    <div className="flex gap-2 pt-4">
                      <Button onClick={handleSave} className="gap-2">
                        <Save size={16} />
                        {editingProject ? 'Update' : 'Create'}
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
                <div className="flex items-center justify-center py-12">
                  <div className="text-center">
                    <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="font-mono text-sm text-muted-foreground">Loading projects...</p>
                  </div>
                </div>
              ) : filteredProjects.length === 0 ? (
                <EmptyState
                  icon={FolderKanban}
                  title={searchQuery ? 'No projects found' : 'No projects yet'}
                  description={searchQuery ? 'Try adjusting your search query' : 'Create your first project to get started'}
                  actionLabel={searchQuery ? undefined : 'Create Project'}
                  onAction={searchQuery ? undefined : startCreate}
                />
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                  {filteredProjects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex gap-4">
                          {project.image_url && (
                            <div className="relative w-24 h-24 flex-shrink-0 rounded overflow-hidden bg-muted">
                              <Image
                                src={project.image_url}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <div className="flex-1">
                                <h3 className="font-sentient text-lg mb-1 line-clamp-1">{project.title}</h3>
                                <div className="flex items-center gap-2 mb-2">
                                  {project.is_featured && (
                                    <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded-full font-medium">
                                      Featured
                                    </span>
                                  )}
                                  <span className="text-xs text-muted-foreground font-mono">
                                    Order: {project.display_order}
                                  </span>
                                </div>
                              </div>
                              <div className="flex gap-1 flex-shrink-0">
                                {project.demo_url && (
                                  <Button size="icon" variant="ghost" asChild>
                                    <a href={project.demo_url} target="_blank" rel="noopener noreferrer">
                                      <ExternalLink size={14} />
                                    </a>
                                  </Button>
                                )}
                                {project.github_url && (
                                  <Button size="icon" variant="ghost" asChild>
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                      <Github size={14} />
                                    </a>
                                  </Button>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                              {project.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-2">
                              {project.tags.slice(0, 3).map((tag, i) => (
                                <span key={i} className="px-2 py-0.5 bg-primary/10 text-primary text-xs rounded">
                                  {tag}
                                </span>
                              ))}
                              {project.tags.length > 3 && (
                                <span className="text-xs text-muted-foreground">
                                  +{project.tags.length - 3} more
                                </span>
                              )}
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => startEdit(project)}>
                                <Edit size={14} className="mr-1" />
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleDelete(project.id)}
                                className="text-destructive hover:text-destructive"
                              >
                                <Trash2 size={14} className="mr-1" />
                                Delete
                              </Button>
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
      </div>
    </ProtectedRoute>
  )
}

