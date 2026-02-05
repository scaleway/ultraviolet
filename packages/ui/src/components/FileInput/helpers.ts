import type { MimeType } from './types'

export const getMimeTypeType = (mimeType: string): MimeType =>
  (mimeType.split('/')?.[0]?.toLowerCase() || 'example') as MimeType

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB', 'TB'] as const

  let size = bytes
  let unitIndex = 0

  while (size >= 1000 && unitIndex < units.length - 1) {
    size /= 1000
    unitIndex += 1
  }

  // Format to 2 decimal
  const formattedSize =
    size % 1 === 0 ? size : Number.parseFloat(size.toFixed(2))

  return `${formattedSize} ${units[unitIndex]}`
}

export const fileIsAccepted = (fileType: string, accept?: string) => {
  if (!accept) {
    return true
  }

  const acceptItems = accept
    .split(',')
    .map(a => a.trim())
    .filter(Boolean)

  if (acceptItems.length === 0) {
    return true
  }

  for (const item of acceptItems) {
    if (item.endsWith('/*')) {
      const prefix = item.slice(0, item.indexOf('/'))
      if (fileType.startsWith(`${prefix}/`)) {
        return true
      }
    } else if (fileType === item) {
      return true
    }
  }

  return false
}
