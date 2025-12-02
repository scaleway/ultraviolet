import { CheckCircleIcon } from '@ultraviolet/icons'
import { Button, Text } from '@ultraviolet/ui'
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
      alignItems: iconAlign === 'center' ? 'center' : 'baseline',
      display: 'grid',
      gap: '8px',
      gridTemplateColumns: 'auto 1fr',
    }}
  >
    <CheckCircleIcon sentiment="success" />
    <div>
      <Text as="p" sentiment="neutral" variant="body">
        {title}
      </Text>
      {description ? (
        <Text as="p" prominence="weak" sentiment="neutral" variant="bodySmall">
          {description}
        </Text>
      ) : null}
    </div>
  </div>
)

const planStarter = {
  data: {
    domain: <ContentPlan title="Custom domain" />,
    fees: <ContentPlan title="Egress fees" />,
    gb: <ContentPlan description="€0.0135 per GB additionnal" title="100 GB" />,
    pipeline: (
      <ContentPlan description="€4.00 per additional" title="1 pipeline" />
    ),
    ssl: <ContentPlan title="SSL Certificate" />,
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
    domain: <ContentPlan title="Custom domain" />,
    fees: <ContentPlan title="Egress fees" />,
    gb: <ContentPlan description="€0.0135 per GB additionnal" title="1 TB" />,
    pipeline: (
      <ContentPlan description="€4.00 per additional" title="10 pipelines" />
    ),
    ssl: <ContentPlan title="SSL Certificate" />,
  },
  header: {
    cta: (
      <Button fullWidth size="medium">
        Select plan
      </Button>
    ),
    price: '€12.99',
    priceDescription: '/month',
    selectPlanButton: 'Select Plan',
    separator: true,
  },
  sentiment: 'primary' as const,
  title: 'professional',
  value: 'professional',
}

const planAdvanced = {
  data: {
    domain: <ContentPlan iconAlign="center" title="Custom domain" />,
    fees: <ContentPlan iconAlign="center" title="Egress fees" />,
    gb: (
      <ContentPlan
        description="Here the icon is centered"
        iconAlign="center"
        title="10 TB"
      />
    ),
    pipeline: (
      <ContentPlan
        description="€4.00 per additional"
        iconAlign="center"
        title="100 pipelines"
      />
    ),
    ssl: <ContentPlan iconAlign="center" title="SSL Certificate" />,
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

export const HideLabels = Template.bind({})

HideLabels.args = {
  features: [gb, pipeline, domain, ssl, fees],
  hideLabels: true,
  plans: [planStarter, planProfessional, planAdvanced],
  value: 'professional',
}
