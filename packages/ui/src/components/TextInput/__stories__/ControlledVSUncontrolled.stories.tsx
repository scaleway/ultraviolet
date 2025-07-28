import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { TextInput } from '..'

export const ControlledVSUncontrolled: StoryFn<typeof TextInput> = props => {
  const [value, setValue] = useState('content')

  return (
    <Stack direction="column" gap={2}>
      <TextInput defaultValue="content" label="Uncontrolled" {...props} />
      <Stack gap={1}>
        <TextInput
          label="Controlled"
          onChange={event => setValue(event.target.value)}
          value={value}
          {...props}
        />
        <Text as="p" sentiment="neutral" variant="body">
          We can get the value from the input, which is:{' '}
          <Text as="span" italic sentiment="neutral" variant="body">
            {value}
          </Text>
        </Text>
      </Stack>
    </Stack>
  )
}

ControlledVSUncontrolled.parameters = {
  docs: {
    description: {
      story:
        'The component can be controlled or uncontrolled.\n\n The difference is that in the controlled version, the `value` and `onChange` is passed as a prop and the component does not manage its own state.\n\n In the uncontrolled version, the component manages its own state. For more information check [React documentation](https://react.dev/learn/sharing-state-between-components#controlled-and-uncontrolled-components).',
    },
  },
}
