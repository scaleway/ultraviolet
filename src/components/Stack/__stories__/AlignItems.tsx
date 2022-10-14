import Stack from '..'
import Icon from '../../Icon'
import Text from '../../Text'
import { Template } from './Template'

export const AlignItems = Template.bind({})

AlignItems.parameters = {
  docs: {
    storyDescription:
      'prop `alignItems` support every value of css property `align-items`',
  },
}

AlignItems.decorators = [
  () => (
    <Stack gap={2} direction="row" alignItems="center">
      <Icon name="plus" size={40} />
      <Text color="neutral" variant="body" as="p">
        {'A long text repeated'.repeat(20)}
      </Text>
    </Stack>
  ),
]
