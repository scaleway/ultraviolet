import type { Text } from '@ultraviolet/ui'
import { Button } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { domain, fees, gb, pipeline, ssl } from './features'
import { Template } from './Template.stories'

const planStarter = {
  value: 'starter',
  title: 'Starter',
  sentiment: 'primary' as ComponentProps<typeof Text>['sentiment'],
  header: {
    cta: (
      <Button size="medium" fullWidth>
        Select plan
      </Button>
    ),
    price: '€0.99',
    priceDescription: '/month',
    separator: true,
  },
  data: {
    gb: '100 GB',
    pipeline: '1 pipeline',
    domain: true,
    ssl: true,
    fees: true,
  },
}

const planProfessional = {
  value: 'professional',
  title: 'professional',
  sentiment: 'primary' as ComponentProps<typeof Text>['sentiment'],
  header: {
    cta: (
      <Button size="medium" fullWidth disabled tooltip="Already selected">
        Select plan
      </Button>
    ),
    price: '€12.99',
    priceDescription: '/month',
    separator: true,
  },
  data: {
    gb: '1 TB',
    pipeline: '10 pipelines',
    domain: true,
    ssl: true,
    fees: true,
  },
}

const planAdvanced = {
  value: 'advanced',
  title: 'Advanced',
  sentiment: 'primary' as ComponentProps<typeof Text>['sentiment'],
  header: {
    cta: (
      <Button size="medium" fullWidth>
        Select plan
      </Button>
    ),
    price: '€109.99',
    priceDescription: '/month',
    separator: true,
  },
  data: {
    gb: '10 TB',
    pipeline: '100 pipelines',
    domain: true,
    ssl: true,
    fees: false,
  },
}

export const Playground = Template.bind({})

Playground.args = {
  plans: [planStarter, planProfessional, planAdvanced],
  features: [gb, pipeline, domain, ssl, fees],
  value: 'professional',
}
