'use client'

import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { cn } from '@ultraviolet/utils'
import { assignInlineVars } from '@vanilla-extract/dynamic'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import {
  iconContainer,
  iconStack,
  imageClass,
  subContainerHeightVar,
} from './styles.css'
import type { ContentCardProps } from './type'

export const LinkContent = ({
  direction,
  disabled,
}: {
  direction: 'column' | 'row'
  disabled?: boolean
}) => (
  <Stack
    alignItems={direction === 'column' ? 'flex-end' : 'center'}
    className={cn(iconStack[direction])}
    direction={direction}
    flex={1}
    justifyContent={direction === 'column' ? 'center' : 'flex-end'}
  >
    <div className={iconContainer}>
      <OpenInNewIcon disabled={disabled} sentiment="neutral" />
    </div>
  </Stack>
)

export const CardContent = ({
  title,
  subtitle,
  disabled,
  headingTag = 'h3',
  description,
  children,
}: ContentCardProps) => (
  <Stack flex="1 1 auto" gap={2} justifyContent="space-between">
    <Stack gap={0.5}>
      <Stack>
        {subtitle ? (
          <Text
            as="small"
            disabled={disabled}
            prominence="weak"
            sentiment="neutral"
            variant="caption"
          >
            {subtitle}
          </Text>
        ) : null}
        <Text
          as={headingTag}
          disabled={disabled}
          sentiment="neutral"
          variant="bodyStrong"
        >
          {title}
        </Text>
      </Stack>
      {description ? (
        <Text
          as="p"
          disabled={disabled}
          sentiment="neutral"
          variant="bodySmall"
        >
          {description}
        </Text>
      ) : null}
    </Stack>
    {children ? <Stack>{children}</Stack> : null}
  </Stack>
)

export const ImageContent = ({
  disabled,
  image,
  direction,
  subContainerHeight,
}: {
  disabled?: boolean
  image?: string
  direction: 'row' | 'column'
  subContainerHeight: string
}) => (
  <img
    alt=""
    className={imageClass[direction]}
    data-disabled={disabled}
    height={direction === 'column' ? 120 : undefined}
    src={image}
    style={assignInlineVars({
      [subContainerHeightVar]: subContainerHeight,
    })}
    width={direction === 'row' ? 220 : undefined}
  />
)
