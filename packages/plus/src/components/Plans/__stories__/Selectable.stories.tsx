import type { StoryFn } from '@storybook/react'
import { Button } from '@ultraviolet/ui'
import type { Text } from '@ultraviolet/ui'
import { useState } from 'react'
import type { ComponentProps } from 'react'
import { Plans } from '..'
import { domain, fees, gb, pipeline, ssl } from './features'

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
      <Button size="medium" fullWidth>
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

export const Selectable: StoryFn<ComponentProps<typeof Plans>> = ({
  ...props
}) => {
  const [value, setValue] = useState('advanced')
  const onChange = (newValue?: string) => setValue(newValue ?? 'advanced')

  return (
    <Plans {...props} fieldName="plans" value={value} onChange={onChange} />
  )
}

Selectable.args = {
  plans: [planStarter, planProfessional, planAdvanced],
  features: [gb, pipeline, domain, ssl, fees],
}
