import { CheckCircleIcon } from '@ultraviolet/icons'
import { Button, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { Template } from './Template.stories'
import { domain, fees, gb, pipeline, ssl } from './features'

const ContentPlan = ({
  description,
  title,
}: { description?: string; title: string }) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '8px',
      alignItems: 'baseline',
    }}
  >
    <CheckCircleIcon sentiment="success" />
    <div>
      <Text as="p" sentiment="neutral" variant="body">
        {title}
      </Text>
      {description ? (
        <Text as="p" sentiment="neutral" variant="bodySmall" prominence="weak">
          {description}
        </Text>
      ) : null}
    </div>
  </div>
)

const planStarter = {
  value: 'starter',
  title: 'Starter',
  sentiment: 'primary' as ComponentProps<typeof Text>['sentiment'],
  header: {
    selectPlanButton: 'Select Plan',
    price: '€0.99',
    priceDescription: '/month',
    separator: true,
    cta: (
      <Button size="medium" fullWidth>
        Select plan
      </Button>
    ),
  },
  data: {
    gb: <ContentPlan title="100 GB" description="€0.0135 per GB additionnal" />,
    pipeline: (
      <ContentPlan title="1 pipeline" description="€4.00 per additional" />
    ),
    domain: <ContentPlan title="Custom domain" />,
    ssl: <ContentPlan title="SSL Certificate" />,
    fees: <ContentPlan title="Egress fees" />,
  },
}

const planProfessional = {
  value: 'professional',
  title: 'professional',
  sentiment: 'primary' as ComponentProps<typeof Text>['sentiment'],
  header: {
    selectPlanButton: 'Select Plan',
    price: '€12.99',
    priceDescription: '/month',
    separator: true,
    cta: (
      <Button size="medium" fullWidth>
        Select plan
      </Button>
    ),
  },
  data: {
    gb: <ContentPlan title="1 TB" description="€0.0135 per GB additionnal" />,
    pipeline: (
      <ContentPlan title="10 pipelines" description="€4.00 per additional" />
    ),
    domain: <ContentPlan title="Custom domain" />,
    ssl: <ContentPlan title="SSL Certificate" />,
    fees: <ContentPlan title="Egress fees" />,
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
    gb: <ContentPlan title="10 TB" description="€0.0135 per GB additionnal" />,
    pipeline: (
      <ContentPlan title="100 pipelines" description="€4.00 per additional" />
    ),
    domain: <ContentPlan title="Custom domain" />,
    ssl: <ContentPlan title="SSL Certificate" />,
    fees: <ContentPlan title="Egress fees" />,
  },
}

export const HideLabels = Template.bind({})

HideLabels.args = {
  plans: [planStarter, planProfessional, planAdvanced],
  features: [gb, pipeline, domain, ssl, fees],
  hideLabels: true,
  value: 'professional',
}
