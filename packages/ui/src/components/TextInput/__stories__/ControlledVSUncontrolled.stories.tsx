import type { StoryFn } from '@storybook/react-vite'
import { useState } from 'react'
import { Stack } from '../../Stack'
import { Text } from '../../Text'
import { TextInput } from '..'

export const ControlledVSUncontrolled: StoryFn<typeof TextInput> = props => {
  const [value, setValue] = useState('content')

  return (
    <Stack direction="column" gap={2}>
      <TextInput label="Uncontrolled" defaultValue="content" {...props} />
      <Stack gap={1}>
        <TextInput
          label="Controlled"
          value={value}
          onChange={event => setValue(event.target.value)}
          {...props}
        />
        <Text as="p" variant="body" sentiment="neutral">
          We can get the value from the input, which is:{' '}
          <Text as="span" variant="body" sentiment="neutral" italic>
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
