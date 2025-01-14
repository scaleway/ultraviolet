import type { StoryFn } from '@storybook/react'
import { Modal } from '..'
import { Button } from '../../Button'
import { SelectInputV2 } from '../../SelectInputV2'

const OPTIONS = [
  {
    label: 'Option 1',
    value: 'option-1',
  },
  {
    label: 'Option 2',
    value: 'option-2',
  },
  {
    label: 'Option 3',
    value: 'option-3',
  },
]

export const WithSelectInputAsDisclosure: StoryFn = props => (
  <SelectInputV2
    label="Choose an option"
    name="example"
    options={OPTIONS}
    footer={
      <Modal
        disclosure={<Button>Open Modal with SelectInput</Button>}
        {...props}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          Test
        </div>
      </Modal>
    }
  />
)
WithSelectInputAsDisclosure.parameters = {
  docs: {
    description: {
      story:
        'Having a select input inside a modal is a common use case and shows you how to modal and select input can work together.',
    },
  },
}

WithSelectInputAsDisclosure.decorators = [
  (Story: StoryFn) => (
    <div style={{ height: '350px' }}>
      <Story />
    </div>
  ),
]
