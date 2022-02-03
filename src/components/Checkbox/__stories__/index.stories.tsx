import { Meta, Story } from '@storybook/react'
import React, {
  ChangeEvent,
  ComponentProps,
  useCallback,
  useState,
} from 'react'
import Checkbox from '..'
import ErrorTransition from '../../../__stories__/components/ErrorTransition'

export default {
  component: Checkbox,
  title: 'Components/Data Entry/Checkbox',
} as Meta

const Template: Story<ComponentProps<typeof Checkbox>> = ({
  onChange = console.log,
  ...props
}) => (
  <Checkbox onChange={onChange} {...props}>
    Basic unchecked checkbox
  </Checkbox>
)

export const Default = Template.bind({})

export const Checked = Template.bind({})
Checked.parameters = {
  docs: {
    storyDescription: 'You can specify `checked` prop to tick the checkbox.',
  },
}
Checked.decorators = [
  () => (
    <Checkbox checked onChange={() => {}}>
      Basic checked checkbox
    </Checkbox>
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
    <>
      {[10, 20, 30].map(size => (
        <Checkbox size={size} onChange={() => {}}>
          Checkbox size {size}
        </Checkbox>
      ))}
    </>
  ),
]

export const Validation = Template.bind({})
Validation.parameters = {
  docs: {
    storyDescription: 'Set validation using `valid` boolean property.',
  },
}
Validation.decorators = [
  () => (
    <>
      {[true, false].map(valid => (
        <Checkbox valid={valid} onChange={() => {}}>
          Checkbox valid {valid}
        </Checkbox>
      ))}
    </>
  ),
]

export const Errors = Template.bind({})
Errors.parameters = {
  docs: {
    storyDescription:
      'Set validation with error message using `error` property.',
  },
}
Errors.decorators = [
  () => (
    <div>
      <ErrorTransition error="An Error occurred, your checkbox is invalid">
        {error => <Checkbox error={error} onChange={() => {}} />}
      </ErrorTransition>
      <Checkbox
        error="An Error occurred, your checkbox is invalid"
        onChange={() => {}}
      >
        Checkbox on Error
      </Checkbox>
    </div>
  ),
]

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

export const Typography = Template.bind({})
Typography.parameters = {
  docs: {
    storyDescription: 'Set value using `typographyVariant` property.',
  },
}
Typography.decorators = [
  () => (
    <>
      {['tiny', 'description', 'title'].map(typography => (
        <Checkbox typographyVariant={typography} onChange={() => {}}>
          Checkbox typo {typography}
        </Checkbox>
      ))}
    </>
  ),
]

export const Value = Template.bind({})
Value.parameters = {
  docs: {
    storyDescription: 'Set value using `value` property.',
  },
}
Value.decorators = [
  () => (
    <>
      {['false', 'true', 1234].map(value => (
        <Checkbox value={value} onChange={() => {}}>
          Checkbox value {value}
        </Checkbox>
      ))}
    </>
  ),
]
