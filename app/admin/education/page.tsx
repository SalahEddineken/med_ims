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
import { Plus, Edit, Trash2, X, Save, GraduationCap } from 'lucide-react'

interface Education {
  id: string
  degree: string
  institution: string
  field_of_study: string | null
  start_date: string | null
  end_date: string | null
  description: string | null
  display_order: number
}

export default function AdminEducationPage() {
  const [education, setEducation] = useState<Education[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Education | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Education>>({
    degree: '',
    institution: '',
    field_of_study: '',
    start_date: '',
    end_date: '',
    description: '',
    display_order: 0,
  })

  useEffect(() => {
    fetchEducation()
  }, [])

  async function fetchEducation() {
    try {
      const { data, error } = await supabase
        .from('education')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setEducation(data || [])
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
          .from('education')
          .update(formData)
          .eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('education').insert([formData])
        if (error) throw error
      }
      cancel()
      fetchEducation()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this education entry?')) return
    try {
      const { error } = await supabase.from('education').delete().eq('id', id)
      if (error) throw error
      fetchEducation()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  function startEdit(edu: Education) {
    setEditing(edu)
    setFormData(edu)
    setIsCreating(false)
  }

  function startCreate() {
    setFormData({
      degree: '',
      institution: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      description: '',
      display_order: 0,
    })
    setEditing(null)
    setIsCreating(true)
  }

  function cancel() {
    setEditing(null)
    setIsCreating(false)
    setFormData({
      degree: '',
      institution: '',
      field_of_study: '',
      start_date: '',
      end_date: '',
      description: '',
      display_order: 0,
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
                <h1 className="text-3xl font-sentient mb-2">Education</h1>
                <p className="font-mono text-sm text-foreground/60">Manage your educational background</p>
              </div>
              {!isCreating && !editing && (
                <Button onClick={startCreate} className="gap-2">
                  <Plus size={16} />
                  Add Education
                </Button>
              )}
            </div>

            {(isCreating || editing) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-sentient flex justify-between items-center">
                    <span>{editing ? 'Edit Education' : 'Add New Education'}</span>
                    <Button variant="ghost" size="icon" onClick={cancel} asChild={false}>
                      <X size={20} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Degree/Certificate *</Label>
                    <Input
                      value={formData.degree}
                      onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                      placeholder="e.g., Bachelor of Science in Computer Science"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Institution *</Label>
                    <Input
                      value={formData.institution}
                      onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                      placeholder="e.g., University of Constantine 1"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Field of Study</Label>
                    <Input
                      value={formData.field_of_study || ''}
                      onChange={(e) => setFormData({ ...formData, field_of_study: e.target.value })}
                      placeholder="e.g., Computer Science, Data Analytics"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Start Date</Label>
                      <Input
                        value={formData.start_date || ''}
                        onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                        placeholder="e.g., 2020"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">End Date</Label>
                      <Input
                        value={formData.end_date || ''}
                        onChange={(e) => setFormData({ ...formData, end_date: e.target.value })}
                        placeholder="e.g., 2024 or Present"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Description</Label>
                    <Textarea
                      value={formData.description || ''}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Additional details, achievements, honors..."
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Display Order</Label>
                    <Input
                      type="number"
                      value={formData.display_order}
                      onChange={(e) => setFormData({ ...formData, display_order: parseInt(e.target.value) || 0 })}
                    />
                  </div>

                  <div className="flex gap-2 pt-4">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      {editing ? 'Update' : 'Create'} Education
                    </Button>
                    <Button onClick={cancel} variant="outline" asChild={false}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-mono text-foreground/60">Loading education...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {education.map((edu) => (
                  <Card key={edu.id}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded bg-foreground/5 flex items-center justify-center flex-shrink-0 mt-1">
                            <GraduationCap size={24} className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-sentient text-lg mb-1">{edu.degree}</h3>
                            <p className="font-mono text-sm text-primary mb-2">{edu.institution}</p>
                            {edu.field_of_study && (
                              <p className="font-mono text-sm text-foreground/60 mb-1">
                                Field: {edu.field_of_study}
                              </p>
                            )}
                            {(edu.start_date || edu.end_date) && (
                              <p className="font-mono text-sm text-foreground/60 mb-2">
                                {edu.start_date} {edu.end_date && `- ${edu.end_date}`}
                              </p>
                            )}
                            {edu.description && (
                              <p className="text-sm text-foreground/70 mb-2">{edu.description}</p>
                            )}
                            <p className="font-mono text-xs text-foreground/40">
                              Order: {edu.display_order}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => startEdit(edu)} asChild={false}>
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(edu.id)}
                            className="text-red-500 hover:text-red-600"
                            asChild={false}
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
