import { LockIcon } from '@ultraviolet/icons/LockIcon'
import { Text } from '../../Text'
import { Template } from './Template.stories'

export const ComplexLabel = Template.bind({})

ComplexLabel.args = {
  label: (
    <div
      style={{
        alignItems: 'center',
        display: 'inline-flex',
        gap: '8px',
        marginLeft: '8px',
      }}
    >
      <LockIcon size="medium" />
      <Text as="span" variant="body">
        Lock functionality
      </Text>
    </div>
  ),
  name: 'label',
}

ComplexLabel.parameters = {
  docs: {
    description: {
      story:
        'Toggle can accept a more complex label than just a text, it allows your to customize even more the look of the toggle.',
    },
  },
}
