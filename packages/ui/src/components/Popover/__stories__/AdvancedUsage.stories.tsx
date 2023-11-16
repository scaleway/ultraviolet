import styled from '@emotion/styled'
import type { StoryFn } from '@storybook/react'
import { useCallback, useState } from 'react'
import { Button } from '../../Button'
import { Modal } from '../../Modal'
import { SelectInput } from '../../SelectInput'
import { TextInput } from '../../TextInput'
import { Popover } from '../index'

const StyledPopover = styled(Popover)`
  height: 400px;
`

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
              <SelectInput>
                <SelectInput.Option>test 1</SelectInput.Option>
                <SelectInput.Option>test 2</SelectInput.Option>
              </SelectInput>
              <TextInput />
            </div>
          </Modal>
          <SelectInput>
            <SelectInput.Option>test 1</SelectInput.Option>
            <SelectInput.Option>test 2</SelectInput.Option>
          </SelectInput>
          <TextInput />
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
