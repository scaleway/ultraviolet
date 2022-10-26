import { Story } from '@storybook/react'
import { ComponentProps } from 'react'
import DateInput from '..'

export const Uncontrolled: Story<ComponentProps<typeof DateInput>> = props => (
  <DateInput {...props} onChange={() => {}} label="Date" />
)

Uncontrolled.parameters = {
  docs: {
    storyDescription:
      'DateInput can be used as an [uncontrolled component](https://reactjs.org/docs/uncontrolled-components.html).',
  },
}
