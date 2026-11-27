import type { ReactNode } from 'react'
import { isStringOrNumberArray } from './isStringOrNumberArray'

export const isPlainTextContent = (node: ReactNode): boolean =>
  isStringOrNumberArray(Array.isArray(node) ? node : [node])
