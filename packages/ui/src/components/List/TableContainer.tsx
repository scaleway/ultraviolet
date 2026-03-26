'use client'

import { Children, useEffect, useState } from 'react'

import { useListContext } from './ListContext'
import { listStyle } from './styles.css'

import type { ReactNode } from 'react'

export const TableContainer = ({ children }: { children: ReactNode }) => {
  const [childrenMemory, setChildrenMemory] = useState<ReactNode[]>(
    Children.toArray(children),
  )

  const { setRefList } = useListContext()

  // Reset ref list when children change
  useEffect(() => {
    if (Children.toArray(children) !== childrenMemory) {
      setRefList([])
      setChildrenMemory(Children.toArray(children))
    }
    // oxlint-disable react/exhaustive-deps
  }, [children, setRefList])

  return <div className={listStyle.container}>{children}</div>
}
