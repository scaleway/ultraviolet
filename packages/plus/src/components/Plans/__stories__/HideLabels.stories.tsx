import { CheckCircleIcon } from '@ultraviolet/icons'
import { Button, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { domain, fees, gb, pipeline, ssl } from './features'
import { Template } from './Template.stories'

const ContentPlan = ({
  description,
  title,
  iconAlign,
}: {
  description?: string
  title: string
  iconAlign?: 'center' | 'top'
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gap: '8px',
      alignItems: iconAlign === 'center' ? 'center' : 'baseline',
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
    gb: (
      <ContentPlan
        title="10 TB"
        description="Here the icon is centered"
        iconAlign="center"
      />
    ),
    pipeline: (
      <ContentPlan
        title="100 pipelines"
        description="€4.00 per additional"
        iconAlign="center"
      />
    ),
    domain: <ContentPlan title="Custom domain" iconAlign="center" />,
    ssl: <ContentPlan title="SSL Certificate" iconAlign="center" />,
    fees: <ContentPlan title="Egress fees" iconAlign="center" />,
  },
}

export const HideLabels = Template.bind({})

HideLabels.args = {
  plans: [planStarter, planProfessional, planAdvanced],
  features: [gb, pipeline, domain, ssl, fees],
  hideLabels: true,
  value: 'professional',
}
