import {
  AdvancedSupportProductIcon,
  BasicSupportProductIcon,
  EntrepriseSupportProductIcon,
} from '@ultraviolet/icons/product'
import { Button, Separator } from '@ultraviolet/ui'
import type { ReactNode } from 'react'
import { domain, fees, gb, pipeline, ssl } from './features'
import { Template } from './Template.stories'

const StyledDiv = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '82px',
      justifyContent: 'space-between',
    }}
  >
    {children}
  </div>
)
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
    description: (
      <StyledDiv>
        <Separator />

        <p style={{ paddingInline: '16px' }}>
          For developers & non mission-critical projects
        </p>
        <Separator />
      </StyledDiv>
    ),
    price: '€0.99',
    priceDescription: '/month',
  },
  sentiment: 'primary' as const,
  title: 'Starter',
  titleHeader: <BasicSupportProductIcon size="xlarge" />,
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
    description: (
      <StyledDiv>
        <Separator />
        <p style={{ paddingInline: '16px' }}>For small businesses & startups</p>

        <Separator />
      </StyledDiv>
    ),
    price: '€12.99',
    priceDescription: '/month',
  },
  sentiment: 'primary' as const,
  title: 'professional',
  titleHeader: <AdvancedSupportProductIcon size="xlarge" />,
  value: 'professional',
}

const planAdvanced = {
  data: {
    domain: true,
    fees: true,
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
    description: (
      <StyledDiv>
        <Separator />

        <p style={{ paddingInline: '16px' }}>
          For fast-growing starups & mission-critical infrastructure
        </p>
        <Separator />
      </StyledDiv>
    ),
    price: '€109.99',
    priceDescription: '/month',
  },
  sentiment: 'primary' as const,
  title: 'Advanced',
  titleHeader: <EntrepriseSupportProductIcon size="xlarge" />,
  value: 'advanced',
}

export const WithIcon = Template.bind({})

WithIcon.args = {
  features: [gb, pipeline, domain, ssl, fees],
  plans: [planStarter, planProfessional, planAdvanced],
  value: 'professional',
}
