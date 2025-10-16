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
import { Plus, Edit, Trash2, X, Save, Briefcase } from 'lucide-react'

interface Experience {
  id: string
  title: string
  company: string
  employment_type: string | null
  period: string
  description: string | null
  description2: string | null
  description3: string | null
  display_order: number
  is_current: boolean
}

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Experience | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Experience>>({
    title: '',
    company: '',
    employment_type: '',
    period: '',
    description: '',
    description2: '',
    description3: '',
    display_order: 0,
    is_current: false,
  })

  useEffect(() => {
    fetchExperiences()
  }, [])

  async function fetchExperiences() {
    try {
      const { data, error } = await supabase
        .from('experience')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setExperiences(data || [])
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
          .from('experience')
          .update(formData)
          .eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('experience').insert([formData])
        if (error) throw error
      }
      cancel()
      fetchExperiences()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this experience?')) return
    try {
      const { error } = await supabase.from('experience').delete().eq('id', id)
      if (error) throw error
      fetchExperiences()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  function startEdit(experience: Experience) {
    setEditing(experience)
    setFormData(experience)
    setIsCreating(false)
  }

  function startCreate() {
    setFormData({
      title: '',
      company: '',
      employment_type: '',
      period: '',
      description: '',
      description2: '',
      description3: '',
      display_order: 0,
      is_current: false,
    })
    setEditing(null)
    setIsCreating(true)
  }

  function cancel() {
    setEditing(null)
    setIsCreating(false)
    setFormData({
      title: '',
      company: '',
      employment_type: '',
      period: '',
      description: '',
      description2: '',
      description3: '',
      display_order: 0,
      is_current: false,
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
                <h1 className="text-3xl font-sentient mb-2">Work Experience</h1>
                <p className="font-mono text-sm text-foreground/60">Manage your work history</p>
              </div>
              {!isCreating && !editing && (
                <Button onClick={startCreate} className="gap-2">
                  <Plus size={16} />
                  Add Experience
                </Button>
              )}
            </div>

            {(isCreating || editing) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-sentient flex justify-between items-center">
                    <span>{editing ? 'Edit Experience' : 'Create New Experience'}</span>
                    <Button variant="ghost" size="icon" onClick={cancel}>
                      <X size={20} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Job Title *</Label>
                      <Input
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        placeholder="e.g., Data Management Intern"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Company *</Label>
                      <Input
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Company name"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Employment Type</Label>
                      <Input
                        value={formData.employment_type || ''}
                        onChange={(e) => setFormData({ ...formData, employment_type: e.target.value })}
                        placeholder="e.g., Internship, Full Time"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Period *</Label>
                      <Input
                        value={formData.period}
                        onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                        placeholder="e.g., 2024 - Present"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Description 1</Label>
                    <Textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Main responsibilities and achievements"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Description 2</Label>
                    <Textarea
                      value={formData.description2 || ''}
                      onChange={(e) => setFormData({ ...formData, description2: e.target.value })}
                      placeholder="Additional responsibilities"
                      rows={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Description 3</Label>
                    <Textarea
                      value={formData.description3 || ''}
                      onChange={(e) => setFormData({ ...formData, description3: e.target.value })}
                      placeholder="More achievements"
                      rows={2}
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
                        id="is_current"
                        checked={formData.is_current}
                        onChange={(e) => setFormData({ ...formData, is_current: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <Label htmlFor="is_current" className="font-mono text-sm cursor-pointer">
                        Current Position
                      </Label>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      {editing ? 'Update' : 'Create'} Experience
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
                <p className="font-mono text-foreground/60">Loading experiences...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {experiences.map((exp) => (
                  <Card key={exp.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-1">
                            <Briefcase size={24} className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-sentient text-lg">{exp.title}</h3>
                              {exp.is_current && (
                                <span className="px-2 py-0.5 bg-primary/20 text-primary rounded text-xs">
                                  Current
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-sm text-primary mb-1">{exp.company}</p>
                            {exp.employment_type && (
                              <p className="font-mono text-xs text-foreground/50 mb-2">{exp.employment_type}</p>
                            )}
                            <p className="font-mono text-sm text-foreground/60 mb-2">{exp.period}</p>
                            <div className="space-y-1 text-sm text-foreground/70">
                              {exp.description && <p>• {exp.description}</p>}
                              {exp.description2 && <p>• {exp.description2}</p>}
                              {exp.description3 && <p>• {exp.description3}</p>}
                            </div>
                            <p className="font-mono text-xs text-foreground/40 mt-2">
                              Order: {exp.display_order}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => startEdit(exp)}>
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(exp.id)}
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
