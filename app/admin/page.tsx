'use client'

import { useEffect, useState } from 'react'
import { ProtectedRoute } from '@/components/admin/protected-route'
import { AdminSidebar } from '@/components/admin/admin-sidebar'
import { AdminHeader } from '@/components/admin/admin-header'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { supabase } from '@/lib/supabase'
import {
  FolderKanban,
  Music,
  Briefcase,
  GraduationCap,
  Award,
  Wrench,
  Mail,
  TrendingUp,
  Clock,
} from 'lucide-react'

export default function AdminDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [stats, setStats] = useState({
    projects: 0,
    music: 0,
    experience: 0,
    education: 0,
    certificates: 0,
    skills: 0,
    contactSubmissions: 0,
    unreadSubmissions: 0,
  })
  const [recentSubmissions, setRecentSubmissions] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([fetchStats(), fetchRecentSubmissions()])
  }, [])

  async function fetchStats() {
    try {
      const [
        { count: projects },
        { count: music },
        { count: experience },
        { count: education },
        { count: certificates },
        { count: skills },
        { count: contactSubmissions },
        { count: unreadSubmissions },
      ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('music_tracks').select('*', { count: 'exact', head: true }),
        supabase.from('experience').select('*', { count: 'exact', head: true }),
        supabase.from('education').select('*', { count: 'exact', head: true }),
        supabase.from('certificates').select('*', { count: 'exact', head: true }),
        supabase.from('skills').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }),
        supabase.from('contact_submissions').select('*', { count: 'exact', head: true }).eq('is_read', false),
      ])

      setStats({
        projects: projects || 0,
        music: music || 0,
        experience: experience || 0,
        education: education || 0,
        certificates: certificates || 0,
        skills: skills || 0,
        contactSubmissions: contactSubmissions || 0,
        unreadSubmissions: unreadSubmissions || 0,
      })
    } catch (error) {
      console.error('Error fetching stats:', error)
    } finally {
      setLoading(false)
    }
  }

  async function fetchRecentSubmissions() {
    try {
      const { data } = await supabase
        .from('contact_submissions')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5)
      
      setRecentSubmissions(data || [])
    } catch (error) {
      console.error('Error fetching recent submissions:', error)
    }
  }

  const statCards = [
    {
      title: 'Projects',
      value: stats.projects,
      icon: FolderKanban,
      href: '/admin/projects',
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Music Tracks',
      value: stats.music,
      icon: Music,
      href: '/admin/music',
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Experience',
      value: stats.experience,
      icon: Briefcase,
      href: '/admin/experience',
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
    },
    {
      title: 'Education',
      value: stats.education,
      icon: GraduationCap,
      href: '/admin/education',
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
    },
    {
      title: 'Certificates',
      value: stats.certificates,
      icon: Award,
      href: '/admin/certificates',
      color: 'text-yellow-500',
      bgColor: 'bg-yellow-500/10',
    },
    {
      title: 'Skills',
      value: stats.skills,
      icon: Wrench,
      href: '/admin/skills',
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
    },
    {
      title: 'Contact Messages',
      value: stats.contactSubmissions,
      icon: Mail,
      href: '/admin/contact',
      color: 'text-cyan-500',
      bgColor: 'bg-cyan-500/10',
      badge: stats.unreadSubmissions > 0 ? stats.unreadSubmissions : undefined,
    },
  ]

  const totalContent = stats.projects + stats.music + stats.experience + stats.education + stats.certificates + stats.skills

  return (
    <ProtectedRoute>
      <div className="flex min-h-screen bg-muted/30">
        <AdminSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        
        <div className="flex-1 lg:ml-64">
          <AdminHeader 
            onMenuClick={() => setSidebarOpen(!sidebarOpen)}
            title="Dashboard"
          />
          
          <main className="p-4 md:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto space-y-6">
              {/* Welcome Banner */}
              <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
                <CardHeader>
                  <CardTitle className="font-sentient text-2xl flex items-center gap-2">
                    <TrendingUp className="h-6 w-6 text-primary" />
                    Welcome Back!
                  </CardTitle>
                  <CardDescription className="font-mono">
                    Here's an overview of your portfolio content
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap items-center gap-6 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center">
                        <span className="text-lg font-bold text-primary">{totalContent}</span>
                      </div>
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">Total Content</p>
                        <p className="font-semibold">Items Published</p>
                      </div>
                    </div>
                    {stats.unreadSubmissions > 0 && (
                      <div className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-full bg-cyan-500/20 flex items-center justify-center">
                          <Mail className="h-5 w-5 text-cyan-500" />
                        </div>
                        <div>
                          <p className="font-mono text-xs text-muted-foreground">New Messages</p>
                          <p className="font-semibold">{stats.unreadSubmissions} Unread</p>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Stats Grid */}
              {loading ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                  <p className="font-mono text-foreground/60">Loading stats...</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {statCards.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <a
                        key={stat.title}
                        href={stat.href}
                        className="block group"
                      >
                        <Card className="hover:shadow-md hover:border-primary/30 transition-all duration-200">
                          <CardContent className="p-6">
                            <div className="flex items-center justify-between mb-4">
                              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                <Icon className={`h-6 w-6 ${stat.color}`} />
                              </div>
                              {stat.badge && (
                                <span className="px-2 py-1 bg-primary text-primary-foreground text-xs rounded-full font-medium">
                                  {stat.badge} new
                                </span>
                              )}
                            </div>
                            <div className="space-y-1">
                              <p className="font-mono text-sm text-muted-foreground">
                                {stat.title}
                              </p>
                              <p className="text-3xl font-bold font-sentient">{stat.value}</p>
                            </div>
                            <div className="mt-4 flex items-center text-xs font-mono text-primary group-hover:translate-x-1 transition-transform">
                              View all →
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    )
                  })}
                </div>
              )}

              {/* Recent Submissions */}
              {recentSubmissions.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="font-sentient flex items-center gap-2">
                      <Clock className="h-5 w-5" />
                      Recent Contact Messages
                    </CardTitle>
                    <CardDescription className="font-mono">
                      Latest messages from your contact form
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {recentSubmissions.map((submission) => (
                        <a
                          key={submission.id}
                          href="/admin/contact"
                          className="block p-4 rounded-lg border hover:border-primary/30 hover:bg-accent/50 transition-colors"
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="font-semibold truncate">{submission.name}</p>
                                {!submission.is_read && (
                                  <span className="flex-shrink-0 w-2 h-2 bg-primary rounded-full"></span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground truncate mb-1">
                                {submission.subject}
                              </p>
                              <p className="text-xs text-muted-foreground font-mono">
                                {new Date(submission.created_at).toLocaleDateString()} at{' '}
                                {new Date(submission.created_at).toLocaleTimeString()}
                              </p>
                            </div>
                            <Mail className={`h-5 w-5 ${submission.is_read ? 'text-muted-foreground' : 'text-primary'}`} />
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-4">
                      <a
                        href="/admin/contact"
                        className="text-sm font-mono text-primary hover:underline"
                      >
                        View all messages →
                      </a>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </main>
        </div>
      </div>
    </ProtectedRoute>
  )
}
