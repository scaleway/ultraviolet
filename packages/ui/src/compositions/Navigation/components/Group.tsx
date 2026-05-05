'use client'

import { Children } from 'react'

import { Stack } from '../../../components/Stack'
import { Text } from '../../../components/Text'
import { useNavigation } from '../NavigationProvider'
import { navigationStyle } from '../styles.css'

import type { CSSProperties, ReactNode } from 'react'

type GroupProps = {
  children: ReactNode
  label: string
  style?: CSSProperties
  additionalData?: ReactNode
}

export const Group = ({
  children,
  label,
  style,
  additionalData,
}: GroupProps) => {
  const context = useNavigation()

  if (!context) {
    throw new Error(
      'Navigation.Group can only be used inside a NavigationProvider.',
    )
  }

  const { expanded, animation } = context

  const isDiplay = (expanded && !animation) || animation === 'expand'

  if (Children.count(children) > 0) {
    return (
      <div style={style}>
        <Stack className={navigationStyle.groupStack} direction="column">
          {isDiplay ? (
            <Text
              as="span"
              className={navigationStyle.groupText({
                animation: animation === 'expand' ? 'expand' : undefined,
              })}
              prominence="weak"
              sentiment="neutral"
              variant="bodySmallStrong"
            >
              {additionalData ? (
                <Stack direction="row" justifyContent="space-between">
                  {label}
                  {additionalData}
                </Stack>
              ) : (
                label
              )}
            </Text>
          ) : null}
          {children}
        </Stack>
      </div>
    )
  }

  return null
}
