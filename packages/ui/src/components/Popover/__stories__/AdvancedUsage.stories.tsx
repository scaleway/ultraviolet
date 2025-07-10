import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react-vite'
import type { ComponentProps } from 'react'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { SelectInput } from '../../SelectInput'
import { TextInput } from '../../TextInput'
import { Popover } from '../index'

const StyledPopover = styled(Popover)`
  height: 400px;
`

const options: ComponentProps<typeof SelectInput>['options'] = [
  {
    value: 'option 1',
    label: 'Option 1',
  },
  {
    value: 'option 2',
    label: 'Option 2',
  },
]

export const AdvancedUsage: StoryFn<typeof Popover> = () => {
  const [opened, setOpened] = useState(false)

  const onCloseCallBack = useCallback(() => {
    setOpened(false)
  }, [])

  return (
    <StyledPopover
      visible={opened}
      title="Popover Title"
      onClose={onCloseCallBack}
      content={
        <>
          <Modal
            disclosure={() => <Button sentiment="neutral">Open Modal</Button>}
          >
            <div>
              <div>Modal</div>
              <SelectInput
                name="options"
                label="Choose an option"
                options={options}
              />
              <TextInput label="Type something here" />
            </div>
          </Modal>
          <SelectInput
            name="options"
            label="Choose an option"
            options={options}
          />
          <TextInput label="Type something here" />
        </>
      }
    >
      <Button onClick={() => setOpened(true)} sentiment="neutral">
        Open Popover
      </Button>
    </StyledPopover>
  )
}

AdvancedUsage.parameters = {
  docs: {
    description: {
      story: `An advanced usage of a Popover with inputs inside and a button to open a modal with also inputs inside.`,
    },
  },
}

AdvancedUsage.decorators = [
  StoryComponent => (
    <div style={{ height: '500px' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <StoryComponent />
      </div>
    </div>
  ),
]
