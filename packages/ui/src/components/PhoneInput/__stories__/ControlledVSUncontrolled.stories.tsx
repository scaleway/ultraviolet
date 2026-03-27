import { useState } from 'react'

import { PhoneInput } from '..'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

import type { StoryFn } from '@storybook/react-vite'

export const ControlledVSUncontrolled: StoryFn<typeof PhoneInput> = props => {
  const [value, setValue] = useState('+33612345678')

  return (
    <Stack direction="column" gap={2}>
      <PhoneInput defaultCountry="FR" label="Uncontrolled" {...props} />
      <Stack gap={1}>
        <PhoneInput
          defaultCountry="FR"
          label="Controlled"
          onChange={event => setValue(event.target.value)}
          value={value}
          {...props}
        />
        <Text as="p" sentiment="neutral" variant="body">
          Current value:{' '}
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
