import type { StoryFn } from '@storybook/react-vite'
import { Stack } from '../../Stack'
import { CheckboxGroup } from '../index'

export const Required: StoryFn<typeof CheckboxGroup> = props => (
  <Stack gap={3}>
    <CheckboxGroup {...props} required>
      <CheckboxGroup.Checkbox
        name="termsAndConditions"
        value="termsAndConditions"
      >
        Accept terms and conditions (required)
      </CheckboxGroup.Checkbox>
      <CheckboxGroup.Checkbox name="newsletter" value="newsletter">
        Accept to receive newsletter (required)
      </CheckboxGroup.Checkbox>
    </CheckboxGroup>

    <CheckboxGroup {...props}>
      <CheckboxGroup.Checkbox
        name="termsAndConditions"
        value="termsAndConditions"
        required
      >
        Accept terms and conditions (required)
      </CheckboxGroup.Checkbox>
      <CheckboxGroup.Checkbox name="newsletter" value="newsletter">
        Accept to receive newsletter (optional)
      </CheckboxGroup.Checkbox>
    </CheckboxGroup>
  </Stack>
)

Required.parameters = {
  docs: {
    description: {
      story:
        'You can set `required` on the whole group of checkbox or on individual checkboxes. If set of the group all checkbox are required to be checked.',
    },
  },
}
