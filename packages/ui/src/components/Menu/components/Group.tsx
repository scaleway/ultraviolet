'use client'

import type { ReactNode } from 'react'
import { Children } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { menuGroup } from '../styles.css'

type GroupProps = {
  label: string
  children: ReactNode
  labelDescription?: ReactNode
  /**
   * Empty state will be shown when there are no children
   */
  emptyState?: ReactNode
}

export const Group = ({
  label,
  children,
  labelDescription,
  emptyState,
}: GroupProps) => {
  const isChildrenEmpty = Children.count(children) === 0

  return (
    <>
      <span className={menuGroup}>
        <Stack alignItems="center" direction="row" gap={1}>
          <Text
            as="span"
            prominence="weak"
            sentiment="neutral"
            variant="captionStrong"
          >
            {label}
          </Text>
          {labelDescription || null}
        </Stack>
      </span>
      {isChildrenEmpty && emptyState ? emptyState : children}
    </>
  )
}
