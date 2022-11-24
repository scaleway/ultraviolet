import { Story } from '@storybook/react'
import { ComponentProps, useState } from 'react'
import Tabs from '..'

export const Template: Story<Omit<ComponentProps<typeof Tabs>, 'onChange'>> = ({
  selected,
  ...args
}) => {
  const [change, onChange] = useState(selected)
  const onChangeHandler = (e?: string | number) => onChange(e)

  return <Tabs selected={change} onChange={onChangeHandler} {...args} />
}
