import type { ReactNode } from 'react'

export type DataType = {
  id: string
  value?: number
  content: string | ReactNode
  children?: DataType[]
}
