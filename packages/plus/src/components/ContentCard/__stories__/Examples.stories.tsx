import type { StoryFn } from '@storybook/react'
import { AdvancedSettings } from '@ultraviolet/icons/product'
import { Button, Link, Stack } from '@ultraviolet/ui'
import illustration2 from '../assets/illustration2.svg'
import { ContentCard } from '../index'
import { Template } from './Template.stories'

export const Examples: StoryFn<typeof ContentCard> = args => (
  <Stack gap={2}>
    <div style={{ width: '315px' }}>
      <ContentCard
        {...args}
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
      >
        <Button icon="book-open-outline">Function Tutorial</Button>
      </ContentCard>
    </div>

    <div style={{ width: '500px' }}>
      <ContentCard
        {...args}
        direction="row"
        image={undefined}
        subtitle={undefined}
        title="How cPanel is working?"
        description="Check all our documentation to discover tips"
        href="https://scaleway.com"
      />
    </div>

    <div style={{ width: '500px' }}>
      <ContentCard
        {...args}
        direction="row"
        image={illustration2}
        subtitle={undefined}
        icon={undefined}
        title="How cPanel is working?"
        description="Check all our documentation to discover tips"
      />
    </div>

    <div style={{ width: '500px' }}>
      <ContentCard
        {...args}
        direction="row"
        subtitle={undefined}
        image={undefined}
        title="How cPanel is working?"
        description="Check all our documentation to discover tips"
      >
        <Stack gap={1}>
          <Link href="https://scaleway.com" size="small" iconPosition="right">
            What is cPanel
          </Link>
          <Link href="https://scaleway.com" size="small" iconPosition="right">
            cPanel Quickstart
          </Link>
        </Stack>
      </ContentCard>
    </div>

    <div style={{ width: '500px' }}>
      <ContentCard
        {...args}
        direction="row"
        subtitle={undefined}
        icon={undefined}
        image={undefined}
        title="How cPanel is working?"
        description="Check all our documentation to discover tips"
      >
        <Stack gap={1}>
          <Link href="https://scaleway.com" size="small" iconPosition="right">
            What is cPanel
          </Link>
          <Link href="https://scaleway.com" size="small" iconPosition="right">
            cPanel Quickstart
          </Link>
        </Stack>
      </ContentCard>
    </div>

    <div style={{ width: '500px' }}>
      <ContentCard
        {...args}
        direction="row"
        subtitle={undefined}
        image={undefined}
        title="Manage Scaleway data"
        description="Grafana users can visualise all their resources logs and metrics in their Grafana dashboards."
        href="https://scaleway.com"
      />
    </div>

    <div style={{ width: '500px' }}>
      <ContentCard
        {...args}
        direction="row"
        subtitle={undefined}
        image={undefined}
        icon={<AdvancedSettings size="large" />}
        title="Manage Scaleway data"
        description="Grafana users can visualise all their resources logs and metrics in their Grafana dashboards."
        href="https://scaleway.com"
      />
    </div>
  </Stack>
)

Examples.args = { ...Template.args }
