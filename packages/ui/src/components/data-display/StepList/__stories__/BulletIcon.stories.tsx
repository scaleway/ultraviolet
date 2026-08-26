import { CheckIcon } from '@ultraviolet/icons/CheckIcon'
import { StepList } from '..'
import { Template } from './Template.stories'

export const BulletIcon = Template.bind({})

BulletIcon.parameters = {
  docs: {
    story: {
      description: 'Set a bullet icon state using `bulletIcon` property.',
    },
  },
}

BulletIcon.decorators = [
  () => (
    <StepList>
      <StepList.Item bulletContent={<CheckIcon />} sentiment="success">
        check success
      </StepList.Item>
      <StepList.Item bulletContent={<CheckIcon />}>check default</StepList.Item>
    </StepList>
  ),
]
