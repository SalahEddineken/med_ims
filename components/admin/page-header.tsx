'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Search, Plus, Download } from 'lucide-react'
import { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  description?: string
  onAdd?: () => void
  addLabel?: string
  searchValue?: string
  onSearchChange?: (value: string) => void
  searchPlaceholder?: string
  onExport?: () => void
  showSearch?: boolean
  showAdd?: boolean
  showExport?: boolean
  children?: ReactNode
}

export function PageHeader({
  title,
  description,
  onAdd,
  addLabel = 'Add New',
  searchValue,
  onSearchChange,
  searchPlaceholder = 'Search...',
  onExport,
  showSearch = false,
  showAdd = true,
  showExport = false,
  children,
}: PageHeaderProps) {
  return (
    <div className="space-y-4 mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-sentient">{title}</h1>
          {description && (
            <p className="font-mono text-sm text-foreground/60 mt-1">
              {description}
            </p>
          )}
        </div>
        <div className="flex items-center gap-2">
          {showExport && onExport && (
            <Button onClick={onExport} variant="outline" className="gap-2">
              <Download size={16} />
              Export
            </Button>
          )}
          {showAdd && onAdd && (
            <Button onClick={onAdd} className="gap-2">
              <Plus size={16} />
              {addLabel}
            </Button>
          )}
        </div>
      </div>

      {(showSearch || children) && (
        <div className="flex flex-col sm:flex-row gap-4">
          {showSearch && onSearchChange && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder={searchPlaceholder}
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          )}
          {children}
        </div>
      )}
    </div>
  )
}

