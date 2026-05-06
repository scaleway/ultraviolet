import type { MimeType } from './types'

export const getMimeTypeType = (mimeType: string): MimeType =>
  // oxlint-disable-next-line typescript/no-unsafe-type-assertion
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

export const fileIsAccepted = (
  fileType: string,
  fileName: string,
  accept?: string,
) => {
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
    } else if (item.startsWith('.')) {
      return fileName.toLocaleLowerCase().endsWith(item)
    }
  }

  return false
}

const isFileSystemFileEntry = (
  entry: FileSystemEntry,
): entry is FileSystemFileEntry => !!entry.isFile

const isFileSystemDirEntry = (
  entry: FileSystemEntry,
): entry is FileSystemDirectoryEntry => !!entry.isDirectory

const convertEntryToFile = (entry: FileSystemFileEntry): Promise<File> =>
  new Promise((resolve, reject) => {
    if (entry.isFile) {
      entry.file(
        file => resolve(file),
        error => reject(error),
      )
    } else {
      reject(new Error('Entry is not a file'))
    }
  })

// Recursive function to read all the files inside nested directories
const readEntries = async (
  directory: FileSystemDirectoryEntry,
  onDropError?: (error?: unknown) => void,
): Promise<FileSystemFileEntry[]> => {
  const reader = directory.createReader()
  const entries: FileSystemFileEntry[] = []
  const subdirs: FileSystemDirectoryEntry[] = []

  while (true) {
    const results = await new Promise<FileSystemEntry[]>((resolve, reject) => {
      reader.readEntries(resolve, reject)
    }).catch((error: unknown) => onDropError?.(error))

    if (results?.length === 0 || !results) {
      break
    }

    const computedFiles = results
      .filter(entry => isFileSystemFileEntry(entry))
      .map(entry => entry)
    const computedDirs = results
      .filter(entry => isFileSystemDirEntry(entry))
      .map(entry => entry)

    entries.push(...computedFiles)
    subdirs.push(...computedDirs)
  }

  // Process all subdirectories in parallel with promise.all
  const subdirFiles = await Promise.all(
    subdirs.map(subdir => readEntries(subdir, onDropError)),
  ).catch((error: unknown) => onDropError?.(error))

  if (subdirFiles) {
    for (const files of subdirFiles) {
      entries.push(...files)
    }
  }

  return entries
}

export const readEntry = async (
  dataTransfer: DataTransfer,
  onDropError?: (error: unknown) => void,
) => {
  const items = [...dataTransfer.items].map(entry => entry.webkitGetAsEntry())
  const dataTransferComputed = new DataTransfer()

  for (const entry of items) {
    if (entry && isFileSystemFileEntry(entry)) {
      const file = await convertEntryToFile(entry)
      dataTransferComputed.items.add(file)
    } else if (entry && isFileSystemDirEntry(entry)) {
      const directory = entry
      const entries = await readEntries(directory, onDropError)

      for (const file of entries) {
        const convertedFile = await convertEntryToFile(file)
        dataTransferComputed.items.add(convertedFile)
      }
    }
  }

  return dataTransferComputed.files
}
