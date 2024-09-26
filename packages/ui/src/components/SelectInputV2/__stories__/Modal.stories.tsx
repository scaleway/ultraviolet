import type { StoryFn } from '@storybook/react'
import { SelectInputV2 } from '..'
import { Button } from '../../Button'
import { Modal as ModalComponent } from '../../Modal'
import { dataGrouped } from './resources'

export const Modal: StoryFn<typeof SelectInputV2> = args => (
  <ModalComponent
    disclosure={<Button type="button">Modal</Button>}
    placement="bottom"
  >
    <SelectInputV2 {...args} label="Label" />
  </ModalComponent>
)

Modal.args = {
  options: dataGrouped,
  multiselect: true,
  name: 'example',
  placeholder: 'Select item',
  placeholderSearch: 'Search in list',
  searchable: true,
  disabled: false,
  helper: 'helper',
}
Modal.decorators = [
  StoryComponent => (
    <div style={{ height: '80px' }}>
      <StoryComponent />
    </div>
  ),
]

Modal.parameters = {
  docs: {
    description: {
      story:
        'The component will trigger an automatic scroll when it is located at the bottom of the screen',
    },
  },
}
