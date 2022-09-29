import Stack from '..'
import Icon from '../../Icon'
import { Template } from './Template'

export const JustifyContent = Template.bind({})

JustifyContent.parameters = {
  docs: {
    storyDescription:
      'prop `justifyContent` support every value of css property `justify-content`',
  },
}

JustifyContent.decorators = [
  () => (
    <Stack direction="row" justifyContent="space-between">
      <Icon name="plus" size={80} />
      <Icon name="minus" size={80} />
    </Stack>
  ),
]
