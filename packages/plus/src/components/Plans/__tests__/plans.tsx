import { EntrepriseSupportProductIcon } from '@ultraviolet/icons/product'
import { Button, Separator, Text } from '@ultraviolet/ui'
import { ComponentProps } from 'react'

export const planStarter = {
  value: 'starter',
  title: 'Starter',
  sentiment: 'primary' as ComponentProps<typeof Text>['sentiment'],
  disabled: true,
  outOfStock: true,
  header: {
    quotas: 'quotas',
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    description: (
      <div
        style={{
          gap: '16px',
          display: 'flex',
          flexDirection: 'column',
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
  },
  data: {
    gb: '100 GB',
    pipeline: '1 pipeline',
    domain: false,
    ssl: true,
    fees: true,
    group: true,
    group2: false,
  },
}

export const planProfessional = {
  value: 'professional',
  title: 'professional',
  sentiment: 'black' as ComponentProps<typeof Text>['sentiment'],
  titleHeader: <EntrepriseSupportProductIcon size="xlarge" />,
  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    description: (
      <div
        style={{
          gap: '16px',
          display: 'flex',
          flexDirection: 'column',
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
  data: {
    gb: '1 TB',
    pipeline: '10 pipelines',
    domain: true,
    ssl: true,
    fees: true,
    group: true,
    group2: false,
  },
}

export const planAdvanced = {
  value: 'advanced',
  title: 'Advanced',
  titleHeader: <EntrepriseSupportProductIcon size="xlarge" />,

  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    description: (
      <div
        style={{
          gap: '16px',
          display: 'flex',
          flexDirection: 'column',
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
  data: {
    gb: '10 TB',
    pipeline: '100 pipelines',
    domain: true,
    ssl: true,
    fees: true,
    group: true,
    group2: false,
  },
}
