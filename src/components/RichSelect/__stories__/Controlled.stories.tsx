import { ComponentStory } from '@storybook/react'
import RichSelect, { SelectOption } from '..'
import ControlValue from '../../../__stories__/components/ControlValue'

// @fixme this appear like 💩in the code snippet
export const Controlled: ComponentStory<typeof RichSelect> = ({ ...props }) => (
  <ControlValue<SelectOption> value={{ label: '', value: '' }} {...props}>
    {({ value, onChange }) => (
      <RichSelect name="controlled" value={value} onChange={onChange}>
        <RichSelect.Option value="a">Option A</RichSelect.Option>
        <RichSelect.Option value="b">Option B</RichSelect.Option>
      </RichSelect>
    )}
  </ControlValue>
)
Controlled.parameters = {
  docs: {
    storyDescription: 'This shows how to use Controlled RichSelect.',
  },
}
