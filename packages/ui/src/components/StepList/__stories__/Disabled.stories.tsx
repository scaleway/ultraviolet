import { StepList } from '..'
import { Template } from './Template.stories'

export const Disabled = Template.bind({})

Disabled.parameters = {
  docs: {
    story: {
      description: 'Set a disable state using `disabled` property.',
    },
  },
}

Disabled.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletContent="A" disabled>
        disabled
      </StepList.Item>
      <StepList.Item bulletContent="A">active</StepList.Item>
    </StepList>
  ),
]
