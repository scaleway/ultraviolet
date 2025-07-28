import type { Sizes as SizesType } from '..'
import { StepList } from '..'
import { Template } from './Template.stories'

export const Sizes = Template.bind({})

Sizes.parameters = {
  docs: {
    story: {
      description: 'Set `size` using size property.',
    },
  },
}

Sizes.decorators = [
  () => (
    <StepList>
      {['small', 'medium'].map((size, index) => (
        <StepList.Item
          bulletContent={(index + 1).toString()}
          size={size as SizesType}
        >
          {size}
        </StepList.Item>
      ))}
    </StepList>
  ),
]
