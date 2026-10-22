import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { Button } from '../../../Action/Button'
import { TagList } from '../../../Data Display/TagList'
import { SelectInput } from '../../../Data Entry/SelectInput'
import { TextInput } from '../../../Data Entry/TextInput'
import { Stack } from '../../../Layout/Stack'
import { Text } from '../../../Typography/Text'
import { Modal } from '../../Modal'
import { Popover } from '../index'

const options: ComponentProps<typeof SelectInput>['options'] = [
  {
    label: 'Option 1',
    value: 'option 1',
  },
  {
    label: 'Option 2',
    value: 'option 2',
  },
]

export const AdvancedUsage: StoryFn<typeof Popover> = () => (
  <Popover
    content={
      <>
        <Modal disclosure={() => <Button sentiment="neutral">Open Modal</Button>}>
          <Stack gap={2}>
            <Text as="h2" variant="headingSmallStrong">
              Modal
            </Text>
            <SelectInput label="Choose an option" name="options" options={options} />
            <TextInput label="Type something here" />
            <TagList popoverTitle="Tags" tags={['one', 'two', 'three', 'four', 'five']} />
          </Stack>
        </Modal>
        <SelectInput label="Choose an option" name="options" options={options} />
        <TextInput label="Type something here" />
      </>
    }
    title="Popover Title"
  >
    <Button sentiment="neutral">Open Popover</Button>
  </Popover>
)

AdvancedUsage.parameters = {
  docs: {
    description: {
      story: 'An advanced usage of a Popover with inputs inside and a button to open a modal with also inputs inside.',
    },
  },
}

AdvancedUsage.decorators = [
  StoryComponent => (
    <Stack direction="row" gap={2} justifyContent="center" alignItems="center" style={{ height: '150px' }}>
      <StoryComponent />
    </Stack>
  ),
]
