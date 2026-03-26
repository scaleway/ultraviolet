'use client'

import { CloseIcon } from '@ultraviolet/icons/CloseIcon'

import { Button } from '../Button'
import { Stack } from '../Stack'
import { Text } from '../Text'

import { popoverStyle } from './styles.css'

import type { ContentWrapperProps } from './types'

export const ContentWrapper = ({
  title,
  onClose,
  children,
  sentiment,
}: ContentWrapperProps) => (
  <Stack className={popoverStyle.stack} gap={1}>
    <Stack direction="row" justifyContent="space-between">
      <Text
        as="h3"
        prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
        sentiment={sentiment === 'neutral' ? 'neutral' : 'white'}
        variant="bodyStrong"
      >
        {title}
      </Text>
      <Button
        aria-label="close"
        onClick={onClose}
        sentiment={sentiment === 'neutral' ? 'neutral' : 'primary'}
        size="small"
        variant={sentiment === 'neutral' ? 'ghost' : 'filled'}
      >
        <CloseIcon />
      </Button>
    </Stack>
    {typeof children === 'string' ? (
      <Text
        as="p"
        prominence={sentiment === 'neutral' ? 'strong' : 'stronger'}
        sentiment={sentiment === 'neutral' ? 'neutral' : 'white'}
        variant="bodySmall"
      >
        {children}
      </Text>
    ) : (
      children
    )}
  </Stack>
)
