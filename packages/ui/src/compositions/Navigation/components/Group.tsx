'use client'

import { Children, useId } from 'react'

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
  const id = useId()

  if (!context) {
    throw new Error(
      'Navigation.Group can only be used inside a NavigationProvider.',
    )
  }

  const { expanded, animation } = context

  if (Children.count(children) > 0) {
    return (
      <Stack gap={0.25} direction="column" style={style} data-flip-id={id}>
        {expanded ? (
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
    )
  }

  return null
}
