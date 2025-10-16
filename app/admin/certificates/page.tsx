'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { Plus, Edit, Trash2, X, Save, Award, ExternalLink } from 'lucide-react'
import Image from 'next/image'

interface Certificate {
  id: string
  title: string
  issuer: string
  issue_date: string
  credential_url: string | null
  image_url: string | null
  display_order: number
}

export default function AdminCertificatesPage() {
  const [certificates, setCertificates] = useState<Certificate[]>([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState<Certificate | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState<Partial<Certificate>>({
    title: '',
    issuer: '',
    issue_date: '',
    credential_url: '',
    image_url: '',
    display_order: 0,
  })

  useEffect(() => {
    fetchCertificates()
  }, [])

  async function fetchCertificates() {
    try {
      const { data, error } = await supabase
        .from('certificates')
        .select('*')
        .order('display_order', { ascending: true })

      if (error) throw error
      setCertificates(data || [])
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
          .from('certificates')
          .update(formData)
          .eq('id', editing.id)
        if (error) throw error
      } else {
        const { error } = await supabase.from('certificates').insert([formData])
        if (error) throw error
      }
      cancel()
      fetchCertificates()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this certificate?')) return
    try {
      const { error } = await supabase.from('certificates').delete().eq('id', id)
      if (error) throw error
      fetchCertificates()
    } catch (error: any) {
      alert('Error: ' + error.message)
    }
  }

  function startEdit(cert: Certificate) {
    setEditing(cert)
    setFormData(cert)
    setIsCreating(false)
  }

  function startCreate() {
    setFormData({
      title: '',
      issuer: '',
      issue_date: '',
      credential_url: '',
      image_url: '',
      display_order: 0,
    })
    setEditing(null)
    setIsCreating(true)
  }

  function cancel() {
    setEditing(null)
    setIsCreating(false)
    setFormData({
      title: '',
      issuer: '',
      issue_date: '',
      credential_url: '',
      image_url: '',
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
                <h1 className="text-3xl font-sentient mb-2">Certificates & Achievements</h1>
                <p className="font-mono text-sm text-foreground/60">Manage your certifications</p>
              </div>
              {!isCreating && !editing && (
                <Button onClick={startCreate} className="gap-2">
                  <Plus size={16} />
                  Add Certificate
                </Button>
              )}
            </div>

            {(isCreating || editing) && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="font-sentient flex justify-between items-center">
                    <span>{editing ? 'Edit Certificate' : 'Add New Certificate'}</span>
                    <Button variant="ghost" size="icon" onClick={cancel} asChild={false}>
                      <X size={20} />
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Certificate Title *</Label>
                    <Input
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      placeholder="e.g., Data Analytics Professional Certificate"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Issuer *</Label>
                      <Input
                        value={formData.issuer}
                        onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                        placeholder="e.g., Google, Meta, Coursera"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-mono text-sm">Issue Date *</Label>
                      <Input
                        value={formData.issue_date}
                        onChange={(e) => setFormData({ ...formData, issue_date: e.target.value })}
                        placeholder="e.g., 2024"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Credential URL</Label>
                    <Input
                      value={formData.credential_url || ''}
                      onChange={(e) => setFormData({ ...formData, credential_url: e.target.value })}
                      placeholder="https://coursera.org/verify/..."
                    />
                    <p className="text-xs text-foreground/60 font-mono">
                      Link to verify the certificate
                    </p>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-mono text-sm">Certificate Image URL</Label>
                    <Input
                      value={formData.image_url || ''}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      placeholder="/certificates/cert.png"
                    />
                    <p className="text-xs text-foreground/60 font-mono">
                      Upload image to /public/certificates/ first
                    </p>
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
                      {editing ? 'Update' : 'Create'} Certificate
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
                <p className="font-mono text-foreground/60">Loading certificates...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {certificates.map((cert) => (
                  <Card key={cert.id} className="overflow-hidden">
                    <CardContent className="p-4">
                      {cert.image_url && (
                        <div className="relative w-full aspect-video mb-3 rounded overflow-hidden bg-foreground/5">
                          <Image
                            src={cert.image_url}
                            alt={cert.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                      )}
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div className="flex-1">
                          <h3 className="font-sentient text-lg mb-1">{cert.title}</h3>
                          <p className="font-mono text-sm text-primary mb-1">{cert.issuer}</p>
                          <p className="font-mono text-xs text-foreground/60 mb-2">{cert.issue_date}</p>
                          {cert.credential_url && (
                            <a
                              href={cert.credential_url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 text-sm text-foreground/60 hover:text-primary transition-colors"
                            >
                              <ExternalLink size={14} />
                              <span>View Credential</span>
                            </a>
                          )}
                          <p className="font-mono text-xs text-foreground/40 mt-2">
                            Order: {cert.display_order}
                          </p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <Button size="icon" variant="ghost" onClick={() => startEdit(cert)} asChild={false}>
                            <Edit size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(cert.id)}
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
