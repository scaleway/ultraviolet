import type { StoryFn } from '@storybook/react-vite'
import { Button } from '../../Button'
import { SelectInput } from '../../SelectInput'
import { Modal } from '..'

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

export const WithSelectInput: StoryFn = props => (
  <Modal disclosure={<Button>Open Modal with SelectInput</Button>} {...props}>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
      <SelectInput label="Choose an option" name="example" options={OPTIONS} />
    </div>
  </Modal>
)
WithSelectInput.parameters = {
  docs: {
    description: {
      story:
        'Having a select input inside a modal is a common use case and shows you how to modal and select input can work together.',
    },
  },
}
