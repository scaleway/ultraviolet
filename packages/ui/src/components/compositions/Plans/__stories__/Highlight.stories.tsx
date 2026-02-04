import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Plans } from '..'
import { domain, fees, gb, pipeline, ssl } from './features'
import { Button } from '../../../Button'

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
      <Button fullWidth size="medium" variant="outlined">
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
      <Button fullWidth size="medium" variant="outlined">
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

export const Highlight: StoryFn<ComponentProps<typeof Plans>> = ({
  ...props
}) => <Plans {...props} fieldName="plans" />

Highlight.args = {
  features: [gb, pipeline, domain, ssl, fees],
  highlight: { content: 'Most popular', plan: 'professional' },
  plans: [planStarter, planProfessional, planAdvanced],
}

Highlight.parameters = {
  docs: {
    description: {
      story:
        'Highligh a plan using prop `highlight` where `highlight.plan` is the `value` of the highlighted plan and `highlight.content` is the text to display in the badge.',
    },
  },
}
