import { Meta, Story } from '@storybook/react'
import { ComponentProps } from 'react'
import Range from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

export default {
  component: Range,
  decorators: [
    Children => (
      <div style={{ marginTop: 24 }}>
        <Children />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        component:
          'A range bar. Range only work as [controlled component](https://reactjs.org/docs/forms.html).',
      },
    },
  },
  title: 'Components/Data Entry/Range',
} as Meta

const Template: Story<ComponentProps<typeof Range>> = args => (
  <Range {...args} />
)

export const Default = Template.bind({})

export const SingleValue = Template.bind({})
SingleValue.decorators = [
  () => (
    <ControlValue value={[3]}>
      {({ value, onChange }) => (
        <Range value={value} min={0} max={10} onChange={onChange} />
      )}
    </ControlValue>
  ),
]

export const TwoValues = Template.bind({})
TwoValues.parameters = {
  docs: {
    storyDescription: 'For now, Range component will work with max two values.',
  },
}
TwoValues.decorators = [
  () => (
    <ControlValue value={[3, 8]}>
      {({ value, onChange }) => (
        <Range value={value} min={0} max={15} onChange={onChange} />
      )}
    </ControlValue>
  ),
]
