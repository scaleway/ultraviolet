import {
  AdvancedSupportProductIcon,
  BasicSupportProductIcon,
  EntrepriseSupportProductIcon,
} from '@ultraviolet/icons/product'
import type { Text } from '@ultraviolet/ui'
import { Button, Separator } from '@ultraviolet/ui'
import type { ComponentProps, ReactNode } from 'react'
import { domain, fees, gb, pipeline, ssl } from './features'
import { Template } from './Template.stories'

const StyledDiv = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      gap: '16px',
      display: 'flex',
      flexDirection: 'column',
      height: '82px',
      justifyContent: 'space-between',
    }}
  >
    {children}
  </div>
)
const planStarter = {
  value: 'starter',
  title: 'Starter',
  sentiment: 'primary' as ComponentProps<typeof Text>['sentiment'],
  titleHeader: <BasicSupportProductIcon size="xlarge" />,

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
  titleHeader: <AdvancedSupportProductIcon size="xlarge" />,
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
  titleHeader: <EntrepriseSupportProductIcon size="xlarge" />,

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
  data: {
    gb: '10 TB',
    pipeline: '100 pipelines',
    domain: true,
    ssl: true,
    fees: true,
  },
}

export const WithIcon = Template.bind({})

WithIcon.args = {
  plans: [planStarter, planProfessional, planAdvanced],
  features: [gb, pipeline, domain, ssl, fees],
  value: 'professional',
}
