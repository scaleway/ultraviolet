'use client'

import { Children, forwardRef } from 'react'

import { Stack } from '../../Stack'

import { Card } from './Card'
import { SkeletonCard } from './SkeletonCard'
import { contentCardGroupStyle } from './styles.css'

import type { CSSProperties, ReactNode } from 'react'

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
    className={contentCardGroupStyle.groupCardWrapper}
    direction="column"
    ref={ref}
    style={style}
  >
    {loading
      ? Children.map(children, (_child, index) => <SkeletonCard key={index} />)
      : children}
  </Stack>
))

export const ContentCardGroup = Object.assign(BaseContentCardGroup, {
  Card,
})
