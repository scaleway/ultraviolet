import type { StoryFn } from '@storybook/react-vite'
import { BookOpenOutlineIcon } from '@ultraviolet/icons/BookOpenOutlineIcon'
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
    <Row gap={1} templateColumns="repeat(3, 1fr)">
      <ContentCard
        {...args}
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
      >
        <Button>
          <BookOpenOutlineIcon />
          Function Tutorial
        </Button>
      </ContentCard>
    </Row>
    <Row gap={1} templateColumns="repeat(3, 1fr)">
      <ContentCard
        {...args}
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
      >
        <Button>
          <BookOpenOutlineIcon />
          Function Tutorial
        </Button>
      </ContentCard>
      <ContentCard
        {...args}
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you. This one is a bit longer than the others."
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
      >
        <Button>
          <BookOpenOutlineIcon />
          Function Tutorial
        </Button>
      </ContentCard>
      <ContentCard
        {...args}
        description="The Scaleway Serverless Functions platform makes your functions available, executes them on demand and manages resource allocation for you."
        direction="column"
        image={undefined}
        subtitle="Tutorial"
        title="Create your first function"
      >
        <Button>
          <BookOpenOutlineIcon />
          Function Tutorial
        </Button>
      </ContentCard>
    </Row>

    <Row gap={1} templateColumns="repeat(2, 1fr)">
      <ContentCard
        {...args}
        description="Check all our documentation to discover tips"
        direction="row"
        href="https://scaleway.com"
        image={undefined}
        subtitle={undefined}
        title="How cPanel is working?"
      />
    </Row>

    <Row gap={1} templateColumns="repeat(2, 1fr)">
      <ContentCard
        {...args}
        description="Check all our documentation to discover tips"
        direction="row"
        icon={undefined}
        image={illustration2}
        subtitle={undefined}
        title="How cPanel is working?"
      />
    </Row>

    <Row gap={1} templateColumns="repeat(2, 1fr)">
      <ContentCard
        {...args}
        description="Check all our documentation to discover tips"
        direction="row"
        image={undefined}
        subtitle={undefined}
        title="How cPanel is working?"
      >
        <Stack gap={1}>
          <Link href="https://scaleway.com" iconPosition="right" size="small">
            What is cPanel
          </Link>
          <Link href="https://scaleway.com" iconPosition="right" size="small">
            cPanel Quickstart
          </Link>
        </Stack>
      </ContentCard>
    </Row>

    <Row gap={1} templateColumns="repeat(2, 1fr)">
      <ContentCard
        {...args}
        description="Check all our documentation to discover tips"
        direction="row"
        icon={undefined}
        image={undefined}
        subtitle={undefined}
        title="How cPanel is working?"
      >
        <Stack gap={1}>
          <Link href="https://scaleway.com" iconPosition="right" size="small">
            What is cPanel
          </Link>
          <Link href="https://scaleway.com" iconPosition="right" size="small">
            cPanel Quickstart
          </Link>
        </Stack>
      </ContentCard>
    </Row>

    <Row gap={1} templateColumns="repeat(2, 1fr)">
      <ContentCard
        {...args}
        description="Grafana users can visualise all their resources logs and metrics in their Grafana dashboards."
        direction="row"
        href="https://scaleway.com"
        image={undefined}
        subtitle={undefined}
        title="Manage Scaleway data"
      />
    </Row>

    <Row gap={1} templateColumns="repeat(2, 1fr)">
      <ContentCard
        {...args}
        description="Grafana users can visualise all their resources logs and metrics in their Grafana dashboards."
        direction="row"
        href="https://scaleway.com"
        icon={<AdvancedSettingsProductIcon size="large" />}
        image={undefined}
        subtitle={undefined}
        title="Manage Scaleway data"
      />
    </Row>

    <Row gap={1} templateColumns="repeat(2, 1fr)">
      <ContentCard
        {...args}
        description={undefined}
        direction="row"
        href="https://scaleway.com"
        icon={<ConsoleProductIcon size="medium" />}
        image={undefined}
        subtitle={undefined}
        title="Get help"
      />
    </Row>
  </Stack>
)

Examples.args = { ...Template.args }
