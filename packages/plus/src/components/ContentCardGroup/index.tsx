'use client'

import { Stack } from '@ultraviolet/ui'
import type { CSSProperties, ReactNode } from 'react'
import { Children, forwardRef } from 'react'
import { Card } from './Card'
import { SkeletonCard } from './SkeletonCard'
import { groupCardWrapper } from './styles.css'

type BaseContentCardGroupProps = {
  children: ReactNode
  loading?: boolean
  style?: CSSProperties
}

const BaseContentCardGroup = forwardRef<
  HTMLDivElement,
  BaseContentCardGroupProps
>(({ children, loading, style }, ref) => (
  <Stack
    className={groupCardWrapper}
    direction="column"
    ref={ref}
    style={style}
  >
    {loading
      ? Children.map(children, (_child, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: error
          <SkeletonCard key={index} />
        ))
      : children}
  </Stack>
))

export const ContentCardGroup = Object.assign(BaseContentCardGroup, {
  Card,
})
