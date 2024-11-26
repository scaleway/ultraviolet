import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import type { ComponentProps } from 'react'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { SelectInputV2 } from '../../SelectInputV2'
import { TextInputV2 } from '../../TextInputV2'
import { Popover } from '../index'

const StyledPopover = styled(Popover)`
  height: 400px;
`

const options: ComponentProps<typeof SelectInputV2>['options'] = [
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
              <SelectInputV2
                name="options"
                label="Choose an option"
                options={options}
              />
              <TextInputV2 label="Type something here" />
            </div>
          </Modal>
          <SelectInputV2
            name="options"
            label="Choose an option"
            options={options}
          />
          <TextInputV2 label="Type something here" />
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
