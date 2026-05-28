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
  const formattedSize = size % 1 === 0 ? size : Number.parseFloat(size.toFixed(2))

  return `${formattedSize} ${units[unitIndex]}`
}

export const fileIsAccepted = (file: File, accept?: string) => {
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

  const { name: fileName, type: fileType } = file

  for (const item of acceptItems) {
    if (item.endsWith('/*')) {
      const prefix = item.slice(0, item.indexOf('/'))
      if (fileType.startsWith(`${prefix}/`)) {
        return true
      }
    } else if (fileType === item) {
      return true
    } else if (item.startsWith('.') && fileName.toLocaleLowerCase().endsWith(item)) {
      return true
    }
  }

  return false
}

const isFileEntry = (entry: FileSystemEntry): entry is FileSystemFileEntry => !!entry.isFile
const isDirectoryEntry = (entry: FileSystemEntry): entry is FileSystemDirectoryEntry => !!entry.isDirectory

const convertEntryToFile = (entry: FileSystemFileEntry): Promise<File> =>
  new Promise((resolve, reject) => {
    entry.file(resolve, reject)
  })

async function readEntriesInDirectory(directory: FileSystemDirectoryEntry) {
  const reader = directory.createReader()
  const nestedEntries = []

  let results = []
  do {
    results = await new Promise<FileSystemEntry[]>((resolve, reject) => {
      reader.readEntries(resolve, reject)
    })
    nestedEntries.push(...results)
  } while (results?.length > 0)

  return nestedEntries
}

/**
 * Recursive function to read all the files in a list of FileSystemEntry objects (files or directories)
 */
async function readEntries(entries: FileSystemEntry[]): Promise<File[]> {
  const readFilesPromises = entries.filter(entry => isFileEntry(entry)).map(entry => convertEntryToFile(entry))
  const files = await Promise.all(readFilesPromises)

  const readFoldersPromises = entries
    .filter(entry => isDirectoryEntry(entry))
    .map(async directory => {
      const nestedEntries = await readEntriesInDirectory(directory)

      if (nestedEntries.length > 0) {
        files.push(...(await readEntries(nestedEntries)))
      }
    })

  await Promise.all(readFoldersPromises)

  return files
}

/**
 * Read the entries of a DataTransfer object, including the content of directories
 */
export const readTransferredFiles = async (dataTransfer: DataTransfer) => {
  const items = [...dataTransfer.items].map(entry => entry.webkitGetAsEntry()).filter(item => !!item)
  const files = await readEntries(items)

  const outputDataTransfer = new DataTransfer()
  for (const file of files) {
    outputDataTransfer.items.add(file)
  }

  return outputDataTransfer.files
}
