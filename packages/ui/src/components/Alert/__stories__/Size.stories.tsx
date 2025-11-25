import type { Decorator } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Stack } from '../../Stack'
import { Alert } from '..'

export const Size = (props: ComponentProps<typeof Alert>) => (
  <>
    <Alert
      {...props}
      onClickButton={() => alert('Button clicked')}
      title="title"
    >
      This is an Alert.
    </Alert>

    <Alert
      {...props}
      onClickButton={() => alert('Button clicked')}
      size="small"
      title="title"
    >
      This is a small alert
    </Alert>
    <Alert
      {...props}
      buttonText="More info"
      onClickButton={() => alert('Button clicked')}
      size="small"
      title="title"
    >
      Small alert with long children. Lorem ipsum dolor sit amet, consectetur
      adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
      laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
      reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa
      qui officia deserunt mollit anim id est laborum.,
    </Alert>
  </>
)

Size.decorators = [
  StoryComponent => (
    <Stack gap={2}>
      <StoryComponent />
    </Stack>
  ),
] as Decorator[]

Size.parameters = {
  docs: {
    description: {
      story:
        'Using `sentiment` prop you can change the sentiment of the component. Each sentiment has a default icon set.',
    },
  },
}
