import type { StoryFn } from '@storybook/react'
import { BookOpenOutlineIcon } from '@ultraviolet/icons'
import {
  AdvancedSettingsProductIcon,
  ConsoleProductIcon,
} from '@ultraviolet/icons/product'
import { Button, Link, Row, Stack } from '@ultraviolet/ui'
import illustration2 from '../assets/illustration2.svg'
import { ContentCard } from '../index'
import { Template } from './Template.stories'

export const Examples: StoryFn<typeof ContentCard> = args => (
  <Stack gap={2}>
    <Row templateColumns="repeat(3, 1fr)" gap={1}>
      <ContentCard
        {...args}
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
      >
        <Button>
          <BookOpenOutlineIcon />
          Function Tutorial
        </Button>
      </ContentCard>
    </Row>
    <Row templateColumns="repeat(3, 1fr)" gap={1}>
      <ContentCard
        {...args}
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
      >
        <Button>
          <BookOpenOutlineIcon />
          Function Tutorial
        </Button>
      </ContentCard>
      <ContentCard
        {...args}
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you. This one is a bit longer than the others."
      >
        <Button>
          <BookOpenOutlineIcon />
          Function Tutorial
        </Button>
      </ContentCard>
      <ContentCard
        {...args}
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
      >
        <Button>
          <BookOpenOutlineIcon />
          Function Tutorial
        </Button>
      </ContentCard>
    </Row>

    <Row templateColumns="repeat(2, 1fr)" gap={1}>
      <ContentCard
        {...args}
        direction="row"
        image={undefined}
        subtitle={undefined}
        title="How cPanel is working?"
        description="Check all our documentation to discover tips"
        href="https://scaleway.com"
      />
    </Row>

    <Row templateColumns="repeat(2, 1fr)" gap={1}>
      <ContentCard
        {...args}
        direction="row"
        image={illustration2}
        subtitle={undefined}
        icon={undefined}
        title="How cPanel is working?"
        description="Check all our documentation to discover tips"
      />
    </Row>

    <Row templateColumns="repeat(2, 1fr)" gap={1}>
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
    </Row>

    <Row templateColumns="repeat(2, 1fr)" gap={1}>
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
    </Row>

    <Row templateColumns="repeat(2, 1fr)" gap={1}>
      <ContentCard
        {...args}
        direction="row"
        subtitle={undefined}
        image={undefined}
        title="Manage Scaleway data"
        description="Grafana users can visualise all their resources logs and metrics in their Grafana dashboards."
        href="https://scaleway.com"
      />
    </Row>

    <Row templateColumns="repeat(2, 1fr)" gap={1}>
      <ContentCard
        {...args}
        direction="row"
        subtitle={undefined}
        image={undefined}
        icon={<AdvancedSettingsProductIcon size="large" />}
        title="Manage Scaleway data"
        description="Grafana users can visualise all their resources logs and metrics in their Grafana dashboards."
        href="https://scaleway.com"
      />
    </Row>

    <Row templateColumns="repeat(2, 1fr)" gap={1}>
      <ContentCard
        {...args}
        description={undefined}
        direction="row"
        subtitle={undefined}
        image={undefined}
        icon={<ConsoleProductIcon size="medium" />}
        title="Get help"
        href="https://scaleway.com"
      />
    </Row>
  </Stack>
)

Examples.args = { ...Template.args }
