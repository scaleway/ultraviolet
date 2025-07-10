import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SteppedListCard } from '../SteppedListCard'

export const WithoutToggleButton: StoryFn<
  ComponentProps<typeof SteppedListCard>
> = props => (
  <SteppedListCard {...props}>
    <SteppedListCard.Step
      stepNumber={1}
      subHeader={
        <Text as="h3" variant="headingSmallStrong" sentiment="primary">
          First step
        </Text>
      }
    >
      <Stack gap={2} direction="column">
        <Text as="div" variant="body">
          First step description
        </Text>
      </Stack>
    </SteppedListCard.Step>
    <SteppedListCard.Step
      stepNumber={2}
      subHeader={
        <Text as="h3" variant="headingSmallStrong" sentiment="primary">
          Second step
        </Text>
      }
    >
      <Stack gap={2} direction="column">
        <Text as="div" variant="body">
          Second step description
        </Text>
      </Stack>
    </SteppedListCard.Step>
  </SteppedListCard>
)

WithoutToggleButton.args = {
  header: 'Header',
  showToggleOption: false,
  steps: ['Start', 'First step'],
}

WithoutToggleButton.parameters = {
  docs: {
    description: {
      story:
        'It is possible to hide the toggle button using `showToggleOption={false}`. The default behavior is being visible.',
    },
  },
}
