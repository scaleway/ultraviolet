import { memo } from 'react'

import { Text } from '../../../Text'

import type EstimateCostLocales from '../locales/en'
import type { ReactNode } from 'react'

export const Description = memo(
  ({
    description,
    locales,
  }: {
    description: ReactNode
    locales: Record<keyof typeof EstimateCostLocales, string>
  }) =>
    description === undefined || typeof description === 'string' ? (
      <Text as="span" variant="body">
        {description || locales['estimate.cost.description']}
      </Text>
    ) : (
      description
    ),
)
