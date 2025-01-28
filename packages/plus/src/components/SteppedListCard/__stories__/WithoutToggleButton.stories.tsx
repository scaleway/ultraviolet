import type { StoryFn } from '@storybook/react'
import { Stack, Text } from '@ultraviolet/ui'
import type { ComponentProps } from 'react'
import { SteppedListContainer } from '../SteppedListContainer'

export const WithoutToggleButton: StoryFn<
  ComponentProps<typeof SteppedListContainer>
> = props => (
  <SteppedListContainer {...props}>
    <SteppedListContainer.Step
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
    </SteppedListContainer.Step>
    <SteppedListContainer.Step
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
    </SteppedListContainer.Step>
  </SteppedListContainer>
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
