'use client'

import { OpenInNewIcon } from '@ultraviolet/icons/OpenInNewIcon'
import { Stack, Text } from '@ultraviolet/ui'
import type {
  AnchorHTMLAttributes,
  CSSProperties,
  ElementType,
  ReactNode,
} from 'react'
import { forwardRef } from 'react'
import {
  customStack,
  fullHeightStack,
  iconWrapper,
  styledWrapper,
} from './styles.css'

type CardProps = {
  title?: string
  titleAs?: ElementType
  subtitle?: string
  subtitleAs?: ElementType
  description?: string
  children?: ReactNode
  href: string
  target?: AnchorHTMLAttributes<HTMLAnchorElement>['target']
  style?: CSSProperties
}

export const Card = forwardRef<HTMLAnchorElement, CardProps>(
  (
    {
      title,
      titleAs,
      subtitle,
      subtitleAs,
      description,
      children,
      href,
      target = '_blank',
      style,
    },
    ref,
  ) => (
    <a
      className={styledWrapper}
      href={href}
      ref={ref}
      style={style}
      target={target}
    >
      <Stack
        alignItems="center"
        className={fullHeightStack}
        direction="row"
        gap={2}
        justifyContent="space-between"
      >
        <Stack className={customStack} gap="0.5">
          <div>
            {subtitle ? (
              <Text
                as={subtitleAs ?? 'h5'}
                oneLine
                prominence="weak"
                sentiment="neutral"
                variant="caption"
              >
                {subtitle}
              </Text>
            ) : null}
            <Text
              as={titleAs ?? 'h3'}
              oneLine
              sentiment="neutral"
              variant="bodyStrong"
            >
              {title}
            </Text>
          </div>
          {description ? (
            <Text as="p" oneLine sentiment="neutral" variant="bodySmall">
              {description}
            </Text>
          ) : null}
          {children}
        </Stack>
        <div className={iconWrapper}>
          <OpenInNewIcon sentiment="neutral" />
        </div>
      </Stack>
    </a>
  ),
)
