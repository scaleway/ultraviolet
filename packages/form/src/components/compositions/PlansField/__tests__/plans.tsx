import { EntrepriseSupportProductIcon } from '@ultraviolet/icons/product'
import type { Text } from '@ultraviolet/ui'
import { Button, Separator } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'

export const planStarter = {
  data: {
    domain: false,
    fees: true,
    gb: '100 GB',
    group: true,
    group2: false,
    pipeline: '1 pipeline',
    ssl: true,
  },
  disabled: true,
  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    description: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Separator />

        <p style={{ paddingInline: '16px' }}>
          For developers & non mission-critical projects{' '}
        </p>
        <Separator />
      </div>
    ),
    price: '€0.99',
    priceDescription: '/month',
    quotas: 'quotas',
  },
  outOfStock: true,
  sentiment: 'primary' as ComponentProps<typeof Text>['sentiment'],
  title: 'Starter',
  value: 'starter',
}

export const planProfessional = {
  data: {
    domain: true,
    fees: true,
    gb: '1 TB',
    group: true,
    group2: false,
    pipeline: '10 pipelines',
    ssl: true,
  },
  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    description: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Separator />
        <p style={{ paddingInline: '16px' }}>For small businesses & startups</p>

        <Separator />
      </div>
    ),
    price: '€12.99',
    priceDescription: '/month',
  },
  sentiment: 'black' as ComponentProps<typeof Text>['sentiment'],
  title: 'professional',
  titleHeader: <EntrepriseSupportProductIcon size="xlarge" />,
  value: 'professional',
}

export const planAdvanced = {
  data: {
    domain: true,
    fees: true,
    gb: '10 TB',
    group: true,
    group2: false,
    pipeline: '100 pipelines',
    ssl: true,
  },

  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    description: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Separator />

        <p style={{ paddingInline: '16px' }}>
          For fast-growing starups & mission-critical infrastructure
        </p>
        <Separator />
      </div>
    ),
    price: '€109.99',
  },
  title: 'Advanced',
  titleHeader: <EntrepriseSupportProductIcon size="xlarge" />,
  value: 'advanced',
}
