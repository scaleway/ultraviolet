import { Story } from '@storybook/react'
import { ComponentProps, useState } from 'react'
import DateInput from '..'

export const Controlled: Story<ComponentProps<typeof DateInput>> = () => {
  const [value, setValue] = useState(new Date('December 17, 1995 03:24:00'))

  return <DateInput label="Date" value={value} onChange={setValue} />
}

Controlled.parameters = {
  docs: {
    storyDescription:
      'Most of the time, you need a [controlled component](https://reactjs.org/docs/forms.html#controlled-components). By passing `value` and `onChange` prop you can control it.',
  },
}
