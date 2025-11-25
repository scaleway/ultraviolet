import type { StoryFn } from '@storybook/react-vite'
import { CheckIcon } from '@ultraviolet/icons'
import { WireIllustration } from '@ultraviolet/illustrations'
import { Button, Snippet, Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SteppedListCard } from '../SteppedListCard'

export const Template: StoryFn<
  ComponentProps<typeof SteppedListCard>
> = props => (
  <SteppedListCard {...props}>
    <SteppedListCard.Step
      image={<WireIllustration height={200} name="blockStorage" width={200} />}
      stepNumber={1}
      subHeader={
        <Text as="h3" sentiment="primary" variant="headingSmallStrong">
          Welcome aboard!
        </Text>
      }
    >
      {nextStep => (
        <Stack direction="column" gap={2}>
          <Snippet {...props}>
            pnpm add @ultraviolet/ui; pnpm install; pnpm start; pnpm build; pnpm
            test:unit; pnpm test:visual; pnpm build:storybook;
          </Snippet>
          <Text as="div" variant="body">
            We are thrilled to count you as a Scaleway user! We are looking
            forward to providing you with the very best experience. To order
            resources to get started with your project, we need you to complete
            a few more steps.
          </Text>
          <Stack direction="row" gap={2}>
            <Button sentiment="primary">Action 1</Button>
            <Button
              onClick={() => {
                nextStep(true)
              }}
              sentiment="primary"
              variant="outlined"
            >
              <CheckIcon /> Mark as done
            </Button>
            <Button
              onClick={() => {
                nextStep(false)
              }}
              sentiment="neutral"
              variant="ghost"
            >
              Skip
            </Button>
          </Stack>
        </Stack>
      )}
    </SteppedListCard.Step>
    <SteppedListCard.Step
      image={<WireIllustration height={200} name="blockStorage" width={200} />}
      stepNumber={2}
      subHeader="Second step"
    >
      {nextStep => (
        <Stack direction="column" gap={2}>
          Second step description
          <Stack direction="row" gap={2}>
            <Button onClick={() => nextStep()} variant="outlined">
              Next step
            </Button>
            <Button onClick={() => nextStep(true)}>
              Next step and validate
            </Button>
          </Stack>
        </Stack>
      )}
    </SteppedListCard.Step>
    <SteppedListCard.Step
      image={<WireIllustration height={200} name="blockStorage" width={200} />}
      stepNumber={3}
      subHeader="Last step"
    >
      {nextStep => (
        <Stack gap={2}>
          Second step description
          <Stack direction="row" gap={2}>
            <Button onClick={() => nextStep(true)}>Validate and close</Button>
          </Stack>
        </Stack>
      )}
    </SteppedListCard.Step>
  </SteppedListCard>
)

Template.args = {
  header: 'Header',
  hideText: 'Hide',
  hideTooltipText: 'To hide the content, click on the "hide" button',
  showText: 'Show',
  showTooltipText: 'To show, click on this button',
  steps: ['Start', 'First step', 'Second step'],
}
