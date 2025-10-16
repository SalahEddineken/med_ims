/**
 * Export data utilities for admin panel
 */

/**
 * Export data to CSV format
 */
export function exportToCSV(data: any[], filename: string) {
  if (data.length === 0) {
    alert('No data to export')
    return
  }

  // Get headers from first object
  const headers = Object.keys(data[0])
  
  // Create CSV content
  const csvContent = [
    headers.join(','), // Header row
    ...data.map(row => 
      headers.map(header => {
        let cell = row[header]
        
        // Handle arrays
        if (Array.isArray(cell)) {
          cell = cell.join('; ')
        }
        
        // Handle null/undefined
        if (cell === null || cell === undefined) {
          cell = ''
        }
        
        // Escape quotes and wrap in quotes if contains comma or quote
        cell = String(cell)
        if (cell.includes(',') || cell.includes('"') || cell.includes('\n')) {
          cell = `"${cell.replace(/"/g, '""')}"`
        }
        
        return cell
      }).join(',')
    )
  ].join('\n')

  // Create download
  downloadFile(csvContent, filename, 'text/csv')
}

/**
 * Export data to JSON format
 */
export function exportToJSON(data: any[], filename: string) {
  if (data.length === 0) {
    alert('No data to export')
    return
  }

  const jsonContent = JSON.stringify(data, null, 2)
  downloadFile(jsonContent, filename, 'application/json')
}

/**
 * Helper function to trigger file download
 */
function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

/**
 * Format date for filename
 */
export function getFormattedDate(): string {
  const now = new Date()
  return now.toISOString().split('T')[0] // YYYY-MM-DD
}

