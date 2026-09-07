import type { FilesType } from '../types'

const createMockFile = (options: {
  name: string
  type: string
  size: number
  file?: string
  loading?: boolean
  error?: string
}): FilesType => {
  const { name, type, size, file, loading, error } = options
  const blob = new Blob(['x'.repeat(Math.min(size, 1024))], { type })
  const fileInstance = new File([blob], name, { type, lastModified: Date.now() })

  Object.assign(fileInstance, {
    file: file ?? name,
    ...(loading && { loading }),
    ...(error && { error }),
  })

  return fileInstance
}

export const defaultFiles: FilesType[] = [
  createMockFile({
    name: 'cat.png',
    type: 'image/png',
    size: 30_460,
    file: 'https://upload.wikimedia.org/wikipedia/commons/4/41/Photo_Chat_Noir_et_blanc.jpg',
  }),
  createMockFile({
    name: 'sound.mp3',
    type: 'audio/mp3',
    size: 30_460,
    file: 'sound.mp3',
  }),
  createMockFile({
    name: 'doc.pdf',
    type: 'application/pdf',
    size: 304_600,
    file: 'doc.pdf',
  }),
  createMockFile({
    name: 'video.mp4',
    type: 'video/mp4',
    size: 40_460_000,
    file: 'video.mp4',
  }),
  createMockFile({
    name: 'loading_example.pdf',
    type: 'application/pdf',
    size: 40_460_000,
    file: 'loading.pdf',
    loading: true,
  }),
  createMockFile({
    name: 'error_example.png',
    type: 'image/png',
    size: 4_046_000_000,
    file: 'error_example.png',
    error: 'Maximum file size exceeded',
  }),
]
