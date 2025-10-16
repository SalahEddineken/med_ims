"use client"

import { Card } from "./ui/card"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Mail, MapPin, Phone, Send, CheckCircle, AlertCircle } from "lucide-react"
import { useState } from "react"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [statusMessage, setStatusMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setStatusMessage('')

    try {
      // Google Apps Script configuration
      const scriptUrl = process.env.NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
      
      // Send data to Google Apps Script
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors', // Required for Google Apps Script
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          timestamp: new Date().toISOString(),
        }),
      })

      // Since we're using no-cors mode, we can't check the response status
      // We'll assume success if no error is thrown
      setSubmitStatus('success')
      setStatusMessage('Message sent successfully! I\'ll get back to you soon.')
      setFormData({ name: "", email: "", subject: "", message: "" })
      
    } catch (error) {
      console.error('Google Apps Script error:', error)
      setSubmitStatus('error')
      setStatusMessage('Failed to send message. Please try emailing me directly at salaheddinekennouda@gmail.com')
    } finally {
      setIsSubmitting(false)
      // Clear status message after 5 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
        setStatusMessage('')
      }, 5000)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section className="py-20 md:py-28 relative z-0">
      <div className="container max-w-7xl mx-auto px-4 md:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-16">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient mb-6">
              Get in <i className="font-light">Touch</i>
            </h1>
            <p className="font-mono text-lg text-foreground/80 leading-relaxed max-w-2xl">
              Have a project in mind or want to discuss data analytics? I'd love to hear from you. 
              Send me a message and I'll get back to you as soon as possible.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* Contact Info Cards */}
            <Card className="p-6 bg-background/50 border-border hover:border-primary/30 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-sentient text-lg mb-2">Email</h3>
                <a 
                  href="mailto:salaheddinekennouda@gmail.com" 
                  className="font-mono text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  salaheddinekennouda@gmail.com
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-background/50 border-border hover:border-primary/30 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-sentient text-lg mb-2">Phone</h3>
                <a 
                  href="tel:+213658501459" 
                  className="font-mono text-sm text-foreground/60 hover:text-primary transition-colors"
                >
                  +213 6 58 50 14 59
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-background/50 border-border hover:border-primary/30 transition-all duration-300 group">
              <div className="flex flex-col items-center text-center">
                <div className="p-4 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors mb-4">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-sentient text-lg mb-2">Location</h3>
                <p className="font-mono text-sm text-foreground/60">
                  Chelghoum El Aïd, Algeria
                </p>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card className="p-8 md:p-12 bg-background/50 border-border">
            <h2 className="text-3xl md:text-4xl font-sentient mb-8">
              Send a <i className="font-light">Message</i>
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="font-mono text-sm text-foreground/80">
                    Your Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="font-mono text-sm text-foreground/80">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="bg-background border-border focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="font-mono text-sm text-foreground/80">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="bg-background border-border focus:border-primary"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="font-mono text-sm text-foreground/80">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="bg-background border-border focus:border-primary resize-none"
                />
              </div>

              <div className="space-y-4">
                <Button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="w-full md:w-auto gap-2"
                >
                  <Send size={16} />
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>

                {/* Status Message */}
                {submitStatus !== 'idle' && (
                  <div className={`flex items-center gap-2 p-4 rounded-lg ${
                    submitStatus === 'success' 
                      ? 'bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400' 
                      : 'bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400'
                  }`}>
                    {submitStatus === 'success' ? (
                      <CheckCircle size={20} />
                    ) : (
                      <AlertCircle size={20} />
                    )}
                    <p className="font-mono text-sm">{statusMessage}</p>
                  </div>
                )}
              </div>
            </form>
          </Card>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <p className="font-mono text-sm text-foreground/60 mb-4">Or connect with me on</p>
            <div className="flex justify-center gap-4">
              {[
                { name: "LinkedIn", url: "https://www.linkedin.com/in/salaheddine-kennouda/" },
                { name: "GitHub", url: "https://github.com/SalahEddineken" },
                { name: "Twitter", url: "#" },
              ].map((social) => (
                <a
                  key={social.name}
                  href={social.url}
                  className="px-4 py-2 font-mono text-sm bg-background/50 border border-border hover:border-primary/30 rounded-full transition-all duration-300 hover:translate-y-[-2px]"
                >
                  {social.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

