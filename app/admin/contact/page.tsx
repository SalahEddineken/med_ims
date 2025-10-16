'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { supabase } from '@/lib/supabase'
import { Mail, MailOpen, Archive, Trash2, Calendar } from 'lucide-react'

interface ContactSubmission {
  id: string
  name: string
  email: string
  subject: string
  message: string
  is_read: boolean
  is_archived: boolean
  created_at: string
}

export default function AdminContactPage() {
  const [submissions, setSubmissions] = useState<ContactSubmission[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'unread' | 'archived'>('all')

  useEffect(() => {
    fetchSubmissions()
  }, [filter])

  async function fetchSubmissions() {
    try {
      let query = supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })

      if (filter === 'unread') {
        query = query.eq('is_read', false)
      } else if (filter === 'archived') {
        query = query.eq('is_archived', true)
      }

      const { data, error } = await query
      if (error) throw error
      setSubmissions(data || [])
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  async function toggleRead(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_read: !currentStatus })
        .eq('id', id)

      if (error) throw error
      fetchSubmissions()
    } catch (error: any) {
      alert('Error updating: ' + error.message)
    }
  }

  async function toggleArchive(id: string, currentStatus: boolean) {
    try {
      const { error } = await supabase
        .from('contact_submissions')
        .update({ is_archived: !currentStatus })
        .eq('id', id)

      if (error) throw error
      fetchSubmissions()
    } catch (error: any) {
      alert('Error updating: ' + error.message)
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Are you sure you want to delete this submission?')) return

    try {
      const { error } = await supabase
        .from('contact_submissions')
        .delete()
        .eq('id', id)

      if (error) throw error
      fetchSubmissions()
    } catch (error: any) {
      alert('Error deleting: ' + error.message)
    }
  }

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen">
        <AdminSidebar />
        
        <main className="flex-1 lg:ml-64 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            <div className="mb-6">
              <h1 className="text-3xl font-sentient mb-2">Contact Submissions</h1>
              <p className="font-mono text-sm text-foreground/60">
                View and manage messages from your contact form
              </p>
            </div>

            {/* Filters */}
            <div className="flex gap-2 mb-6">
              <Button
                variant={filter === 'all' ? 'default' : 'outline'}
                onClick={() => setFilter('all')}
              >
                All
              </Button>
              <Button
                variant={filter === 'unread' ? 'default' : 'outline'}
                onClick={() => setFilter('unread')}
              >
                Unread
              </Button>
              <Button
                variant={filter === 'archived' ? 'default' : 'outline'}
                onClick={() => setFilter('archived')}
              >
                Archived
              </Button>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="font-mono text-foreground/60">Loading submissions...</p>
              </div>
            ) : submissions.length === 0 ? (
              <Card>
                <CardContent className="p-12 text-center">
                  <Mail className="mx-auto mb-4 text-foreground/20" size={48} />
                  <p className="font-mono text-foreground/60">No submissions found</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission) => (
                  <Card key={submission.id} className={submission.is_read ? '' : 'border-primary/50'}>
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div className="flex items-start gap-3 flex-1 min-w-0">
                          <div className="mt-1">
                            {submission.is_read ? (
                              <MailOpen size={20} className="text-foreground/40" />
                            ) : (
                              <Mail size={20} className="text-primary" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <h3 className="font-sentient text-lg">{submission.name}</h3>
                              {!submission.is_read && (
                                <span className="px-2 py-0.5 bg-primary/20 text-primary text-xs rounded">
                                  New
                                </span>
                              )}
                              {submission.is_archived && (
                                <span className="px-2 py-0.5 bg-foreground/10 text-foreground/60 text-xs rounded">
                                  Archived
                                </span>
                              )}
                            </div>
                            <p className="font-mono text-sm text-foreground/60 mb-1">
                              {submission.email}
                            </p>
                            <p className="font-sentient text-base mb-2">{submission.subject}</p>
                            <p className="text-sm text-foreground/70 whitespace-pre-wrap">
                              {submission.message}
                            </p>
                            <p className="font-mono text-xs text-foreground/40 mt-2 flex items-center gap-1">
                              <Calendar size={12} />
                              {new Date(submission.created_at).toLocaleString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 flex-shrink-0">
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleRead(submission.id, submission.is_read)}
                            title={submission.is_read ? 'Mark as unread' : 'Mark as read'}
                          >
                            {submission.is_read ? <Mail size={16} /> : <MailOpen size={16} />}
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => toggleArchive(submission.id, submission.is_archived)}
                            title={submission.is_archived ? 'Unarchive' : 'Archive'}
                          >
                            <Archive size={16} />
                          </Button>
                          <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => handleDelete(submission.id)}
                            className="text-red-500 hover:text-red-600"
                            title="Delete"
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

