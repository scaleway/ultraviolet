'use client'

export type Data = {
  name?: string | null
  needPattern?: boolean | null
  percent: number
  id: string
  value?: string | null
  details?: {
    name?: string | null
    value?: string | null
  }[]
}
