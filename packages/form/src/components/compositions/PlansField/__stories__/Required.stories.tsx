import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Submit } from '../../../Submit'
import { PlansField } from '..'
import { Button, Stack } from '@ultraviolet/ui'
import {
  domain,
  fees,
  pipeline,
  gb,
  ssl,
} from '../../PlansField/__tests__/features'

const planStarter = {
  data: {
    domain: true,
    fees: true,
    gb: '100 GB',
    pipeline: '1 pipeline',
    ssl: true,
  },
  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    price: '€0.99',
    priceDescription: '/month',
    separator: true,
  },
  sentiment: 'primary' as const,
  title: 'Starter',
  value: 'starter',
}

const planProfessional = {
  data: {
    domain: true,
    fees: true,
    gb: '1 TB',
    pipeline: '10 pipelines',
    ssl: true,
  },
  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    price: '€12.99',
    priceDescription: '/month',
    separator: true,
  },
  sentiment: 'primary' as const,
  title: 'professional',
  value: 'professional',
}

const planAdvanced = {
  data: {
    domain: true,
    fees: false,
    gb: '10 TB',
    pipeline: '100 pipelines',
    ssl: true,
  },
  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    price: '€109.99',
    priceDescription: '/month',
    separator: true,
  },
  sentiment: 'primary' as const,
  title: 'Advanced',
  value: 'advanced',
}

export const Required: StoryFn<ComponentProps<typeof PlansField>> = args => (
  <Stack gap={1}>
    <PlansField {...args} />
    <Submit>Submit</Submit>
  </Stack>
)
Required.args = {
  name: 'required-plans',
  required: true,
  plans: [planAdvanced, planProfessional, planStarter],
  features: [gb, pipeline, domain, ssl, fees],
}
