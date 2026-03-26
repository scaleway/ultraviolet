'use client'

import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Children } from 'react'

import { Text } from '../Text'

import { rowsVar, snippetStyle } from './styles.css'

export type Prefixes = 'lines' | 'command'

type CodeContentProps = {
  children: string
  prefix?: Prefixes
  multiline?: boolean
  showMore?: boolean
  hasShowMoreButton?: boolean
  lines?: string[]
  noExpandable: boolean
  rows: number
}

export const CodeContent = ({
  children,
  prefix,
  multiline,
  showMore,
  hasShowMoreButton,
  lines,
  noExpandable,
  rows,
}: CodeContentProps) => (
  <Text
    as="pre"
    className={snippetStyle.pretext({
      noExpandable,
      showMore: hasShowMoreButton && !showMore,
    })}
    style={assignInlineVars({
      [rowsVar]: rows.toString(),
    })}
    variant="code"
    whiteSpace={multiline ? undefined : 'nowrap'}
  >
    {multiline ? (
      Children.map(lines, child => (
        <span
          className={cn(
            snippetStyle.line({ multiline: true }),
            prefix ? snippetStyle.prefix[prefix] : '',
          )}
          key={child}
        >
          {child}
        </span>
      ))
    ) : (
      <span
        className={cn(
          snippetStyle.line(),
          prefix ? snippetStyle.prefix[prefix] : '',
        )}
      >
        {children}
      </span>
    )}
  </Text>
)
