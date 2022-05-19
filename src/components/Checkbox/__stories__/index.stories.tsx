import { Meta, Story } from '@storybook/react'
import { ChangeEvent, ComponentProps, useCallback, useState } from 'react'
import Checkbox from '..'

export default {
  component: Checkbox,
  title: 'Components/Data Entry/Checkbox',
} as Meta

const Template: Story<ComponentProps<typeof Checkbox>> = ({
  onChange = console.log,
  ...props
}) => (
  <Checkbox onChange={onChange} {...props}>
    Beautiful checkbox
  </Checkbox>
)

export const Default = Template.bind({})

export const Checked = Template.bind({})
Checked.parameters = {
  docs: {
    storyDescription:
      'Checkbox can have two state `checked` or `indeterminate` defined by prop `checked`.',
  },
}
Checked.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Checkbox checked onChange={() => {}}>
        Checked checkbox
      </Checkbox>
      <Checkbox checked="indeterminate" onChange={() => {}}>
        Indeterminate checkbox
      </Checkbox>
    </div>
  ),
]

export const Sizes = Template.bind({})
Sizes.parameters = {
  docs: {
    storyDescription: 'Set size using `size` property.',
  },
}
Sizes.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {[10, 20, 30].map(size => (
        <Checkbox size={size} onChange={() => {}}>
          Checkbox size {size}
        </Checkbox>
      ))}
    </div>
  ),
]

export const Disabled = Template.bind({})
Disabled.args = {
  disabled: true,
}

export const Errors = Template.bind({})
Errors.parameters = {
  docs: {
    storyDescription:
      'Set validation with error message using `error` property.',
  },
}
Errors.args = {
  error: 'An error message',
}

export const Progress = Template.bind({})
Progress.parameters = {
  docs: {
    storyDescription: 'Set progress using `progress` property.',
  },
}
Progress.decorators = [
  () => {
    const [checked, setChecked] = useState(false)
    const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
      setChecked(event.target.checked)
      setTimeout(() => {
        setChecked(false)
      }, 2000)
    }, [])

    return (
      <Checkbox progress={checked} checked={checked} onChange={handleChange}>
        Check me
      </Checkbox>
    )
  },
]

export const Value = Template.bind({})
Value.parameters = {
  docs: {
    storyDescription: 'Set value using `value` property.',
  },
}
Value.decorators = [
  () => (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {['false', 'true', 1234].map(value => (
        <Checkbox value={value} onChange={() => {}}>
          Checkbox value {value}
        </Checkbox>
      ))}
    </div>
  ),
]
