import type { StoryFn } from '@storybook/react-vite'
import { Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SteppedListCard } from '..'

export const WithoutToggleButton: StoryFn<
  ComponentProps<typeof SteppedListCard>
> = props => (
  <SteppedListCard {...props}>
    <SteppedListCard.Step
      stepNumber={1}
      subHeader={
        <Text as="h3" sentiment="primary" variant="headingSmallStrong">
          First step
        </Text>
      }
    >
      <Stack direction="column" gap={2}>
        <Text as="div" variant="body">
          First step description
        </Text>
      </Stack>
    </SteppedListCard.Step>
    <SteppedListCard.Step
      stepNumber={2}
      subHeader={
        <Text as="h3" sentiment="primary" variant="headingSmallStrong">
          Second step
        </Text>
      }
    >
      <Stack direction="column" gap={2}>
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
