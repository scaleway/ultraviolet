'use client'

import type { CSSProperties, ReactNode } from 'react'
import { Children } from 'react'
import { Stack } from '../../../Stack'
import { Text } from '../../../Text'
import { useNavigation } from '../NavigationProvider'
import { navigationGroupStack, navigationGroupText } from './styles.css'

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

  const { expanded, animation, animationType } = context

  const isDiplay = !animation && expanded

  if (Children.count(children) > 0) {
    return (
      <div style={{ width: animation ? '100%' : undefined, ...style }}>
        <Stack className={navigationGroupStack} direction="column">
          {isDiplay ? (
            <Text
              as="span"
              className={navigationGroupText({
                animation: animationType === 'complex' ? animation : false,
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
