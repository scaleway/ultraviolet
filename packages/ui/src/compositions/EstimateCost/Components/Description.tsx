import { memo } from 'react'
import type { ReactNode } from 'react'
import { Text } from '../../../components/Text'
import type EstimateCostLocales from '../locales/en'

export const Description = memo(
  ({ description, locales }: { description: ReactNode; locales: Record<keyof typeof EstimateCostLocales, string> }) =>
    description === undefined || typeof description === 'string' ? (
      <Text as="span" variant="body">
        {description || locales['estimate.cost.description']}
      </Text>
    ) : (
      description
    ),
)
