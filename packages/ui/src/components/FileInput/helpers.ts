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
