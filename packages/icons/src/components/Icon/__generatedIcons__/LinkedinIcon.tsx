'use client'

/**
 * Provide the icon component for the icon name.
 * This file is automatically generated from /utils/scripts/generate-icons-file.tsx.
 * PLEASE DO NOT EDIT HERE
 */
import { Icon } from '../Icon'
import type { IconProps } from '../Icon'

export const LinkedinIcon = ({ ...props }: Omit<IconProps, 'children'>) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Icon {...props}>
    {typeof props.size === 'string' &&
    ['medium', 'large', 'xlarge', 'xxlarge'].includes(props.size) ? (
      <path
        fillRule="evenodd"
        d="M18.332 18.166a.167.167 0 0 1-.167.167h-3.09a.167.167 0 0 1-.167-.167V12.5c0-1.599-.608-2.492-1.874-2.492-1.377 0-2.096.93-2.096 2.492v5.666a.167.167 0 0 1-.167.167H7.804a.167.167 0 0 1-.166-.167V7.39c0-.092.074-.167.166-.167h2.967c.092 0 .167.075.167.167v.67c0 .174.275.26.39.131a3.88 3.88 0 0 1 2.96-1.307c2.357 0 4.044 1.439 4.044 4.415zM3.7 5.767a2.043 2.043 0 0 1-2.035-2.05c0-1.132.91-2.05 2.035-2.05s2.034.918 2.034 2.05-.91 2.05-2.034 2.05m-1.704 12.4c0 .091.074.166.166.166H5.27a.167.167 0 0 0 .167-.167V7.39a.167.167 0 0 0-.167-.167H2.163a.167.167 0 0 0-.166.167z"
        clipRule="evenodd"
      />
    ) : (
      <path
        fillRule="evenodd"
        d="M14.666 14.533c0 .074-.06.133-.134.133H12.06a.133.133 0 0 1-.134-.133V10c0-1.28-.486-1.994-1.498-1.994-1.102 0-1.678.744-1.678 1.994v4.533c0 .074-.06.133-.133.133H6.244a.133.133 0 0 1-.134-.133V5.91c0-.074.06-.133.134-.133h2.373c.074 0 .133.06.133.133v.537c0 .138.22.207.313.104a3.1 3.1 0 0 1 2.367-1.046c1.886 0 3.236 1.151 3.236 3.532zM2.96 4.613c-.9 0-1.628-.734-1.628-1.64s.728-1.64 1.628-1.64 1.627.735 1.627 1.64c0 .906-.728 1.64-1.627 1.64m-1.363 9.92c0 .074.06.133.133.133h2.486c.074 0 .133-.06.133-.133V5.91a.133.133 0 0 0-.133-.133H1.731a.133.133 0 0 0-.133.133z"
        clipRule="evenodd"
      />
    )}
  </Icon>
)
