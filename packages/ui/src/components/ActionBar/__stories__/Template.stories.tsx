import type { StoryFn } from '@storybook/react-vite'
import { DeleteIcon } from '@ultraviolet/icons/DeleteIcon'
import { useState } from 'react'
import { Button } from '../../Button'
import { Stack } from '../../Stack'
import { ActionBar } from '..'

export const Template: StoryFn<typeof ActionBar> = args => {
  const [state, setState] = useState(false)

  const toggle = () => {
    setState(true)
    setTimeout(() => {
      setState(false)
    }, 5000)
  }

  return (
    <>
      <Button onClick={toggle}>Click on me to display</Button>
      {state ? (
        <ActionBar {...args}>
          <Stack
            alignItems="center"
            direction="row"
            flex="1 1 auto"
            justifyContent="space-between"
            width="100%"
          >
            <div>I am the Playground Action Bar</div>
            <Button sentiment="danger" size="small" variant="outlined">
              <DeleteIcon />
            </Button>
          </Stack>
        </ActionBar>
      ) : null}
    </>
  )
}
