'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, X, Save } from 'lucide-react'

interface Skill {
  id: string
  name: string
  category: string | null
  proficiency_level: number
  display_order: number
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<Skill[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Skill | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Skill>>({
    name: '',
    category: '',
    proficiency_level: 75,
    display_order: 0,
  })

  useEffect(() => {
    fetchSkills()
  }, [])

  async function fetchSkills() {
    try {
      const { data, error } = await supabase
        .from('skills')
        .select('*')
        .order('category, display_order', { ascending: true })

      if (error) throw error
      setSkills(data || [])
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
          .from('skills')
          .update(formData)
          .eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('skills').insert([formData])
        if (error) throw error
      }
      cancel()
      fetchSkills()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this skill?')) return
    try {
      const { error } = await supabase.from('skills').delete().eq('id', id)
      if (error) throw error
      fetchSkills()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  function startEdit(skill: Skill) {
    setEditing(skill)
    setFormData(skill)
    setIsCreating(false)
  }

  function startCreate() {
    setFormData({ name: '', category: '', proficiency_level: 75, display_order: 0 })
    setEditing(null)
    setIsCreating(true)
  }

  function cancel() {
    setEditing(null)
    setIsCreating(false)
    setFormData({ name: '', category: '', proficiency_level: 75, display_order: 0 })
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AdminSidebar />
        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h1 className="text-3xl font-sentient mb-2">Skills</h1>
                <p className="font-mono text-sm text-foreground/60">Manage your skills</p>
              </div>
              {!isCreating && !editing && (
                <Button onClick={startCreate} className="gap-2">
                  <Plus size={16} />
                  Add Skill
                </Button>
              )}
            </div>

            {(isCreating || editing) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-sentient flex justify-between items-center">
                    <span>{editing ? 'Edit Skill' : 'Create New Skill'}</span>
                    <Button variant="ghost" size="icon" onClick={cancel}>
                      <X size={20} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Skill Name *</Label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., JavaScript"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Category</Label>
                    <Input
                      value={formData.category || ''}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g., Programming"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Proficiency Level ({formData.proficiency_level}%)</Label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={formData.proficiency_level}
                      onChange={(e) => setFormData({ ...formData, proficiency_level: parseInt(e.target.value) })}
                      className="w-full"
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
                  <div className="flex gap-2">
                    <Button onClick={handleSave} className="gap-2">
                      <Save size={16} />
                      {editing ? 'Update' : 'Create'}
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
                <p className="font-mono text-foreground/60">Loading...</p>
              </div>
            ) : (
              <div className="space-y-3">
                {skills.map((skill) => (
                  <Card key={skill.id}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-sentient text-lg">{skill.name}</h3>
                            {skill.category && (
                              <span className="px-2 py-0.5 bg-foreground/10 rounded text-xs">
                                {skill.category}
                              </span>
                            )}
                          </div>
                          <div className="flex items-center gap-3">
                            <div className="flex-1 h-2 bg-foreground/10 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-primary rounded-full"
                                style={{ width: `${skill.proficiency_level}%` }}
                              />
                            </div>
                            <span className="font-mono text-sm text-foreground/60 w-12">
                              {skill.proficiency_level}%
                            </span>
                          </div>
                          <p className="font-mono text-xs text-foreground/40 mt-1">
                            Order: {skill.display_order}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button size="icon" variant="ghost" onClick={() => startEdit(skill)}>
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(skill.id)}
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

